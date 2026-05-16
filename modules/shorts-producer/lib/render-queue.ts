import { randomUUID } from 'node:crypto';

import {
  createPromptHash,
  enforceDailyCostGuard,
  normalizeCostMode,
  readCachedArtifact,
  requireFinalApproval,
  writeCachedArtifact,
  type CostMode,
} from '@/lib/cost-control';
import { getPlaybackUrl, refreshAwsRemotionProgress, startAwsRemotionRender } from '@/lib/remotion';
import { getRenderState, saveRenderState } from '@/lib/render-state';
import type { AspectRatio, RenderJob, RenderableShortScript, ScriptGenerationResult } from '@/lib/types';

const ASPECT_RATIOS: AspectRatio[] = ['9:16', '1:1', '16:9'];

export interface QueueRenderInput {
  script: ScriptGenerationResult | RenderableShortScript;
  aspectRatio?: AspectRatio;
  runId?: string;
  jobId?: string;
  voiceoverAsset?: string;
  backgroundMusicAsset?: string;
  targetDurationSeconds?: number;
  mode?: CostMode;
  approvedFinalRender?: boolean;
  estimatedCostUsd?: number;
  adminOverride?: boolean;
}

export async function queueRender(input: QueueRenderInput) {
  const script = normalizeRenderableScript(input.script);
  const aspectRatio = normalizeAspectRatio(input.aspectRatio ?? getScriptAspectRatio(input.script));
  const jobId = input.jobId?.trim() || randomUUID();
  const now = new Date().toISOString();
  const mode = normalizeCostMode(input.mode);
  const promptHash = createPromptHash({
    kind: 'render',
    provider: 'aws-remotion',
    script,
    aspectRatio,
    voiceoverAsset: input.voiceoverAsset,
    backgroundMusicAsset: input.backgroundMusicAsset,
    targetDurationSeconds: input.targetDurationSeconds,
  });

  validateRenderInput(script);
  requireFinalApproval({
    provider: 'aws-remotion',
    action: 'render',
    mode,
    approvedFinalRender: input.approvedFinalRender,
  });

  const existing = await getRenderState(jobId);
  if (existing && existing.status !== 'failed') return existing;

  const cachedRender = await readCachedArtifact<RenderJob>('render', promptHash);
  if (cachedRender?.id) {
    const cachedJob = await getRenderState(cachedRender.id);
    if (cachedJob && cachedJob.status !== 'failed') return cachedJob;
  }

  await enforceDailyCostGuard({
    provider: 'aws-remotion',
    action: 'render',
    runId: input.runId,
    jobId,
    assetId: jobId,
    estimatedCostUsd: input.estimatedCostUsd,
    renders: 1,
    adminOverride: input.adminOverride,
  });

  const queuedJob: RenderJob = {
    id: jobId,
    runId: input.runId,
    provider: 'aws-remotion',
    status: 'queued',
    phase: 'invoking_lambda',
    progress: 0,
    attempt: (existing?.attempt ?? 0) + 1,
    cacheKey: promptHash,
    estimatedCostUsd: input.estimatedCostUsd,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };

  await saveRenderState(queuedJob);

  try {
    const { job } = await startAwsRemotionRender({
      jobId,
      runId: input.runId,
      script,
      aspectRatio,
      voiceoverAsset: input.voiceoverAsset,
      backgroundMusicAsset: input.backgroundMusicAsset,
      targetDurationSeconds: input.targetDurationSeconds,
      mode,
      approvedFinalRender: input.approvedFinalRender,
    });

    const savedJob = await saveRenderState({ ...job, cacheKey: promptHash, estimatedCostUsd: input.estimatedCostUsd });
    await writeCachedArtifact('render', promptHash, savedJob, { provider: 'aws-remotion' });
    return savedJob;
  } catch (error: unknown) {
    const failedJob: RenderJob = {
      ...queuedJob,
      status: 'failed',
      phase: 'failed',
      error: getRenderErrorMessage(error),
      retryable: true,
      failedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    console.error('[render:failure]', {
      jobId,
      error: failedJob.error,
    });

    await saveRenderState(failedJob);
    throw error;
  }
}

export async function getNormalizedRenderStatus(id: string) {
  const job = await getRenderState(id);
  if (!job) return null;

  const refreshedJob = await saveRenderState(await refreshAwsRemotionProgress(job));
  const playbackUrl = await getPlaybackUrl(refreshedJob);
  if (refreshedJob.cacheKey && refreshedJob.status === 'succeeded') {
    await writeCachedArtifact('render', refreshedJob.cacheKey, refreshedJob, { provider: 'aws-remotion' });
  }

  return {
    ...refreshedJob,
    url: playbackUrl ?? refreshedJob.url,
  };
}

function normalizeRenderableScript(script: ScriptGenerationResult | RenderableShortScript): RenderableShortScript {
  return {
    title: script.title,
    hook: script.hook,
    full_script: script.full_script,
    scenes: script.scenes.map((scene) => ({
      ...scene,
      asset_url: 'asset_url' in scene ? scene.asset_url : undefined,
    })),
  };
}

function validateRenderInput(script: RenderableShortScript) {
  if (!script.title?.trim()) throw new Error('Render script title is required');
  if (!script.scenes.length) throw new Error('Render script must include at least one scene');

  for (const [index, scene] of script.scenes.entries()) {
    if (!scene.text?.trim() && !scene.voiceover?.trim()) {
      throw new Error(`Scene ${index + 1} is missing copy or voiceover text`);
    }
    if (!Number.isFinite(scene.duration) || scene.duration <= 0) {
      throw new Error(`Scene ${index + 1} has an invalid duration`);
    }
  }
}

function normalizeAspectRatio(input: unknown): AspectRatio {
  return typeof input === 'string' && ASPECT_RATIOS.includes(input as AspectRatio)
    ? input as AspectRatio
    : '9:16';
}

function getScriptAspectRatio(script: ScriptGenerationResult | RenderableShortScript) {
  return '_meta' in script ? script._meta?.customer?.format?.aspectRatio : undefined;
}

function getRenderErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Unknown AWS Remotion render error';
}
