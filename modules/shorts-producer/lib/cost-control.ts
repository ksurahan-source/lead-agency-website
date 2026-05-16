import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

import {
  estimateAssetCost,
  estimateRunCost,
  getDailyCostSummary,
  recordProviderUsage,
  type DailyCostSummary,
  type OperationType,
} from '@/lib/cost-meter';

export type CostMode = 'draft' | 'final';
export type CostProvider = 'openai' | 'elevenlabs' | 'piapi' | 'aws-remotion';
export type CacheKind = 'script' | 'tts' | 'image' | 'render';
export type ModelTier = 'cheap' | 'premium';

export interface CachedArtifact<T> {
  schemaVersion: 1;
  kind: CacheKind;
  promptHash: string;
  createdAt: string;
  updatedAt: string;
  hitCount: number;
  lastHitAt?: string;
  provider?: CostProvider;
  model?: string;
  artifact: T;
}

export interface UsageEvent {
  id: string;
  ts: string;
  provider: CostProvider;
  action: string;
  operationType?: OperationType;
  runId?: string;
  jobId?: string;
  status: 'allowed' | 'generated' | 'cached' | 'blocked' | 'failed';
  model?: string;
  assetId?: string;
  promptHash?: string;
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
  cachedInputTokens?: number;
  durationMs?: number;
  estimatedCostUsd?: number;
  actualCostUsd?: number;
  ttsChars?: number;
  imageGenerations?: number;
  renders?: number;
  videoSeconds?: number;
  lambdaDurationMs?: number;
  memoryMb?: number;
  storageBytes?: number;
  reason?: string;
}

export type DailyUsageSummary = DailyCostSummary;

export class CostGuardError extends Error {
  readonly status = 402;
  readonly code = 'COST_GUARD_BLOCKED';

  constructor(message: string, readonly details: Record<string, unknown> = {}) {
    super(message);
    this.name = 'CostGuardError';
  }
}

const DATA_DIR = path.join(process.cwd(), '.data');
const CACHE_DIR = path.join(DATA_DIR, 'cache');

export function normalizeCostMode(input: unknown): CostMode {
  return input === 'final' ? 'final' : 'draft';
}

export function getOpenAiModel(tier: ModelTier) {
  if (tier === 'premium') return process.env.OPENAI_PREMIUM_MODEL?.trim() || 'gpt-5.4';
  return process.env.OPENAI_CHEAP_MODEL?.trim() || 'gpt-5.4-mini';
}

export function getMaxOutputTokens() {
  const configured = Number(process.env.MAX_OUTPUT_TOKENS_PER_REQUEST);
  if (Number.isFinite(configured) && configured > 0) return Math.floor(configured);
  return 1200;
}

export function createPromptHash(input: unknown) {
  return createHash('sha256').update(stableStringify(normalizeForHash(input))).digest('hex');
}

export async function readCachedArtifact<T>(kind: CacheKind, promptHash: string) {
  const record = await readJson<CachedArtifact<T>>(cacheFile(kind, promptHash));
  if (!record) return null;

  const updated: CachedArtifact<T> = {
    ...record,
    hitCount: record.hitCount + 1,
    lastHitAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  await writeJson(cacheFile(kind, promptHash), updated);
  await recordUsageEvent({
    provider: record.provider ?? providerForKind(kind),
    action: `${kind}:cache_hit`,
    status: 'cached',
    model: record.model,
    promptHash,
  });

  return updated.artifact;
}

export async function writeCachedArtifact<T>(
  kind: CacheKind,
  promptHash: string,
  artifact: T,
  meta: { provider?: CostProvider; model?: string } = {},
) {
  const now = new Date().toISOString();
  const existing = await readJson<CachedArtifact<T>>(cacheFile(kind, promptHash));
  const record: CachedArtifact<T> = {
    schemaVersion: 1,
    kind,
    promptHash,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
    hitCount: existing?.hitCount ?? 0,
    lastHitAt: existing?.lastHitAt,
    provider: meta.provider,
    model: meta.model,
    artifact,
  };

  await writeJson(cacheFile(kind, promptHash), record);
  return record;
}

export function requireFinalApproval(input: {
  provider: CostProvider;
  action: string;
  mode?: CostMode;
  approvedFinalRender?: boolean;
}) {
  if (input.mode !== 'final' || input.approvedFinalRender !== true) {
    throw new CostGuardError('Final approval is required before calling paid APIs.', {
      provider: input.provider,
      action: input.action,
      requiredButton: 'Approve Final Render',
      warning: 'This will call paid APIs.',
    });
  }
}

export async function enforceDailyCostGuard(input: {
  provider: CostProvider;
  action: string;
  runId?: string;
  jobId?: string;
  assetId?: string;
  estimatedCostUsd?: number;
  ttsChars?: number;
  imageGenerations?: number;
  renders?: number;
  adminOverride?: boolean;
}) {
  const summary = await readDailyUsageSummary();
  const projectedCost = summary.totals.actualCostUsd + (input.estimatedCostUsd ?? 0);
  const dailyBudget = readPositiveEnvNumber('DAILY_COST_LIMIT_USD') ?? readPositiveEnvNumber('DAILY_API_BUDGET_USD');
  const maxCostPerRun = readPositiveEnvNumber('MAX_COST_PER_RUN_USD');
  const maxCostPerAsset = readPositiveEnvNumber('MAX_COST_PER_ASSET_USD');
  const maxRenders = readPositiveEnvNumber('MAX_RENDERS_PER_DAY');
  const maxTtsChars = readPositiveEnvNumber('MAX_TTS_CHARS_PER_DAY');
  const maxImageGenerations = readPositiveEnvNumber('MAX_IMAGE_GENERATIONS_PER_DAY');

  const reasons: string[] = [];
  if (dailyBudget !== undefined && projectedCost > dailyBudget) {
    reasons.push(`Daily cost limit would exceed $${dailyBudget}`);
  }
  if (maxCostPerRun !== undefined && input.estimatedCostUsd !== undefined && input.estimatedCostUsd > maxCostPerRun) {
    reasons.push(`Max cost per run would exceed $${maxCostPerRun}`);
  }
  if (
    maxCostPerAsset !== undefined &&
    input.estimatedCostUsd !== undefined &&
    input.estimatedCostUsd > maxCostPerAsset
  ) {
    reasons.push(`Max cost per asset would exceed $${maxCostPerAsset}`);
  }
  if (input.renders && maxRenders !== undefined && summary.totals.renders + input.renders > maxRenders) {
    reasons.push(`Daily render limit would exceed ${maxRenders}`);
  }
  if (input.ttsChars && maxTtsChars !== undefined && summary.totals.ttsChars + input.ttsChars > maxTtsChars) {
    reasons.push(`Daily TTS character limit would exceed ${maxTtsChars}`);
  }
  if (
    input.imageGenerations &&
    maxImageGenerations !== undefined &&
    summary.totals.imageGenerations + input.imageGenerations > maxImageGenerations
  ) {
    reasons.push(`Daily image generation limit would exceed ${maxImageGenerations}`);
  }

  if (reasons.length > 0 && !input.adminOverride) {
    await recordUsageEvent({
      provider: input.provider,
      action: input.action,
      runId: input.runId,
      jobId: input.jobId,
      assetId: input.assetId,
      status: 'blocked',
      estimatedCostUsd: input.estimatedCostUsd,
      reason: reasons.join('; '),
    });

    throw new CostGuardError(reasons.join('; '), {
      provider: input.provider,
      action: input.action,
      dailyBudgetUsd: dailyBudget,
      maxCostPerRunUsd: maxCostPerRun,
      maxCostPerAssetUsd: maxCostPerAsset,
      maxRendersPerDay: maxRenders,
      maxTtsCharsPerDay: maxTtsChars,
      maxImageGenerationsPerDay: maxImageGenerations,
      requiresAdminOverride: true,
      overrideFlag: 'adminOverride',
    });
  }

  await recordUsageEvent({
    provider: input.provider,
    action: `${input.action}:allowed`,
    runId: input.runId,
    jobId: input.jobId,
    assetId: input.assetId,
    status: 'allowed',
    estimatedCostUsd: input.estimatedCostUsd,
  });
}

export async function recordUsageEvent(event: Omit<UsageEvent, 'id' | 'ts'>) {
  return recordProviderUsage({
    provider: event.provider,
    operationType: event.operationType ?? operationTypeFromAction(event.action),
    status: event.status,
    runId: event.runId,
    jobId: event.jobId,
    assetId: event.assetId,
    model: event.model,
    promptHash: event.promptHash,
    estimatedCostUsd: event.estimatedCostUsd,
    actualCostUsd: event.actualCostUsd,
    inputTokens: event.inputTokens,
    outputTokens: event.outputTokens,
    cachedInputTokens: event.cachedInputTokens,
    characters: event.ttsChars,
    imageCount: event.imageGenerations,
    videoSeconds: event.videoSeconds,
    lambdaDurationMs: event.lambdaDurationMs ?? event.durationMs,
    memoryMb: event.memoryMb,
    storageBytes: event.storageBytes,
    reason: event.reason,
  });
}

export async function readDailyUsageSummary(): Promise<DailyUsageSummary> {
  return getDailyCostSummary();
}

export function estimateOpenAiCostUsd(model: string, totalTokens: number) {
  return estimateAssetCost({
    provider: 'openai',
    model,
    inputTokens: totalTokens,
  }).totalUsd;
}

export function estimateFinalRenderCost(input: {
  ttsChars?: number;
  imageGenerations?: number;
  renders?: number;
}) {
  return estimateRunCost({
    characters: input.ttsChars,
    imageCount: input.imageGenerations,
    renderCount: input.renders ?? 1,
  });
}

function cacheFile(kind: CacheKind, promptHash: string) {
  return path.join(CACHE_DIR, kind, `${promptHash}.json`);
}

function providerForKind(kind: CacheKind): CostProvider {
  if (kind === 'tts') return 'elevenlabs';
  if (kind === 'image') return 'piapi';
  if (kind === 'render') return 'aws-remotion';
  return 'openai';
}

async function readJson<T>(filePath: string): Promise<T | null> {
  try {
    return JSON.parse(await readFile(filePath, 'utf8')) as T;
  } catch (error: unknown) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') return null;
    throw error;
  }
}

async function writeJson(filePath: string, value: unknown) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function readPositiveEnvNumber(key: string) {
  const value = Number(process.env[key]);
  return Number.isFinite(value) && value > 0 ? value : undefined;
}

function normalizeForHash(input: unknown): unknown {
  if (typeof input === 'string') return input.trim().replace(/\s+/g, ' ');
  if (Array.isArray(input)) return input.map(normalizeForHash);
  if (!input || typeof input !== 'object') return input;

  return Object.fromEntries(
    Object.entries(input as Record<string, unknown>)
      .filter(([key]) => !['createdAt', 'updatedAt', 'requestId', 'jobId', 'runId'].includes(key))
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, value]) => [key, normalizeForHash(value)]),
  );
}

function stableStringify(input: unknown): string {
  return JSON.stringify(input);
}

function operationTypeFromAction(action: string): OperationType {
  if (action.includes('tts')) return 'tts_generation';
  if (action.includes('music')) return 'music_generation';
  if (action.includes('image')) return 'image_generation';
  if (action.includes('render')) return 'render';
  if (action.includes('cache')) return 'cache_hit';
  if (action.includes('budget')) return 'budget_check';
  if (action.includes('premium')) return 'premium_copy';
  return 'script_generation';
}
