import type { ShortScript, TtsPreprocessOptions, TtsPreprocessResult } from './types';

const DEFAULT_MAX_LINE_LENGTH = 22;

const TERM_REPLACEMENTS: Array<[RegExp, string]> = [
  [/hi-ob\.com/gi, '히옵'],
  [/hi-ob/gi, '히옵'],
  [/Conversions API/gi, '전환 API'],
  [/Conversion API/gi, '전환 API'],
  [/CAPI/gi, '전환 API'],
  [/Meta Pixel/gi, '픽셀'],
  [/\bPixel\b/gi, '픽셀'],
  [/Meta Reels/gi, '메타 릴스'],
  [/\bMeta\b/gi, '메타'],
  [/ROAS/gi, '로아스'],
  [/CTR/gi, '클릭률'],
  [/GA4/gi, '지에이포'],
  [/GTM/gi, '지티엠'],
  [/B2B/gi, '비투비'],
];

const BREAK_AFTER_PATTERNS = [
  /(.+?는데도)(.+)/,
  /(.+?다면)(.+)/,
  /(.+?라면)(.+)/,
  /(.+?인데요)(.+)/,
  /(.+?아닌가요)(.+)/,
  /(.+?계신가요)(.+)/,
  /(.+?문제는)(.+)/,
  /(.+?이유는)(.+)/,
  /(.+?바로)(.+)/,
];

export function normalizeKoreanAdTerms(text: string) {
  return TERM_REPLACEMENTS.reduce((current, [pattern, replacement]) => current.replace(pattern, replacement), text);
}

export function buildTtsNarrationText(script: Pick<ShortScript, 'full_script' | 'scenes'>) {
  const sceneVoiceover = script.scenes
    ?.map((scene) => scene.voiceover?.trim())
    .filter(Boolean)
    .join('\n\n');

  return sceneVoiceover || script.full_script;
}

export function optimizeElevenLabsTtsScript(
  input: string,
  options: TtsPreprocessOptions = {},
): TtsPreprocessResult {
  const maxLineLength = options.maxLineLength ?? (options.deliveryStyle === 'operator' ? 16 : DEFAULT_MAX_LINE_LENGTH);
  const normalized = normalizeKoreanAdTerms(input)
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\.{2,}/g, '...')
    .trim();

  const structuralText = normalized
    .replace(/\s*[,;:]\s*/g, '\n')
    .replace(/\s+(-{2,}|—|–)\s+/g, '\n')
    .replace(/([?!])\s+/g, '$1\n')
    .replace(/([.])\s+/g, '$1\n');

  const lines = structuralText
    .split('\n')
    .flatMap((line) => splitForCadence(line.trim(), maxLineLength))
    .map(cleanLine)
    .filter(Boolean);

  const pacedLines = options.deliveryStyle === 'operator'
    ? withOperatorPauses(lines)
    : options.pauseCue === 'bracket'
    ? withBracketPauses(lines)
    : lines;

  return {
    original: input,
    text: pacedLines.join('\n\n'),
    lines: pacedLines,
    pauseCount: Math.max(0, pacedLines.length - 1),
    estimatedSeconds: estimateSpokenSeconds(pacedLines),
  };
}

function splitForCadence(line: string, maxLineLength: number): string[] {
  if (!line) return [];
  if (line.length <= maxLineLength) return [line];

  for (const pattern of BREAK_AFTER_PATTERNS) {
    const match = line.match(pattern);
    if (match?.[1] && match[2]) {
      return [
        ...splitForCadence(match[1].trim(), maxLineLength),
        ...splitForCadence(match[2].trim(), maxLineLength),
      ];
    }
  }

  const words = line.split(' ');
  if (words.length === 1) return splitLongKoreanLine(line, maxLineLength);

  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxLineLength && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) lines.push(current);
  return lines.flatMap((item) => splitForCadence(item, maxLineLength));
}

function splitLongKoreanLine(line: string, maxLineLength: number) {
  const chunks: string[] = [];

  for (let index = 0; index < line.length; index += maxLineLength) {
    chunks.push(line.slice(index, index + maxLineLength));
  }

  return chunks;
}

function cleanLine(line: string) {
  return line
    .replace(/\s+/g, ' ')
    .replace(/\s+([?!.,])/g, '$1')
    .trim();
}

function withBracketPauses(lines: string[]) {
  return lines.flatMap((line, index) => {
    if (index === lines.length - 1) return [line];
    if (line.endsWith('?') || line.endsWith('...')) return [line, '[pause]'];
    return [line];
  });
}

function withOperatorPauses(lines: string[]) {
  return lines.flatMap((line, index) => {
    if (index === lines.length - 1) return [line];
    if (line.endsWith('?')) return [line, '...'];
    if (/죽은 겁니다|새고 있습니다|먼저 봐야 합니다|테스트하세요/.test(line)) return [line, '...'];
    return [line];
  });
}

function estimateSpokenSeconds(lines: string[]) {
  const spokenChars = lines.join('').replace(/\s|\[pause\]/g, '').length;
  const pauseSeconds = Math.max(0, lines.length - 1) * 0.28;

  return Number((spokenChars / 7.2 + pauseSeconds).toFixed(2));
}
