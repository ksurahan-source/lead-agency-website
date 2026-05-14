import { NextResponse } from 'next/server';
import { isAgentRequestAuthenticated } from '@/lib/agentAuth';

export const runtime = 'edge';

const STYLE_LABELS = {
  ugc: 'UGC',
  influencer: '인플루언서',
  pov: 'POV',
  testimonial: '후기형',
  native: 'Native',
  shortform: '숏폼',
};

export async function POST(request) {
  if (!(await isAgentRequestAuthenticated(request))) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const brief = normalizeBrief(body);
  const missing = getMissingFields(brief);

  if (missing.length > 0) {
    return NextResponse.json({ message: '필수 설정값이 부족합니다.', missing }, { status: 422 });
  }

  const duration = clampNumber(Number(body.duration || 18), 12, 35, 18);
  const scenes = buildScenes(brief, duration);

  return NextResponse.json({
    id: crypto.randomUUID(),
    status: 'ready',
    createdAt: new Date().toISOString(),
    brief,
    duration,
    scenes,
    fullScript: scenes.map((scene) => scene.voiceover).join('\n\n'),
  });
}

function normalizeBrief(body) {
  return {
    brand: clean(body.brand),
    product: clean(body.product),
    audience: clean(body.audience),
    painPoint: clean(body.painPoint),
    offer: clean(body.offer),
    proof: clean(body.proof),
    cta: clean(body.cta),
    style: STYLE_LABELS[body.style] ? body.style : 'ugc',
  };
}

function getMissingFields(brief) {
  return ['brand', 'product', 'audience', 'painPoint', 'offer', 'cta'].filter((field) => !brief[field]);
}

function buildScenes(brief, duration) {
  const sceneDuration = Number((duration / 5).toFixed(1));
  const styleLabel = STYLE_LABELS[brief.style];
  const proofLine = brief.proof || `${brief.product}의 실제 개선 포인트를 확인하세요`;

  return [
    {
      title: `${brief.audience} 주목`,
      text: `${brief.painPoint}?`,
      voiceover: `${brief.audience}라면 지금 이 문제 익숙할 거예요. ${brief.painPoint}.`,
      visual: `${styleLabel} hook, close phone shot, bold Korean subtitles`,
      duration: sceneDuration,
      background: '#111111',
      accent: '#f7c72f',
    },
    {
      title: '문제 확대',
      text: '그냥 넘기면 비용만 샙니다',
      voiceover: `이걸 그냥 두면 ${brief.brand}의 광고비와 시간이 계속 새어나갑니다.`,
      visual: 'dashboard warning, red marks, Korean performance ad',
      duration: sceneDuration,
      background: '#f8f6ef',
      accent: '#d9342b',
    },
    {
      title: '해결 제안',
      text: brief.offer,
      voiceover: `그래서 필요한 건 ${brief.offer}. ${brief.product}로 흐름을 다시 잡아야 합니다.`,
      visual: 'workflow recovery, checklist, clean product proof',
      duration: sceneDuration,
      background: '#ffffff',
      accent: '#111111',
    },
    {
      title: '신뢰 근거',
      text: proofLine,
      voiceover: proofLine,
      visual: 'proof overlay, testimonial style, evidence board',
      duration: sceneDuration,
      background: '#f7c72f',
      accent: '#111111',
    },
    {
      title: 'CTA',
      text: brief.cta,
      voiceover: `${brief.brand}에서 지금 ${brief.cta}.`,
      visual: 'direct CTA end card, Korean brand ad',
      duration: sceneDuration,
      background: '#d9342b',
      accent: '#ffffff',
    },
  ];
}

function clean(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function clampNumber(value, min, max, fallback) {
  if (!Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, Math.round(value)));
}
