#!/usr/bin/env node
/**
 * M0 guardrail: fail if app/api/** imports Node-only or non-edge-safe modules.
 * Run: npm run check:edge-boundary
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(import.meta.url), '..', '..');
const API_DIR = join(ROOT, 'app', 'api');

/** Subpaths under modules/shorts-producer/lib that must not be imported from edge API routes. */
const BLOCKED_SHORTS_PRODUCER = [
  'remotion',
  'render-queue',
  'render-state',
  'render-jobs',
  'render',
  'cost-meter',
  'cost-control',
  'elevenlabs',
  'assets',
  'openai-usage',
  'pexels',
  'auth',
];

/** Regex patterns applied to import sources in app/api files. */
const FORBIDDEN_PATTERNS = [
  { re: /^node:/, label: 'node: built-in prefix' },
  { re: /^fs$|^fs\/promises$/, label: 'fs module' },
  { re: /^path$/, label: 'path module' },
  { re: /^@remotion\//, label: '@remotion package' },
  { re: /^child_process$/, label: 'child_process' },
];

const ALLOWED_SHORTS_PRODUCER = new Set(['openai', 'types']);

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, files);
    else if (/\.(js|jsx|ts|tsx|mjs)$/.test(name)) files.push(full);
  }
  return files;
}

function extractImports(source) {
  const imports = [];
  const staticImport = /(?:import|export)\s+(?:type\s+)?(?:[\w*{}\s,]+\s+from\s+)?['"]([^'"]+)['"]/g;
  const dynamicImport = /import\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
  for (const re of [staticImport, dynamicImport]) {
    let match;
    while ((match = re.exec(source)) !== null) imports.push(match[1]);
  }
  return imports;
}

function checkShortsProducer(specifier) {
  const marker = 'modules/shorts-producer/lib/';
  const idx = specifier.indexOf(marker);
  if (idx === -1) return null;
  const sub = specifier.slice(idx + marker.length).replace(/\.(js|ts|tsx)$/, '').split('/')[0];
  if (ALLOWED_SHORTS_PRODUCER.has(sub)) return null;
  if (BLOCKED_SHORTS_PRODUCER.includes(sub)) {
    return `blocked shorts-producer submodule "${sub}"`;
  }
  return `shorts-producer import "${sub}" (not on allowlist; verify edge-safe before adding to ALLOWED_SHORTS_PRODUCER)`;
}

function checkSpecifier(specifier, file) {
  const violations = [];
  const rel = relative(ROOT, file);

  for (const { re, label } of FORBIDDEN_PATTERNS) {
    if (re.test(specifier)) violations.push({ file: rel, specifier, reason: label });
  }

  const shortsIssue = checkShortsProducer(specifier);
  if (shortsIssue) violations.push({ file: rel, specifier, reason: shortsIssue });

  if (specifier.startsWith('@/lib/cost-meter') || specifier.startsWith('@/lib/cost-control')) {
    violations.push({
      file: rel,
      specifier,
      reason: 'filesystem cost-meter/cost-control (Node-only); use @/lib/creativeCostGuard + creativeUsageStore on edge',
    });
  }

  if (specifier.startsWith('@/lib/remotion') || specifier.startsWith('@/lib/render')) {
    violations.push({ file: rel, specifier, reason: 'render pipeline belongs on AWS Worker/Lambda, not edge API' });
  }

  return violations;
}

function main() {
  if (!statSync(API_DIR, { throwIfNoEntry: false })) {
    console.error('app/api not found');
    process.exit(1);
  }

  const files = walk(API_DIR);
  const all = [];

  for (const file of files) {
    const source = readFileSync(file, 'utf8');
    for (const specifier of extractImports(source)) {
      all.push(...checkSpecifier(specifier, file));
    }
  }

  if (all.length === 0) {
    console.log(`check:edge-boundary OK (${files.length} files under app/api/)`);
    process.exit(0);
  }

  console.error(`check:edge-boundary FAILED (${all.length} violation(s)):\n`);
  for (const v of all) {
    console.error(`  ${v.file}\n    import: ${v.specifier}\n    reason: ${v.reason}\n`);
  }
  process.exit(1);
}

main();
