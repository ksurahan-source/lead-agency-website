# 조사 출처와 HIOB 분기

2026-10-09 조사. HIOB 지침은 독립적으로 작성했으며 원본 실행기나 모델 어댑터를 복사하지 않았다.

- [Act Skill](https://github.com/yuyolin/act-skill/blob/6752cec9efd5d4a71575192599fc0530db7351f8/skills/direct-ai-actor-performance/SKILL.md), MIT: 외적 목표/내적 억제·trigger·변화·잔류, 시선/몸/호흡/말 beat를 참고. 원본 감정군은 HIOB 육도가 아니다. Seedance 인물 참조 어댑터, 1~2개 연속성 anchor로 축약, 한글을 세지 않는 `validate_timeline.py`는 채택하지 않음. 한국어 문장이 0.12초로 계산되는 결함을 읽기 전용 조사에서 확인함.
- [Story Video Director](https://github.com/zlbigger/story-video-director/blob/ecacc4fd125c525e4fd034734b27c5e5a2bc69f7/story-video-director/SKILL.md), MIT: 소품 상태 ledger·인접 컷 양쪽 실제 영상/소리 검수를 참고. 얼굴 카드 추출 참조와 별도 유료 executor는 HIOB에 적용하지 않음.
- [Temporal durable workflow sample](https://github.com/temporalio/samples-typescript/blob/07a4b3a991ef0b17eed46ecf92a774169297e345/expense/src/workflows.ts): 명시 상태·query·대기 방법을 참고. 외부 submit 응답 유실은 일반 retry가 아니라 기존 job의 reconciliation으로 처리한다. 새 Temporal 서비스는 설치하지 않았다.
- [Langfuse 평가](https://langfuse.com/docs/evaluation/overview): feedback을 실제 artifact/revision/trace에 연결하고 다음 회귀/기획으로 이어가는 방법을 참고. telemetry score는 고객 승인이나 실제 결과의 권위가 아니다.

HIOB 영혼의 관찰→살아 있는 고객 상황→감정의 연기→제품 변화→측정/다음 기획을 목표로 한다. 과거의 인물 생성 금지·3배역 강제와 최신 가상 인물/단일 나레이터 선택이 충돌하면 최신 founder 지시를 따른다. 육도 표는 감정 변화의 출발점이며 실제 영상 품질을 보장하지 않는다.
