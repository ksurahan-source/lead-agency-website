import {
  getRenderProgress,
  presignUrl,
  renderMediaOnLambda,
  type AwsRegion,
  type RenderProgress,
} from '@remotion/lambda-client';

import { normalizeCostMode, requireFinalApproval, type CostMode } from '@/lib/cost-control';
import { estimateAssetCost, recordProviderUsage } from '@/lib/cost-meter';
import type { AspectRatio, RenderableShortScript, RenderJob } from '@/lib/types';

const DEFAULT_COMPOSITION_ID = 'ShortsComposition';
const DEFAULT_STATUS_POLL_MS = 5000;
const DEFAULT_PRESIGNED_URL_TTL_SECONDS = 60 * 60 * 6;

export interface AwsRemotionRenderInput {
  jobId: string;
  runId?: string;
  script: RenderableShortScript;
  aspectRatio: AspectRatio;
  voiceoverAsset?: string;
  backgroundMusicAsset?: string;
  targetDurationSeconds?: number;
  mode?: CostMode;
  approvedFinalRender?: boolean;
}

export interface AwsRemotionConfig {
  region: AwsRegion;
  functionName: string;
  serveUrl: string;
  composition: string;
  bucketName?: string;
  callbackUrl?: string;
  callbackSecret?: string;
  forcePathStyle: boolean;
  presignOutputs: boolean;
}

export interface AwsRemotionStartResult {
  job: RenderJob;
  bucketName: string;
  renderId: string;
}

export function getAwsRemotionConfig(): AwsRemotionConfig {
  const region = requiredEnv('AWS_REGION') as AwsRegion;
  const functionName = requiredEnv('REMOTION_LAMBDA_FUNCTION_NAME');
  const serveUrl = requiredEnv('REMOTION_SERVE_URL');

  return {
    region,
    functionName,
    serveUrl,
    composition: process.env.REMOTION_RENDER_COMPOSITION_ID?.trim() || DEFAULT_COMPOSITION_ID,
    bucketName: process.env.REMOTION_S3_BUCKET_NAME?.trim() || undefined,
    callbackUrl: process.env.RENDER_CALLBACK_BASE_URL
      ? `${process.env.RENDER_CALLBACK_BASE_URL.replace(/\/$/, '')}/api/webhooks/remotion/render`
      : undefined,
    callbackSecret: process.env.REMOTION_RENDER_CALLBACK_SECRET?.trim() || undefined,
    forcePathStyle: process.env.REMOTION_FORCE_PATH_STYLE === 'true',
    presignOutputs: process.env.REMOTION_OUTPUT_PRIVACY === 'private',
  };
}

export async function startAwsRemotionRender(input: AwsRemotionRenderInput): Promise<AwsRemotionStartResult> {
  requireFinalApproval({
    provider: 'aws-remotion',
    action: 'render_lambda_invoke',
    mode: normalizeCostMode(input.mode),
    approvedFinalRender: input.approvedFinalRender,
  });

  const config = getAwsRemotionConfig();
  const startTime = Date.now();
  const targetDurationSeconds = input.targetDurationSeconds ?? durationFromScript(input.script);
  const outName = `renders/${input.jobId}.mp4`;

  console.info('[render:start]', {
    jobId: input.jobId,
    runId: input.runId,
    provider: 'aws-remotion',
    composition: config.composition,
    region: config.region,
    functionName: config.functionName,
    bucketName: config.bucketName,
  });

  const result = await renderMediaOnLambda({
    region: config.region,
    functionName: config.functionName,
    serveUrl: config.serveUrl,
    composition: config.composition,
    codec: 'h264',
    inputProps: {
      script: input.script,
      backgroundUrl: '',
      voiceoverAsset: input.voiceoverAsset,
      backgroundMusicAsset: input.backgroundMusicAsset,
      targetDurationSeconds,
      aspectRatio: input.aspectRatio,
    },
    forceBucketName: config.bucketName,
    outName,
    overwrite: true,
    privacy: config.presignOutputs ? 'private' : 'public',
    downloadBehavior: { type: 'play-in-browser' },
    webhook: config.callbackUrl
      ? {
          url: config.callbackUrl,
          secret: config.callbackSecret ?? null,
          customData: {
            jobId: input.jobId,
            runId: input.runId ?? null,
          },
        }
      : null,
    metadata: {
      jobId: input.jobId,
      runId: input.runId ?? '',
      product: 'hi-ob-creative-os',
    },
    isProduction: true,
    maxRetries: Number(process.env.REMOTION_LAMBDA_MAX_RETRIES ?? 1),
    framesPerLambda: parseOptionalInteger(process.env.REMOTION_FRAMES_PER_LAMBDA),
    concurrency: parseOptionalInteger(process.env.REMOTION_LAMBDA_CONCURRENCY),
    forcePathStyle: config.forcePathStyle,
  });

  const now = new Date().toISOString();
  const job: RenderJob = {
    id: input.jobId,
    runId: input.runId,
    provider: 'aws-remotion',
    status: 'rendering',
    phase: 'rendering',
    progress: 0,
    attempt: 1,
    remotionRenderId: result.renderId,
    bucketName: result.bucketName,
    functionName: config.functionName,
    region: config.region,
    outputKey: outName,
    createdAt: now,
    startedAt: now,
    updatedAt: now,
    logs: {
      cloudWatch: result.cloudWatchLogs,
      cloudWatchMain: result.cloudWatchMainLogs,
      lambdaInsights: result.lambdaInsightsLogs,
      s3Folder: result.folderInS3Console,
      progressJson: result.progressJsonInConsole,
    },
  };

  console.info('[render:lambda-invoked]', {
    jobId: input.jobId,
    renderId: result.renderId,
    bucketName: result.bucketName,
    durationMs: Date.now() - startTime,
  });

  return {
    job,
    bucketName: result.bucketName,
    renderId: result.renderId,
  };
}

export async function refreshAwsRemotionProgress(job: RenderJob): Promise<RenderJob> {
  if (!job.remotionRenderId || !job.bucketName || !job.functionName || !job.region) {
    return {
      ...job,
      status: 'failed',
      phase: 'failed',
      retryable: false,
      error: 'Render job is missing AWS Remotion execution metadata.',
      failedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  if (job.status === 'succeeded' || job.status === 'failed' || job.status === 'canceled') {
    return job;
  }

  const progress = await getRenderProgress({
    functionName: job.functionName,
    bucketName: job.bucketName,
    renderId: job.remotionRenderId,
    region: job.region as AwsRegion,
    forcePathStyle: process.env.REMOTION_FORCE_PATH_STYLE === 'true',
  });

  return normalizeProgress(job, progress);
}

export function getRecommendedPollAfterMs(job: RenderJob) {
  if (job.status === 'succeeded' || job.status === 'failed' || job.status === 'canceled') return null;
  return DEFAULT_STATUS_POLL_MS;
}

async function normalizeProgress(job: RenderJob, progress: RenderProgress): Promise<RenderJob> {
  const now = new Date().toISOString();

  if (progress.fatalErrorEncountered || progress.errors.length > 0) {
    const message = progress.errors[0]?.message ?? 'AWS Remotion render failed.';

    console.error('[render:failure]', {
      jobId: job.id,
      renderId: job.remotionRenderId,
      message,
      errors: progress.errors.length,
    });

    return {
      ...job,
      status: 'failed',
      phase: 'failed',
      progress: Math.round(progress.overallProgress * 100),
      error: message,
      retryable: true,
      failedAt: now,
      updatedAt: now,
    };
  }

  if (progress.done) {
    const lambdaDurationMs = getRenderDurationMs(job, progress.timeToFinish);
    const storageBytes = progress.outputSizeInBytes ?? job.outputSizeInBytes;
    const actualCostUsd = estimateAssetCost({
      provider: 'aws-remotion',
      operationType: 'render',
      lambdaDurationMs,
      memoryMb: getLambdaMemoryMb(),
      storageBytes,
      includeSafetyBuffer: false,
    }).totalUsd;

    console.info('[render:complete]', {
      jobId: job.id,
      renderId: job.remotionRenderId,
      outputFile: progress.outputFile,
      outputSizeInBytes: progress.outputSizeInBytes,
      timeToFinish: progress.timeToFinish,
      actualCostUsd,
    });

    await recordProviderUsage({
      provider: 'aws-remotion',
      operationType: 'render',
      status: 'completed',
      runId: job.runId,
      jobId: job.id,
      assetId: job.id,
      estimatedCostUsd: job.estimatedCostUsd,
      actualCostUsd,
      lambdaDurationMs,
      memoryMb: getLambdaMemoryMb(),
      storageBytes,
    });

    return {
      ...job,
      status: 'succeeded',
      phase: 'completed',
      progress: 100,
      url: progress.outputFile ?? job.url,
      outputKey: progress.outKey ?? job.outputKey,
      outputSizeInBytes: storageBytes,
      lambdaDurationMs,
      memoryMb: getLambdaMemoryMb(),
      storageBytes,
      actualCostUsd,
      completedAt: now,
      updatedAt: now,
    };
  }

  return {
    ...job,
    status: progress.overallProgress > 0 ? 'rendering' : 'queued',
    phase: progress.overallProgress > 0 ? 'rendering' : 'queued',
    progress: Math.round(progress.overallProgress * 100),
    updatedAt: now,
  };
}

function getRenderDurationMs(job: RenderJob, timeToFinish: unknown) {
  if (typeof timeToFinish === 'number' && Number.isFinite(timeToFinish) && timeToFinish > 0) {
    return timeToFinish;
  }
  if (job.startedAt) {
    const started = Date.parse(job.startedAt);
    if (Number.isFinite(started)) return Date.now() - started;
  }
  return Number(process.env.REMOTION_ESTIMATED_DURATION_MS ?? 120000);
}

function getLambdaMemoryMb() {
  const memory = Number(process.env.REMOTION_LAMBDA_MEMORY_MB);
  return Number.isFinite(memory) && memory > 0 ? memory : 2048;
}

export async function getPlaybackUrl(job: RenderJob) {
  if (job.url) return job.url;
  if (!job.bucketName || !job.outputKey || !job.region) return undefined;

  if (process.env.REMOTION_OUTPUT_PRIVACY === 'private') {
    return presignUrl({
      region: job.region as AwsRegion,
      bucketName: job.bucketName,
      objectKey: job.outputKey,
      expiresInSeconds: Number(process.env.REMOTION_PRESIGNED_URL_TTL_SECONDS ?? DEFAULT_PRESIGNED_URL_TTL_SECONDS),
      forcePathStyle: process.env.REMOTION_FORCE_PATH_STYLE === 'true',
    });
  }

  const cdnBaseUrl = process.env.REMOTION_OUTPUT_BASE_URL?.trim();
  if (cdnBaseUrl) return `${cdnBaseUrl.replace(/\/$/, '')}/${job.outputKey}`;

  return `https://s3.${job.region}.amazonaws.com/${job.bucketName}/${job.outputKey}`;
}

function durationFromScript(script: RenderableShortScript) {
  return script.scenes.reduce((total, scene) => total + scene.duration, 0);
}

function requiredEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}

function parseOptionalInteger(value: string | undefined) {
  if (!value?.trim()) return undefined;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : undefined;
}
