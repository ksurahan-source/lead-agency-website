export type PricingProvider = 'openai' | 'elevenlabs' | 'piapi' | 'aws-remotion' | 's3';

export interface OpenAiModelPricing {
  inputPerMillionTokensUsd: number;
  outputPerMillionTokensUsd: number;
  cachedInputPerMillionTokensUsd: number;
}

export const PRICING_CONFIG = {
  currency: 'USD',
  safetyBufferPct: readPercentEnv('COST_SAFETY_BUFFER_PCT', 15),
  openai: {
    fallback: {
      inputPerMillionTokensUsd: 0.5,
      outputPerMillionTokensUsd: 2,
      cachedInputPerMillionTokensUsd: 0.125,
    },
    models: {
      'gpt-5.4-mini': {
        inputPerMillionTokensUsd: 0.25,
        outputPerMillionTokensUsd: 2,
        cachedInputPerMillionTokensUsd: 0.025,
      },
      'gpt-5.4': {
        inputPerMillionTokensUsd: 2,
        outputPerMillionTokensUsd: 8,
        cachedInputPerMillionTokensUsd: 0.5,
      },
      'gpt-4o-mini': {
        inputPerMillionTokensUsd: 0.15,
        outputPerMillionTokensUsd: 0.6,
        cachedInputPerMillionTokensUsd: 0.075,
      },
      'gpt-4o': {
        inputPerMillionTokensUsd: 2.5,
        outputPerMillionTokensUsd: 10,
        cachedInputPerMillionTokensUsd: 1.25,
      },
    } satisfies Record<string, OpenAiModelPricing>,
  },
  elevenlabs: {
    estimatePerThousandCharactersUsd: readNumberEnv('ELEVENLABS_ESTIMATE_PER_1K_CHARS_USD', 0.18),
    musicGenerationEstimateUsd: readNumberEnv('ELEVENLABS_MUSIC_ESTIMATE_USD', 0.03),
  },
  piapi: {
    imageGenerationEstimateUsd: readNumberEnv('PIAPI_IMAGE_ESTIMATE_USD', 0.06),
    videoGenerationPerSecondUsd: readNumberEnv('PIAPI_VIDEO_SECOND_ESTIMATE_USD', 0.12),
  },
  awsRemotion: {
    lambdaGbSecondUsd: readNumberEnv('AWS_LAMBDA_GB_SECOND_USD', 0.0000166667),
    requestUsd: readNumberEnv('AWS_LAMBDA_REQUEST_USD', 0.0000002),
    defaultMemoryMb: readNumberEnv('REMOTION_LAMBDA_MEMORY_MB', 2048),
    defaultDurationMs: readNumberEnv('REMOTION_ESTIMATED_DURATION_MS', 120000),
    defaultRenderEstimateUsd: readNumberEnv('REMOTION_DEFAULT_RENDER_ESTIMATE_USD', 0.14),
  },
  s3: {
    storagePerGbMonthUsd: readNumberEnv('S3_STORAGE_GB_MONTH_USD', 0.023),
    putRequestUsd: readNumberEnv('S3_PUT_REQUEST_USD', 0.000005),
    outputTransferPerGbUsd: readNumberEnv('S3_OUTPUT_TRANSFER_GB_USD', 0.09),
  },
} as const;

export function getOpenAiPricing(model: string): OpenAiModelPricing {
  return PRICING_CONFIG.openai.models[model as keyof typeof PRICING_CONFIG.openai.models] ?? PRICING_CONFIG.openai.fallback;
}

export function applySafetyBuffer(costUsd: number, includeBuffer = true) {
  if (!includeBuffer) return roundUsd(costUsd);
  return roundUsd(costUsd * (1 + PRICING_CONFIG.safetyBufferPct / 100));
}

export function roundUsd(value: number) {
  return Math.round(Math.max(0, value) * 100000) / 100000;
}

function readNumberEnv(key: string, fallback: number) {
  const value = Number(process.env[key]);
  return Number.isFinite(value) && value >= 0 ? value : fallback;
}

function readPercentEnv(key: string, fallback: number) {
  const value = Number(process.env[key]);
  return Number.isFinite(value) && value >= 0 ? value : fallback;
}
