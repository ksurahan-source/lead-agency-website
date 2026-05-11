'use client';

import Link from 'next/link';
import Footer from '../../../components/Footer';

export default function ShoppingMallGoogleSearchAdsPost() {
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
            쇼핑몰 구글 검색 광고: 클릭을 구매로 바꾸는 구조 설계법
          </h1>
          <p style={{ fontSize: '1.8rem', fontWeight: 700, lineHeight: 1.4, borderLeft: '10px solid var(--hiop-blue)', paddingLeft: '2rem' }}>
            쇼핑몰 구글 광고는 일반 브랜드 광고와 다릅니다. 구매 의도를 가진 키워드를 정확히 잡아야 광고비가 매출로 돌아옵니다.
          </p>
        </header>

        <section style={{ fontSize: '1.2rem', lineHeight: 2, color: '#111', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>1. 쇼핑몰 구글 광고가 어려운 이유</h2>
            <p>
              쇼핑몰 구글 검색 광고의 핵심 과제는 키워드 선별입니다. "운동화"라는 키워드는 트래픽이 높지만 구매 전환율이 낮습니다. "나이키 에어포스1 화이트 275 구매"는 트래픽이 낮지만 전환율이 수십 배 높습니다. 예산 배분을 잘못하면 광고비는 나가는데 ROAS는 100% 이하로 떨어집니다.
            </p>
            <p style={{ marginTop: '1.5rem' }}>
              또한 경쟁 쇼핑몰이 많은 카테고리일수록 CPC(클릭당 비용)가 높아져 수익성 관리가 어렵습니다. 올바른 입찰 전략과 키워드 구조 없이는 광고비 대비 손익 분기를 넘기기 어렵습니다.
            </p>
          </div>

          <div style={{ background: '#f4f4f0', padding: '3rem', border: '4px solid #000', boxShadow: '10px 10px 0 #000' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>2. 히옵의 쇼핑몰 검색 광고 3단계 전략</h2>
            <div style={{ display: 'grid', gap: '2rem' }}>
              {[
                {
                  step: 'STEP 1',
                  title: '구매 의도 키워드 발굴',
                  desc: '상품명 + 구매/가격/추천 등 구매 의도 수식어 조합으로 고전환 키워드를 발굴합니다. 브랜드명, 경쟁사 상품명, 세부 스펙 키워드를 캠페인별로 분리합니다.',
                },
                {
                  step: 'STEP 2',
                  title: '캠페인 구조 최적화',
                  desc: '구매 의도 키워드를 별도 캠페인으로 분리해 예산을 집중 배분합니다. 일반 정보성 키워드는 예산을 최소화하거나 제외 키워드로 차단합니다.',
                },
                {
                  step: 'STEP 3',
                  title: 'tROAS 기반 자동 입찰',
                  desc: 'GA4 전자상거래 추적 + 구글 전환 API 연동 후 목표 ROAS 입찰로 전환합니다. 구글 AI가 자동으로 구매 가능성이 높은 유저에게 입찰가를 높입니다.',
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
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>3. 카페24·아임웹 쇼핑몰 맞춤 추적 설정</h2>
            <p>
              카페24, 아임웹, 고도몰 등 국내 쇼핑몰 플랫폼은 구글 애즈 전환 추적 연동이 까다롭습니다. 표준 GTM 설치만으로는 실제 결제금액이 구글에 전달되지 않는 경우가 많습니다.
            </p>
            <p style={{ marginTop: '1.5rem' }}>
              히옵은 플랫폼별 맞춤 전환 추적 구축 경험을 보유하고 있습니다. 정확한 전환 데이터가 전달되어야 tROAS 입찰이 제대로 작동하고, ROAS가 실질적으로 개선됩니다.
            </p>
          </div>

          <div style={{ borderTop: '4px solid #000', paddingTop: '4rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '2rem' }}>쇼핑몰 구글 광고 무료 컨설팅 신청</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <a href="https://open.kakao.com/o/srdaF2si" target="_blank" rel="noopener noreferrer" className="btn-brutal primary" style={{ fontSize: '1.8rem' }}>
                실시간 카카오톡 상담하기
              </a>
            </div>
            <p style={{ marginTop: '2rem', fontWeight: 700, color: '#666' }}>
              * 현재 키워드 구조와 ROAS 개선 가능성을 무료로 진단합니다.
            </p>
          </div>
        </section>
      </article>

      <Footer />
    </main>
  );
}
