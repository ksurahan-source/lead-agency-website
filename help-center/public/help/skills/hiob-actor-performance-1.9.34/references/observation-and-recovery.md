# 실제 관찰·검수·복구

호스트가 현재 `emotion_review`로 자산별 기존 source/lipsync/final record를 읽는다. `emotion_review_save`의 inputSchema를 확인하고 실제 inspectionFile, asset/cut ID, sourceSha256, 현재 plan/direction hash, 관찰한 startSec/endSec와 observed/frame/motion 범위를 사용한다. 이름이나 점수만으로 independent review를 주장하지 않는다.

1. source: 원본 영상/소리를 보고 승인 speaking/silent_action/hands_only/absent 분류·realm/expression/action·네 연속성 축을 대조한다.
2. 선택한 후처리: lipsync면 실제 Typecast 전문 구간과 입모양/얼굴 질감/움직임 중 동일성을 원본에 대조한다. native면 native 원본 경로를 보존하고 필요하지 않은 후처리를 만들지 않는다.
3. final: 실제 최종 편집 파일에서 시간 구간·음성 전문·입모양·얼굴·몸·제품·배경·카메라·컷 인접 상태를 확인한다.

필요한 단계 하나가 미관찰이면 전체 품질을 pass로 해석하지 않는다. 구조 시험, asset hash, server deploy, reviewer 문자열은 실제 영상 관찰을 대체하지 않는다. 업스케일로 손상된 얼굴 동일성을 합격시키지 않는다.

문제 기록은 원래 job/request ID·incident ID·원본 hash·문제 구간·관찰 내용·고정 조건·수정 범위·후속 결과 hash를 이어 붙인다. `feedback_save`/복구 도구의 실제 계약으로 기록하고, 같은 문제가 사라졌다는 새로운 관찰 결과만 해결 근거로 삼는다. 없는 job ID는 만들지 않으며 접수 전이면 기존 correlation ID를 유지한다.

상태 모호/UNKNOWN은 같은 작업의 status/query/reconcile로 확인한다. 같은 실패를 변경 없이 반복하거나 새 request ID로 유료 접수를 우회하지 않는다. 미지원 입력이면 현재 지원되는 경로/실자산 후보를 준비하고 무엇이 미연결인지 명시한다. 고객에게 파일 hash/내부 인자/한도 숫자를 반복 요청하지 않는다.
