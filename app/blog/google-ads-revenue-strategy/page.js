'use client';

import Link from 'next/link';
import Footer from '../../../components/Footer';

export default function GoogleAdsRevenueStrategyPost() {
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
          <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--hiop-orange)', marginBottom: '2rem' }}>구글 광고 전략 | 2025.05.11</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1, marginBottom: '3rem', fontFamily: 'Black Han Sans, sans-serif' }}>
            매출로 직결되는 구글 광고 전략: ROAS 300% 달성의 공식
          </h1>
          <p style={{ fontSize: '1.8rem', fontWeight: 700, lineHeight: 1.4, borderLeft: '10px solid var(--hiop-blue)', paddingLeft: '2rem' }}>
            구글 광고를 집행하고 있지만 매출이 기대에 못 미친다면, 전략 구조의 문제입니다. 광고비를 늘리기 전에 구조를 바꾸세요.
          </p>
        </header>

        <section style={{ fontSize: '1.2rem', lineHeight: 2, color: '#111', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>1. 대부분의 구글 광고가 매출로 연결되지 않는 이유</h2>
            <p>
              구글 광고 ROAS가 낮은 가장 흔한 원인은 세 가지입니다. 첫째, 잘못된 입찰 전략(클릭 최대화 vs 전환 가치 최대화). 둘째, 부정확한 전환 데이터로 인한 AI 오학습. 셋째, 검색 의도와 맞지 않는 키워드 구조.
            </p>
            <p style={{ marginTop: '1.5rem' }}>
              구글 애즈는 머신러닝 기반 플랫폼입니다. 광고주가 제공하는 전환 신호(구매 완료, 전환 가치)의 품질이 성과를 결정합니다. 잘못된 데이터로 학습한 AI는 아무리 예산을 늘려도 고가치 유저를 찾아내지 못합니다.
            </p>
          </div>

          <div style={{ background: '#f4f4f0', padding: '3rem', border: '4px solid #000', boxShadow: '10px 10px 0 #000' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>2. 히옵의 매출 상승 구글 광고 전략 3단계</h2>
            <div style={{ display: 'grid', gap: '2rem' }}>
              {[
                {
                  step: 'STEP 1',
                  title: '데이터 기반 구조 설계',
                  desc: 'GA4 전자상거래 추적과 구글 전환 API를 연동해 실제 결제 금액이 구글 애즈에 전달되도록 구성합니다. tROAS 입찰이 제대로 작동하는 기반을 만듭니다.',
                },
                {
                  step: 'STEP 2',
                  title: '검색 의도 기반 캠페인 구조화',
                  desc: '구매 의도(Buy), 비교 검색(Compare), 정보 탐색(Aware) 단계별로 캠페인과 키워드를 분리합니다. 예산을 전환율이 높은 캠페인에 집중 배분합니다.',
                },
                {
                  step: 'STEP 3',
                  title: '전환 가치 최적화 입찰',
                  desc: '충분한 전환 데이터가 쌓이면 Maximize Conversion Value + tROAS 입찰로 전환합니다. 구글 AI가 자동으로 고가치 유저를 타겟팅합니다.',
                },
              ].map(({ step, title, desc }, i) => (
                <div key={i} style={{ padding: '2rem', background: '#fff', border: '2px solid #000', display: 'grid', gridTemplateColumns: '100px 1fr', gap: '1.5rem', alignItems: 'start' }}>
                  <div style={{ fontWeight: 900, fontSize: '1.4rem', color: 'var(--hiop-orange)' }}>{step}</div>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: '1.4rem', marginBottom: '0.5rem' }}>{title}</div>
                    <div>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>3. 실제 성과: ROAS 개선은 데이터에서 시작됩니다</h2>
            <p>
              히옵의 컨설팅을 받은 패션 이커머스 B사는 GA4 전자상거래 추적 정교화 + tROAS 입찰 전환만으로 2개월 내 ROAS를 180%에서 320%로 개선했습니다. 광고비는 동일했습니다.
            </p>
            <p style={{ marginTop: '1.5rem' }}>
              매출 상승 구글 광고 전략의 핵심은 더 많은 예산이 아닙니다. 올바른 데이터가 올바른 입찰 전략을 만들고, 올바른 입찰 전략이 매출을 만듭니다.
            </p>
          </div>

          <div style={{ borderTop: '4px solid #000', paddingTop: '4rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '2rem' }}>구글 광고 전략 무료 컨설팅 신청</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <a href="https://open.kakao.com/o/srdaF2si" target="_blank" rel="noopener noreferrer" className="btn-brutal primary" style={{ fontSize: '1.8rem' }}>
                실시간 카카오톡 상담하기
              </a>
            </div>
            <p style={{ marginTop: '2rem', fontWeight: 700, color: '#666' }}>
              * 현재 구글 광고 계정 구조와 ROAS 개선 가능 폭을 무료로 진단합니다.
            </p>
          </div>
        </section>
      </article>

      <Footer />
    </main>
  );
}
