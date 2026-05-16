import fs from 'node:fs/promises';
import path from 'node:path';

const cwd = process.cwd();
const env = await fs.readFile(path.join(cwd, '.env.local'), 'utf8');
const apiKey = env.match(/^ELEVENLABS_API_KEY=(.*)$/m)?.[1]?.trim();

if (!apiKey) {
  throw new Error('ELEVENLABS_API_KEY is missing');
}

const out = {
  voice: path.join(cwd, 'public/audio/hiob-reels-v2-narrator.mp3'),
  music: path.join(cwd, 'public/music/hiob-reels-v2-eleven-music.mp3'),
  snap: path.join(cwd, 'public/music/hiob-reels-v2-snap.mp3'),
  xhit: path.join(cwd, 'public/music/hiob-reels-v2-x-hit.mp3'),
  check: path.join(cwd, 'public/music/hiob-reels-v2-check.mp3'),
  shake: path.join(cwd, 'public/music/hiob-reels-v2-shake.mp3'),
};

await fs.mkdir(path.dirname(out.voice), { recursive: true });
await fs.mkdir(path.dirname(out.music), { recursive: true });

const headers = {
  'xi-api-key': apiKey,
  'Content-Type': 'application/json',
};

const saveBinary = async (filePath, response) => {
  const arrayBuffer = await response.arrayBuffer();
  await fs.writeFile(filePath, Buffer.from(arrayBuffer));
};

const requestAudio = async (label, url, body, filePath) => {
  console.log(`Generating ${label}...`);
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`${label} failed: ${response.status} ${errorText.slice(0, 500)}`);
  }

  await saveBinary(filePath, response);
  console.log(`Saved ${label}: ${path.relative(cwd, filePath)}`);
};

const narration = [
  '광고를 돌렸는데 클릭만 있고 결과가 없으면,',
  '돈만 새는 겁니다.',
  '',
  '문의가 와도 기록이 안 남으면,',
  '광고는 좋은 손님을 못 찾습니다.',
  '',
  '그러면 엉뚱한 사람에게 돈을 씁니다.',
  '',
  '기록만 해두면 끝?',
  '아닙니다.',
  '빠졌는지, 두 번 잡혔는지 봐야 합니다.',
  '',
  '히옵은 새는 구멍부터 막습니다.',
  '',
  '광고비 더 쓰기 전에',
  '히옵 무료 진단 받아보세요.',
].join('\n');

await requestAudio(
  'firm Korean male narration',
  'https://api.elevenlabs.io/v1/text-to-speech/onwK4e9ZLuTAKqWW03F9?output_format=mp3_44100_128',
  {
    text: narration,
    model_id: 'eleven_multilingual_v2',
    language_code: 'ko',
    voice_settings: {
      stability: 0.58,
      similarity_boost: 0.82,
      style: 0.22,
      use_speaker_boost: true,
      speed: 1.06,
    },
  },
  out.voice,
);

await requestAudio(
  'fresh rhythmic instrumental music',
  'https://api.elevenlabs.io/v1/music?output_format=mp3_44100_128',
  {
    prompt:
      'Instrumental only. Fresh, bright, rhythmic short-form advertising background music for a Korean viral business Reels video. Tight clean drums, snappy percussion, light synth plucks, warm bass pulse, upbeat forward motion, premium but playful, clear space for a confident male narrator. 118 BPM. No vocals, no lyrics, no choir, no horror, no dark club drop, no aggressive EDM build, no copyrighted artist references.',
    music_length_ms: 26000,
    model_id: 'music_v1',
    force_instrumental: true,
    respect_sections_durations: true,
    store_for_inpainting: false,
    sign_with_c2pa: false,
  },
  out.music,
);

const sfx = [
  [
    'snap subtitle pop',
    'Clean short snap pop for a Korean viral subtitle appearing on beat, dry one-shot, crisp, modern, not comedic, no reverb tail.',
    out.snap,
    0.55,
  ],
  [
    'red X impact',
    'Short dry impact hit for a red X rejection mark, punchy but not scary, not cinematic, not comedic, clean social video accent.',
    out.xhit,
    0.65,
  ],
  [
    'green check accent',
    'Tiny clean confirmation tap and soft beep for a green check mark, polished, pleasant, short social media UI sound.',
    out.check,
    0.6,
  ],
  [
    'money leak shake',
    'Very short dry glitchy shake accent for money leaking or wasted ad spend, subtle, rhythmic, no horror, no alarm.',
    out.shake,
    0.65,
  ],
];

for (const [label, text, filePath, duration_seconds] of sfx) {
  await requestAudio(
    label,
    'https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128',
    {
      text,
      duration_seconds,
      prompt_influence: 0.42,
      model_id: 'eleven_text_to_sound_v2',
    },
    filePath,
  );
}
