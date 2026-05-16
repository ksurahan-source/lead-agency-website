import OpenAI from 'openai';

import { getOpenAiPricing, roundUsd } from './pricing';
import { buildTtsNarrationText, optimizeElevenLabsTtsScript } from './tts-preprocessor';
import type {
  AspectRatio,
  ContentFormat,
  ContentFormatSettings,
  CreativeStyle,
  GenerateScriptRequest,
  PerformanceStage,
  ScriptGenerationResult,
  ShortScene,
  ShortScript,
  ShotType,
  TtsVoiceRole,
} from './types';

export type CostMode = 'draft' | 'final';
export type ModelTier = 'cheap' | 'premium';

function getOpenAiClient(apiKeyInput?: string) {
  const apiKey = apiKeyInput?.trim() || process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured');
  }

  return new OpenAI({ apiKey });
}

const HOOK_DB = [
  '매출 안 나오는데 광고비만 나가고 있다면, 이미 소재가 죽은 겁니다.',
  '지금도 광고비는 조용히 새고 있습니다.',
  '클릭은 나오는데 문의가 없다면, 영상 문제가 아닐 수 있습니다.',
  '성과가 안 나는 계정은 보통 첫 2초에서 이미 끝납니다.',
  '좋아 보이는 영상 말고, 반응 나오는 소재부터 테스트하세요.',
  '광고비를 더 쓰기 전에, 소재가 살아있는지 먼저 봐야 합니다.',
  '이 지표가 무너지면 알고리즘은 좋은 고객을 못 찾습니다.',
  '소재 1개로 버티는 순간, 테스트는 이미 늦습니다.',
];

const RAW_SOURCE_DIRECTIONS = [
  'shaky handheld phone close up',
  'laptop dashboard close up at night',
  'messy marketer desk phone notification',
  'screen recording ad manager warning',
  'finger tapping phone analytics chart',
  'real workspace coffee laptop urgent',
  'chat message screenshot phone vertical',
  'creator selfie talking fast natural light',
];

export interface GenerateShortScriptOptions {
  mode?: CostMode;
  modelTier?: ModelTier;
  approvedFinalRender?: boolean;
  assetId?: string;
  apiKey?: string;
  model?: string;
  maxOutputTokens?: number;
}

export async function generateShortScript(
  input: GenerateScriptRequest | string,
  options: GenerateShortScriptOptions = {},
): Promise<ScriptGenerationResult> {
  const request = normalizeGenerateRequest(input);
  const format = normalizeFormatSettings(request.format);
  const prompt = buildCustomerPrompt(request);
  const systemPrompt = `
    You are a Korean direct-response copywriter and performance creative operator.
    Create a highly engaging ${format.contentFormat} ad video script for ${format.aspectRatio}.
    The engine is generic: use the customer brief as settings, never as optional context.
    Do not behave like a brand-film planner. Behave like a response marketer trying to stop scroll,
    trigger market emotion, and produce a winner candidate worth testing.

    Creative objective:
    - The output must feel like a live ad test, not a polished PPT.
    - Prefer raw, urgent, operator-like copy over clean corporate explanation.
    - Use emotional pressure: loss, FOMO, urgency, relief, suspicion, proof, and "this is happening now".
    - Avoid safe generic SaaS phrasing.
    - Avoid stock-video words like "business people smiling", "professional corporate team", "success meeting".
    - Never invent customer proof, numbers, certifications, or guarantees.

    Use this Hook DB as pattern inspiration. Adapt the logic to the customer; do not copy blindly:
    ${HOOK_DB.map((hook) => `- ${hook}`).join('\n')}

    Important: good ad copy is not automatically good TTS copy.
    Write full_script and every scene.voiceover as ElevenLabs-ready spoken Korean:
    - short lines
    - frequent line breaks
    - minimal commas
    - conversational cadence
    - slightly fast "real operator" rhythm
    - natural pauses after hard claims or questions
    - no polished announcer tone
    - no stage directions
    - avoid Latin letters when a Korean pronunciation is clearer
    - write brand names and technical terms in a Korean pronunciation when spoken Korean is clearer
    - create emotion through structure, not instruction words like "read urgently"
    - respect customer forbiddenTerms and constraints
    - do not invent claims, numbers, certifications, or customer proof not provided in the brief

    Use exactly ${format.sceneCount} scenes and target about ${format.targetDurationSeconds} seconds total.
    Reels pacing is mandatory: most scenes should be 1.2-2.2 seconds, never slow explanatory cards.
    Longform may use longer chapters, but still needs pattern interrupts every 3-5 seconds.
    Use these exact shot_type values for renderer compatibility:
    - dashboard: problem scene or data/visual setup
    - phone: audience reaction, daily-life symptom, or customer moment
    - workflow: mechanism, process, comparison, or solution path
    - proof: customer proof, reason to believe, objection handling, or example
    - cta: direct next action
    The first scene must be dashboard.
    The final scene must be cta.
    For scenes between them, repeat phone/workflow/proof as needed for the selected duration.
    The narrative stages must follow:
    1. hook: raw first-second line
    2. scroll_stop: pattern interrupt or loss frame
    3. proof: reason to believe, comparison, or evidence from the brief
    4. twist: unexpected reframing or market-emotion turn
    5. cta: direct test/action recommendation
    Repeat proof/twist for longform only.
    Reels must be fast, punchy, and emotionally specific. Longform must use clearer chapters and slightly longer explanations.
    Square and landscape formats need wider, less text-dense on-screen copy than Reels.
    Create subtitle_steps for every scene: 2-4 short Korean beats, each easy to read at a glance.
    Follow the creative style rules from the customer settings. The style should influence camera direction,
    narrator stance, visible copy, and visual_search keywords.
    visual_search must request raw operating footage, not polished stock. Prefer:
    ${RAW_SOURCE_DIRECTIONS.map((item) => `- ${item}`).join('\n')}
    Also fill visual_source_intent with the reason this footage feels native.
    
    Return the result in strictly JSON format with the following structure:
    {
      "title": "Short catchy title",
      "hook": "The first 3 seconds of visible text",
      "full_script": "The complete ElevenLabs-ready text to be spoken with line breaks",
      "scenes": [
        {
          "text": "Text to show on screen",
          "voiceover": "ElevenLabs-ready spoken text for this scene",
          "visual_search": "Keywords for stock footage (e.g. 'man running in gym')",
          "duration": 3,
          "shot_type": "dashboard",
          "performance_stage": "hook",
          "hook_score": 8.7,
          "thumbstop_score": 8.4,
          "market_emotion": "FOMO / 손실 회피",
          "target_reaction": "광고비 누수에 바로 긴장",
          "visual_source_intent": "흔들리는 운영자 화면으로 실제 계정 문제처럼 보이게 함",
          "pacing_note": "1.4s hard cut after question",
          "tts_direction": "빠르게, 숨 조금 참듯, 광고 더빙 금지",
          "tts_voice_role": "hook",
          "proof_overlay": "Optional customer proof point or claim from the brief; omit this field when no proof exists",
          "topic": "Optional short Korean topic label",
          "subtitle_steps": ["Optional short subtitle beat"]
        }
      ]
    }
  `;
  const modelTier = options.modelTier ?? 'cheap';
  const model = options.model || getOpenAiModel(modelTier);
  const maxOutputTokens = options.maxOutputTokens ?? getMaxOutputTokens();

  if (modelTier === 'premium' && (options.mode !== 'final' || options.approvedFinalRender !== true)) {
    throw new Error('Final approval is required before calling premium OpenAI models.');
  }

  const response = await getOpenAiClient(options.apiKey).chat.completions.create({
    model,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt }
    ],
    response_format: { type: 'json_object' },
    max_completion_tokens: maxOutputTokens,
  });

  const parsed = parseJsonObject(response.choices[0].message.content || '{}') as ShortScript;
  const rawScenes = Array.isArray(parsed.scenes) ? parsed.scenes : [];
  const scenes = rawScenes.map((scene, index) => sanitizeScene(scene, index, rawScenes.length, format.contentFormat));
  const script = { ...parsed, scenes };
  const tts = optimizeElevenLabsTtsScript(buildTtsNarrationText(script), {
    deliveryStyle: 'operator',
    maxLineLength: 16,
  });

  const inputTokens = response.usage?.prompt_tokens ?? undefined;
  const outputTokens = response.usage?.completion_tokens ?? undefined;
  const cachedInputTokens = response.usage?.prompt_tokens_details?.cached_tokens ?? undefined;
  const actualCostUsd = estimateOpenAiCostUsd(model, inputTokens, outputTokens, cachedInputTokens);
  const result: ScriptGenerationResult = {
    ...script,
    full_script: tts.text,
    scenes: scenes.map((scene) => ({
      ...scene,
      voiceover: optimizeElevenLabsTtsScript(scene.voiceover || scene.text, {
        deliveryStyle: 'operator',
        maxLineLength: 16,
      }).text,
    })),
    _meta: {
      tts,
      openai: {
        model,
        billingMode: 'budget_cap',
        requestCostUsd: actualCostUsd,
        monthTotalUsd: 0,
        remainingBudgetUsd: null,
        budgetExceeded: false,
      },
      contentQuality: buildContentQualityMeta(scenes),
      customer: {
        brief: request.brief,
        templateId: request.templateId ?? 'problem-solution-reels',
        prompt: request.prompt,
        format,
      },
    },
  };

  return result;
}

function normalizeGenerateRequest(input: GenerateScriptRequest | string): GenerateScriptRequest {
  if (typeof input !== 'string') return input;

  return {
    prompt: input,
    templateId: 'problem-solution-reels',
    brief: {
      brand: 'HI-OB',
      industry: '퍼포먼스 마케팅',
      goal: '전환 추적 진단 문의를 늘린다',
      targetAudience: '광고비를 쓰지만 전환 데이터가 정확히 잡히지 않는 한국 광고주',
      offer: '전환 추적 진단',
      painPoint: '광고비는 나가는데 전환이 제대로 집계되지 않는다',
      tone: '직설적이고 신뢰감 있는 문제 진단형',
      creativeStyle: 'native',
      cta: '무료 진단 신청',
      channel: 'Meta Reels',
      constraints: '과장된 성과 보장 표현은 피한다',
      proofPoints: ['Pixel, CAPI, GA4, GTM 흐름 점검'],
      locale: 'ko-KR',
    },
    format: defaultFormatSettings('reels'),
  };
}

export function getOpenAiModel(tier: ModelTier) {
  if (tier === 'premium') return process.env.OPENAI_PREMIUM_MODEL?.trim() || 'gpt-4o';
  return process.env.OPENAI_CHEAP_MODEL?.trim() || 'gpt-4o-mini';
}

export function getMaxOutputTokens() {
  const configured = Number(process.env.MAX_OUTPUT_TOKENS_PER_REQUEST);
  if (Number.isFinite(configured) && configured > 0) return Math.floor(configured);
  return 2200;
}

function estimateOpenAiCostUsd(
  model: string,
  inputTokens?: number,
  outputTokens?: number,
  cachedInputTokens?: number,
) {
  const pricing = getOpenAiPricing(model);
  const cachedTokens = cachedInputTokens ?? 0;
  const billableInputTokens = Math.max(0, (inputTokens ?? 0) - cachedTokens);
  const inputCost = (billableInputTokens / 1_000_000) * pricing.inputPerMillionTokensUsd;
  const cachedCost = (cachedTokens / 1_000_000) * pricing.cachedInputPerMillionTokensUsd;
  const outputCost = ((outputTokens ?? 0) / 1_000_000) * pricing.outputPerMillionTokensUsd;

  return roundUsd(inputCost + cachedCost + outputCost);
}

function parseJsonObject(content: string) {
  const cleaned = content
    .trim()
    .replace(/^```(?:json)?/i, '')
    .replace(/```$/i, '')
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    return JSON.parse(cleaned.replace(/,\s*([}\]])/g, '$1'));
  }
}

function buildCustomerPrompt(request: GenerateScriptRequest) {
  const { brief } = request;
  const format = normalizeFormatSettings(request.format);
  const proofPoints = listOrFallback(brief.proofPoints, 'No proof points provided. Use cautious wording.');
  const forbiddenTerms = listOrFallback(brief.forbiddenTerms, 'None');
  const referenceLinks = listOrFallback(brief.referenceLinks, 'None');

  return `
    Customer settings:
    - Brand: ${brief.brand}
    - Industry: ${brief.industry}
    - Campaign goal: ${brief.goal}
    - Target audience: ${brief.targetAudience}
    - Offer: ${brief.offer}
    - Core customer pain point: ${brief.painPoint}
    - Desired tone: ${brief.tone}
    - Creative style: ${brief.creativeStyle} (${creativeStyleInstructions(brief.creativeStyle)})
    - CTA: ${brief.cta}
    - Channel: ${brief.channel}
    - Locale: ${brief.locale ?? 'ko-KR'}
    - Constraints: ${brief.constraints || 'No extra constraints'}
    - Proof points: ${proofPoints}
    - Forbidden terms: ${forbiddenTerms}
    - Reference links: ${referenceLinks}

    Format settings:
    - Content format: ${format.contentFormat}
    - Aspect ratio: ${format.aspectRatio}
    - Target duration seconds: ${format.targetDurationSeconds}
    - Scene count: ${format.sceneCount}

    Additional user direction:
    ${request.prompt?.trim() || 'No extra direction'}

    Build a customer-specific ad script from these settings.
    If a detail is not present in the settings, avoid pretending it exists.
    Prioritize market-emotion testing over clean explanation.
  `;
}

function listOrFallback(items: string[] | undefined, fallback: string) {
  const cleanItems = items?.map((item) => item.trim()).filter(Boolean) ?? [];
  return cleanItems.length ? cleanItems.join(', ') : fallback;
}

function creativeStyleInstructions(style: CreativeStyle) {
  switch (style) {
    case 'ugc':
      return 'handheld, natural light, casual everyday setting, real user feel, avoid polished ad language';
    case 'influencer':
      return 'confident creator delivery, trend-aware rhythm, strong gestures, stylish but not exaggerated';
    case 'pov':
      return 'first-person viewpoint, immersive hands/field-of-view cues, viewer feels they are experiencing it';
    case 'testimonial':
      return 'honest review tone, concrete usage details, balanced credibility, avoid fake-sounding praise';
    case 'native':
      return 'platform-native feed content, restrained branding, content-first rhythm, minimal ad smell';
    case 'shortform':
      return 'first-second hook, fast cuts, subtitle-first, one core message, replay-friendly pacing';
  }
}

const SHOT_TYPES: ShotType[] = ['dashboard', 'phone', 'workflow', 'proof', 'cta'];
const VOICE_ROLES: TtsVoiceRole[] = ['hook', 'authority', 'cta'];
const ASPECT_RATIOS: AspectRatio[] = ['9:16', '1:1', '16:9'];
const CONTENT_FORMATS: ContentFormat[] = ['reels', 'square', 'landscape', 'longform'];

function sanitizeScene(scene: ShortScene, index: number, totalScenes: number, contentFormat: ContentFormat): ShortScene {
  const shotType = SHOT_TYPES.includes(scene.shot_type) ? scene.shot_type : SHOT_TYPES[index] ?? 'proof';
  const voiceRole = scene.tts_voice_role && VOICE_ROLES.includes(scene.tts_voice_role)
    ? scene.tts_voice_role
    : voiceRoleForIndex(index, totalScenes);
  const proofOverlay = cleanOptionalText(scene.proof_overlay);
  const performanceStage = normalizePerformanceStage(scene.performance_stage, index, totalScenes);
  const visualSearch = buildRawVisualSearch(scene.visual_search, shotType, performanceStage);

  return {
    ...scene,
    text: scene.text?.trim() || `장면 ${index + 1}`,
    voiceover: scene.voiceover?.trim() || scene.text?.trim() || '',
    visual_search: visualSearch,
    duration: normalizeSceneDuration(scene.duration, contentFormat, performanceStage),
    shot_type: shotType,
    performance_stage: performanceStage,
    hook_score: normalizeScore(scene.hook_score, index),
    thumbstop_score: normalizeScore(scene.thumbstop_score, index + 1),
    market_emotion: cleanOptionalText(scene.market_emotion) ?? emotionForStage(performanceStage),
    target_reaction: cleanOptionalText(scene.target_reaction) ?? reactionForStage(performanceStage),
    visual_source_intent: cleanOptionalText(scene.visual_source_intent) ?? visualSourceIntentForStage(performanceStage),
    pacing_note: cleanOptionalText(scene.pacing_note) ?? pacingNoteForFormat(contentFormat),
    tts_direction: cleanOptionalText(scene.tts_direction) ?? '빠르게, 실전 운영자처럼, 광고 더빙 금지',
    tts_voice_role: voiceRole,
    proof_overlay: proofOverlay,
    topic: cleanOptionalText(scene.topic),
    subtitle_steps: scene.subtitle_steps?.map((item) => item.trim()).filter(Boolean),
    effects: scene.effects?.length ? scene.effects : defaultEffectsForStage(performanceStage),
  };
}

function cleanOptionalText(value: string | undefined) {
  const cleaned = value?.trim();
  if (!cleaned || /^(none|null|n\/a|없음|없습니다)$/i.test(cleaned)) return undefined;
  return cleaned;
}

function voiceRoleForIndex(index: number, totalScenes: number): TtsVoiceRole {
  if (index === 0) return 'hook';
  if (index === totalScenes - 1) return 'cta';
  return 'authority';
}

function normalizePerformanceStage(stage: PerformanceStage | undefined, index: number, totalScenes: number): PerformanceStage {
  if (stage && ['hook', 'scroll_stop', 'proof', 'twist', 'cta'].includes(stage)) return stage;
  if (index === 0) return 'hook';
  if (index === totalScenes - 1) return 'cta';
  return (['scroll_stop', 'proof', 'twist'] as PerformanceStage[])[(index - 1) % 3];
}

function buildRawVisualSearch(query: string | undefined, shotType: ShotType, stage: PerformanceStage) {
  const cleanQuery = query?.trim();
  const stageIntent = {
    hook: 'shaky handheld phone close up urgent Korean creator no face',
    scroll_stop: 'screen recording ad dashboard warning red annotation vertical',
    proof: 'laptop analytics chart close up finger pointing vertical',
    twist: 'phone chat message notification screenshot vertical handheld',
    cta: 'marketer launches ad campaign laptop phone close up vertical',
  }[stage];
  const shotIntent = {
    dashboard: 'dashboard close up screen not corporate',
    phone: 'handheld smartphone real user natural light',
    workflow: 'messy desk laptop workflow operator',
    proof: 'analytics proof chart close up',
    cta: 'phone tap launch button close up',
  }[shotType];

  return [cleanQuery, stageIntent, shotIntent, 'raw native reels footage', 'no smiling corporate team']
    .filter(Boolean)
    .join(' ');
}

function normalizeSceneDuration(duration: number, contentFormat: ContentFormat, stage: PerformanceStage) {
  const fallback = stage === 'hook' ? 1.4 : stage === 'cta' ? 1.8 : 1.7;
  if (contentFormat === 'longform') return clampNumber(duration, 5, 3, 9);
  if (contentFormat === 'landscape') return clampNumber(duration, 3, 2, 5);
  if (contentFormat === 'square') return clampNumber(duration, 2, 1, 4);
  return clampDecimal(duration, fallback, 1.2, 2.4);
}

function normalizeScore(value: number | undefined, seed: number) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return Number(Math.min(9.6, Math.max(6.8, value)).toFixed(1));
  }

  return Number((8.1 + (seed % 5) * 0.3).toFixed(1));
}

function emotionForStage(stage: PerformanceStage) {
  return {
    hook: 'FOMO / 손실 회피',
    scroll_stop: '긴장 / 의심',
    proof: '확신 / 비교',
    twist: '반전 / 저장 욕구',
    cta: '행동 압박',
  }[stage];
}

function reactionForStage(stage: PerformanceStage) {
  return {
    hook: '초반 이탈률 낮음 예상',
    scroll_stop: '문제 인식 강제',
    proof: '해결 가능성 인지',
    twist: '댓글·저장 반응 기대',
    cta: '문의 전환 행동 유도',
  }[stage];
}

function visualSourceIntentForStage(stage: PerformanceStage) {
  return {
    hook: '셀카/핸드폰 흔들림으로 광고 아닌 느낌을 만든다',
    scroll_stop: '실제 대시보드 경고처럼 보여 손실감을 만든다',
    proof: '차트와 비교 화면으로 운영자가 직접 확인하는 느낌을 준다',
    twist: '댓글/DM/알림처럼 시장 반응의 날것을 보여준다',
    cta: '테스트 실행 직전 화면처럼 즉시 행동감을 만든다',
  }[stage];
}

function pacingNoteForFormat(contentFormat: ContentFormat) {
  if (contentFormat === 'longform') return '3-5초마다 패턴 인터럽트';
  if (contentFormat === 'landscape') return '2-3초 단위 컷, 자막 밀도 낮게';
  return '1.2-2.2초 컷, 질문 뒤 바로 하드컷';
}

function defaultEffectsForStage(stage: PerformanceStage): ShortScene['effects'] {
  if (stage === 'hook') return [{ type: 'shake', at: 0 }, { type: 'zoom', at: 0.4 }, { type: 'snap', at: 0.9 }];
  if (stage === 'scroll_stop') return [{ type: 'x-mark', at: 0.2 }, { type: 'shake', at: 0.8 }];
  if (stage === 'proof') return [{ type: 'highlight', at: 0.3 }, { type: 'check', at: 1 }];
  if (stage === 'twist') return [{ type: 'snap', at: 0.2 }, { type: 'zoom', at: 0.9 }];
  return [{ type: 'check', at: 0.2 }, { type: 'snap', at: 1 }];
}

function buildContentQualityMeta(scenes: ShortScene[]) {
  return {
    hookDbApplied: true,
    sourceSelection: 'raw-operator-footage-first',
    voiceDirection: 'fast-real-operator-not-commercial-VO',
    pacing: '1.2-2.2s-reels-cuts',
    averageHookScore: averageScore(scenes.map((scene) => scene.hook_score)),
    averageThumbstopScore: averageScore(scenes.map((scene) => scene.thumbstop_score)),
  };
}

function averageScore(scores: Array<number | undefined>) {
  const values = scores.filter((score): score is number => typeof score === 'number' && Number.isFinite(score));
  if (!values.length) return null;
  return Number((values.reduce((sum, score) => sum + score, 0) / values.length).toFixed(1));
}

export function normalizeFormatSettings(input: Partial<ContentFormatSettings> | undefined): ContentFormatSettings {
  const contentFormat = input?.contentFormat && CONTENT_FORMATS.includes(input.contentFormat)
    ? input.contentFormat
    : contentFormatFromAspectRatio(input?.aspectRatio);
  const defaults = defaultFormatSettings(contentFormat);
  const aspectRatio = input?.aspectRatio && ASPECT_RATIOS.includes(input.aspectRatio)
    ? input.aspectRatio
    : defaults.aspectRatio;
  const targetDurationSeconds = clampNumber(
    input?.targetDurationSeconds,
    defaults.targetDurationSeconds,
    contentFormat === 'longform' ? 45 : 12,
    contentFormat === 'longform' ? 180 : 40,
  );
  const sceneCount = clampNumber(
    input?.sceneCount,
    defaults.sceneCount,
    contentFormat === 'longform' ? 7 : 4,
    contentFormat === 'longform' ? 14 : 7,
  );

  return {
    contentFormat,
    aspectRatio,
    targetDurationSeconds,
    sceneCount,
  };
}

export function defaultFormatSettings(contentFormat: ContentFormat): ContentFormatSettings {
  if (contentFormat === 'square') {
    return { contentFormat, aspectRatio: '1:1', targetDurationSeconds: 20, sceneCount: 5 };
  }
  if (contentFormat === 'landscape') {
    return { contentFormat, aspectRatio: '16:9', targetDurationSeconds: 30, sceneCount: 6 };
  }
  if (contentFormat === 'longform') {
    return { contentFormat, aspectRatio: '16:9', targetDurationSeconds: 90, sceneCount: 10 };
  }
  return { contentFormat: 'reels', aspectRatio: '9:16', targetDurationSeconds: 12, sceneCount: 6 };
}

function contentFormatFromAspectRatio(aspectRatio: AspectRatio | undefined): ContentFormat {
  if (aspectRatio === '1:1') return 'square';
  if (aspectRatio === '16:9') return 'landscape';
  return 'reels';
}

function clampNumber(value: number | undefined, fallback: number, min: number, max: number) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, Math.round(value)));
}

function clampDecimal(value: number | undefined, fallback: number, min: number, max: number) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return fallback;
  return Number(Math.min(max, Math.max(min, value)).toFixed(1));
}
