import test from 'node:test';
import assert from 'node:assert/strict';
import worker from './worker.mjs';
import { MCP_RELEASE } from './src/mcpInstall.mjs';

test('current and previous production guides reach assets with their exact path', async () => {
  for (const version of [MCP_RELEASE.version, '1.1.1', '1.1.0', '1.0.0']) {
    const path = `/help/skills/production-guide-${version}.md`;
    for (const method of ['GET', 'HEAD']) {
      let received;
      const response = await worker.fetch(new Request('https://hi-ob.com' + path, {method}), {
        ASSETS: {fetch: async request => {
          received = new URL(request.url).pathname;
          return new Response('guide');
        }},
      });
      assert.equal(received, path);
      assert.equal(response.status, 200);
      assert.match(response.headers.get('content-type'), /^text\/markdown/);
      assert.equal(await response.text(), method === 'HEAD' ? '' : 'guide');
    }
  }
});

test('unpublished guide versions remain unavailable', async () => {
  for (const path of ['/help/skills/production-guide-1.2.1.md', '/help/skills/production-guide-9.9.9.md']) {
    let received;
    const response = await worker.fetch(new Request('https://hi-ob.com' + path), {
      ASSETS: {fetch: async request => { received = new URL(request.url).pathname; return new Response('not found'); }},
    });
    assert.equal(received, '/help/404.html');
    assert.equal(response.status, 404);
    assert.equal(response.headers.get('x-robots-tag'), 'noindex');
  }
});
