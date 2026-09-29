import { playbook, markdownPath } from './advertisingPlaybook.mjs';
import styles from './install.module.css';
export default function AdvertisingGuide({ Command }) {
  return <>
    <p>{playbook.intro}</p>
    <div className={styles.callout}><strong>한 편에서 하나의 선택 이유를 전달하세요.</strong><p>{playbook.principle}</p></div>
    <p>검토 기준: {playbook.reviewedFor} · 설명서 {playbook.version}. <a href={markdownPath}>AI용 전체 설명서 다운로드·읽기</a> · <a href="https://studio.hi-ob.com/models">모델별 기능과 제약</a></p>
    <h2>AI에게 처음 요청하기</h2>
    <p>제품 자료와 함께 아래 문장을 붙여넣으세요. 선택한 방향을 유지하면서 필요한 단계만 요청할 수도 있습니다.</p>
    <Command prompt text={playbook.masterPrompt} label="광고 제작 전체 요청 복사" />
    {playbook.steps.map(step => <section key={step.id}>
      <h2>{step.title}</h2>
      <p><strong>준비물</strong> {step.input}</p>
      {step.body.map(text => <p key={text}>{text}</p>)}
      <details><summary>{step.title.slice(3)} 프롬프트 펼치기</summary><Command prompt text={step.prompt} label={`${step.title.slice(3)} 요청 복사`} /></details>
      <p><strong>HIOB에서 할 일</strong> {step.action}</p>
      <dl><dt>받을 결과</dt><dd>{step.output}</dd><dt>통과 기준</dt><dd>{step.pass}</dd><dt>잘 안되면</dt><dd>{step.repair}</dd></dl>
      {!!step.sources.length && <p>참고: {step.sources.map((id, index) => { const s = playbook.sources.find(item => item.id === id); return <span key={id}>{index > 0 ? ' · ' : ''}<a href={s.url}>{s.title}</a></span>; })}</p>}
    </section>)}
    <h2>출처와 적용 범위</h2>
    <p>2026-09-29 확인. 외부 제작 원리를 HIOB 브레인과 현재 지원 범위에 맞춰 정리했습니다. 특정 기법으로 성공 확률을 보장하지 않습니다. 자막·설명으로 확인한 영상은 전체를 시청했다고 표시하지 않습니다.</p>
    <ul>{playbook.sources.map(s => <li key={s.id}><a href={s.url}>{s.title}</a>{s.videoUrl && <> · <a href={s.videoUrl}>YouTube에서 보기</a></>}<p>{s.checked}. {s.note}</p></li>)}</ul>
    <p><a href="/help/create">처음 HIOB를 연결하고 제작 요청하기</a> · <a href="/help/skills">영상 제작 스킬 설치하기</a> · <a href="/help/restore">프로젝트 저장·복원하기</a></p>
  </>;
}
