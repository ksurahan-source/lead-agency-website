import test from "node:test";
import assert from "node:assert/strict";
import {
  scrollProgress,
  sceneState,
  frameLayout,
} from "./src/scroll-scene.mjs";
import { createScrollPlayback } from "./src/scroll-playback.mjs";

test("every position maps to a frame, including movement inside one chapter", () => {
  assert.equal(sceneState(0.22).time, 6.6);
  assert.equal(sceneState(0.23).time, 6.9);
  assert.deepEqual([0.22, 0.5, 0.22].map((p) => sceneState(p).time), [6.6, 15, 6.6]);
  assert.equal(sceneState(0.2).chapter, 1);
  assert.equal(sceneState(0.4).chapter, 2);
  assert.equal(sceneState(1).time, 899 / 30);
  for (const d of [0, NaN, Infinity, -1])
    assert.equal(sceneState(0.5, d).time, 0);
});
test("the expanded scroll distance prevents a single viewport from skipping a chapter", () => {
  for (const viewport of [620, 720, 844]) {
    const p = scrollProgress(-viewport, viewport * 10, viewport);
    assert.equal(sceneState(p).chapter, 0);
    assert.ok(sceneState(p).time < 3.4);
  }
});
function fixture() {
  const requests = [],
    frames = [],
    decoded = [];
  const media = {
    readyState: 4,
    seeking: false,
    paused: true,
    duration: 30,
    _time: 0,
    get currentTime() {
      return this._time;
    },
    set currentTime(t) {
      this._time = t;
      this.seeking = true;
      requests.push(t);
    },
    pause() {
      this.paused = true;
    },
    play() {
      throw new Error("Scroll surface must not autoplay");
    },
  };
  const p = createScrollPlayback(media, {
    afterPaint: (cb) => frames.push(cb),
    onDecoded: (t) => decoded.push(t),
    now: () => 10,
  });
  return {
    media,
    p,
    requests,
    frames,
    decoded,
    finish() {
      media.seeking = false;
      p.decoded();
    },
    paint() {
      frames.shift()?.();
    },
  };
}
test("forward and reverse requests apply immediately when ready, without waiting for scroll end", () => {
  const f = fixture();
  f.p.setActive(true);
  f.p.seek(6.6);
  assert.deepEqual(f.requests, [6.6]);
  f.finish();
  f.paint();
  f.p.seek(5.3);
  assert.deepEqual(f.requests, [6.6, 5.3]);
  assert.equal(f.media.paused, true);
});
test("coalesce in-flight seeks to the latest position and allow each decoded frame to paint", () => {
  const f = fixture();
  f.p.setActive(true);
  f.p.seek(4);
  f.p.seek(8);
  f.p.seek(2);
  assert.deepEqual(f.requests, [4]);
  f.finish();
  assert.deepEqual(f.decoded, [4]);
  assert.deepEqual(f.requests, [4]);
  f.p.seek(1);
  f.paint();
  assert.deepEqual(f.requests, [4, 1]);
});
test("a stationary scroll position does not replay or advance by itself", () => {
  const f = fixture();
  f.p.setActive(true);
  f.p.seek(13.5);
  f.finish();
  f.paint();
  for (let i = 0; i < 50; i++) {
    f.p.seek(13.5);
    f.p.ready();
  }
  assert.deepEqual(f.requests, [13.5]);
  assert.equal(f.media.currentTime, 13.5);
});
test("metadata loading and dialog or visibility suspension retain only the latest target", () => {
  const f = fixture();
  f.media.readyState = 0;
  f.p.setActive(true);
  f.p.seek(24);
  f.p.seek(19);
  assert.deepEqual(f.requests, []);
  f.media.readyState = 4;
  f.p.ready();
  assert.deepEqual(f.requests, [19]);
  f.finish();
  f.p.setActive(false);
  f.p.seek(10);
  f.paint();
  assert.deepEqual(f.requests, [19]);
  f.p.setActive(true);
  assert.deepEqual(f.requests, [19, 10]);
});
test("invalid targets cannot escape the actual media duration", () => {
  const f = fixture();
  f.p.setActive(true);
  f.p.seek(NaN);
  f.p.seek(Infinity);
  assert.deepEqual(f.requests, []);
  f.p.seek(100);
  assert.equal(f.requests[0], 30 - 1 / 30);
  f.finish();
  f.paint();
  f.p.seek(-4);
  assert.equal(f.requests.at(-1), 0);
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
