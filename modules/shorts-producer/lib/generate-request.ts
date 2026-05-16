import type {
  AspectRatio,
  BatchGenerationSettings,
  ContentFormat,
  ContentFormatSettings,
  CreativeStyle,
  CustomerBrief,
  CustomerBriefRequiredField,
  MissingFieldQuestion,
} from '@/lib/types';

export const REQUIRED_BRIEF_QUESTIONS: Record<CustomerBriefRequiredField, MissingFieldQuestion> = {
  brand: {
    key: 'brand',
    label: '브랜드',
    question: '광고 엔진을 만들 브랜드/고객사 이름은 무엇인가요?',
    placeholder: '예: HI-OP, 오로라클리닉, 넥스트CRM',
    required: true,
  },
  industry: {
    key: 'industry',
    label: '업종',
    question: '어떤 업종/서비스 카테고리인가요?',
    placeholder: '예: B2B SaaS, 병원, 교육, 이커머스',
    required: true,
  },
  goal: {
    key: 'goal',
    label: '목표',
    question: '이번 광고의 목표는 무엇인가요?',
    placeholder: '예: 무료 상담 신청 증가, 데모 예약, 구매 전환',
    required: true,
  },
  targetAudience: {
    key: 'targetAudience',
    label: '타깃',
    question: '주 타깃 고객은 누구인가요?',
    placeholder: '예: 월 광고비 500만 원 이상 쓰는 30대 마케터',
    required: true,
  },
  offer: {
    key: 'offer',
    label: '오퍼',
    question: '광고에서 소개할 상품/서비스/혜택은 무엇인가요?',
    placeholder: '예: 전환 추적 무료 진단, 첫 구매 20% 할인',
    required: true,
  },
  painPoint: {
    key: 'painPoint',
    label: '문제',
    question: '고객이 지금 겪는 가장 아픈 문제는 무엇인가요?',
    placeholder: '예: 광고비는 쓰는데 전환이 제대로 잡히지 않음',
    required: true,
  },
  tone: {
    key: 'tone',
    label: '톤',
    question: '광고 톤앤매너는 어떻게 갈까요?',
    placeholder: '예: 직설적, 전문적, 유머러스, 차분함',
    required: true,
  },
  creativeStyle: {
    key: 'creativeStyle',
    label: '스타일',
    question: '어떤 광고 스타일로 만들까요?',
    placeholder: '예: UGC, 인플루언서, POV, 후기형, Native, 숏폼',
    required: true,
  },
  cta: {
    key: 'cta',
    label: 'CTA',
    question: '마지막에 어떤 행동을 유도할까요?',
    placeholder: '예: 무료 진단 신청, 상담 예약, 카카오톡 문의',
    required: true,
  },
  channel: {
    key: 'channel',
    label: '채널',
    question: '어느 채널용 광고인가요?',
    placeholder: '예: Meta Reels, Instagram Story, YouTube Shorts, Naver',
    required: true,
  },
};

const REQUIRED_BRIEF_FIELDS = Object.keys(REQUIRED_BRIEF_QUESTIONS) as CustomerBriefRequiredField[];
const ASPECT_RATIOS: AspectRatio[] = ['9:16', '1:1', '16:9'];
const CONTENT_FORMATS: ContentFormat[] = ['reels', 'square', 'landscape', 'longform'];
const CREATIVE_STYLES: CreativeStyle[] = ['ugc', 'influencer', 'pov', 'testimonial', 'native', 'shortform'];

export function normalizeBrief(input: unknown): Partial<CustomerBrief> {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return {};

  const record = input as Record<string, unknown>;

  return {
    brand: pickString(record, 'brand', 'customer', 'customerName', 'customer_name'),
    industry: pickString(record, 'industry', 'category'),
    goal: pickString(record, 'goal', 'campaignGoal', 'campaign_goal'),
    targetAudience: pickString(record, 'targetAudience', 'target_audience', 'audience'),
    offer: pickString(record, 'offer', 'product', 'service'),
    painPoint: pickString(record, 'painPoint', 'pain_point', 'problem'),
    tone: pickString(record, 'tone', 'voice', 'toneAndManner', 'tone_and_manner'),
    creativeStyle: normalizeCreativeStyle(pickString(record, 'creativeStyle', 'creative_style', 'style', 'formatType', 'format_type')),
    cta: pickString(record, 'cta', 'callToAction', 'call_to_action'),
    channel: pickString(record, 'channel', 'placement', 'media'),
    constraints: pickString(record, 'constraints', 'guardrails'),
    proofPoints: pickStringList(record, 'proofPoints', 'proof_points', 'proof'),
    forbiddenTerms: pickStringList(record, 'forbiddenTerms', 'forbidden_terms', 'bannedTerms', 'banned_terms'),
    referenceLinks: pickStringList(record, 'referenceLinks', 'reference_links', 'references'),
    locale: pickString(record, 'locale', 'language') || 'ko-KR',
  };
}

export function normalizeFormat(input: unknown): Partial<ContentFormatSettings> {
  if (typeof input === 'string') {
    if (normalizeCreativeStyle(input) === 'shortform') return { contentFormat: 'reels', aspectRatio: '9:16' };
    return CONTENT_FORMATS.includes(input as ContentFormat)
      ? { contentFormat: input as ContentFormat }
      : ASPECT_RATIOS.includes(input as AspectRatio)
        ? { aspectRatio: input as AspectRatio }
        : {};
  }
  if (!input || typeof input !== 'object' || Array.isArray(input)) return {};

  const record = input as Record<string, unknown>;
  const aspectRatio = pickString(record, 'aspectRatio', 'aspect_ratio');
  const contentFormat = pickString(record, 'contentFormat', 'content_format', 'format');
  const creativeStyle = normalizeCreativeStyle(pickString(record, 'creativeStyle', 'creative_style', 'style', 'formatType', 'format_type'));

  return {
    aspectRatio: ASPECT_RATIOS.includes(aspectRatio as AspectRatio) ? aspectRatio as AspectRatio : undefined,
    contentFormat: creativeStyle === 'shortform'
      ? 'reels'
      : CONTENT_FORMATS.includes(contentFormat as ContentFormat) ? contentFormat as ContentFormat : undefined,
    targetDurationSeconds: pickNumber(record, 'targetDurationSeconds', 'target_duration_seconds', 'durationSeconds', 'duration_seconds'),
    sceneCount: pickNumber(record, 'sceneCount', 'scene_count'),
  };
}

export function normalizeBatchSettings(input: unknown): BatchGenerationSettings {
  const record = input && typeof input === 'object' && !Array.isArray(input)
    ? input as Record<string, unknown>
    : {};
  const candidateCount = clampNumber(pickNumber(record, 'candidateCount', 'candidate_count', 'count'), 20, 1, 40);
  const promoteCount = clampNumber(pickNumber(record, 'promoteCount', 'promote_count'), Math.min(8, candidateCount), 1, candidateCount);
  const maxConcurrency = clampNumber(pickNumber(record, 'maxConcurrency', 'max_concurrency'), 3, 1, 6);
  const dryRun = typeof record.dryRun === 'boolean' ? record.dryRun : false;

  return {
    candidateCount,
    promoteCount,
    maxConcurrency,
    dryRun,
  };
}

export function getMissingBriefFields(brief: Partial<CustomerBrief>) {
  return REQUIRED_BRIEF_FIELDS.filter((field) => !brief[field]?.trim());
}

export function questionsForMissingFields(fields: CustomerBriefRequiredField[]) {
  return fields.map((field) => REQUIRED_BRIEF_QUESTIONS[field]);
}

export function normalizeCreativeStyle(value: string | undefined): CreativeStyle | undefined {
  const normalized = value?.trim().toLowerCase();
  if (!normalized) return undefined;
  if (CREATIVE_STYLES.includes(normalized as CreativeStyle)) return normalized as CreativeStyle;
  if (['유지씨', '유저생성', '유저 생성', '사용자 제작', 'user generated', 'user-generated'].includes(normalized)) return 'ugc';
  if (['인플루언서', 'influencer', 'creator', '크리에이터'].includes(normalized)) return 'influencer';
  if (['피오브이', '시점', '1인칭', 'first person', 'first-person'].includes(normalized)) return 'pov';
  if (['후기형', '후기', '리뷰', 'review', 'testimonial', '사용후기'].includes(normalized)) return 'testimonial';
  if (['네이티브', 'native', 'native ad', '피드형'].includes(normalized)) return 'native';
  if (['숏폼', 'short form', 'short-form', 'shorts', 'reels', '릴스'].includes(normalized)) return 'shortform';
  return undefined;
}

function pickString(record: Record<string, unknown>, ...keys: string[]) {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }

  return undefined;
}

function pickNumber(record: Record<string, unknown>, ...keys: string[]) {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    if (typeof value === 'string' && value.trim()) {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) return parsed;
    }
  }

  return undefined;
}

function pickStringList(record: Record<string, unknown>, ...keys: string[]) {
  for (const key of keys) {
    const value = record[key];
    if (Array.isArray(value)) {
      const items = value.filter((item): item is string => typeof item === 'string').map((item) => item.trim()).filter(Boolean);
      if (items.length) return items;
    }
    if (typeof value === 'string' && value.trim()) {
      return value
        .split(/\n|,/)
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }

  return undefined;
}

function clampNumber(value: number | undefined, fallback: number, min: number, max: number) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, Math.round(value)));
}
