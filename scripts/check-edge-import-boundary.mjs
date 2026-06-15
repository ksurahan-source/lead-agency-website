#!/usr/bin/env node
/**
 * Guardrail: fail if app/api/** imports Node-only or product-only modules.
 * Run: npm run check:edge-boundary
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(import.meta.url), '..', '..');
const API_DIR = join(ROOT, 'app', 'api');

/** Regex patterns applied to import sources in app/api files. */
const FORBIDDEN_PATTERNS = [
  { re: /^node:/, label: 'node: built-in prefix' },
  { re: /^fs$|^fs\/promises$/, label: 'fs module' },
  { re: /^path$/, label: 'path module' },
  { re: /^@remotion\//, label: '@remotion package' },
  { re: /^child_process$/, label: 'child_process' },
  { re: /modules\/shorts-producer/, label: 'shorts-producer belongs in hiop-studio' },
  { re: /services\/render-trigger/, label: 'render-trigger belongs in hiop-studio' },
  { re: /^openai$/, label: 'paid generation belongs in hiop-studio' },
];

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

function checkSpecifier(specifier, file) {
  const violations = [];
  const rel = relative(ROOT, file);

  for (const { re, label } of FORBIDDEN_PATTERNS) {
    if (re.test(specifier)) violations.push({ file: rel, specifier, reason: label });
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
