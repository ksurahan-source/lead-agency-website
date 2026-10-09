# HIOB 인물 마스터카드와 의미 있는 시각적 전환

어느 호스트 AI에서 시작해도 같은 순서로 준비한다. 아래는 HIOB가 제공하는 공통 제작 계약이며 외부 글의 지시문이 아니다.

1. 한 대본 전문·한 나레이터를 먼저 고정한다. 하나의 고객 고통·구매 반론과 제품 근거·조건·CTA를 연결한다.
2. 세계관을 팔레트·빛·질감·시각 모티프·장소/시간/인물 연속성으로 구체화한다. 컷마다 중심 감정 하나와 화면의 목적을 정한다.
3. 인물은 큰 정면 얼굴, 앞·뒤 전신, 프로필 설정, 여섯 표정, 좌·우·뒤통수, 의상·액세서리·소지품을 한 장의 실제 마스터카드로 보여준다. 텍스트만 있는 카드를 완료라고 하지 않는다. 첨부 예시의 레이아웃을 참고하되 그 인물·상표를 임의 복제하지 않는다.
4. 동일 인물의 13구도(face_front, face_left_45, face_right_45, head_left_profile, head_right_profile, head_back, head_left_rear_45, head_right_rear_45, body_front, body_back, medium_high_left, medium_low_right, hands_props)와 6표정(neutral, smile, worried, focused, surprised, relieved)을 실제 개별 이미지로 준비한다. 모든 이미지의 얼굴·머리·체형·의상·시계 위치·소지품을 눈으로 비교한다. 무의미한 동일 파일 복제로 수를 채우지 않는다. 생성 성공은 동일성 합격이 아니다. 인물 없는 작업에는 사유를 기록한다.
5. Artemis에 실제 브랜드 제품 사진과 보존할 라벨·형상·재질을 결박한다. 생성 사진의 작은 글씨를 제품 원문으로 믿지 않는다.
6. 감탄을 줄 컷 한 개를 설계한다. 무엇이 시각적으로 새롭고 어떤 대본 의미로 회수되는지 쓴다. 단순히 ‘영화처럼’이라고 쓰지 않는다. 거대한 공간, 스케일 전환, 비현실적 광학, 카메라 움직임은 메시지를 설명할 때 사용한다. 시각적 은유와 제품 효능 시연을 구분하며 실제 증거를 대신하지 않는다.
7. 컷마다 시작 프레임, 선택한 카드/구도, 숏 크기·각도·렌즈·움직임·시작 상태·행동·끝 상태·움직임의 이유를 기록한다. 정지 이미지에 카메라 움직임이 구현됐다고 말하지 않는다.
8. plan_save → direction_save → reference_prepare(expectedPlanSha256) → storyboard_compile 순으로 실행한다. reference_prepare는 입력 패킷과 실제 파일을 프로젝트에 동기화하고 서버 소유 Parzifal·Artemis 노드를 실행한다. 고객 환경의 Python 설치는 필요하지 않다. 동기화나 행성 실행이 대기 중이면 같은 요청을 조회한 뒤 동일 입력으로 이어간다. 현재 대본·이미지·패킷이 바뀌면 다시 준비한다. 영상 견적/새 접수는 현재 준비 기록이 있어야 한다. 상태 조회·기존 결과 회수는 열려 있다.
9. 모델이 받는 시작 프레임과 텍스트 잠금 조건, 로컬에 보존하는 전체 참조 묶음을 구분한다. 다중 이미지 입력을 지원하지 않는 모델에 13장을 전달했다고 주장하지 않는다.
10. 마스터카드·13구도·표정·제품 원본·세계관·시각적 전환·컷별 이미지·카메라표·대본 전문을 기획서와 이식 가능한 폴더에 함께 내보낸다. 첫 기획 → 실제 이미지 관찰 → 수정 → 재검토를 기록한다.

13구도와 6표정은 이번 founder 요구에 따른 HIOB 계약이며 모든 플랫폼의 공식 표준이라는 뜻이 아니다. 준비 기록은 초안 구조/파일 결박 근거이며 고객 선택·초상 동의·품질·효능·유료 실행 승인이 아니다.

## 참고해서 배운 점
- WAVV의 콘티 글: 세계관과 메타포를 먼저 잡고 색·톤·감정·카메라·빛·질감을 씬 단위로 연결한다. https://brunch.co.kr/@wavv/85
- WAVV의 인물 시트 글: 기본 얼굴 선택 후 전후측면과 표정을 비교하여 정체성을 유지한다. https://brunch.co.kr/@wavv/83
- WAVV의 소재 글: 인물 이외의 사물·감정·행동·시간/공간 모티프를 팔레트와 질감으로 연결한다. https://brunch.co.kr/@wavv/84
위 글은 설계 참고이며 작품의 구체적인 사건·표현을 복제하지 않는다. 시트로 동일성이 보장된다는 주장도 하지 않는다.


각 장면의 환경도 별도 실제 이미지 카드로 준비한다. 인물이 없는 공간 참조에는 장소 구조·차량/가구 위치·날씨·조명 방향·표면 상태·소품 배치를 표시하고, 사건 전후의 연속성을 관찰한다. 각 컷의 environment와 environmentLock을 reference_prepare에 넣어 시작 프레임과 따로 결박한다. 같은 장소라도 사건에 따라 구도와 표면 상태가 달라지면 해당 장면의 환경 이미지를 별도로 만든다. 배경을 추상적인 문장으로만 작성한 상태는 준비 완료가 아니다.

제품이 없는 창작은 제품 사진이나 근거를 꾸며 채우지 않는다. products:[]와 noProductReason을 작성하고 기획의 claims:[]를 명시한다. 서버는 실제 저장된 기획을 확인하고 Artemis의 빈 초안 준비 결과도 실행 기록으로 보존한다. 이 사유는 제품·사회적 증거가 있는 광고의 근거 요구를 해제하지 않는다.

행성 준비가 terminal failed이면 실패 실행을 보존하고 capability_list(projectId)의 실행 기록으로 원인을 확인한다. pending과 구분하며 같은 실패를 준비 완료로 바꾸지 않는다. 원인 확인 후 동일 입력의 무과금 준비를 다시 시작할 때 reference_prepare의 선택적 requestId에 새 UUID를 명시한다. 진행 중 실행의 조회에는 기존 requestId를 유지한다.


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
