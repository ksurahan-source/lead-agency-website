import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {PUBLIC_ROUTES} from './src/routes.mjs';
import worker from './worker.mjs';
test('every error group has a crawlable canonical route and unique code anchor',async()=>{
 const data=JSON.parse(await fs.readFile(new URL('./src/errorHelp.generated.json',import.meta.url)));
 const routes=new Set(PUBLIC_ROUTES.map(r=>r.path));assert.ok(routes.has('/help/errors'));
 const codes=new Set();
 for(const group of data.groups){
  const path='/help/errors/'+group.id;assert.ok(routes.has(path),path);
  const response=await worker.fetch(new Request('https://hi-ob.com'+path),{ASSETS:{fetch:async req=>new Response(req.url)}});
  assert.equal(response.status,200);assert.equal(response.headers.get('x-robots-tag'),null);
  for(const {code} of group.codes){assert.ok(!codes.has(code));codes.add(code);}
 }
 assert.equal(codes.size,data.codeCount);
 assert.doesNotMatch(JSON.stringify(data),/\/Users\/|sourceConditions|condition":|jobId":|token":/);
});

test('specific length and face-input errors publish conditional alternatives without private data',async()=>{
 const data=JSON.parse(await fs.readFile(new URL('./src/errorHelp.generated.json',import.meta.url)));
 for(const code of ['HIOB_REFERENCE_PROMPT_TOO_LONG','SEEDANCE_LEGACY_FACE_FRAME_BLOCKED']){
  const group=data.groups.find(g=>g.codes.some(c=>c.code===code)),entry=group.codes.find(c=>c.code===code);assert.ok(entry.alternatives?.length>=2);
  const html=await fs.readFile(new URL(`./dist/help/errors/${group.id}/index.html`,import.meta.url),'utf8');
  for(const alternative of entry.alternatives){assert.ok(html.includes(alternative.description));for(const condition of alternative.conditions)assert.ok(html.includes(condition));}
 }
});
