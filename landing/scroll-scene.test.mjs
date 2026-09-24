import test from "node:test";
import assert from "node:assert/strict";
import {
  scrollProgress,
  sceneState,
  frameLayout,
} from "./src/scroll-scene.mjs";
import {
  chapterRange,
  createChapterPlayback,
} from "./src/chapter-playback.mjs";

test("scroll selects whole scenes; moving within a scene cannot accelerate its clock", () => {
  assert.equal(sceneState(0.22).time, sceneState(0.39).time);
  assert.deepEqual(
    [0, 0.22, 0.42, 0.62, 0.92, 1].map((p) => sceneState(p).chapter),
    [0, 1, 2, 3, 4, 4],
  );
  assert.equal(sceneState(0.62).time, 18);
  assert.equal(sceneState(-4).chapter, 0);
  assert.equal(sceneState(NaN).progress, 0);
});
test("a viewport scroll stays within one scene and never skips a complete scene", () => {
  for (const viewport of [620, 720, 844]) {
    const p = scrollProgress(-viewport, viewport * 10, viewport);
    assert.equal(sceneState(p).chapter, 0);
    assert.equal(scrollProgress(-viewport * 9, viewport * 10, viewport), 1);
  }
});
function mockMedia() {
  return {
    readyState: 4,
    seeking: false,
    paused: true,
    currentTime: 0,
    playbackRate: 1,
    play() {
      this.paused = false;
      return Promise.resolve();
    },
    pause() {
      this.paused = true;
    },
  };
}
test("a deep entry plays from the selected scene start and holds before the next cut", () => {
  const media = mockMedia(),
    p = createChapterPlayback(media);
  p.setActive(true);
  p.choose(3);
  p.ready();
  assert.equal(media.currentTime, 18.04);
  assert.equal(media.paused, false);
  media.currentTime = 23.81;
  p.tick();
  assert.equal(media.paused, true);
  assert.equal(p.state().held, true);
  p.setActive(false);
  p.setActive(true);
  assert.equal(media.paused, true);
  p.replay();
  p.ready();
  assert.equal(media.currentTime, 18.04);
  assert.equal(p.state().held, false);
  assert.equal(media.playbackRate, 1);
});
test("latest selection wins while a previous seek or metadata load is pending", () => {
  const media = mockMedia(),
    p = createChapterPlayback(media);
  media.readyState = 0;
  p.setActive(true);
  p.choose(1);
  p.choose(4);
  assert.equal(media.currentTime, 0);
  media.readyState = 4;
  media.seeking = true;
  p.ready();
  p.choose(2);
  media.seeking = false;
  p.ready();
  assert.equal(media.currentTime, 12.04);
  p.ready();
  assert.equal(media.paused, false);
  p.choose(0);
  p.ready();
  assert.equal(media.currentTime, 0.04);
});
test("manual pause survives a dialog roundtrip and changing scenes", () => {
  const media = mockMedia(),
    p = createChapterPlayback(media);
  p.setActive(true);
  p.choose(0);
  p.ready();
  p.togglePause();
  p.setActive(false);
  p.setActive(true);
  p.choose(2);
  p.ready();
  assert.equal(media.paused, true);
  assert.equal(p.state().paused, true);
  p.togglePause();
  assert.equal(p.state().paused, false);
});
test("late timeupdate restores the selected result instead of showing the next scene", () => {
  const media = mockMedia(),
    p = createChapterPlayback(media);
  p.setActive(true);
  p.choose(2);
  p.ready();
  media.currentTime = 18.2;
  p.tick();
  assert.equal(media.currentTime, chapterRange(2).end);
  assert.equal(media.paused, true);
});
test("autoplay rejection exposes paused state without losing the selected chapter", async () => {
  const media = mockMedia();
  media.play = () => Promise.reject(new Error("blocked"));
  const p = createChapterPlayback(media);
  p.setActive(true);
  p.choose(3);
  p.ready();
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(p.state().paused, true);
  assert.equal(p.state().chapter, 3);
});
test("the complete film stays inside short mobile and desktop viewports", () => {
  for (const [w, h] of [
    [390, 844],
    [375, 667],
    [1280, 720],
    [1920, 1080],
  ]) {
    for (const p of [0, 0.05, 0.2, 0.5, 1]) {
      const l = frameLayout(w, h, sceneState(p).open);
      assert.ok(l.width < w);
      assert.ok(l.y - (l.width * 9) / 32 >= 70);
      assert.ok(l.y + (l.width * 9) / 32 <= h - 90);
    }
  }
});

test("square mobile footage fits above the playback controls, including resize to desktop", () => {
  for (const [w, h] of [
    [360, 667],
    [390, 844],
    [1280, 720],
  ]) {
    for (const p of [0, 0.1, 0.5, 1]) {
      const l = frameLayout(w, h, sceneState(p).open, 1);
      assert.ok(l.y - l.width / 2 >= 70);
      assert.ok(l.y + l.width / 2 <= h - (w < 700 ? 130 : 90));
      assert.equal(l.aspect, 1);
    }
  }
});
