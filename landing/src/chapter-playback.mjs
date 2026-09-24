export const chapterRange = (chapter) => ({
  start: Math.max(0, Math.min(4, chapter)) * 6 + 0.04,
  // Stop before the next cut, including timeupdate-only browsers.
  end: Math.max(0, Math.min(4, chapter)) * 6 + 5.8,
});

// Scroll chooses a chapter; the media clock controls its speed. Latest selection
// wins across async seeks. Visibility/dialog changes preserve pause and hold.
export function createChapterPlayback(media, onState = () => {}) {
  let chapter = -1,
    active = false,
    paused = false,
    held = false;
  let pending = null,
    playPending = false,
    revision = 0;
  const state = () => ({ chapter, paused, held, active });
  function pump() {
    if (!active || chapter < 0 || media.readyState < 2) return;
    if (media.seeking) return;
    if (pending !== null) {
      const target = pending;
      pending = null;
      media.currentTime = target;
      return;
    }
    if (paused || held) {
      media.pause();
      return;
    }
    if (media.paused && !playPending) {
      playPending = true;
      const request = revision;
      Promise.resolve(media.play())
        .catch(() => {
          if (request === revision && active) {
            paused = true;
            onState(state());
          }
        })
        .finally(() => {
          playPending = false;
          if (active && request !== revision) pump();
        });
    }
  }
  function tick() {
    if (chapter < 0 || pending !== null || media.seeking) return;
    const { end } = chapterRange(chapter);
    if (!held && media.currentTime >= end) {
      held = true;
      media.pause();
      // A throttled browser may report a later frame; restore this scene's result.
      if (media.currentTime > end + 0.03) media.currentTime = end;
      onState(state());
    }
  }
  return {
    choose(next) {
      if (next === chapter) return;
      chapter = next;
      held = false;
      revision++;
      media.pause();
      pending = chapterRange(next).start;
      onState(state());
      pump();
    },
    setActive(next) {
      active = next;
      if (!next) {
        revision++;
        media.pause();
      } else pump();
    },
    togglePause() {
      paused = !paused;
      onState(state());
      pump();
    },
    replay() {
      if (chapter < 0) return;
      paused = false;
      held = false;
      revision++;
      media.pause();
      pending = chapterRange(chapter).start;
      onState(state());
      pump();
    },
    ready: pump,
    tick,
    state,
  };
}
