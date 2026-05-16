import type { ContentFormatSettings, CreativeQaMeta, CustomerBrief, ShortScript, ShotType } from '@/lib/types';

const REQUIRED_SHOT_TYPES: ShotType[] = ['dashboard', 'phone', 'workflow', 'proof', 'cta'];
const OFFICIAL_VISIBLE_TERMS = [
  'Meta 광고',
  '광고 관리자',
  'Meta Pixel',
  'Conversions API',
  '이벤트',
  '전환',
  '웹사이트',
  '판매',
  'ROAS',
];

export function runCreativeQa(script: ShortScript & { _meta?: { customer?: { brief: CustomerBrief; format?: ContentFormatSettings } } }): CreativeQaMeta {
  const customerBrief = script._meta?.customer?.brief;
  const format = script._meta?.customer?.format;
  const targetRuntime = format?.targetDurationSeconds ?? 18;
  const expectedSceneCount = format?.sceneCount ?? 5;
  const runtimeMin = Math.max(8, Math.round(targetRuntime * 0.72));
  const runtimeMax = Math.round(targetRuntime * 1.28);
  const ctaPattern = customerBrief
    ? new RegExp(escapeRegex(customerBrief.cta), 'i')
    : /hi-ob\.com|히옵|무료 상담|상담 신청/;
  const proofTerms = customerBrief?.proofPoints?.length ? customerBrief.proofPoints : OFFICIAL_VISIBLE_TERMS;
  const checks = [
    {
      id: 'scene-count',
      label: 'Format scene structure',
      passed: script.scenes.length === expectedSceneCount,
      detail: `${script.scenes.length}/${expectedSceneCount} scenes generated`,
    },
    {
      id: 'shot-types',
      label: 'Required visual beats',
      passed: hasRequiredShotFlow(script.scenes.map((scene) => scene.shot_type)),
      detail: script.scenes.map((scene) => scene.shot_type).join(' -> '),
    },
    {
      id: 'cta',
      label: 'Clear customer CTA',
      passed: ctaPattern.test(`${script.full_script} ${script.scenes.at(-1)?.text ?? ''}`),
      detail: script.scenes.at(-1)?.text ?? 'Missing final scene',
    },
    {
      id: 'pronunciation',
      label: 'Korean pronunciation guard',
      passed: !/(알오에이에스|하이\s?옵|씨에이피아이)/.test(script.full_script),
      detail: 'Blocks common Korean TTS misreadings',
    },
    {
      id: 'proof',
      label: 'Customer proof or reason to believe',
      passed: customerBrief?.proofPoints?.length
        ? proofTerms.some((term) => script.scenes.some((scene) => scene.proof_overlay?.includes(term)))
        : script.scenes.some((scene) => Boolean(scene.proof_overlay?.trim())),
      detail: script.scenes.map((scene) => scene.proof_overlay).filter(Boolean).join(', '),
    },
    {
      id: 'mobile-copy',
      label: 'Mobile-safe visible copy',
      passed: script.scenes.every((scene) => scene.text.length <= 18),
      detail: `${Math.max(...script.scenes.map((scene) => scene.text.length))} chars max`,
    },
    {
      id: 'runtime-target',
      label: 'Format runtime target',
      passed: getRuntimeSeconds(script) >= runtimeMin && getRuntimeSeconds(script) <= runtimeMax,
      detail: `${getRuntimeSeconds(script).toFixed(1)}s scripted scene duration`,
    },
    {
      id: 'no-face',
      label: 'Faceless creative direction',
      passed: script.scenes.every((scene) => /no face|dashboard|phone|laptop|screen|document|workspace/i.test(scene.visual_search)),
      detail: 'Checks visual search prompts for faceless B-roll direction',
    },
  ];
  const passedCount = checks.filter((check) => check.passed).length;
  const score = Math.round((passedCount / checks.length) * 100);

  return {
    score,
    status: score >= 88 ? 'pass' : score >= 70 ? 'review' : 'fail',
    checks,
    recommendations: getRecommendations(checks),
  };
}

function getRuntimeSeconds(script: ShortScript) {
  return script.scenes.reduce((total, scene) => total + scene.duration, 0);
}

function hasRequiredShotFlow(shotTypes: ShotType[]) {
  if (shotTypes[0] !== 'dashboard') return false;
  if (shotTypes.at(-1) !== 'cta') return false;
  return REQUIRED_SHOT_TYPES.slice(1, -1).every((shotType) => shotTypes.includes(shotType));
}

function getRecommendations(checks: Array<{ id: string; passed: boolean }>) {
  return checks
    .filter((check) => !check.passed)
    .map((check) => {
      switch (check.id) {
        case 'mobile-copy':
          return 'Shorten visible text so each scene can be read in one glance on Reels.';
        case 'runtime-target':
          return 'Keep the script around 15-20 seconds, but never cut off the voiceover.';
        case 'pronunciation':
          return 'Regenerate or edit the script so voiceover uses 히옵, 로아스, 전환 API, 픽셀.';
        case 'cta':
          return 'End with the customer CTA from the brief.';
        default:
          return 'Review this creative requirement before rendering.';
      }
    });
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
