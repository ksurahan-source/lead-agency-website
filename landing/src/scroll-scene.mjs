export const clamp = value => Math.max(0, Math.min(1, value));
export function scrollProgress(top, height, viewport) {
  return clamp(-top / Math.max(1, height - viewport));
}
export function sceneState(progress, duration = 0) {
  const p = clamp(progress);
  const ramp = (start, end) => clamp((p - start) / (end - start));
  return {
    progress: p,
    dock: ramp(.03, .27),
    intro: 1 - ramp(.015, .13),
    direction: ramp(.15, .27) * (1 - ramp(.46, .55)),
    edit: ramp(.48, .58) * (1 - ramp(.77, .86)),
    finish: ramp(.81, .91),
    timeline: ramp(.44, .62),
    time: p * Math.max(0, Number.isFinite(duration) ? duration - .08 : 0),
    chapter: p < .16 ? 0 : p < .5 ? 1 : p < .83 ? 2 : 3,
  };
}
