import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  Boxes,
  Check,
  ClipboardList,
  Cpu,
  Factory,
  Film,
  LineChart,
  MessageSquareText,
  PackageCheck,
  Radar,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  TestTube2,
  Truck,
  Zap,
} from 'lucide-react';
import CreativeVelocityForm from '@/components/CreativeVelocityForm';
import { positioningLine } from '@/lib/categoryPages';

const pipeline = [
  'raw material',
  'hook generation',
  'AI expansion',
  'testing rhythm',
  'Winner Scaling',
];

const problemStats = [
  ['₩3,000만-₩5,000만', 'DTC 브랜드가 자주 막히는 광고비 구간'],
  ['CAC ↑', '승자 소재 피로 이후 반복되는 비용 상승'],
  ['Creative Fatigue', '알고리즘에 공급할 새 학습 재료 부족'],
];

const rawMaterials = [
  ['고객 리뷰', MessageSquareText],
  ['대표 메시지', Sparkles],
  ['포장/배송 장면', PackageCheck],
  ['CS 질문', ClipboardList],
  ['제품 데모', Film],
  ['생산 과정', Factory],
  ['비교 실험', TestTube2],
  ['창고/직원 루틴', Truck],
];

const outputs = [
  'Hook variations',
  'UGC 숏폼 광고',
  'Meta creatives',
  'Video Catalog assets',
  '리타게팅 angle',
  'Winner 후보 소재',
];

const osSteps = [
  {
    icon: Boxes,
    title: 'Raw Material Extraction',
    body: '브랜드 내부의 리뷰, CS, 데모, 대표 메시지를 광고 원재료로 분류합니다.',
  },
  {
    icon: Sparkles,
    title: 'Hook Generation',
    body: '고객 반박과 구매 이유를 첫 3초에 걸리는 hook과 angle로 바꿉니다.',
  },
  {
    icon: Cpu,
    title: 'AI Expansion',
    body: '검증된 메시지를 여러 포맷과 길이의 성과형 광고 소재 후보로 확장합니다.',
  },
  {
    icon: Radar,
    title: 'Winner Scaling',
    body: '테스트 신호를 기준으로 이긴 소재를 변형하고 예산 확장 구조에 연결합니다.',
  },
];

const infraSignals = [
  ['AWS Remotion', '반복 렌더링을 통제 가능한 파이프라인으로 운영'],
  ['Shorts Producer', 'Hook, 대본, 소재 변형을 빠르게 생산하는 내부 모듈'],
  ['Cost Meter', '소재 생산량이 늘어도 비용 한도를 확인하는 장치'],
  ['Approval Gating', '브랜드 톤, 표현 리스크, 최종 승인 흐름 통제'],
];

const categories = [
  {
    label: 'Growth',
    href: '/growth',
    title: '광고비가 더 이상 안 올라가는 브랜드를 위한 성장 구조',
    body: 'CAC 상승, ROAS 정체, Meta 학습 약화, 전환 추적 문제를 Creative Velocity와 함께 진단합니다.',
    items: ['Meta CAPI', 'GA4/GTM', '광고 구조 진단', 'Scale OS'],
  },
  {
    label: 'Creative',
    href: '/creative',
    title: '브랜드 내부 raw material을 성과형 광고 소재로 변환',
    body: 'Creative Fatigue, 낮은 CTR, 약한 hook, 느린 Winner 발견 문제를 광고 실험 구조로 해결합니다.',
    items: ['UGC Shorts', 'Hook generation', 'Video Catalog', 'Raw Material Engine'],
  },
  {
    label: 'System',
    href: '/system',
    title: '광고 소재 생산을 시스템화',
    body: '수작업 제작 병목, 비용 폭증, 승인 누락을 Creative Infrastructure로 전환합니다.',
    items: ['Shorts Producer', 'AWS Remotion', 'Cost Meter', 'automation'],
  },
];

const navItems = [
  ['Creative OS', '#os'],
  ['서비스', '#categories'],
  ['사례', '#case'],
  ['상담하기', '#diagnosis'],
];

export const metadata = {
  title: 'HI-OP Creative Performance OS | DTC 광고 성과 운영 시스템',
  description:
    'HI-OP은 브랜드 내부의 raw material을 성과형 광고 소재로 변환해 DTC 브랜드의 소재 병목과 광고비 확장 문제를 해결하는 Creative Performance Infrastructure입니다.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'HI-OP Creative Performance OS | DTC 광고 성과 운영 시스템',
    description: '소재 병목을 풀고 Creative Velocity를 운영하는 DTC Creative Performance Infrastructure.',
    url: 'https://hi-ob.com',
    siteName: 'HI-OP',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HI-OP Creative Performance OS | DTC 광고 성과 운영 시스템',
    description: '소재 병목을 풀고 Creative Velocity를 운영하는 DTC Creative Performance Infrastructure.',
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
            <small>Creative Performance OS</small>
          </span>
        </Link>
        <div className="cv-nav-links" aria-label="홈페이지 섹션 이동">
          {navItems.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </div>
        <a className="cv-nav-cta" href="#diagnosis">광고 구조 무료 진단</a>
      </nav>

      <section className="cv-hero">
        <div className="cv-hero-copy">
          <SectionLabel>Creative Performance Infrastructure for DTC brands</SectionLabel>
          <h1>광고비가 더 이상 안 올라가는 이유는 광고 운영이 아니라 소재 병목 때문입니다.</h1>
          <p className="cv-hero-sub">
            HI-OP은 브랜드 내부의 raw material을 성과형 광고 소재로 변환하는
            <strong> Creative Performance OS</strong>입니다.
          </p>
          <div className="cv-positioning-line">{positioningLine}</div>
          <p className="cv-hero-proof">
            브랜드는 아이디어가 부족해서 막히는 것이 아니라, 아이디어를 테스트 가능한 소재로 바꾸는 속도에서 막힙니다.
          </p>
          <div className="cv-actions">
            <a className="cv-button primary" href="#diagnosis">
              광고 구조 무료 진단 <ArrowRight size={18} />
            </a>
            <a className="cv-button secondary" href="#os">
              Creative Velocity 분석 받기
            </a>
          </div>
        </div>

        <div className="cv-dashboard" aria-label="Creative Velocity Pipeline">
          <div className="cv-window-bar">
            <span />
            <span />
            <span />
            <strong>Creative Velocity Pipeline</strong>
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
              <small>raw material queue</small>
              <strong>128</strong>
              <span>리뷰, 촬영본, CS, 데모, 포장 장면</span>
            </div>
            <div>
              <small>weekly tests</small>
              <strong>32</strong>
              <span>hook, angle, format 단위 테스트</span>
            </div>
            <div>
              <small>winner signals</small>
              <strong>4.8x</strong>
              <span>확장 가능한 승자 후보 소재</span>
            </div>
          </div>
          <div className="cv-signal-panel">
            <div>
              <small>algorithm learning</small>
              <strong>새 학습 재료 공급 중</strong>
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
          eyebrow="Market Problem"
          title="DTC 브랜드가 막히는 지점은 점점 캠페인 밖으로 이동했습니다."
          body="Creative Fatigue, CAC 상승, 느린 테스트, 약한 알고리즘 학습이 동시에 오면 광고비는 3천만-5천만 원 구간에서 멈춥니다."
        />
        <div className="cv-problem-grid">
          <div className="cv-problem-copy">
            <p>
              브랜드는 아이디어가 부족해서 막히는 것이 아니라,
              <br />
              <strong>아이디어를 테스트 가능한 소재로 바꾸는 속도에서 막힙니다.</strong>
            </p>
            <ul>
              <li>새 hook과 angle이 늦어 알고리즘 학습 재료가 부족합니다.</li>
              <li>승자 소재가 피로해지면 CAC가 다시 올라갑니다.</li>
              <li>내부 팀은 촬영, 카피, 검수, 운영을 동시에 감당합니다.</li>
              <li>광고비를 올려도 새 실험 신호가 충분하지 않으면 스케일링이 멈춥니다.</li>
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

      <section className="cv-section cv-agency-fail">
        <SectionHeader
          eyebrow="Why Current Workflows Fail"
          title="기존 운영 방식은 testing throughput을 고치지 못합니다."
          body="문제는 운영 리포트가 아니라, 알고리즘에 공급되는 학습 재료의 속도입니다."
        />
        <div className="cv-failure-grid">
          {[
            ['운영 최적화에 머뭅니다', '예산과 캠페인을 조정하지만 소재 테스트 물량과 전환 신호 품질을 함께 보지 않습니다.'],
            ['예쁜 결과물에 머뭅니다', '광고 실험 단위인 hook, angle, format, offer 변형량이 부족합니다.'],
            ['Winner discovery가 없습니다', '이긴 소재를 발견하고 변형해 예산 확장으로 연결하는 구조가 약합니다.'],
          ].map(([title, body]) => (
            <article className="cv-failure-card" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="os" className="cv-section cv-os">
        <SectionHeader
          eyebrow="Creative Performance OS"
          title="HI-OP은 광고 성과 운영 시스템을 구축합니다."
          body="raw material extraction → hook generation → AI expansion → testing rhythm → Winner Scaling으로 이어지는 Creative Velocity System입니다."
        />
        <div className="cv-pillars cv-os-steps">
          {osSteps.map(({ icon: Icon, title, body }) => (
            <article key={title} className="cv-pillar">
              <div className="cv-pillar-icon"><Icon size={24} /></div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="engine" className="cv-section">
        <SectionHeader
          eyebrow="Raw Material Engine"
          title="브랜드 안에 이미 있는 원재료를 성과형 광고 소재로 변환합니다."
          body="외부에서 억지로 아이디어를 만드는 대신, 브랜드 내부의 장면·말·질문·반박·증거를 광고 원재료로 꺼냅니다."
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

      <section className="cv-section cv-infra">
        <SectionHeader
          eyebrow="System Infrastructure"
          title="속도, 비용, 승인, 렌더링을 통제할 수 있어야 Creative Velocity가 운영됩니다."
          body="기술은 전면의 제품이 아니라 깊이를 증명하는 운영 기반입니다. HI-OP은 소재 생산량이 늘어날 때 무너지는 지점을 시스템으로 통제합니다."
        />
        <div className="cv-infra-grid">
          {infraSignals.map(([title, body]) => (
            <article className="cv-infra-card" key={title}>
              <ShieldCheck size={20} />
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="case" className="cv-section cv-case">
        <div className="cv-case-copy">
          <SectionLabel>Case Pattern</SectionLabel>
          <h2>월 5,400만 원 광고비에서 스케일이 막힌 브랜드의 공통점</h2>
          <p>
            이 브랜드는 제품 메시지도 많고, 하고 싶은 말도 많았습니다. 문제는 아이디어가 없는 것이 아니라,
            그 메시지를 빠르게 소재화하고 테스트하는 시스템이 없다는 점이었습니다.
          </p>
          <strong>충분한 콘텐츠가 있었지만 testing throughput이 부족했습니다. 해결 구조는 Creative Performance OS였습니다.</strong>
        </div>
        <div className="cv-case-board">
          {[
            ['현재 월 광고비', '₩5,400만 / 월'],
            ['막힌 지점', '소재 테스트 병목'],
            ['보유 원재료', '공장 촬영본, 제품 스토리, 제품 데모, 고객 반박 포인트'],
            ['해결 구조', 'Raw Material Engine + Video Catalog + Creative Testing'],
            ['목표', '소재 테스트 물량 증가와 Winner Scaling'],
          ].map(([label, value]) => (
            <div key={label}>
              <small>{label}</small>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="categories" className="cv-section">
        <SectionHeader
          eyebrow="Category Routing"
          title="문제의 위치에 따라 세 가지 구조로 들어갑니다."
          body="홈페이지는 서비스 카탈로그가 아닙니다. 브랜드가 막힌 원인을 진단하고 Growth, Creative, System 중 맞는 구조로 연결합니다."
        />
        <div className="cv-category-grid">
          {categories.map((category) => (
            <Link href={category.href} className="cv-category-card" key={category.href}>
              <span>{category.label}</span>
              <h3>{category.title}</h3>
              <p>{category.body}</p>
              <ul>
                {category.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <b>자세히 보기 <ArrowRight size={16} /></b>
            </Link>
          ))}
        </div>
      </section>

      <section id="diagnosis" className="cv-section cv-final">
        <div className="cv-final-copy">
          <SectionLabel>Free Diagnosis</SectionLabel>
          <h2>광고 운영보다 먼저, 소재 병목부터 진단하세요.</h2>
          <p>
            지금 필요한 것은 더 많은 세팅이 아니라, 알고리즘이 계속 학습할 수 있는 소재 공급 시스템입니다.
            {positioningLine}
          </p>
          <div className="cv-final-points">
            <span><SearchCheck size={18} />소재 병목 진단</span>
            <span><BarChart3 size={18} />광고 구조 확인</span>
            <span><LineChart size={18} />Winner Scaling 방향</span>
          </div>
        </div>
        <CreativeVelocityForm
          source="home_creative_performance_os"
          title="광고 구조 무료 진단 신청"
          description="월 광고비, 소재 제작량, 내부 원재료 보유 상태를 기준으로 광고 성과 운영 시스템의 병목을 확인합니다."
          submitLabel="광고 구조 무료 진단"
          successTitle="광고 구조 무료 진단 신청이 접수되었습니다."
        />
      </section>

      <footer className="cv-footer">
        <div>
          <strong>HI-OP</strong>
          <span>{positioningLine}</span>
        </div>
        <div>
          <Link href="/privacy">개인정보 처리방침</Link>
          <Link href="/terms">이용약관</Link>
        </div>
      </footer>
    </main>
  );
}
