import { NextResponse } from 'next/server';

import { putCreativeArtifact } from '@/lib/creativeArtifacts';
import {
  getCreativeEnv,
  readCreativeJobById,
  updateCreativeJob,
  writeUsageEvent,
} from '@/lib/creativeUsageStore';

export const runtime = 'edge';

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'INVALID_JSON_BODY' }, { status: 400 });
  }

  const { env } = getCreativeEnv();
  const secret = clean(env.REMOTION_RENDER_CALLBACK_SECRET);
  if (!secret) {
    return NextResponse.json({ success: false, error: 'REMOTION_RENDER_CALLBACK_SECRET_NOT_CONFIGURED' }, { status: 503 });
  }

  if (!(await verifyRemotionSignature({ payload, request, secret }))) {
    return NextResponse.json({ success: false, error: 'INVALID_REMOTION_WEBHOOK_SIGNATURE' }, { status: 401 });
  }

  const customData = getCustomData(payload);
  const jobId = clean(payload.jobId) || clean(customData.jobId);
  if (!jobId) {
    return NextResponse.json({ success: false, error: 'JOB_ID_REQUIRED' }, { status: 400 });
  }

  const existingJob = await readCreativeJobById(jobId);
  const runId = clean(payload.runId) || clean(customData.runId) || existingJob?.runId;
  if (!runId) {
    return NextResponse.json({ success: false, error: 'RUN_ID_REQUIRED' }, { status: 400 });
  }

  if (isFailurePayload(payload)) {
    const message = getFailureMessage(payload);
    const metadata = compactMetadata({
      ...existingJob?.metadata,
      remotionWebhook: summarizePayload(payload, env),
      failureMessage: message,
    });

    await updateCreativeJob(jobId, { status: 'failed', metadata });
    await writeUsageEvent({
      runId,
      jobId,
      assetId: jobId,
      provider: 'aws-remotion',
      operationType: 'render',
      status: 'failed',
      estimatedCostUsd: getEstimatedCost(payload),
      actualCostUsd: getActualCost(payload),
      reason: message,
      lambdaDurationMs: getLambdaDurationMs(payload),
      storageBytes: getStorageBytes(payload),
      metadata,
    });

    return NextResponse.json({ success: true, status: 'failed', jobId, runId });
  }

  try {
    const outputUrl = getOutputUrl(payload, env);
    if (!outputUrl) {
      throw new Error('RENDER_OUTPUT_URL_REQUIRED');
    }

    const outputResponse = await fetch(outputUrl);
    if (!outputResponse.ok || !outputResponse.body) {
      throw new Error(`RENDER_OUTPUT_FETCH_FAILED_${outputResponse.status}`);
    }

    const r2Key = getFinalRenderKey({ runId, jobId });
    const contentType = outputResponse.headers.get('content-type') || 'video/mp4';
    await putCreativeArtifact({
      key: r2Key,
      body: outputResponse.body,
      contentType,
      mock: false,
      metadata: {
        provider: 'aws-remotion',
        jobId,
        runId,
        remotionRenderId: getRenderId(payload),
        sourceOutKey: getOutKey(payload),
        sourceBucket: getOutBucket(payload),
      },
    });

    const metadata = compactMetadata({
      ...existingJob?.metadata,
      remotionWebhook: summarizePayload(payload, env),
      r2Key,
    });

    await updateCreativeJob(jobId, { status: 'succeeded', r2Key, metadata });
    await writeUsageEvent({
      runId,
      jobId,
      assetId: jobId,
      provider: 'aws-remotion',
      operationType: 'render',
      status: 'completed',
      estimatedCostUsd: getEstimatedCost(payload),
      actualCostUsd: getActualCost(payload),
      reason: 'render_webhook_completed',
      lambdaDurationMs: getLambdaDurationMs(payload),
      storageBytes: getStorageBytes(payload),
      metadata: {
        r2Key,
        outputUrl,
        remotionRenderId: getRenderId(payload),
      },
    });

    return NextResponse.json({
      success: true,
      status: 'succeeded',
      jobId,
      runId,
      r2Key,
      artifactUrl: getArtifactUrl(r2Key),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'RENDER_WEBHOOK_PROCESSING_FAILED';
    const metadata = compactMetadata({
      ...existingJob?.metadata,
      remotionWebhook: summarizePayload(payload, env),
      failureMessage: message,
    });

    await updateCreativeJob(jobId, { status: 'failed', metadata });
    await writeUsageEvent({
      runId,
      jobId,
      assetId: jobId,
      provider: 'aws-remotion',
      operationType: 'render',
      status: 'failed',
      estimatedCostUsd: getEstimatedCost(payload),
      actualCostUsd: getActualCost(payload),
      reason: message,
      lambdaDurationMs: getLambdaDurationMs(payload),
      storageBytes: getStorageBytes(payload),
      metadata,
    });

    return NextResponse.json({ success: false, error: message, jobId, runId }, { status: 502 });
  }
}

async function verifyRemotionSignature({ payload, request, secret }) {
  const signature = request.headers.get('x-remotion-signature')?.trim();
  if (signature) {
    const expected = await hmacSha512(secret, JSON.stringify(payload));
    return constantTimeEqual(signature, `sha512=${expected}`);
  }

  const bearer = request.headers.get('authorization')?.trim();
  if (bearer) {
    return constantTimeEqual(bearer, `Bearer ${secret}`);
  }

  return constantTimeEqual(clean(payload.secret), secret) || constantTimeEqual(clean(payload.webhookSecret), secret);
}

async function hmacSha512(secret, message) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-512' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
  return [...new Uint8Array(signature)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

function constantTimeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  let mismatch = a.length === b.length ? 0 : 1;
  const maxLength = Math.max(a.length, b.length);
  for (let index = 0; index < maxLength; index += 1) {
    mismatch |= (a.charCodeAt(index) || 0) ^ (b.charCodeAt(index) || 0);
  }
  return mismatch === 0;
}

function isFailurePayload(payload) {
  return payload?.type === 'error' ||
    payload?.type === 'timeout' ||
    payload?.status === 'failed' ||
    payload?.fatalErrorEncountered === true ||
    (Array.isArray(payload?.errors) && payload.errors.length > 0);
}

function getFailureMessage(payload) {
  return clean(payload?.error?.message) ||
    clean(payload?.message) ||
    clean(payload?.errors?.[0]?.message) ||
    `remotion_webhook_${clean(payload?.type) || 'failed'}`;
}

function getCustomData(payload) {
  return payload?.customData ?? payload?.webhook?.customData ?? payload?.data?.customData ?? {};
}

function getOutputUrl(payload, env) {
  return clean(payload?.outputFile) ||
    clean(payload?.outputUrl) ||
    clean(payload?.url) ||
    clean(payload?.output?.url) ||
    clean(payload?.data?.outputFile) ||
    buildS3Url(payload, env);
}

function buildS3Url(payload, env) {
  const bucket = getOutBucket(payload);
  const key = getOutKey(payload);
  const region = clean(env.AWS_REGION) || clean(env.REMOTION_AWS_REGION);
  if (!bucket || !key || !region) return '';
  return `https://${bucket}.s3.${region}.amazonaws.com/${encodePath(key)}`;
}

function getFinalRenderKey({ runId, jobId }) {
  return `creative/renders/${cleanSegment(runId)}/${cleanSegment(jobId)}/final.mp4`;
}

function getArtifactUrl(key) {
  return `/api/creative/artifacts?key=${encodeURIComponent(key)}`;
}

function summarizePayload(payload, env) {
  return {
    type: clean(payload?.type) || undefined,
    renderId: getRenderId(payload) || undefined,
    outputFile: getOutputUrl(payload, env) || undefined,
    outKey: getOutKey(payload) || undefined,
    outBucket: getOutBucket(payload) || undefined,
    outputSizeInBytes: getStorageBytes(payload) || undefined,
    timeToFinish: getLambdaDurationMs(payload) || undefined,
  };
}

function compactMetadata(metadata = {}) {
  return Object.fromEntries(Object.entries(metadata).filter(([, value]) => value !== undefined && value !== null && value !== ''));
}

function getRenderId(payload) {
  return clean(payload?.renderId) || clean(payload?.remotionRenderId) || clean(payload?.data?.renderId);
}

function getOutKey(payload) {
  return clean(payload?.outKey) || clean(payload?.outputKey) || clean(payload?.data?.outKey);
}

function getOutBucket(payload) {
  return clean(payload?.outBucket) || clean(payload?.bucket) || clean(payload?.bucketName) || clean(payload?.data?.outBucket);
}

function getEstimatedCost(payload) {
  return normalizeNumber(payload?.costs?.accruedSoFar ?? payload?.estimatedCostUsd);
}

function getActualCost(payload) {
  return normalizeNumber(payload?.costs?.accruedSoFar ?? payload?.actualCostUsd);
}

function getLambdaDurationMs(payload) {
  return normalizeNumber(payload?.estimatedBillingDurationInMilliseconds ?? payload?.timeToFinish);
}

function getStorageBytes(payload) {
  return normalizeNumber(payload?.outputSizeInBytes ?? payload?.renderSize ?? payload?.sizeInBytes);
}

function normalizeNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : undefined;
}

function encodePath(value) {
  return value.split('/').map((part) => encodeURIComponent(part)).join('/');
}

function cleanSegment(value) {
  return clean(value).replace(/[^a-zA-Z0-9._-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'unknown';
}

function clean(value) {
  return typeof value === 'string' ? value.trim() : '';
}
