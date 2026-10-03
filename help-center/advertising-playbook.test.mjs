import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { playbook, playbookMarkdown, markdownPath } from './src/advertisingPlaybook.mjs';
import { searchHelp } from './src/helpTopics.mjs';
import worker from './worker.mjs';
const read = path => readFile(new URL('./dist' + path, import.meta.url), 'utf8');
const decode = text => text.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#x27;', "'").replaceAll('&lt;', '<').replaceAll('&gt;', '>');
test('visible manual and downloadable instructions retain every prompt, output and acceptance check', async () => {
  const html = decode(await read('/help/advertising/index.html'));
  const md = await read(markdownPath);
  assert.equal(md, playbookMarkdown());
  for (const prompt of [playbook.masterPrompt, ...playbook.steps.map(step => step.prompt)]) {
    assert.ok(html.includes('<pre>' + prompt + '</pre>'));
    assert.ok(html.includes('data-copy="'));
    assert.ok(md.includes(prompt));
  }
  for (const step of playbook.steps) {
    assert.ok(html.includes(step.output)); assert.ok(html.includes(step.pass));
    for (const source of step.sources) assert.ok(playbook.sources.some(s => s.id === source));
  }
  assert.ok(!html.includes('data-article-toc'));
  for (const query of ['인물카드', '기획서', '소품']) assert.ok(searchHelp(query).some(a => a.id === 'advertising'));
});
test('published markdown has a correct response type and unrelated downloads still return 404', async () => {
  const env = { ASSETS: { fetch: async request => {
    try { return new Response(await read(new URL(request.url).pathname)); }
    catch { return new Response('missing', {status: 404}); }
  } } };
  const response = await worker.fetch(new Request('https://hi-ob.com' + markdownPath), env);
  assert.equal(response.status, 200); assert.match(response.headers.get('content-type'), /text\/markdown/);
  assert.equal(await response.text(), playbookMarkdown());
  const missing = await worker.fetch(new Request('https://hi-ob.com/help/skills/unreviewed.md'), env);
  assert.equal(missing.status, 404);
});
test('reference images are visible in HTML and Markdown and their exact JPEG bytes are publicly routed', async () => {
  const html = await read('/help/advertising/index.html');
  const md = await read(markdownPath);
  const images = playbook.steps.flatMap(step => step.images || []);
  assert.equal(images.length, 2);
  const env = {ASSETS:{fetch:async request => {
    try {return new Response(await readFile(new URL('./dist'+new URL(request.url).pathname, import.meta.url)), {headers:{'Content-Type':'image/jpeg'}});}
    catch {return new Response('missing',{status:404});}
  }}};
  for (const image of images) {
    assert.ok(html.includes(`src="${image.src}"`));
    assert.ok(md.includes(`![${image.alt}](https://hi-ob.com${image.src})`));
    assert.ok(html.includes(image.sourceUrl));
    const response = await worker.fetch(new Request('https://hi-ob.com'+image.src),env);
    assert.equal(response.status,200);
    assert.equal(response.headers.get('content-type'),'image/jpeg');
    const bytes = Buffer.from(await response.arrayBuffer());
    assert.deepEqual(bytes,await readFile(new URL('./public'+image.src,import.meta.url)));
    assert.equal(bytes.subarray(0,3).toString('hex'),'ffd8ff');
  }
  assert.equal((await worker.fetch(new Request('https://hi-ob.com/help/assets/unreviewed.png'),env)).status,404);
});
