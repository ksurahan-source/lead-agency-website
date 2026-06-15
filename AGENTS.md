# AGENTS.md — lead-agency-website

Guidance for humans and coding agents working on the **HI-OP public marketing website** (Next.js on Cloudflare Pages).

<!-- BEGIN:nextjs-agent-rules -->
## Next.js in this repo

This project uses **Next.js 16** with breaking changes vs older training data. Before changing App Router code, read guides under `node_modules/next/dist/docs/` and heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## What this repo is

- **Public:** Authority marketing site (`/`, `/growth`, `/creative`, `/system`, blog, legacy service pages).
- **Lead capture:** `app/api/submit-lead`, `app/api/track-view`, and admin lead review routes.
- **Not this repo:** Studio UI, creative generation APIs, shorts-producer modules, D1/R2 creative storage, and Remotion render workers belong in `/Users/surahanchoi/hiop-studio`.

Read [docs/architecture.md](./docs/architecture.md) for runtime boundaries.

## Hard rules (do not violate)

1. **Never import Node-only code from `app/api/**`**
   - No `node:fs`, `node:path`, `@remotion/*`, `child_process`, filesystem cost meters, render queues, or TTS/render clients.
   - Run `npm run check:edge-boundary` after API changes.

2. **Do not add Studio or creative generation routes** to this repo. Use `/Users/surahanchoi/hiop-studio`.

3. **Do not add new paid API call sites** to public website routes without explicit approval and cost controls.

4. **Do not change `/agent`** unless explicitly requested (separate auth product).

5. **Do not change homepage marketing copy** unless explicitly requested.

6. **Do not deploy** from agent sessions unless the user asks.

## Runtime

- API routes: `export const runtime = 'edge'`.
- Cloudflare: `getRequestContext().env` for bindings (`DB`).
- Local dev: `@cloudflare/next-on-pages` dev platform in `next.config.mjs`.
- Pages build: `npm run pages:build` → `.vercel/output/static`.
- Wrangler: `nodejs_compat` required (see [docs/m0-checklist.md](./docs/m0-checklist.md)).

## Commands

```bash
npm run dev
npm run build
npm run check:edge-boundary    # app/api import guardrail
npm run lint
npm run pages:build            # Cloudflare bundle (before preview/deploy)
npm run preview                # wrangler pages dev (user-triggered)
```

## Focus

| Phase | Focus |
|-------|--------|
| **Now** | Keep website and Studio repo boundaries clean |
| **Next** | ADMIN_PASSWORD fail-closed and lead capture hardening |
| **Later** | SEO/content improvements and tracking reliability |

Checklist: [docs/m0-checklist.md](./docs/m0-checklist.md)  
Studio cost/render design now belongs in `/Users/surahanchoi/hiop-studio`.

## File map (website)

| Path | Role |
|------|------|
| `app/page.js` | Main marketing homepage |
| `app/growth`, `app/creative`, `app/system` | Category landing pages |
| `app/blog` | SEO blog pages |
| `app/api/submit-lead` | D1 lead capture |
| `app/api/track-view` | Meta CAPI / tracking |
| `wrangler.toml` | Cloudflare Pages config + lead DB binding |

## Commits

Only commit when the user asks. Do not commit secrets or `.env` files.
