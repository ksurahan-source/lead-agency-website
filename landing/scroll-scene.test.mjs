import test from "node:test";
import assert from "node:assert/strict";
import {
  scrollProgress,
  sceneState,
  shouldSeek,
  frameLayout,
} from "./src/scroll-scene.mjs";

test("forward and reverse scrolling return to the same frame without drift", () => {
  const times = [0, 0.25, 0.8, 0.25, 0].map((p) => sceneState(p, 30).time);
  assert.equal(times[1], times[3]);
  assert.equal(times[0], times[4]);
  assert.ok(times[2] > times[1]);
  assert.equal(sceneState(1, 30).time, 29.88);
});
test("chapters align with the actual five six-second film sections", () => {
  for (let chapter = 0; chapter < 5; chapter++) {
    const p = (chapter * 6 + 1) / 29.88;
    assert.equal(sceneState(p, 30).chapter, chapter);
    assert.ok(Math.abs(sceneState(p, 30).time - (chapter * 6 + 1)) < 1e-8);
  }
  assert.equal(sceneState(6 / 29.88, 30).chapter, 1);
  assert.equal(sceneState(24 / 29.88, 30).chapter, 4);
  assert.equal(sceneState(1, 30).chapter, 4);
});
test("missing metadata and out-of-bounds scroll never produce an invalid media seek", () => {
  for (const d of [0, NaN, Infinity, -5])
    assert.equal(sceneState(0.5, d).time, 0);
  assert.equal(sceneState(-10, 30).time, 0);
  assert.equal(sceneState(10, 30).time, 29.88);
  assert.equal(sceneState(NaN, 30).progress, 0);
});
test("the sticky scene ends at its own viewport boundary, including short mobile viewports", () => {
  for (const viewport of [620, 720, 844]) {
    const height = viewport * 4.7;
    assert.equal(scrollProgress(0, height, viewport), 0);
    assert.equal(scrollProgress(-(height - viewport), height, viewport), 1);
    assert.equal(scrollProgress(200, height, viewport), 0);
  }
});
test("seeking waits for decoded media and never overwrites an in-flight seek", () => {
  assert.equal(shouldSeek(2, 8, 4, false), true);
  assert.equal(shouldSeek(2, 8, 1, false), false);
  assert.equal(shouldSeek(2, 8, 4, true), false);
  assert.equal(shouldSeek(8, 8.01, 4, false), false);
  assert.equal(shouldSeek(2, NaN, 4, false), false);
});
test("the entire landscape film fits mobile and desktop throughout the scroll", () => {
  for (const [width, height] of [
    [390, 844],
    [375, 667],
    [1280, 720],
    [1440, 900],
    [1920, 1080],
  ]) {
    for (const p of [0, 0.05, 0.2, 0.5, 1]) {
      const l = frameLayout(width, height, sceneState(p).open);
      assert.ok(l.width < width);
      assert.ok(l.y - (l.width * 9) / 32 >= 70);
      assert.ok(l.y + (l.width * 9) / 32 <= height - 90);
    }
  }
});
