import { runCreativeQa } from '@/lib/creative-qa';
import { normalizeKoreanAdTerms } from '@/lib/tts-preprocessor';
import type {
  BatchCandidateResult,
  BatchCandidateStatus,
  BatchCreativeAngle,
  ScriptGenerationResult,
} from '@/lib/types';

export interface BatchCreativeQaInput {
  id: string;
  index: number;
  angle: BatchCreativeAngle;
  script: ScriptGenerationResult;
}

export interface BatchCreativeQaOptions {
  promoteCount?: number;
  includeReviewPromotion?: boolean;
}

export interface BatchCreativeQaResult {
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

const STATUS_PRIORITY: Record<BatchCandidateStatus, number> = {
  pass: 2,
  review: 1,
  fail: 0,
};

export function normalizeBatchCreativeScript(script: ScriptGenerationResult): ScriptGenerationResult {
  return {
    ...script,
    title: normalizeKoreanAdTerms(script.title),
    hook: normalizeKoreanAdTerms(script.hook),
    full_script: normalizeKoreanAdTerms(script.full_script),
    scenes: script.scenes.map((scene) => ({
      ...scene,
      text: normalizeKoreanAdTerms(scene.text),
      voiceover: normalizeKoreanAdTerms(scene.voiceover),
      proof_overlay: scene.proof_overlay ? normalizeKoreanAdTerms(scene.proof_overlay) : scene.proof_overlay,
      topic: scene.topic ? normalizeKoreanAdTerms(scene.topic) : scene.topic,
      subtitle_steps: scene.subtitle_steps?.map((step) => normalizeKoreanAdTerms(step)),
      subtitle_cues: scene.subtitle_cues?.map((cue) => ({
        ...cue,
        text: normalizeKoreanAdTerms(cue.text),
      })),
    })),
  };
}

export function runBatchCreativeQa(
  inputs: BatchCreativeQaInput[],
  options: BatchCreativeQaOptions = {},
): BatchCreativeQaResult {
  const evaluated = inputs.map((input) => buildBatchCreativeCandidate(input));
  const deduped = dedupeBatchCreativeQaCandidates(evaluated);
  const promoted = promoteBatchCreativeQaCandidates(deduped, options.promoteCount, {
    includeReviewPromotion: options.includeReviewPromotion ?? true,
  });

  return {
    candidates: promoted,
    promoted: promoted.filter((candidate) => candidate.promoted),
    summary: summarizeBatchCreativeQaCandidates(promoted),
  };
}

export function dedupeBatchCreativeQaCandidates(candidates: BatchCandidateResult[]) {
  const seen = new Map<string, { id: string; groupId: string }>();

  return candidates.map((candidate) => {
    const fingerprint = buildCreativeFingerprint(candidate.script);
    const existing = seen.get(fingerprint);

    if (!existing) {
      seen.set(fingerprint, {
        id: candidate.id,
        groupId: hashSignature(fingerprint),
      });
      return candidate;
    }

    return {
      ...candidate,
      duplicateGroupId: existing.groupId,
      promoted: false,
      reasons: uniqueStrings([
        ...candidate.reasons,
        `Duplicate of ${existing.id}`,
      ]),
    };
  });
}

export function promoteBatchCreativeQaCandidates(
  candidates: BatchCandidateResult[],
  promoteCount = candidates.length,
  options: { includeReviewPromotion?: boolean } = {},
) {
  const promoteLimit = clampPositiveInteger(promoteCount, candidates.length);
  const allowReviewPromotion = options.includeReviewPromotion ?? true;

  const promotable = candidates
    .filter((candidate) => !candidate.duplicateGroupId)
    .filter((candidate) => candidate.status === 'pass' || (allowReviewPromotion && candidate.status === 'review'))
    .slice()
    .sort(comparePromotionPriority)
    .slice(0, promoteLimit);

  const promotedIds = new Set(promotable.map((candidate) => candidate.id));

  return candidates.map((candidate) => ({
    ...candidate,
    promoted: promotedIds.has(candidate.id),
  }));
}

function buildBatchCreativeCandidate(input: BatchCreativeQaInput): BatchCandidateResult {
  const normalizedScript = normalizeBatchCreativeScript(input.script);
  const qa = runCreativeQa(normalizedScript);

  return {
    id: input.id,
    index: input.index,
    angle: input.angle,
    script: input.script,
    qa,
    status: qa.status,
    promoted: false,
    reasons: qa.recommendations.slice(),
  };
}

function summarizeBatchCreativeQaCandidates(candidates: BatchCandidateResult[]) {
  return {
    total: candidates.length,
    pass: candidates.filter((candidate) => candidate.status === 'pass').length,
    review: candidates.filter((candidate) => candidate.status === 'review').length,
    fail: candidates.filter((candidate) => candidate.status === 'fail').length,
    duplicates: candidates.filter((candidate) => Boolean(candidate.duplicateGroupId)).length,
    promoted: candidates.filter((candidate) => candidate.promoted).length,
  };
}

function comparePromotionPriority(left: BatchCandidateResult, right: BatchCandidateResult) {
  const duplicatePenalty = Number(Boolean(left.duplicateGroupId)) - Number(Boolean(right.duplicateGroupId));
  if (duplicatePenalty !== 0) return duplicatePenalty;

  const statusPriority = STATUS_PRIORITY[right.status] - STATUS_PRIORITY[left.status];
  if (statusPriority !== 0) return statusPriority;

  const scoreDifference = (right.qa?.score ?? 0) - (left.qa?.score ?? 0);
  if (scoreDifference !== 0) return scoreDifference;

  return left.index - right.index || left.id.localeCompare(right.id);
}

function buildCreativeFingerprint(script: ScriptGenerationResult | undefined) {
  if (!script) return '';

  const normalized = normalizeBatchCreativeScript(script);
  const parts = [
    normalized.title,
    normalized.hook,
    normalized.full_script,
    String(normalized.scenes.length),
    ...normalized.scenes.map((scene) =>
      [
        scene.shot_type,
        scene.text,
        scene.voiceover,
        scene.proof_overlay ?? '',
        scene.topic ?? '',
        String(scene.duration),
      ].join('|'),
    ),
  ];

  return parts
    .join('||')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function hashSignature(value: string) {
  let hash = 5381;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 33) ^ value.charCodeAt(index);
  }

  return `dup-${(hash >>> 0).toString(36)}`;
}

function clampPositiveInteger(value: number, fallback: number) {
  if (!Number.isFinite(value)) return fallback;

  return Math.max(0, Math.floor(value));
}

function uniqueStrings(values: string[]) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}
