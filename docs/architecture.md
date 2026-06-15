# HI-OP Marketing Website — Architecture

This document defines runtime boundaries and ownership for `lead-agency-website` after the Studio split.

## Repo ownership

| Area | Owner | Rule |
|------|-------|------|
| Public marketing pages | `lead-agency-website` | Build SEO, positioning, and lead capture here. |
| Lead capture APIs | `lead-agency-website` | Keep edge-safe and backed by D1 `DB`. |
| Admin lead review | `lead-agency-website` | Keep scoped to collected marketing leads. |
| Studio UI and creative APIs | `/Users/surahanchoi/hiop-studio` | Do not re-add `/studio` or `/api/creative/*` here. |
| shorts-producer and render worker | `/Users/surahanchoi/hiop-studio` | Keep paid generation/render infrastructure out of this repo. |

## System layers

```txt
Marketing website
  app/page.js, /growth, /creative, /system, blog, service pages
  Runtime: mostly static or edge-safe

Lead platform
  app/api/submit-lead
  app/api/track-view
  app/api/leads, app/api/admin/leads
  Binding: DB

Studio product
  Lives in /Users/surahanchoi/hiop-studio
```

## Edge rules

### May run on Cloudflare Pages

| Area | Location | Notes |
|------|----------|-------|
| Lead capture | `app/api/submit-lead` | D1 `DB`, optional Meta CAPI |
| Tracking | `app/api/track-view` | Edge-safe fetch only |
| Admin leads | `app/api/leads`, `app/api/admin/leads` | D1 `DB` |

### Must not be added to this repo

| Pattern | Why |
|---------|-----|
| `app/studio/**` | Studio belongs in `hiop-studio`. |
| `app/api/creative/**` | Creative APIs belong in `hiop-studio`. |
| `modules/shorts-producer/**` | Product engine belongs in `hiop-studio`. |
| `services/render-trigger/**` | Render worker belongs in `hiop-studio`. |
| `node:fs`, `node:path`, `@remotion/*`, `child_process` in `app/api/**` | Not edge-safe for Pages routes. |

Enforced locally by:

```bash
npm run check:edge-boundary
```

## Auth boundaries

| Surface | Mechanism | Scope |
|---------|-----------|-------|
| Agent | `hiob_agent_session` (separate) | `/agent`, `/api/agent/*` — do not change unless explicitly requested. |
| Admin leads | `?pw=` query param | `/api/leads`, `/api/admin/leads` — fallback removal planned. |
| Studio | HMAC cookie in `hiop-studio` | Not owned by this repo. |

## Bindings (`wrangler.toml`)

| Binding | Database | Purpose |
|---------|----------|---------|
| `DB` | `leads-db` | Marketing leads |

Requires Pages compatibility flag: `nodejs_compat` for production and preview.

## Deploy output

- Build: `npm run pages:build` → `.vercel/output/static`
- Config: `wrangler.toml` → `pages_build_output_dir`

Do not commit `.cf-pages/` as source of truth; it is build output.

## Related docs

- [m0-checklist.md](./m0-checklist.md) — operational checklist for the website.
