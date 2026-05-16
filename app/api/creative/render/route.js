import { NextResponse } from 'next/server';

import {
  createCreativeRenderJob,
  getCreativeEnv,
  readCreativeRunDetail,
  updateCreativeJob,
  writeUsageEvent,
} from '@/lib/creativeUsageStore';
import { isStudioRequestAuthenticated } from '@/lib/studioAuth';

export const runtime = 'edge';

export async function POST(request) {
  if (!(await isStudioRequestAuthenticated(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await readJsonBody(request);
  const runId = clean(body?.runId);
  const mode = clean(body?.mode);
  const approvedFinalRender = body?.approvedFinalRender === true;

  if (!runId) {
    return NextResponse.json({ success: false, error: 'RUN_ID_REQUIRED' }, { status: 400 });
  }
  if (mode !== 'final' || approvedFinalRender !== true) {
    return NextResponse.json({
      success: false,
      error: 'FINAL_RENDER_APPROVAL_REQUIRED',
      message: 'Render requires mode="final" and approvedFinalRender=true.',
    }, { status: 422 });
  }

  const detail = await readCreativeRunDetail(runId);
  if (!detail) {
    return NextResponse.json({ success: false, error: 'RUN_NOT_FOUND' }, { status: 404 });
  }

  const scriptArtifactKey = detail.scriptArtifactKey;
  if (!scriptArtifactKey) {
    return NextResponse.json({ success: false, error: 'SCRIPT_ARTIFACT_REQUIRED' }, { status: 409 });
  }

  const created = await createCreativeRenderJob({ runId, scriptArtifactKey });
  if (created.conflict) {
    return NextResponse.json({
      success: false,
      error: created.reason,
      renderJob: created.job,
    }, { status: 409 });
  }

  const job = created.job;
  const { env } = getCreativeEnv();
  const triggerUrl = clean(env.RENDER_TRIGGER_URL);
  const triggerSecret = clean(env.RENDER_TRIGGER_SECRET);
  const callbackUrl = `${new URL(request.url).origin}/api/webhooks/remotion/render`;

  if (!triggerUrl || !triggerSecret) {
    const metadata = {
      ...job.metadata,
      scriptArtifactKey,
      callbackUrl,
      configMissing: missingTriggerConfig({ triggerUrl, triggerSecret }),
    };

    await updateCreativeJob(job.id, { status: 'blocked', metadata });
    await writeUsageEvent({
      runId,
      jobId: job.id,
      assetId: job.id,
      provider: 'aws-remotion',
      operationType: 'render',
      status: 'blocked',
      estimatedCostUsd: 0,
      actualCostUsd: 0,
      reason: `missing_render_trigger_config:${metadata.configMissing.join(',')}`,
      metadata,
    });

    return NextResponse.json({
      success: false,
      error: 'RENDER_TRIGGER_NOT_CONFIGURED',
      missingEnv: metadata.configMissing,
      renderJob: { ...job, status: 'blocked', metadata },
    }, { status: 503 });
  }

  await updateCreativeJob(job.id, {
    status: 'triggering',
    metadata: {
      ...job.metadata,
      scriptArtifactKey,
      callbackUrl,
    },
  });

  try {
    const triggerResponse = await fetch(triggerUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${triggerSecret}`,
      },
      body: JSON.stringify({
        jobId: job.id,
        runId,
        scriptArtifactKey,
        callbackUrl,
        approvedFinalRender,
        mode,
      }),
    });

    const triggerPayload = await readJsonResponse(triggerResponse);
    if (!triggerResponse.ok) {
      throw new RenderTriggerError(triggerResponse.status, triggerPayload);
    }

    const metadata = {
      ...job.metadata,
      scriptArtifactKey,
      callbackUrl,
      triggerStatus: triggerResponse.status,
      triggerResponse: triggerPayload,
    };

    await updateCreativeJob(job.id, { status: 'rendering', metadata });
    await writeUsageEvent({
      runId,
      jobId: job.id,
      assetId: job.id,
      provider: 'aws-remotion',
      operationType: 'render',
      status: 'triggered',
      estimatedCostUsd: 0,
      actualCostUsd: 0,
      reason: 'render_triggered',
      metadata,
    });

    return NextResponse.json({
      success: true,
      renderJob: {
        ...job,
        status: 'rendering',
        metadata,
      },
    });
  } catch (error) {
    const metadata = {
      ...job.metadata,
      scriptArtifactKey,
      callbackUrl,
      triggerError: error instanceof RenderTriggerError ? error.payload : null,
      triggerStatus: error instanceof RenderTriggerError ? error.status : null,
    };

    await updateCreativeJob(job.id, { status: 'failed', metadata });
    await writeUsageEvent({
      runId,
      jobId: job.id,
      assetId: job.id,
      provider: 'aws-remotion',
      operationType: 'render',
      status: 'failed',
      estimatedCostUsd: 0,
      actualCostUsd: 0,
      reason: 'render_trigger_failed',
      metadata,
    });

    return NextResponse.json({
      success: false,
      error: 'RENDER_TRIGGER_FAILED',
      renderJob: {
        ...job,
        status: 'failed',
        metadata,
      },
    }, { status: 502 });
  }
}

async function readJsonBody(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

async function readJsonResponse(response) {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text.slice(0, 500) };
  }
}

function clean(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function missingTriggerConfig({ triggerUrl, triggerSecret }) {
  return [
    triggerUrl ? null : 'RENDER_TRIGGER_URL',
    triggerSecret ? null : 'RENDER_TRIGGER_SECRET',
  ].filter(Boolean);
}

class RenderTriggerError extends Error {
  constructor(status, payload) {
    super('Render trigger failed');
    this.status = status;
    this.payload = payload;
  }
}
