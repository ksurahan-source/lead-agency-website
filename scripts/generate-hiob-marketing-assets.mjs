import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const outDir = path.join(root, 'public', 'marketing', 'hiob-carousel');

const symbol = `
  <rect x="56" y="56" width="72" height="72" rx="12" fill="#080504"/>
  <path d="M77.2 98.3L106 80.8V109.6H99V93L84.1 101.8V104H92V109.6H77.2V98.3Z" fill="#fff"/>
  <path d="M110.7 88L117.9 84V109.6H110.7V88Z" fill="#fff"/>
  <path d="M110.7 74.9H117.9V82.1H110.7V74.9Z" fill="#fff"/>
`;

function esc(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function lines(items, x, y, size, weight, fill, lineGap = 1.16) {
  return items
    .map((line, index) => {
      const dy = index === 0 ? 0 : size * lineGap;
      return `<text x="${x}" y="${y + dy}" font-size="${size}" font-weight="${weight}" fill="${fill}" letter-spacing="0">${esc(line)}</text>`;
    })
    .join('\n');
}

function list(items, x, y, accent) {
  return items
    .map((item, index) => {
      const yy = y + index * 92;
      return `
        <rect x="${x}" y="${yy - 35}" width="34" height="34" rx="8" fill="${accent}"/>
        <text x="${x + 17}" y="${yy - 11}" text-anchor="middle" font-size="16" font-weight="900" fill="#080504">${String(index + 1).padStart(2, '0')}</text>
        <text x="${x + 56}" y="${yy - 12}" font-size="30" font-weight="900" fill="#fbfaf6" letter-spacing="0">${esc(item.title)}</text>
        <text x="${x + 56}" y="${yy + 25}" font-size="21" font-weight="700" fill="#bfb8ad" letter-spacing="0">${esc(item.body)}</text>
      `;
    })
    .join('\n');
}

function slide({
  lang,
  num,
  stage,
  title,
  subtitle,
  items,
  footer,
  accent,
  secondary = '#4fd1c5',
}) {
  const brand = lang === 'ko' ? '히옵 마케팅' : 'HIOB marketing';
  const titleSize = lang === 'ko' ? 82 : 76;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350" font-family="'Pretendard Variable','Apple SD Gothic Neo','Malgun Gothic','Helvetica Neue',Arial,sans-serif">
  <rect width="1080" height="1350" fill="#080504"/>
  <rect x="28" y="28" width="1024" height="1294" rx="36" fill="none" stroke="#29231f" stroke-width="2"/>
  <rect x="56" y="184" width="968" height="3" fill="${accent}"/>
  <rect x="56" y="1160" width="968" height="2" fill="#29231f"/>
  <path d="M762 188L1024 188L1024 1034L762 1034Z" fill="#fbfaf6" opacity="0.04"/>
  <path d="M820 238L1024 238L1024 552L820 552Z" fill="${secondary}" opacity="0.10"/>
  ${symbol}
  <text x="148" y="104" font-size="29" font-weight="900" fill="#fbfaf6" letter-spacing="0">${esc(brand)}</text>
  <text x="148" y="133" font-size="17" font-weight="800" fill="#8f887f" letter-spacing="2">${esc(stage)}</text>
  <text x="954" y="111" text-anchor="end" font-size="48" font-weight="900" fill="${accent}" letter-spacing="0">${num}</text>

  <text x="56" y="282" font-size="24" font-weight="900" fill="${accent}" letter-spacing="4">${esc(stage)}</text>
  ${lines(title, 56, 396, titleSize, 950, '#fbfaf6', 1.05)}
  ${lines(subtitle, 62, 610, 30, 800, '#c7beb3', 1.34)}

  <g font-family="'Pretendard Variable','Apple SD Gothic Neo','Malgun Gothic','Helvetica Neue',Arial,sans-serif">
    ${list(items, 68, 806, accent)}
  </g>

  <rect x="56" y="1210" width="18" height="18" rx="4" fill="${accent}"/>
  <text x="92" y="1227" font-size="24" font-weight="850" fill="#fbfaf6" letter-spacing="0">${esc(footer)}</text>
  <text x="56" y="1282" font-size="16" font-weight="800" fill="#716a63" letter-spacing="2">MECE: HOOK -> DIAGNOSIS -> PROOF -> OFFER</text>
</svg>`;
}

const slides = [
  {
    file: 'ko-01-hook',
    lang: 'ko',
    num: '01',
    stage: 'HOOK / PROBLEM',
    title: ['예산 올리면', 'ROAS가 무너지나요?'],
    subtitle: ['광고비 문제가 아닐 수 있습니다.', '플랫폼이 학습할 신호가 새고 있을 수 있습니다.'],
    items: [
      { title: '보이지 않는 매출', body: '픽셀과 리포트 숫자가 실제 구매를 놓칩니다.' },
      { title: '소재 피로', body: '이긴 영상도 반복 노출 후 빠르게 무너집니다.' },
      { title: '확장 기준 부재', body: '언제 키우고 끌지 감으로 판단합니다.' },
    ],
    footer: '먼저 크게 쓰지 말고, 어디서 새는지부터 보세요.',
    accent: '#f97316',
  },
  {
    file: 'ko-02-diagnosis',
    lang: 'ko',
    num: '02',
    stage: 'DIAGNOSIS / SYSTEM',
    title: ['성과를 막는', '3가지 누수'],
    subtitle: ['히옵은 광고를 하나의 시스템으로 분해합니다.', '측정, 소재, 운영 기준을 따로 보지 않습니다.'],
    items: [
      { title: '측정 누수', body: 'sGTM, CAPI, GA4로 구매 신호를 복구합니다.' },
      { title: '소재 누수', body: '훅, 앵글, 포맷을 테스트 단위로 쪼갭니다.' },
      { title: '운영 누수', body: 'ROAS 구간별로 증액과 중단 기준을 만듭니다.' },
    ],
    footer: 'MECE 진단: 측정 / 소재 / 운영',
    accent: '#38bdf8',
  },
  {
    file: 'ko-03-proof',
    lang: 'ko',
    num: '03',
    stage: 'PROOF / AUTHORITY',
    title: ['월 65억 Meta를', '굴려본 팀'],
    subtitle: ['히옵을 만든 팀은 큰 예산이 무너지는 지점을 봐왔습니다.', '그래서 작은 브랜드도 처음부터 신호 품질을 봅니다.'],
    items: [
      { title: '월 약 65억 규모', body: '한국 마켓 Meta 광고 운영 경험.' },
      { title: '100개+ 계정', body: '다양한 실패 패턴과 성장 조건을 축적.' },
      { title: '일 3,000만원+ 계정', body: '예산 확장 구간의 리스크를 체득.' },
    ],
    footer: '예쁜 광고보다, 학습되는 광고가 필요합니다.',
    accent: '#facc15',
    secondary: '#f97316',
  },
  {
    file: 'ko-04-offer',
    lang: 'ko',
    num: '04',
    stage: 'OFFER / ACTION',
    title: ['6주 무료 측정부터', '작게 시작하세요'],
    subtitle: ['계정의 누수를 먼저 확인하고, 이긴 소재에만 베팅합니다.', '성과가 보일 때 확장합니다.'],
    items: [
      { title: '광고비 직접 집행', body: '돈은 셀러 계정에서 직접 통제합니다.' },
      { title: '릴스 최대 10편 테스트', body: '불편, 비교, 사용 장면을 짧게 쪼갭니다.' },
      { title: '성과형 정산', body: 'ROAS 250% 미만은 성과 수수료 0%.' },
    ],
    footer: '브랜드 URL만 있어도 진단을 시작할 수 있습니다.',
    accent: '#22c55e',
  },
  {
    file: 'en-01-hook',
    lang: 'en',
    num: '01',
    stage: 'HOOK / PROBLEM',
    title: ['Does ROAS break', 'when budget scales?'],
    subtitle: ['The problem may not be spend.', 'Your ad platform may be learning from weak signals.'],
    items: [
      { title: 'Invisible revenue', body: 'Pixel-only tracking misses real purchase signals.' },
      { title: 'Creative fatigue', body: 'Winning ads decay after repeated exposure.' },
      { title: 'No scale rule', body: 'Budget decisions happen by feel, not thresholds.' },
    ],
    footer: 'Do not scale harder until the leaks are visible.',
    accent: '#f97316',
  },
  {
    file: 'en-02-diagnosis',
    lang: 'en',
    num: '02',
    stage: 'DIAGNOSIS / SYSTEM',
    title: ['Three leaks', 'kill growth'],
    subtitle: ['HIOB marketing decomposes paid growth into a system.', 'Measurement, creative, and operating rules are checked separately.'],
    items: [
      { title: 'Measurement leak', body: 'Recover purchase signals with sGTM, CAPI, and GA4.' },
      { title: 'Creative leak', body: 'Break hooks, angles, and formats into test units.' },
      { title: 'Operating leak', body: 'Define scale and stop rules by ROAS bands.' },
    ],
    footer: 'MECE diagnosis: measurement / creative / operation',
    accent: '#38bdf8',
  },
  {
    file: 'en-03-proof',
    lang: 'en',
    num: '03',
    stage: 'PROOF / AUTHORITY',
    title: ['Built by operators', 'who managed $5M/mo'],
    subtitle: ['The HIOB team has seen what breaks at scale.', 'That is why signal quality comes before bigger spend.'],
    items: [
      { title: '$5M+ monthly Meta spend', body: 'Aggregated Korea market operating experience.' },
      { title: '100+ ad accounts', body: 'Growth paths and failure patterns across accounts.' },
      { title: '$23k+ daily account', body: 'Hands-on experience in high-budget scale ranges.' },
    ],
    footer: 'Pretty ads are not enough. Ads must teach the algorithm.',
    accent: '#facc15',
    secondary: '#f97316',
  },
  {
    file: 'en-04-offer',
    lang: 'en',
    num: '04',
    stage: 'OFFER / ACTION',
    title: ['Start with', '6 weeks free tracking'],
    subtitle: ['Find the account leaks first.', 'Then test creative and scale only what wins.'],
    items: [
      { title: 'You control ad spend', body: 'Media spend stays inside your own account.' },
      { title: 'Up to 10 Reels tests', body: 'Pain, demo, and comparison angles in short form.' },
      { title: 'Performance-aligned fee', body: 'No performance fee below 250% ROAS.' },
    ],
    footer: 'A brand URL is enough to start the diagnosis.',
    accent: '#22c55e',
  },
];

await mkdir(outDir, { recursive: true });

for (const item of slides) {
  const svg = slide(item);
  const svgPath = path.join(outDir, `${item.file}.svg`);
  const pngPath = path.join(outDir, `${item.file}.png`);
  await writeFile(svgPath, svg);
  await sharp(Buffer.from(svg)).png().toFile(pngPath);
}

const logoExports = [
  ['public/logo/hiob-symbol.svg', 'public/logo/hiob-symbol.png', 1024],
  ['public/logo/hiob-logo-en.svg', 'public/logo/hiob-logo-en.png', 1860],
  ['public/logo/hiob-logo-kr.svg', 'public/logo/hiob-logo-kr.png', 1560],
];

for (const [input, output, width] of logoExports) {
  const svg = await readFile(path.join(root, input));
  await sharp(svg).resize({ width }).png().toFile(path.join(root, output));
}

const readme = `# HIOB marketing image pack

Logo:
- /public/logo/hiob-symbol.svg
- /public/logo/hiob-symbol.png
- /public/logo/hiob-logo-en.svg
- /public/logo/hiob-logo-en.png
- /public/logo/hiob-logo-kr.svg
- /public/logo/hiob-logo-kr.png

Marketing carousel:
- Korean: ko-01-hook, ko-02-diagnosis, ko-03-proof, ko-04-offer
- English: en-01-hook, en-02-diagnosis, en-03-proof, en-04-offer

MECE structure:
1. Hook / Problem
2. Diagnosis / System
3. Proof / Authority
4. Offer / Action
`;

await writeFile(path.join(outDir, 'README.md'), readme);
