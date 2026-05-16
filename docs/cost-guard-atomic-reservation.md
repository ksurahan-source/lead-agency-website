# Cost Guard — Atomic reservation design (M1)

**Status:** Design only (M0). No runtime behavior change in M0.

## Problem

Current flow in `app/api/creative/generate/route.js`:

1. `readDailyUsage()` — read `creative_daily_usage.actual_cost_usd`
2. `enforceCreativeCostGuard()` — compare estimate to limits
3. Call OpenAI
4. `writeUsageEvent()` + `incrementDailyUsage()`

Failures:

- **TOCTOU race:** two concurrent requests can both pass step 2, then both spend.
- **Non-atomic writes:** event insert and daily rollup are separate statements.
- **Estimate vs actual:** guard uses pre-call estimate; actual tokens may differ.

## Goals

1. **Fail closed** when daily / per-run limits would be exceeded.
2. **Reserve** budget before external API calls.
3. **Settle** reservation with actual cost after success; **release** on failure.
4. Work on **D1** (SQLite) at edge — no filesystem.

## Proposed schema (migration `0002_cost_reservations.sql`)

```sql
CREATE TABLE IF NOT EXISTS creative_cost_reservations (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  run_id TEXT,
  asset_id TEXT,
  provider TEXT NOT NULL,
  operation_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'reserved',
  -- reserved | settled | released | expired
  estimated_cost_usd REAL NOT NULL,
  actual_cost_usd REAL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  settled_at TEXT,
  released_at TEXT,
  reason TEXT
);

CREATE INDEX IF NOT EXISTS idx_cost_reservations_date_status
  ON creative_cost_reservations (date, status);
```

Optional: add `reserved_cost_usd` column to `creative_daily_usage` for fast reads.

## Reservation algorithm

### 1. Reserve (before OpenAI)

Single D1 batch (pseudo-SQL):

```sql
-- Read limit from env at app layer: daily_limit
UPDATE creative_daily_usage
SET
  actual_cost_usd = actual_cost_usd + ?,
  updated_at = datetime('now')
WHERE date = ?
  AND actual_cost_usd + ? <= ?;

-- If changes == 0 → blocked (insert blocked usage event, return 402)
INSERT INTO creative_cost_reservations (id, date, run_id, ..., estimated_cost_usd, status)
VALUES (?, ?, ?, ..., ?, 'reserved');
```

**Note:** D1 does not support multi-statement transactions across arbitrary batches the same way Postgres does. Options:

- **A (preferred):** Durable Object `CostLedger` — single-threaded reserve/settle (see Cloudflare Agents / DO docs).
- **B:** D1 `db.batch()` with conditional UPDATE + INSERT in one batch (reduces race window; not full serializability under extreme concurrency).
- **C:** Queue consumer — all paid ops serialized (best for render/TTS later).

M1 recommendation: start with **B** for script generation volume; plan **A** before render/TTS.

### 2. Settle (after OpenAI success)

```sql
UPDATE creative_cost_reservations
SET status = 'settled', actual_cost_usd = ?, settled_at = datetime('now')
WHERE id = ? AND status = 'reserved';

-- Adjust daily rollup if actual != estimated
UPDATE creative_daily_usage
SET actual_cost_usd = actual_cost_usd + (? - ?)
WHERE date = ?;

INSERT INTO creative_usage_events (...);  -- existing table
```

### 3. Release (on failure / timeout)

```sql
UPDATE creative_cost_reservations
SET status = 'released', released_at = datetime('now'), reason = ?
WHERE id = ? AND status = 'reserved';

UPDATE creative_daily_usage
SET actual_cost_usd = actual_cost_usd - ?
WHERE date = ?;
```

### 4. Per-run / per-asset limits

Check `SUM(estimated_cost_usd) FROM creative_cost_reservations WHERE run_id = ? AND status IN ('reserved','settled')` before reserve, or store `run_id` rollup in `creative_runs` JSON.

## API surface (M1)

```js
// lib/creativeCostReservation.js (future)
export async function reserveCreativeBudget({ date, runId, assetId, estimatedCostUsd, limits });
export async function settleCreativeBudget({ reservationId, actualCostUsd, usageEvent });
export async function releaseCreativeBudget({ reservationId, reason });
```

Replace direct `enforceCreativeCostGuard` + post-hoc `writeUsageEvent` ordering in generate route.

## Observability

- Log `reservationId`, `status`, `estimatedCostUsd`, `actualCostUsd` on each transition.
- Dashboard query: `SELECT status, COUNT(*), SUM(estimated_cost_usd) FROM creative_cost_reservations WHERE date = ? GROUP BY status`.

## Out of scope for M1 design

- Multi-tenant budgets
- Refunds across days
- Currency other than USD

## M0 action

- Document only (this file).
- M1: implement migration + `reserveCreativeBudget` + wire `generate/route.js` real path only.
