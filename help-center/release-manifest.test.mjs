import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { MCP_RELEASE } from './src/mcpInstall.mjs';
test('help descriptor is generated from the pinned public release manifest', () => {
  const manifest = JSON.parse(readFileSync(new URL('./public/help/mcp-release.json', import.meta.url), 'utf8'));
  assert.deepEqual(MCP_RELEASE, manifest);
  const guide = readFileSync(new URL(`./public/help/skills/production-guide-${MCP_RELEASE.version}.md`, import.meta.url), 'utf8');
  assert.match(guide, /project_context.journey/);
  assert.match(guide, /target.*preview/);
});
