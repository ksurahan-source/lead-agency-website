import { getCreativeEnv, readDailyUsage, writeUsageEvent } from '@/lib/creativeUsageStore';

const OPENAI_PRICING = {
  'gpt-5.4-mini': { input: 0.25, output: 2, cachedInput: 0.025 },
  'gpt-5.4': { input: 2, output: 8, cachedInput: 0.5 },
  'gpt-4o-mini': { input: 0.15, output: 0.6, cachedInput: 0.075 },
  'gpt-4o': { input: 2.5, output: 10, cachedInput: 1.25 },
};

const FALLBACK_PRICING = { input: 0.5, output: 2, cachedInput: 0.125 };
const REQUIRED_REAL_GENERATION_ENV = [
  'OPENAI_API_KEY',
  'DAILY_COST_LIMIT_USD',
  'MAX_COST_PER_RUN_USD',
  'MAX_COST_PER_ASSET_USD',
];

export class CreativeCostGuardError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = 'CreativeCostGuardError';
    this.status = 402;
    this.code = 'CREATIVE_COST_GUARD_BLOCKED';
    this.details = details;
  }
}

export function getRealGenerationConfig() {
  const { env } = getCreativeEnv();
  const missing = REQUIRED_REAL_GENERATION_ENV.filter((key) => {
    if (key === 'OPENAI_API_KEY') return !readStringEnv(env, key);
    return readPositiveEnvNumber(env, key) === undefined;
  });

  if (missing.length) {
    return {
      ok: false,
      missing,
      env,
    };
  }

  return {
    ok: true,
    env,
    apiKey: readStringEnv(env, 'OPENAI_API_KEY'),
    model: getOpenAiModel(env, 'cheap'),
    maxOutputTokens: getMaxOutputTokens(env),
    limits: {
      dailyCostLimitUsd: readPositiveEnvNumber(env, 'DAILY_COST_LIMIT_USD'),
      maxCostPerRunUsd: readPositiveEnvNumber(env, 'MAX_COST_PER_RUN_USD'),
      maxCostPerAssetUsd: readPositiveEnvNumber(env, 'MAX_COST_PER_ASSET_USD'),
    },
  };
}

export function getOpenAiModel(env, tier = 'cheap') {
  if (tier === 'premium') return readStringEnv(env, 'OPENAI_PREMIUM_MODEL') || 'gpt-4o';
  return readStringEnv(env, 'OPENAI_CHEAP_MODEL') || 'gpt-4o-mini';
}

export function getMaxOutputTokens(env) {
  const configured = readPositiveEnvNumber(env, 'MAX_OUTPUT_TOKENS_PER_REQUEST');
  return configured ? Math.floor(configured) : 2200;
}

export function estimateOpenAiScriptCost({ model, input, outputTokens }) {
  const { env } = getCreativeEnv();
  const pricing = OPENAI_PRICING[model] ?? FALLBACK_PRICING;
  const inputTokens = estimateTextTokens(input);
  const totalUsd = roundUsd(
    ((inputTokens / 1_000_000) * pricing.input + ((outputTokens ?? 2200) / 1_000_000) * pricing.output) *
      (1 + getSafetyBufferPct(env) / 100),
  );

  return {
    currency: 'USD',
    model,
    inputTokens,
    outputTokens: outputTokens ?? 2200,
    estimatedCostUsd: totalUsd,
  };
}

export async function enforceCreativeCostGuard({ estimatedCostUsd, runId, assetId }) {
  const config = getRealGenerationConfig();
  if (!config.ok) {
    throw new CreativeCostGuardError('Real OpenAI generation is not configured.', {
      missingEnv: config.missing,
    });
  }

  const usage = await readDailyUsage();
  const { dailyCostLimitUsd, maxCostPerRunUsd, maxCostPerAssetUsd } = config.limits;
  const projectedDailyCostUsd = roundUsd((usage.totals?.actualCostUsd ?? 0) + estimatedCostUsd);
  const reasons = [];

  if (dailyCostLimitUsd !== undefined && projectedDailyCostUsd > dailyCostLimitUsd) {
    reasons.push(`DAILY_COST_LIMIT_USD would exceed ${dailyCostLimitUsd}`);
  }
  if (maxCostPerRunUsd !== undefined && estimatedCostUsd > maxCostPerRunUsd) {
    reasons.push(`MAX_COST_PER_RUN_USD would exceed ${maxCostPerRunUsd}`);
  }
  if (maxCostPerAssetUsd !== undefined && estimatedCostUsd > maxCostPerAssetUsd) {
    reasons.push(`MAX_COST_PER_ASSET_USD would exceed ${maxCostPerAssetUsd}`);
  }

  if (reasons.length) {
    await writeUsageEvent({
      runId,
      assetId,
      provider: 'openai',
      model: config.model,
      operationType: 'script_generation',
      status: 'blocked',
      estimatedCostUsd,
      actualCostUsd: 0,
      reason: reasons.join('; '),
    });

    throw new CreativeCostGuardError(reasons.join('; '), {
      projectedDailyCostUsd,
      dailyCostLimitUsd,
      maxCostPerRunUsd,
      maxCostPerAssetUsd,
    });
  }

  return {
    projectedDailyCostUsd,
    limits: config.limits,
  };
}

function readStringEnv(env, key) {
  const value = env?.[key];
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function readPositiveEnvNumber(env, key) {
  const value = Number(env?.[key]);
  return Number.isFinite(value) && value > 0 ? value : undefined;
}

function estimateTextTokens(text) {
  return Math.ceil(String(text || '').length / 4);
}

function getSafetyBufferPct(env) {
  const value = Number(env?.COST_SAFETY_BUFFER_PCT ?? process.env.COST_SAFETY_BUFFER_PCT);
  return Number.isFinite(value) && value >= 0 ? value : 15;
}

function roundUsd(value) {
  return Math.round(Math.max(0, Number(value) || 0) * 100000) / 100000;
}
