# HI-OP Creative Performance Infrastructure — Architecture

This document defines **runtime boundaries** and **module ownership** for `lead-agency-website`. It complements the architecture review and is the source of truth for M0–M2 work.

## System layers

```
┌──────────────────────────────────────────────────────────────┐
│  Marketing (static/SSR)                                       │
│  app/page.js, /growth, /creative, /system, blog, service pages│
│  Runtime: mostly static; no paid APIs                         │
└────────────────────────────┬─────────────────────────────────┘
                             │
┌────────────────────────────▼─────────────────────────────────┐
│  Edge platform (Cloudflare Pages + next-on-pages)             │
│  app/api/**          export const runtime = 'edge'              │
│  app/studio/**       studio auth + mock/real creative APIs    │
│  Bindings: DB, CREATIVE_DB, HI_OB_R2                          │
└────────────────────────────┬─────────────────────────────────┘
                             │
┌────────────────────────────▼─────────────────────────────────┐
│  shorts-producer (modules/shorts-producer)                    │
│  TypeScript pipeline: OpenAI, TTS, Remotion, cost, QA         │
│  Default: NOT on edge unless explicitly allowlisted           │
└────────────────────────────┬─────────────────────────────────┘
                             │
┌────────────────────────────▼─────────────────────────────────┐
│  AWS (future / separate deploy)                               │
│  Remotion Lambda, S3 outputs, webhooks                        │
│  Must not be imported from app/api/**                         │
└──────────────────────────────────────────────────────────────┘
```

## Edge vs Node rules

### May run on Cloudflare Pages (edge)

| Area | Location | Notes |
|------|----------|--------|
| Lead capture | `app/api/submit-lead` | D1 `DB`, Meta CAPI |
| Creative APIs | `app/api/creative/*` | D1 `CREATIVE_DB`, R2, OpenAI via fetch |
| Studio auth | `lib/studioAuth.js` | Web Crypto only |
| Cost guard (edge) | `lib/creativeCostGuard.js`, `lib/creativeUsageStore.js` | D1-backed |
| OpenAI script (edge) | `modules/shorts-producer/lib/openai.ts` | **Only** allowlisted shorts-producer entry from API |

### Must NOT run on edge (`app/api/**`)

| Pattern | Why |
|---------|-----|
| `node:fs`, `node:path`, `fs`, `path` | No persistent filesystem on Workers |
| `@remotion/*` | AWS Lambda client + heavy deps |
| `modules/shorts-producer/lib/cost-meter.ts` | Writes `.data/usage` on disk |
| `modules/shorts-producer/lib/cost-control.ts` | Filesystem cache under `.data/cache` |
| `modules/shorts-producer/lib/render-*.ts`, `remotion.ts` | AWS Remotion pipeline |
| `modules/shorts-producer/lib/elevenlabs.ts`, `assets.ts` | External paid APIs + fs (until worker split) |

Enforced locally by:

```bash
npm run check:edge-boundary
```

## Path alias hazard (`@/lib` in shorts-producer)

Root `jsconfig.json` maps `@/*` → repository root. Therefore `@/lib/types` resolves to **`/lib/types`**, not `modules/shorts-producer/lib/types`.

| Import in shorts-producer | Resolves today | Status |
|---------------------------|----------------|--------|
| `@/lib/types` | Missing at root | **M1 debt** — use relative `./types` or `lib/creative/` merge |
| `@/lib/cost-meter` | Missing at root | **M1 debt** — edge uses `creativeUsageStore` instead |
| Relative `./openai`, `./pricing` | Correct | Safe for `app/api/creative/generate` |

Checked by:

```bash
npm run check:shorts-paths
```

**M1 fix options (pick one):**

1. Add `lib/creative/` at repo root and move shared types + edge-safe helpers there.
2. Add alias `@/shorts/*` → `modules/shorts-producer/lib/*` in root `jsconfig.json`.
3. Replace all `@/lib/*` inside shorts-producer with relative imports.

Do **not** import render/TTS modules from edge routes until paths and runtime are fixed.

## Dual cost systems (do not merge blindly)

| System | Storage | Used by |
|--------|---------|---------|
| **Production (edge)** | D1 `CREATIVE_DB` | `creativeUsageStore`, `creativeCostGuard`, `/api/creative/*` |
| **Module (dev/Node)** | `.data/usage`, `.data/cache` | `cost-meter.ts`, `cost-control.ts`, render queue |

New spend events for Pages **must** go through `writeUsageEvent` / `enforceCreativeCostGuard`. See [cost-guard-atomic-reservation.md](./cost-guard-atomic-reservation.md).

## Auth boundaries

| Surface | Mechanism | Scope |
|---------|-----------|--------|
| Studio | `hiob_studio_session` HMAC cookie | `/studio`, `/api/creative/*` |
| Agent | `hiob_agent_session` (separate) | `/agent`, `/api/agent/*` — **do not change in M0** |
| Admin leads | `?pw=` query param | `/api/leads`, `/api/admin/leads` — fallback removal planned |

## Bindings (`wrangler.toml`)

| Binding | Database / bucket | Purpose |
|---------|-------------------|---------|
| `DB` | `leads-db` | Marketing leads |
| `CREATIVE_DB` | `hi-ob-creative-db` | Usage, runs, jobs |
| `HI_OB_R2` | `hi-ob` | Creative artifacts |

Requires Pages compatibility flag: **`nodejs_compat`** (production + preview).

## Deploy output

- Build: `npm run pages:build` → `.vercel/output/static`
- Config: `wrangler.toml` → `pages_build_output_dir`

Do not commit `.cf-pages/` as source of truth; it is build output.

## Related docs

- [m0-checklist.md](./m0-checklist.md) — operational checklist
- [cost-guard-atomic-reservation.md](./cost-guard-atomic-reservation.md) — D1 budget design (M1 implementation)
