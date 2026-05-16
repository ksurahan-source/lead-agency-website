import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  ClipboardCheck,
  FileVideo,
  Radar,
  ReceiptText,
  Route,
} from "lucide-react";

export type HiobProduct = {
  slug: string;
  eyebrow: string;
  title: string;
  shortTitle: string;
  punch: string;
  description: string;
  image: string;
  alt: string;
  icon: LucideIcon;
  proof: string;
  symptoms: string[];
  deliverables: string[];
  steps: string[];
  prompt: string;
};

export const brandPrompt = `HI-OP 브랜드 이미지를 "광고비 증발 방지위원회" 톤으로 갱신한다. 흰 배경, 초굵은 검정 한글 타이포, 빨간 X 마킹, 노란 포스트잇, 대시보드 캡처 느낌, 당황한 실무자 리액션, 손그림 낙서와 체크 스탬프를 섞는다. 카피는 짧고 익살스럽게: "분명 집행했는데 결과 0?", "데이터가 없으면 광고는 길을 잃어요", "픽셀만 달면 끝? 아닙니다." 단순한 SaaS 히어로가 아니라 문제 현장을 포착한 밈 광고처럼 보이게 만들고, 마지막에는 HI-OP가 데이터 누락을 진단하고 복구하는 차분한 해결자로 등장한다.`;

export const bannerPrompt = `세로형/홈페이지 히어로 배너. 한국 B2B 퍼포먼스 마케팅 브랜드 HI-OP. 거대한 검정 한글 제목 "광고비 새는 이유 있었음", 하단 보조 카피 "결과가 안 잡히면 광고가 좋은 손님을 못 찾아요". 한쪽에는 당황한 한국 여성 마케터가 노트북을 보며 머리를 감싸고, 뒤에는 흐릿한 광고 성과 대시보드가 보인다. 대시보드 위에 빨간 X 붓터치, 노란 포스트잇에는 "데이터가 없으면 광고는 길을 잃어요!" 손글씨. 흰 배경, 검정/노랑/빨강 포인트, 익살스럽지만 신뢰감 있는 광고 진단 브랜드 비주얼, 깔끔한 상업 사진 콜라주, 굵은 한국어 타이포, 높은 대비, 보라색 그라데이션 제외.`;

export const products: HiobProduct[] = [
  {
    slug: "tracking-diagnosis",
    eyebrow: "추적 진단",
    title: "전환 추적 무료 진단",
    shortTitle: "추적 진단",
    punch: "분명 집행했는데 결과 0?",
    description:
      "Pixel, CAPI, GTM, GA4가 서로 다른 말을 하는 지점을 찾아 광고 알고리즘이 배울 수 있는 데이터 흐름으로 정리합니다.",
    image: "/memes/hiob-001/01-shocked-dashboard.webp",
    alt: "전환 데이터가 잡히지 않아 당황한 대시보드 이미지",
    icon: Radar,
    proof: "누락 이벤트, 중복 전송, fbp/fbc, event_id, EMQ 상태를 한 번에 점검",
    symptoms: [
      "Meta 전환은 0인데 GA4에는 문의가 보임",
      "구매/문의 이벤트가 브라우저 차단에 자주 끊김",
      "광고관리자와 실제 CRM 숫자가 계속 어긋남",
    ],
    deliverables: [
      "현재 이벤트 맵과 누락 구간 리포트",
      "Pixel + CAPI 중복 제거 체크리스트",
      "GTM/GA4/Meta 기준 개선 우선순위",
    ],
    steps: ["광고 계정 증상 인터뷰", "태그/서버 이벤트 추적", "복구 우선순위와 예상 효과 정리"],
    prompt:
      "HI-OP 전환 추적 진단 상세 페이지용 이미지. 한국어 광고 대시보드, 전환 0 경고, 빨간 X 표시, 노란 포스트잇, 당황한 마케터, 굵은 검정 한글 타이포, 흰 배경, 익살스럽고 신뢰감 있는 B2B 데이터 진단 톤.",
  },
  {
    slug: "capi-ga4-setup",
    eyebrow: "CAPI·GA4 세팅",
    title: "CAPI·GA4 데이터 파이프라인",
    shortTitle: "CAPI/GA4",
    punch: "픽셀만 달면 끝? 아닙니다.",
    description:
      "브라우저 픽셀이 놓치는 신호를 서버 이벤트로 보강하고, GA4와 광고 플랫폼이 같은 기준으로 성과를 보도록 설계합니다.",
    image: "/render-assets/hiob-reels-002/ai-02-data-leak.png",
    alt: "데이터 누락을 보여주는 파이프라인 이미지",
    icon: Route,
    proof: "브라우저 이벤트와 서버 이벤트를 event_id 기준으로 매칭",
    symptoms: [
      "iOS/쿠키 차단 이후 전환 학습이 느려짐",
      "같은 전환이 두 번 잡히거나 아예 빠짐",
      "GA4, Meta, CRM의 기준이 달라 의사결정이 흔들림",
    ],
    deliverables: [
      "서버 CAPI 이벤트 설계",
      "GA4 주요 전환 기준 정리",
      "중복 제거와 매칭 품질 개선안",
    ],
    steps: ["전환 정의 재정리", "GTM/서버 이벤트 연결", "테스트 이벤트와 실데이터 검수"],
    prompt:
      "HI-OP CAPI·GA4 구축 상세 페이지 비주얼. Pixel -> GTM -> 서버 CAPI -> GA4 파이프라인이 끊어졌다가 노란/빨간 체크 표시로 복구되는 장면, 굵은 한국어 타이포, 대시보드 UI, 손그림 화살표, 흰 배경, 익살스러운 기술 진단 광고.",
  },
  {
    slug: "shorts-ad-production",
    eyebrow: "숏폼 광고 제작",
    title: "밈형 숏폼 광고 제작",
    shortTitle: "숏폼 제작",
    punch: "광고 설명 말고, 문제 장면부터.",
    description:
      "후킹 카피, 밈 이미지, 보이스, 음악, Remotion 렌더까지 한 흐름으로 제작해 진단형 광고를 빠르게 실험합니다.",
    image: "/memes/hiob-001/10-wrong-person-money.jpeg",
    alt: "광고비가 엉뚱한 사람에게 가는 밈 이미지",
    icon: FileVideo,
    proof: "문제 장면 → 공감 → 데이터 해설 → 진단 행동 유도 구조",
    symptoms: [
      "기능 설명은 많은데 첫 3초 이탈이 큼",
      "광고 소재가 예쁜데 문의 질이 낮음",
      "기술 메시지를 소비자가 이해하기 어렵게 느낌",
    ],
    deliverables: [
      "42초 내외 문제 해결형 대본",
      "컷별 이미지 프롬프트와 승인 보드",
      "보이스/음악/자막 포함 렌더 파일",
    ],
    steps: ["문제 후킹 문장 선택", "컷별 밈 보드 제작", "렌더 후 행동 유도 성과 기준으로 리라이트"],
    prompt:
      "HI-OP 밈형 숏폼 광고 제작 페이지용 키비주얼. 한국 스타트업 대표가 광고 성과표를 보고 당황하고, 옆에는 웃긴 밈 컷 보드와 체크리스트가 붙어 있음. 초굵은 한글 제목, 노란 하이라이트, 빨간 손그림 표시, 흰 배경, 광고 대행이 아니라 문제 해결 콘텐츠 스튜디오 느낌.",
  },
  {
    slug: "campaign-reporting",
    eyebrow: "리포팅 운영",
    title: "캠페인 리포트 운영",
    shortTitle: "리포트 운영",
    punch: "보고서가 예쁜데 원인은 안 보이면?",
    description:
      "성과 요약보다 먼저 누락, 이상치, 다음 액션을 보이게 구성해 대표와 실무자가 같은 화면에서 판단하도록 만듭니다.",
    image: "/render-assets/hiob-reels-002/ai-03-diagnosis.png",
    alt: "광고 진단 체크리스트 이미지",
    icon: ClipboardCheck,
    proof: "성과 숫자보다 원인과 다음 실험을 먼저 보이게 재구성",
    symptoms: [
      "월말 보고 후에도 다음 액션이 흐릿함",
      "ROAS만 보이고 데이터 품질 문제는 안 보임",
      "광고, CRM, 매출 데이터를 따로 보고 있음",
    ],
    deliverables: [
      "경영진용 한 장 요약",
      "채널별 이상치와 원인 메모",
      "다음 실험 액션 리스트",
    ],
    steps: ["핵심 KPI와 데이터 소스 확정", "이상치 룰과 진단 문구 구성", "주간/월간 리듬으로 운영"],
    prompt:
      "HI-OP 캠페인 리포트 운영 상세 페이지 이미지. 광고 성과표 위에 빨간 원인 스탬프와 노란 액션 포스트잇이 붙어 있고, 굵은 한국어 카피 '보고서 말고 원인표'가 보인다. 깨끗한 흰 배경, 검정 타이포, 익살스러운 진단실 느낌.",
  },
];

export const proofCards = [
  {
    label: "META",
    value: "전환 0",
    detail: "광고는 돌았는데 학습 데이터가 비어 있음",
    icon: BarChart3,
  },
  {
    label: "CAPI",
    value: "event_id 누락",
    detail: "브라우저/서버 이벤트 중복 제거가 안 됨",
    icon: ReceiptText,
  },
  {
    label: "GA4",
    value: "기준 불일치",
    detail: "문의, 구매, 가입 정의가 채널마다 다름",
    icon: ClipboardCheck,
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
