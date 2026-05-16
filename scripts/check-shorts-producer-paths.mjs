#!/usr/bin/env node
/**
 * M0 guardrail: shorts-producer uses @/lib/* but root jsconfig maps @/* to repo root.
 * Those imports must resolve to files under lib/ OR be listed as known debt (M1 fix).
 *
 * Run: npm run check:shorts-paths
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(import.meta.url), '..', '..');
const SHORTS_DIR = join(ROOT, 'modules', 'shorts-producer');
const ROOT_LIB = join(ROOT, 'lib');

/** @/lib/foo resolves here at build time (root jsconfig). */
const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '/index.ts', '/index.js'];

/** Intentionally unresolved until M1 path alias or lib/creative merge. */
const KNOWN_DEBT = new Set([
  'types',
  'cost-control',
  'cost-meter',
  'remotion',
  'render-queue',
  'render-state',
  'render-jobs',
  'render',
  'tts-preprocessor',
  'creative-qa',
  'errors',
  'elevenlabs',
  'assets',
  'openai-usage',
  'pexels',
  'auth',
  'pricing',
  'generate-request',
  'hiob-site',
  'batch-creative-qa',
]);

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, files);
    else if (/\.(ts|tsx|js|jsx)$/.test(name)) files.push(full);
  }
  return files;
}

function resolveRootLib(subpath) {
  for (const ext of EXTENSIONS) {
    const candidate = join(ROOT_LIB, subpath + ext);
    if (existsSync(candidate)) return candidate;
  }
  return null;
}

function resolveShortsLocal(subpath) {
  for (const ext of EXTENSIONS) {
    const candidate = join(SHORTS_DIR, 'lib', subpath + ext);
    if (existsSync(candidate)) return candidate;
  }
  return null;
}

function extractLibImports(source) {
  const specs = [];
  const re = /from\s+['"]@\/lib\/([^'"]+)['"]/g;
  let m;
  while ((m = re.exec(source)) !== null) specs.push(m[1]);
  return specs;
}

function main() {
  const files = walk(SHORTS_DIR);
  const unresolved = [];
  const resolvedRoot = [];
  const resolvedMiswired = [];

  for (const file of files) {
    const source = readFileSync(file, 'utf8');
    for (const sub of extractLibImports(source)) {
      const atRoot = resolveRootLib(sub);
      const atShorts = resolveShortsLocal(sub);
      const rel = relative(ROOT, file);

      if (atRoot) {
        resolvedRoot.push({ file: rel, sub, atRoot: relative(ROOT, atRoot) });
      } else if (atShorts && !KNOWN_DEBT.has(sub.split('/')[0])) {
        resolvedMiswired.push({
          file: rel,
          sub,
          note: `exists at modules/shorts-producer/lib but @/lib resolves to root — broken if imported from app`,
          shortsPath: relative(ROOT, atShorts),
        });
      } else if (!atRoot && atShorts) {
        resolvedMiswired.push({
          file: rel,
          sub,
          note: 'known M1 debt: file lives under shorts-producer only',
          shortsPath: relative(ROOT, atShorts),
        });
      } else if (!KNOWN_DEBT.has(sub.split('/')[0])) {
        unresolved.push({ file: rel, sub });
      }
    }
  }

  const debtOnly = resolvedMiswired.filter((r) => KNOWN_DEBT.has(r.sub.split('/')[0]));
  const unknownMiswire = resolvedMiswired.filter((r) => !KNOWN_DEBT.has(r.sub.split('/')[0]));

  let exitCode = 0;

  console.log('check:shorts-paths summary');
  console.log(`  scanned: ${files.length} files under modules/shorts-producer/`);
  console.log(`  @/lib imports resolving to root lib/: ${resolvedRoot.length}`);
  console.log(`  known M1 path debt (shorts-local only): ${debtOnly.length} import sites`);
  console.log(`  unknown missing modules: ${unresolved.length}`);

  if (unknownMiswire.length) {
    exitCode = 1;
    console.error('\nUnexpected miswired imports (not in KNOWN_DEBT):');
    for (const r of unknownMiswire) console.error(`  ${r.file} → @/lib/${r.sub}\n    ${r.note}`);
  }

  if (unresolved.length) {
    exitCode = 1;
    console.error('\nUnresolved @/lib imports:');
    for (const r of unresolved) console.error(`  ${r.file} → @/lib/${r.sub}`);
  }

  if (exitCode === 0) {
    console.log('\ncheck:shorts-paths OK (no new path violations; M1 debt unchanged)');
  } else {
    console.error('\ncheck:shorts-paths FAILED');
  }

  process.exit(exitCode);
}

main();
