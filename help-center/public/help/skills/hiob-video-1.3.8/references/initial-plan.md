# 초기 기획서와 treatment 입력 양식

기획서에는 목표·타깃·플랫폼·주 모드·선택 이유 → 최근 영상 세 개 분석 → 비교 이미지 세 장과 추천 → 카드 보관함 → 장면별 사건/대사/소리/자료화면 → 초안 비평 → 수정 내역과 재검토 → 현재 미완료 항목을 보여준다. 실제 이미지와 설명을 나란히 놓고 ID 목록만 전달하지 않는다.

`plan_save` creativeBrief = {platform, mode, audience, objective}. 초안 저장 후 실제 내용을 고쳐 다시 저장한다. `creative_plan_save`는 expectedPlanSha256에 현재 project_context.writeVersions.planSha256을 쓴다. treatment:

- board: creative_board_check의 directions/selectedDirectionId/selectionBasis/cards/scenes. 카드 role에 background 추가. 각 카드 specification에는 구체적인 유지 조건을 문장으로 쓰고, image에는 status(provided/generated), locator(프로젝트 상대 PNG/JPEG 파일), observed(true)를 기록한다.
- conceptImages: {directionId, rationale, image} 정확히 세 개. 실제 서로 다른 이미지 파일/해시이며 cards와 별개다. directionId는 board의 방향 ID다.
- sceneCoverage: {beatId, characterIds, propIds, backgroundId}를 plan.beats 각각에 한 개씩. ID는 board.cards의 실제 카드 ID다. 소품 없는 화면도 화면의 중심 제품/화면 소품을 구체적으로 카드로 묶는다. 같은 카드는 재사용 가능하다. board.scenes의 id는 beatId와 같고 필요한 카드 ID 전부를 연결한다.
- noCharacterReason: 모든 장면 characterIds가 비면 인물을 쓰지 않는 이유. 음성만 나오는 나레이터를 화면 인물로 꾸미지 않는다.
- examples: {url, publishedAt(YYYY-MM-DD), observedAt(ISO 날짜시간), observed:true, hook, payoff, adaptation} 서로 다른 최근 영상 세 개. 필요 시 researchWindowDays(30 기본, 최대90)와 researchWindowReason. 자동 수집기가 영상/인사이트를 본 것으로 주장하지 않는다.
- critique: {reviewer:{kind:ai/human,name,model(선택)}, problems:[{id,beatId,observation,fix}]} 문제 두 개 이상. 문제 id는 고유해야 한다.
- revision: {changes:[{problemId,beatId,field:visual/narration/caption/cta,before,after,reason}], checks:[{category,status,note}]} 각 문제를 해결하는 실제 초안→수정본 값 차이를 기록한다. cta는 beatId 대신 해당 마지막 beatId를 지정하고 field=cta다. checks는 readability/hook/payoff/platform_fit/mode_fit/evidence/audio_separation/cards를 각각 한 번. pass는 확인한 근거를 쓰며 기계가 자동으로 내용 품질을 점수 매기지 않는다.

초안 최초 내용과 수정본의 실제 값을 대조하므로 허위 before/after와 메모만 바꾼 수정은 미검증으로 알린다. 이미지 경로/해시는 준비 점검이 읽고 확인하지만 observed·비평·최근 영상 관찰은 호스트가 제출한 기록이다. 원본 해시 검증을 인간의 승인으로 발표하지 않는다. 원격 이미지는 지원된 프로젝트 가져오기 경로로 준비하며 URL을 로컬 파일처럼 적지 않는다.


## 한국 릴스의 추가 작업표

고객이 지정한 본편 길이·목적·전개를 먼저 기록한다. `구간 | 한국어 대사 | 설득 역할 | 주장 유형·출처 | 제품 연결 이유 | 시작→행동→끝 | 자막·소리 | 참조 이미지 | 동영상 원본/in-out | 구매 질문 | 확인 상태`를 MD 표로 작성한다. 이 열은 새 API 필드가 아니다. 지원되는 plan.durationSec/beats/claims, direction.assets/cuts로 대응하며 일반 유명인 발언을 제품 추천 claim으로 바꾸지 않는다. 42초 설명·구매 설득안과 구체적인 문장 작성 규칙은 [한국 릴스 설득 가이드](korean-reels-grammar.md), [전체 예시](42s-persuasion-example.md)를 따른다.
