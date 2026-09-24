# Homepage readability repair — 2026-09-24

The olive palette was an authored choice, not a HIOB brand requirement. It was
present in both the film's components and the CSS/Three.js chassis. The renderer
uses sRGB textures with tone mapping disabled; no green colour shader was found.

The former linear clock advanced 29.88 film seconds over 4.4 viewport heights on
desktop and 3.7 on mobile: 6.79 / 8.08 seconds per viewport scroll. Each chapter
lasted only 6 seconds. Narration-paced footage is not a readable scrub sequence.

## Initial implementation contract (superseded playback behavior below)

- `src/scroll-scene.mjs:10`, `src/landing.js:44`: replace linear seeking with
  scroll-selected six-second chapters. Play at 1x, hold the result, expose replay
  and pause. Scroll stops selecting intermediate chapters after a brief settle;
  it never speeds up the film. Test transitions, reversals, deep entry and pause.
- `src/landing.css:1`, `src/stage-three.mjs:61`: neutral black/white surfaces,
  orange brand accent; remove duplicate floating cards around the film. Keep
  the real Three.js video plane and subtle pointer perspective. Visually inspect
  desktop and 375px mobile, with reduced motion/native video fallback.
- `motion/WebFilm.tsx:1`: web-specific action demonstrations with one focal area:
  attach material, review plan, assemble materials, trim selected shot, deliver.
  Existing H3 footage and approved narration are reused. All animation settles
  before the result hold. Render and inspect MP4 frames, not just React output.
- Publish only after local tests and visual review to the existing landing
  Worker (`hi-ob.com/` and `/site/*`); verify release marker and playback live.

These are illustrated product flows, not a screen recording or a generation-time
benchmark. No provider generation, voice purchase or Sonar run is needed.

## Direct scroll correction — 2026-09-24

User testing identified a contradiction: chapter autoplay makes scrolling select
a scene, but does not make the film follow the scroll. The 160ms settle timer also
delays feedback. The current contract supersedes that playback choice:

- `src/landing.js:46`, `src/scroll-playback.mjs:1`: replace chapter autoplay and
  settle timing with latest-position seeking. Scroll events produce a target;
  the controller sends it to the paused video, allowing a decoded frame to paint
  before another seek. Forward/reverse movement must change presented frames
  during scrolling; stopping must stop the film. Cover loading and modal return.
- `src/scroll-scene.mjs:11`: map scroll progress to the 900 film frames with no
  time-based easing. Keep 1000svh scroll distance and authored result holds for
  readability. Chapter buttons now navigate the same timeline.
- `public/site/media/hiob-scroll*.mp4`: re-encode existing silent masters with
  a three-frame GOP to reduce random-seek decoding. Preserve visuals and audio
  masters. Record the larger preview sizes and verify actual playback on the
  deployed Worker, not only media metadata or requested currentTime.

Colour, desktop/mobile composition and the real Three.js stage remain as in the
readability repair. No new generation or voice costs are incurred.
