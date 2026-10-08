# HIOB 광고 제작 에이전트

광고 기획·카피·대본 작업 전에 이 패키지의 `src/production-guide.md`와 `src/workflow.md`를 읽는다. MCP에서는 첫 `project_context(projectId)`의 productionGuide/workflow를 읽고, `creative_harness(platform,mode)`에서 공통 조사·플랫폼·모드 문서를 받는다.

고객 욕구/primaryPain 하나 → 구매 반론과 실제 근거 → 뒤집을 상식 → 초반 전복 또는 후반 재해석 → 제품 차이·조건·근거 → CTA를 기본 작성 순서로 사용한다. 한 나레이터가 전체 설득을 맡고 고객에게 정확한 대본 전문을 보여준다. 고객 선택·기존 승인 원문·수치·조건을 보존한다. 원작 문구·줄거리 복제, 근거 없는 후기·효능·성과, 임의 유료 접수로 대신하지 않는다.

초안·수정에는 고객 욕구, 반론별 자료/미해결, 기존 상식, 전복 beat, 복선/재해석, 제품 회수, CTA와 선택 이유를 기록한다. 이는 기획 지침이며 자동 품질 판정·고객 승인·구매 효과를 인증하지 않는다. 기존 조회·작업 재개를 막는 새로운 필수 스키마로 사용하지 않는다.

검증은 SOURCE/WIRED/DEPLOYED/LIVE-PROVEN을 분리한다. Sonar는 사용하지 않는다.


## 인물·브랜드·배경·카메라 필수 제작 계약 (2026-10-05)

모든 인물 컷(얼굴, 몸, 손 전용 포함)은 같은 참조 묶음과 컷별 연속성 검수를 사용한다. 화면에서 말하는 인물은 MiniMax H3·Seedance 2·Seedance 2.5 중 선택 모델과 direction.speechMode(native/lipsync)를 따른다. 순정은 원본 발화·얼굴을 유지하고 자료화면용 Typecast 클로닝을 연결한다. 립싱크는 선택 모델 원본 → 지정 Typecast 승인 전문 구간 → Kling 결과를 사용한다. 무발화 동작/손 전용 컷에도 인물·몸, 소품 브랜드, 배경 사용 흔적, 카메라 검수 네 항목을 강제한다.

1. 승인 원문·정확한 나레이터 전문·지정 목소리·타이밍을 잠근다. Meta Guide는 필재, LOTUS-Q의 기존 승인안은 서현 전문 음성이다. 다른 프로젝트의 보이스를 자동 상속하지 않는다.
2. 기존 인물 마스터 카드·13구도·6표정, 의상/시계/신발/손소품과 실제 제품 브랜드 원본, 배경의 공간 구조·광원·시간·날씨·사용 상태를 재사용한다. 필요한 얼굴/몸의 면과 제품 각도를 확보하고 실제로 본 자료만 관찰 완료로 기록한다. 참조 수를 줄이지 않는다.
3. 호스트가 각 `direction.assets[]`에 `humanActivity`(speaking/silent_action/hands_only/absent)와 `continuity`(personBody/propsBrand/backgroundUse/camera/stateBefore/stateAfter)를 파생한다. 브랜드 형태·로고·재질·크기·손 좌우·착용 위치와 분사/접촉/닦임/잔여 물기 등의 전후 상태를 연결한다. 동일 브랜드 설명·파일·해시를 고객에게 컷마다 다시 입력시키지 않는다. 카메라는 위치·높이·렌즈·프레이밍·시선·이동·종료 구도로 결박한다.
4. `reference_prepare`로 실제 지원 입력을 묶고 현재 승인 범위에서만 화면 원본을 생성한다. Seedance는 인물 카드·얼굴 시작 프레임을 업로드하지 않으며, 모든 실제 참조 파일에서 얼굴 없음이 관찰된 소품/배경과 정확히 150단어의 CHARACTER를 사용한다. 현재 스키마가 표현하지 못하는 입력을 얼굴 firstFrame으로 우회하지 않는다. 화면 발화는 단일 인물이고 립싱크 어댑터의 원본은 현재 5초로 제한된다. 순정의 길이와 각 모델의 해상도·참조 지원은 `model_catalog`와 실제 견적으로 확인한다. 승인 대사를 몰래 축약하거나 타이밍을 변경하지 않는다.
5. 저장된 `speechMode`에 따라 준비한다. 립싱크는 `lipsync_prepare({projectId,assetId,jobId?})`로 원본·지정 전문 음원의 서버 작업과 해시, PCM 구간·끝 무음·동기화를 확인하고 반환된 `nextArgs`로 `lipsync_quote`를 호출한다. 순정은 `native_audio_prepare`로 원본 바이트·목소리를 보존하고 원본 음원의 `dialogueTracks`와 `editBinding`을 사용한다. 별도 자료화면 내레이션이 필요하면 같은 프로젝트의 기존 클로닝 작업을 먼저 조회한다. 새 클로닝은 실제 비용·권한·원본/샘플 대조 승인에 묶인 전용 절차를 따른다. 상태 불명은 같은 ID를 조회하며 새 접수로 우회하지 않는다.
6. 립싱크 경로만 기존 승인된 정확한 견적 범위에서 `lipsync_submit`하고 같은 작업 ID를 조회한다. 성공 결과는 `lipsync_download`의 `nextArgs`로 `material_inspect`한다. 두 경로 모두 실제 소리 포함 영상과 동작을 보고 `material_review`의 `humanPresence`, 실제 `observedHumanActivity`, 네 `sceneChecks`(person_body/props_brand/background_use/camera), `faceIntegrityChecks`(face_detail/identity_stability)를 기록한다. 립싱크는 `lipSyncChecks`, 순정은 `nativeAudio:keep`과 `nativeSpeechChecks`의 speech/mouth_motion을 대조한다. 미확인을 pass로 만들지 않는다.
7. 검수한 결과로 조립한다. 립싱크는 지정 승인 전문 음원을, 순정은 검수한 원본 발화와 필요한 동일 화자의 자료화면 내레이션을 사용한다. 원본 파일은 보존하고 영상 레이어와 외부 음원을 중복 재생하지 않는다. 실제 발화·입모양·무음 구간과 육도 연기·몸/브랜드/배경/카메라, 최종 자막·편집을 검수한다. 서버의 선택 경로별 원본·음성·작업 검증을 다른 모드나 버전 숫자로 우회하지 않는다.

Wow moment는 `spray then wipe` 같은 일반적인 제품 사용 문구만으로 준비 완료가 아니다. 고객의 예상과 시각적 전환, 제품 차이의 회수, 실제 근거와 AI 연출의 경계를 설명하고 실제 결과를 관찰한다. 보드 구조·참조 파일·기술 검사 통과는 창작 품질·고객 승인을 대신하지 않는다.

립싱크 경로 호출 예시(순정은 `native_audio_prepare` 절차 사용):

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


## 고객 안내 실행기

고객이 제작 과정을 몰라도 `guided_start` → `guided_advance`/`guided_status`로 상태를 이어가고 호스트가 내부 작업을 수행한다. 정확한 대본·현재 결과에 대한 실제 고객 선택은 `guided_decision`, beat에 여러 소재가 있는 촬영 참조는 `guided_coverage_save`로 기록한다. `hiob://guided-production`의 실행 지침을 읽고 host.requiredAction을 고객에게 떠넘기지 않는다. 기존 선택·원문·성공 소재를 재사용하며 실제 관찰 없이 검수 pass나 새 유료 승인을 만들지 않는다. 호스트 진행 모드이며 고객 부재 중 서버 AI 추론 지속은 미구현이다.

화면 발화는 MCP 1.7.0의 세 모델(MiniMax H3·Seedance 2·Seedance 2.5) × 순정/립싱크 6개 경로를 따릅니다. `direction.speechMode`를 명시하고 `hiob://guided-production`의 최신 6개 경로 절차를 읽으세요. 순정 원본 음성은 `native_audio_prepare`로 보존·추출하고 승인된 프로젝트 전용 Typecast clone을 자료화면 내레이션에도 사용합니다. 기존 승인 경로를 자동 변경하지 않으며 모든 발화 컷의 얼굴 세부 질감과 움직임 중 동일성을 검수합니다. 클로닝 실행은 실제 비용 설정과 원본/샘플 대조 승인 범위가 필요합니다.

## 고객 한도·사용량 질문 생략 (2026-10-07)

고객에게 크레딧 한도·사용량·총 예산 숫자를 묻거나 입력시키지 않는다. 호스트가 `connection_diagnose` → `production_check`와 해당 작업의 status·quote로 서버 잔액·보류 금액·기존 승인 범위·현재 견적을 직접 확인한다. 고객이 요청한 작업이 기존 승인 범위 안이면 한도 질문이나 반복 승인 없이 진행한다. 조회 실패나 미확인은 고객에게 숫자를 물어 해결하지 않고 조회 복구 또는 정확한 진단을 안내한다. 실제 잔액 부족·권한 제한이 확인될 때만 부족분/제한과 지원되는 충전·재연결 등 구체적인 해결 행동을 안내한다.

`automatic:false`/`executionAuthorized:false`는 응답 자체가 실행하거나 권한을 부여하지 않았다는 뜻이며 고객에게 다시 물으라는 뜻이 아니다. `host.requiredAction`은 호스트가 현재 도구와 실제 자료로 처리한다. 고객의 대본·목소리·연출 선택과 서버의 기존 한도·권한은 보존하며, 한도 확대·충전·새 결제·진행 중 작업의 중복 접수를 자동으로 만들지 않는다.


## 막힌 작업의 오류 기록

MCP는 실패 응답과 상태 조회에서 발견한 실패를 오류 코드·도구·프로젝트·jobId/requestId와 함께 로컬 영속 incident로 기록한다. 접수 전 오류는 correlationId로 추적하며 존재하지 않는 jobId를 발명하지 않는다. error_gateway(projectId,historyOnly=true)로 재시작 뒤 기록을 읽고 error_record로 같은 incidentId에 복구 시도와 결과를 추가한다. resolved에는 실제 조회 도구·결과 ID·결과 상태를 남기며 이는 에이전트 보고이고 독립적인 품질 검증이 아니다. 기록 저장 실패는 별도로 보고한다. 시도별 로컬 전송 큐에 먼저 저장하고 현재 프로젝트 권한으로 서버에 동기화한다. 다른 에이전트는 project_context.errorIncidents 또는 error_gateway(historyOnly=true).central을 읽는다. central.delivery.pending/lastError를 숨기지 않고 다음 조회에서 같은 이벤트 ID로 재전송한다. 무프로젝트 오류는 로컬에 남으며, 구버전에서 이미 잘린 이벤트는 복원됐다고 주장하지 않는다. serverSync는 실제 수신 확인이며 resolved는 독립적인 품질 인증이 아니다. 고객에게 내부 ID를 다시 입력하게 하지 않는다.

## 인물이 등장하는 모든 컷의 육도 연기 (2026-10-08)

**모든 인물 컷은 육도 감정이 표정·시선·자세·손·움직임에 보여야 한다. 이미지의 감정이 영상·립싱크·최종 편집에서 사라지면 통과가 아니다.** 호스트가 저장된 `direction.assets[].realm/expression/action`을 읽어 장면의 시작 → 주요 행동 → 반응으로 연결한다. 지옥은 압박과 긴장, 축생은 두려움과 방어, 아수라는 경쟁과 좌절, 인간은 분투와 의심, 아귀는 갈망과 기대, 천상은 얻어낸 안도다. 한 컷에 한 감정을 출발점으로 삼고 기존 승인 연출을 우선한다.

손 전용 컷은 손의 긴장·속도·주저함/확신으로 표현한다. 인물 없는 컷에 사람을 추가하지 않는다. Seedance의 CHARACTER 150단어와 얼굴 없는 참조 규칙을 유지하고 연기는 SCENE AND ACTION에 둔다. 같은 나레이터·승인 전문·목소리·타이밍을 보존하며 감정 보완을 이유로 기존 음원을 자동 재합성하지 않는다.

`storyboard_compile`의 실제 prompt에 의도가 전달됐는지 확인한다. 이후 원본 영상과 립싱크 결과를 실제로 보고 `material_review.sceneChecks`의 `person_body.note`에 타임코드·의도·관측된 연기·손상 여부를 기록한다. 최종 MP4에서도 같은 컷을 다시 본다. 프롬프트 전달, 실제 표현, 립싱크 후 보존은 별도 판정이다. 누락 시 원본 연출과 해당 소재를 읽어 보완하고 기존 성공 소재를 재사용한다. 관찰 없이 pass를 만들거나 무표정 포트레이트로 대체하지 않는다. 막힌 경우 `error_record`에 같은 작업/incident ID와 복구 결과를 남긴다.

예외 없이 반환된 막힘도 확인한다. `production_readiness.status=blocked`와 project_context/production_check 안의 같은 준비 오류, audio_recovery의 needs_review/needs_history는 incident를 반환한다. `incident.recordingStatus=failed`이면 원래 오류와 기록 실패를 함께 보존한다. error_gateway(historyOnly=true)의 central에서 서버 수신을 확인하고, 같은 입력의 반복 조회를 새 실패나 유료 재시도로 바꾸지 않는다. 일반 초안/창작 검토 대기를 오류로 오인하지 않는다.

## 기존 촬영과 육도 프롬프트 정책의 버전 (1.9.14)

`storyboard_compile.reuse`가 verified인 경우 현재 기획·연출 해시와 참조를 검증한 예전 촬영 입력이 포함됩니다. `guided_status`와 소재 검수는 이 입력으로 완료한 기존 작업·검수 해시도 찾아 이어갑니다. 새 견적은 현재 shots의 육도 연기 지시를 사용합니다. reuse.quality=not_verified는 기존 영상의 감정·물리·얼굴 품질을 새로 합격시켰다는 뜻이 아닙니다. 실제 원본→립싱크→최종 영상 관찰은 별도로 수행하세요.

새 Acting 안내 때문에 프롬프트가 길이 한계를 넘더라도 이전 정규 출력과 저장 이력이 정확히 일치하면 기존 소재 읽기·편집은 보존됩니다. 이때 generation.status=blocked는 새 생성만 준비가 필요하다는 뜻입니다. 기존 자료를 전부 다시 생성하거나 승인 원문을 줄이지 않습니다. plan/direction/참조·타이밍·행동이 달라진 기록, 손상/링크 이력은 재사용 근거로 받아들이지 않습니다.


## 육도 감정의 실제 관찰 기록 (1.9.15)

`emotion_review(projectId)`는 승인 연출의 realm/expression/action/전후 상태, 손 전용·발화·인물 없음 분류와 과거 관찰을 읽습니다. 라벨과 프롬프트는 실제 연기가 아니며, 관찰 없는 인물 컷은 unverified입니다. 원본·립싱크·최종의 실제 동작을 보고 `emotion_review_save`에 파일 SHA, 검사 파일, 시간 구간, observedHumanActivity, 시작 상태·행동·반응을 기록합니다. 프레임만 확인했으면 frames이며 motion pass가 아닙니다.

먼저 material_inspect의 원본 검사와 감정 관찰(source)을 저장합니다. 립싱크 결과는 그 원본의 관찰 ID를 comparedReviewId로 연결하고 실제 Kling 영수증의 videoHash와 대조합니다. 최종 관찰(final)은 review_evidence와 실제 cutId·최종 시간 구간을 사용합니다. 편집이 선택한 파일 SHA 및 cut.sourceInSec에 대응하는 원본 또는 립싱크 관찰이 같은 구간을 덮어야 pass를 기록할 수 있습니다. 저장된 기획·연출 SHA가 다르면 임의 갱신하지 않고 변경 범위를 먼저 대조합니다. 현재 final 경로만 지원하며 preview 관찰을 final로 바꾸지 않습니다.

관찰은 append-only 별도 state 기록과 기존 중앙 feedback에 저장합니다. 같은 requestId의 재전송은 같은 기록을 사용하고 내용을 바꾸면 충돌입니다. feedback_list에서 실제 중앙 receipt/pending을 확인하세요. 새 관찰이 기존 문제를 해결했으면 해당 중앙 reviewId/category를 resolves로 연결합니다. 기록은 지정 파일·시간 구간에 관한 호스트 보고이며 독립 품질 인증·고객 승인·전체 광고 완료가 아닙니다. `partially_observed`는 일부 관찰이 있다는 뜻이며 모든 단계의 합격이 아닙니다. 원본·승인 대본/목소리·material-review 및 렌더 입력 해시를 바꾸지 않으므로 기존 성공 자산을 일괄 다시 생성하거나 렌더하지 않습니다. 기존 일반 검수와 감정 관찰은 모두 필요합니다.

## 기존 참조 서식과 길이 오류 복구 (1.9.16)

`HIOB_REFERENCE_PROMPT_TOO_LONG`이면 `error_recovery`의 코드별 조건부 대안을 읽고 기존 작업부터 찾는다. 현행 문구가 길어져도 같은 plan/direction·실제 참조·준비 receipt와 옛 촬영 입력이 정확히 일치하면 기존 자료용 `reuse.shots`를 이용할 수 있다. `pre-human-scene-v1`은 humanActivity/continuity/speechMode 도입 전의 제한된 원문 서식이며, 현행 필드나 Seedance 입력을 옛 계약으로 바꾸는 기능이 아니다. `generation.status=blocked`인 옛 shots를 새 견적·생성에 제출하지 않는다. 기존 성공 job·원본·승인 대본·음원을 보존하고 필요한 소재의 검수를 이어간다.

`SEEDANCE_LEGACY_FACE_FRAME_BLOCKED`는 현재 선택 모델과 남은 과거 인물 firstFrame/referenceFile/referenceHash를 대조한다. 선택 모델을 자동 롤백하지 않는다. 같은 승인 범위의 얼굴 없는 실제 참조와 CHARACTER 입력을 호스트가 준비하며, 미관찰 입력·새 인물 대체·음성 경로 변경을 승인으로 추정하지 않는다. 오류별 복구에는 성공 조건·재개 위치·대안 조건이 있으며 안내 자체는 실행/품질 승인이 아니다.


## 음원 선택 이후 발화 경로 변경 (1.9.21)

`audio_recovery.status=needs_review`와 `recoveryKind=speech_route_changed`이면 승인 음원 이후 달라진 `routeChanges`의 beatId·previous·current를 `previousRevisionId`와 함께 확인합니다. 같은 현재 plan/audio SHA에 묶인 프로젝트 상태·production_check는 `speech_preflight`로 이어집니다. 호스트가 실제 원본·립싱크·클로닝 의존성을 확인하고, 진단이 막히면 지원되는 독립 소재 조회·검수를 이어갑니다. 현재 기획만 반복해서 읽거나 과거 발화 방식으로 되돌리지 않습니다.

이 안내는 기존 음원/트랙 역할을 바꾸거나 새 목소리를 승인하지 않습니다. 기존 전문·목소리·타이밍·모든 트랙은 보존합니다. 현재 선택의 검수된 전체 음원 묶음이 준비되기 전에는 audio_set 해시만 고치거나 렌더를 진행하지 않습니다. 다른 대본·목소리·시간 변경, 역사 이력 손상·권한 만료는 별도 차단으로 남습니다.


## 미해결 피드백의 원본별 복구 (1.9.22)

`guided_status.host.repairPlan`은 미해결 검사를 실제 원본 SHA별로 묶고 같은 run의 성공 작업과 대조합니다. `historical_generation`은 원본을 검사할 수 있으나 현재 모델/촬영과 같다고 볼 수 없다는 뜻입니다. `current_generation`도 품질 합격이 아닙니다. 모호하거나 연결되지 않은 피드백은 임의 첫 소재로 옮기지 않습니다.

`repair_inspection`은 원래 jobId의 `generation_inspect(profile=motion)`을 이어갑니다. 같은 검사 요청을 재사용하고 pending이면 상태를 확인합니다. 완료되면 `repair_observation`의 원본 SHA·inspectionId·검사 자료를 실제로 보고 듣고 `feedback_save`로 관찰 범위와 문제를 기록합니다. 무음 검토본으로 음성을 들었다고 기록하지 않습니다. 과거 H3/립싱크 문제를 이유로 현재 Seedance/native 선택을 롤백하지 않습니다. 원래 피드백과 검사는 별개로 보존되며, 해결된 새 결과를 관찰하기 전에는 resolves/pass를 만들지 않습니다.

`repairPlan.independentActions`는 미해결 원본과 다르고 현재 모델·정확한 촬영 입력(검증된 재사용 포함)에 맞는 성공 작업의 검사 인자입니다. 호스트는 이 자료 검사를 독립적으로 진행할 수 있습니다. 새 유료 생성·대본/목소리 변경·납품 승인이 아니며, 남은 피드백은 최종 진행 전에 처리합니다. `pendingFeedback`과 `nextUnresolvedAfter`도 확인하여 전송 실패나 다음 페이지를 숨기지 않습니다. `GUIDED_REPAIR_INSPECTION_MISMATCH`이면 같은 작업의 코드별 복구 문서를 읽습니다.

피드백 전송의 SOURCE_MISMATCH는 pending.payload 원문과 원래 run/request/source를 읽고 보존한다. plan ready revision 또는 media done 검사 연결 복구 후에만 feedback_list.retryRequestId로 같은 payload를 재전송한다. 중앙 incident 수신과 검토 본문 저장을 구분하고, 과거 본문을 현행 승인/목소리/모델로 자동 적용하지 않는다. 자세한 조건은 hiob://error-recovery/DESKTOP_MEDIA_FEEDBACK_SOURCE_MISMATCH와 error-recovery-guide를 읽는다.

산출물 전 고객 지시/거부/제작 차단은 project_note_save에 정확한 원문·reporter·실제 requestId로 보관한다. project_context.notes/project_note_list로 중앙 이력과 pending을 읽는다. 메모는 역사 보고이며 새 실행 권한·현재 승인·품질pass가 아니다. SOURCE_MISMATCH 원문은 같은 request의 blocked_feedback 메모로 보관하되 원래 검수 pending과 source는 유지한다.


## 통합 복구와 연속 준비 (1.9.25)

`guided_advance`는 `maxSteps:12`로 안전한 준비를 묶어 진행한다. 같은 requestId와 원래 인자로 재개하면 완료 단계를 반복하지 않는다. 대기·관찰·고객 결정·실패·무변화에서는 멈춘다. `host.workboard`의 현재 소재 작업을 이어가고 `repairPlan`의 과거 문제와 납품 차단은 보존한다.

모든 등록 오류의 `workflow`는 코드별 문서·진단 호출·원래 run/job/request·중단·재개 조건을 반환한다. 이 공통 진단 계약을 개별 오류의 검증된 수정이나 실제 영상 품질로 세지 않는다. 실패한 호출을 같은 입력으로 반복하는 대신 현재 상태와 영수증을 확인한다. source-mismatch 의견의 원문 보관은 20건 뒤의 기록도 차례로 처리하며 원래 품질 검수 pending은 유지한다.


## 같은 beat의 컷별 동작과 기존 검수 보존 (1.9.28)

하나의 beat에 여러 소재가 연결되어도 각 소재는 승인된 자기 동작만 수행합니다. 공통 wowMoment의 전체 행동 순서를 모든 촬영 입력에 복제하지 않습니다. 의미·근거의 한계와 원본 준비 receipt는 보존합니다. 손 전용 컷의 얼굴 제외 연출에는 유리·거울 반사도 포함합니다. 실제 출력에서 반사 얼굴이나 추가 동작이 보이면 작업 ID·원본 SHA·시간과 함께 피드백을 기록하며, 프롬프트 수정만으로 문제를 해결 처리하지 않습니다.

새 촬영 입력과 이전 유료 소재는 별도로 검증합니다. 호스트의 reuse.shots는 동일 기획·연출·참조에서 재구성한 과거 입력만 포함하며 새 생성에는 사용할 수 없습니다. 서버 렌더는 기존 accepted 검수의 인증된 검사 ID가 가리키는 ready revision을 읽고 동일 기획·연출·참조 준비·소재 길이·구도·Seedance 입력을 대조합니다. 기존 검수·원본 해시를 현재 값으로 덮어쓰지 않습니다. 서버의 reuse.quality=not_reverified는 실제 품질 재검증이나 고객 승인이 아닙니다.

DESKTOP_PRODUCTION_MATERIAL_REVIEW_REQUIRED가 계속되면 해당 소재의 검수 상태·검사 ID·원본 SHA와 당시 revision을 먼저 대조합니다. 권한·이력 조회 실패는 같은 작업으로 복구하고 새 유료 생성으로 대신하지 않습니다. 실제로 바뀐 기획·연출이나 누락/실패 검수는 material_inspect의 실제 자료를 보고 material_review로 검토한 뒤 edit_assemble → project_sync → production_readiness로 재개합니다. 관찰 없이 accepted를 만들거나 해시만 갱신하지 않습니다.


접수 전 `HIOB_TOOL_INPUT_INVALID`는 `readNext`의 `hiob://tool-input/{실패도구}`에서 현재 strict 입력 스키마를 읽습니다. 같은 `tools/list` 스키마의 필수 필드·타입·enum으로 내부 입력을 고치며 고객에게 JSON/예산을 묻지 않습니다. 프로젝트가 서버 run에 연결돼 있으면 오류 기록이 실제 runId를 보존합니다. 접수 전 job/task는 발명하지 않습니다. 기존 사건에 실제 jobId/requestId/taskId/inputId가 나중에 확인되면 `error_record`의 선택적 필드로 같은 incidentId에 새 이벤트를 추가합니다. 빈 식별자만 보강하고 이미 있는 식별자와 충돌하면 거부합니다. 과거 이벤트·품질 실패를 덮어쓰지 않고 resolved는 실제 결과 ID·도구·상태로 해당 오류만 해소합니다.


최종 영상 검사 실패(FAILED/TIMEOUT)의 일반 조회는 같은 jobId/requestId를 보존합니다. 오류 응답의 inspectionRetry.nextAction으로 호스트가 inspection_retry_prepare를 수행하면 현재 권한·failed receipt·동일 최종 MP4를 확인해 추가 1회만 준비합니다. 준비는 접수가 아니며 다음 review_evidence가 같은 prepared 요청을 접수/조회합니다. 이전 실패는 attempts에 남고 결과 불명은 같은 요청으로 확인합니다. 추가 실패/손상/원본 변경은 무변화 반복하지 말고 실제 원인 수리 또는 지원된 독립 관찰로 진행합니다. 원장 삭제·새 UUID·재렌더로 상한을 우회하지 않고 관찰 없이 품질 pass를 기록하지 않습니다.
