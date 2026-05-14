import fs from 'node:fs/promises';
import path from 'node:path';
import { SpreadsheetFile, Workbook } from '@oai/artifact-tool';

const outputDir = path.resolve('/Users/surahanchoi/lead-agency-website/outputs/pricing-table');
const outputPath = path.join(outputDir, 'hiop_detailed_pricing_table.xlsx');

const palette = {
  ink: '#171923',
  muted: '#4B5563',
  line: '#D7DCE2',
  soft: '#F6F8FB',
  blue: '#184E77',
  blue2: '#DBEAFE',
  orange: '#E65828',
  orange2: '#FDE7DD',
  green2: '#DCFCE7',
  yellow2: '#FEF3C7',
  red2: '#FEE2E2',
};

const headers = [
  '구분',
  '레벨',
  '서비스/세부 항목',
  '왜 해야 하는가',
  '중요도',
  '기대 효과',
  '산출물',
  '권장 금액',
  '과금 방식',
  '소요 기간',
  '클라이언트 준비사항',
  '불포함/주의',
  '상태',
];

const rows = [];
const parentRows = [];

function addParent(category, service, reason, effect, deliverable, price, billing, period, prep, note) {
  rows.push([category, '상위 서비스', service, reason, '핵심', effect, deliverable, price, billing, period, prep, note, '검토중']);
  parentRows.push(rows.length + 4);
}

function addChild(category, item, reason, importance, effect, deliverable, price, billing, period, prep, note) {
  rows.push([category, '세부 항목', `  - ${item}`, reason, importance, effect, deliverable, price, billing, period, prep, note, '검토중']);
}

addParent(
  '무료 상담',
  '선착순 5팀 무료 사전 상담',
  '광고비를 쓰기 전에 지금 가장 큰 병목이 광고, 랜딩, 추적, 영업 중 어디인지 먼저 가려냅니다.',
  '불필요한 제작/운영 범위를 줄이고 유료 진단 또는 본 작업 범위를 정확히 잡습니다.',
  '상담 요약, 문제 가설, 추천 진행 범위',
  '선착순 5팀 무료',
  '1회',
  '20~30분',
  '현재 운영 중인 URL, 광고 채널, 문의 현황',
  '상세 계정 분석/리포트 작성은 유료 진단부터 포함'
);
addChild('무료 상담', '현황 청취', '업종, 객단가, 광고비, 리드 품질을 알아야 적정 서비스 범위를 판단할 수 있습니다.', '높음', '초기 제안의 과잉/부족을 줄입니다.', '상담 체크리스트', '무료', '1회', '상담 당일', '광고비/월 문의 수/현재 문제', '자료 미공유 시 방향성 상담으로 제한');
addChild('무료 상담', '문제 가설 정리', '같은 전환 부진이라도 원인이 추적 누락인지, 랜딩 설득력인지, 타깃 문제인지 다릅니다.', '높음', '첫 실행 우선순위가 명확해집니다.', '문제 가설 3~5개', '무료', '1회', '상담 당일', '최근 캠페인 성과 캡처', '정밀 검증은 별도');
addChild('무료 상담', '다음 액션 제안', '상담이 끝난 뒤 무엇부터 해야 하는지 모르면 실행이 지연됩니다.', '중간', '유료 진단/랜딩/운영 중 적합한 시작점을 결정합니다.', '추천 진행안', '무료', '1회', '상담 당일', '예산 범위', '상세 견적은 범위 확정 후 산정');

addParent(
  '전략/진단',
  '전략 진단 패키지',
  '광고를 바로 늘리기 전에 목표, 타깃, 메시지, 퍼널 병목을 정리해 돈을 써야 할 지점을 찾습니다.',
  '성과 판단 기준과 실행 우선순위가 생겨 이후 제작/운영 비용의 낭비를 줄입니다.',
  '진단 리포트, KPI 트리, 퍼널 맵, 개선 우선순위',
  '50만~150만원',
  '1회성',
  '3~7영업일',
  '광고 계정 캡처, GA4/CRM 수치, 랜딩 URL',
  '광고 집행/개발 수정은 별도'
);
addChild('전략/진단', 'KPI 설정', '목표와 측정 기준이 없으면 캠페인이 클릭, 문의, 계약 중 무엇을 최적화해야 하는지 흔들립니다.', '매우 높음', 'CPL, CPA, CVR, MQL, SQL 기준이 명확해져 우선순위가 선명해집니다.', '핵심 KPI 트리, 목표 수치, 측정 기준표', '20만~50만원', '진단 포함', '1~2일', '현재 목표/매출/마진/상담 전환율', '과거 데이터가 없으면 가설 기준으로 설정');
addChild('전략/진단', '퍼널 진단', '유입부터 문의, 상담, 계약까지 어디서 손실이 나는지 알아야 개선 비용을 제대로 배분할 수 있습니다.', '매우 높음', '병목 구간 개선으로 전환 효율과 상담 전환율이 올라갑니다.', '퍼널 맵, 단계별 이탈 원인, 개선 포인트 리스트', '30만~80만원', '진단 포함', '2~3일', '유입/문의/상담/계약 데이터', '데이터 미보유 시 추정치 기반');
addChild('전략/진단', '타깃 정의', '누구에게 팔지 명확해야 광고 타깃, 카피, 랜딩 메시지가 같은 방향으로 움직입니다.', '높음', '클릭 품질과 문의 전환율이 개선되고 저품질 리드가 줄어듭니다.', '타깃 세그먼트 정의서, 페르소나, 우선 공략군', '30만~70만원', '진단 포함', '1~2일', '고객군/계약 고객/비선호 고객 정보', '정량 리서치/설문은 별도');
addChild('전략/진단', '경쟁사 분석', '시장 내 포지션과 차별점을 확인해야 광고비로 같은 메시지를 반복하는 낭비를 줄일 수 있습니다.', '높음', '경쟁 대비 강점/약점이 드러나 제안과 랜딩 구조가 정교해집니다.', '경쟁사 비교표, 포지셔닝 요약, 벤치마크 인사이트', '30만~80만원', '진단 포함', '2~3일', '주요 경쟁사/참고 브랜드', '심층 브랜드 리서치는 별도');
addChild('전략/진단', '메시지 설계', '타깃의 문제를 건드리는 문장이 없으면 클릭은 나와도 문의로 이어지지 않습니다.', '매우 높음', '광고 반응률과 문의 전환율이 함께 개선될 가능성이 커집니다.', '핵심 메시지 맵, USP 문구, 광고 카피 방향성', '50만~120만원', '진단/기획', '2~4일', '서비스 소개서, 고객 후기, 사례', '상세 카피라이팅/디자인은 별도');

addParent(
  '추적/데이터',
  '전환 추적 구축',
  '광고 플랫폼과 실제 리드 데이터가 다르면 알고리즘이 잘못 학습하고 성과 판단도 왜곡됩니다.',
  '전환 누락/중복을 줄이고 광고 최적화에 쓸 수 있는 데이터 기반을 만듭니다.',
  'GA4/GTM/CAPI 설정, 이벤트 매핑표, 테스트 리포트',
  '150만~500만원',
  '1회성',
  '5~14영업일',
  '웹사이트 접근권한, GTM/GA4/Meta 권한',
  '서버 개발 범위가 큰 경우 별도 산정'
);
addChild('추적/데이터', 'GA4 기본 이벤트 설계', '유입 후 핵심 행동을 표준화해 측정해야 어떤 행동이 리드로 이어지는지 파악할 수 있습니다.', '매우 높음', '전환 경로 분석 정확도가 올라가고 리포트 기준이 통일됩니다.', '이벤트 매핑표, GA4 설정안', '50만~120만원', '구축 포함', '1~3일', '측정할 행동 목록', 'BigQuery/고급 분석은 별도');
addChild('추적/데이터', 'GTM 태그/트리거 구성', '광고, 전환, 행동 데이터를 일관되게 수집하는 기반입니다.', '매우 높음', '추적 누락이 줄고 신규 이벤트 추가가 쉬워집니다.', 'GTM 컨테이너 설정, 태그 목록', '80만~180만원', '구축 포함', '2~4일', 'GTM 권한, 사이트 구조', '커스텀 개발 필요 시 별도');
addChild('추적/데이터', 'Meta CAPI 연동', '브라우저 차단 환경에서도 전환 신호를 보강해야 Meta 광고 학습이 안정됩니다.', '매우 높음', '전환 집계 정확도와 이벤트 매칭 품질 개선을 기대할 수 있습니다.', 'CAPI 연동 문서, 테스트 결과', '150만~350만원', '구축 포함', '3~7일', 'Meta 비즈니스/픽셀 권한, 서버 환경', '플랫폼별 API 제한에 따라 범위 변동');
addChild('추적/데이터', '전환 이벤트 정합성 점검', '광고 플랫폼, GA4, CRM 숫자가 맞아야 CPA와 리드 품질을 제대로 판단할 수 있습니다.', '높음', '성과 왜곡을 줄이고 예산 조정 판단의 신뢰도가 올라갑니다.', '검수 리포트, 이슈 수정안', '50만~150만원', '점검/구축', '2~5일', '리드 원장, 광고관리자 수치', '과거 데이터 복구는 보장 불가');
addChild('추적/데이터', 'UTM/소스 규칙 표준화', '캠페인별 유입원을 같은 기준으로 분류해야 채널별 성과를 비교할 수 있습니다.', '높음', '리포트 혼선을 줄이고 캠페인별 의사결정 속도가 빨라집니다.', 'UTM 규칙표, 소스 정의서', '30만~80만원', '점검/구축', '1~2일', '사용 중인 캠페인명/채널 목록', '과거 UTM 오류 정리는 별도');

addParent(
  '랜딩',
  '랜딩 전환 개선',
  '광고 클릭 이후 설득 구조가 약하면 광고비가 방문에서 멈추고 문의로 전환되지 않습니다.',
  '광고 메시지와 랜딩, CTA, 폼을 맞춰 문의 전환율을 개선합니다.',
  '랜딩 기획안, 와이어프레임, 카피, 개선안 또는 제작물',
  '150만~700만원',
  '1회성/프로젝트',
  '1~4주',
  '기존 랜딩 URL, 브랜드 자료, 사례/후기',
  '촬영, 고급 개발, 다국어 페이지는 별도'
);
addChild('랜딩', '메시지-광고 일치화', '광고 문구와 랜딩 내용이 다르면 사용자가 이탈하고 광고 학습 신호도 약해집니다.', '매우 높음', '이탈률 감소와 전환율 상승을 기대할 수 있습니다.', '랜딩 카피 가이드, 메시지 매칭표', '50만~150만원', '기획 포함', '2~4일', '광고 카피/소재 목록', '브랜드 전체 리뉴얼은 별도');
addChild('랜딩', '상단 CTA 구조 설계', '첫 화면에서 행동 유도가 명확해야 방문자가 다음 단계로 이동합니다.', '매우 높음', 'CTA 클릭률과 문의 시작률이 개선됩니다.', 'CTA 배치안, 와이어프레임', '50만~120만원', '기획 포함', '1~3일', '주요 전환 목표', '디자인 시안 제작은 범위별 산정');
addChild('랜딩', '폼 마찰 최소화', '입력 부담이 크면 전환이 급감하므로 꼭 필요한 정보만 받아야 합니다.', '매우 높음', '폼 완료율 상승과 이탈 감소를 기대할 수 있습니다.', '폼 설계안, 필드 최소화안', '40만~100만원', '기획/제작', '1~2일', '필수 수집 정보', '법무/개인정보 검토는 별도');
addChild('랜딩', '신뢰 요소 배치', '성과 사례, 후기, 인증, 프로세스가 있어야 상담 전환 장벽이 낮아집니다.', '높음', '문의 전환율 개선과 상담 품질 향상을 기대할 수 있습니다.', '신뢰 섹션 구성안', '40만~120만원', '기획/제작', '2~4일', '후기/사례/인증 자료', '사례 콘텐츠 제작은 별도');
addChild('랜딩', '모바일 최적화', '모바일 유입에서 문구, 버튼, 폼이 불편하면 광고비가 빠르게 낭비됩니다.', '높음', '모바일 이탈률 감소와 폼 완료율 개선을 기대할 수 있습니다.', '모바일 랜딩 검수표, 수정안', '50만~150만원', '제작/개선', '2~5일', '모바일 접속 데이터', '속도 최적화 대규모 개발은 별도');

addParent(
  'CRM/리드 품질',
  'CRM 자동화 및 리드 품질 관리',
  '문의가 들어온 뒤 빠르게 분류, 알림, 후속 연락하지 않으면 광고 성과가 실제 매출로 이어지지 않습니다.',
  '리드 누락을 줄이고 영업팀이 좋은 리드부터 처리할 수 있게 합니다.',
  '알림 플로우, 리드 정의서, 자동화 시나리오, 품질 리포트',
  '100만~400만원',
  '1회성/월 운영',
  '1~3주',
  '사용 중인 CRM/시트/알림 채널',
  'CRM 라이선스 비용 별도'
);
addChild('CRM/리드 품질', '리드 즉시 알림', '빠른 응대는 상담/미팅 전환에 직접적인 영향을 줍니다.', '매우 높음', '응답 속도가 빨라지고 상담 기회 손실이 줄어듭니다.', '알림 플로우, 템플릿', '50만~120만원', '구축', '1~3일', '알림 받을 채널/담당자', '외부 툴 유료 플랜 별도');
addChild('CRM/리드 품질', '리드 점수화', '모든 문의를 같은 우선순위로 처리하면 고의도 리드를 놓칠 수 있습니다.', '높음', '영업 우선순위가 정리되어 상담 효율이 올라갑니다.', '스코어링 규칙', '50만~150만원', '설계/구축', '2~5일', '좋은 리드/나쁜 리드 기준', '머신러닝 스코어링은 별도');
addChild('CRM/리드 품질', '단계별 자동 시퀀스', '바로 결정을 못 한 리드도 후속 접촉을 통해 재활성화할 수 있습니다.', '높음', '재접촉률과 상담 예약률이 올라갑니다.', '이메일/문자 시나리오', '80만~200만원', '설계/구축', '3~7일', '발송 채널, 브랜드 톤', '발송 비용/CRM 비용 별도');
addChild('CRM/리드 품질', '담당자 할당 규칙', '리드가 적절한 담당자에게 즉시 배정되지 않으면 응대 품질이 흔들립니다.', '높음', '리드 누락이 줄고 응대 품질이 균일해집니다.', '할당 로직, 라우팅 규칙', '50만~150만원', '구축', '2~5일', '영업팀 구조/담당 기준', '복잡한 권한 체계는 별도');
addChild('CRM/리드 품질', '유효 리드 기준 정의', '좋은 리드의 기준이 없으면 CPL은 낮아도 실제 매출 기여를 판단하기 어렵습니다.', '매우 높음', 'MQL/SQL 기준이 명확해지고 저품질 문의를 걸러낼 수 있습니다.', '리드 정의서, 자격요건 체크리스트', '50만~120만원', '설계', '1~3일', '계약 고객 특성, 제외 조건', '영업 성과 데이터가 없으면 가설 기준');
addChild('CRM/리드 품질', '품질 피드백 루프', '실제 상담/계약 결과가 광고 운영에 돌아가지 않으면 타깃팅 개선이 멈춥니다.', '높음', '캠페인 최적화 정밀도가 높아지고 저품질 유입을 줄입니다.', '품질 피드백 리포트, 저품질 원인 분석표', '월 50만~150만원', '월 운영', '매월', '상담 결과/계약 여부 데이터', '영업팀 입력 누락 시 분석 제한');

addParent(
  '광고 운영',
  '퍼포먼스 광고 운영 대행',
  '캠페인은 세팅 후 방치하면 예산이 저효율 구간으로 흐르기 쉽습니다.',
  '성과 데이터를 기준으로 예산, 타깃, 키워드, 소재를 지속 조정합니다.',
  '캠페인 구조, 운영 로그, 주간 액션, 월간 리포트',
  '월 150만~800만원',
  '월 운영',
  '월 단위',
  '광고 계정 권한, 광고비 예산, 승인 프로세스',
  '광고비, 매체 결제비, 촬영비 별도'
);
addChild('광고 운영', 'Meta/Google 캠페인 세팅 및 상시 운영', '초기 구조가 성과를 좌우하고 운영 중 미세 조정이 전환 효율을 만듭니다.', '매우 높음', 'CPA 안정화, 낭비 예산 감소, 전환 볼륨 확보를 기대합니다.', '캠페인/광고세트/키워드 구조, 운영 로그', '월 100만~300만원', '월 운영', '상시', '계정 권한, 목표 KPI', '광고비 별도');
addChild('광고 운영', '예산 최적화', '채널과 캠페인별 예산 배분에 따라 성과 편차가 크게 발생합니다.', '매우 높음', '고효율 채널 집중과 저효율 손실 최소화를 기대합니다.', '일/주간 예산 조정안, 채널별 배분표', '월 50만~150만원', '월 운영 포함', '주간', '월 광고비 한도', '급격한 예산 증액은 학습 변동 가능');
addChild('광고 운영', '리타겟팅 세팅 및 운영', '관심은 있었지만 전환하지 않은 사용자를 재활성화할 수 있습니다.', '높음', '전환율 상승, 재방문 유도, 퍼널 후반 효율 개선을 기대합니다.', '방문자/이탈자 세그먼트, 리타겟팅 캠페인', '월 50만~150만원', '월 운영 포함', '상시', '픽셀/이벤트 데이터', '모수 부족 시 제한');
addChild('광고 운영', '검색 의도 기반 키워드 운영', 'Google Ads에서 구매/문의 의도가 높은 트래픽을 확보하려면 키워드 구조가 중요합니다.', '높음', '질 좋은 리드 확보와 불필요 클릭 감소를 기대합니다.', '키워드 그룹, 부정키워드 리스트, 검색어 리포트', '월 80만~200만원', '월 운영 포함', '주간', '서비스별 키워드/지역/제외 조건', 'SEO 콘텐츠 제작은 별도');

addParent(
  '소재/크리에이티브',
  '성과형 크리에이티브 제작/테스트',
  '광고 성과는 매체 세팅뿐 아니라 어떤 메시지와 비주얼을 반복 실험하는지에 크게 좌우됩니다.',
  '승자 소재를 찾고 피로도를 줄여 클릭률과 전환율 개선을 노립니다.',
  '테스트 플랜, 소재 세트, A/B 결과표, 다음 테스트 제안',
  '월 80만~700만원',
  '월 운영/제작',
  '월 단위',
  '브랜드 자료, 제품 이미지/영상, 승인 기준',
  '촬영/모델/스튜디오/외주 편집비 별도'
);
addChild('소재/크리에이티브', '소재 테스트 기획', '어떤 메시지와 비주얼이 반응하는지 가설 없이 만들면 제작비가 낭비됩니다.', '매우 높음', 'CTR 향상, 학습 속도 개선, 승자 소재 발굴을 기대합니다.', '테스트 플랜, 가설 목록, 소재 버전표', '월 50만~120만원', '월 운영 포함', '월간', '기존 소재/브랜드 가이드', '정밀 소비자 조사 별도');
addChild('소재/크리에이티브', '배너/영상/카피 A/B 테스트', '소재 하나의 차이로 클릭과 전환 성과가 크게 달라집니다.', '매우 높음', 'CTR/CVR 개선과 소재 피로도 감소를 기대합니다.', '소재 시안 세트, A/B 결과표, 승자/패자 분석', '월 100만~400만원', '제작/운영', '월간', '상품/서비스 자료, 승인자', '촬영 원본이 없으면 제작 범위 제한');
addChild('소재/크리에이티브', 'Meta용 소재 최적화', 'Meta는 숏폼, 훅, 시각 임팩트가 스크롤 정지와 CPA에 직접 영향을 줍니다.', '높음', '스크롤 정지율 증가와 CPA 개선을 기대합니다.', '1:1, 4:5, 9:16 소재, 후킹 카피', '월 100만~300만원', '제작', '월간', '이미지/영상 소스', '릴스 촬영은 별도');
addChild('소재/크리에이티브', 'Google용 소재 및 확장 소재 운영', '검색, 디스플레이, 유튜브에 맞는 헤드라인과 설명문 구조가 필요합니다.', '높음', '노출 효율과 클릭률 개선을 기대합니다.', 'RSA 카피, 이미지 소재, 헤드라인/설명문 세트', '월 80만~250만원', '제작/운영', '월간', '서비스별 USP/금지 문구', '고급 영상 제작 별도');

addParent(
  '리포팅',
  '리포팅 및 최적화 회의',
  '숫자만 보는 보고서는 실행으로 이어지지 않으므로 다음 액션까지 연결해야 합니다.',
  '문제 발견, 개선안 합의, 다음 실험 실행 속도가 빨라집니다.',
  '주간/월간 리포트, 인사이트 요약, 액션 리스트',
  '월 50만~200만원',
  '월 운영/자문',
  '주간/월간',
  '광고/GA4/CRM 권한, 영업 피드백',
  '대시보드 개발은 별도'
);
addChild('리포팅', '일간/주간 성과 리포트', '변동을 빨리 확인해야 예산 낭비나 추적 오류에 즉시 대응할 수 있습니다.', '매우 높음', '이상징후 조기 발견과 의사결정 속도 향상을 기대합니다.', '핵심 KPI 리포트, 채널별 성과 요약', '월 50만~120만원', '월 운영 포함', '주간', '광고 계정 권한', '실시간 모니터링은 별도');
addChild('리포팅', '소재별 성과 리포트', '어떤 크리에이티브가 성과를 만드는지 알아야 다음 제작비를 효율적으로 씁니다.', '높음', '승자 소재 재활용과 테스트 방향 명확화를 기대합니다.', '소재별 CTR/CVR/CPA 비교표, 승자 분석', '월 50만~120만원', '월 운영 포함', '월간', '소재 명명 규칙', '소재 태깅이 안 되면 분석 제한');
addChild('리포팅', '퍼널별 전환 리포트', '클릭 이후 어디서 이탈하는지 알아야 랜딩, 폼, 상담 단계를 개선할 수 있습니다.', '높음', '전환율 상승과 단계별 병목 개선을 기대합니다.', '퍼널 단계별 지표, 이탈 구간 분석, 개선안', '월 80만~150만원', '월 운영/분석', '월간', 'GA4/CRM 데이터', '정확한 추적 세팅 선행 필요');
addChild('리포팅', '인사이트 및 액션 제안', '숫자가 다음 행동으로 연결되지 않으면 보고 비용이 낭비됩니다.', '매우 높음', '실행 속도 향상과 반복 개선 체계 구축을 기대합니다.', '우선순위 액션 리스트, 다음 주 운영 계획', '월 50만~150만원', '월 운영 포함', '주간/월간', '의사결정자 참석', '실행 범위 외 개발/디자인은 별도');

const packages = [
  ['Starter', '소규모 리드/첫 유료 운영', '전략 진단, KPI 설정, 기본 광고 운영, 주간 리포트', '월 150만~300만원', 1500000, 3000000, '초기 구조를 빠르게 잡고 리드 품질 기준을 세우는 데 적합'],
  ['Growth', '월 광고비와 문의 볼륨을 키우려는 팀', 'Starter + GA4/GTM/CAPI, 랜딩 개선, 소재 테스트', '월 300만~700만원', 3000000, 7000000, '추적-랜딩-광고를 연결해 전환율과 CPA 개선을 동시에 노림'],
  ['Scale', '다채널 확장/고빈도 실험이 필요한 팀', 'Growth + CRM 자동화, 고빈도 소재, 퍼널 리포트, 세일즈 피드백', '월 700만~1,500만원', 7000000, 15000000, '리드 수뿐 아니라 상담/계약 품질까지 관리하는 운영 체계'],
  ['Enterprise', '복합 채널/다수 제품/영업조직 연동', 'Scale + 멀티채널 전략, 대시보드, 부서별 리포트, 고도화 자동화', '월 1,500만~3,000만원+', 15000000, 30000000, '광고 운영을 매출 파이프라인 운영으로 확장'],
];

const workbook = Workbook.create();
workbook.setColorScheme({
  name: 'HI-OP Pricing',
  themeColors: {
    accent1: palette.blue,
    accent2: palette.orange,
    accent3: '#16A34A',
    accent4: '#F59E0B',
    accent5: '#64748B',
    accent6: '#111827',
    bg1: '#FFFFFF',
    tx1: palette.ink,
  },
});

function setupSheet(sheet) {
  try {
    sheet.showGridLines = false;
  } catch {}
}

function styleTitle(sheet, range, title, subtitle) {
  range.merge();
  range.values = [[title]];
  range.format = {
    fill: palette.blue,
    font: { name: 'Pretendard', size: 18, bold: true, color: '#FFFFFF' },
    horizontalAlignment: 'left',
    verticalAlignment: 'center',
  };
  range.format.rowHeightPx = 42;
  const sub = sheet.getRange(`A2:M2`);
  sub.merge();
  sub.values = [[subtitle]];
  sub.format = {
    fill: palette.soft,
    font: { name: 'Pretendard', size: 11, color: palette.muted },
    horizontalAlignment: 'left',
    verticalAlignment: 'center',
    wrapText: true,
  };
  sub.format.rowHeightPx = 34;
}

const summary = workbook.worksheets.getOrAdd('요약', { renameFirstIfOnlyNewSpreadsheet: true });
summary.reset();
setupSheet(summary);
styleTitle(summary, summary.getRange('A1:M1'), '히옵 리드/퍼포먼스 마케팅 상세 단가표', '상위 서비스 아래에 세부 항목별 중요도, 필요 이유, 기대효과, 산출물, 금액을 펼쳐 둔 승인 검토용 워크북입니다.');
summary.getRange('A4:D4').values = [['핵심 제안', '금액 기준', '왜 이 구조인가', '컨펌 포인트']];
summary.getRange('A5:D8').values = [
  ['선착순 5팀 무료 사전 상담', '무료', '무작정 패키지를 팔기보다 병목이 어디인지 먼저 가려 비용 낭비를 줄입니다.', '무료 상담 문구/한정 수량 유지 여부'],
  ['전략 진단 후 본 작업 범위 확정', '50만~150만원', 'KPI, 퍼널, 타깃, 메시지가 정리되어야 랜딩/광고/추적 비용이 성과로 연결됩니다.', '진단을 유료 진입 상품으로 둘지 여부'],
  ['추적-랜딩-광고를 분리 견적', '150만원~ / 월 150만원~', '문제 원인이 다른데 한 덩어리로 팔면 가격 저항이 커지므로 항목별 가치를 설명합니다.', '상세 항목 유지/삭제'],
  ['월 운영은 리포트와 액션 포함', '월 150만~800만원', '운영비는 단순 집행비가 아니라 예산, 소재, 퍼널 개선 의사결정 비용으로 설명합니다.', '월 운영 패키지 가격대'],
];
summary.getRange('F4:M4').values = [['패키지', '대상', '포함 범위', '월 금액', '월 최저', '월 최고', '설득 포인트', '승인 상태']];
summary.getRange('F5:M8').values = packages.map((p) => [...p.slice(0, 7), '검토중']);
summary.getRange('A10:M10').merge();
summary.getRange('A10:M10').values = [['추천 문구: 품질 있는 진단을 위해 무료 상담은 선착순 5팀까지만 진행합니다. 모든 금액은 광고비/VAT 별도이며, 최종 범위와 일정은 상담 후 확정됩니다.']];
summary.getRange('A4:D8').format = { borders: { preset: 'all', style: 'thin', color: palette.line }, wrapText: true, verticalAlignment: 'top', font: { name: 'Pretendard', size: 10, color: palette.ink } };
summary.getRange('F4:M8').format = { borders: { preset: 'all', style: 'thin', color: palette.line }, wrapText: true, verticalAlignment: 'top', font: { name: 'Pretendard', size: 10, color: palette.ink } };
summary.getRange('A4:D4').format.fill = palette.orange2;
summary.getRange('F4:M4').format.fill = palette.blue2;
summary.getRange('A4:D4').format.font = { name: 'Pretendard', size: 10, bold: true, color: palette.ink };
summary.getRange('F4:M4').format.font = { name: 'Pretendard', size: 10, bold: true, color: palette.ink };
summary.getRange('I5:J8').format.numberFormat = '₩#,##0';
summary.getRange('A10:M10').format = { fill: palette.yellow2, font: { name: 'Pretendard', size: 11, bold: true, color: palette.ink }, wrapText: true, verticalAlignment: 'center', borders: { preset: 'outside', style: 'thin', color: '#F59E0B' } };
summary.getRange('A10:M10').format.rowHeightPx = 48;
summary.getRange('A:M').format.columnWidthPx = 140;
summary.getRange('A:A').format.columnWidthPx = 160;
summary.getRange('C:C').format.columnWidthPx = 360;
summary.getRange('G:G').format.columnWidthPx = 360;
summary.getRange('K:K').format.columnWidthPx = 360;
summary.freezePanes.freezeRows(4);

const detail = workbook.worksheets.add('상세 단가표');
setupSheet(detail);
styleTitle(detail, detail.getRange('A1:M1'), '상세 단가표: 상위 서비스 + 하위 세부 항목', '각 세부 항목마다 “왜 해야 하는가”와 “기대효과”를 넣어 가격 저항을 줄이는 구조입니다.');
detail.getRange('A4:M4').values = [headers];
detail.getRange(`A5:M${rows.length + 4}`).values = rows;
detail.getRange(`A4:M${rows.length + 4}`).format = {
  borders: { preset: 'all', style: 'thin', color: palette.line },
  font: { name: 'Pretendard', size: 10, color: palette.ink },
  wrapText: true,
  verticalAlignment: 'top',
};
detail.getRange('A4:M4').format = {
  fill: palette.blue,
  font: { name: 'Pretendard', size: 10, bold: true, color: '#FFFFFF' },
  horizontalAlignment: 'center',
  verticalAlignment: 'center',
  wrapText: true,
  borders: { preset: 'all', style: 'thin', color: '#FFFFFF' },
};
detail.getRange('A4:M4').format.rowHeightPx = 34;
for (const rowNumber of parentRows) {
  const range = detail.getRange(`A${rowNumber}:M${rowNumber}`);
  range.format = {
    fill: palette.orange2,
    font: { name: 'Pretendard', size: 10, bold: true, color: palette.ink },
    wrapText: true,
    verticalAlignment: 'top',
    borders: { preset: 'all', style: 'thin', color: '#E7A98F' },
  };
  range.format.rowHeightPx = 58;
}
detail.getRange(`E5:E${rows.length + 4}`).conditionalFormats.add('containsText', {
  text: '매우 높음',
  format: { fill: palette.red2, font: { color: '#991B1B', bold: true } },
});
detail.getRange(`E5:E${rows.length + 4}`).conditionalFormats.add('containsText', {
  text: '높음',
  format: { fill: palette.yellow2, font: { color: '#92400E', bold: true } },
});
detail.getRange(`M5:M${rows.length + 4}`).dataValidation = {
  allowBlank: true,
  list: { inCellDropDown: true, source: ['검토중', '승인', '수정요청', '제외'] },
};
detail.getRange('A:A').format.columnWidthPx = 110;
detail.getRange('B:B').format.columnWidthPx = 95;
detail.getRange('C:C').format.columnWidthPx = 210;
detail.getRange('D:D').format.columnWidthPx = 360;
detail.getRange('E:E').format.columnWidthPx = 90;
detail.getRange('F:F').format.columnWidthPx = 330;
detail.getRange('G:G').format.columnWidthPx = 250;
detail.getRange('H:H').format.columnWidthPx = 140;
detail.getRange('I:I').format.columnWidthPx = 105;
detail.getRange('J:J').format.columnWidthPx = 105;
detail.getRange('K:K').format.columnWidthPx = 220;
detail.getRange('L:L').format.columnWidthPx = 220;
detail.getRange('M:M').format.columnWidthPx = 90;
detail.getRange(`A5:M${rows.length + 4}`).format.rowHeightPx = 70;
detail.freezePanes.freezeRows(4);

const pkgSheet = workbook.worksheets.add('패키지 비교');
setupSheet(pkgSheet);
styleTitle(pkgSheet, pkgSheet.getRange('A1:H1'), '패키지 비교', '월 운영 패키지를 가격이 아니라 포함 범위와 기대효과 기준으로 비교합니다.');
pkgSheet.getRange('A4:H4').values = [['패키지', '대상', '포함 범위', '월 금액', '월 최저', '월 최고', '설득 포인트', '권장 시작 조건']];
pkgSheet.getRange('A5:H8').values = packages.map((p) => [
  p[0],
  p[1],
  p[2],
  p[3],
  p[4],
  p[5],
  p[6],
  p[0] === 'Starter' ? '현재 데이터가 부족하거나 첫 구조 정리가 필요한 경우' : p[0] === 'Growth' ? '광고비를 이미 쓰고 있고 전환율 개선이 필요한 경우' : p[0] === 'Scale' ? '리드 수와 상담 품질을 동시에 키워야 하는 경우' : '조직/제품/채널이 여러 개라 운영 체계가 필요한 경우',
]);
pkgSheet.getRange('A4:H8').format = { borders: { preset: 'all', style: 'thin', color: palette.line }, wrapText: true, verticalAlignment: 'top', font: { name: 'Pretendard', size: 10, color: palette.ink } };
pkgSheet.getRange('A4:H4').format = { fill: palette.blue, font: { name: 'Pretendard', size: 10, bold: true, color: '#FFFFFF' }, horizontalAlignment: 'center', borders: { preset: 'all', style: 'thin', color: '#FFFFFF' } };
pkgSheet.getRange('E5:F8').format.numberFormat = '₩#,##0';
pkgSheet.getRange('A:A').format.columnWidthPx = 120;
pkgSheet.getRange('B:B').format.columnWidthPx = 220;
pkgSheet.getRange('C:C').format.columnWidthPx = 340;
pkgSheet.getRange('D:D').format.columnWidthPx = 160;
pkgSheet.getRange('E:F').format.columnWidthPx = 130;
pkgSheet.getRange('G:H').format.columnWidthPx = 330;
pkgSheet.getRange('A5:H8').format.rowHeightPx = 80;
pkgSheet.freezePanes.freezeRows(4);

const notes = workbook.worksheets.add('메모_조건');
setupSheet(notes);
styleTitle(notes, notes.getRange('A1:E1'), '메모 및 견적 조건', '웹사이트 가격표 또는 제안서 하단에 붙일 조건 문구입니다.');
notes.getRange('A4:E4').values = [['항목', '문구', '사용 위치', '의도', '상태']];
notes.getRange('A5:E14').values = [
  ['무료 상담', '선착순 5개 팀 한정, 무료 사전 상담 제공', '가격표 상단/CTA 근처', '희소성을 주되 상담 품질 제한으로 설명', '검토중'],
  ['무료 상담 보조', '상담 수를 제한해 각 계정의 광고 구조와 전환 흐름을 깊게 확인합니다.', '무료 상담 안내 하단', '싸구려 느낌 없이 한정성을 설명', '검토중'],
  ['VAT', '모든 금액은 부가세 별도 기준입니다.', '가격표 하단', '견적 기준 명확화', '검토중'],
  ['광고비', '매체 광고비, 촬영비, 외부 툴 이용료는 별도입니다.', '가격표 하단', '운영비와 실비 구분', '검토중'],
  ['범위', '상기 금액은 명시된 범위 기준이며, 추가 요청은 별도 협의합니다.', '가격표 하단', '범위 초과 리스크 방지', '검토중'],
  ['확정', '최종 범위와 일정은 상담 후 확정됩니다.', '가격표 하단', '개별 견적 여지 확보', '검토중'],
  ['성과', '성과를 보장하기보다 KPI 기준으로 개선 가능한 구조를 설계하고 운영합니다.', '제안서 조건', '과도한 보장 표현 회피', '검토중'],
  ['진입 상품', '무료 상담 후 필요한 경우 유료 진단으로 현재 병목과 우선순위를 문서화합니다.', '상담 후 안내', '무료에서 유료 진단으로 자연스럽게 전환', '검토중'],
  ['운영 원칙', '가격보다 중요한 것은 집행 구조와 성과 설계입니다.', '가격표 강조 문구', '고가 항목의 설득력 보강', '검토중'],
  ['제안 원칙', '무리한 패키지 제안 없이, 필요한 범위만 제안합니다.', '신뢰 문구', '가격 저항 완화', '검토중'],
];
notes.getRange('A4:E14').format = { borders: { preset: 'all', style: 'thin', color: palette.line }, wrapText: true, verticalAlignment: 'top', font: { name: 'Pretendard', size: 10, color: palette.ink } };
notes.getRange('A4:E4').format = { fill: palette.blue, font: { name: 'Pretendard', size: 10, bold: true, color: '#FFFFFF' }, horizontalAlignment: 'center' };
notes.getRange('A:A').format.columnWidthPx = 140;
notes.getRange('B:B').format.columnWidthPx = 440;
notes.getRange('C:E').format.columnWidthPx = 220;
notes.getRange('A5:E14').format.rowHeightPx = 55;
notes.getRange('E5:E14').dataValidation = {
  allowBlank: true,
  list: { inCellDropDown: true, source: ['검토중', '승인', '수정요청', '제외'] },
};
notes.freezePanes.freezeRows(4);

await fs.mkdir(outputDir, { recursive: true });

const inspect = await workbook.inspect({
  kind: 'table',
  range: '상세 단가표!A4:M12',
  include: 'values,formulas',
  tableMaxRows: 20,
  tableMaxCols: 13,
});
console.log(inspect.ndjson);

const errors = await workbook.inspect({
  kind: 'match',
  searchTerm: '#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A',
  options: { useRegex: true, maxResults: 300 },
  summary: 'final formula error scan',
});
console.log(errors.ndjson);

for (const sheetName of ['요약', '상세 단가표', '패키지 비교', '메모_조건']) {
  await workbook.render({ sheetName, range: sheetName === '상세 단가표' ? 'A1:M18' : 'A1:M14', scale: 1 });
  console.log(`rendered ${sheetName}`);
}

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
console.log(outputPath);
