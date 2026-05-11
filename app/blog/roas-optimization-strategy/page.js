'use client';

import Link from 'next/link';
import Footer from '../../../components/Footer';

export default function ROASOptimizationPost() {
  return (
    <main className="bg-light min-h-screen">
      <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid var(--border-dark)' }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="font-display" style={{ fontSize: '2.5rem' }}>히옵</div>
        </Link>
        <Link href="/blog" style={{ fontWeight: 800, color: 'inherit', textDecoration: 'none' }}>← 인사이트 목록으로</Link>
      </nav>

      <article className="wrap" style={{ padding: '8rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
        <header style={{ marginBottom: '6rem' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--hiop-orange)', marginBottom: '2rem' }}>퍼포먼스 전략 | 2025.05.11</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1, marginBottom: '3rem', fontFamily: 'Black Han Sans, sans-serif' }}>
            ROAS 극대화 전문 에이전시의 기술: 전환 가치 기반 AI 입찰 최적화
          </h1>
          <p style={{ fontSize: '1.8rem', fontWeight: 700, lineHeight: 1.4, borderLeft: '10px solid var(--hiop-blue)', paddingLeft: '2rem' }}>
            단순히 유입만 늘리는 광고는 이제 그만. 진짜 매출로 연결되는 고가치 유저를 찾는 퍼포먼스 마케팅의 정수를 공개합니다.
          </p>
        </header>

        <section style={{ fontSize: '1.2rem', lineHeight: 2, color: '#111', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>1. 클릭이 아닌 '가치'에 입찰하세요: 왜 tROAS인가?</h2>
            <p>
              많은 광고주들이 여전히 CPC(클릭당 비용)나 단순 CPA(전환당 비용) 최적화에 머물러 있습니다. 하지만 모든 구매가 같은 가치를 가지지는 않습니다. 1만 원을 구매하는 고객 10명보다 20만 원을 구매하는 고객 1명이 비즈니스 성장에 더 큰 기여를 합니다.
            </p>
            <p style={{ marginTop: '1.5rem' }}>
              히옵은 구글 광고의 <strong>tROAS(타겟 광고 시점 수익률)</strong> 전략을 활용해, 구매 확률이 높을 뿐만 아니라 '구매 금액'이 큰 유저를 AI가 우선적으로 찾아내도록 설계합니다.
            </p>
          </div>

          <div style={{ background: '#f4f4f0', padding: '3rem', border: '4px solid #000', boxShadow: '10px 10px 0 #000' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>2. 해결책: 데이터 피딩(Data Feeding) 최적화 전략</h2>
            <p>
              AI 입찰이 성공하려면 양질의 데이터가 필요합니다. 히옵은 다음의 3단계 솔루션을 통해 알고리즘의 지능을 높입니다.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '2rem', display: 'grid', gap: '1rem' }}>
              <li style={{ fontWeight: 800, fontSize: '1.3rem' }}>• 퍼스트 파티 데이터 통합: CRM 데이터를 구글/메타 시스템에 안전하게 피딩</li>
              <li style={{ fontWeight: 800, fontSize: '1.3rem' }}>• 가치 중심 전환 설정: 장바구니 담기부터 최종 결제까지 단계별 가치 부여</li>
              <li style={{ fontWeight: 800, fontSize: '1.3rem' }}>• AI 학습 가속화: 고효율 소재(Creative)와 데이터를 결합해 머신러닝 속도 향상</li>
            </ul>
          </div>

          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>3. 기대 효과: 지속 가능한 스케일업의 기반을 만듭니다</h2>
            <p>
              전환 가치 기반의 입찰 전략은 광고 예산을 증액해도 ROAS가 무너지지 않게 지탱해 줍니다. 감에 의존하는 것이 아닌, 철저히 데이터에 기반해 확장(Scale-up)할 수 있는 구조를 만드는 것입니다.
            </p>
            <p style={{ marginTop: '1.5rem' }}>
              히옵 에이전시는 데이터 드리븐 마케팅을 통해 고객사의 비즈니스 성장을 증명합니다. 지금 귀사의 광고 계정이 제대로 된 방향으로 학습하고 있는지 진단받으세요.
            </p>
          </div>

          <div style={{ borderTop: '4px solid #000', paddingTop: '4rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '2rem' }}>당신의 비즈니스 가치를 숫자로 증명합니다</h3>
            <a href="https://open.kakao.com/o/srdaF2si" target="_blank" rel="noopener noreferrer" className="btn-brutal primary" style={{ fontSize: '1.8rem' }}>
              ROAS 최적화 전략 상담하기
            </a>
          </div>
        </section>
      </article>

      <Footer />
    </main>
  );
}
