import test from 'node:test';
import assert from 'node:assert/strict';
import {recoverWindows} from './public/help/tools/windows-recovery-1.mjs';
for (const repair of [false,true]) test('retired recovery never starts or installs local engines, repair='+repair, async()=>{
 const result=await recoverWindows({repair},{run:()=>{throw Error('no system commands');}});
 assert.equal(result.retired,true);assert.equal(result.ready,false);
 assert.deepEqual(result.actions,[]);assert.equal(result.paidCalls,0);
 assert.equal(result.blocker.code,'LEGACY_RECOVERY_RETIRED');
});
