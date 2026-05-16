import { getRequestContext } from '@cloudflare/next-on-pages';

export async function readDailyUsage(date = todayKey()) {
  const { env, isCloudflare } = getCreativeEnv();
  const db = env.CREATIVE_DB;

  if (!db) {
    if (isCloudflare) throw new Error('CREATIVE_DB binding is not configured');
    return readMemoryDailyUsage(date);
  }

  const [daily, eventsResult] = await Promise.all([
    db.prepare('SELECT * FROM creative_daily_usage WHERE date = ?').bind(date).first(),
    db.prepare('SELECT * FROM creative_usage_events WHERE date = ? ORDER BY created_at ASC').bind(date).all(),
  ]);
  const events = (eventsResult.results ?? []).map(rowToUsageRecord);

  return buildDailySummary(date, daily, events);
}

export async function writeUsageEvent(event) {
  const { env, isCloudflare } = getCreativeEnv();
  const db = env.CREATIVE_DB;

  if (!db) {
    if (isCloudflare) throw new Error('CREATIVE_DB binding is not configured');
    const record = normalizeUsageEvent(event);
    getMemoryEvents(record.createdAt.slice(0, 10)).push(record);
    return record;
  }

  const record = normalizeUsageEvent(event);
  await db.prepare(`
    INSERT INTO creative_usage_events (
      id, created_at, date, run_id, job_id, asset_id, provider, model,
      operation_type, status, estimated_cost_usd, actual_cost_usd,
      input_tokens, output_tokens, cached_input_tokens, characters,
      image_count, video_seconds, lambda_duration_ms, memory_mb, storage_bytes,
      prompt_hash, reason, metadata_json
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    record.id,
    record.createdAt,
    record.createdAt.slice(0, 10),
    record.runId ?? null,
    record.jobId ?? null,
    record.assetId ?? null,
    record.provider,
    record.model ?? null,
    record.operationType,
    record.status,
    record.estimatedCostUsd ?? 0,
    record.actualCostUsd ?? 0,
    record.inputTokens ?? null,
    record.outputTokens ?? null,
    record.cachedInputTokens ?? null,
    record.characters ?? null,
    record.imageCount ?? null,
    record.videoSeconds ?? null,
    record.lambdaDurationMs ?? null,
    record.memoryMb ?? null,
    record.storageBytes ?? null,
    record.promptHash ?? null,
    record.reason ?? null,
    JSON.stringify(record),
  ).run();

  await incrementDailyUsage(record);
  return record;
}

export async function writeCreativeRun(run) {
  const { env, isCloudflare } = getCreativeEnv();
  const db = env.CREATIVE_DB;
  const record = normalizeCreativeRun(run);

  if (!db) {
    if (isCloudflare) throw new Error('CREATIVE_DB binding is not configured');
    return record;
  }

  await db.prepare(`
    INSERT INTO creative_runs (
      id, status, mode, mock, input_json, output_key, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      status = excluded.status,
      mode = excluded.mode,
      mock = excluded.mock,
      input_json = excluded.input_json,
      output_key = excluded.output_key,
      updated_at = excluded.updated_at
  `).bind(
    record.id,
    record.status,
    record.mode,
    record.mock ? 1 : 0,
    record.inputJson ?? null,
    record.outputKey ?? null,
    record.createdAt,
    record.updatedAt,
  ).run();

  return record;
}

export async function updateCreativeRun(id, patch = {}) {
  const { env, isCloudflare } = getCreativeEnv();
  const db = env.CREATIVE_DB;
  const updatedAt = new Date().toISOString();

  if (!db) {
    if (isCloudflare) throw new Error('CREATIVE_DB binding is not configured');
    return { id, ...patch, updatedAt };
  }

  await db.prepare(`
    UPDATE creative_runs
    SET
      status = COALESCE(?, status),
      output_key = COALESCE(?, output_key),
      updated_at = ?
    WHERE id = ?
  `).bind(
    patch.status ?? null,
    patch.outputKey ?? null,
    updatedAt,
    id,
  ).run();

  return { id, ...patch, updatedAt };
}

export async function readCreativeRunDetail(runId) {
  const { env, isCloudflare } = getCreativeEnv();
  const db = env.CREATIVE_DB;

  if (!db) {
    if (isCloudflare) throw new Error('CREATIVE_DB binding is not configured');
    return null;
  }

  const [run, jobsResult] = await Promise.all([
    db.prepare('SELECT * FROM creative_runs WHERE id = ?').bind(runId).first(),
    db.prepare(`
      SELECT *
      FROM creative_jobs
      WHERE run_id = ? AND kind = 'render'
      ORDER BY created_at DESC
      LIMIT 1
    `).bind(runId).all(),
  ]);

  if (!run) return null;

  const renderJob = (jobsResult.results ?? [])
    .map(rowToCreativeJob)
    .find((job) => job.kind === 'render') ?? null;

  return {
    run: rowToCreativeRun(run),
    scriptArtifactKey: run.output_key ?? null,
    renderJob,
  };
}

export async function readCreativeJobById(jobId) {
  const { env, isCloudflare } = getCreativeEnv();
  const db = env.CREATIVE_DB;

  if (!db) {
    if (isCloudflare) throw new Error('CREATIVE_DB binding is not configured');
    return null;
  }

  const row = await db.prepare('SELECT * FROM creative_jobs WHERE id = ?').bind(jobId).first();
  return row ? rowToCreativeJob(row) : null;
}

export async function createCreativeRenderJob({ runId, scriptArtifactKey }) {
  const { env, isCloudflare } = getCreativeEnv();
  const db = env.CREATIVE_DB;
  const now = new Date().toISOString();

  if (!db) {
    if (isCloudflare) throw new Error('CREATIVE_DB binding is not configured');
    return { job: memoryRenderJob(runId, scriptArtifactKey, now), previousFailedAttempts: 0 };
  }

  const failedAttemptsResult = await db.prepare(`
    SELECT COUNT(*) AS count
    FROM creative_jobs
    WHERE run_id = ? AND kind = 'render' AND status = 'failed'
  `).bind(runId).first();
  const failedAttempts = Number(failedAttemptsResult?.count ?? 0);

  const job = {
    id: crypto.randomUUID(),
    runId,
    kind: 'render',
    status: 'created',
    provider: 'aws-remotion',
    r2Key: null,
    metadata: {
      scriptArtifactKey,
      attempt: failedAttempts + 1,
    },
    createdAt: now,
    updatedAt: now,
  };

  const insertResult = await db.prepare(`
    INSERT INTO creative_jobs (
      id, run_id, kind, status, provider, r2_key, metadata_json, created_at, updated_at
    )
    SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?
    WHERE NOT EXISTS (
      SELECT 1
      FROM creative_jobs
      WHERE run_id = ?
        AND kind = 'render'
        AND status IN ('created', 'triggering', 'rendering', 'succeeded')
    )
    AND (
      SELECT COUNT(*)
      FROM creative_jobs
      WHERE run_id = ?
        AND kind = 'render'
        AND status = 'failed'
    ) <= 1
  `).bind(
    job.id,
    runId,
    job.kind,
    job.status,
    job.provider,
    job.r2Key,
    JSON.stringify(job.metadata),
    job.createdAt,
    job.updatedAt,
    runId,
    runId,
  ).run();

  const changes = insertResult.changes ?? insertResult.meta?.changes ?? 0;
  if (changes === 0) {
    const jobsResult = await db.prepare(`
      SELECT *
      FROM creative_jobs
      WHERE run_id = ? AND kind = 'render'
      ORDER BY created_at DESC
    `).bind(runId).all();
    const jobs = (jobsResult.results ?? []).map(rowToCreativeJob);
    const blockingJob = jobs.find((item) => ['created', 'triggering', 'rendering', 'succeeded'].includes(item.status));

    return {
      conflict: true,
      reason: blockingJob ? 'RENDER_ALREADY_EXISTS' : 'RENDER_RETRY_LIMIT_REACHED',
      job: blockingJob ?? jobs[0] ?? null,
    };
  }

  return {
    job,
    previousFailedAttempts: failedAttempts,
  };
}

export async function updateCreativeJob(id, patch = {}) {
  const { env, isCloudflare } = getCreativeEnv();
  const db = env.CREATIVE_DB;
  const updatedAt = new Date().toISOString();

  if (!db) {
    if (isCloudflare) throw new Error('CREATIVE_DB binding is not configured');
    return { id, ...patch, updatedAt };
  }

  const metadataJson = patch.metadata === undefined ? undefined : JSON.stringify(patch.metadata ?? null);

  await db.prepare(`
    UPDATE creative_jobs
    SET
      status = COALESCE(?, status),
      provider = COALESCE(?, provider),
      r2_key = COALESCE(?, r2_key),
      metadata_json = COALESCE(?, metadata_json),
      updated_at = ?
    WHERE id = ?
  `).bind(
    patch.status ?? null,
    patch.provider ?? null,
    patch.r2Key ?? null,
    metadataJson ?? null,
    updatedAt,
    id,
  ).run();

  return { id, ...patch, updatedAt };
}

export async function incrementDailyUsage(event) {
  const { env, isCloudflare } = getCreativeEnv();
  const db = env.CREATIVE_DB;

  if (!db) {
    if (isCloudflare) throw new Error('CREATIVE_DB binding is not configured');
    return null;
  }

  const date = event.createdAt.slice(0, 10);
  const increments = dailyIncrements(event);

  await db.prepare(`
    INSERT INTO creative_daily_usage (
      date, requests, cache_hits, blocked, failed, estimated_cost_usd,
      actual_cost_usd, failed_cost_usd, tts_chars, image_generations,
      renders, final_videos, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    ON CONFLICT(date) DO UPDATE SET
      requests = requests + excluded.requests,
      cache_hits = cache_hits + excluded.cache_hits,
      blocked = blocked + excluded.blocked,
      failed = failed + excluded.failed,
      estimated_cost_usd = estimated_cost_usd + excluded.estimated_cost_usd,
      actual_cost_usd = actual_cost_usd + excluded.actual_cost_usd,
      failed_cost_usd = failed_cost_usd + excluded.failed_cost_usd,
      tts_chars = tts_chars + excluded.tts_chars,
      image_generations = image_generations + excluded.image_generations,
      renders = renders + excluded.renders,
      final_videos = final_videos + excluded.final_videos,
      updated_at = datetime('now')
  `).bind(
    date,
    increments.requests,
    increments.cacheHits,
    increments.blocked,
    increments.failed,
    increments.estimatedCostUsd,
    increments.actualCostUsd,
    increments.failedCostUsd,
    increments.ttsChars,
    increments.imageGenerations,
    increments.renders,
    increments.finalVideos,
  ).run();

  return increments;
}

export function getCreativeEnv() {
  try {
    return { env: getRequestContext().env, isCloudflare: true };
  } catch {
    return { env: process.env, isCloudflare: false };
  }
}

function normalizeUsageEvent(event) {
  return {
    ...event,
    id: event.id ?? crypto.randomUUID(),
    createdAt: event.createdAt ?? new Date().toISOString(),
    operationType: event.operationType ?? 'script_generation',
    status: event.status ?? 'generated',
  };
}

function normalizeCreativeRun(run) {
  const now = new Date().toISOString();
  return {
    id: run.id ?? crypto.randomUUID(),
    status: run.status ?? 'created',
    mode: run.mode ?? 'draft',
    mock: run.mock !== false,
    inputJson: typeof run.inputJson === 'string' ? run.inputJson : JSON.stringify(run.input ?? {}),
    outputKey: run.outputKey,
    createdAt: run.createdAt ?? now,
    updatedAt: run.updatedAt ?? now,
  };
}

function rowToCreativeRun(row) {
  return {
    id: row.id,
    status: row.status,
    mode: row.mode,
    mock: Boolean(row.mock),
    inputJson: row.input_json ?? undefined,
    outputKey: row.output_key ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function rowToCreativeJob(row) {
  return {
    id: row.id,
    runId: row.run_id ?? undefined,
    kind: row.kind,
    status: row.status,
    provider: row.provider ?? undefined,
    r2Key: row.r2_key ?? undefined,
    metadata: parseMetadata(row.metadata_json),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function memoryRenderJob(runId, scriptArtifactKey, now) {
  return {
    id: crypto.randomUUID(),
    runId,
    kind: 'render',
    status: 'created',
    provider: 'aws-remotion',
    r2Key: null,
    metadata: { scriptArtifactKey, attempt: 1 },
    createdAt: now,
    updatedAt: now,
  };
}

function parseMetadata(value) {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function dailyIncrements(event) {
  const actual = event.actualCostUsd ?? 0;
  const estimated = event.estimatedCostUsd ?? 0;
  const failedCost = event.status === 'failed' ? actual || estimated : 0;

  return {
    requests: 1,
    cacheHits: event.status === 'cached' ? 1 : 0,
    blocked: event.status === 'blocked' ? 1 : 0,
    failed: event.status === 'failed' ? 1 : 0,
    estimatedCostUsd: estimated,
    actualCostUsd: actual,
    failedCostUsd: failedCost,
    ttsChars: event.characters ?? 0,
    imageGenerations: event.imageCount ?? 0,
    renders: event.operationType === 'render' ? 1 : 0,
    finalVideos: event.provider === 'aws-remotion' && event.operationType === 'render' && event.status === 'completed' ? 1 : 0,
  };
}

function buildDailySummary(date, daily, events) {
  const totals = {
    requests: daily?.requests ?? events.length,
    cacheHits: daily?.cache_hits ?? events.filter((event) => event.status === 'cached').length,
    blocked: daily?.blocked ?? events.filter((event) => event.status === 'blocked').length,
    failed: daily?.failed ?? events.filter((event) => event.status === 'failed').length,
    estimatedCostUsd: roundUsd(daily?.estimated_cost_usd ?? sum(events, 'estimatedCostUsd')),
    actualCostUsd: roundUsd(daily?.actual_cost_usd ?? sum(events, 'actualCostUsd')),
    failedCostUsd: roundUsd(daily?.failed_cost_usd ?? events
      .filter((event) => event.status === 'failed')
      .reduce((total, event) => total + (event.actualCostUsd ?? event.estimatedCostUsd ?? 0), 0)),
    ttsChars: daily?.tts_chars ?? sum(events, 'characters'),
    imageGenerations: daily?.image_generations ?? sum(events, 'imageCount'),
    renders: daily?.renders ?? events.filter((event) => event.operationType === 'render').length,
    finalVideos: daily?.final_videos ?? events.filter((event) => event.provider === 'aws-remotion' && event.status === 'completed').length,
    averageCostPerFinalVideoUsd: 0,
  };
  totals.averageCostPerFinalVideoUsd = totals.finalVideos > 0 ? roundUsd(totals.actualCostUsd / totals.finalVideos) : 0;

  return {
    date,
    currency: 'USD',
    totals,
    byProvider: groupCost(events, 'provider'),
    byRun: groupCost(events, 'runId'),
    byAsset: groupCost(events, 'assetId'),
    events,
  };
}

function rowToUsageRecord(row) {
  return {
    id: row.id,
    createdAt: row.created_at,
    runId: row.run_id ?? undefined,
    jobId: row.job_id ?? undefined,
    assetId: row.asset_id ?? undefined,
    provider: row.provider,
    model: row.model ?? undefined,
    operationType: row.operation_type,
    status: row.status,
    estimatedCostUsd: row.estimated_cost_usd ?? undefined,
    actualCostUsd: row.actual_cost_usd ?? undefined,
    inputTokens: row.input_tokens ?? undefined,
    outputTokens: row.output_tokens ?? undefined,
    cachedInputTokens: row.cached_input_tokens ?? undefined,
    characters: row.characters ?? undefined,
    imageCount: row.image_count ?? undefined,
    videoSeconds: row.video_seconds ?? undefined,
    lambdaDurationMs: row.lambda_duration_ms ?? undefined,
    memoryMb: row.memory_mb ?? undefined,
    storageBytes: row.storage_bytes ?? undefined,
    promptHash: row.prompt_hash ?? undefined,
    reason: row.reason ?? undefined,
  };
}

function groupCost(events, key) {
  return events.reduce((grouped, event) => {
    const groupKey = event[key];
    if (!groupKey) return grouped;
    grouped[groupKey] = roundUsd((grouped[groupKey] ?? 0) + (event.actualCostUsd ?? 0));
    return grouped;
  }, {});
}

function sum(events, key) {
  return events.reduce((total, event) => total + (event[key] ?? 0), 0);
}

function roundUsd(value) {
  return Math.round(Math.max(0, Number(value) || 0) * 100000) / 100000;
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function readMemoryDailyUsage(date) {
  return buildDailySummary(date, null, getMemoryEvents(date));
}

function getMemoryEvents(date) {
  globalThis.__HI_OB_CREATIVE_USAGE__ ??= {};
  globalThis.__HI_OB_CREATIVE_USAGE__[date] ??= [];
  return globalThis.__HI_OB_CREATIVE_USAGE__[date];
}
