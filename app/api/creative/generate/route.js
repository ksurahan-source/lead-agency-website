import { NextResponse } from 'next/server';

import {
  enforceCreativeCostGuard,
  estimateOpenAiScriptCost,
  getRealGenerationConfig,
} from '@/lib/creativeCostGuard';
import { putCreativeArtifact } from '@/lib/creativeArtifacts';
import { updateCreativeRun, writeCreativeRun, writeUsageEvent } from '@/lib/creativeUsageStore';
import { isStudioRequestAuthenticated } from '@/lib/studioAuth';
import { generateShortScript } from '@/modules/shorts-producer/lib/openai';

export const runtime = 'edge';

export async function POST(request) {
  if (!(await isStudioRequestAuthenticated(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await readJsonBody(request);
  if (body?.mock === false) {
    return runRealGeneration(body);
  }

  const brief = body?.brief ?? {};
  const runId = crypto.randomUUID();
  const hooks = buildMockHooks(brief);
  const scripts = buildMockScripts(brief, hooks);
  const concepts = buildMockConcepts(brief);

  await writeUsageEvent({
    runId,
    provider: 'openai',
    model: 'mock-generation-pipeline',
    operationType: 'script_generation',
    status: 'generated',
    estimatedCostUsd: 0,
    actualCostUsd: 0,
    reason: 'mock_generate_no_paid_api',
  });

  // Future paid pipeline connection points:
  // - modules/shorts-producer/lib/openai.ts generateShortScript
  // - modules/shorts-producer/lib/cost-control.ts enforceDailyCostGuard
  // - modules/shorts-producer/lib/assets.ts asset preparation
  return NextResponse.json({
    success: true,
    mock: true,
    runId,
    concepts,
    hooks,
    scripts,
  });
}

async function runRealGeneration(body) {
  const runId = crypto.randomUUID();
  const adapted = adaptGenerateScriptRequest(body);

  if (adapted.missingFields.length) {
    await writeUsageEvent({
      runId,
      provider: 'openai',
      model: 'not_called',
      operationType: 'script_generation',
      status: 'failed',
      estimatedCostUsd: 0,
      actualCostUsd: 0,
      reason: `validation_missing_fields:${adapted.missingFields.join(',')}`,
    });

    return NextResponse.json({
      success: false,
      mock: false,
      error: 'VALIDATION_ERROR',
      missing_fields: adapted.missingFields,
    }, { status: 422 });
  }

  const config = getRealGenerationConfig();
  if (!config.ok) {
    await writeUsageEvent({
      runId,
      provider: 'openai',
      model: 'not_called',
      operationType: 'script_generation',
      status: 'failed',
      estimatedCostUsd: 0,
      actualCostUsd: 0,
      reason: `missing_env:${config.missing.join(',')}`,
    });

    return NextResponse.json({
      success: false,
      mock: false,
      error: 'REAL_GENERATION_NOT_CONFIGURED',
      missing_env: config.missing,
    }, { status: 503 });
  }

  const estimated = estimateOpenAiScriptCost({
    model: config.model,
    input: JSON.stringify(adapted.request),
    outputTokens: config.maxOutputTokens,
  });

  try {
    await enforceCreativeCostGuard({
      runId,
      assetId: runId,
      estimatedCostUsd: estimated.estimatedCostUsd,
    });
  } catch (error) {
    if (error?.code === 'CREATIVE_COST_GUARD_BLOCKED') {
      return NextResponse.json({
        success: false,
        mock: false,
        error: error.code,
        message: error.message,
        details: error.details,
      }, { status: error.status ?? 402 });
    }
    throw error;
  }

  await writeCreativeRun({
    id: runId,
    status: 'running',
    mode: 'draft',
    mock: false,
    input: adapted.request,
  });

  try {
    const script = await generateShortScript(adapted.request, {
      modelTier: 'cheap',
      mode: 'draft',
      apiKey: config.apiKey,
      model: config.model,
      maxOutputTokens: config.maxOutputTokens,
      assetId: runId,
    });
    const actualCostUsd = script._meta?.openai?.requestCostUsd ?? estimated.estimatedCostUsd;
    const artifact = await putCreativeArtifact({
      type: 'scripts',
      runId,
      id: runId,
      fileName: 'script.json',
      json: {
        request: adapted.request,
        result: script,
      },
      mock: false,
      metadata: {
        provider: 'openai',
        model: config.model,
        operationType: 'script_generation',
      },
    });

    await updateCreativeRun(runId, {
      status: 'succeeded',
      outputKey: artifact.key,
    });
    await writeUsageEvent({
      runId,
      assetId: runId,
      provider: 'openai',
      model: config.model,
      operationType: 'script_generation',
      status: 'generated',
      estimatedCostUsd: estimated.estimatedCostUsd,
      actualCostUsd,
      reason: 'real_single_generate',
      metadata: {
        artifactKey: artifact.key,
        stored: artifact.stored,
      },
    });

    return NextResponse.json({
      success: true,
      mock: false,
      runId,
      artifactKey: artifact.key,
      script,
      concepts: buildRealConcepts(script),
      hooks: [script.hook].filter(Boolean),
      scripts: [{
        id: `openai-script-${runId}`,
        title: script.title,
        hook: script.hook,
        full_script: script.full_script,
        scenes: script.scenes,
      }],
    });
  } catch (error) {
    await updateCreativeRun(runId, { status: 'failed' }).catch(() => null);
    await writeUsageEvent({
      runId,
      assetId: runId,
      provider: 'openai',
      model: config.model,
      operationType: 'script_generation',
      status: 'failed',
      estimatedCostUsd: estimated.estimatedCostUsd,
      actualCostUsd: 0,
      reason: error instanceof Error ? error.message : 'real_generate_failed',
    });

    return NextResponse.json({
      success: false,
      mock: false,
      runId,
      error: 'REAL_GENERATION_FAILED',
      message: 'OpenAI single generate failed before render/TTS.',
      fallback: buildMockScripts(adapted.request.brief, buildMockHooks(adapted.request.brief)),
    }, { status: 500 });
  }
}

async function readJsonBody(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

function buildMockHooks(brief) {
  const brand = clean(brief.brand) || 'HI-OP';
  const pain = clean(brief.pain) || '소재 테스트 속도가 느림';
  const offer = clean(brief.offer) || '하루 20개 광고 변형 테스트';

  return [
    `${brand} mock: ${pain} 때문에 스케일이 멈추기 전에 봐야 합니다.`,
    `예쁜 영상보다 먼저 필요한 건 ${offer}입니다.`,
    `지금 광고비가 새는 지점은 소재 물량이 아니라 테스트 리듬일 수 있습니다.`,
  ];
}

function buildMockScripts(brief, hooks) {
  const cta = clean(brief.cta) || '오늘 테스트 큐 만들기';

  return hooks.map((hook, index) => ({
    id: `mock-script-${index + 1}`,
    title: `Mock 소재 ${index + 1}`,
    hook,
    full_script: `${hook}\n\n원재료를 훅, 보이스, 비주얼로 나누고\n시장 반응을 빠르게 확인합니다.\n\n${cta}.`,
  }));
}

function buildMockConcepts(brief) {
  const angle = clean(brief.angle) || '불안 자극';

  return [
    {
      id: 'mock-concept-1',
      name: `${angle} 기반 후킹 테스트`,
      format: '9:16 쇼츠',
      goal: '초반 정지율 확인',
    },
    {
      id: 'mock-concept-2',
      name: '원재료 재조합 테스트',
      format: 'UGC형 대본',
      goal: '소구점별 클릭 반응 확인',
    },
  ];
}

function clean(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function adaptGenerateScriptRequest(body) {
  const brief = body?.brief ?? {};
  const request = {
    prompt: clean(body?.prompt) || clean(body?.selectedHook),
    templateId: 'problem-solution-reels',
    brief: {
      brand: clean(brief.brand),
      industry: clean(brief.industry) || clean(brief.product) || 'DTC/ecommerce',
      goal: clean(brief.goal) || '성과형 광고 소재 테스트로 승자 소재를 찾는다',
      targetAudience: clean(brief.targetAudience) || clean(brief.audience),
      offer: clean(brief.offer),
      painPoint: clean(brief.painPoint) || clean(brief.pain),
      tone: clean(brief.tone) || '프리미엄하고 직설적인 B2B 퍼포먼스 마케팅 톤',
      creativeStyle: normalizeCreativeStyle(brief.creativeStyle),
      cta: clean(brief.cta),
      channel: clean(brief.channel) || 'Meta Reels',
      constraints: clean(brief.constraints) || '성과 보장, 허위 수치, 과장된 보장 표현 금지',
      proofPoints: toStringList(brief.proofPoints),
      forbiddenTerms: toStringList(brief.forbiddenTerms),
      referenceLinks: toStringList(brief.referenceLinks),
      locale: clean(brief.locale) || 'ko-KR',
    },
    format: {
      contentFormat: body?.format?.contentFormat || 'reels',
      aspectRatio: body?.format?.aspectRatio || '9:16',
      targetDurationSeconds: Number(body?.format?.targetDurationSeconds) || 12,
      sceneCount: Number(body?.format?.sceneCount) || 6,
    },
  };
  const requiredFields = ['brand', 'targetAudience', 'offer', 'painPoint', 'cta'];
  const missingFields = requiredFields.filter((field) => !request.brief[field]);

  return { request, missingFields };
}

function normalizeCreativeStyle(value) {
  const allowed = new Set(['ugc', 'influencer', 'pov', 'testimonial', 'native', 'shortform']);
  return allowed.has(value) ? value : 'native';
}

function toStringList(value) {
  if (Array.isArray(value)) return value.map(clean).filter(Boolean);
  if (typeof value === 'string') return value.split(',').map(clean).filter(Boolean);
  return undefined;
}

function buildRealConcepts(script) {
  return (script.scenes ?? []).slice(0, 3).map((scene, index) => ({
    id: `real-concept-${index + 1}`,
    name: scene.topic || scene.performance_stage || `장면 ${index + 1}`,
    format: scene.shot_type || 'shortform',
    goal: scene.target_reaction || scene.market_emotion || '성과 반응 확인',
  }));
}
