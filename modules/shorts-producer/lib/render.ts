import { queueRender } from '@/lib/render-queue';
import type { GenerationSettings, ScriptGenerationResult } from '@/lib/types';

export async function startRender(script: ScriptGenerationResult, settings: GenerationSettings) {
  return queueRender({
    script,
    aspectRatio: settings.aspectRatio,
    voiceoverAsset: undefined,
    backgroundMusicAsset: undefined,
    mode: settings.mode,
    approvedFinalRender: settings.approvedFinalRender,
  });
}
