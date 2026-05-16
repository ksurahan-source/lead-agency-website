# AGENTS.md — lead-agency-website

Guidance for humans and coding agents working on **HI-OP Creative Performance Infrastructure** (Next.js on Cloudflare Pages).

<!-- BEGIN:nextjs-agent-rules -->
## Next.js in this repo

This project uses **Next.js 16** with breaking changes vs older training data. Before changing App Router code, read guides under `node_modules/next/dist/docs/` and heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## What this repo is

- **Public:** Authority marketing site (`/`, `/growth`, `/creative`, `/system`, blog, legacy service pages).
- **Platform:** Studio + creative APIs (`/studio`, `/api/creative/*`) with D1 usage tracking, R2 artifacts, optional OpenAI.
- **Module:** `modules/shorts-producer/` — full video pipeline (Remotion, TTS, filesystem cost meter). **Most of it is not wired to Pages.**

Read [docs/architecture.md](./docs/architecture.md) for runtime boundaries.

## Hard rules (do not violate)

1. **Never import Node-only code from `app/api/**`**
   - No `node:fs`, `node:path`, `@remotion/*`, `cost-meter.ts`, `cost-control.ts`, `render-queue.ts`, `remotion.ts`, `elevenlabs.ts`.
   - Allowed from API: root `lib/creative*.js`, `lib/studioAuth.js`, and **`modules/shorts-producer/lib/openai.ts` only** (allowlist).
   - Run `npm run check:edge-boundary` after API changes.

2. **Do not connect TTS, Remotion, or render queues to Pages routes** until architecture sign-off and M4 milestone.

3. **Do not add new OpenAI call sites** without cost guard + `writeUsageEvent` and product approval.

4. **Do not change `/agent`** unless explicitly requested (separate auth product).

5. **Do not change homepage marketing copy** unless explicitly requested.

6. **Do not deploy** from agent sessions unless the user asks.

7. **Cost on Pages uses D1 only:** `lib/creativeUsageStore.js` + `lib/creativeCostGuard.js` — not `modules/shorts-producer/lib/cost-meter.ts` (filesystem).

8. **`@/lib/*` inside `modules/shorts-producer/`** resolves to **repo root `lib/`**, not `modules/shorts-producer/lib/`. Run `npm run check:shorts-paths`. Prefer relative imports when touching that module.

## Runtime

- API routes: `export const runtime = 'edge'`.
- Cloudflare: `getRequestContext().env` for bindings (`DB`, `CREATIVE_DB`, `HI_OB_R2`).
- Local dev: `@cloudflare/next-on-pages` dev platform in `next.config.mjs`.
- Pages build: `npm run pages:build` → `.vercel/output/static`.
- Wrangler: `nodejs_compat` required (see [docs/m0-checklist.md](./docs/m0-checklist.md)).

## Commands

```bash
npm run dev
npm run build
npm run check:edge-boundary    # M0 guardrail
npm run check:shorts-paths     # M0 path alias report
npm run lint
npm run pages:build            # Cloudflare bundle (before preview/deploy)
npm run preview                # wrangler pages dev (user-triggered)
```

## M0 / M1 / M2 focus

| Phase | Focus |
|-------|--------|
| **M0** | Docs, checklists, import guardrails — no new features |
| **M1** | Atomic cost reservation, ADMIN_PASSWORD fail-closed, path alias fix |
| **M2** | Studio real generation UI, remove mock fallback on errors in prod |

Checklist: [docs/m0-checklist.md](./docs/m0-checklist.md)  
Cost design: [docs/cost-guard-atomic-reservation.md](./docs/cost-guard-atomic-reservation.md)

## File map (creative platform)

| Path | Role |
|------|------|
| `lib/creativeUsageStore.js` | D1 usage events + daily rollup |
| `lib/creativeCostGuard.js` | OpenAI estimate + limit enforcement |
| `lib/creativeArtifacts.js` | R2 put/head |
| `lib/studioAuth.js` | Studio session cookie |
| `app/api/creative/generate/route.js` | Mock default; `mock: false` → OpenAI |
| `migrations/0001_creative_storage.sql` | Creative D1 schema |
| `wrangler.toml` | D1 + R2 bindings |

## Commits

Only commit when the user asks. Do not commit secrets or `.env` files.
