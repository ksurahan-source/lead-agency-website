import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import worker from './worker.mjs';
import { MCP_RELEASE } from './src/mcpInstall.mjs';

const root = fileURLToPath(new URL('./', import.meta.url));
const version = MCP_RELEASE.version;
const skillNames = [
  'hiob-video', 'hiob-creative-harness', 'hiob-visual-direction',
  'hiob-reference-cards', 'hiob-scene-planning', 'hiob-creative-refine',
  'hiob-creative-edit', 'hiob-ad-copy-humanizer', 'hiob-motion-graphics', 'hiob-actor-performance',
];

async function filesIn(folder) {
  const entries = await readdir(folder, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const file = path.join(folder, entry.name);
    if (entry.isDirectory()) files.push(...await filesIn(file));
    else if (entry.isFile()) files.push(file);
  }
  return files.sort();
}

test(`every ${version} skill and relative Markdown reference is complete`, async () => {
  for (const name of skillNames) {
    const folder = path.join(root, 'public/help/skills', `${name}-${version}`);
    const skill = await readFile(path.join(folder, 'SKILL.md'), 'utf8');
    assert.match(skill, new RegExp(`^---\\nname: ${name}\\n`));
    for (const file of await filesIn(folder)) {
      assert.match(file, /\.md$/, 'Skill bundles must not contain executable planet code');
      const markdown = await readFile(file, 'utf8');
      for (const [, destination] of markdown.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
        if (/^(?:[a-z]+:|\/|#)/i.test(destination)) continue;
        const target = path.resolve(path.dirname(file), destination.split('#')[0]);
        assert.ok(target.startsWith(folder + path.sep), `Reference leaves the skill: ${file} -> ${destination}`);
        assert.ok((await stat(target)).isFile(), `${file} -> ${destination}`);
      }
    }
  }
});

test(`${version} video ZIP contains the exact public skill with only reviewed Markdown files`, async () => {
  const folder = path.join(root, 'public/help/skills', `hiob-video-${version}`);
  const archive = path.join(root, 'dist/help', `hiob-video-skill-${version}.zip`);
  const bundles=[['hiob-video',folder],...['hiob-ad-copy-humanizer','hiob-motion-graphics','hiob-actor-performance'].map(name=>[name,path.join(root,'public/help/skills',`${name}-${version}`)])];
  const files=[];
  for(const [name,dir] of bundles) for(const file of await filesIn(dir))files.push({file,entry:name+'/'+path.relative(dir,file).split(path.sep).join('/')});
  const names = execFileSync('unzip', ['-Z1', archive], { encoding: 'utf8' }).trim().split('\n');
  const expected = files.map(({entry}) => entry);
  assert.deepEqual(names.sort(), expected.sort());
  for (const {file,entry} of files) {
    assert.deepEqual(execFileSync('unzip', ['-p', archive, entry]), await readFile(file), entry);
    assert.match(entry, /\.md$/);
  }
});

test('worker serves all current skill assets and rejects executable or unreviewed paths', async () => {
  const assets = [];
  for (const name of skillNames) {
    for (const file of await filesIn(path.join(root, 'public/help/skills', `${name}-${version}`))) {
      assets.push('/help/skills/' + path.relative(path.join(root, 'public/help/skills'), file).split(path.sep).join('/'));
    }
  }
  for (const guide of ['production-guide', 'inspection-guide', 'asset-library-guide']) {
    assets.push(`/help/skills/${guide}-${version}.md`);
  }
  assets.push(`/help/hiob-video-skill-${version}.zip`);
  const env = {
    ASSETS: {
      fetch: async request => {
        try { return new Response(await readFile(path.join(root, 'dist', new URL(request.url).pathname))); }
        catch { return new Response('missing', { status: 404 }); }
      },
    },
  };
  for (const asset of assets) {
    const response = await worker.fetch(new Request('https://hi-ob.com' + asset), env);
    assert.equal(response.status, 200, asset);
    assert.match(response.headers.get('content-type'), asset.endsWith('.zip') ? /zip/ : /markdown/);
  }
  for (const asset of [
    `/help/skills/hiob-reference-cards-${version}/prepare.py`,
    `/help/skills/hiob-video-${version}/.env`,
    `/help/skills/hiob-video-${version}/references/private.json`,
    '/help/skills/hiob-reference-cards-1.4.2/SKILL.md',
    '/help/skills/hiob-reference-cards-9.9.9/SKILL.md',
    `/help/skills/hiob-actor-performance-${version}/scripts/submit.py`,
    '/help/skills/hiob-motion-graphics-1.9.33/SKILL.md',
  ]) assert.equal((await worker.fetch(new Request('https://hi-ob.com' + asset), env)).status, 404, asset);
});

test('all immutable 1.4.0 asset URLs retain the exact original bytes', async () => {
  const manifest = JSON.parse(await readFile(path.join(root, 'immutable-assets-1.4.0.json'), 'utf8'));
  assert.equal(manifest.version, '1.4.0');
  assert.equal(manifest.assets.length, 61, '60 reviewed Markdown assets and one ZIP');
  const env = {
    ASSETS: {
      fetch: async request => {
        try { return new Response(await readFile(path.join(root, 'dist', new URL(request.url).pathname))); }
        catch { return new Response('missing', { status: 404 }); }
      },
    },
  };
  for (const asset of manifest.assets) {
    const response = await worker.fetch(new Request('https://hi-ob.com' + asset.path), env);
    assert.equal(response.status, 200, asset.path);
    const hash = createHash('sha256').update(Buffer.from(await response.arrayBuffer())).digest('hex');
    assert.equal(hash, asset.sha256, asset.path);
  }
});
