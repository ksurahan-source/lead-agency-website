# M0 — Platform safety checklist

Operational checklist for Creative Performance Infrastructure on Cloudflare Pages. Complete before enabling paid generation at scale.

**Repo:** `~/lead-agency-website`  
**Last updated:** 2026-05-16 (M0 documentation pass)

---

## 1. Local guardrails (run before every PR touching API or shorts-producer)

```bash
npm run check:edge-boundary   # app/api must not import Node-only modules
npm run check:shorts-paths    # @/lib path debt report
npm run lint
npm run build
# Optional full Pages bundle (slower):
# npm run pages:build
```

- [ ] `check:edge-boundary` passes
- [ ] `check:shorts-paths` passes (known M1 debt only; no new unknown imports)
- [ ] `npm run build` passes

---

## 2. Cloudflare Pages — compatibility

Dashboard: **Workers & Pages → project → Settings → Functions**

- [ ] **Compatibility flag:** `nodejs_compat` enabled for **Production**
- [ ] **Compatibility flag:** `nodejs_compat` enabled for **Preview**
- [ ] **Compatibility date** ≥ `2024-09-23` (matches `wrangler.toml`)

If missing, edge routes may show a no-nodejs_compat error page.

---

## 3. Wrangler bindings (verify in dashboard + `wrangler.toml`)

| Binding | Type | Name in dashboard | Used by |
|---------|------|-------------------|---------|
| `DB` | D1 | `leads-db` | `submit-lead`, `/api/leads`, admin |
| `CREATIVE_DB` | D1 | `hi-ob-creative-db` | `/api/creative/*` |
| `HI_OB_R2` | R2 | `hi-ob` | `putCreativeArtifact` |

- [ ] All three bindings attached to the Pages project
- [ ] Preview environment uses same bindings (or explicit preview DB/bucket)
- [ ] `database_id` in `wrangler.toml` matches live D1 IDs

---

## 4. D1 migrations

### Leads (`DB` / `leads-db`)

Schema reference: `db/schema.sql`, `schema.sql` (legacy).

- [ ] `leads` table exists in production D1
- [ ] Columns match runtime INSERT in `app/api/submit-lead/route.js`

### Creative (`CREATIVE_DB` / `hi-ob-creative-db`)

Apply:

```bash
# From repo root (requires wrangler auth)
npx wrangler d1 execute hi-ob-creative-db --remote --file=./migrations/0001_creative_storage.sql
```

Tables created:

- `creative_usage_events`
- `creative_daily_usage`
- `creative_runs`
- `creative_jobs`

- [ ] Migration `0001_creative_storage.sql` applied to **remote** `hi-ob-creative-db`
- [ ] Migration applied to **local** dev DB if using `wrangler pages dev`
- [ ] Smoke: `GET /api/creative/usage/daily` (authenticated) returns JSON, not binding errors

---

## 5. Environment variables (Pages → Settings → Environment variables)

### Marketing / leads (existing)

| Variable | Secret? | Notes |
|----------|---------|--------|
| `ADMIN_PASSWORD` | Yes | **Required in prod** — see section 6 |
| `META_PIXEL_ID` | No | CAPI |
| `META_ACCESS_TOKEN` | Yes | CAPI |
| `TURNSTILE_SECRET_KEY` | Yes | If Turnstile enabled on forms |
| `META_CAPI_MODE` | No | `direct` or `gtm_server` |

### Studio auth (required for `/studio`)

| Variable | Secret? | Notes |
|----------|---------|--------|
| `STUDIO_AUTH_ALLOWED_EMAIL` | No | Single allowed operator email |
| `STUDIO_AUTH_PASSWORD_SALT` | Yes | PBKDF2 salt |
| `STUDIO_AUTH_PASSWORD_HASH` | Yes | PBKDF2 hex digest |
| `STUDIO_AUTH_SESSION_SECRET` | Yes | HMAC signing key |

- [ ] All `STUDIO_AUTH_*` set in Production
- [ ] Preview uses separate secrets or shared (team decision)

### Real OpenAI generation (`mock: false` only)

| Variable | Secret? | Notes |
|----------|---------|--------|
| `OPENAI_API_KEY` | Yes | |
| `DAILY_COST_LIMIT_USD` | No | Required for real generation |
| `MAX_COST_PER_RUN_USD` | No | |
| `MAX_COST_PER_ASSET_USD` | No | |
| `OPENAI_CHEAP_MODEL` | No | Optional |
| `MAX_OUTPUT_TOKENS_PER_REQUEST` | No | Optional |
| `COST_SAFETY_BUFFER_PCT` | No | Optional; default 15 |

- [ ] Cost limit vars set before enabling real generation in UI (M2)
- [ ] `OPENAI_API_KEY` not exposed to `NEXT_PUBLIC_*`

### Not used on Pages yet (M4+)

- `AWS_REGION`, `REMOTION_*`, `ELEVENLABS_*`

---

## 6. ADMIN_PASSWORD fallback removal plan

**Current behavior (remove in M1):**

- `app/api/leads/route.js` and `app/api/admin/leads/route.js` use `(env.ADMIN_PASSWORD || 'hiop2025').trim()`.

**M1 code change:**

1. Require `env.ADMIN_PASSWORD` — if missing, return `503`.
2. Set secret in Cloudflare Production before deploy.
3. Rotate password; remove any shared default from docs.

**M0:**

- [ ] Confirm production `ADMIN_PASSWORD` is set in dashboard
- [ ] Team aware fallback exists until M1 deploy

---

## 7. R2

- [ ] Bucket `hi-ob` exists
- [ ] Binding `HI_OB_R2` works
- [ ] Lifecycle / TTL policy documented (not implemented M0)

Prefix: `creative/{type}/{runId}/{ownerId}/{fileName}`

---

## 8. Security smoke tests (staging)

- [ ] `/studio` redirects to login when unauthenticated
- [ ] `POST /api/creative/generate` returns `401` without studio cookie
- [ ] `robots.txt` disallows `/studio`, `/api/`, `/admin`, `/agent`
- [ ] Admin leads API rejects wrong `?pw=`

---

## 9. Known M0 limitations (accepted)

| Item | Risk | Target fix |
|------|------|------------|
| Cost guard not atomic | Concurrent overspend | M1 — cost-guard-atomic-reservation.md |
| Studio UI mock-only | No paid OpenAI from UI | M2 |
| shorts-producer `@/lib` paths | Build break if wrong import | M1 path alias |
| `creative_jobs` unused | Schema drift | M3 |
| Dual cost-meter systems | Confusion | M1 unify |
| Real-gen 500 returns mock scripts | Misleading clients | M2 |

---

## 10. Sign-off

| Role | Name | Date | M0 complete |
|------|------|------|-------------|
| Engineering | | | [ ] |
| Ops / Cloudflare | | | [ ] |
