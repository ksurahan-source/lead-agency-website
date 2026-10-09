# 고객 Codex의 기능 선택과 제작 준비 — 1.4.1

이 릴리스의 발견 계약은 12행성·47노드다. 서버가 허용하는 무과금 탐색 노드는 17개다. 계약의 존재, 서버 실행 가능 상태, 실제 고객 결과는 각각 확인한다. 모든 노드를 같은 광고에서 실행하거나 모든 유료 모델을 호출하는 규칙은 아니다.

## 먼저 실행할 도구

1. 기존 프로젝트의 `project_context`를 읽어 원문·정확한 한 나레이터 대본·선택한 소재·음원·편집과 기존 requestId/jobId를 복원한다.
2. `capability_list()`에서 도구와 계약을 찾고 `capability_list({projectId})`로 현재 서버 권한과 실행 상태를 확인한다.
3. 현재 실제 파일을 `project_sync`로 저장한 뒤 `capability_prepare({projectId,action:"planning"})`로 준비된 책임과 부족 자료를 읽는다.
4. 새 영상은 실제 견적 입력 `plan`과 action=generation, 화면을 편집하는 렌더는 현재 `inputSha`와 action=render로 준비한다. 반환된 `receiptId`를 해당 견적의 `readinessReceiptId`에 연결할 수 있다. quote/submit은 저장된 실제 입력과 현재 권한을 다시 확인한다.

## 열두 행성의 책임

| 행성 | 책임 | 고객의 기존 도구 경로 |
|---|---|---|
| janus | 제품 사실·원본 출처·고객 욕구와 반론 | `project_context` |
| ares | 한 나레이터 전문·비트·승인 원문 보존 | `plan_save` |
| athena | 승인 비트·실제 참조·영상 프롬프트의 결박 | `direction_save` |
| orpheus | 원문·화자·발화 끝·타이밍·음량 | `audio_set` |
| apollo | 효과음의 목적·타이밍 또는 검증한 미사용 | `sound_library` |
| parzifal | 인물·제품·목소리 참조 정체성과 허용 변화 | `character_import` |
| karma | 원본·입력·행성 사이 버전 정합 | `project_context` |
| hermes | 발행 대상·명시적 전송 권한·실제 전송 결과 | `capability_list` |
| metis | 승인 훅 결박·실제 소재와 성과 연결 | `capability_list` |
| atropos | 같은 승인 입력의 조립·해시·재현성 | `edit_assemble` |
| artemis | 실제 제품·증거 참조의 출처·봉인 | `asset_list` |
| hephaestus | 실제 렌더·입력과 결과 해시·필수 검수 상태 | `render_quote` |

Studio는 권한·동기화 원본·서버 준비 영수증·유료 접수를, Star는 실행과 기존 작업 복구를 맡는다. MCP는 로컬 기획·편집·정확한 입력 조합과 전달을 맡으며 다른 행성의 Python 구현을 복사해 실행하지 않는다. 과거 8개 story_video 저장소는 현행 소유자와 연결된 이력이며 별도 활성 행성이 아니다. 고정 기본 얼굴이나 임의 인구통계를 고객 사실로 복원하지 않는다.

## 무과금 탐색

`capability_execute({projectId,nodeId,input,requestId})`는 현재 서버가 허용한 아래 탐색 노드만 호출한다. 호출 전에 반환된 실제 입력/출력 스키마를 읽는다. 같은 requestId로 실행을 복구하고 완료/실패/대기를 구분한다.

- `janus.intake.interpret`
- `janus.proof.harvest`
- `athena.director.plan`
- `athena.visual.safe_prompt`
- `orpheus.audio.select_music`
- `orpheus.audio.resolve_voice`
- `apollo.sfx.select`
- `apollo.sfx.from_plan`
- `parzifal.target.consolidate`
- `parzifal.target.generate`
- `parzifal.references.snapshot`
- `karma.edge.refine`
- `atropos.draft`
- `atropos.typed_snapshot`
- `artemis.references.snapshot`
- `parzifal.references.prepare`
- `artemis.references.prepare`

유료 제공사, DB 쓰기, 승인 봉인, 게시와 캠페인 측정은 전용 권한·제작 경로를 사용한다. 탐색 결과와 전송 영수증은 생산 준비나 사람 승인 영수증이 아니다. `project_publish`는 Studio의 현재 검수 완료본 전달이며 광고 채널 게시나 CAPI 전송과 다르다. `feedback_save`의 관찰 기록은 실제 전환 측정이 아니다.

## 새 영상의 실제 참조 준비

한 대본 전문 → 실제 이미지·카드 준비 → `plan_save → direction_save → reference_prepare → storyboard_compile → project_sync → storyboard_quote → generation_submit` 순서로 현재 입력을 연결한다. `reference_prepare`는 입력 패킷을 Studio에 동기화한 뒤 서버 Parzifal의 정체성 참조 준비와 Artemis의 실물 제품 참조 준비를 실행한다. 고객 PC에 Python을 설치하거나 로컬 코드로 행성 영수증을 만들지 않는다.

[마스터카드·13구도·6표정·세계관·컷 카메라](wow-master-card.md)를 읽는다. 화면에 등장하는 각 인물의 같은 카드 버전, 서로 다른 실제 PNG/JPEG 13구도와 6표정, 실제 제품 원본, 장면별 환경 이미지, 시작 프레임, 렌즈·구도·이동의 시작/행동/끝/이유를 연결한다. 한 정면 사진을 여러 구도로 선언하지 않고 참조 모델의 실제 입력 수를 확인한다. 인물이 없으면 noCharacterReason을 기록한다. 제품 없는 창작은 products:[]와 noProductReason, 실제 기획의 claims:[]를 명시한다. 이 사유로 제품·사회적 증거가 있는 광고의 근거 요구를 해제하지 않는다.

동기화 pending은 반환된 `job_status`를 조회한다. 행성 실행 pending은 같은 입력과 requestId로 `reference_prepare`를 다시 실행한다. terminal failed는 실패로 보존하며 pending이나 준비 완료로 바꾸지 않는다. 원인을 확인한 뒤 같은 입력의 무과금 준비를 새로 시작할 때만 선택적 requestId에 새 UUID를 쓴다. 입력·파일·대본·권한 변경은 새 준비 검사를 요구한다. 기존 접수 영상/음성/렌더는 먼저 같은 작업 ID를 조회한다.

준비 결과는 draft_prepared다. 원본 결박·카드 수·실행 기록은 사람 승인·초상권·제품 효능·유료 실행 허가·영상 품질을 인증하지 않는다. 실제 렌더 결과, 화면과 음향 검수, 고객 확인은 별도로 남긴다. SOURCE/WIRED/DEPLOYED/LIVE-PROVEN을 구분하고 테스트나 ZIP 제공을 유료 완성본 또는 고객 성공으로 보고하지 않는다.
