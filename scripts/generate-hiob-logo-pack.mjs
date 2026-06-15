import { execFile } from 'node:child_process';
import { mkdir, readdir, readFile, writeFile, copyFile, cp } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';
import sharp from 'sharp';

const execFileAsync = promisify(execFile);
const root = process.cwd();
const logoDir = path.join(root, 'public', 'logo');
const newDir = path.join(logoDir, 'new-logo');
const oldDir = path.join(logoDir, 'old-logos');
const originalDir = path.join(oldDir, 'original-pre-hiob-mark');
const generatedV1Dir = path.join(oldDir, 'generated-v1-long-wordmarks');
const generatedV2Dir = path.join(oldDir, 'generated-v2-type-led-lockups');

const originalLogoFiles = [
  'public/favicon.svg',
  'public/favicon.png',
  'public/images/logo.png',
  'public/logo/01_symbol_32px.svg',
  'public/logo/01_symbol_64px.svg',
  'public/logo/01_symbol_128px.svg',
  'public/logo/01_symbol_256px.svg',
  'public/logo/01_symbol_512px.svg',
  'public/logo/01_symbol_1024px.svg',
  'public/logo/02_wordmark_en_dark.svg',
  'public/logo/02_wordmark_en_light.svg',
  'public/logo/02_wordmark_kr_dark.svg',
  'public/logo/02_wordmark_kr_light.svg',
  'public/logo/03_wordmark_combo_dark.svg',
  'public/logo/03_wordmark_combo_light.svg',
  'public/logo/04_logo_en_horizontal_dark.svg',
  'public/logo/04_logo_en_horizontal_light.svg',
  'public/logo/04_logo_en_vertical_dark.svg',
  'public/logo/04_logo_en_vertical_light.svg',
  'public/logo/04_logo_kr_horizontal_dark.svg',
  'public/logo/04_logo_kr_horizontal_light.svg',
  'public/logo/04_logo_kr_vertical_dark.svg',
  'public/logo/04_logo_kr_vertical_light.svg',
  'public/logo/05_favicon_16px.svg',
  'public/logo/05_favicon_32px.svg',
  'public/logo/06_appicon_192px.svg',
  'public/logo/06_appicon_512px.svg',
  'public/logo/06_appicon_1024px.svg',
  'public/logo/hi-ob_favicon.svg',
  'public/logo/hi-ob_horizontal_dark.svg',
  'public/logo/hi-ob_horizontal_light.svg',
  'public/logo/hi-ob_symbol_dark.svg',
  'public/logo/hi-ob_symbol_light.svg',
  'public/logo/hiob_mark.svg',
  'public/logo/hiop_mark.svg',
  'public/logo/hiop_horizontal_dark.svg',
  'public/logo/hiop_horizontal_light.svg',
  'public/logo/hiop_symbol_dark.svg',
  'public/logo/hiop_symbol_light.svg',
  'public/logo/히옵_horizontal_dark.svg',
  'public/logo/히옵_horizontal_light.svg',
  'public/logo/히옵_symbol_dark.svg',
  'public/logo/히옵_symbol_light.svg',
];

const generatedV1Files = [
  'hiob-symbol.svg',
  'hiob-symbol.png',
  'hiob-logo-en.svg',
  'hiob-logo-en.png',
  'hiob-logo-kr.svg',
  'hiob-logo-kr.png',
];

const markPath = {
  body: 'M70 188L198 110V238H167V164L101 203V213H136V238H70V188Z',
  stem: 'M219 142L251 124V238H219V142Z',
  dot: 'M219 84H251V116H219V84Z',
};

function esc(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function mark({ bg = '#080504', fg = '#fff', rx = 28 } = {}) {
  return `
    <rect width="320" height="320" rx="${rx}" fill="${bg}"/>
    <path d="${markPath.body}" fill="${fg}"/>
    <path d="${markPath.stem}" fill="${fg}"/>
    <path d="${markPath.dot}" fill="${fg}"/>
  `;
}

function markOnly({ fg = '#fff' } = {}) {
  return `
    <path d="${markPath.body}" fill="${fg}"/>
    <path d="${markPath.stem}" fill="${fg}"/>
    <path d="${markPath.dot}" fill="${fg}"/>
  `;
}

function symbolSvg({ bg = '#080504', fg = '#fff' } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 320 320">${mark({ bg, fg })}</svg>`;
}

function transparentMarkSvg(fill = '#080504') {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 320 320">${markOnly({ fg: fill })}</svg>`;
}

function wordHiob(x, y, color) {
  return `
    <g transform="translate(${x} ${y}) rotate(-2.4) skewX(-10) scale(1.04 1)">
      <text x="0" y="0" font-family="'Arial Black','Avenir Next Heavy','Pretendard Variable','Helvetica Neue',Arial,sans-serif" font-size="42" font-weight="950" font-style="italic" fill="${color}" letter-spacing="-1.2">hiob</text>
      <path d="M7 -35H28L23 -31H2Z" fill="${color}"/>
    </g>
  `;
}

function wordKo(x, y, color) {
  return `
    <g transform="translate(${x} ${y}) rotate(-3) skewX(-7)">
      <text x="0" y="0" font-family="'Pretendard Variable','Apple SD Gothic Neo','Hiragino Sans','Malgun Gothic',sans-serif" font-size="40" font-weight="950" font-style="italic" fill="${color}" letter-spacing="0">히옵</text>
    </g>
  `;
}

function horizontalLogo({ lang = 'en', theme = 'light', background, width = 255, height = 100 } = {}) {
  const surface = background ?? (theme === 'dark' ? 'black' : 'transparent');
  const isBlack = surface === 'black';
  const bg = surface === 'black'
    ? '<rect width="255" height="100" fill="#080504"/>'
    : surface === 'white'
      ? '<rect width="255" height="100" fill="#fff"/>'
      : '';
  const textColor = isBlack ? '#fff' : '#080504';
  const icon = `<g transform="translate(-4 5) scale(0.31)">${markOnly({ fg: textColor })}</g>`;
  const x = 94;
  const y = 80;
  const word = lang === 'ko' ? wordKo(x, y, textColor) : wordHiob(x, y, textColor);
  const label = lang === 'ko' ? '히옵' : 'hiob';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 255 100">${bg}${icon}${word}<title>${esc(label)}</title></svg>`;
}

function compactLogo({ lang = 'en', theme = 'light', background } = {}) {
  const surface = background ?? (theme === 'dark' ? 'black' : 'transparent');
  const isBlack = surface === 'black';
  const bg = surface === 'black'
    ? '<rect width="224" height="96" fill="#080504"/>'
    : surface === 'white'
      ? '<rect width="224" height="96" fill="#fff"/>'
      : '';
  const textColor = isBlack ? '#fff' : '#080504';
  const icon = `<g transform="translate(-2 4) scale(0.23)">${markOnly({ fg: textColor })}</g>`;
  const x = 85;
  const y = lang === 'ko' ? 66 : 65;
  const word = lang === 'ko'
    ? `<g transform="scale(0.9 1)">${wordKo(x / 0.9, y, textColor)}</g>`
    : `<g transform="scale(0.9 1)">${wordHiob(x / 0.9, y, textColor)}</g>`;
  const label = lang === 'ko' ? '히옵' : 'hiob';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="224" height="96" viewBox="0 0 224 96">${bg}${icon}${word}<title>${esc(label)}</title></svg>`;
}

function wordmark({ lang = 'en', theme = 'light' } = {}) {
  const isDark = theme === 'dark';
  const color = isDark ? '#fff' : '#080504';
  const bg = isDark ? '<rect width="180" height="72" fill="#080504"/>' : '';
  const word = lang === 'ko' ? wordKo(18, 50, color) : wordHiob(18, 50, color);
  const label = lang === 'ko' ? '히옵' : 'hiob';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="72" viewBox="0 0 180 72">${bg}${word}<title>${esc(label)}</title></svg>`;
}

async function writeSvg(relPath, contents) {
  const output = path.join(root, relPath);
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, contents);
}

async function writePngFromSvg(inputRel, outputRel, width) {
  const input = await readFile(path.join(root, inputRel));
  const output = path.join(root, outputRel);
  await mkdir(path.dirname(output), { recursive: true });
  await sharp(input).resize({ width }).png().toFile(output);
}

async function archiveOriginals() {
  await mkdir(originalDir, { recursive: true });
  for (const rel of originalLogoFiles) {
    try {
      const { stdout } = await execFileAsync('git', ['show', `HEAD:${rel}`], {
        cwd: root,
        encoding: 'buffer',
        maxBuffer: 20 * 1024 * 1024,
      });
      const output = path.join(originalDir, path.basename(rel));
      await writeFile(output, stdout);
    } catch {
      // Some assets may not exist in older checkouts; skip without failing pack generation.
    }
  }
}

async function archiveGeneratedV1() {
  try {
    const existing = await readdir(generatedV1Dir);
    if (existing.length > 0) return;
  } catch {
    // First run: archive directory has not been created yet.
  }

  await mkdir(generatedV1Dir, { recursive: true });
  for (const name of generatedV1Files) {
    const source = path.join(logoDir, name);
    const target = path.join(generatedV1Dir, name);
    try {
      await copyFile(source, target);
    } catch {
      // The previous generated attempt may not exist on a fresh checkout.
    }
  }
}

async function archiveGeneratedV2() {
  const sourceFiles = await readdir(newDir).catch(() => []);
  if (sourceFiles.length === 0) return;

  try {
    const existing = await readdir(generatedV2Dir);
    if (existing.length > 0) return;
  } catch {
    // First run: archive directory has not been created yet.
  }

  await mkdir(path.dirname(generatedV2Dir), { recursive: true });
  await cp(newDir, generatedV2Dir, { recursive: true });
}

async function writeReadme() {
  const readme = `# HIOB new logo pack

Current logo direction:
- symbol + small lowercase English word: hiob
- symbol + Korean word: 히옵
- symbol geometry preserved from the supplied HIOB mark
- typography updated only: heavy, forward-leaning, and slightly rising to the right
- English wordmark uses a clean Visa-inspired construction: tight heavy italic type with one integrated leading terminal on the h

Canonical folder:
- public/logo/new-logo/

Recommended standard exports:
- logo-hiob-horizontal-transparent.svg / .png / @2x.png
- logo-hiob-horizontal-black.svg / .png / @2x.png
- logo-hiob-horizontal-white.svg / .png / @2x.png
- logo-ko-horizontal-transparent.svg / .png / @2x.png
- logo-ko-horizontal-black.svg / .png / @2x.png
- logo-ko-horizontal-white.svg / .png / @2x.png
- logo-hiob-compact-transparent.svg / .png
- logo-hiob-compact-black.svg / .png
- logo-hiob-compact-white.svg / .png
- logo-ko-compact-transparent.svg / .png
- logo-ko-compact-black.svg / .png
- logo-ko-compact-white.svg / .png
- symbol.svg / symbol.png / symbol-white-bg.svg / symbol-transparent-black.svg / symbol-transparent-white.svg
- favicon.svg / favicon-16.png / favicon-32.png / favicon-64.png
- app-icon-192.png / app-icon-512.png / app-icon-1024.png

Archived folders:
- public/logo/old-logos/original-pre-hiob-mark/
- public/logo/old-logos/generated-v1-long-wordmarks/
- public/logo/old-logos/generated-v2-type-led-lockups/
`;
  await writeFile(path.join(newDir, 'README.md'), readme);
}

async function main() {
  await archiveGeneratedV2();
  await mkdir(newDir, { recursive: true });
  await archiveOriginals();
  await archiveGeneratedV1();

  const svgs = {
    'public/logo/new-logo/symbol.svg': symbolSvg(),
    'public/logo/new-logo/symbol-black-bg.svg': symbolSvg(),
    'public/logo/new-logo/symbol-white-bg.svg': symbolSvg({ bg: '#fff', fg: '#080504' }),
    'public/logo/new-logo/symbol-transparent-black.svg': transparentMarkSvg('#080504'),
    'public/logo/new-logo/symbol-transparent-white.svg': transparentMarkSvg('#fff'),
    'public/logo/new-logo/mark-black.svg': transparentMarkSvg('#080504'),
    'public/logo/new-logo/mark-white.svg': transparentMarkSvg('#fff'),
    'public/logo/new-logo/favicon.svg': symbolSvg(),
    'public/logo/new-logo/logo-hiob-horizontal.svg': horizontalLogo({ lang: 'en', background: 'transparent' }),
    'public/logo/new-logo/logo-hiob-horizontal-transparent.svg': horizontalLogo({ lang: 'en', background: 'transparent' }),
    'public/logo/new-logo/logo-hiob-horizontal-dark.svg': horizontalLogo({ lang: 'en', background: 'black' }),
    'public/logo/new-logo/logo-hiob-horizontal-black.svg': horizontalLogo({ lang: 'en', background: 'black' }),
    'public/logo/new-logo/logo-hiob-horizontal-white.svg': horizontalLogo({ lang: 'en', background: 'white' }),
    'public/logo/new-logo/logo-ko-horizontal.svg': horizontalLogo({ lang: 'ko', background: 'transparent' }),
    'public/logo/new-logo/logo-ko-horizontal-transparent.svg': horizontalLogo({ lang: 'ko', background: 'transparent' }),
    'public/logo/new-logo/logo-ko-horizontal-dark.svg': horizontalLogo({ lang: 'ko', background: 'black' }),
    'public/logo/new-logo/logo-ko-horizontal-black.svg': horizontalLogo({ lang: 'ko', background: 'black' }),
    'public/logo/new-logo/logo-ko-horizontal-white.svg': horizontalLogo({ lang: 'ko', background: 'white' }),
    'public/logo/new-logo/logo-hiob-compact.svg': compactLogo({ lang: 'en', background: 'transparent' }),
    'public/logo/new-logo/logo-hiob-compact-transparent.svg': compactLogo({ lang: 'en', background: 'transparent' }),
    'public/logo/new-logo/logo-hiob-compact-dark.svg': compactLogo({ lang: 'en', background: 'black' }),
    'public/logo/new-logo/logo-hiob-compact-black.svg': compactLogo({ lang: 'en', background: 'black' }),
    'public/logo/new-logo/logo-hiob-compact-white.svg': compactLogo({ lang: 'en', background: 'white' }),
    'public/logo/new-logo/logo-ko-compact.svg': compactLogo({ lang: 'ko', background: 'transparent' }),
    'public/logo/new-logo/logo-ko-compact-transparent.svg': compactLogo({ lang: 'ko', background: 'transparent' }),
    'public/logo/new-logo/logo-ko-compact-dark.svg': compactLogo({ lang: 'ko', background: 'black' }),
    'public/logo/new-logo/logo-ko-compact-black.svg': compactLogo({ lang: 'ko', background: 'black' }),
    'public/logo/new-logo/logo-ko-compact-white.svg': compactLogo({ lang: 'ko', background: 'white' }),
    'public/logo/new-logo/wordmark-hiob.svg': wordmark({ lang: 'en', theme: 'light' }),
    'public/logo/new-logo/wordmark-hiob-dark.svg': wordmark({ lang: 'en', theme: 'dark' }),
    'public/logo/new-logo/wordmark-ko.svg': wordmark({ lang: 'ko', theme: 'light' }),
    'public/logo/new-logo/wordmark-ko-dark.svg': wordmark({ lang: 'ko', theme: 'dark' }),
  };

  for (const [rel, contents] of Object.entries(svgs)) {
    await writeSvg(rel, contents);
  }

  const pngs = [
    ['public/logo/new-logo/symbol.svg', 'public/logo/new-logo/symbol.png', 1024],
    ['public/logo/new-logo/symbol-black-bg.svg', 'public/logo/new-logo/symbol-black-bg.png', 1024],
    ['public/logo/new-logo/symbol-white-bg.svg', 'public/logo/new-logo/symbol-white-bg.png', 1024],
    ['public/logo/new-logo/symbol-transparent-black.svg', 'public/logo/new-logo/symbol-transparent-black.png', 1024],
    ['public/logo/new-logo/symbol-transparent-white.svg', 'public/logo/new-logo/symbol-transparent-white.png', 1024],
    ['public/logo/new-logo/mark-black.svg', 'public/logo/new-logo/mark-black.png', 1024],
    ['public/logo/new-logo/mark-white.svg', 'public/logo/new-logo/mark-white.png', 1024],
    ['public/logo/new-logo/symbol.svg', 'public/logo/new-logo/app-icon-1024.png', 1024],
    ['public/logo/new-logo/symbol.svg', 'public/logo/new-logo/app-icon-512.png', 512],
    ['public/logo/new-logo/symbol.svg', 'public/logo/new-logo/app-icon-192.png', 192],
    ['public/logo/new-logo/favicon.svg', 'public/logo/new-logo/favicon-64.png', 64],
    ['public/logo/new-logo/favicon.svg', 'public/logo/new-logo/favicon-32.png', 32],
    ['public/logo/new-logo/favicon.svg', 'public/logo/new-logo/favicon-16.png', 16],
    ['public/logo/new-logo/logo-hiob-horizontal.svg', 'public/logo/new-logo/logo-hiob-horizontal.png', 720],
    ['public/logo/new-logo/logo-hiob-horizontal.svg', 'public/logo/new-logo/logo-hiob-horizontal@2x.png', 1440],
    ['public/logo/new-logo/logo-hiob-horizontal-transparent.svg', 'public/logo/new-logo/logo-hiob-horizontal-transparent.png', 720],
    ['public/logo/new-logo/logo-hiob-horizontal-transparent.svg', 'public/logo/new-logo/logo-hiob-horizontal-transparent@2x.png', 1440],
    ['public/logo/new-logo/logo-hiob-horizontal-dark.svg', 'public/logo/new-logo/logo-hiob-horizontal-dark.png', 720],
    ['public/logo/new-logo/logo-hiob-horizontal-black.svg', 'public/logo/new-logo/logo-hiob-horizontal-black.png', 720],
    ['public/logo/new-logo/logo-hiob-horizontal-black.svg', 'public/logo/new-logo/logo-hiob-horizontal-black@2x.png', 1440],
    ['public/logo/new-logo/logo-hiob-horizontal-white.svg', 'public/logo/new-logo/logo-hiob-horizontal-white.png', 720],
    ['public/logo/new-logo/logo-hiob-horizontal-white.svg', 'public/logo/new-logo/logo-hiob-horizontal-white@2x.png', 1440],
    ['public/logo/new-logo/logo-ko-horizontal.svg', 'public/logo/new-logo/logo-ko-horizontal.png', 720],
    ['public/logo/new-logo/logo-ko-horizontal.svg', 'public/logo/new-logo/logo-ko-horizontal@2x.png', 1440],
    ['public/logo/new-logo/logo-ko-horizontal-transparent.svg', 'public/logo/new-logo/logo-ko-horizontal-transparent.png', 720],
    ['public/logo/new-logo/logo-ko-horizontal-transparent.svg', 'public/logo/new-logo/logo-ko-horizontal-transparent@2x.png', 1440],
    ['public/logo/new-logo/logo-ko-horizontal-dark.svg', 'public/logo/new-logo/logo-ko-horizontal-dark.png', 720],
    ['public/logo/new-logo/logo-ko-horizontal-black.svg', 'public/logo/new-logo/logo-ko-horizontal-black.png', 720],
    ['public/logo/new-logo/logo-ko-horizontal-black.svg', 'public/logo/new-logo/logo-ko-horizontal-black@2x.png', 1440],
    ['public/logo/new-logo/logo-ko-horizontal-white.svg', 'public/logo/new-logo/logo-ko-horizontal-white.png', 720],
    ['public/logo/new-logo/logo-ko-horizontal-white.svg', 'public/logo/new-logo/logo-ko-horizontal-white@2x.png', 1440],
    ['public/logo/new-logo/logo-hiob-compact.svg', 'public/logo/new-logo/logo-hiob-compact.png', 512],
    ['public/logo/new-logo/logo-hiob-compact-transparent.svg', 'public/logo/new-logo/logo-hiob-compact-transparent.png', 512],
    ['public/logo/new-logo/logo-hiob-compact-black.svg', 'public/logo/new-logo/logo-hiob-compact-black.png', 512],
    ['public/logo/new-logo/logo-hiob-compact-white.svg', 'public/logo/new-logo/logo-hiob-compact-white.png', 512],
    ['public/logo/new-logo/logo-ko-compact.svg', 'public/logo/new-logo/logo-ko-compact.png', 512],
    ['public/logo/new-logo/logo-ko-compact-transparent.svg', 'public/logo/new-logo/logo-ko-compact-transparent.png', 512],
    ['public/logo/new-logo/logo-ko-compact-black.svg', 'public/logo/new-logo/logo-ko-compact-black.png', 512],
    ['public/logo/new-logo/logo-ko-compact-white.svg', 'public/logo/new-logo/logo-ko-compact-white.png', 512],
    ['public/logo/new-logo/wordmark-hiob.svg', 'public/logo/new-logo/wordmark-hiob.png', 360],
    ['public/logo/new-logo/wordmark-ko.svg', 'public/logo/new-logo/wordmark-ko.png', 360],
  ];

  for (const args of pngs) {
    await writePngFromSvg(...args);
  }

  const topLevelAliases = {
    'public/favicon.svg': svgs['public/logo/new-logo/favicon.svg'],
    'public/logo/04_logo_en_horizontal_light.svg': svgs['public/logo/new-logo/logo-hiob-horizontal.svg'],
    'public/logo/04_logo_en_horizontal_dark.svg': svgs['public/logo/new-logo/logo-hiob-horizontal-dark.svg'],
    'public/logo/04_logo_kr_horizontal_light.svg': svgs['public/logo/new-logo/logo-ko-horizontal.svg'],
    'public/logo/04_logo_kr_horizontal_dark.svg': svgs['public/logo/new-logo/logo-ko-horizontal-dark.svg'],
    'public/logo/hiob-logo-en.svg': svgs['public/logo/new-logo/logo-hiob-horizontal.svg'],
    'public/logo/hiob-logo-kr.svg': svgs['public/logo/new-logo/logo-ko-horizontal.svg'],
    'public/logo/hiob-symbol.svg': svgs['public/logo/new-logo/symbol.svg'],
    'public/logo/02_wordmark_en_light.svg': svgs['public/logo/new-logo/wordmark-hiob.svg'],
    'public/logo/02_wordmark_en_dark.svg': svgs['public/logo/new-logo/wordmark-hiob-dark.svg'],
    'public/logo/02_wordmark_kr_light.svg': svgs['public/logo/new-logo/wordmark-ko.svg'],
    'public/logo/02_wordmark_kr_dark.svg': svgs['public/logo/new-logo/wordmark-ko-dark.svg'],
    'public/logo/hiob_mark.svg': svgs['public/logo/new-logo/mark-black.svg'],
    'public/logo/hiop_mark.svg': svgs['public/logo/new-logo/mark-black.svg'],
  };

  const symbolAliases = [
    '01_symbol_32px.svg',
    '01_symbol_64px.svg',
    '01_symbol_128px.svg',
    '01_symbol_256px.svg',
    '01_symbol_512px.svg',
    '01_symbol_1024px.svg',
    '05_favicon_16px.svg',
    '05_favicon_32px.svg',
    '06_appicon_192px.svg',
    '06_appicon_512px.svg',
    '06_appicon_1024px.svg',
    'hi-ob_favicon.svg',
    'hi-ob_symbol_dark.svg',
    'hiop_symbol_dark.svg',
    '히옵_symbol_dark.svg',
  ];
  for (const name of symbolAliases) {
    topLevelAliases[`public/logo/${name}`] = svgs['public/logo/new-logo/symbol.svg'];
  }

  const whiteMarkAliases = ['hi-ob_symbol_light.svg', 'hiop_symbol_light.svg', '히옵_symbol_light.svg'];
  for (const name of whiteMarkAliases) {
    topLevelAliases[`public/logo/${name}`] = svgs['public/logo/new-logo/mark-white.svg'];
  }

  const horizontalAliases = {
    'hi-ob_horizontal_light.svg': 'public/logo/new-logo/logo-hiob-horizontal.svg',
    'hi-ob_horizontal_dark.svg': 'public/logo/new-logo/logo-hiob-horizontal-dark.svg',
    'hiop_horizontal_light.svg': 'public/logo/new-logo/logo-hiob-horizontal.svg',
    'hiop_horizontal_dark.svg': 'public/logo/new-logo/logo-hiob-horizontal-dark.svg',
    '히옵_horizontal_light.svg': 'public/logo/new-logo/logo-ko-horizontal.svg',
    '히옵_horizontal_dark.svg': 'public/logo/new-logo/logo-ko-horizontal-dark.svg',
  };
  for (const [name, rel] of Object.entries(horizontalAliases)) {
    topLevelAliases[`public/logo/${name}`] = svgs[rel];
  }

  for (const [rel, contents] of Object.entries(topLevelAliases)) {
    await writeSvg(rel, contents);
  }

  await writePngFromSvg('public/logo/new-logo/logo-hiob-horizontal.svg', 'public/logo/hiob-logo-en.png', 720);
  await writePngFromSvg('public/logo/new-logo/logo-ko-horizontal.svg', 'public/logo/hiob-logo-kr.png', 720);
  await writePngFromSvg('public/logo/new-logo/symbol.svg', 'public/logo/hiob-symbol.png', 1024);

  await writeReadme();
}

await main();
