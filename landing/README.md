# HIOB product film / scroll site

The `hiob-creative-landing` Worker owns only `hi-ob.com/` and `/site/*`. Help, account, Studio, credit, API and legal routes retain their existing owners. No generation endpoint is changed or called by this website.

## Experience

The first viewport plays the first chapter immediately. Native scrolling selects one of five six-second chapters: connect, plan, create, refine, deliver. Each selected chapter starts at its beginning, plays at 1x and holds its result before the next cut. A 160 ms scroll-settle window avoids seeking through intermediate chapters during a fast gesture. One viewport scroll no longer skips a chapter. Scrolling is never intercepted or locked; visitors can skip ahead deliberately. Pause and replay are explicit controls.

Three.js 0.186.0 supplies the video texture, perspective camera and subtle pointer response. The extra floating cards were removed so there is one focal area. Neutral black/white surfaces replace the olive palette. The separately bundled Three.js stage initializes on interaction, keeps native video visible until its first successful render, and falls back to native video on WebGL failure. Rendering stops offscreen, in hidden tabs and behind the sound dialog. Reduced motion/data saver removes pinning, autoplay and WebGL, and exposes all five explanatory steps.

The sound button opens the revised 1920×1080 film with the previously produced narration/music mix and Korean captions. Closing preserves scene selection and manual pause. Desktop uses a 1920×1080 composition with a 1280×720 preview. Mobile uses a separately composed 1080×1080 film and 720×720 preview; it is not a scaled-down landscape film. Each film is 30 seconds. The visuals illustrate product use; they are not an actual screen recording or a generation-time benchmark.

## Source and assets

`motion/WebFilm.tsx` and `motion/MobileFilm.tsx` are the revised desktop and mobile compositions: one large action per scene, followed by a stable result. Existing H3 source clips and the existing Typecast mix are reused without paid generation. The render workspace and source assets are recorded in `hiob/output/hiob-product-film-20260924/web-readability/`. The existing source public directory belongs to HIOB project `25f8b0d4-662c-48a2-bd21-87463e735e6a`; it contains the licensed font, H3 clips and ambient derivatives. Rendering uses the existing HIOB Remotion runtime, not this public Worker's bundle.

Published media: `hiob-film*.mp4` (new visuals + existing sound), `hiob-scroll*.mp4` (silent), `hiob-poster*.jpg`, `hiob-film.vtt`. The build copies only explicitly referenced media and fingerprints all assets. Rejected films and old ViewOK/showcase assets are not published. The historical `prepare-media.mjs` must not be used for this film.

## Build and verify

```sh
npm install
npm run landing:build
node --test landing/*.test.mjs
npx eslint landing/src/*.mjs landing/src/landing.js landing/*.test.mjs
npx wrangler dev --config landing/wrangler.toml --port 8797 --compatibility-date 2026-06-03
npm run landing:deploy
```

Commit before deployment; `/site/version.json` identifies the source and asset fingerprints. Verify the live marker, video Range support and browser playback. Tests cover deep entry, pending metadata/seeks, backwards scene changes, user pause, result hold, autoplay rejection, viewport fit and rejected-asset exclusion.

Manual QA includes the actual rendered frames, normal/fast/backwards scroll, pause/replay, desktop/mobile layouts, sound-dialog return, reduced motion and deep reload. Evidence: `hiob/output/hiob-scroll-site-20260924/readability/`. Technical checks and Lighthouse are not evidence of creative quality or customer comprehension.

Production GTM, Meta Pixel, CAPI deduplication and GPC behavior are preserved. Localhost skips analytics. No external Three.js CDN or relaxed CSP was added. Rollback changes only this landing Worker.
