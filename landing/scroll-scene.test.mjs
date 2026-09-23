import test from 'node:test';
import assert from 'node:assert/strict';
import { scrollProgress, sceneState } from './src/scroll-scene.mjs';

test('scroll keeps the film at a stable time and reverses without accumulating drift', () => {
  const times = [0, .25, .8, .25, 0].map(p => sceneState(p, 6).time);
  assert.equal(times[1], times[3]);
  assert.equal(times[0], times[4]);
  assert.ok(times[2] > times[1]);
  assert.ok(sceneState(1, 6).time < 6);
});
test('the sticky scene reaches its end at the viewport boundary on mobile and desktop', () => {
  for (const viewport of [720, 844]) {
    const height = viewport * 4.6;
    assert.equal(scrollProgress(0, height, viewport), 0);
    assert.equal(scrollProgress(-(height - viewport), height, viewport), 1);
    assert.equal(scrollProgress(200, height, viewport), 0);
  }
});
test('the visual remains mounted while narrative chapters change', () => {
  assert.equal(sceneState(0).intro, 1);
  assert.equal(sceneState(.32).direction, 1);
  assert.equal(sceneState(.66).edit, 1);
  assert.equal(sceneState(.96).finish, 1);
  assert.equal(sceneState(.96).dock, 1);
  assert.equal(sceneState(.96).timeline, 1);
  assert.equal(sceneState(.5, NaN).time, 0);
});
