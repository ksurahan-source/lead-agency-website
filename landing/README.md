# HIOB product film / scroll site

The `hiob-creative-landing` Worker owns only `hi-ob.com/` and `/site/*`. Help, account, Studio, credit, API and legal routes retain their existing owners. No generation endpoint is changed or called by this website.

## Experience

The new 30-second HIOB product film appears in the first viewport. Native scrolling controls the same film clock as five six-second chapters: connect, direct, create, refine, deliver. The film expands from an introduction into a full-width scene. Three.js 0.186.0 supplies a VideoTexture, perspective camera, physical screen depth and contextual component planes with pointer parallax. The production-flow illustrations are labelled; this is not a screen recording or proof of unattended customer generation.

The page is progressively enhanced. It immediately paints a small poster and plays the native muted video. The separately bundled Three.js stage initializes on scrolling or pointer movement. Until its first successful render the native video remains visible. WebGL failure/context loss retains native scroll-controlled playback. Frame rendering happens on video frames, scroll/resize changes and bounded pointer settling, and stops offscreen, in a hidden tab or behind the sound dialog. Reduced motion/data saver removes pinning, autoplay and WebGL, and exposes all five explanatory steps.

The full sound button opens the original 1920×1080 MP4 with native playback controls and Korean caption track. It pauses the scrub video, then resumes the same scroll position on close. The original mix is unchanged. A 1280×720 desktop and 720×406 mobile silent derivative use six-frame keyframe intervals for seeking. The source film itself remains 30 seconds.

## Asset provenance

Approved source: `hiob/output/hiob-product-film-20260924/hiob-component-film-review.mp4`.
SHA-256: `01f00c89f0d6da85fda0c73ec4f30506051147b5c1ef361c5068dbdb77b9b19e`.
The components come from the same project's `components/rendered/Component{1,2,3,5,6,7}.png`. These were authored before the image and H3 generation pipeline. This website work makes no paid generation calls.

`hiob-film.mp4` is the original with audio; `hiob-scroll*.mp4` are new derivatives. The old ViewOK/showcase, old `hiob-reel` and untracked rejected `hiob-product-film.mp4` are not referenced or published. The build copies only media explicitly referenced in the current HTML and fingerprints those assets. The old `prepare-media.mjs` is historical and must not be run for this film.

## Build and verify

```sh
npm install
npm run landing:build
node --test landing/*.test.mjs
npx wrangler dev --config landing/wrangler.toml --port 8797 --compatibility-date 2026-06-03
npm run landing:deploy
```

Commit before deployment; `/site/version.json` identifies the committed source, asset byte sizes and fingerprints. Verify the live marker and media Range responses. The build tests prevent rejected media from returning to a release. Unit tests cover six-second chapter boundaries, reverse seeking, readiness/in-flight guards and mobile/desktop frame bounds.

Manual browser QA: forward/backward scroll, chapter jumps, currentTime versus targetTime, first-viewport playback, mobile layout, full sound, close/resume, motion toggle, reload and help/account links. Lighthouse is a lab measurement, not creative quality or customer conversion evidence. The localhost audit skips production analytics; always report production separately. Evidence: `hiob/output/hiob-scroll-site-20260924/evidence`.

The existing GTM, Meta Pixel, CAPI PageView deduplication and GPC behavior remain in production. Localhost does not send analytics. The CSP keeps the existing exact analytics allowlist; no external Three.js CDN or unsafe script execution is added. Fingerprinted chunks/media are immutable; the release marker and root revalidate. Roll back only this Worker's version if necessary.

References: [Three.js](https://threejs.org/docs/), [Aside](https://aside.com/), [Apple MacBook Air](https://www.apple.com/macbook-air/). These inform scale and scroll continuity; no reference media or interface source is copied.
