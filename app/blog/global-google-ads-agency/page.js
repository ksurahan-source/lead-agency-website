'use client';

import Link from 'next/link';
import Footer from '../../../components/Footer';

export default function GlobalGoogleAdsAgencyPost() {
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
          <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--hiop-orange)', marginBottom: '2rem' }}>글로벌 광고 | 2025.05.11</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1, marginBottom: '3rem', fontFamily: 'Black Han Sans, sans-serif' }}>
            글로벌 구글 광고 대행: 해외 시장에서 ROAS를 만드는 방법
          </h1>
          <p style={{ fontSize: '1.8rem', fontWeight: 700, lineHeight: 1.4, borderLeft: '10px solid var(--hiop-blue)', paddingLeft: '2rem' }}>
            한국에서 잘 되는 광고가 해외에서도 잘 될 거라는 착각. 현지 검색 의도와 언어를 모르면 글로벌 구글 광고는 실패합니다.
          </p>
        </header>

        <section style={{ fontSize: '1.2rem', lineHeight: 2, color: '#111', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>1. 글로벌 구글 광고가 어려운 이유</h2>
            <p>
              글로벌 구글 광고의 가장 큰 함정은 번역 키워드를 그대로 사용하는 것입니다. 구글 번역으로 만든 영어 키워드는 현지인이 실제로 검색하는 표현과 다를 수 있습니다. 검색 볼륨이 있어 보여도 구매 의도가 없는 키워드일 수 있습니다.
            </p>
            <p style={{ marginTop: '1.5rem' }}>
              또한 국가별로 구글 광고 경쟁 강도, CPC 수준, 전환율이 크게 다릅니다. 미국 이커머스 CPC는 한국의 3~5배, 동남아 시장은 CPC가 낮지만 구매력이 다릅니다. 국가별 수익성 분석 없이 예산을 분배하면 효율이 크게 떨어집니다.
            </p>
          </div>

          <div style={{ background: '#f4f4f0', padding: '3rem', border: '4px solid #000', boxShadow: '10px 10px 0 #000' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>2. 히옵의 글로벌 구글 광고 3단계 접근법</h2>
            <div style={{ display: 'grid', gap: '2rem' }}>
              {[
                {
                  step: 'STEP 1',
                  title: '시장별 키워드 현지화',
                  desc: '구글 키워드 플래너 + 현지 검색 트렌드 데이터로 각 국가에서 실제로 검색되는 구매 의도 키워드를 발굴합니다. 번역이 아닌 현지화된 키워드 전략을 수립합니다.',
                },
                {
                  step: 'STEP 2',
                  title: '국가별 캠페인 분리',
                  desc: '국가를 하나의 캠페인에 묶으면 예산 효율을 관리할 수 없습니다. 국가별로 캠페인을 분리해 CPC, 전환율, ROAS를 독립적으로 최적화합니다.',
                },
                {
                  step: 'STEP 3',
                  title: '다국가 전환 추적 통합',
                  desc: '국가별 통화 단위와 전환값을 정확하게 구글에 전달합니다. tROAS 입찰이 국가별 수익성을 반영해 자동으로 예산을 최적 배분합니다.',
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
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>3. 히옵의 글로벌 광고 운영 경험</h2>
            <p>
              히옵은 미국, 일본, 동남아(싱가포르·태국·말레이시아), 유럽 시장 구글 광고 운영 경험을 보유하고 있습니다. 각 시장의 검색 의도 패턴, 경쟁 강도, 전환율 특성을 분석하여 국가별 맞춤 전략을 제공합니다.
            </p>
            <p style={{ marginTop: '1.5rem' }}>
              글로벌 진출을 계획 중이라면 먼저 어떤 국가에서 가장 높은 수익성을 기대할 수 있는지 데이터로 분석하는 것부터 시작해야 합니다.
            </p>
          </div>

          <div style={{ borderTop: '4px solid #000', paddingTop: '4rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '2rem' }}>글로벌 광고 전략 무료 컨설팅 신청</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <a href="https://open.kakao.com/o/srdaF2si" target="_blank" rel="noopener noreferrer" className="btn-brutal primary" style={{ fontSize: '1.8rem' }}>
                실시간 카카오톡 상담하기
              </a>
            </div>
            <p style={{ marginTop: '2rem', fontWeight: 700, color: '#666' }}>
              * 진출 희망 국가의 시장 분석과 광고 전략을 무료로 제안합니다.
            </p>
          </div>
        </section>
      </article>

      <Footer />
    </main>
  );
}
