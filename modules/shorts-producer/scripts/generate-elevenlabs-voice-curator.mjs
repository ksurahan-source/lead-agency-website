import { execFileSync } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';

const cwd = process.cwd();
const env = await fs.readFile(path.join(cwd, '.env.local'), 'utf8');
const apiKey = env.match(/^ELEVENLABS_API_KEY=(.*)$/m)?.[1]?.trim();

if (!apiKey) {
  throw new Error('ELEVENLABS_API_KEY is missing');
}

const outDir = path.join(cwd, 'public/audio/hiob-reels-v2-curator');
const manifestPath = path.join(outDir, 'manifest.json');
const mainVoiceId = 'TX3LPaxmHKxFdv7VOQHJ'; // Liam - energetic social media creator
const cameoVoiceId = 'iP95p4xoKVk53GoZ742B'; // Chris - down-to-earth cameo

const segments = [
  {
    role: 'curator',
    voiceId: mainVoiceId,
    gapAfter: 0.08,
    text: '광고 돌려놨는데 결과가 없으면, 걱정되고. 다들 고생 많았잖아요. 근데 이게 다 이유가 있었음.',
  },
  {
    role: 'curator',
    voiceId: mainVoiceId,
    gapAfter: 0.08,
    text: '문의가 와도 기록이 안 남으면, 메타는 좋은 손님을 못 찾더라구.',
  },
  {
    role: 'curator',
    voiceId: mainVoiceId,
    gapAfter: 0.08,
    text: '그래서 잘하다가도 못해지는 이유가, 다 그거였더라고.',
  },
  {
    role: 'cameo',
    voiceId: cameoVoiceId,
    gapAfter: 0.08,
    text: '아니 그럼 광고 탓이 아녀?',
  },
  {
    role: 'curator',
    voiceId: mainVoiceId,
    gapAfter: 0.06,
    text: '그래, 그렇다니까? 근데 기록만 해둔다고 또 다 되는 게 아니래.',
  },
  {
    role: 'curator',
    voiceId: mainVoiceId,
    gapAfter: 0.08,
    text: '정확한지도 봐야 된대. 엄청 복잡한 거였지 뭐야.',
  },
  {
    role: 'curator',
    voiceId: mainVoiceId,
    gapAfter: 0,
    text: '그래서 히옵이 무료 진단 한다고 해서, 나도 받아보려고.',
  },
];

const readDuration = (filePath) => {
  const output = execFileSync('afinfo', [filePath], { encoding: 'utf8' });
  const match = output.match(/estimated duration:\s*([\d.]+)\s*sec/);
  if (!match) throw new Error(`Cannot read duration: ${filePath}`);
  return Number(match[1]);
};

const cleanOldSegments = async () => {
  await fs.mkdir(outDir, { recursive: true });
  const entries = await fs.readdir(outDir);

  await Promise.all(
    entries
      .filter((entry) => /^\d{2}-(curator|cameo)\.mp3$/.test(entry))
      .map((entry) => fs.unlink(path.join(outDir, entry))),
  );
};

const generate = async (segment, index) => {
  const filename = `${String(index + 1).padStart(2, '0')}-${segment.role}.mp3`;
  const filePath = path.join(outDir, filename);
  console.log(`Generating ${filename}: ${segment.text}`);

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${segment.voiceId}?output_format=mp3_44100_128`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: segment.text,
        model_id: 'eleven_multilingual_v2',
        language_code: 'ko',
        voice_settings: {
          stability: segment.role === 'curator' ? 0.5 : 0.42,
          similarity_boost: 0.84,
          style: segment.role === 'curator' ? 0.36 : 0.2,
          use_speaker_boost: true,
          speed: segment.role === 'curator' ? 1.16 : 1.12,
        },
      }),
    },
  );

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`${filename} failed: ${response.status} ${body.slice(0, 500)}`);
  }

  await fs.writeFile(filePath, Buffer.from(await response.arrayBuffer()));
  const duration = readDuration(filePath);

  return {
    role: segment.role,
    text: segment.text,
    asset: path.posix.join('audio/hiob-reels-v2-curator', filename),
    duration,
    gapAfter: segment.gapAfter,
  };
};

await cleanOldSegments();

const generated = [];
for (const [index, segment] of segments.entries()) {
  generated.push(await generate(segment, index));
}

let at = 0;
const manifest = generated.map((segment) => {
  const item = {
    role: segment.role,
    text: segment.text,
    asset: segment.asset,
    at: Number(at.toFixed(2)),
    duration: Number(segment.duration.toFixed(2)),
    volume: segment.role === 'curator' ? 1 : 0.92,
  };
  at += segment.duration + segment.gapAfter;
  return item;
});

await fs.writeFile(
  manifestPath,
  `${JSON.stringify({ totalDuration: Number(at.toFixed(2)), segments: manifest }, null, 2)}\n`,
);

console.log(`Saved ${path.relative(cwd, manifestPath)}`);
console.log(`Total voice timeline: ${at.toFixed(2)}s`);
