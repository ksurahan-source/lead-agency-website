import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  Boxes,
  Check,
  ClipboardList,
  Database,
  Factory,
  Film,
  LineChart,
  MessageSquareText,
  PackageCheck,
  Radar,
  SearchCheck,
  Sparkles,
  TestTube2,
  Truck,
  Zap,
} from 'lucide-react';
import CreativeVelocityForm from '@/components/CreativeVelocityForm';

const pipeline = [
  '광고 원재료',
  '소구점 추출',
  'AI 소재 확장',
  '소재 테스트',
  '승자 소재 확장',
];

const problemStats = [
  ['₩3,000만–₩5,000만', '광고비가 자주 막히는 구간'],
  ['7-14일', '새 소재 테스트까지 걸리는 내부 리드타임'],
  ['CAC ↑', '승자 소재 피로 이후 반복되는 비용 상승'],
];

const rawMaterials = [
  ['생산 과정', Factory],
  ['포장 과정', PackageCheck],
  ['고객 리뷰', MessageSquareText],
  ['CS 질문', ClipboardList],
  ['대표 인터뷰', Sparkles],
  ['제품 비교 실험', TestTube2],
  ['사용 장면', Film],
  ['배송/창고/직원 루틴', Truck],
];

const outputs = [
  '후킹 문구 변형',
  'UGC형 대본',
  '숏폼 광고',
  '카탈로그 영상',
  'Meta 광고 소재',
  'Google 광고 소재',
  '리타게팅 소구점',
];

const pillars = [
  {
    icon: Database,
    title: '데이터 인프라',
    summary: '추적 기준이 흔들리면 테스트 결과도 흔들립니다. 알고리즘이 학습할 수 있는 전환 데이터 기준을 먼저 정리합니다.',
    items: ['Meta CAPI', 'GA4/GTM 세팅', '이벤트 품질 개선', '동적 전환 가치 설정', '퍼널 추적'],
  },
  {
    icon: Boxes,
    title: '광고 원재료 엔진',
    summary: '브랜드 내부에 이미 존재하는 장면, 말, 반박, 증거를 성과형 광고 원재료로 분류하고 확장합니다.',
    items: ['내부 촬영 가이드', '대표·제품 메시지 추출', '리뷰·고객 반박 포인트 분석', 'AI 기반 대본 확장', 'UGC형 광고 변형'],
  },
  {
    icon: Radar,
    title: '성과 테스트 시스템',
    summary: '많이 만드는 것에서 끝나지 않습니다. 어떤 소재가 이기는지 찾고, 이긴 소재를 변형해 예산 확장으로 연결합니다.',
    items: ['후킹 테스트', '소구점 테스트', '포맷 테스트', '승자 소재 발견', '예산 확장', 'CAC 방어'],
  },
];

const offers = [
  {
    kicker: '서비스 01',
    title: '단기 소재 테스트 스프린트',
    forWho: '빠른 소재 테스트가 필요한 브랜드',
    deliverables: ['광고 원재료 진단', '광고 소재 콘셉트 30개', '숏폼 소재 10–30개', '후킹·소구점 테스트 설계', '승자 소재 리포트'],
    cta: '스프린트 진단 받기',
  },
  {
    kicker: '서비스 02',
    title: '영상 카탈로그 소재 시스템',
    forWho: 'SKU가 많고 제품별 소재 테스트가 필요한 이커머스',
    deliverables: ['AI 영상 카탈로그 소재', '보조 피드 구조 설계', 'Meta 카탈로그 영상 세팅', '제품별 소재 테스트'],
    cta: '카탈로그 구조 보기',
  },
  {
    kicker: '서비스 03',
    title: 'Scale OS (스케일 운영 시스템)',
    forWho: '월 ₩1,000만–₩5,000만 이상 집행 브랜드',
    deliverables: ['데이터 인프라', '소재 생산 파이프라인', 'Meta/Google 캠페인 구조', '주간 테스트 운영 리듬', '스케일링 프레임워크'],
    cta: 'Scale OS 상담하기',
  },
];

const navItems = [
  ['문제', '#problem'],
  ['엔진', '#engine'],
  ['운영 시스템', '#os'],
  ['서비스 구성', '#offers'],
];

export const metadata = {
  title: 'HI-OP Creative Velocity OS | DTC 소재 병목 진단',
  description:
    'DTC 브랜드의 소재 병목을 풀고 광고비 확장을 돕는 HI-OP Creative Velocity OS',
  openGraph: {
    title: 'HI-OP Creative Velocity OS | DTC 소재 병목 진단',
    description: 'DTC 브랜드의 소재 병목을 풀고 광고비 확장을 돕는 HI-OP Creative Velocity OS',
    url: 'https://hi-ob.com',
    siteName: 'HI-OP',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HI-OP Creative Velocity OS | DTC 소재 병목 진단',
    description: 'DTC 브랜드의 소재 병목을 풀고 광고비 확장을 돕는 HI-OP Creative Velocity OS',
  },
};

function SectionLabel({ children }) {
  return <div className="cv-label">{children}</div>;
}

function SectionHeader({ eyebrow, title, body }) {
  return (
    <div className="cv-section-head">
      <SectionLabel>{eyebrow}</SectionLabel>
      <h2>{title}</h2>
      {body && <p>{body}</p>}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="home-dark">
      <nav className="cv-nav">
        <Link href="/" className="cv-brand" aria-label="HI-OP 홈">
          <span className="cv-brand-mark">HI</span>
          <span>
            HI-OP
            <small>Creative Velocity OS</small>
          </span>
        </Link>
        <div className="cv-nav-links" aria-label="홈페이지 섹션 이동">
          {navItems.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </div>
        <a className="cv-nav-cta" href="#diagnosis">무료 진단 신청</a>
      </nav>

      <section className="cv-hero">
        <div className="cv-hero-copy">
          <SectionLabel>월 ₩1,000만–₩5,000만 이상 광고비를 집행하는 DTC 브랜드를 위한 시스템</SectionLabel>
          <h1>광고 성과는 더 이상 타게팅으로 결정되지 않습니다.</h1>
          <p className="cv-hero-sub">
            HI-OP은 브랜드 내부의 원재료를 성과형 광고 소재로 변환하고, Meta/Google 알고리즘이 학습할 수 있는
            <strong> Creative Velocity OS(소재 생산·테스트 운영 시스템)</strong>를 구축합니다.
          </p>
          <p className="cv-hero-proof">
            ROAS는 이미 검증됐는데 스케일이 멈췄다면, 문제는 광고 설정이 아닐 가능성이 큽니다. 알고리즘에 먹일 소재 공급량과 테스트 속도가 부족한 것입니다.
          </p>
          <div className="cv-actions">
            <a className="cv-button primary" href="#diagnosis">
              광고 구조 진단 받기 <ArrowRight size={18} />
            </a>
            <a className="cv-button secondary" href="#os">
              소재 운영 시스템 보기
            </a>
          </div>
        </div>

        <div className="cv-dashboard" aria-label="Creative Velocity OS 대시보드 시각화">
          <div className="cv-window-bar">
            <span />
            <span />
            <span />
            <strong>소재 생산·테스트 파이프라인</strong>
          </div>
          <div className="cv-pipeline">
            {pipeline.map((step, index) => (
              <div className="cv-pipeline-step" key={step}>
                <small>{String(index + 1).padStart(2, '0')}</small>
                <b>{step}</b>
              </div>
            ))}
          </div>
          <div className="cv-live-grid">
            <div>
              <small>입력 대기 원재료</small>
              <strong>128</strong>
              <span>리뷰, 촬영본, CS, 데모 영상</span>
            </div>
            <div>
              <small>주간 테스트 수</small>
              <strong>32</strong>
              <span>후킹, 소구점, 포맷</span>
            </div>
            <div>
              <small>승자 소재 신호</small>
              <strong>4.8x</strong>
              <span>확장 가능한 소재 변형 준비</span>
            </div>
          </div>
          <div className="cv-signal-panel">
            <div>
              <small>알고리즘 학습 상태</small>
              <strong>학습 속도 상승 중</strong>
            </div>
            <div className="cv-bars" aria-hidden="true">
              {[34, 58, 42, 76, 63, 88, 70, 96].map((height) => (
                <span key={height} style={{ height: `${height}%` }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="problem" className="cv-section cv-problem">
        <SectionHeader
          eyebrow="스케일이 막히는 진짜 이유"
          title="광고비를 더 쓰지 못하는 진짜 이유"
          body="이미 ROAS는 검증됐고, 제품 USP도 충분하고, 대표가 하고 싶은 말도 많습니다. 하지만 소재 테스트 속도가 광고비 증가 속도를 따라가지 못하면 광고비는 3천만-5천만 원 구간에서 막힙니다."
        />
        <div className="cv-problem-grid">
          <div className="cv-problem-copy">
            <p>
              문제는 광고 운영이 아닙니다.
              <br />
              <strong>알고리즘에 먹일 소재 공급량입니다.</strong>
            </p>
            <ul>
              <li>새 소재가 늦어 테스트가 멈춥니다.</li>
              <li>승자 소재가 피로해지면 CAC가 다시 올라갑니다.</li>
              <li>내부 마케팅 팀은 촬영, 편집, 카피, 운영을 동시에 감당합니다.</li>
              <li>광고비를 늘려도 알고리즘은 새로운 학습 신호를 충분히 받지 못합니다.</li>
            </ul>
          </div>
          <div className="cv-stat-stack">
            {problemStats.map(([value, label]) => (
              <div key={label} className="cv-stat">
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="engine" className="cv-section">
        <SectionHeader
          eyebrow="광고 원재료 엔진"
          title="브랜드 내부를 광고 원재료 공장으로 바꿉니다."
          body="HI-OP은 외부에서 억지로 아이디어를 만들지 않습니다. 브랜드 안에 이미 쌓여 있는 장면, 말, 질문, 반박, 증거를 꺼내 성과형 소재로 변환합니다."
        />
        <div className="cv-engine-grid">
          <div className="cv-engine-column">
            <h3>광고 원재료</h3>
            <div className="cv-material-grid">
              {rawMaterials.map(([label, Icon]) => (
                <div key={label} className="cv-material">
                  <Icon size={19} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="cv-transform" aria-hidden="true">
            <Zap size={30} />
            <span>추출<br />확장<br />테스트</span>
          </div>
          <div className="cv-engine-column">
            <h3>성과형 광고 소재</h3>
            <div className="cv-output-list">
              {outputs.map((item) => (
                <div key={item}>
                  <Check size={17} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="os" className="cv-section cv-os">
        <SectionHeader
          eyebrow="운영 시스템"
          title="HI-OP Creative Velocity OS"
          body="데이터 인프라가 학습 기준을 만들고, 광고 원재료 엔진이 소재 공급량을 만들고, 성과 테스트 시스템이 승자 소재를 찾아 확장합니다."
        />
        <div className="cv-pillars">
          {pillars.map(({ icon: Icon, title, summary, items }) => (
            <article key={title} className="cv-pillar">
              <div className="cv-pillar-icon"><Icon size={24} /></div>
              <h3>{title}</h3>
              <p>{summary}</p>
              <ul>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="cv-section cv-case">
        <div className="cv-case-copy">
          <SectionLabel>케이스 패턴</SectionLabel>
          <h2>월 5,400만 원 광고비에서 스케일이 막힌 브랜드의 공통점</h2>
          <p>
            이 브랜드는 제품 메시지도 많고, 하고 싶은 말도 많았습니다. 문제는 광고 아이디어가 없는 것이 아니라,
            그 메시지를 빠르게 소재화하고 테스트하는 시스템이 없다는 점이었습니다.
          </p>
          <strong>스케일이 막힌 브랜드는 보통 아이디어가 부족한 것이 아닙니다. 아이디어를 광고 소재로 변환하는 속도가 부족합니다.</strong>
        </div>
        <div className="cv-case-board">
          {[
            ['현재 월 광고비', '₩5,400만 / 월'],
            ['문제', '소재 테스트 병목'],
            ['활용 가능한 원재료', '공장 촬영본, 제품 스토리, 제품 데모, 고객 반박 포인트'],
            ['해결 구조', '광고 원재료 엔진 + 영상 카탈로그 + 소재 테스트'],
            ['목표', '소재 테스트 물량을 늘리고 확장 가능한 승자 소재 발견'],
          ].map(([label, value]) => (
            <div key={label}>
              <small>{label}</small>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="offers" className="cv-section">
        <SectionHeader
          eyebrow="서비스 구성"
          title="소재 병목을 푸는 3가지 진입 구조"
          body="브랜드 상황에 따라 빠른 테스트, SKU 기반 영상 카탈로그, 또는 월 운영형 Scale OS(스케일 운영 시스템)로 시작할 수 있습니다."
        />
        <div className="cv-offers">
          {offers.map((offer) => (
            <article key={offer.title} className="cv-offer">
              <span>{offer.kicker}</span>
              <h3>{offer.title}</h3>
              <p>{offer.forWho}</p>
              <ul>
                {offer.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a href="#diagnosis">{offer.cta} <ArrowRight size={16} /></a>
            </article>
          ))}
        </div>
      </section>

      <section id="diagnosis" className="cv-section cv-final">
        <div className="cv-final-copy">
          <SectionLabel>무료 소재 병목 진단</SectionLabel>
          <h2>광고비를 더 쓰기 전에, 소재 병목부터 진단하세요.</h2>
          <p>
            지금 필요한 것은 더 많은 광고 세팅이 아니라, 알고리즘이 계속 학습할 수 있는 소재 공급 시스템입니다.
            월 ₩1,000만 이상 광고를 집행 중인 DTC·이커머스 브랜드를 우선 진단합니다.
          </p>
          <div className="cv-final-points">
            <span><SearchCheck size={18} />소재 병목 진단</span>
            <span><BarChart3 size={18} />광고 구조 확인</span>
            <span><LineChart size={18} />승자 소재 확장 방향 제안</span>
          </div>
        </div>
        <CreativeVelocityForm />
      </section>

      <footer className="cv-footer">
        <div>
          <strong>HI-OP</strong>
          <span>DTC 브랜드의 소재 병목을 풀고 광고비 확장을 돕는 Creative Velocity OS</span>
        </div>
        <div>
          <Link href="/privacy">개인정보 처리방침</Link>
          <Link href="/terms">이용약관</Link>
        </div>
      </footer>
    </main>
  );
}
