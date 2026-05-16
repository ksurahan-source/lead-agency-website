import { randomUUID } from 'node:crypto';

import { NextResponse } from 'next/server';

import { isStudioRequestAuthenticated } from '@/lib/studioAuth';
import { recordProviderUsage } from '@/modules/shorts-producer/lib/cost-meter';

export const runtime = 'nodejs';

export async function POST(request) {
  if (!(await isStudioRequestAuthenticated(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await readJsonBody(request);
  const brief = body?.brief ?? {};
  const runId = randomUUID();
  const hooks = buildMockHooks(brief);
  const scripts = buildMockScripts(brief, hooks);
  const concepts = buildMockConcepts(brief);

  await recordProviderUsage({
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
