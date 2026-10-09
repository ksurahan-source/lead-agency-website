import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import vault from './src/creativeVault.generated.json' with {type:'json'};
import { searchHelp } from './src/helpTopics.mjs';
import worker from './worker.mjs';
const root = new URL('./',import.meta.url);
const read = path => readFile(new URL('dist'+path,root));
test('creative notes render headings separately from instructions, lists and links',async()=>{
  const html=(await read('/help/creative-vault/index.html')).toString();
  assert.equal((html.match(/<details /g)||[]).length,13);
  const headings=[...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)].map(m=>m[1]);
  assert.ok(headings.length>=50);
  for(const heading of headings){assert.ok(!heading.includes('\n'));assert.ok(heading.length<150);}
  assert.ok(html.includes('<ul>'));assert.ok(html.includes('<ol>'));
  assert.ok(html.includes('href="'+vault.noteBase+'01-BEAT-GROUPS.md"'));
  assert.ok(html.includes('3–5초'));assert.ok(html.includes('creative_vault'));
  assert.ok(searchHelp('의미 묶음').some(a=>a.id==='creative-vault'));
});
test('public markdown, bundled JSON and ZIP have exactly the same 13 notes',async()=>{
  const zipPath=new URL('public'+vault.downloadPath,root).pathname;
  const files=execFileSync('unzip',['-Z1',zipPath],{encoding:'utf8'}).trim().split('\n').filter(p=>!p.endsWith('/'));
  assert.equal(files.length,14);
  for(const note of vault.notes){
    const bytes=await read(vault.noteBase+note.file);
    assert.equal(bytes.toString(),note.text);
    assert.equal(createHash('sha256').update(bytes).digest('hex'),note.sha256);
    assert.equal(execFileSync('unzip',['-p',zipPath,vault.noteBase.split('/').filter(Boolean).at(-1)+'/'+note.file],{encoding:'utf8'}),note.text);
  }
});
test('Vault download routes serve notes and ZIP but reject unrelated paths',async()=>{
  const env={ASSETS:{fetch:async req=>{try{return new Response(await read(new URL(req.url).pathname));}catch{return new Response('missing',{status:404});}}}};
  const get=p=>worker.fetch(new Request('https://hi-ob.com'+p),env);
  const note=await get(vault.noteBase+vault.notes[0].file);
  assert.equal(note.status,200);assert.match(note.headers.get('content-type'),/text\/markdown/);
  assert.equal(await note.text(),vault.notes[0].text);
  const zip=await get(vault.downloadPath);assert.equal(zip.status,200);
  assert.match(zip.headers.get('content-type'),/zip/);
  assert.equal((await get('/help/skills/private.md')).status,404);
});
