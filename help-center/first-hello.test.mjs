import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import * as install from './src/mcpInstall.mjs';
test('first-use prompt starts a human setup conversation without an internal diagnostics checklist',async()=>{
 assert.equal(typeof install.MCP_FIRST_START_PROMPT,'string');
 assert.match(install.MCP_FIRST_START_PROMPT,/처음/);
 assert.match(install.MCP_FIRST_START_PROMPT,/YES\/NO/);
 assert.match(install.MCP_FIRST_START_PROMPT,/유료.*하지/);
 const page=await fs.readFile(new URL('./src/HelpArticles.jsx',import.meta.url),'utf8');
 assert.match(page,/text=\{MCP_FIRST_START_PROMPT\}/);
});
