import fs from 'node:fs';
import path from 'node:path';

const propsPath = process.argv[2];

if (!propsPath) {
  console.error('Usage: node scripts/qa-local.mjs <props.json>');
  process.exit(1);
}

const cwd = process.cwd();
const props = JSON.parse(fs.readFileSync(propsPath, 'utf8'));
const failures = [];

const visibleTextFields = [
  props.script?.title,
  props.script?.hook,
  props.script?.full_script,
  ...(props.script?.scenes ?? []).flatMap((scene) => [
    scene.topic,
    scene.text,
    scene.voiceover,
    scene.proof_overlay,
    ...(scene.subtitle_steps ?? []),
    ...(scene.subtitle_cues ?? []).map((cue) => cue.text),
  ]),
].filter(Boolean);

const latinPattern = /[A-Za-z]/;
const remotePattern = /^https?:\/\//;
const bannedCopyPatterns = [
  /메타가\s*배/,
  /배운\s*게/,
  /학습/,
  /흐릿/,
  /시그널/,
  /어트리뷰션/,
  /매칭\s*품질/,
  /픽셀/,
  /데이터\s*품질/,
];

if (props.version !== 'hiob-reels-v2') {
  failures.push('version must be hiob-reels-v2');
}

if (props.layout !== 'simple-reels') {
  failures.push('layout must be simple-reels');
}

if (props.language !== 'ko') {
  failures.push('language must be ko');
}

for (const text of visibleTextFields) {
  if (latinPattern.test(text)) {
    failures.push(`visible text contains latin letters: ${JSON.stringify(text)}`);
  }
  for (const pattern of bannedCopyPatterns) {
    if (pattern.test(text)) {
      failures.push(`visible text contains banned fuzzy marketing copy: ${JSON.stringify(text)}`);
    }
  }
}

const scenes = props.script?.scenes ?? [];
if (scenes.length < 6) {
  failures.push('script must have at least 6 scenes');
}

const totalSeconds = scenes.reduce((total, scene) => total + Number(scene.duration ?? 0), 0);
if (totalSeconds < 24 || totalSeconds > 32) {
  failures.push(`duration must be 24-32 seconds, got ${totalSeconds.toFixed(2)}`);
}

const sceneAudio = scenes.filter((scene) => scene.audio_asset);
if (sceneAudio.length > 0 && props.orchestration?.qa?.failOnSceneAudio !== false) {
  failures.push('scene-level audio_asset is blocked before paid audio approval');
}

if (props.voiceoverAsset && typeof props.voiceoverAsset === 'string' && remotePattern.test(props.voiceoverAsset)) {
  failures.push('voiceoverAsset must be local');
}

for (const segment of props.voiceSegments ?? []) {
  if (!segment.asset) {
    failures.push('voice segment missing asset');
    continue;
  }
  if (remotePattern.test(segment.asset)) {
    failures.push(`remote voice segment is blocked: ${segment.asset}`);
  }
  const segmentPath = path.join(cwd, 'public', segment.asset);
  if (!fs.existsSync(segmentPath)) {
    failures.push(`missing voice segment asset: ${segment.asset}`);
  }
}

if (props.backgroundMusicAsset && typeof props.backgroundMusicAsset === 'string' && remotePattern.test(props.backgroundMusicAsset)) {
  failures.push('backgroundMusicAsset must be local');
}

for (const scene of scenes) {
  if (!scene.asset_url) {
    failures.push(`missing asset_url for scene: ${scene.text}`);
    continue;
  }

  if (remotePattern.test(scene.asset_url)) {
    failures.push(`remote asset is blocked: ${scene.asset_url}`);
    continue;
  }

  const assetPath = path.join(cwd, 'public', scene.asset_url);
  if (!fs.existsSync(assetPath)) {
    failures.push(`missing local asset: ${scene.asset_url}`);
  }
}

const allowedRoots = props.orchestration?.assetPolicy?.allowedRoots ?? [];
for (const scene of scenes) {
  if (!scene.asset_url || remotePattern.test(scene.asset_url)) continue;
  if (allowedRoots.length > 0 && !allowedRoots.some((root) => scene.asset_url.startsWith(root))) {
    failures.push(`asset outside allowed roots: ${scene.asset_url}`);
  }
}

for (const effect of props.soundEffects ?? []) {
  if (!effect.asset) {
    failures.push('sound effect missing asset');
    continue;
  }
  if (remotePattern.test(effect.asset)) {
    failures.push(`remote sound effect is blocked: ${effect.asset}`);
  }
  const effectPath = path.join(cwd, 'public', effect.asset);
  if (!fs.existsSync(effectPath)) {
    failures.push(`missing sound effect asset: ${effect.asset}`);
  }
  if (Number(effect.volume ?? 0) > 0.35) {
    failures.push(`sound effect volume too high: ${effect.asset}`);
  }
}

if (failures.length > 0) {
  console.error('LOCAL QA FAIL');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('LOCAL QA PASS');
console.log(`Scenes: ${scenes.length}`);
console.log(`Duration: ${totalSeconds.toFixed(2)}s`);
const hasVoice = Boolean(props.voiceoverAsset) || (props.voiceSegments ?? []).length > 0;
console.log(
  hasVoice && props.backgroundMusicAsset && (props.soundEffects ?? []).length > 0
    ? 'Paid API status: ATTACHED'
    : 'Paid API status: READY AFTER APPROVAL',
);
