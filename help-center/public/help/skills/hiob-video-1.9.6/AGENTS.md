# HIOB 광고 제작 에이전트

광고 기획·카피·대본 작업 전에 이 패키지의 `src/production-guide.md`와 `src/workflow.md`를 읽는다. MCP에서는 첫 `project_context(projectId)`의 productionGuide/workflow를 읽고, `creative_harness(platform,mode)`에서 공통 조사·플랫폼·모드 문서를 받는다.

고객 욕구/primaryPain 하나 → 구매 반론과 실제 근거 → 뒤집을 상식 → 초반 전복 또는 후반 재해석 → 제품 차이·조건·근거 → CTA를 기본 작성 순서로 사용한다. 한 나레이터가 전체 설득을 맡고 고객에게 정확한 대본 전문을 보여준다. 고객 선택·기존 승인 원문·수치·조건을 보존한다. 원작 문구·줄거리 복제, 근거 없는 후기·효능·성과, 임의 유료 접수로 대신하지 않는다.

초안·수정에는 고객 욕구, 반론별 자료/미해결, 기존 상식, 전복 beat, 복선/재해석, 제품 회수, CTA와 선택 이유를 기록한다. 이는 기획 지침이며 자동 품질 판정·고객 승인·구매 효과를 인증하지 않는다. 기존 조회·작업 재개를 막는 새로운 필수 스키마로 사용하지 않는다.

검증은 SOURCE/WIRED/DEPLOYED/LIVE-PROVEN을 분리한다. Sonar는 사용하지 않는다.


## 인물·브랜드·배경·카메라 필수 제작 계약 (2026-10-05)

모든 인물 컷(얼굴, 몸, 손 전용 포함)은 같은 참조 묶음과 컷별 연속성 검수를 사용한다. 화면에서 말하는 인물은 MiniMax H3 무음 원본 → 선택된 Typecast 승인 전문 음성의 구간 → Kling 립싱크 결과를 필수로 사용한다. 무발화 동작/손 전용 컷에도 인물·몸, 소품 브랜드, 배경 사용 흔적, 카메라 검수 네 항목을 강제한다.

1. 승인 원문·정확한 나레이터 전문·지정 목소리·타이밍을 잠근다. Meta Guide는 필재, LOTUS-Q의 기존 승인안은 서현 전문 음성이다. 다른 프로젝트의 보이스를 자동 상속하지 않는다.
2. 기존 인물 마스터 카드·13구도·6표정, 의상/시계/신발/손소품과 실제 제품 브랜드 원본, 배경의 공간 구조·광원·시간·날씨·사용 상태를 재사용한다. 필요한 얼굴/몸의 면과 제품 각도를 확보하고 실제로 본 자료만 관찰 완료로 기록한다. 참조 수를 줄이지 않는다.
3. 호스트가 각 `direction.assets[]`에 `humanActivity`(speaking/silent_action/hands_only/absent)와 `continuity`(personBody/propsBrand/backgroundUse/camera/stateBefore/stateAfter)를 파생한다. 브랜드 형태·로고·재질·크기·손 좌우·착용 위치와 분사/접촉/닦임/잔여 물기 등의 전후 상태를 연결한다. 동일 브랜드 설명·파일·해시를 고객에게 컷마다 다시 입력시키지 않는다. 카메라는 위치·높이·렌즈·프레이밍·시선·이동·종료 구도로 결박한다.
4. `reference_prepare`로 묶고 시작 프레임을 검수한 뒤 현재 승인 범위에서만 화면 원본을 생성한다. 화면 발화 지원은 단일 인물·5초·768p이며, 범위를 벗어나면 유료 생성 전에 구체적인 차단 사유를 반환한다. 승인 대사를 몰래 축약하거나 타이밍을 변경하지 않는다.
5. 화면 발화 원본 완료 후 `lipsync_prepare({projectId,assetId,jobId?})`를 호출한다. 원본·전문 음원의 서버 작업과 해시를 확인하고 PCM 구간·필요한 끝 무음·동기화를 자동 처리한다. 전송 중이면 같은 인자를 다시 조회하고 완료 시 반환한 `nextArgs`로 `lipsync_quote`를 호출한다. 새 합성·유료 접수는 하지 않는다. 음절이 잘리는 시간은 자동 추정으로 통과시키지 않는다.
6. 승인된 정확한 견적 범위에서 `lipsync_submit`하고 같은 작업 ID를 조회한다. `lipsync_download`의 `nextArgs`로 `material_inspect`하고 실제 소리 포함 결과와 동작을 관찰한다. `material_review`의 `humanPresence`, 실제 `observedHumanActivity`, `sceneChecks` 네 항목(person_body/props_brand/background_use/camera)을 기록한다. 화면 발화에는 `lipSyncChecks`의 speech/mouth_motion도 필요하다. 미확인을 pass로 만들지 않는다.
7. 검수한 결과로 조립하며 내장 후보 음성은 버리고 동일 승인 전문 음원을 한 번만 사용한다. 실제 발화·입모양·무음 구간과 몸/브랜드/배경/카메라, 최종 자막·편집을 검수한다. 서버도 실제 원본·전문·구간·립싱크 작업을 확인하므로 원본을 최종 발화 소재로 선택하거나 버전 숫자를 낮춰 우회할 수 없다.

Wow moment는 `spray then wipe` 같은 일반적인 제품 사용 문구만으로 준비 완료가 아니다. 고객의 예상과 시각적 전환, 제품 차이의 회수, 실제 근거와 AI 연출의 경계를 설명하고 실제 결과를 관찰한다. 보드 구조·참조 파일·기술 검사 통과는 창작 품질·고객 승인을 대신하지 않는다.

호출 예시:

```javascript
const prepared = await lipsync_prepare({ projectId, assetId: 'presenter' });
// 전송 중에는 prepared.nextTool/nextArgs 그대로 재조회한다.
const quoted = await lipsync_quote(prepared.nextArgs);
// 기존 사용자 승인/프로젝트 비용 범위 안에서만 접수한다.
const submitted = await lipsync_submit({ projectId, batchId: quoted.quote.id });
// lipsync_status로 동일 작업을 조회하고 succeeded jobId만 다운로드한다.
const output = await lipsync_download({ projectId, jobId });
const inspection = await material_inspect(output.nextArgs);
```

참조 검수는 호스트가 진행하고 고객에게 결과와 필요한 선택을 보여준다. SHA·경로 복사나 내부 도구의 연결 작업을 고객에게 떠넘기지 않는다. 얼굴 외 픽셀 동일성·자동 한국어 품질 합격을 보장하지 않는다. 원본·기존 승인·진행 중 작업을 보존한다.
