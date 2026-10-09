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
