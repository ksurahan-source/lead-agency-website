# 고객을 안내하는 제작 실행 하네스

고객이 촬영·생성 도구를 몰라도 AI와 HIOB가 제작을 진행한다. 고객에게 목적·추천 방향·정확한 대본 전문·실제 시안·필요한 선택을 보여주며 내부 파일/해시/도구 입력을 반복 요구하지 않는다.

## 실제 실행 범위

이 버전은 **호스트 AI가 진행하는 실행기**다. 실행 상태·고객 선택·요청 기록은 MCP 상태 폴더에 저장하고 앱/프로세스 재연결 시 이어받는다. 이미 접수한 서버 생성 작업은 기존 서버 원장에서 확인한다. 앱이 닫힌 동안 새로운 AI 추론과 후속 생성까지 자동으로 지속되는 서버 실행기는 아직 포함하지 않는다.

`guided_advance`의 `maxSteps:12`는 정해진 안전 도구를 최대 12단계 연속 수행한다. 기본값은 기존 호환을 위해 한 단계다. 각 단계의 입력과 결과를 저장하므로 중간에 끊겨도 같은 requestId·원래 인자로 완료 결과를 재사용한다. 대기·실패·실제 관찰/고객 선택·같은 작업 반복 또는 호출 사이 50초 작업 예산에 도달하면 중단하고 결과를 반환한다. 진행 중인 개별 호출을 강제로 취소하지는 않는다. 기존 작업 상태, 참조 준비, 컴파일, 무과금 전송, 기존 결과 다운로드, 전문 음성 구간 준비, 실제 검수 자료 준비를 연결한다. 실제 도구의 현재 서버 권한·입력·원장 검사를 그대로 사용한다. 새 유료 접수·게시·검수 pass는 자동으로 만들지 않는다.

## 호스트 AI의 의무

1. 현재 프로젝트 원문과 전체 productionGuide/Vault를 읽고 `guided_start({projectId,requestId,objective?})`로 시작한다. 기존 실행이면 같은 run을 재사용한다.
2. `host.nextAction`이 있으면 반환된 runId/revision과 새 requestId로 `guided_advance`를 호출하며 이어간다. 동시 진행 충돌이면 `guided_status`로 현재 상태를 이어받고 기존 접수를 새로 만들지 않는다. 지연 시 같은 작업의 상태를 확인한다.
3. `host.requiredAction`은 호스트가 수행한다. 자료 읽기, 초안·연출 파생, 필요한 이미지 확보, 실제 영상·소리 관찰, 견적 준비·이미 승인된 범위의 접수는 기존 도구로 수행한다. 고객에게 내부 입력을 작성하게 하지 않는다. 작업 후 `guided_status`로 재개한다.
4. `customer.decision`은 필요한 내용만 자연스러운 한국어로 보여준다. script 결정에는 **정확한 전문 전체와 지정 목소리**를 보여준다. 기존 고객 선택이 현재 전문/결과와 같으면 근거 note와 `source:existing_customer_choice`로 기록해 반복 허락을 요구하지 않는다. 실제 새 답변에는 `source:current_customer_reply`를 사용한다.
5. `guided_decision`의 confirm은 제시된 내용에 대한 호스트 보고 기록이다. 유료 범위·서버 권한·품질 승인으로 확대하지 않는다. revise는 원문을 보존한 별도 수정 작업으로 이어진다. 선택 응답이 없으면 confirm하지 않는다.
6. 고객이 수정 방법을 모르는 경우 host.coverage.repairs의 대상·시간·실제 원본·보존 조건을 사용해 구체적인 수정 계획을 만든다. 지원하지 않는 얼굴/병 영역만 편집을 약속하지 않는다. 필요하면 해당 소재만 새 견적으로 준비하고, 기존 승인 비용 범위를 넘으면 구체적인 결과와 견적을 보여준다.
7. 관찰하지 않은 항목은 unverified다. 파일/구조 통과와 실제 고품질 판정은 다르다. 최종 영상의 전체 화면·소리·대본·자막·제품 사실을 검수하고 고객에게 보여준다.

## 컷별 참조와 상태

13구도·6표정 및 실제 브랜드 원본을 보존한다. `host.coverage`는 필요한 인물 면, 소품·브랜드, 배경 사용 흔적, 카메라와 동작 전후 상태를 소재와 편집 컷까지 연결한다. 한 beat에 여러 소재가 있으면 beat 수준 참조만으로 준비 완료를 만들지 않는다.

`guided_coverage_save`는 기존 참조에서 호스트가 파생한 `{assetId,beatId,characterIds,productIds,characterViews,environment,environmentLock,firstFrame,camera}` 묶음을 run/revision에 저장한다. 실제 프로젝트의 PNG/JPEG를 확인하고 이미지가 바뀌면 이전 묶음을 무효화한다. 카메라가 이동하며 중간에 나타날 얼굴·몸·제품 면은 실제 연출에서 따로 검토한다. 이 기록은 자동 이미지 관찰이나 실제 제품 후면 확인을 대신하지 않는다.

새 이미지·추가 면은 현재 지원 도구와 승인 범위로 준비한다. 생성한 제품 면은 브랜드가 제공한 실제 원본과 구분한다. 최종 생성 입력은 `direction_save`와 `reference_prepare`에서 같은 참조를 사용하고 컴파일 결과를 확인한다.

모든 인물 컷은 sceneChecks 네 항목을 검수한다. 화면 발화는 3개 생성 모델 × 순정/립싱크의 명시된 6개 경로를 따른다. 무발화·손 전용 컷에 대사를 추가하지 않는다. Meta Guide의 필재와 LOTUS-Q의 서현 전문을 서로 상속하지 않는다.

## 호출 예시

```javascript
let current = await guided_start({projectId, requestId: uuid(), objective: '제품 광고 첫 시안'});
while (current.host.nextAction) {
  current = await guided_advance({
    projectId, runId: current.runId,
    expectedRevision: current.revision, requestId: uuid(), maxSteps: 12
  });
  if (["waiting", "failed", "no_progress"].includes(current.batch?.stopReason)) break;
  // waiting_job은 안내된 동일 작업을 간격을 두고 확인한다.
  // host.requiredAction은 실제 자료를 읽고 기존 도구로 수행한 뒤 guided_status로 이어간다.
}
// 실제 고객 답변 또는 같은 내용의 기존 선택을 확인한 경우만:
current = await guided_decision({
  projectId, runId: current.runId, expectedRevision: current.revision,
  requestId: uuid(), decisionId: current.customer.decision.id,
  decisionSha256: current.customer.decision.sha256,
  choice: 'confirm', source: 'existing_customer_choice',
  note: '기존 고객이 승인한 동일 대본 전문과 목소리를 재사용'
});
```

실행기 필수 입력을 고객에게 복사/붙여넣기시키지 않는다. requestId는 호스트가 생성하고 재시도는 동일 ID를 유지한다. 새 run으로 바꾸거나 성공한 결과를 재생성하지 말고 현재 프로젝트·작업을 이어간다. 최종 결과 전달은 기존 게시 권한과 실제 검수된 결과를 확인한 후 수행한다.

## 화면 발화의 6개 경로 — 1.7.0

`direction.generationModel`은 `minimax-h3`, `seedance-2`, `seedance-2.5` 중 하나, `direction.speechMode`는 `native` 또는 `lipsync`다. 이전 연출에 speechMode가 없으면 기존 립싱크 규칙을 유지한다. 기존 프로젝트를 다른 경로로 자동 전환하지 않는다.

순정(native)은 화면 발화 beat의 `original_dialogue`와 원본 얼굴·발화를 유지한다. `native_audio_prepare`는 인증된 현재 모델 원본에서 WAV를 추출하고 `editBinding`과 `dialogueTracks`를 반환한다. `audio_set`으로 원본 영상의 소리를 dialogue 트랙에 별도로 선택하고 영상 레이어는 무음으로 조립해 중복 음성을 막는다. 원본을 자료화면용 클로닝 샘플과 분리해 보존한다. 순정 원본 대사도 정확한 승인 문장을 전부 말했는지 실제 소리·입모양을 대조한다.

`voice_clone_quote({projectId,assetId,jobId,requestId,name,sourceRightsConfirmed:true,singleSpeakerReviewed:true})`는 같은 프로젝트·원본·추출 음원에 묶인 등록 견적이다. `voice_clone_submit({projectId,jobId,approvalId})`는 현재 비용 설정과 원본/샘플을 실제 대조한 operator 승인 범위가 있을 때만 접수한다. `voice_clone_status`의 성공한 `clone_voice_id`를 같은 프로젝트 내 `voice_quote`의 voiceId로 사용해 자료화면 내레이션도 같은 목소리로 만든다. 현재 비용/플랜/슬롯이 설정되지 않으면 등록 가능이라고 추측하지 않는다. 클로닝 샘플 추출은 로컬 ffmpeg이며 서버의 파형 동등성 인증이 아니다. 실제 원본과 샘플 청취 확인은 별도로 필요하다.

립싱크(lipsync)는 세 모델의 현재 원본 + 지정 Typecast 승인 전문 구간 + Kling `lip_sync`다. 현재 어댑터는 5초 입력으로 제한한다. 원본에 음성이 있어도 원본 바이트를 보존하고 `local_dubbing_url`로 선택 음성을 제공한다. 제공사 요청에 특정 Kling 영상 생성 버전은 고정돼 있지 않으므로 Kling 1.5/2.6/3이라고 임의 표기하지 않는다.

모든 화면 발화는 `faceIntegrityChecks`의 `face_detail`과 `identity_stability`를 실제 영상에서 pass로 검수해야 한다. 립싱크 전후 얼굴 세부 질감·윤곽·움직임을 비교하고 손상된 결과는 해상도 업스케일로 합격시키지 않는다. 순정은 `nativeSpeechChecks`, 립싱크는 `lipSyncChecks`로 실제 발화·입모양을 검수한다.

## Seedance 얼굴 없는 입력 분기 (MCP 1.9.3)

Seedance에는 공통 인물 시작 프레임 절차를 적용하지 않는다. `seedanceInput={policy:"seedance-face-free-v1",mode,character,references}`를 사용하며 mode는 text_to_video/omni_reference/first_last_frames다. 인물은 CHARACTER 영어 정확히 150단어로 기술한다. 실제 제공사 참조에는 얼굴 없는 제품·배경만 넣는다. 13구도·6표정 인물 카드는 기획·검수용으로 보존한다.

각 참조는 실제 file/SHA-256/role/inspection을 기록한다. inspection은 호스트가 이미지 전체의 직접 얼굴·포장·포스터·화면·반사를 관찰한 결과다. present/unclear/누락/해시 변경은 접수 전에 차단하며 독립적인 자동 얼굴 인증으로 주장하지 않는다. 모델의 인물 정책·실제 출력 품질은 별도 검수 대상이다. 제품 사진을 first_frame 역할로 바꾸지 않는다. 기존 승인 인물·전문·타이밍·목소리는 유지한다.

9개 블록 SETTINGS→INPUT CHECK→REFERENCE ROLES→CHARACTER→SCENE AND ACTION→COMPOSITION AND CAMERA→LIGHTING AND MATERIALS→AUDIO→CONTINUITY를 유지하며 전체 프롬프트는 4000자 이내다. reference_prepare와 guided_coverage_save는 Seedance 분기를 지원한다. 준비된 제품 보존·카메라·세계관·반전 증거 한계도 최종 프롬프트에 결박한다. 같은 자료의 관찰 시각만 변경해서 유료 접수를 중복하지 않는다.

## 고객 한도·사용량 질문 생략 (2026-10-07)

고객에게 크레딧 한도·사용량·총 예산 숫자를 묻거나 입력시키지 않는다. 호스트가 `connection_diagnose` → `production_check`와 해당 작업의 status·quote로 서버 잔액·보류 금액·기존 승인 범위·현재 견적을 직접 확인한다. 고객이 요청한 작업이 기존 승인 범위 안이면 한도 질문이나 반복 승인 없이 진행한다. 조회 실패나 미확인은 고객에게 숫자를 물어 해결하지 않고 조회 복구 또는 정확한 진단을 안내한다. 실제 잔액 부족·권한 제한이 확인될 때만 부족분/제한과 지원되는 충전·재연결 등 구체적인 해결 행동을 안내한다.

`automatic:false`/`executionAuthorized:false`는 응답 자체가 실행하거나 권한을 부여하지 않았다는 뜻이며 고객에게 다시 물으라는 뜻이 아니다. `host.requiredAction`은 호스트가 현재 도구와 실제 자료로 처리한다. 고객의 대본·목소리·연출 선택과 서버의 기존 한도·권한은 보존하며, 한도 확대·충전·새 결제·진행 중 작업의 중복 접수를 자동으로 만들지 않는다.


## 미해결 피드백의 원본별 복구 (1.9.22)

`guided_status.host.repairPlan`은 미해결 검사를 실제 원본 SHA별로 묶고 같은 run의 성공 작업과 대조합니다. `historical_generation`은 원본을 검사할 수 있으나 현재 모델/촬영과 같다고 볼 수 없다는 뜻입니다. `current_generation`도 품질 합격이 아닙니다. 모호하거나 연결되지 않은 피드백은 임의 첫 소재로 옮기지 않습니다.

`repair_inspection`은 원래 jobId의 `generation_inspect(profile=motion)`을 이어갑니다. 같은 검사 요청을 재사용하고 pending이면 상태를 확인합니다. 완료되면 `repair_observation`의 원본 SHA·inspectionId·검사 자료를 실제로 보고 듣고 `feedback_save`로 관찰 범위와 문제를 기록합니다. 무음 검토본으로 음성을 들었다고 기록하지 않습니다. 과거 H3/립싱크 문제를 이유로 현재 Seedance/native 선택을 롤백하지 않습니다. 원래 피드백과 검사는 별개로 보존되며, 해결된 새 결과를 관찰하기 전에는 resolves/pass를 만들지 않습니다.

`repairPlan.independentActions`는 미해결 원본과 다르고 현재 모델·정확한 촬영 입력(검증된 재사용 포함)에 맞는 성공 작업의 검사 인자입니다. 호스트는 이 자료 검사를 독립적으로 진행할 수 있습니다. 새 유료 생성·대본/목소리 변경·납품 승인이 아니며, 남은 피드백은 최종 진행 전에 처리합니다. `pendingFeedback`과 `nextUnresolvedAfter`도 확인하여 전송 실패나 다음 페이지를 숨기지 않습니다. `GUIDED_REPAIR_INSPECTION_MISMATCH`이면 같은 작업의 코드별 복구 문서를 읽습니다.

### 미전송 피드백의 원문 보존

`host.repairPlan.pendingFeedback`의 payload/runId/requestId/recovery도 읽으세요. SOURCE_MISMATCH는 기획의 ready revision 또는 원본의 done 검사 연결을 복구하기 전 자동 반복하지 않습니다. 복구 후 recovery.retryAfterRepair의 feedback_list 인자를 사용합니다. 중앙 incident와 source-bound 검토 저장은 별개입니다. 역사 본문을 현재 모델·목소리·승인으로 자동 상속하지 않습니다. 원본이 아직 없어도 원래 본문은 blocked_feedback 메모로 별도 중앙 보관됩니다. project_note_list와 noteHistory 수신을 확인하고 원래 품질 검수 pending은 유지합니다.

## 독립 작업과 납품 차단

`host.workboard.tasks`는 현행 소재별 준비·다운로드·검수·견적 입력을 나열한다. 원래 오류와 미해결 의견은 `repairPlan`에 보존하고 `deliveryBlocked`가 true이면 납품으로 넘기지 않는다. 과거 영상의 문제가 다른 현재 소재의 준비까지 막지는 않는다. 같은 컷의 수정 결과도 원래 거부된 SHA와 구분해 검사하며, 실제 새 결과를 관찰하기 전에는 resolves/pass를 기록하지 않는다. 제공사 실패는 해당 소재에 남기고 다른 준비를 이어간다.

새 세션의 `guided_status`는 오래된 제공사 상태를 다시 조회하게 하지만, 입력 버전이 같은 컴파일·원음·검사 준비 결과는 보존한다. 입력/프로젝트 연결이 바뀌면 기존 바인딩 검증을 적용한다. 호스트는 오류의 `workflow.diagnose`, 원래 작업 ID, 코드별 `readNext`, 중단 조건을 함께 읽으며 같은 상태의 실패 호출을 반복하지 않는다. 내부 requiredInput은 기존 자료·현재 model_catalog와 quote로 호스트가 채운다. 고객에게 한도·사용량 숫자를 물어 채우지 않는다.


## 준비 콘티 저장과 서버 견적 일치

`storyboard_compile`은 준비된 소품·배경·카메라 지시까지 포함한 최종 콘티를 저장합니다. 이전 원문 바이트와 검증된 기존 촬영 재사용 이력을 보존합니다. `persistence.sha256`과 완료된 업로드의 `cloud.storyboardSha256`이 다르면 호스트가 `project_sync`와 같은 전송의 `job_status`를 이어갑니다. `guided_advance`도 새 촬영 견적 전에 이 경로를 자동 준비합니다. 기존 성공 원본의 다운로드·검수는 계속 진행할 수 있습니다.

`HIOB_STORYBOARD_SYNC_REQUIRED` 또는 `DESKTOP_PRODUCTION_DIRECTION_INPUT_CHANGED`는 `hiob://error-recovery/<code>`의 저장→동기화→같은 소재 견적 절차로 복구합니다. 원래 request/run과 incident를 보존하고 필드 차이를 확인합니다. `error_record`의 blocked 상태는 원래 작업의 상태이며, 기록 자체의 실패가 아닙니다. 생성 길이 제한 때문에 새 생성이 차단된 기존 촬영은 compile의 reuse와 generation 상태를 읽고 원본을 보존합니다. 검증·권한을 우회하거나 고객에게 예산 숫자를 묻지 않습니다.
