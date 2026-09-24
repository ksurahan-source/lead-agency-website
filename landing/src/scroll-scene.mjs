export const clamp = (value) =>
  Math.max(0, Math.min(1, Number.isFinite(value) ? value : 0));
export const smoothstep = (a, b, value) => {
  const t = clamp((value - a) / (b - a));
  return t * t * (3 - 2 * t);
};
export function scrollProgress(top, height, viewport) {
  return clamp(-top / Math.max(1, height - viewport));
}
// Progress selects an entire scene, never a timestamp within it.
export function sceneState(progress, duration = 30) {
  const p = clamp(progress);
  const validDuration =
    Number.isFinite(duration) && duration > 0 ? duration : 0;
  const chapter = Math.min(4, Math.floor(p * 5));
  const time = validDuration ? (chapter * validDuration) / 5 : 0;
  const phase = p * 5 - chapter;
  return {
    progress: p,
    time,
    chapter,
    phase,
    open: smoothstep(0, 0.12, p),
    dark: smoothstep(0.38, 0.43, p) * (1 - smoothstep(0.57, 0.62, p)),
    finish: smoothstep(0.91, 1, p),
    turn: 0,
  };
}
export function frameLayout(width, height, open, aspect = 16 / 9) {
  const mobile = width < 700;
  const first = mobile
    ? Math.min(width * 0.88, (height - 315) * aspect)
    : Math.min(
        width * 0.82,
        Math.max(180, Math.min(height - 340, height * 0.82 - 200)) * aspect,
      );
  const last = mobile
    ? Math.min(width * 0.96, (height - 250) * aspect)
    : Math.min(width * 0.91, (height - 202) * aspect);
  return {
    width: first + (last - first) * open,
    y:
      height *
      ((mobile ? 0.52 : 0.59) +
        ((mobile ? 0.48 : 0.5) - (mobile ? 0.52 : 0.59)) * open),
    mobile,
    aspect,
  };
}
