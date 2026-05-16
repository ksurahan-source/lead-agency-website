import { timingSafeEqual } from 'node:crypto';

import { startAwsRemotionRender, getAwsRemotionProgress } from './remotion.js';
import { loadScriptArtifact } from './script-loader.js';

const MAX_BODY_BYTES = 1024 * 1024;
const renderJobs = new Map();

export async function handleFetchRequest(request) {
  try {
    const url = new URL(request.url);

    if (request.method === 'GET' && url.pathname === '/health') {
      return jsonResponse(200, {
        success: true,
        service: 'render-trigger',
        status: 'ok',
      });
    }

    if (url.pathname === '/v1/render' && request.method === 'POST') {
      return await handleRender(request);
    }

    const statusMatch = url.pathname.match(/^\/v1\/render\/([^/]+)\/status$/);
    if (statusMatch && request.method === 'GET') {
      return await handleStatus(request, statusMatch[1], url);
    }

    return jsonResponse(404, { success: false, error: 'NOT_FOUND' });
  } catch (error) {
    const status = getHttpStatus(error);
    if (status >= 500) {
      console.error('[render-trigger:error]', error);
    }
    return jsonResponse(status, { success: false, error: getErrorMessage(error) });
  }
}

async function handleRender(request) {
  if (!isAuthorized(request)) {
    return jsonResponse(401, { success: false, error: 'UNAUTHORIZED' });
  }

  const body = await readJsonBody(request);
  const input = validateRenderRequest(body);
  const script = await loadScriptArtifact(input.scriptArtifactKey);
  const aspectRatio = normalizeAspectRatio(input.aspectRatio ?? script?._meta?.customer?.format?.aspectRatio);
  const targetDurationSeconds = normalizePositiveNumber(
    input.targetDurationSeconds ?? script?._meta?.customer?.format?.targetDurationSeconds,
  );

  const result = await startAwsRemotionRender({
    jobId: input.jobId,
    runId: input.runId,
    script: normalizeRenderableScript(script),
    aspectRatio,
    targetDurationSeconds,
    mode: input.mode,
    approvedFinalRender: input.approvedFinalRender,
    callbackUrl: input.callbackUrl,
  });

  renderJobs.set(input.jobId, {
    jobId: input.jobId,
    runId: input.runId,
    remotionRenderId: result.remotionRenderId,
    bucketName: result.bucketName,
    outputKey: result.outputKey,
    status: 'rendering',
    createdAt: new Date().toISOString(),
  });

  return jsonResponse(200, {
    success: true,
    remotionRenderId: result.remotionRenderId,
    bucketName: result.bucketName,
    outputKey: result.outputKey,
    status: 'rendering',
  });
}

async function handleStatus(request, jobId, url) {
  if (!isAuthorized(request)) {
    return jsonResponse(401, { success: false, error: 'UNAUTHORIZED' });
  }

  const known = renderJobs.get(jobId);
  const remotionRenderId = clean(url.searchParams.get('remotionRenderId')) || known?.remotionRenderId;
  const bucketName = clean(url.searchParams.get('bucketName')) || known?.bucketName;

  if (!remotionRenderId || !bucketName) {
    return jsonResponse(404, {
      success: false,
      error: 'RENDER_JOB_STATUS_METADATA_REQUIRED',
    });
  }

  const status = await getAwsRemotionProgress({ remotionRenderId, bucketName });
  renderJobs.set(jobId, {
    ...known,
    jobId,
    remotionRenderId,
    bucketName,
    status: status.status,
    progress: status.progress,
    outputKey: status.outputKey ?? known?.outputKey,
    updatedAt: new Date().toISOString(),
  });

  return jsonResponse(200, {
    success: true,
    jobId,
    remotionRenderId,
    bucketName,
    ...status,
  });
}

function validateRenderRequest(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw httpError(400, 'INVALID_JSON_BODY');
  }
  if (Array.isArray(body.jobs) || Array.isArray(body.renders)) {
    throw httpError(422, 'BATCH_RENDER_NOT_SUPPORTED');
  }

  const jobId = clean(body.jobId);
  const runId = clean(body.runId);
  const scriptArtifactKey = clean(body.scriptArtifactKey);
  const callbackUrl = clean(body.callbackUrl);
  const mode = clean(body.mode);

  if (!jobId) throw httpError(400, 'JOB_ID_REQUIRED');
  if (!runId) throw httpError(400, 'RUN_ID_REQUIRED');
  if (!scriptArtifactKey) throw httpError(400, 'SCRIPT_ARTIFACT_KEY_REQUIRED');
  if (callbackUrl && !isHttpUrl(callbackUrl)) throw httpError(400, 'INVALID_CALLBACK_URL');
  if (mode !== 'final' || body.approvedFinalRender !== true) {
    throw httpError(422, 'FINAL_RENDER_APPROVAL_REQUIRED');
  }

  return {
    jobId,
    runId,
    scriptArtifactKey,
    callbackUrl,
    approvedFinalRender: true,
    mode,
    aspectRatio: body.aspectRatio,
    targetDurationSeconds: body.targetDurationSeconds,
  };
}

function normalizeRenderableScript(script) {
  if (!script || typeof script !== 'object') throw httpError(422, 'INVALID_SCRIPT_ARTIFACT');
  if (!clean(script.title)) throw httpError(422, 'SCRIPT_TITLE_REQUIRED');
  if (!Array.isArray(script.scenes) || script.scenes.length === 0) {
    throw httpError(422, 'SCRIPT_SCENES_REQUIRED');
  }

  return {
    title: script.title,
    hook: clean(script.hook),
    full_script: clean(script.full_script),
    scenes: script.scenes.map((scene, index) => normalizeScene(scene, index)),
  };
}

function normalizeScene(scene, index) {
  if (!scene || typeof scene !== 'object') throw httpError(422, `INVALID_SCENE_${index + 1}`);
  const duration = Number(scene.duration);
  if (!Number.isFinite(duration) || duration <= 0) {
    throw httpError(422, `INVALID_SCENE_DURATION_${index + 1}`);
  }
  if (!clean(scene.text) && !clean(scene.voiceover)) {
    throw httpError(422, `SCENE_COPY_REQUIRED_${index + 1}`);
  }

  return {
    ...scene,
    text: clean(scene.text),
    voiceover: clean(scene.voiceover),
    visual_search: clean(scene.visual_search),
    duration,
    shot_type: clean(scene.shot_type) || 'dashboard',
    asset_url: clean(scene.asset_url) || undefined,
  };
}

async function readJsonBody(request) {
  const text = await request.text();
  if (Buffer.byteLength(text) > MAX_BODY_BYTES) throw httpError(413, 'REQUEST_BODY_TOO_LARGE');

  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw httpError(400, 'INVALID_JSON_BODY');
  }
}

function isAuthorized(request) {
  const secret = process.env.RENDER_TRIGGER_SECRET?.trim();
  if (!secret) {
    console.error('[render-trigger:auth] RENDER_TRIGGER_SECRET is not configured');
    return false;
  }

  const expected = `Bearer ${secret}`;
  const actual = clean(request.headers.get('authorization'));
  const expectedBuffer = Buffer.from(expected);
  const actualBuffer = Buffer.from(actual);
  return expectedBuffer.length === actualBuffer.length && timingSafeEqual(expectedBuffer, actualBuffer);
}

function jsonResponse(status, payload) {
  return Response.json(payload, {
    status,
    headers: {
      'cache-control': 'no-store',
    },
  });
}

function httpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function getErrorMessage(error) {
  return error instanceof Error ? error.message : 'Unknown render-trigger error';
}

function getHttpStatus(error) {
  const status = error?.status;
  return Number.isInteger(status) && status >= 400 && status < 600 ? status : 500;
}

function clean(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function isHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function normalizeAspectRatio(value) {
  return ['9:16', '1:1', '16:9'].includes(value) ? value : '9:16';
}

function normalizePositiveNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : undefined;
}
