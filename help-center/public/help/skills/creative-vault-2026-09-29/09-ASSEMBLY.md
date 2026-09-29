---
id: assembly
version: 2026-09-29.3
---

# 설계표를 HIOB 도구로 옮기기

사용 시점: 좋은 기획이 저장·조립 단계에서 바뀔 때

## 설계와 도구 입력을 구분한다
Vault의 그룹 표는 편집 의도를 표현하는 작업 문서다. groupDuration 같은 필드를 임의로 API에 넣지 않는다. 먼저 실제 스키마를 확인한다.

## 연결 순서
1. project_context에서 현재 기획·음원·소재·serviceScope·Vault를 읽는다.
2. plan_save의 beats는 실제 발화와 claimIds를 보존한다. direction_save의 컷/자산은 승인된 참조와 제품 동작에 연결한다.
3. 같은 원본을 여러 cut으로 쓸 때 source in/out이 실제 필요한 행동을 포함하는지 확인한다. 서로 다른 의미 묶음에 같은 장면을 넣었다고 새 사건이 생기지는 않는다.
4. 기획 해시가 바뀌면 기존 음원을 새 기획에 맞게 다시 연결하되 변경 없는 파일을 재합성하지 않는다.
5. audio_set → edit_check → edit_assemble. queued는 완료가 아니다. job_status로 같은 접수 결과를 조회하고 timeout이라고 새 작업을 중복 생성하지 않는다.
6. project_sync → render_quote → 유효한 기존 승인 안의 render_start → render_status → render_download. 실제 AWS 결과를 검수한다. 서버 실패를 로컬 final로 대신하지 않는다.

## 한계
현재 공개 편집은 고정 V1 계약이다. 자유 TSX/CSS·임의 좌표·고급 전환·자동 입모양 재생성이 지원된다고 가정하지 않는다. 렌더 비용·생성 원본 비용·목소리 비용은 별개이고 서버 견적이 기준이다.

## AI 프롬프트
기존 그룹 설계를 현재 plan/direction/audio/edit 스키마의 어느 필드로 옮길지 대응표를 먼저 써. 표현할 수 없는 부분은 지원 가능한 대안을 제시해. 기획·실제 음원·조립·납품의 버전이 같고 원본이 복원되는지 확인해.

## 통과 기준
각 묶음의 메시지·컷·대사·제품 근거가 저장된 편집과 실제 MP4에서 동일하다. 기능 검사와 광고 품질을 분리해서 보고한다.

관련: [수리](11-REPAIR.md), [45초 예시](10-WORKED-EXAMPLE.md).

가로/세로를 함께 납품할 때는 [화면비별 제작](12-LANDSCAPE.md)의 구도·재사용·각 출력 검수를 따른다.
