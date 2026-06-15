# M0 — Website safety checklist

Operational checklist for the HI-OP public website on Cloudflare Pages.

**Repo:** `~/lead-agency-website`  
**Last updated:** 2026-05-16 (website / Studio split)

---

## 1. Local guardrails

```bash
npm run check:edge-boundary   # app/api must stay edge-safe
npm run lint
npm run build
# Optional full Pages bundle (slower):
# npm run pages:build
```

- [ ] `check:edge-boundary` passes
- [ ] `npm run lint` passes
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

- [ ] `DB` binding attached to the Pages project
- [ ] Preview environment uses the intended lead DB
- [ ] `database_id` in `wrangler.toml` matches live D1 IDs

---

## 4. D1 migrations

### Leads (`DB` / `leads-db`)

Schema reference: `db/schema.sql`, `schema.sql` (legacy).

- [ ] `leads` table exists in production D1
- [ ] Columns match runtime INSERT in `app/api/submit-lead/route.js`

## 5. Environment variables (Pages → Settings → Environment variables)

| Variable | Secret? | Notes |
|----------|---------|--------|
| `ADMIN_PASSWORD` | Yes | **Required in prod** — see section 6 |
| `META_PIXEL_ID` | No | CAPI |
| `META_ACCESS_TOKEN` | Yes | CAPI |
| `TURNSTILE_SECRET_KEY` | Yes | If Turnstile enabled on forms |
| `META_CAPI_MODE` | No | `direct` or `gtm_server` |

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

## 8. Security smoke tests (staging)

- [ ] `robots.txt` disallows `/api/`, `/admin`, `/agent`
- [ ] Admin leads API rejects wrong `?pw=`
- [ ] Lead form writes a row to `DB`
- [ ] Tracking endpoint returns JSON without leaking secrets

---

## 9. Known M0 limitations (accepted)

| Item | Risk | Target fix |
|------|------|------------|
| Admin password fallback | Shared default can expose lead data | Require `ADMIN_PASSWORD` and fail closed |
| `/agent` still product-like | Website/product boundary can blur again | Decide keep/remove in a follow-up |
| Tracking env drift | CAPI can silently no-op | Add staging smoke checks |

---

## 10. Sign-off

| Role | Name | Date | M0 complete |
|------|------|------|-------------|
| Engineering | | | [ ] |
| Ops / Cloudflare | | | [ ] |
