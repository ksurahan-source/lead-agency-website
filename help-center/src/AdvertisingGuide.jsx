import { playbook, markdownPath } from './advertisingPlaybook.mjs';
import styles from './install.module.css';
export default function AdvertisingGuide({ Command }) {
  return <>
    <p>{playbook.intro}</p><p><a href="/help/creative-vault">3–5초 장면 묶음과 연출을 자세히 배우는 HIOB 제작 Vault</a></p>
    <div className={styles.callout}><strong>한 편에서 하나의 선택 이유를 전달하세요.</strong><p>{playbook.principle}</p></div>
    <p>검토 기준: {playbook.reviewedFor} · 설명서 {playbook.version}. <a href={markdownPath}>AI용 전체 설명서 다운로드·읽기</a> · <a href="https://studio.hi-ob.com/models">모델별 기능과 제약</a></p>
    <p><a href="/help/skills/hiob-creative-harness-1.3.8/references/korean-reels-grammar.md">한국 릴스 설득 가이드 MD</a> · <a href="/help/skills/hiob-creative-harness-1.3.8/references/42s-persuasion-example.md">42초 전체 대본·동작표 MD</a></p>
    <p><a href="/help/skills/hiob-creative-harness-1.3.8/references/product-motion-execution.md">MCP 실행 지침: 어떻게 실행할지</a> · <a href="/help/skills/hiob-creative-harness-1.3.8/references/product-science-scenes.md">장면 제작 가이드: 어떻게 만들지·프롬프트 8개</a></p>
    <p><a href="/help/skills/hiob-creative-harness-1.3.8/references/customer-primary-pain.md">고객의 개인적 고통 하나: 선택 방법·MCP 실행 지침</a></p>
    <h2>AI에게 처음 요청하기</h2>
    <p>제품 자료와 함께 아래 문장을 붙여넣으세요. 선택한 방향을 유지하면서 필요한 단계만 요청할 수도 있습니다.</p>
    <Command prompt text={playbook.masterPrompt} label="광고 제작 전체 요청 복사" />
    {playbook.steps.map(step => <section key={step.id} id={`step-${step.id}`}>
      <h2>{step.title}</h2>
      <p><strong>준비물</strong> {step.input}</p>
      {step.body.map(text => <p key={text}>{text}</p>)}
      {step.images?.map(image => <figure key={image.src}>
        <img src={image.src} alt={image.alt} width="347" height={image.height} loading="lazy" style={{maxWidth:'100%',height:'auto'}} />
        <figcaption><a href={image.sourceUrl}>{image.source}</a> · {image.caption}</figcaption>
      </figure>)}
      <details><summary>{step.title.replace(/^\d+(?:-\d+)?\.\s*/, '')} 프롬프트 펼치기</summary><Command prompt text={step.prompt} label={`${step.title.replace(/^\d+(?:-\d+)?\.\s*/, '')} 요청 복사`} /></details>
      <p><strong>HIOB에서 할 일</strong> {step.action}</p>
      <dl><dt>받을 결과</dt><dd>{step.output}</dd><dt>통과 기준</dt><dd>{step.pass}</dd><dt>잘 안되면</dt><dd>{step.repair}</dd></dl>
      {!!step.sources.length && <p>참고: {step.sources.map((id, index) => { const s = playbook.sources.find(item => item.id === id); return <span key={id}>{index > 0 ? ' · ' : ''}<a href={s.url}>{s.title}</a></span>; })}</p>}
    </section>)}
    <h2>출처와 적용 범위</h2>
    <p>{playbook.sourceNote}</p>
    <ul>{playbook.sources.map(s => <li key={s.id}><a href={s.url}>{s.title}</a>{s.videoUrl && <> · <a href={s.videoUrl}>YouTube에서 보기</a></>}<p>{s.checked}. {s.note}</p></li>)}</ul>
    <p><a href="/help/create">처음 HIOB를 연결하고 제작 요청하기</a> · <a href="/help/skills">영상 제작 스킬 설치하기</a> · <a href="/help/restore">프로젝트 저장·복원하기</a></p>
  </>;
}
