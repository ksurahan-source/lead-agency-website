export const clamp = (value) =>
  Math.max(0, Math.min(1, Number.isFinite(value) ? value : 0));
export const smoothstep = (a, b, value) => {
  const t = clamp((value - a) / (b - a));
  return t * t * (3 - 2 * t);
};
export function scrollProgress(top, height, viewport) {
  return clamp(-top / Math.max(1, height - viewport));
}
// All five six-second film chapters, DOM labels and 3D poses share this clock.
export function sceneState(progress, duration = 30) {
  const p = clamp(progress);
  const validDuration =
    Number.isFinite(duration) && duration > 0 ? duration : 0;
  const time = p * Math.max(0, validDuration - 0.12);
  const chapter = Math.min(
    4,
    Math.floor(time / Math.max(0.001, validDuration / 5)),
  );
  const phase = validDuration ? time / (validDuration / 5) - chapter : 0;
  return {
    progress: p,
    time,
    chapter,
    phase,
    open: smoothstep(0, 0.12, p),
    dark: smoothstep(0.38, 0.43, p) * (1 - smoothstep(0.57, 0.62, p)),
    finish: smoothstep(0.91, 1, p),
    turn: Math.sin(phase * Math.PI) * 0.035,
  };
}
export function shouldSeek(current, desired, readyState, seeking) {
  return (
    readyState >= 2 &&
    !seeking &&
    Number.isFinite(desired) &&
    Math.abs(current - desired) > 0.025
  );
}

export function frameLayout(width, height, open) {
  const mobile = width < 700;
  const first = mobile
    ? width * 0.91
    : Math.min(
        width * 0.82,
        (Math.max(180, Math.min(height - 340, height * 0.82 - 200)) * 16) / 9,
      );
  const last = mobile
    ? width * 0.96
    : Math.min(width * 0.91, ((height - 202) * 16) / 9);
  return {
    width: first + (last - first) * open,
    y:
      height *
      ((mobile ? 0.54 : 0.59) +
        ((mobile ? 0.48 : 0.5) - (mobile ? 0.54 : 0.59)) * open),
    mobile,
  };
}
