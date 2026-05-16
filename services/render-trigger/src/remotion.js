import { getRenderProgress, renderMediaOnLambda } from '@remotion/lambda-client';

const DEFAULT_COMPOSITION_ID = 'ShortsComposition';

export async function startAwsRemotionRender(input) {
  requireFinalApproval(input);

  const config = getAwsRemotionConfig();
  const targetDurationSeconds = input.targetDurationSeconds ?? durationFromScript(input.script);
  const outputKey = `${clean(process.env.REMOTION_OUTPUT_PREFIX) || 'renders'}/${input.jobId}.mp4`;

  console.info('[render-trigger:render:start]', {
    jobId: input.jobId,
    runId: input.runId,
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
      targetDurationSeconds,
      aspectRatio: input.aspectRatio,
    },
    forceBucketName: config.bucketName,
    outName: outputKey,
    overwrite: true,
    privacy: config.outputPrivacy,
    downloadBehavior: { type: 'play-in-browser' },
    webhook: input.callbackUrl
      ? {
          url: input.callbackUrl,
          secret: clean(process.env.REMOTION_RENDER_CALLBACK_SECRET) || null,
          customData: {
            jobId: input.jobId,
            runId: input.runId ?? null,
          },
        }
      : null,
    metadata: {
      jobId: input.jobId,
      runId: input.runId ?? '',
      product: 'hi-op-creative-os',
      service: 'render-trigger',
    },
    isProduction: true,
    maxRetries: 0,
    framesPerLambda: parseOptionalInteger(process.env.REMOTION_FRAMES_PER_LAMBDA),
    concurrency: parseOptionalInteger(process.env.REMOTION_LAMBDA_CONCURRENCY),
    forcePathStyle: process.env.REMOTION_FORCE_PATH_STYLE === 'true',
  });

  console.info('[render-trigger:render:invoked]', {
    jobId: input.jobId,
    remotionRenderId: result.renderId,
    bucketName: result.bucketName,
    outputKey,
  });

  return {
    remotionRenderId: result.renderId,
    bucketName: result.bucketName,
    outputKey,
  };
}

export async function getAwsRemotionProgress({ remotionRenderId, bucketName }) {
  const config = getAwsRemotionConfig();
  const progress = await getRenderProgress({
    functionName: config.functionName,
    bucketName,
    renderId: remotionRenderId,
    region: config.region,
    forcePathStyle: process.env.REMOTION_FORCE_PATH_STYLE === 'true',
  });

  if (progress.fatalErrorEncountered || progress.errors?.length > 0) {
    return {
      status: 'failed',
      progress: Math.round((progress.overallProgress ?? 0) * 100),
      error: progress.errors?.[0]?.message ?? 'AWS Remotion render failed.',
    };
  }

  if (progress.done) {
    return {
      status: 'succeeded',
      progress: 100,
      outputKey: progress.outKey,
      outputFile: progress.outputFile,
      outputSizeInBytes: progress.outputSizeInBytes,
    };
  }

  return {
    status: progress.overallProgress > 0 ? 'rendering' : 'queued',
    progress: Math.round((progress.overallProgress ?? 0) * 100),
  };
}

function getAwsRemotionConfig() {
  return {
    region: requiredEnv('AWS_REGION'),
    functionName: requiredEnv('REMOTION_LAMBDA_FUNCTION_NAME'),
    serveUrl: requiredEnv('REMOTION_SERVE_URL'),
    composition: clean(process.env.REMOTION_RENDER_COMPOSITION_ID) || DEFAULT_COMPOSITION_ID,
    bucketName: clean(process.env.REMOTION_S3_BUCKET_NAME) || undefined,
    outputPrivacy: process.env.REMOTION_OUTPUT_PRIVACY === 'private' ? 'private' : 'public',
  };
}

function requireFinalApproval(input) {
  if (input.mode !== 'final' || input.approvedFinalRender !== true) {
    throw new Error('FINAL_RENDER_APPROVAL_REQUIRED');
  }
}

function durationFromScript(script) {
  return script.scenes.reduce((total, scene) => total + Number(scene.duration || 0), 0);
}

function requiredEnv(name) {
  const value = clean(process.env[name]);
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}

function clean(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function parseOptionalInteger(value) {
  if (!value?.trim()) return undefined;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : undefined;
}
