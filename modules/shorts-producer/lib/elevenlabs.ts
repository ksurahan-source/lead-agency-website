import axios from 'axios';
import {
  createPromptHash,
  enforceDailyCostGuard,
  normalizeCostMode,
  readCachedArtifact,
  recordUsageEvent,
  requireFinalApproval,
  writeCachedArtifact,
  type CostMode,
} from '@/lib/cost-control';
import { estimateAssetCost } from '@/lib/cost-meter';
import { optimizeElevenLabsTtsScript } from '@/lib/tts-preprocessor';
import type { TtsPreprocessOptions } from '@/lib/types';

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const DEFAULT_VOICE_ID = process.env.ELEVENLABS_VOICE_ID ?? '21m00Tcm4TlvDq8ikWAM'; // Adam
const DEFAULT_MODEL_ID = process.env.ELEVENLABS_MODEL_ID ?? 'eleven_multilingual_v2';

interface PaidAudioOptions {
  mode?: CostMode;
  approvedFinalRender?: boolean;
  assetId?: string;
}

export async function generateVoiceover(
  text: string,
  voiceId = DEFAULT_VOICE_ID,
  ttsOptions?: TtsPreprocessOptions,
  paidOptions: PaidAudioOptions = {},
) {
  requireFinalApproval({
    provider: 'elevenlabs',
    action: 'tts_generation',
    mode: normalizeCostMode(paidOptions.mode),
    approvedFinalRender: paidOptions.approvedFinalRender,
  });
  const deliveryStyle = ttsOptions?.deliveryStyle ?? 'operator';
  const preparedScript = optimizeElevenLabsTtsScript(text, {
    deliveryStyle,
    maxLineLength: deliveryStyle === 'operator' ? 16 : ttsOptions?.maxLineLength,
    pauseCue: ttsOptions?.pauseCue,
  });
  const voiceSettings = deliveryStyle === 'operator'
    ? {
        stability: 0.32,
        similarity_boost: 0.78,
        style: 0.42,
        use_speaker_boost: true,
      }
    : {
        stability: 0.5,
        similarity_boost: 0.75,
        style: 0.2,
        use_speaker_boost: true,
      };
  const promptHash = createPromptHash({
    kind: 'tts',
    text: preparedScript.text,
    voiceId,
    modelId: DEFAULT_MODEL_ID,
    voiceSettings,
  });
  const cached = await readCachedArtifact<{ base64: string }>('tts', promptHash);
  if (cached) return Buffer.from(cached.base64, 'base64');

  await enforceDailyCostGuard({
    provider: 'elevenlabs',
    action: 'tts_generation',
    estimatedCostUsd: estimateAssetCost({
      provider: 'elevenlabs',
      operationType: 'tts_generation',
      characters: preparedScript.text.length,
    }).totalUsd,
    ttsChars: preparedScript.text.length,
    assetId: paidOptions.assetId,
  });

  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
  const startedAt = Date.now();
  const response = await axios.post(
    url,
    {
      text: preparedScript.text,
      model_id: DEFAULT_MODEL_ID,
      output_format: 'mp3_44100_128',
      voice_settings: voiceSettings,
    },
    {
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
      },
      responseType: 'arraybuffer',
    }
  );

  const audio = Buffer.from(response.data);
  await writeCachedArtifact('tts', promptHash, { base64: audio.toString('base64') }, {
    provider: 'elevenlabs',
    model: DEFAULT_MODEL_ID,
  });
  await recordUsageEvent({
    provider: 'elevenlabs',
    action: 'tts_generation',
    status: 'generated',
    model: DEFAULT_MODEL_ID,
    assetId: paidOptions.assetId,
    promptHash,
    ttsChars: preparedScript.text.length,
    durationMs: Date.now() - startedAt,
    actualCostUsd: estimateAssetCost({
      provider: 'elevenlabs',
      operationType: 'tts_generation',
      characters: preparedScript.text.length,
      includeSafetyBuffer: false,
    }).totalUsd,
  });

  return audio;
}

export async function generateBackgroundMusic(durationSeconds = 30, paidOptions: PaidAudioOptions = {}) {
  requireFinalApproval({
    provider: 'elevenlabs',
    action: 'music_generation',
    mode: normalizeCostMode(paidOptions.mode),
    approvedFinalRender: paidOptions.approvedFinalRender,
  });

  // ElevenLabs music generation works best at 22-30s; shorter durations cause artifacts.
  const safeDuration = Math.min(Math.max(durationSeconds, 22), 30);
  const prompt =
    'Smooth instrumental background track for a Korean digital marketing commercial. ' +
    'Deep house groove, 124 BPM, warm bass, subtle sidechain, minimal percussion. ' +
    'No melody, no vocals, no sound effects, no bleeps, no pops, no artefacts. ' +
    'Consistent texture throughout, advertisement mix, leaves space for voiceover.';
  const promptHash = createPromptHash({
    kind: 'tts',
    action: 'music_generation',
    prompt,
    modelId: 'music_v1',
    safeDuration,
  });
  const cached = await readCachedArtifact<{ base64: string }>('tts', promptHash);
  if (cached) return Buffer.from(cached.base64, 'base64');

  await enforceDailyCostGuard({
    provider: 'elevenlabs',
    action: 'music_generation',
    estimatedCostUsd: estimateAssetCost({
      provider: 'elevenlabs',
      operationType: 'music_generation',
    }).totalUsd,
    assetId: paidOptions.assetId,
  });

  const url = `https://api.elevenlabs.io/v1/music?output_format=mp3_44100_128`;
  const startedAt = Date.now();

  const response = await axios.post(
    url,
    {
      prompt,
      music_length_ms: Math.round(safeDuration * 1000),
      model_id: 'music_v1',
      force_instrumental: true,
      prompt_influence: 0.7,
    },
    {
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
      },
      responseType: 'arraybuffer',
    },
  );

  const buf = Buffer.from(response.data as ArrayBuffer);

  // Sanity-check: ElevenLabs occasionally returns a tiny error JSON instead of audio.
  // A valid 22-30s mp3 at 128kbps should be well over 50 KB.
  if (buf.length < 50_000) {
    throw new Error(`BGM response too small (${buf.length} bytes) — likely an API error`);
  }

  await writeCachedArtifact('tts', promptHash, { base64: buf.toString('base64') }, {
    provider: 'elevenlabs',
    model: 'music_v1',
  });
  await recordUsageEvent({
    provider: 'elevenlabs',
    action: 'music_generation',
    status: 'generated',
    model: 'music_v1',
    assetId: paidOptions.assetId,
    promptHash,
    durationMs: Date.now() - startedAt,
    actualCostUsd: estimateAssetCost({
      provider: 'elevenlabs',
      operationType: 'music_generation',
      includeSafetyBuffer: false,
    }).totalUsd,
  });

  return buf;
}
