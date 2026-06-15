# HI-OP Marketing Website

This repository is the public website for HI-OP:

- Public marketing and SEO pages live under `app/`.
- Lead capture and tracking routes live under `app/api/submit-lead` and `app/api/track-view`.
- Admin lead review remains under `app/admin`, `app/api/leads`, and `app/api/admin/leads`.

The Studio product surface now lives in `/Users/surahanchoi/hiop-studio`. Do not add Studio UI, creative generation APIs, Remotion workers, or shorts-producer modules back into this repo.

## Main Commands

```bash
npm run dev
npm run build
npm run pages:build
npm run check:edge-boundary
```

## Repo Boundary

The desired shape is two repos with separate ownership:

```txt
lead-agency-website
  public marketing pages
  SEO content
  lead capture
  Meta CAPI / tracking
  admin lead review

hiop-studio
  Studio UI
  creative generation APIs
  D1/R2 creative storage
  shorts-producer module
  render-trigger worker
```

Keep paid generation, render infrastructure, and Studio auth in `hiop-studio`.

## Verification

Run the website checks before shipping marketing/API changes:

```bash
npm run check:edge-boundary
npm run lint
npm run build
```

For Cloudflare Pages output:

```bash
npm run pages:build
```

Deployment is manual and should only happen when explicitly requested.
