# HIOB product film / scroll site

The `hiob-creative-landing` Worker owns only `hi-ob.com/` and `/site/*`. Help, account, Studio, credit, API and legal routes retain their existing owners. No generation endpoint is changed or called by this website.

## Experience

The first viewport displays the film immediately. Native scroll position directly selects its frame, forwards and backwards, including movement within each chapter. The inline video never advances on its own: stop scrolling to hold the frame. There is no scroll-settle timer. A 1000svh section spreads the 30-second film over nine viewport heights, while each scene's stable result supplies reading time. The controller retains only the newest requested position during a seek and gives the decoded frame a paint opportunity before seeking again. Scrolling is never intercepted or locked. Chapter buttons jump to their scroll positions; “이 장면 처음으로” returns to the current chapter's beginning.

Three.js 0.186.0 supplies the video texture, perspective camera and subtle pointer response. The extra floating cards were removed so there is one focal area. Neutral black/white surfaces replace the olive palette. The separately bundled Three.js stage initializes on interaction, keeps native video visible until its first successful render, and falls back to native video on WebGL failure. Rendering stops offscreen, in hidden tabs and behind the sound dialog. Reduced motion/data saver removes pinning, scroll playback and WebGL, and exposes all five explanatory steps.

The sound button opens the revised 1920×1080 film with the previously produced narration/music mix and Korean captions. Closing returns to the current scroll frame. Desktop uses a 1920×1080 composition with a 1280×720 preview. Mobile uses a separately composed 1080×1080 film and 720×720 preview; it is not a scaled-down landscape film. Each film is 30 seconds. The visuals illustrate product use; they are not an actual screen recording or a generation-time benchmark.

## Source and assets

`motion/WebFilm.tsx` and `motion/MobileFilm.tsx` are the revised desktop and mobile compositions: one large action per scene, followed by a stable result. Existing H3 source clips and the existing Typecast mix are reused without paid generation. The render workspace and source assets are recorded in `hiob/output/hiob-product-film-20260924/web-readability/`. The existing source public directory belongs to HIOB project `25f8b0d4-662c-48a2-bd21-87463e735e6a`; it contains the licensed font, H3 clips and ambient derivatives. Rendering uses the existing HIOB Remotion runtime, not this public Worker's bundle.

Published media: `hiob-film*.mp4` (new visuals + existing sound), `hiob-scroll*.mp4` (silent), `hiob-poster*.jpg`, `hiob-film.vtt`. The build copies only explicitly referenced media and fingerprints all assets. Rejected films and old ViewOK/showcase assets are not published. The historical `prepare-media.mjs` must not be used for this film.

Silent previews use H.264 at 30fps with a three-frame keyframe interval (0.1 seconds), replacing the fifteen-frame interval. This reduces random-seek decoding work but increases download size: desktop 4,893,730 bytes; mobile 3,967,265 bytes. Each device loads only its preview; sound films load on demand. Initial response still depends on network and device. Encode the existing silent masters using `-an -vf scale=1280:720 -c:v libx264 -crf 25 -preset fast -g 3 -keyint_min 3 -sc_threshold 0 -movflags +faststart` (mobile: `scale=720:720`). No paid generation is needed.

## Build and verify

```sh
npm install
npm run landing:build
node --test landing/*.test.mjs
npx eslint landing/src/*.mjs landing/src/landing.js landing/*.test.mjs
npx wrangler dev --config landing/wrangler.toml --port 8797 --compatibility-date 2026-06-03
npm run landing:deploy
```

Commit before deployment; `/site/version.json` identifies the source and asset fingerprints. Verify the live marker, video Range support and browser playback. Tests cover intra-chapter movement, forward/reverse targets, pending metadata/seeks, latest-target coalescing, paint opportunities, stationary frames, dialog suspension, viewport fit and rejected-asset exclusion.

Manual QA includes the actual rendered frames, normal/fast/backwards scroll, chapter jumps, desktop/mobile layouts, sound-dialog return, reduced motion and deep reload. Compare `data-presented-time` (browser compositor callback) with `data-target-time`; `currentTime` alone only proves a seek request. Evidence: `hiob/output/hiob-scroll-site-20260924/direct-scroll/`. Technical checks and Lighthouse are not evidence of creative quality or customer comprehension.

Production GTM, Meta Pixel, CAPI deduplication and GPC behavior are preserved. Localhost skips analytics. No external Three.js CDN or relaxed CSP was added. Rollback changes only this landing Worker.
