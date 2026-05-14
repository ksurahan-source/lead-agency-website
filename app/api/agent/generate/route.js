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
  const creativeScore = getAverageScore(scenes);

  return NextResponse.json({
    id: crypto.randomUUID(),
    status: 'ready',
    createdAt: new Date().toISOString(),
    brief,
    duration,
    creativeScore,
    winningAngle: `${STYLE_LABELS[brief.style]} / ${scenes[0].emotion}`,
    winnerReason: `${brief.audience}의 ${brief.painPoint}을 초반 Hook으로 찌르고, 증거와 반전 메시지로 저장·문의 행동을 유도합니다.`,
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
  const scoreSeed = scoreFromBrief(brief);

  return [
    {
      stage: 'HOOK',
      title: '초반 1초 후킹',
      text: `아직도 ${brief.painPoint}?`,
      voiceover: `${brief.audience}라면 지금 이 문제 익숙할 거예요. 아직도 ${brief.painPoint}?`,
      visual: `${styleLabel} close phone shot, shaky UGC opening, bold Korean subtitles`,
      duration: sceneDuration,
      hookScore: decimal(scoreSeed + 0.4),
      thumbstopScore: decimal(scoreSeed + 0.2),
      emotion: 'FOMO 기반',
      targetResponse: '초반 이탈률 낮음 예상',
      metric: 'CTR +18%',
      source: 'UGC 캡처형',
      background: '#101010',
      accent: '#f7c72f',
    },
    {
      stage: 'SCROLL STOP',
      title: '스크롤 정지 포인트',
      text: '광고비가 새는 순간은 조용합니다',
      voiceover: `이걸 그냥 두면 ${brief.brand}의 광고비와 시간이 계속 새어나갑니다.`,
      visual: 'Meta dashboard warning, red annotations, thumb stop data overlay',
      duration: sceneDuration,
      hookScore: decimal(scoreSeed - 0.1),
      thumbstopScore: decimal(scoreSeed + 0.5),
      emotion: '손실 회피',
      targetResponse: '광고주 긴장도 상승',
      metric: 'CPA Risk',
      source: '광고 관리자형',
      background: '#171717',
      accent: '#d9342b',
    },
    {
      stage: 'PROOF',
      title: '증거와 구조',
      text: brief.offer,
      voiceover: `그래서 필요한 건 ${brief.offer}. ${brief.product}로 흐름을 다시 잡아야 합니다.`,
      visual: 'creative comparison board, winner badge, hook test matrix',
      duration: sceneDuration,
      hookScore: decimal(scoreSeed + 0.1),
      thumbstopScore: decimal(scoreSeed),
      emotion: '확신 강화',
      targetResponse: '해결 가능성 인지',
      metric: 'Winner x20',
      source: '비교 분석형',
      background: '#f8f6ef',
      accent: '#111111',
    },
    {
      stage: 'TWIST',
      title: '반전 메시지',
      text: proofLine,
      voiceover: `${proofLine}. 예쁜 영상보다 먼저 봐야 할 건 시장 반응입니다.`,
      visual: 'comment capture, testimonial overlay, market response analysis',
      duration: sceneDuration,
      hookScore: decimal(scoreSeed + 0.3),
      thumbstopScore: decimal(scoreSeed - 0.2),
      emotion: '신뢰/반전',
      targetResponse: '저장·문의 가능성 상승',
      metric: 'Save ↑',
      source: '댓글/후기형',
      background: '#f7c72f',
      accent: '#111111',
    },
    {
      stage: 'CTA',
      title: '전환 행동',
      text: '가장 먼저 이 소재부터 테스트하세요',
      voiceover: `${brief.brand}에서 지금 ${brief.cta}. 가장 먼저 이 소재부터 테스트하세요.`,
      visual: 'performance CTA, ad launch checklist, winner candidate',
      duration: sceneDuration,
      hookScore: decimal(scoreSeed + 0.2),
      thumbstopScore: decimal(scoreSeed + 0.1),
      emotion: '행동 유도',
      targetResponse: '문의 전환 가능성 높음',
      metric: 'LAUNCH',
      source: '전환형',
      background: '#111111',
      accent: '#ffffff',
    },
  ];
}

function scoreFromBrief(brief) {
  const source = `${brief.brand}${brief.product}${brief.audience}${brief.painPoint}${brief.offer}`;
  const total = [...source].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return 8.1 + (total % 7) / 10;
}

function decimal(value) {
  return Math.min(9.4, Math.max(7.6, value)).toFixed(1);
}

function getAverageScore(scenes) {
  const total = scenes.reduce((sum, scene) => sum + Number(scene.hookScore) + Number(scene.thumbstopScore), 0);
  return decimal(total / (scenes.length * 2));
}

function clean(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function clampNumber(value, min, max, fallback) {
  if (!Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, Math.round(value)));
}
