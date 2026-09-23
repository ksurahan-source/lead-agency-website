# HIOB scroll film homepage

The landing Worker owns only `hi-ob.com/` and `/site/*`. The separate help Worker owns `/help*` and exact `/mcp`; existing marketing, legal, blog and lead API routes remain with the original Pages app. Studio authentication and customer information stay at `studio.hi-ob.com`.

The first viewport contains a real MP4. One sticky sequence maps scroll progress to the video time, film dimensions, LLM conversation, editor timeline, and delivery chapter. Chapter buttons support keyboard navigation and the same reverse mapping. Reduced motion and data saver expose the full explanation without scroll pinning or autoplay. The main film is intentionally silent for scrubbing; an explicit button opens the existing complete advertisement with native sound controls. The illustrated editor is labelled as a production-flow demo, not an actual recording of a live generation.

The 1.5 MB H.264 reel reuses the repository's already public `showcase/hiob-marketing-ad-ko-final.mp4`, with three time-offset panels and keyframes every 6 frames for seeking. No provider synthesis is called. `media-range.mjs` supplies precise byte responses when the upstream static asset server does not implement Range. Existing native 206 responses pass through.

```
npm run landing:build
node --test landing/*.test.mjs
npx wrangler dev --config landing/wrangler.toml --port 8797 --compatibility-date 2026-06-10
npm run landing:deploy
```

Builds fingerprint CSS and JS and expose `/site/version.json` with the committed source revision. Commit before deploying and verify the marker. If rollback is needed, deploy a previous version of `hiob-creative-landing`; the other route owners are independent.

Design references inspected September 24, 2026: [Aside](https://aside.com/), [Seedance](https://ai.byteplus.com/en/activity/seedance2-5), [MacBook Air](https://www.apple.com/macbook-air/), [GPT-6 Astra](https://openai.com/index/gpt-6-astra/). These inform product demonstration, cinematic scale, and continuity; no reference media, logos, or interface source was copied.

Validate video time after forward/backward scroll, first-viewport MP4, mobile composition, reduced motion, sound modal, CTA destination, and root/help/API routing. Lighthouse is a lab metric and not a customer conversion or creative quality score. Evidence lives in `hiob/output/hiob-onboarding-20260924/evidence`.
