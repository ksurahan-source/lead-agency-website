import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('./dist/help/create/index.html', import.meta.url), 'utf8');
test('preparation guidance appears before draft and delivery in the customer document', () => {
  const preparation = html.indexOf('사용할 수 있는 기능과 준비 상태를 확인하세요');
  const draft = html.indexOf('먼저 짧은 편집 시안을 확인하세요');
  assert.ok(preparation > -1 && draft > preparation);
  assert.ok(html.includes('reference_prepare'));
});
test('the copied first request includes reference preparation and preserves the full approved script', () => {
  const firstRequest = html.match(/<pre>(HIOB로 이 자료의 핵심[\s\S]*?)<\/pre>/)?.[1];
  assert.ok(firstRequest);
  for (const phrase of ['capability_list','reference_prepare','한 나레이터','대본 전문','같은 작업 ID','승인 원문']) assert.ok(firstRequest.includes(phrase), phrase);
});
