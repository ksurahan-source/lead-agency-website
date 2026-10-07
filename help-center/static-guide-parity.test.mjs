import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {MCP_RELEASE} from './src/mcpRelease.generated.mjs';

for(const [entry,canonical] of [['production-workflow','workflow'],['error-recovery','error-recovery-guide']]) {
  test(`current imported skill ${entry} entry matches the maintained ${canonical} guide`,async()=>{
    const root=new URL(`public/help/skills/hiob-video-${MCP_RELEASE.version}/`,import.meta.url);
    const skill=await readFile(new URL('SKILL.md',root),'utf8');
    assert.ok(skill.includes(`references/${entry}.md`));
    assert.deepEqual(await readFile(new URL(`references/${entry}.md`,root)),
      await readFile(new URL(`references/${canonical}.md`,root)));
  });
}
