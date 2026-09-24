# Homepage readability repair — 2026-09-24

The olive palette was an authored choice, not a HIOB brand requirement. It was
present in both the film's components and the CSS/Three.js chassis. The renderer
uses sRGB textures with tone mapping disabled; no green colour shader was found.

The former linear clock advanced 29.88 film seconds over 4.4 viewport heights on
desktop and 3.7 on mobile: 6.79 / 8.08 seconds per viewport scroll. Each chapter
lasted only 6 seconds. Narration-paced footage is not a readable scrub sequence.

## Implementation contract (five tuples)

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
