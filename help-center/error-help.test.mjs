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
