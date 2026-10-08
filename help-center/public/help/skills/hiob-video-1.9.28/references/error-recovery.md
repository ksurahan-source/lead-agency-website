# HIOB 오류 복구 사전 — MCP 1.9.6

오류 응답의 recovery.readNext.entry는 정확한 오류 코드다. hiob://error-recovery/{code}의 코드별 문서와 error_recovery(code,projectId,failingTool?)에서 발생 조건·담당·복구·성공 확인·재개를 읽는다. 아래 공통 항목은 배경 설명이다. 등록되지 않은 외부 코드는 registered=false/resolution=unregistered이며 운영자 진단 항목을 자동 해결로 표시하지 않는다. error_recovery(code,projectId)는 안전한 다음 조회와 대안 조건을 반환한다. 호스트가 기존 자료·승인·보이스 ID·해시를 읽고 연결하며 고객에게 내부 입력을 반복시키지 않는다. 같은 상태·입력의 실패를 새 증거 없이 반복하지 않는다.

## general

모르는 오류는 코드·도구·마지막 정상 단계·현재 버전과 상태를 보존해 원인을 조회한다. 결과를 지어내거나 유료 재접수하지 않는다. hiob://guided-production을 읽고 guided_status로 같은 실행을 이어간다. 에러 사전에 없는 코드는 제품 수리 대상으로 기록한다. 오류가 해소되면 실패한 단계부터 이어가며 전체 작업을 재생성하지 않는다.

## speech

HUMAN_LIPSYNC_UNSUPPORTED는 여러 원인을 묶은 코드다. recovery.causes의 모든 ID를 확인하고 speech_preflight(projectId)를 실행한다. hiob://guided-production의 현재 순정/립싱크 선택 절차를 읽는다.

| 원인 ID | 읽고 확인할 값 | 복구·대안 |
|---|---|---|
| voice_id_required | production-plan.json의 narratorScript.voiceId, 승인 전문 음원과 voice_status | 아래 voice 항목. 이름을 임의 ID로 변환하지 않는다. |
| lipsync_duration_unsupported | creative-direction.json assets.duration와 실제 원본 | 현행 립싱크는 5초. 승인된 기존 5초 원본 재사용, 고객이 선택한 컷 재설계, 또는 어댑터 확장 필요. 타이밍 자동 변경 금지. |
| single_speaker_required / on_camera_required | castIds와 cast.onCamera 및 실제 화면 | 승인된 단일 화면 화자로 연결. 여러 얼굴을 없는 것으로 숨기지 않는다. |
| activity_required / cast_required | 실제 speaking/silent_action/hands_only와 배역 | 실제 관찰로 분류·연결. 진행하려고 absent로 바꾸지 않는다. |
| continuity_required | personBody/propsBrand/backgroundUse/camera/stateBefore/stateAfter | 기존 참조에서 파생하고 미관찰은 실제 확인한다. |
| speech_mode_required / generation_model_unsupported | direction.speechMode/generationModel, model_catalog | H3/Seedance 2/2.5 × native/lipsync의 선택을 보존하고 실제 지원을 확인한다. |
| script_audio_binding_required | narratorScript.text와 해당 beats.narration/audioMode | 순정 original_dialogue, 립싱크 external_narration. 승인 전문·타이밍을 바꾸지 않고 구조 연결부터 복구한다. |
| narrator_binding_required | narratorScript.speakerId, castIds, speakers | 승인된 한 나레이터 연결. |
| audio_alignment_unsupported | cuts의 start-sourceInSec | 같은 원본에는 같은 음성 시간 구간. 승인 시간이 실제로 달라지면 별도 수정안으로 제시한다. |

speech_preflight는 입력 계약과 의존성을 조회한다. input_contract_ready는 실제 원본·권한·제공사 견적·품질 합격을 의미하지 않는다. native 경로에서 자료화면의 새 발화가 필요하면 clone 의존성을 함께 확인한다.

## voice

HUMAN_FULL_VOICE_SELECTION_REQUIRED / HUMAN_AUTHENTIC_FULL_VOICE_REQUIRED / HUMAN_VOICE_ID_INVALID:

1. project_read_text로 source-review/production-plan.json과 production/audio.json을 읽는다.
2. voice_status의 같은 프로젝트·run의 성공 Typecast 전문 job을 찾는다. producer=typecast-timestamps-v1, 정확한 전문·textSha256·음원 SHA·voiceId가 일치해야 한다.
3. 기존 승인 목소리와 선택된 음원이 같은지 확인하고 plan_save의 narratorScript.voiceId에 실제 ID를 연결한다. 지정된 목소리를 자동 변경하지 않는다.
4. audio_set에는 전문 narration 트랙 하나와 원래 재생속도 1을 연결한다. 문장 일부만 만든 음원은 전문을 대신하지 않는다.
5. 최신 expectedPlanSha256으로 저장한다. 보통 화면 수정에서 voiceId를 생략해도 동일 speakerId의 기존 값은 보존된다. 명시적 목소리 변경은 실제 고객 선택에 따라야 한다.
6. 과거 승인 수정 이력이 있는 기획에서 메타데이터 연결이 source revision과 충돌하면 hiob://workflow의 sourceRevisionApproval 계약을 사용해 기존 고객 목소리 선택 근거를 기록한다. 옛 승인 이력을 편집하거나 없애지 않는다.

MCP 1.9.2/1.9.3은 실행기가 voiceId를 요구하지만 plan_save 스키마가 받지 않는 불일치가 있었다. 실제 도구 스키마에 voiceId가 없으면 release_check로 설치/세션 버전을 확인한다. 입력을 반복시키지 말고 최신 패키지·새 세션의 스키마를 확인한다.

## source

HUMAN_GENERATION_SOURCE_REQUIRED / HUMAN_SOURCE_SELECTION_REQUIRED:

원본은 succeeded, 같은 run·선택 모델·assetId, 현재 prompt/referenceHash/duration과 Seedance 입력 계약이 일치해야 한다. generation_status와 현재 컴파일 결과를 대조해 불일치 필드를 찾는다. 여러 후보면 기존 선택을 재사용하거나 실제 미리보기를 제시한다. 새로운 원본이 필요한 경우 변경 범위·금액을 확인한다. 외부 원본·잘라낸 파생본의 출처를 기존 job으로 위장하지 않는다. 파일 재사용 지원과 임의 검증 우회는 구분한다.

## stale

AUDIO_PLAN_STALE는 `audio_recovery(projectId)`로 기존 선택 음원과 같이 저장된 체크포인트를 대조한다. 이 도구는 저장·생성하지 않는다. `ready_to_rebind`이면 `nextAction`의 `audio_set` 인자로 기존 음성·음악·효과음을 모두 그대로 연결한다. 저장 시 현재 권한·실제 음원·기획/음원 버전을 다시 검사하며, 성공 후 `resumeAction`으로 이어간다. 고객에게 트랙 입력이나 같은 승인을 다시 요구하지 않는다.

`needs_review.changes`는 달라진 전문·voiceId·화자·발화 방식·시간·원문 근거의 정확한 필드다. 예를 들어 `beats[0].audioMode`가 바뀌었으면 해시만 갱신하거나 narration을 dialogue로 바꾸지 말고 기존 승인과 해당 순정/립싱크 원본을 호스트가 대조한다. `needs_history`는 최근 최대 200개 로컬 체크포인트에서 기획/선택 음원의 해시가 함께 일치하는 기록을 찾지 못한 상태다. `history.issues`의 손상·접근 문제를 숨기지 않으며 현재 프로젝트의 서버 revision/기존 승인 자료를 조회한다. 이 결과가 이전 고객 승인·목소리 청취·전체 제작 품질을 새로 인증하지는 않는다.

HUMAN_FULL_VOICE_CHANGED / HUMAN_GENERATION_SOURCE_CHANGED / HIOB_LIPSYNC_PLAN_CHANGED:

현재 파일과 원본 receipt의 SHA·revision을 비교한다. 바뀐 자료만 재준비·재관찰하며 원본·진행 job은 보존한다. 해시 검사를 삭제하거나 옛 pass를 재사용하지 않는다.

## native

HUMAN_NATIVE_CUT_ALIGNMENT_UNSUPPORTED / NATIVE_SPEECH_ROUTE_REQUIRED / NATIVE_SOURCE_SYNC_REQUIRED / NATIVE_AUDIO_SAMPLE_INVALID:

현재 순정 오디오는 해당 beat와 단일 cut의 start/end가 같아야 한다. 여러 컷 정렬은 구현 지원이 필요하다. native_audio_prepare는 승인된 순정 원본과 음성 WAV를 보존·추출한다. 실제 음성이 없으면 원래 목소리를 연장할 수 없다. 연결·revision 문제는 project_sync 상태로 복구하고, speechMode 선택은 임의 변경하지 않는다.

## clone

DESKTOP_VOICE_CLONE_PRICING_UNAVAILABLE / DESKTOP_VOICE_CLONE_PROVIDER_UNAVAILABLE 및 CLONE 계열:

voice_clone_status로 현재 프로젝트 기존 등록·진행 job을 먼저 확인한다. 성공 등록도 원본 화자·권한·선택 일치를 대조한 뒤 재사용한다. paidExecutionAvailable=true만으로 가격·유효기간·승인 준비가 입증되지 않는다.

등록에는 실제 원본/샘플 청취, 단일 화자·권리 확인, 계정의 등록 지원, 유효 비용, 원본·샘플에 묶인 승인 범위가 필요하다. 운영 설정·가격·API 문제는 운영자가 복구해야 하며 고객에게 대본을 다시 입력시키지 않는다. quote/submit은 정확한 현재 계약을 따르고 불명확한 접수는 같은 job으로 대조한다.

대안은 ① 이미 검수된 원본 발화 구간 유지 ② 같은 프로젝트의 기존 승인 clone ③ 조건을 갖춘 신규 등록 ④ 고객이 선택한 지정 Typecast 경로 ⑤ 실제 지원을 확인한 외부 입력 패키지다. 각 대안의 막힌 조건을 함께 표시하고 조건 확인 전 ready라고 쓰지 않는다. 새 대사가 필요한데 원본 발화만 유지하는 것은 완전한 대안이 아니다.

## review

HUMAN_SCENE_CLASSIFICATION_REQUIRED/CHANGED, HUMAN_SCREEN_ACTIVITY_CHANGED, HUMAN_SCENE_CONTINUITY_REVIEW_REQUIRED, HUMAN_FACE_INTEGRITY_REVIEW_REQUIRED, HUMAN_LIPSYNC_RESULT_REQUIRED/AUDIO_MOTION_REVIEW_REQUIRED, HUMAN_NATIVE_SPEECH_RESULT_REQUIRED/REVIEW_REQUIRED:

실제 영상과 소리를 보고 분류·네 연속성 항목·얼굴 디테일과 동일성·정확한 발화·입모양을 검수한다. 원본·파생 job과 출력 SHA를 연결하고 문제 시간 구간만 수리한다. 미관찰을 pass로 채우지 않는다. 업스케일·보드·코드 테스트가 실제 영상 품질을 대신하지 않는다.

## pending

HIOB_REQUEST_INTERRUPTED / DISPATCH_UNKNOWN:

립싱크는 lipsync_status, clone은 voice_clone_status, 일반 음성은 voice_status, 영상은 generation_status, 렌더는 render_status로 기존 접수부터 대조한다. 같은 requestId/jobId를 보존하고 유실된 응답을 미접수로 간주하지 않는다. 정상 대기는 무진전 오류와 구분하고 간격을 두고 조회한다. status 자체가 실패하면 같은 조회 자동 루프를 만들지 않는다.

## authority

MCP_CONNECTION 계열 또는 401/403은 connection_diagnose로 기존 권한을 확인한다. 같은 계정의 다른 프로젝트 권한을 대신 사용하지 않는다. 기존 승인 범위를 복구하고 범위를 늘릴 때만 필요한 고객 선택을 제시한다.

## seedance

PROVIDER_PERSON_REFERENCE_RESTRICTED 및 Seedance 입력 오류: model_catalog의 현재 스키마와 얼굴 없는 실제 업로드 파일을 대조한다. 포장·포스터·화면·반사 얼굴도 확인하며 새 가상 인물은 CHARACTER 텍스트로 묘사한다. 내부 미지원 입력은 외부 패키지 또는 제품 수정으로 표시한다. 얼굴이 있는 firstFrame이나 임의 referenceHash 변환으로 우회하지 않는다.

## script

HIOB_SCRIPT_SOURCE_CONFLICT는 hiob://workflow의 sourceRevisionApproval을 읽고 원문·전문·타이밍·실제 고객 선택을 대조한다. 승인된 수정만 새 버전으로 저장하고 기존 원문·승인 이력을 보존한다. 오류를 없애려고 문장을 자르거나 sourceDecisions를 삭제하지 않는다.

## 고객 한도·사용량 질문 생략 (2026-10-07)

고객에게 크레딧 한도·사용량·총 예산 숫자를 묻거나 입력시키지 않는다. 호스트가 `connection_diagnose` → `production_check`와 해당 작업의 status·quote로 서버 잔액·보류 금액·기존 승인 범위·현재 견적을 직접 확인한다. 고객이 요청한 작업이 기존 승인 범위 안이면 한도 질문이나 반복 승인 없이 진행한다. 조회 실패나 미확인은 고객에게 숫자를 물어 해결하지 않고 조회 복구 또는 정확한 진단을 안내한다. 실제 잔액 부족·권한 제한이 확인될 때만 부족분/제한과 지원되는 충전·재연결 등 구체적인 해결 행동을 안내한다.

`automatic:false`/`executionAuthorized:false`는 응답 자체가 실행하거나 권한을 부여하지 않았다는 뜻이며 고객에게 다시 물으라는 뜻이 아니다. `host.requiredAction`은 호스트가 현재 도구와 실제 자료로 처리한다. 고객의 대본·목소리·연출 선택과 서버의 기존 한도·권한은 보존하며, 한도 확대·충전·새 결제·진행 중 작업의 중복 접수를 자동으로 만들지 않는다.

## journal — 예외 없이 반환된 막힘도 기록하기

MCP 1.9.13부터 `production_readiness.status=blocked`, `project_context.production`, `production_check.project.result.production`의 같은 준비 오류는 `production_readiness` incident로 연결한다. 같은 입력의 여러 조회는 한 기록을 재사용한다. `audio_recovery`의 `needs_review`/`needs_history`도 현재 기획·기존 기획·선택 음원의 버전에 묶어 기록한다. 복구 단계만 바뀌고 같은 결합 오류가 남아 있으면 새 실패로 쌓지 않는다. 정상 `current`/`ready_to_rebind`, 초안의 `needs_input`, 일반 창작 검토 대기는 이 분기의 오류가 아니다.

응답의 `incident.recordingStatus`와 `incidentId`를 확인한다. 존재하는 jobId/requestId/taskId/inputId를 유지하며 접수 전에는 correlationId를 사용한다. `error_gateway(projectId,historyOnly=true)`의 `central`을 읽고 `delivery.pending=0`/`serverSync=true`와 실제 수신 이벤트를 확인한 경우에만 중앙 기록 완료로 보고한다. 로컬 `persisted` 자체는 서버 수신 확인이 아니다. 기록 실패가 있더라도 원래 오류 상태·코드·고객 자료를 보존하고 저장소/연결부터 복구한다.

복구 시도는 기존 `incidentId`에 `error_record`로 추가한다. 실제 결과가 없으면 `blocked`를 유지한다. `resolved`에는 조회 도구·실제 결과 ID·결과 상태를 연결하며 새 영상 성공만으로 과거 감정·발음·동작의 품질 문제가 해결됐다고 기록하지 않는다. SDK 입력 검증과 모든 외부 UI/인프라 오류를 이 문서의 결과 수집 범위에 포함했다고 주장하지 않는다.

## 육도 연기 안내 업데이트 뒤 기존 촬영이 다시 생성 단계로 돌아갈 때 (1.9.14)

현재 `storyboard_compile`은 새 생성용 shots와, 같은 기획·연출·참조에 묶인 예전 촬영 입력의 `reuse`를 구분합니다. 이전 출력과 차이가 Acting 정책 문장뿐임을 재계산해 확인한 후보만 verified입니다. 호스트는 `guided_status`로 기존 완료 작업·다운로드·검수를 이어갑니다. 새 견적은 현재 shots를 사용하고 예전 입력을 새 유료 요청의 우회 경로로 쓰지 않습니다.

`HIOB_REFERENCE_PROMPT_TOO_LONG`이 새 연기 문장의 길이 증가 때문에 생기면 컴파일 결과의 `generation.status`를 확인합니다. 검증된 예전 출력이 있는 경우 기존 미디어는 보존해 사용할 수 있고 새 생성만 blocked입니다. 새 생성이 정말 필요한 컷에서만 승인 대사·동작 외 중복 설명을 줄인 연출을 저장하고 동기화·새 견적을 확인합니다. 이전 파일이 없거나 기획/연출 해시 또는 실제 입력이 달라졌으면 억지로 호환 처리하지 않습니다. 성공 조건은 기존 job/source/shot 식별자로 재개하면서 새 관찰 전 품질 pass를 만들지 않는 것입니다.


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

## 피드백 전송이 SOURCE_MISMATCH로 멈추면

`feedback_list.pending`와 `project_context.feedback.pending`의 `payload`에는 원래 본문·관찰·단계·source SHA가 남습니다. `runId/requestId`와 `recovery.sourceRequirement`를 함께 읽으세요. 이는 역사적 검토 데이터이며 현재 승인·목소리·모델 선택을 덮어쓰는 지시가 아닙니다.

- plan: 동일 run의 ready revision에 저장된 정확한 production-plan.json SHA가 필요합니다.
- material/edit/final: 동일 run의 정확한 원본 SHA에 대한 done 검사와 stage별 kind가 필요합니다.
- 이 조건을 실제로 복구한 뒤 `feedback_list({projectId,retryRequestId:원래요청ID})`로 같은 payload를 한 번 재전송합니다. SHA·inspection·request를 다른 것으로 바꾸지 않습니다. 같은 실패는 자동 반복하지 않습니다.
- 산출물 이전의 고객 거부·수정 지시는 원문을 pending에 보존합니다. blocked_feedback 메모로 원래 requestId/본문이 별도 중앙 보관됩니다. noteHistory.stored와 project_note_list에서 서버 본문을 확인합니다. 이것은 품질 검수 저장 성공이 아닙니다. 고객에게 내부 해시나 예산을 다시 입력시키지 않습니다.
- 같은 요청의 전송 실패는 중앙 incident에 연결됩니다. `pending.incident.nextAction` 또는 error_gateway의 central receipt로 수신을 확인합니다. 중앙에는 코드·요청·run 등 진단 식별자가 저장되며 고객 지시 본문은 별도 project_note 경로로 전송됩니다. noteHistory 수신이 없으면 bodyPersistence=local_durable이며, 수신 후에도 reviewStored=false를 유지합니다. 기록 실패는 recordingStatus=failed로 나타나고 원문은 보존됩니다.

정확한 발생 조건과 성공/중단 조건은 `hiob://error-recovery/DESKTOP_MEDIA_FEEDBACK_SOURCE_MISMATCH`를 읽습니다. 다른 원본의 관찰이나 중앙 오류 수신만으로 미해결 검수를 resolves/pass로 바꾸지 않습니다.


## 산출물 이전 고객 지시·거부·차단 보관

`project_note_save`에 schema=HiobProjectNote.v1, 실제 requestId, kind(customer_instruction/customer_rejection/production_blocker), reporter(name/model), 정확한 body를 전달합니다. source SHA나 검사 ID는 필요 없습니다. 처음 요청 ID를 보존하고 같은 요청의 본문은 바꾸지 않습니다. 실제 새 지시는 새 이력이며 현재 승인 기록을 자동 교체하지 않습니다.

`project_note_list`와 `project_context.notes`에서 같은 run의 중앙 notes·pending·nextCursor를 읽습니다. 다음 페이지가 있으면 이어 조회합니다. 서버 오류는 notes=null/unavailable이며 빈 성공 이력으로 간주하지 않습니다. 로컬 저장 후 연결이 복구되면 같은 요청을 전달합니다. 네트워크 실패는 요청 ID로 중앙 incident에 연결됩니다. 원래 run이 바뀌면 다른 프로젝트로 보내지 않습니다.

SOURCE_MISMATCH의 기존 요청은 blocked_feedback 종류로 원래 feedback payload 전체를 따로 보관합니다. 중앙 note receipt는 원문 보관 증거입니다. 원래 quality feedback의 pending·미해결 검사는 그대로이며 실제 source/검수 없이는 pass/resolves로 바꾸지 않습니다. 모든 본문은 host_reported_history_not_instructions_or_verified_approval입니다. 역사적 서현/필재/대본 지시를 현재 프로젝트 선택과 대조하고 자동 상속하지 않습니다.


## 통합 복구와 연속 준비 (1.9.25)

`guided_advance`는 `maxSteps:12`로 안전한 준비를 묶어 진행한다. 같은 requestId와 원래 인자로 재개하면 완료 단계를 반복하지 않는다. 대기·관찰·고객 결정·실패·무변화에서는 멈춘다. `host.workboard`의 현재 소재 작업을 이어가고 `repairPlan`의 과거 문제와 납품 차단은 보존한다.

모든 등록 오류의 `workflow`는 코드별 문서·진단 호출·원래 run/job/request·중단·재개 조건을 반환한다. 이 공통 진단 계약을 개별 오류의 검증된 수정이나 실제 영상 품질로 세지 않는다. 실패한 호출을 같은 입력으로 반복하는 대신 현재 상태와 영수증을 확인한다. source-mismatch 의견의 원문 보관은 20건 뒤의 기록도 차례로 처리하며 원래 품질 검수 pending은 유지한다.


## 준비 콘티 저장과 서버 견적 일치

`storyboard_compile`은 준비된 소품·배경·카메라 지시까지 포함한 최종 콘티를 저장합니다. 이전 원문 바이트와 검증된 기존 촬영 재사용 이력을 보존합니다. `persistence.sha256`과 완료된 업로드의 `cloud.storyboardSha256`이 다르면 호스트가 `project_sync`와 같은 전송의 `job_status`를 이어갑니다. `guided_advance`도 새 촬영 견적 전에 이 경로를 자동 준비합니다. 기존 성공 원본의 다운로드·검수는 계속 진행할 수 있습니다.

`HIOB_STORYBOARD_SYNC_REQUIRED` 또는 `DESKTOP_PRODUCTION_DIRECTION_INPUT_CHANGED`는 `hiob://error-recovery/<code>`의 저장→동기화→같은 소재 견적 절차로 복구합니다. 원래 request/run과 incident를 보존하고 필드 차이를 확인합니다. `error_record`의 blocked 상태는 원래 작업의 상태이며, 기록 자체의 실패가 아닙니다. 생성 길이 제한 때문에 새 생성이 차단된 기존 촬영은 compile의 reuse와 generation 상태를 읽고 원본을 보존합니다. 검증·권한을 우회하거나 고객에게 예산 숫자를 묻지 않습니다.


견적 준비는 불변 원문·참조의 실제 바이트를 검사하므로 generation quote 및 capability preparation의 응답 대기는 최대90초입니다. 취소는 즉시 전달되고 일반 상태 조회는 기존20초를 유지합니다. `HIOB_REQUEST_INTERRUPTED` 뒤에는 먼저 `generation_status`로 같은 request/run을 조회합니다. 동일 입력·revision·request의 미만료 quoted 영수증이 있으면 `storyboard_quote`가 그 영수증을 회수하며 서버 준비를 반복하지 않습니다. 다른 입력·연결·기간이 지난 영수증은 회수하지 않습니다. 기존 견적 회수는 새 생성 접수나 권한 확대가 아닙니다. 실제 잔액을 초과한 전체 견적은 접수하지 않고 호스트가 기존 승인 범위의 독립 소재를 우선 준비합니다.


## 같은 beat의 컷별 동작과 기존 검수 보존 (1.9.28)

하나의 beat에 여러 소재가 연결되어도 각 소재는 승인된 자기 동작만 수행합니다. 공통 wowMoment의 전체 행동 순서를 모든 촬영 입력에 복제하지 않습니다. 의미·근거의 한계와 원본 준비 receipt는 보존합니다. 손 전용 컷의 얼굴 제외 연출에는 유리·거울 반사도 포함합니다. 실제 출력에서 반사 얼굴이나 추가 동작이 보이면 작업 ID·원본 SHA·시간과 함께 피드백을 기록하며, 프롬프트 수정만으로 문제를 해결 처리하지 않습니다.

새 촬영 입력과 이전 유료 소재는 별도로 검증합니다. 호스트의 reuse.shots는 동일 기획·연출·참조에서 재구성한 과거 입력만 포함하며 새 생성에는 사용할 수 없습니다. 서버 렌더는 기존 accepted 검수의 인증된 검사 ID가 가리키는 ready revision을 읽고 동일 기획·연출·참조 준비·소재 길이·구도·Seedance 입력을 대조합니다. 기존 검수·원본 해시를 현재 값으로 덮어쓰지 않습니다. 서버의 reuse.quality=not_reverified는 실제 품질 재검증이나 고객 승인이 아닙니다.

DESKTOP_PRODUCTION_MATERIAL_REVIEW_REQUIRED가 계속되면 해당 소재의 검수 상태·검사 ID·원본 SHA와 당시 revision을 먼저 대조합니다. 권한·이력 조회 실패는 같은 작업으로 복구하고 새 유료 생성으로 대신하지 않습니다. 실제로 바뀐 기획·연출이나 누락/실패 검수는 material_inspect의 실제 자료를 보고 material_review로 검토한 뒤 edit_assemble → project_sync → production_readiness로 재개합니다. 관찰 없이 accepted를 만들거나 해시만 갱신하지 않습니다.
