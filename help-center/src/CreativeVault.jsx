import vault from './creativeVault.generated.json';
const noteNames = new Set(vault.notes.map(n => n.file));
// Deliberately small, escaped renderer for first-party Markdown. No raw HTML.
function inline(text) {
  const parts = []; let offset = 0;
  for (const match of text.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)) {
    parts.push(text.slice(offset,match.index));
    const href = noteNames.has(match[2]) ? vault.noteBase+match[2] : /^https:\/\//.test(match[2]) ? match[2] : null;
    parts.push(href ? <a key={match.index} href={href}>{match[1]}</a> : match[1]);
    offset = match.index+match[0].length;
  }
  parts.push(text.slice(offset)); return parts;
}
function Note({text}) {
  const lines = text.replace(/^---\n[\s\S]*?\n---\n/,'').trim().split('\n');
  const blocks=[];
  for(let i=0;i<lines.length;) {
    const line=lines[i];
    if (!line.trim() || line.startsWith('# ')) {i++; continue;}
    if (line.startsWith('## ')) {blocks.push(<h3 key={i}>{inline(line.slice(3))}</h3>); i++; continue;}
    const key=i;
    if (/^(- |\d+\. )/.test(line)) {
      const ordered=/^\d+\. /.test(line), pattern=ordered?/^\d+\. /:/^- /, items=[];
      while(i<lines.length && pattern.test(lines[i])) {items.push(<li key={i}>{inline(lines[i].replace(pattern,''))}</li>);i++;}
      blocks.push(ordered?<ol key={key}>{items}</ol>:<ul key={key}>{items}</ul>);continue;
    }
    const paragraph=[];
    while(i<lines.length && lines[i].trim() && !/^(# |## |- |\d+\. )/.test(lines[i])) {paragraph.push(lines[i]);i++;}
    blocks.push(<p key={key}>{inline(paragraph.join(' '))}</p>);
  }
  return blocks;
}
export default function CreativeVault({Command}) {
  return <>
    <p>같은 소재라도 어디서 자르고, 언제 말하고, 무엇을 보여주느냐에 따라 광고가 달라집니다. HIOB 브레인과 이전 제작의 실패·수정 기록을 상황별 노트로 묶었습니다.</p>
    <p><strong>Vault {vault.version} · 12개 노트</strong> · <a href={vault.downloadPath}>전체 Vault ZIP 다운로드</a> · <a href="/help/advertising">처음부터 광고 만드는 사용설명서</a></p>
    <h2>핵심: 3–5초 안에 하나의 의미를 완결하기</h2>
    <p>3–5초는 장면 묶음의 기본 설계 단위입니다. 그 안에서 손→제품→반응으로 컷을 나누고 나레이터의 문장은 이어갈 수 있습니다. 실제 발화·제품 작동·자막 읽기에 필요한 시간에 맞춰 조정합니다.</p>
    <dl><dt>의미 묶음</dt><dd>질문·행동·납득 중 한 가지를 완결합니다. 3–5초부터 설계합니다.</dd><dt>편집 컷</dt><dd>묶음 안에서 시점·정보·행동이 바뀌는 구간입니다. 같은 길이로 자르지 않습니다.</dd><dt>생성 원본</dt><dd>현재 H3·Seedance 경로의 5–15초 소재입니다. 필요한 구간을 골라 쓰므로 묶음 수만큼 생성하지 않습니다.</dd></dl>
    <h2>AI가 필요한 노트를 읽게 하기</h2>
    <p>MCP 0.9.6의 첫 project_context는 12개 노트 전문을 모두 전달합니다. 전체 문서 전달 전에는 기획·생성·편집·렌더를 실행할 수 없습니다. 같은 세션에서는 반복 전송하지 않으며 새 세션·프로젝트에서는 다시 전달합니다. creative_vault 도구는 이후 개별 노트 재조회에 사용합니다. Obsidian은 선택 사항이며 새 유료 생성이나 권한을 요구하지 않습니다. 기존 버전은 아래 웹 문서로도 읽을 수 있습니다.</p>
    <Command prompt label="Vault 기반 제작 요청 복사" text={'HIOB 제작 Vault를 적용해줘. project_context의 creativeVault.notes에 있는 12개 노트 전문을 먼저 모두 읽어. 이후 creative_vault로 현재 문제에 맞는 topic을 다시 확인해. 도구가 없는 버전이면 https://hi-ob.com/help/creative-vault 의 노트를 읽어. 대본을 3–5초 의미 묶음으로 설계하고 내부 컷·실제 발화·생성 원본을 구분해. 각 묶음의 새 정보, 시작→변화→끝, 소리 연결, 제품 근거, 적용한 규칙과 예외 이유를 기록해. 실제 스키마와 기존 권한·예산을 따르고 변경 없는 소재를 재생성하지 마.'} />
    <h2>상황별 노트</h2>
    <p>필요한 노트만 펼쳐 읽으세요. 만드는 순서·프롬프트·예시·통과 기준이 함께 있습니다.</p>
    {vault.notes.map(note=><details key={note.topic} id={'vault-'+note.topic}><summary>{note.title}</summary><p><strong>언제 읽나요?</strong> {note.when}</p><p><code>{note.topic}</code> · <a href={vault.noteBase+note.file}>이 노트 Markdown 읽기</a></p><Note text={note.text}/><p>관련: {note.related.map((topic,i)=><span key={topic}>{i>0?' · ':''}<a href={'#vault-'+topic}>{vault.notes.find(n=>n.topic===topic).title}</a></span>)}</p></details>)}
    <h2>어디까지 검증된 노하우인가요?</h2>
    <p>3–5초 의미 묶음은 사용자가 강조한 제작 기준입니다. 동작 뒤의 정지·말과 화면 불일치·반복 제품 카드 문제는 이전 내부 검수에서 가져온 교훈입니다. 내부 컷 수와 45초 시간표는 이를 적용하는 예시이며 실제 발화 전 초안입니다. 광고 성과나 특정 성공 확률을 보장하지 않습니다.</p>
    <p>고객 원본이나 계정 정보는 이 공개 Vault에 포함하지 않습니다. 문서가 AI에 전달되는 것, AI가 실제로 적용하는 것, 완성 광고의 품질은 각각 확인해야 합니다.</p>
  </>;
}
