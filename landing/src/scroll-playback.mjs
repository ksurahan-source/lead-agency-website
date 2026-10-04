// Latest position wins. Let a decoded frame paint before starting another seek;
// chaining currentTime changes inside seeked can starve the visible video surface.
export function createScrollPlayback(
  media,
  {
    afterPaint = (callback) =>
      requestAnimationFrame(() => requestAnimationFrame(callback)),
    onDecoded = () => {},
    now = () => performance.now(),
  } = {},
) {
  let active = false,
    target = 0,
    cooling = false,
    startedAt = 0;
  function pump() {
    if (!active || cooling || media.seeking || media.readyState < 2) return;
    if (!Number.isFinite(media.duration) || media.duration <= 0) return;
    const bounded = Math.max(0, Math.min(target, media.duration - 1 / 30));
    if (Math.abs(media.currentTime - bounded) < 1 / 60) return;
    startedAt = now();
    media.currentTime = bounded;
  }
  return {
    seek(time) {
      if (!Number.isFinite(time)) return;
      target = Math.max(0, time);
      pump();
    },
    setActive(next) {
      active = next;
      if (!media.paused) media.pause();
      if (next) pump();
    },
    ready: pump,
    decoded() {
      onDecoded(media.currentTime, Math.max(0, now() - startedAt));
      cooling = true;
      afterPaint(() => {
        cooling = false;
        pump();
      });
    },
  };
}
