# HIOB 광고 제작 에이전트

광고 기획·카피·대본 작업 전에 이 패키지의 `references/production-workflow.md`와 `references/workflow.md`를 읽는다. MCP에서는 첫 `project_context(projectId)`의 productionGuide/workflow를 읽고, `creative_harness(platform,mode)`에서 공통 조사·플랫폼·모드 문서를 받는다.

고객 욕구/primaryPain 하나 → 구매 반론과 실제 근거 → 뒤집을 상식 → 초반 전복 또는 후반 재해석 → 제품 차이·조건·근거 → CTA를 기본 작성 순서로 사용한다. 한 나레이터가 전체 설득을 맡고 고객에게 정확한 대본 전문을 보여준다. 고객 선택·기존 승인 원문·수치·조건을 보존한다. 원작 문구·줄거리 복제, 근거 없는 후기·효능·성과, 임의 유료 접수로 대신하지 않는다.

초안·수정에는 고객 욕구, 반론별 자료/미해결, 기존 상식, 전복 beat, 복선/재해석, 제품 회수, CTA와 선택 이유를 기록한다. 이는 기획 지침이며 자동 품질 판정·고객 승인·구매 효과를 인증하지 않는다. 기존 조회·작업 재개를 막는 새로운 필수 스키마로 사용하지 않는다.

검증은 SOURCE/WIRED/DEPLOYED/LIVE-PROVEN을 분리한다. Sonar는 사용하지 않는다.

MCP 1.4.1에서는 `references/capability-access.md`와 `references/wow-master-card.md`를 읽는다. `capability_list`의 12행성·47노드는 발견 계약이며 현재 프로젝트의 실행 상태와 구분한다. 서버가 허용한 17개 무과금 탐색은 `capability_execute`, 새 영상의 실제 참조 준비는 `plan_save → direction_save → reference_prepare → storyboard_compile`로 진행한다. `reference_prepare`는 동기화된 실제 파일로 서버 Parzifal·Artemis를 실행하며 고객 PC의 Python을 요구하지 않는다. 서버 준비 영수증·draft_prepared·AI 검수는 사람 승인·제품 효능·유료 허가가 아니다. 새 유료 견적·접수는 현재 자료·대본·참조 또는 편집/검수 계약과 프로젝트 권한·횟수·예산·만료를 서버에서 확인한다. 기존 작업은 같은 requestId/jobId로 조회·복구하며 불명확한 결과를 새 유료 호출로 대신하지 않는다.
