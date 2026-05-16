import { randomUUID } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { applySafetyBuffer, getOpenAiPricing, PRICING_CONFIG, roundUsd, type PricingProvider } from './pricing';

export type OperationType =
  | 'script_generation'
  | 'premium_copy'
  | 'tts_generation'
  | 'music_generation'
  | 'image_generation'
  | 'video_generation'
  | 'render'
  | 's3_output'
  | 'cache_hit'
  | 'budget_check';

export type CostStatus = 'estimated' | 'allowed' | 'generated' | 'cached' | 'blocked' | 'failed' | 'completed';

export interface ProviderUsageEvent {
  runId?: string;
  jobId?: string;
  assetId?: string;
  provider: PricingProvider | 'aws-remotion';
  model?: string;
  operationType: OperationType;
  estimatedCostUsd?: number;
  actualCostUsd?: number;
  inputTokens?: number;
  outputTokens?: number;
  cachedInputTokens?: number;
  characters?: number;
  imageCount?: number;
  videoSeconds?: number;
  lambdaDurationMs?: number;
  memoryMb?: number;
  storageBytes?: number;
  status: CostStatus;
  promptHash?: string;
  reason?: string;
}

export interface ProviderUsageRecord extends ProviderUsageEvent {
  id: string;
  createdAt: string;
}

export interface CostEstimate {
  currency: 'USD';
  totalUsd: number;
  safetyBufferPct: number;
  lineItems: Array<{
    provider: string;
    operationType: OperationType;
    label: string;
    estimatedUsd: number;
  }>;
}

export interface AssetCostInput {
  provider: PricingProvider | 'aws-remotion';
  model?: string;
  operationType?: OperationType;
  inputTokens?: number;
  outputTokens?: number;
  cachedInputTokens?: number;
  characters?: number;
  imageCount?: number;
  videoSeconds?: number;
  lambdaDurationMs?: number;
  memoryMb?: number;
  storageBytes?: number;
  includeSafetyBuffer?: boolean;
}

export interface RunCostInput extends Omit<AssetCostInput, 'provider'> {
  provider?: AssetCostInput['provider'];
  renderCount?: number;
  selectedDraftCount?: number;
  assets?: AssetCostInput[];
}

export interface DailyCostSummary {
  date: string;
  currency: 'USD';
  totals: {
    requests: number;
    cacheHits: number;
    blocked: number;
    failed: number;
    estimatedCostUsd: number;
    actualCostUsd: number;
    failedCostUsd: number;
    ttsChars: number;
    imageGenerations: number;
    renders: number;
    finalVideos: number;
    averageCostPerFinalVideoUsd: number;
  };
  byProvider: Record<string, number>;
  byRun: Record<string, number>;
  byAsset: Record<string, number>;
  events: ProviderUsageRecord[];
}

const USAGE_DIR = path.join(process.cwd(), '.data', 'usage', 'daily');

export function estimateAssetCost(input: AssetCostInput): CostEstimate {
  const includeSafetyBuffer = input.includeSafetyBuffer !== false;
  const lineItems: CostEstimate['lineItems'] = [];

  if (input.provider === 'openai') {
    const pricing = getOpenAiPricing(input.model ?? '');
    const cachedInputTokens = input.cachedInputTokens ?? 0;
    const billableInputTokens = Math.max(0, (input.inputTokens ?? 0) - cachedInputTokens);
    const inputCost = (billableInputTokens / 1_000_000) * pricing.inputPerMillionTokensUsd;
    const cachedCost = (cachedInputTokens / 1_000_000) * pricing.cachedInputPerMillionTokensUsd;
    const outputCost = ((input.outputTokens ?? 0) / 1_000_000) * pricing.outputPerMillionTokensUsd;

    lineItems.push({
      provider: 'openai',
      operationType: input.operationType ?? 'script_generation',
      label: `OpenAI ${input.model ?? 'model'} tokens`,
      estimatedUsd: roundUsd(inputCost + cachedCost + outputCost),
    });
  }

  if (input.provider === 'elevenlabs') {
    const operationType = input.operationType ?? 'tts_generation';
    const cost = operationType === 'music_generation'
      ? PRICING_CONFIG.elevenlabs.musicGenerationEstimateUsd
      : ((input.characters ?? 0) / 1000) * PRICING_CONFIG.elevenlabs.estimatePerThousandCharactersUsd;

    lineItems.push({
      provider: 'elevenlabs',
      operationType,
      label: operationType === 'music_generation' ? 'ElevenLabs music' : 'ElevenLabs TTS characters',
      estimatedUsd: roundUsd(cost),
    });
  }

  if (input.provider === 'piapi') {
    const imageCost = (input.imageCount ?? 0) * PRICING_CONFIG.piapi.imageGenerationEstimateUsd;
    const videoCost = (input.videoSeconds ?? 0) * PRICING_CONFIG.piapi.videoGenerationPerSecondUsd;
    if (imageCost > 0) {
      lineItems.push({
        provider: 'piapi',
        operationType: 'image_generation',
        label: 'PiAPI image generation',
        estimatedUsd: roundUsd(imageCost),
      });
    }
    if (videoCost > 0) {
      lineItems.push({
        provider: 'piapi',
        operationType: 'video_generation',
        label: 'PiAPI video generation',
        estimatedUsd: roundUsd(videoCost),
      });
    }
  }

  if (input.provider === 'aws-remotion') {
    const durationMs = input.lambdaDurationMs ?? PRICING_CONFIG.awsRemotion.defaultDurationMs;
    const memoryMb = input.memoryMb ?? PRICING_CONFIG.awsRemotion.defaultMemoryMb;
    const gbSeconds = (durationMs / 1000) * (memoryMb / 1024);
    const lambdaCost = Math.max(
      PRICING_CONFIG.awsRemotion.defaultRenderEstimateUsd,
      gbSeconds * PRICING_CONFIG.awsRemotion.lambdaGbSecondUsd + PRICING_CONFIG.awsRemotion.requestUsd,
    );

    lineItems.push({
      provider: 'aws-remotion',
      operationType: 'render',
      label: 'AWS Remotion Lambda render',
      estimatedUsd: roundUsd(lambdaCost),
    });
  }

  if (input.provider === 's3' || input.storageBytes) {
    const gb = (input.storageBytes ?? 0) / 1024 / 1024 / 1024;
    const storageCost = gb * PRICING_CONFIG.s3.storagePerGbMonthUsd;
    const transferCost = gb * PRICING_CONFIG.s3.outputTransferPerGbUsd;
    const cost = storageCost + transferCost + PRICING_CONFIG.s3.putRequestUsd;

    lineItems.push({
      provider: 's3',
      operationType: 's3_output',
      label: 'S3 storage/output',
      estimatedUsd: roundUsd(cost),
    });
  }

  const rawTotal = lineItems.reduce((sum, item) => sum + item.estimatedUsd, 0);
  return {
    currency: 'USD',
    totalUsd: applySafetyBuffer(rawTotal, includeSafetyBuffer),
    safetyBufferPct: includeSafetyBuffer ? PRICING_CONFIG.safetyBufferPct : 0,
    lineItems,
  };
}

export function estimateRunCost(input: RunCostInput): CostEstimate {
  const assets = input.assets ?? [
    input.provider ? input : undefined,
    input.characters ? { provider: 'elevenlabs' as const, characters: input.characters } : undefined,
    input.imageCount || input.videoSeconds
      ? { provider: 'piapi' as const, imageCount: input.imageCount, videoSeconds: input.videoSeconds }
      : undefined,
    input.renderCount
      ? {
          provider: 'aws-remotion' as const,
          lambdaDurationMs: input.lambdaDurationMs,
          memoryMb: input.memoryMb,
          includeSafetyBuffer: false,
        }
      : undefined,
    input.storageBytes ? { provider: 's3' as const, storageBytes: input.storageBytes } : undefined,
  ].filter((asset): asset is AssetCostInput => Boolean(asset));

  const lineItems = assets.flatMap((asset) => estimateAssetCost(asset).lineItems);
  const rawTotal = lineItems.reduce((sum, item) => sum + item.estimatedUsd, 0);

  return {
    currency: 'USD',
    totalUsd: applySafetyBuffer(rawTotal, input.includeSafetyBuffer !== false),
    safetyBufferPct: input.includeSafetyBuffer === false ? 0 : PRICING_CONFIG.safetyBufferPct,
    lineItems,
  };
}

export async function recordProviderUsage(event: ProviderUsageEvent) {
  const date = todayKey();
  const summary = await getDailyCostSummary(date);
  const record: ProviderUsageRecord = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...event,
  };
  const nextEvents = [...summary.events, record].slice(-5000);
  const nextSummary = buildDailySummary(date, nextEvents);

  await writeJson(usageFile(date), nextSummary);
  console.info('[cost-meter]', record);
  return record;
}

export async function getDailyCostSummary(date = todayKey()): Promise<DailyCostSummary> {
  const existing = await readJson<Partial<DailyCostSummary> & { events?: Array<ProviderUsageRecord | LegacyUsageEvent> }>(
    usageFile(date),
  );
  if (!existing?.events) return buildDailySummary(date, []);

  return buildDailySummary(date, existing.events.map(normalizeUsageRecord));
}

export async function getRunCostBreakdown(runId: string) {
  const summary = await getDailyCostSummary();
  const events = summary.events.filter((event) => event.runId === runId);
  return {
    runId,
    estimatedCostUsd: roundUsd(events.reduce((sum, event) => sum + (event.estimatedCostUsd ?? 0), 0)),
    actualCostUsd: roundUsd(events.reduce((sum, event) => sum + (event.actualCostUsd ?? 0), 0)),
    events,
  };
}

function buildDailySummary(date: string, events: ProviderUsageRecord[]): DailyCostSummary {
  const byProvider: Record<string, number> = {};
  const byRun: Record<string, number> = {};
  const byAsset: Record<string, number> = {};

  for (const event of events) {
    const actual = event.actualCostUsd ?? 0;
    byProvider[event.provider] = roundUsd((byProvider[event.provider] ?? 0) + actual);
    if (event.runId) byRun[event.runId] = roundUsd((byRun[event.runId] ?? 0) + actual);
    if (event.assetId) byAsset[event.assetId] = roundUsd((byAsset[event.assetId] ?? 0) + actual);
  }

  const finalVideos = events.filter(
    (event) => event.provider === 'aws-remotion' && event.operationType === 'render' && event.status === 'completed',
  ).length;
  const actualCostUsd = roundUsd(events.reduce((sum, event) => sum + (event.actualCostUsd ?? 0), 0));

  return {
    date,
    currency: 'USD',
    totals: {
      requests: events.length,
      cacheHits: events.filter((event) => event.status === 'cached').length,
      blocked: events.filter((event) => event.status === 'blocked').length,
      failed: events.filter((event) => event.status === 'failed').length,
      estimatedCostUsd: roundUsd(events.reduce((sum, event) => sum + (event.estimatedCostUsd ?? 0), 0)),
      actualCostUsd,
      failedCostUsd: roundUsd(
        events
          .filter((event) => event.status === 'failed')
          .reduce((sum, event) => sum + (event.actualCostUsd ?? event.estimatedCostUsd ?? 0), 0),
      ),
      ttsChars: events.reduce((sum, event) => sum + (event.characters ?? 0), 0),
      imageGenerations: events.reduce((sum, event) => sum + (event.imageCount ?? 0), 0),
      renders: events.reduce((sum, event) => sum + (event.operationType === 'render' ? 1 : 0), 0),
      finalVideos,
      averageCostPerFinalVideoUsd: finalVideos > 0 ? roundUsd(actualCostUsd / finalVideos) : 0,
    },
    byProvider,
    byRun,
    byAsset,
    events,
  };
}

interface LegacyUsageEvent {
  id?: string;
  ts?: string;
  provider: ProviderUsageEvent['provider'];
  action?: string;
  status?: ProviderUsageEvent['status'];
  model?: string;
  assetId?: string;
  promptHash?: string;
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
  durationMs?: number;
  estimatedCostUsd?: number;
  actualCostUsd?: number;
  ttsChars?: number;
  imageGenerations?: number;
  renders?: number;
  reason?: string;
}

function normalizeUsageRecord(event: ProviderUsageRecord | LegacyUsageEvent): ProviderUsageRecord {
  if ('createdAt' in event && event.createdAt) return event as ProviderUsageRecord;
  const legacy = event as LegacyUsageEvent;

  return {
    id: legacy.id ?? randomUUID(),
    createdAt: legacy.ts ?? new Date().toISOString(),
    provider: legacy.provider,
    operationType: normalizeOperationType(legacy.action),
    status: legacy.status ?? 'generated',
    model: legacy.model,
    assetId: legacy.assetId,
    promptHash: legacy.promptHash,
    inputTokens: legacy.inputTokens,
    outputTokens: legacy.outputTokens,
    estimatedCostUsd: legacy.estimatedCostUsd,
    actualCostUsd: legacy.actualCostUsd,
    characters: legacy.ttsChars,
    imageCount: legacy.imageGenerations,
    lambdaDurationMs: legacy.durationMs,
    reason: legacy.reason,
  };
}

function normalizeOperationType(action?: string): OperationType {
  if (action?.includes('tts')) return 'tts_generation';
  if (action?.includes('music')) return 'music_generation';
  if (action?.includes('image')) return 'image_generation';
  if (action?.includes('render')) return 'render';
  if (action?.includes('cache')) return 'cache_hit';
  if (action?.includes('budget')) return 'budget_check';
  return 'script_generation';
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function usageFile(date: string) {
  return path.join(USAGE_DIR, `${date}.json`);
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
