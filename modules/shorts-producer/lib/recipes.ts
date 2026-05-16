import type {
  BatchCreativeAngle,
  BatchGenerationResponse,
  ContentFormat,
  CreativeAssetRole,
  CreativeStyle,
  CustomerBrief,
  RawMaterial,
  RawMaterialKind,
  RecipePreset,
  RecipeStep,
} from '@/lib/types';

const CREATIVE_ASSET_ROLES: CreativeAssetRole[] = ['hook', 'problem', 'proof', 'solution', 'cta', 'rebuttal'];
const RAW_MATERIAL_KINDS: RawMaterialKind[] = ['video', 'image', 'audio', 'text', 'screenshot', 'brand'];

const PROBLEM_SOLUTION_REELS_STEPS: RecipeStep[] = [
  {
    role: 'hook',
    requiredKinds: ['video', 'screenshot'],
    tags: ['hook', 'problem', 'loss'],
    visualDirection: 'Open with the clearest problem signal first: a dashboard, screen, or customer moment.',
    copyDirection: 'State the pain in one short line and make the cost feel immediate.',
  },
  {
    role: 'problem',
    requiredKinds: ['video', 'image', 'text'],
    tags: ['problem', 'symptom', 'friction'],
    visualDirection: 'Show the broken workflow, mismatch, or gap the customer already feels.',
    copyDirection: 'Describe what is going wrong without overexplaining it.',
  },
  {
    role: 'proof',
    requiredKinds: ['screenshot', 'image', 'video', 'brand'],
    tags: ['proof', 'evidence', 'signal'],
    visualDirection: 'Use visible proof, screenshots, numbers, or evidence that supports the diagnosis.',
    copyDirection: 'Move from claim to evidence with a calm, credible tone.',
  },
  {
    role: 'solution',
    requiredKinds: ['video', 'image', 'screenshot'],
    tags: ['solution', 'process', 'workflow'],
    visualDirection: 'Show the fix as a clear process, pipeline, or improved state.',
    copyDirection: 'Explain the improvement in simple steps the viewer can follow.',
  },
  {
    role: 'cta',
    requiredKinds: ['text', 'brand'],
    tags: ['cta', 'next step', 'conversion'],
    visualDirection: 'End on a direct action, branded end card, or final confirmation state.',
    copyDirection: 'Ask for the next step with no extra clutter.',
  },
];

const PROBLEM_SOLUTION_REELS_RECIPE: RecipePreset = {
  id: 'problem-solution-reels',
  name: 'Problem/Solution Reels',
  creativeStyle: 'shortform',
  contentFormat: 'reels',
  sceneCount: 5,
  steps: PROBLEM_SOLUTION_REELS_STEPS,
};

const RECIPE_PRESETS: Record<string, RecipePreset> = {
  [PROBLEM_SOLUTION_REELS_RECIPE.id]: PROBLEM_SOLUTION_REELS_RECIPE,
};

export function getRecipePreset(
  templateId: string = PROBLEM_SOLUTION_REELS_RECIPE.id,
  options: {
    creativeStyle?: CreativeStyle;
    contentFormat?: ContentFormat;
    sceneCount?: number;
  } = {},
): RecipePreset {
  const preset = RECIPE_PRESETS[templateId] ?? PROBLEM_SOLUTION_REELS_RECIPE;

  return {
    ...preset,
    creativeStyle: options.creativeStyle ?? preset.creativeStyle,
    contentFormat: options.contentFormat ?? preset.contentFormat,
    sceneCount: options.sceneCount ?? preset.sceneCount,
  };
}

export function summarizeRawMaterials(rawMaterials: RawMaterial[]): BatchGenerationResponse['rawMaterialSummary'] {
  const summary = {
    total: rawMaterials.length,
    byRole: createCountMap(CREATIVE_ASSET_ROLES),
    byKind: createCountMap(RAW_MATERIAL_KINDS),
  };

  for (const material of rawMaterials) {
    summary.byRole[material.role] += 1;
    summary.byKind[material.kind] += 1;
  }

  return summary;
}

export function buildBatchCreativeAngles(input: {
  brief: CustomerBrief;
  recipe: RecipePreset;
  rawMaterials: RawMaterial[];
  candidateCount: number;
}): BatchCreativeAngle[] {
  const materialTags = input.rawMaterials.flatMap((material) => material.tags).filter(Boolean);
  const materialLabelsByRole = groupMaterialLabelsByRole(input.rawMaterials);

  return Array.from({ length: input.candidateCount }, (_, index) => {
    const hookType = pickByIndex(HOOK_TYPES, index);
    const problemFrame = pickByIndex(PROBLEM_FRAMES, index + Math.floor(index / HOOK_TYPES.length));
    const proofFrame = pickByIndex(PROOF_FRAMES, index + Math.floor(index / PROBLEM_FRAMES.length));
    const ctaFrame = pickByIndex(CTA_FRAMES, index + Math.floor(index / PROOF_FRAMES.length));
    const recipeStep = input.recipe.steps[index % input.recipe.steps.length];
    const tags = uniqueStrings([
      input.brief.creativeStyle,
      input.recipe.contentFormat,
      hookType,
      problemFrame,
      proofFrame,
      ...recipeStep.tags,
      ...materialTags.slice(index % Math.max(materialTags.length, 1), index % Math.max(materialTags.length, 1) + 3),
    ]);

    return {
      id: `angle-${String(index + 1).padStart(2, '0')}`,
      hookType,
      problemFrame,
      proofFrame,
      ctaFrame,
      tags,
      promptSeed: buildPromptSeed({
        brief: input.brief,
        recipe: input.recipe,
        recipeStep,
        materialLabelsByRole,
        hookType,
        problemFrame,
        proofFrame,
        ctaFrame,
        index,
      }),
    };
  });
}

function buildPromptSeed(input: {
  brief: CustomerBrief;
  recipe: RecipePreset;
  recipeStep: RecipeStep;
  materialLabelsByRole: Record<CreativeAssetRole, string[]>;
  hookType: string;
  problemFrame: string;
  proofFrame: string;
  ctaFrame: string;
  index: number;
}) {
  const materialLines = CREATIVE_ASSET_ROLES
    .map((role) => {
      const labels = input.materialLabelsByRole[role];
      if (!labels.length) return undefined;
      return `- ${role}: ${labels.slice(0, 4).join(', ')}`;
    })
    .filter(Boolean)
    .join('\n');

  return `
Batch creative angle #${input.index + 1}
- Hook type: ${input.hookType}
- Problem frame: ${input.problemFrame}
- Proof frame: ${input.proofFrame}
- CTA frame: ${input.ctaFrame}
- Recipe role emphasis: ${input.recipeStep.role}
- Visual direction: ${input.recipeStep.visualDirection}
- Copy direction: ${input.recipeStep.copyDirection}
- Customer pain: ${input.brief.painPoint}
- Customer offer: ${input.brief.offer}
- Available raw materials:
${materialLines || '- No raw materials provided. Use the brief and avoid inventing proof.'}

Make this candidate meaningfully different from the others while staying inside the same customer settings.
  `.trim();
}

function groupMaterialLabelsByRole(rawMaterials: RawMaterial[]) {
  const grouped = createCountMap(CREATIVE_ASSET_ROLES) as unknown as Record<CreativeAssetRole, string[]>;

  for (const role of CREATIVE_ASSET_ROLES) {
    grouped[role] = [];
  }

  for (const material of rawMaterials) {
    grouped[material.role].push(material.label);
  }

  return grouped;
}

function pickByIndex(values: string[], index: number) {
  return values[index % values.length];
}

function uniqueStrings(values: string[]) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function createCountMap<T extends string>(values: readonly T[]) {
  return values.reduce((counts, value) => {
    counts[value] = 0;
    return counts;
  }, {} as Record<T, number>);
}

const HOOK_TYPES = [
  'loss-aversion',
  'contrarian-question',
  'before-after-gap',
  'viewer-callout',
  'silent-proof-first',
  'myth-busting',
  'mistake-alert',
  'fast-result-preview',
];

const PROBLEM_FRAMES = [
  'hidden waste',
  'manual bottleneck',
  'trust gap',
  'missed timing',
  'wrong audience assumption',
  'low signal quality',
  'conversion friction',
  'competitor comparison',
];

const PROOF_FRAMES = [
  'customer evidence',
  'process proof',
  'screen proof',
  'social proof',
  'expert diagnosis',
  'risk reversal',
  'specific checklist',
  'measurable before-after',
];

const CTA_FRAMES = [
  'free diagnosis',
  'low-friction consultation',
  'limited audit slot',
  'send material first',
  'book a demo',
  'request checklist',
];
