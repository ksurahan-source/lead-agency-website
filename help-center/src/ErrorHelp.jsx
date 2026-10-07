import data from './errorHelp.generated.json';
import {PublicHeader,PublicFooter} from './HelpCenter';
import styles from './install.module.css';
export default function ErrorHelp({route}){
 const group=data.groups.find(g=>g.id===route.errorGroup);
 return <><PublicHeader/><main className={styles.shell}><article style={{maxWidth:1000,margin:'24px auto',padding:'0 20px',overflowWrap:'anywhere'}}>
  <nav aria-label="이동 경로"><a href="/help">도움말</a> / <a href="/help/errors">오류 코드 사전</a></nav>
  <h1>{group?group.title+' 오류 해결':'HIOB 오류 코드 사전과 복구 방법'}</h1>
  <p>MCP {data.version} 기준 · {data.reviewedAt} 검토. 오류의 원인과 해결 담당, 복구 후 확인할 조건을 안내합니다. 기존 원본·승인 대본·목소리·타이밍·진행 중 작업을 보존합니다.</p>
  {!group?<><p>{data.codeCount.toLocaleString('ko-KR')}개의 소스·운영 DB·관측 외부 오류 식별자를 원인별로 찾아볼 수 있습니다. AI에는 오류 코드와 함께 <code>error_recovery</code> 조회를 요청하세요. 각 코드의 실제 발생 조건은 설치본의 코드별 도움말로 확인할 수 있습니다.</p>
   <p>운영자 진단 항목은 자동 해결을 보장하지 않습니다. 제공사 장애·지원되지 않는 입력·추가 권한이 필요한 경우에는 해당 조건을 먼저 해결해야 합니다.</p>
   <h2>원인별 해결 안내</h2><ul>{data.groups.map(g=><li key={g.id}><a href={'/help/errors/'+g.id}>{g.title}</a> — {g.codes.length}개 코드</li>)}</ul>
   <h2>오류 코드로 바로 찾기</h2><p>브라우저의 페이지 찾기(Ctrl+F 또는 ⌘F)로 오류 코드를 검색하세요.</p><ul>{data.groups.flatMap(g=>g.codes.map(({code})=><li key={code}><a href={'/help/errors/'+g.id+'#'+code}><code>{code}</code></a> — {g.title}</li>))}</ul>
  </>:<><p>해결 담당: {group.owner==='host'?'프로젝트를 진행하는 AI가 기존 자료와 상태를 조회해 처리합니다.':'서비스 운영자 또는 해당 기능 담당자가 발생 조건을 확인해야 합니다.'}</p>
   <h2>어떻게 복구하나요?</h2><ol>{group.steps.map((s,i)=><li key={i}>{s}</li>)}</ol>
   <h2>해결됐는지 확인하기</h2><ul>{group.successCriteria.map((s,i)=><li key={i}>{s}</li>)}</ul><p>{group.resume}</p>
   <h2>해당 오류 코드</h2><p>아래 코드는 이 절차를 공유합니다. 구체적인 원인 필드와 발생 조건은 코드별로 다르므로 AI가 설치본에서 해당 코드의 상세 항목을 읽어야 합니다.</p>
   {group.codes.map(({code,resolution,explanation,recoveryVerification})=><section id={code} key={code} style={{scrollMarginTop:24,borderTop:'1px solid #ddd',padding:'12px 0'}}><h3 style={{overflowWrap:'anywhere'}}>{code}</h3><p>{explanation}</p><p>복구 검증: {recoveryVerification==='unit_tested'?'복구 분기 테스트 통과 (운영 결과 별도 확인)':recoveryVerification==='live_proven'?'명시된 운영 사례 확인':'실제 복구 미검증'}</p><p>{resolution==='operator_diagnosis_required'?'이 코드의 실제 발생 조건과 현재 상태를 담당 운영자가 대조해야 합니다. 자동 수정 경로가 검증된 항목은 아닙니다.':'위 복구 순서에 따라 현재 입력과 저장 상태를 확인하고, 성공 조건을 충족한 뒤 기존 작업을 이어갑니다.'}</p><p>AI에게 “{code}의 코드별 복구 문서를 읽고, 기존 프로젝트에서 해당 조건을 확인해줘”라고 요청하세요.</p></section>)}
  </>}
  <h2>작업 ID와 복구 이력</h2><p>AI가 실패하면 오류 코드와 기존 작업 ID를 기록하고 같은 작업의 상태부터 확인합니다. MCP 오류 기록은 같은 컴퓨터에서 다시 읽을 수 있습니다. 고객에게 내부 ID나 크레딧 사용량을 다시 입력하게 하지 않습니다. 작업 ID·고객 자료는 이 공개 사전에 게시하지 않습니다.</p><h2>함께 확인할 안내</h2><p><a href="/help/install">MCP 설치와 업데이트</a> · <a href="/help/topics/fix">다른 문제 해결</a> · <a href="/help/privacy">자료와 개인정보 처리</a></p>
 </article></main><PublicFooter/></>;
}
