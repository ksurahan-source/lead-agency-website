import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const [, , propsPath = '.data/hiob-reels-v2-props.json', audioPathArg] = process.argv;
const cwd = process.cwd();
const props = JSON.parse(fs.readFileSync(propsPath, 'utf8'));
const failures = [];

const totalSeconds = (props.script?.scenes ?? []).reduce(
  (total, scene) => total + Number(scene.duration ?? 0),
  0,
);
const voiceSegments = props.voiceSegments ?? [];
const audioPath = audioPathArg
  ? path.resolve(cwd, audioPathArg)
  : props.voiceoverAsset
    ? path.join(cwd, 'public', props.voiceoverAsset)
    : '';

const readDuration = (filePath) => {
  const output = execFileSync('afinfo', [filePath], { encoding: 'utf8' });
  const match = output.match(/estimated duration:\s*([\d.]+)\s*sec/);
  if (!match) throw new Error(`Cannot read duration from afinfo: ${filePath}`);
  return Number(match[1]);
};

const formalPatterns = [
  /습니다/,
  /합니다/,
  /봅니다/,
  /아닙니다/,
  /세요/,
  /하십시오/,
];

if (voiceSegments.length > 0) {
  let lastEnd = 0;
  let cameoSeconds = 0;

  for (const segment of voiceSegments) {
    const segmentPath = path.join(cwd, 'public', segment.asset);
    if (!fs.existsSync(segmentPath)) {
      failures.push(`voice segment missing: ${segment.asset}`);
      continue;
    }

    const duration = readDuration(segmentPath);
    const declaredDuration = Number(segment.duration ?? duration);
    const end = Number(segment.at ?? 0) + declaredDuration;
    lastEnd = Math.max(lastEnd, end);

    if (Math.abs(duration - declaredDuration) > 0.35) {
      failures.push(
        `voice segment duration mismatch: ${segment.asset} declared ${declaredDuration.toFixed(
          2,
        )}s actual ${duration.toFixed(2)}s`,
      );
    }

    for (const pattern of formalPatterns) {
      if (pattern.test(segment.text ?? '')) {
        failures.push(`voice segment has formal tone: ${segment.asset}`);
      }
    }

    if (segment.role === 'cameo') {
      cameoSeconds += duration;
      if (duration > 1.8) {
        failures.push(`cameo is too long: ${segment.asset} ${duration.toFixed(2)}s`);
      }
    }
  }

  if (lastEnd > totalSeconds - 0.25) {
    failures.push(`voice segments exceed video: ${lastEnd.toFixed(2)}s for ${totalSeconds.toFixed(2)}s`);
  }

  if (lastEnd < totalSeconds - 5) {
    failures.push(`voice segments are too short / leave dead air: ${lastEnd.toFixed(2)}s`);
  }

  if (cameoSeconds > 4) {
    failures.push(`cameos are too dominant: ${cameoSeconds.toFixed(2)}s total`);
  }

  console.log(`Voice segment end: ${lastEnd.toFixed(2)}s`);
  console.log(`Cameo total: ${cameoSeconds.toFixed(2)}s`);
} else if (!audioPath || !fs.existsSync(audioPath)) {
  failures.push(`voice file missing: ${audioPath}`);
} else {
  const duration = readDuration(audioPath);
  const scriptText = props.script?.full_script ?? '';
  const charsPerSecond = scriptText.replace(/\s/g, '').length / Math.max(duration, 0.1);

  if (duration > totalSeconds - 0.25) {
    failures.push(
      `voice is too long: ${duration.toFixed(2)}s for ${totalSeconds.toFixed(2)}s video`,
    );
  }

  if (duration < totalSeconds - 5) {
    failures.push(
      `voice is too short / likely rushed: ${duration.toFixed(2)}s for ${totalSeconds.toFixed(2)}s video`,
    );
  }

  if (charsPerSecond > 9.5) {
    failures.push(`voice is likely too rushed: ${charsPerSecond.toFixed(2)} chars/sec`);
  }

  if (charsPerSecond < 5.2) {
    failures.push(`voice is likely too slow: ${charsPerSecond.toFixed(2)} chars/sec`);
  }

  console.log(`Voice duration: ${duration.toFixed(2)}s`);
  console.log(`Video duration: ${totalSeconds.toFixed(2)}s`);
  console.log(`Narration speed: ${charsPerSecond.toFixed(2)} chars/sec`);
}

for (const effect of props.soundEffects ?? []) {
  const effectPath = path.join(cwd, 'public', effect.asset ?? '');
  if (!effect.asset || !fs.existsSync(effectPath)) {
    failures.push(`sound effect missing: ${effect.asset}`);
    continue;
  }

  const duration = readDuration(effectPath);
  const declaredDuration = Number(effect.duration ?? duration);

  if (duration < 0.08) {
    failures.push(`sound effect has no usable audio: ${effect.asset}`);
  }

  if (Math.abs(duration - declaredDuration) > 0.65) {
    failures.push(
      `sound effect duration mismatch: ${effect.asset} declared ${declaredDuration.toFixed(
        2,
      )}s actual ${duration.toFixed(2)}s`,
    );
  }
}

const narrationMode = props.orchestration?.narrationMode;
if (!['single_narrator', 'curator_with_cameo'].includes(narrationMode)) {
  failures.push('narrationMode must be single_narrator or curator_with_cameo');
}

if (failures.length > 0) {
  console.error('AUDIO QA FAIL');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('AUDIO QA PASS');
