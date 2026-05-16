export type RenderProvider = 'aws-remotion';
export type RenderJobStatus = 'queued' | 'rendering' | 'finalizing' | 'succeeded' | 'failed' | 'canceled';
export type RenderJobPhase =
  | 'queued'
  | 'invoking_lambda'
  | 'rendering'
  | 'uploading_output'
  | 'completed'
  | 'failed';

export type OpenAIBillingMode = 'payg' | 'budget_cap';

export type OpenAIModel = 'gpt-5.4-mini' | 'gpt-5.4' | (string & {});

export type ScriptTone = 'hype' | 'professional' | 'minimalist';
export type ShotType = 'dashboard' | 'phone' | 'workflow' | 'proof' | 'cta';
export type TtsVoiceRole = 'hook' | 'authority' | 'cta';
export type AspectRatio = '9:16' | '1:1' | '16:9';
export type ContentFormat = 'reels' | 'square' | 'landscape' | 'longform';
export type CreativeStyle = 'ugc' | 'influencer' | 'pov' | 'testimonial' | 'native' | 'shortform';
export type PerformanceStage = 'hook' | 'scroll_stop' | 'proof' | 'twist' | 'cta';
export type RawMaterialKind = 'video' | 'image' | 'audio' | 'text' | 'screenshot' | 'brand';
export type CreativeAssetRole = 'hook' | 'problem' | 'proof' | 'solution' | 'cta' | 'rebuttal';
export type BatchCandidateStatus = 'pass' | 'review' | 'fail';

export interface ContentFormatSettings {
  contentFormat: ContentFormat;
  aspectRatio: AspectRatio;
  targetDurationSeconds: number;
  sceneCount: number;
}

export interface CustomerBrief {
  brand: string;
  industry: string;
  goal: string;
  targetAudience: string;
  offer: string;
  painPoint: string;
  tone: string;
  creativeStyle: CreativeStyle;
  cta: string;
  channel: string;
  constraints?: string;
  proofPoints?: string[];
  forbiddenTerms?: string[];
  referenceLinks?: string[];
  locale?: string;
}

export type CustomerBriefRequiredField =
  | 'brand'
  | 'industry'
  | 'goal'
  | 'targetAudience'
  | 'offer'
  | 'painPoint'
  | 'tone'
  | 'creativeStyle'
  | 'cta'
  | 'channel';

export interface MissingFieldQuestion {
  key: CustomerBriefRequiredField;
  label: string;
  question: string;
  placeholder: string;
  required: true;
}

export interface GenerateScriptRequest {
  prompt?: string;
  brief: CustomerBrief;
  templateId?: 'problem-solution-reels';
  format?: Partial<ContentFormatSettings>;
}

export interface NeedCustomerBriefInputResponse {
  status: 'need_input';
  message: string;
  missing_fields: CustomerBriefRequiredField[];
  questions: MissingFieldQuestion[];
}

export interface RawMaterial {
  id: string;
  kind: RawMaterialKind;
  role: CreativeAssetRole;
  label: string;
  source: 'local' | 'remote' | 'generated' | 'customer';
  tags: string[];
  uri?: string;
  durationSeconds?: number;
  aspectRatio?: AspectRatio;
  language?: string;
  license?: string;
  origin?: string;
}

export interface RecipeStep {
  role: CreativeAssetRole;
  requiredKinds: RawMaterialKind[];
  tags: string[];
  visualDirection: string;
  copyDirection: string;
}

export interface RecipePreset {
  id: string;
  name: string;
  creativeStyle: CreativeStyle;
  contentFormat: ContentFormat;
  sceneCount: number;
  steps: RecipeStep[];
}

export interface BatchCreativeAngle {
  id: string;
  hookType: string;
  problemFrame: string;
  proofFrame: string;
  ctaFrame: string;
  promptSeed: string;
  tags: string[];
}

export interface BatchGenerationSettings {
  candidateCount: number;
  promoteCount: number;
  maxConcurrency?: number;
  dryRun?: boolean;
}

export interface BatchGenerationRequest extends GenerateScriptRequest {
  batch?: Partial<BatchGenerationSettings>;
  rawMaterials?: RawMaterial[];
}

export interface BatchCandidateResult {
  id: string;
  index: number;
  angle: BatchCreativeAngle;
  script?: ScriptGenerationResult;
  qa?: CreativeQaMeta;
  status: BatchCandidateStatus;
  promoted: boolean;
  duplicateGroupId?: string;
  reasons: string[];
}

export interface BatchGenerationResponse {
  status: 'ready' | 'dry_run';
  batch: BatchGenerationSettings;
  recipe: RecipePreset;
  rawMaterialSummary: {
    total: number;
    byRole: Record<CreativeAssetRole, number>;
    byKind: Record<RawMaterialKind, number>;
  };
  candidates: BatchCandidateResult[];
  promoted: BatchCandidateResult[];
  summary: {
    total: number;
    pass: number;
    review: number;
    fail: number;
    duplicates: number;
    promoted: number;
  };
}

export interface ShortScene {
  text: string;
  voiceover: string;
  visual_search: string;
  duration: number;
  shot_type: ShotType;
  performance_stage?: PerformanceStage;
  hook_score?: number;
  thumbstop_score?: number;
  market_emotion?: string;
  target_reaction?: string;
  visual_source_intent?: string;
  pacing_note?: string;
  tts_direction?: string;
  proof_overlay?: string;
  audio_asset?: string;
  tts_voice_role?: TtsVoiceRole;
  topic?: string;
  subtitle_steps?: string[];
  subtitle_cues?: Array<{
    text: string;
    at: number;
  }>;
  effects?: Array<{
    type: 'x-mark' | 'snap' | 'zoom' | 'shake' | 'check' | 'highlight';
    at: number;
  }>;
}

export interface ShortScript {
  title: string;
  hook: string;
  full_script: string;
  scenes: ShortScene[];
}

export interface ResolvedScene extends ShortScene {
  asset_url?: string;
}

export interface RenderableShortScript extends Omit<ShortScript, 'scenes'> {
  scenes: ResolvedScene[];
}

export interface GenerationSettings {
  scriptTone: ScriptTone;
  voiceId: string;
  aspectRatio: AspectRatio;
  batchSize: 1 | 5 | 10 | 20;
  renderProvider: RenderProvider;
  openAiModel: OpenAIModel;
  openAiBillingMode: OpenAIBillingMode;
  monthlyBudgetUsd?: number;
  mode?: 'draft' | 'final';
  approvedFinalRender?: boolean;
}

export interface OpenAIUsageMeta {
  model: OpenAIModel;
  billingMode: OpenAIBillingMode;
  requestCostUsd: number;
  monthTotalUsd: number;
  remainingBudgetUsd: number | null;
  budgetExceeded: boolean;
}

export interface CreativeQaMeta {
  score: number;
  status: 'pass' | 'review' | 'fail';
  checks: Array<{
    id: string;
    label: string;
    passed: boolean;
    detail: string;
  }>;
  recommendations: string[];
}

export interface ScriptGenerationResult extends ShortScript {
  _meta?: {
    openai?: OpenAIUsageMeta;
    qa?: CreativeQaMeta;
    tts?: TtsPreprocessResult;
    contentQuality?: {
      hookDbApplied: boolean;
      sourceSelection: string;
      voiceDirection: string;
      pacing: string;
      averageHookScore: number | null;
      averageThumbstopScore: number | null;
    };
    customer?: {
      brief: CustomerBrief;
      templateId: string;
      prompt?: string;
      format: ContentFormatSettings;
    };
  };
}

export interface TtsPreprocessOptions {
  maxLineLength?: number;
  pauseCue?: 'line-break' | 'bracket';
  deliveryStyle?: 'operator' | 'commercial';
}

export interface TtsPreprocessResult {
  original: string;
  text: string;
  lines: string[];
  pauseCount: number;
  estimatedSeconds: number;
}

export interface RenderJob {
  id: string;
  provider: RenderProvider;
  status: RenderJobStatus;
  phase?: RenderJobPhase;
  progress?: number;
  runId?: string;
  remotionRenderId?: string;
  bucketName?: string;
  functionName?: string;
  region?: string;
  url?: string;
  outputKey?: string;
  outputSizeInBytes?: number;
  error?: string;
  retryable?: boolean;
  attempt?: number;
  cacheKey?: string;
  estimatedCostUsd?: number;
  actualCostUsd?: number;
  lambdaDurationMs?: number;
  memoryMb?: number;
  storageBytes?: number;
  createdAt?: string;
  startedAt?: string;
  completedAt?: string;
  failedAt?: string;
  logs?: {
    cloudWatch?: string;
    cloudWatchMain?: string;
    lambdaInsights?: string;
    s3Folder?: string;
    progressJson?: string;
  };
  updatedAt: string;
}
