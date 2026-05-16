import { NextResponse } from 'next/server';

import { writeUsageEvent } from '@/lib/creativeUsageStore';
import { isStudioRequestAuthenticated } from '@/lib/studioAuth';

export const runtime = 'edge';

export async function POST(request) {
  if (!(await isStudioRequestAuthenticated(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await readJsonBody(request);
  const brief = body?.brief ?? {};
  const batchId = crypto.randomUUID();
  const hooks = [
    'mock batch: 첫 1초에서 멈추지 않으면 좋은 제안도 지나갑니다.',
    'mock batch: 스케일은 예산보다 소재 테스트 속도에서 먼저 막힙니다.',
    'mock batch: 지금 필요한 건 회의가 아니라 시장에 넣을 변형 수입니다.',
    'mock batch: 이긴 소재는 감이 아니라 반복 가능한 운영 리듬에서 나옵니다.',
  ];

  await writeUsageEvent({
    runId: batchId,
    provider: 'openai',
    model: 'mock-batch-generation-pipeline',
    operationType: 'script_generation',
    status: 'generated',
    estimatedCostUsd: 0,
    actualCostUsd: 0,
    reason: 'mock_batch_generate_no_paid_api',
  });

  // Future paid pipeline connection points:
  // - modules/shorts-producer/lib/openai.ts batch script generation
  // - modules/shorts-producer/lib/cost-control.ts daily budget guard
  // - modules/shorts-producer/lib/render-queue.ts downstream render queue
  return NextResponse.json({
    success: true,
    mock: true,
    batchId,
    concepts: [
      {
        id: 'mock-batch-concept-1',
        name: `${clean(brief.angle) || '불안 자극'} 훅 4종`,
        format: '9:16 쇼츠',
        goal: '초반 정지율 비교',
      },
    ],
    hooks,
    scripts: hooks.map((hook, index) => ({
      id: `mock-batch-script-${index + 1}`,
      title: `Mock batch 소재 ${index + 1}`,
      hook,
      full_script: `${hook}\n\n브리프를 원재료로 쪼개고\n후킹과 소구점을 빠르게 바꿔 테스트합니다.\n\n${clean(brief.cta) || '오늘 테스트 큐 만들기'}.`,
    })),
  });
}

async function readJsonBody(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

function clean(value) {
  return typeof value === 'string' ? value.trim() : '';
}
