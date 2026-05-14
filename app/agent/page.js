import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CircleAlert,
  ClipboardCheck,
  FileVideo,
  Megaphone,
  PencilLine,
  Radar,
  ReceiptText,
  Route,
  Sparkles,
  Stamp,
} from 'lucide-react';
import styles from './page.module.css';

const brandPrompt = `HI-OB 브랜드 이미지를 "광고비 증발 방지위원회" 톤으로 갱신한다. 흰 배경, 초굵은 검정 한글 타이포, 빨간 X 마킹, 노란 포스트잇, 대시보드 캡처 느낌, 당황한 실무자 리액션, 손그림 낙서와 체크 스탬프를 섞는다. 카피는 짧고 익살스럽게: "분명 집행했는데 결과 0?", "데이터가 없으면 광고는 길을 잃어요", "픽셀만 달면 끝? 아닙니다." 단순한 SaaS 히어로가 아니라 문제 현장을 포착한 밈 광고처럼 보이게 만들고, 마지막에는 HI-OB가 데이터 누락을 진단하고 복구하는 차분한 해결자로 등장한다.`;

const bannerPrompt = `세로형/홈페이지 히어로 배너. 한국 B2B 퍼포먼스 마케팅 브랜드 HI-OB. 거대한 검정 한글 제목 "광고비 새는 이유 있었음", 하단 보조 카피 "결과가 안 잡히면 광고가 좋은 손님을 못 찾아요". 한쪽에는 당황한 한국 여성 마케터가 노트북을 보며 머리를 감싸고, 뒤에는 흐릿한 광고 성과 대시보드가 보인다. 대시보드 위에 빨간 X 붓터치, 노란 포스트잇에는 "데이터가 없으면 광고는 길을 잃어요!" 손글씨. 흰 배경, 검정/노랑/빨강 포인트, 익살스럽지만 신뢰감 있는 광고 진단 브랜드 비주얼, clean commercial photo collage, bold Korean typography, high contrast, no purple gradient.`;

const bannerNotes = [
  '흰 배경 + 초굵은 검정 한글',
  '빨간 X, 노란 포스트잇, 손그림 낙서',
  '당황한 사람 리액션 + 광고 대시보드 증거',
];

const proofCards = [
  {
    label: 'META',
    value: '전환 0',
    detail: '광고는 돌았는데 학습 데이터가 비어 있음',
    icon: BarChart3,
  },
  {
    label: 'CAPI',
    value: 'event_id 누락',
    detail: '브라우저/서버 이벤트 중복 제거가 안 됨',
    icon: ReceiptText,
  },
  {
    label: 'GA4',
    value: '기준 불일치',
    detail: '문의, 구매, 가입 정의가 채널마다 다름',
    icon: ClipboardCheck,
  },
];

const products = [
  {
    eyebrow: 'TRACKING DIAGNOSIS',
    title: '전환 추적 무료 진단',
    punch: '분명 집행했는데 결과 0?',
    description:
      'Pixel, CAPI, GTM, GA4가 서로 다른 말을 하는 지점을 찾아 광고 알고리즘이 배울 수 있는 데이터 흐름으로 정리합니다.',
    image: '/memes/hiob-001/01-shocked-dashboard.webp',
    alt: '전환 데이터가 잡히지 않아 당황한 대시보드 이미지',
    icon: Radar,
  },
  {
    eyebrow: 'CAPI + GA4 SETUP',
    title: 'CAPI·GA4 데이터 파이프라인',
    punch: '픽셀만 달면 끝? 아닙니다.',
    description:
      '브라우저 픽셀이 놓치는 신호를 서버 이벤트로 보강하고, GA4와 광고 플랫폼이 같은 기준으로 성과를 보도록 설계합니다.',
    image: '/render-assets/hiob-reels-002/ai-02-data-leak.png',
    alt: '데이터 누락을 보여주는 파이프라인 이미지',
    icon: Route,
  },
  {
    eyebrow: 'SHORTS AD PRODUCTION',
    title: '밈형 숏폼 광고 제작',
    punch: '광고 설명 말고, 문제 장면부터.',
    description:
      '후킹 카피, 밈 이미지, 보이스, 음악, 렌더까지 한 흐름으로 제작해 진단형 광고를 빠르게 실험합니다.',
    image: '/memes/hiob-001/10-wrong-person-money.jpeg',
    alt: '광고비가 엉뚱한 사람에게 가는 밈 이미지',
    icon: FileVideo,
  },
  {
    eyebrow: 'REPORTING OPS',
    title: '캠페인 리포트 운영',
    punch: '보고서가 예쁜데 원인은 안 보이면?',
    description:
      '성과 요약보다 먼저 누락, 이상치, 다음 액션을 보이게 구성해 대표와 실무자가 같은 화면에서 판단하도록 만듭니다.',
    image: '/render-assets/hiob-reels-002/ai-03-diagnosis.png',
    alt: '광고 진단 체크리스트 이미지',
    icon: ClipboardCheck,
  },
];

export const metadata = {
  title: 'HI-OB | 광고비 증발 방지위원회',
  description:
    'Pixel, CAPI, GA4, GTM 데이터 누락을 진단하고 밈형 숏폼 광고로 전환 문제를 설명합니다.',
  alternates: {
    canonical: '/agent',
  },
};

export default function HiObPage() {
  return (
    <main className={styles.siteShell}>
      <nav className={styles.navbar} aria-label="HI-OB navigation">
        <Link className={styles.logo} href="/agent">
          <span>Hi</span>
          <i />
          <span>OB</span>
        </Link>
        <div className={styles.navLinks}>
          <a href="#products">제품</a>
          <a href="#banner">배너</a>
          <a href="#prompt">브랜드 프롬프트</a>
        </div>
        <a className={styles.navCta} href="mailto:hello@hi-ob.com">
          무료 진단
        </a>
      </nav>

      <section className={styles.hero} id="banner">
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>
            <Megaphone size={18} />
            광고비 증발 방지위원회
          </p>
          <h1>
            광고비 새는 이유
            <span>있었음</span>
          </h1>
          <p className={styles.heroLead}>
            결과가 안 잡히면 광고가 좋은 손님을 못 찾아요. HI-OB는 픽셀, CAPI,
            GA4, GTM을 한 번에 뜯어보고 데이터가 어디서 길을 잃는지 찾아냅니다.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="mailto:hello@hi-ob.com">
              진단 요청하기
              <ArrowRight size={18} />
            </a>
            <a className={styles.secondaryButton} href="#products">
              제품 보기
            </a>
          </div>
        </div>

        <div className={styles.bannerBoard} aria-label="Playful HI-OB banner preview">
          <div className={styles.bannerTopline}>
            <span>이번 광고 성과</span>
            <strong>전환 0</strong>
          </div>
          <Image
            className={styles.reactionImage}
            src="/memes/hiob-001/06-ceo-leads-shocked.jpeg"
            alt="전환 성과를 보고 놀란 대표 이미지"
            width={640}
            height={720}
            priority
          />
          <div className={styles.dashboardPanel}>
            <span>성과 요약</span>
            <div className={styles.metricsGrid}>
              <b>링크 클릭 842</b>
              <b>전환 0</b>
              <b>전환당 비용 0원</b>
            </div>
            <div className={styles.chartLine} />
          </div>
          <div className={styles.redCross}>x</div>
          <div className={styles.scribble}>데이터 어디감?</div>
          <div className={styles.stickyNote}>
            데이터가 없으면
            <br />
            광고는 길을 잃어요!
          </div>
        </div>
      </section>

      <section className={styles.proofStrip} aria-label="Diagnostic proof points">
        {proofCards.map((card) => {
          const Icon = card.icon;
          return (
            <article className={styles.proofCard} key={card.label}>
              <Icon size={20} />
              <span>{card.label}</span>
              <strong>{card.value}</strong>
              <p>{card.detail}</p>
            </article>
          );
        })}
      </section>

      <section className={styles.section} id="products">
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>
            <BadgeCheck size={18} />
            제품별 진단 메뉴
          </p>
          <h2>문제 장면부터 보여주고, 해결은 제품으로 연결합니다.</h2>
        </div>

        <div className={styles.productGrid}>
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <article className={styles.productCard} key={product.title}>
                <Image
                  className={styles.productImage}
                  src={product.image}
                  alt={product.alt}
                  width={640}
                  height={480}
                />
                <div className={styles.productBody}>
                  <div className={styles.cardMeta}>
                    <span>{product.eyebrow}</span>
                    <Icon size={20} />
                  </div>
                  <h3>{product.title}</h3>
                  <p className={styles.cardPunch}>{product.punch}</p>
                  <p>{product.description}</p>
                  <a href="mailto:hello@hi-ob.com">
                    상담 문의
                    <ArrowRight size={16} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.bannerRecipe}>
        <div>
          <p className={styles.kicker}>
            <Stamp size={18} />
            배너 제작 방향
          </p>
          <h2>잘 만든 척보다, 문제를 딱 걸린 듯 보여주기.</h2>
        </div>
        <div className={styles.noteGrid}>
          {bannerNotes.map((note) => (
            <div className={styles.noteCard} key={note}>
              <CircleAlert size={19} />
              <span>{note}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.promptSection} id="prompt">
        <div className={styles.promptIntro}>
          <p className={styles.kicker}>
            <PencilLine size={18} />
            브랜드 이미지 갱신 프롬프트
          </p>
          <h2>이미지 생성, 상세 페이지, 숏폼 광고에 같은 톤을 반복합니다.</h2>
        </div>
        <article className={styles.promptCard}>
          <div>
            <span>MASTER PROMPT</span>
            <Sparkles size={18} />
          </div>
          <p>{brandPrompt}</p>
        </article>
        <article className={styles.promptCard}>
          <div>
            <span>BANNER PROMPT</span>
            <Sparkles size={18} />
          </div>
          <p>{bannerPrompt}</p>
        </article>
      </section>
    </main>
  );
}
