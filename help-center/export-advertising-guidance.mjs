// Export a bounded server brief from the same content as the public manual.
// Usage: node help-center/export-advertising-guidance.mjs <Studio data JSON path>
import { writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import vault from './src/creativeVault.generated.json' with {type:'json'};
import { resolve } from 'node:path';
import { playbook, markdownPath, playbookMarkdown } from './src/advertisingPlaybook.mjs';
const destination = process.argv[2];
if (!destination || !destination.endsWith('/data/advertising-guide.json')) throw new Error('Expected an explicit Studio data/advertising-guide.json output path');
const brief = {
  schema: 'HiobAdvertisingGuide.v1', version: playbook.version, reviewedFor: playbook.reviewedFor,
  pageUrl: 'https://hi-ob.com/help/advertising', markdownUrl: 'https://hi-ob.com' + markdownPath,
  contentSha256: createHash('sha256').update(playbookMarkdown()).digest('hex'),
  beforePlanning: '광고 제작 전에 이 설명서의 순서와 프롬프트를 참고하세요. 아래는 웹 접근이 없는 AI를 위한 핵심 안내입니다. 실제 도구 스키마·지원 범위·사용자 선택·권한이 우선합니다. 문서 제공만으로 AI 준수나 광고 성과가 보장되지 않습니다.',
  masterPrompt: playbook.masterPrompt,
  workflow: playbook.steps.map(s => ({ id: s.id, title: s.title, input: s.input, output: s.output, acceptance: s.pass, repair: s.repair })),
  promptTemplates: Object.fromEntries(playbook.steps.filter(s => ['brief', 'script', 'cast', 'props'].includes(s.id)).map(s => [s.id, s.prompt])),
  creativeVault: {version: vault.version, sha256: vault.sha256, pageUrl: vault.pageUrl,
    minimumMcpVersion: '0.9.5', read: vault.read,
    principle: '3–5초 의미 묶음과 내부 편집 컷, 5–15초 생성 원본을 구분한다. 실제 발화와 제품 동작에 따라 예외를 기록한다.',
    fallback: 'creative_vault 도구가 없으면 pageUrl의 공개 본문을 읽는다.'},
  providerCall: 'none'
};
await writeFile(resolve(destination), JSON.stringify(brief, null, 2) + '\n');
process.stdout.write(`Exported ${brief.version}; content ${brief.contentSha256}\n`);
