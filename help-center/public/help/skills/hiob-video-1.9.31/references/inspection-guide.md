# HIOB 검사 접수와 대기 처리

영상·음원 검사를 여러 프로젝트에서 함께 진행할 때 읽는다. 이 한도는 서버 검사 작업 수이며 이미지·영상 생성 수, 렌더 허용 횟수, 크레딧, 업로드 파일 수와 별개다.

| 항목 | 적용 범위와 한도 |
|---|---|
| 미완료 검사 | 워크스페이스 전체에서 queued + dispatching + processing 합계 10,000개 |
| 신규 검사 접수 | 워크스페이스별 UTC 하루 10,000개 |
| 검사 실행 | 워크스페이스별 UTC 하루 10,000회. 재시도도 포함 |
| 실제 병렬 처리 | 전체 서버에서 활성 검사 4개. 나머지는 큐에서 처리 |
| 일일 한도 초기화 | UTC 00:00, 한국 시각 09:00 |

오디오·소재 영상·생성 영상·최종 MP4가 한도를 공유한다. 프로젝트마다 10,000개가 아니므로 폴더나 프로젝트를 나눠 한도를 우회하지 않는다. 기존 권한·원본 해시·검사 설정이 일치하는 완료 결과는 재사용한다. `inspectionPolicy`는 배포 정책 안내이며 현재 사용량이나 남은 수량의 실시간 조회가 아니다.

## 에이전트 실행 순서

1. 필요한 애셋을 검색·선택하고 자료별 프로젝트 ID, 파일/생성 jobId, 해시, 검사 옵션, requestId와 반환된 검사 jobId를 기록한다. 한 번의 도구 호출에 모든 애셋을 넣지 말고 도구 스키마에 맞게 한 건씩 접수한다. 10,000개의 HTTP 호출을 동시에 쏘지 않는다.
2. `audio_inspect`에는 같은 요청의 requestId를 재사용한다. 응답에 검사 jobId가 있으면 `audio_inspection_status(projectId, jobId)`로 조회한다. `generation_inspect`, `material_inspect`, `review_evidence`, `review_listen`은 동일한 인자로 재호출하면 저장한 검사 작업을 이어서 조회한다. 생성 jobId와 검사 jobId를 혼동하지 않는다.
3. `queued`, `dispatching`, `processing`, `pending:true`는 대기/진행 상태다. 실패나 새 렌더가 필요한 상태로 해석하지 않는다. 약 60초 간격으로 조회하고 계속 대기하면 조회 간격을 늘린다. 호출이 끊겼다면 같은 requestId 또는 같은 도구 인자로 상태를 확인한다. 자동 푸시나 완료 시각은 보장되지 않는다.
4. 다른 자료의 검색·분류·기획·검토는 계속할 수 있다. 해당 검사가 필요한 편집 연결·최종 품질 판단은 `done`과 실제 결과를 확인한 뒤 진행한다. 수치나 프레임만으로 실제 발화·동작·창작 품질을 합격 처리하지 않는다.

## 한도와 오류 대응

- `DESKTOP_MEDIA_PENDING_LIMIT`: 워크스페이스의 미완료 10,000개가 가득 찼다. 새 접수는 잠시 멈추고 이미 받은 작업 ID를 조회한다. 공간이 생기면 거절된 같은 요청을 재시도한다. 원본·다른 진행 작업을 삭제하지 않는다.
- `DESKTOP_MEDIA_DAILY_LIMIT`: UTC 일일 신규 접수 한도다. 다음 UTC 00:00 이후 같은 요청을 재시도한다. 이미 완료된 결과는 현재 권한으로 재사용한다.
- 접수는 성공했지만 일일 실행 10,000회에 도달하면 작업은 queued로 남을 수 있다. 다음 UTC 날짜에 자동 재개된다. 단순 대기 상태만 보고 일일 한도 때문이라고 단정하지 않는다.
- `DESKTOP_MEDIA_LIMIT_INVALID` / `DESKTOP_MEDIA_DISPATCH_UNAVAILABLE`: 워커 설정 또는 배포 불일치 가능성이 있다. 접수한 작업을 보존하고 코드·영향받은 작업·확인 시각을 보고한다. 클라이언트 재설치나 새 유료 생성으로 해결됐다고 말하지 않는다.
- 연결 만료/권한 오류는 `connection_diagnose`로 별도 확인한다. 검사 한도가 늘어도 연결 기간·프로젝트 권한은 바뀌지 않는다.

MCP의 오류 `structuredContent`에서 code, inspectionPolicy, recovery를 읽는다. `automaticRetry:false`와 `createNewRequest:false`는 오류만 보고 자동 재제출하지 말라는 의미다. 한도 오류를 유료 영상 생성·Typecast 합성·렌더 재실행으로 해결하지 않는다. 명시적으로 재시도할 때는 위 조건을 확인하고 동일한 검사 요청의 식별자를 보존한다.


## 실패한 최종 검사의 제한된 복구

일반 `review_evidence`/`review_listen` 호출은 실패한 검사 jobId·requestId를 보존한다. 오류 응답의 `incident`와 `inspectionRetry`를 확인한다. 고객에게 내부 ID·사용량·승인을 다시 작성하게 하지 않는다.

최종 inspectorVersion3의 `MCP_MEDIA_INSPECTION_FAILED` 또는 `MCP_MEDIA_INSPECTION_TIMEOUT`이면 호스트가 `inspection_retry_prepare(projectId, inspectionId)`로 인증된 현재 failed 상태와 동일 원본·렌더·inputSha를 확인한다. 호스트 추가 시도는 같은 검사 대상별 1회이며 서버 내부 재시도와 별개다. 준비 자체는 접수하지 않고 다음 `review_evidence(projectId,target=final)`가 준비된 requestId로 검사한다. 통신 결과 불명은 같은 요청으로 확인한다. 이전 실패 receipt는 attempts 이력에 보존된다.

이미 준비한 ID로 재호출하면 같은 준비/진행 작업을 반환한다. 추가 시도도 실패하면 `HIOB_INSPECTION_RETRY_EXHAUSTED`로 멈춘다. queued/processing/done·다른 원본·권한 실패·손상 코드에는 이 준비를 적용하지 않는다. 새 UUID를 고객에게 요구하거나 내부 JSON을 지워 상한을 우회하지 않는다. 원본 다운로드와 지원된 독립 관찰은 계속할 수 있으나 서버 검사가 실패한 최종본을 자동 합격·전달 완료로 표시하지 않는다. 실행기 로그·원본 조건을 실제로 수리한 다음 지원되는 복구 경로를 사용한다.
