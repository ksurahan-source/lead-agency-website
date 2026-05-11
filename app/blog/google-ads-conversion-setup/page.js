'use client';

import Link from 'next/link';
import Footer from '../../../components/Footer';

export default function GoogleAdsConversionSetupPost() {
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
          <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--hiop-orange)', marginBottom: '2rem' }}>구글 애즈 | 2025.05.11</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1, marginBottom: '3rem', fontFamily: 'Black Han Sans, sans-serif' }}>
            구글 애즈 전환 설정, 이 3가지가 틀리면 광고비 전부 낭비입니다
          </h1>
          <p style={{ fontSize: '1.8rem', fontWeight: 700, lineHeight: 1.4, borderLeft: '10px solid var(--hiop-blue)', paddingLeft: '2rem' }}>
            "전환이 기록되는데 왜 매출은 안 오를까요?" 구글 애즈 전환 설정의 함정과 올바른 세팅법을 공개합니다.
          </p>
        </header>

        <section style={{ fontSize: '1.2rem', lineHeight: 2, color: '#111', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>1. 전환 설정의 함정: '전환수'와 '전환 가치'는 다릅니다</h2>
            <p>
              많은 광고주가 전환 설정을 하고 있지만, 대부분 전환수(Conversion Count)만 추적합니다. 구글 애즈의 AI 입찰 알고리즘(스마트 입찰)은 전환 가치(Conversion Value)까지 학습해야 제대로 작동합니다. 단순히 "구매 완료" 이벤트만 연결하면 10만 원짜리 상품과 100만 원짜리 상품을 동일한 가치로 학습합니다.
            </p>
            <p style={{ marginTop: '1.5rem' }}>
              이것이 구글 광고 수익률 ROAS가 개선되지 않는 가장 흔한 원인입니다. 광고 시스템은 열심히 최적화하고 있지만, 잘못된 데이터를 기준으로 학습하는 것이죠.
            </p>
          </div>

          <div style={{ background: '#f4f4f0', padding: '3rem', border: '4px solid #000', boxShadow: '10px 10px 0 #000' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>2. 히옵의 해결 방식: 전환 가치 기반 입찰 구조 설계</h2>
            <p>
              히옵은 구글 애즈 전환 설정 시 단순 이벤트 연결을 넘어, 비즈니스 가치와 직결되는 전환 구조를 설계합니다.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '2rem', display: 'grid', gap: '1rem' }}>
              <li style={{ fontWeight: 800, fontSize: '1.3rem' }}>• 동적 전환 가치(Dynamic Conversion Value) 연동: 실제 결제 금액을 구글 애즈에 전달</li>
              <li style={{ fontWeight: 800, fontSize: '1.3rem' }}>• 마이크로 전환 설계: 장바구니 담기, 결제 시작 등 단계별 전환 깔때기 구성</li>
              <li style={{ fontWeight: 800, fontSize: '1.3rem' }}>• tROAS 입찰 최적화: 학습 완료 기준 충족을 위한 전환 데이터 축적 전략</li>
              <li style={{ fontWeight: 800, fontSize: '1.3rem' }}>• GTM 기반 태그 검증: 전환 누락 여부를 실시간으로 QA</li>
            </ul>
          </div>

          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>3. 기대 효과: 학습 속도 2배, ROAS 개선 즉각 체감</h2>
            <p>
              올바른 구글 애즈 전환 설정은 구글 AI의 학습 속도를 결정합니다. 전환 가치 데이터가 정확하게 유입되면 스마트 입찰 알고리즘이 고가치 유저를 정확히 타겟팅하기 시작합니다.
            </p>
            <p style={{ marginTop: '1.5rem' }}>
              히옵 컨설팅 후 평균 3~4주 내 tROAS 입찰 학습이 완료되며, 광고 효율이 눈에 띄게 개선됩니다. 데이터 드리븐 마케팅의 핵심은 올바른 전환 설정에서 시작합니다.
            </p>
          </div>

          <div style={{ background: '#fff', border: '4px solid #000', padding: '3rem' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>구글 애즈 전환 설정 자가 진단 체크리스트</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1rem' }}>
              {['✅ 전환 가치(실제 결제금액)가 구글 애즈에 전달되고 있는가?', '✅ 동일 거래 중복 전환을 막는 설정이 되어 있는가?', '✅ 주요 전환 vs 보조 전환 구분이 명확한가?', '✅ 전환 추적 기간이 비즈니스 구매 주기와 맞는가?', '✅ GA4 연동 전환과 구글 태그 전환 중복은 없는가?'].map((item, i) => (
                <li key={i} style={{ fontWeight: 700, fontSize: '1.2rem', padding: '1rem', background: '#f4f4f0', borderLeft: '6px solid var(--hiop-orange)' }}>{item}</li>
              ))}
            </ul>
          </div>

          <div style={{ borderTop: '4px solid #000', paddingTop: '4rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '2rem' }}>전환 설정 무료 진단을 받아보세요</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <a href="https://open.kakao.com/o/srdaF2si" target="_blank" rel="noopener noreferrer" className="btn-brutal primary" style={{ fontSize: '1.8rem' }}>
                실시간 카카오톡 상담하기
              </a>
            </div>
            <p style={{ marginTop: '2rem', fontWeight: 700, color: '#666' }}>
              * 현재 구글 애즈 전환 설정의 오류 여부를 무료로 진단해 드립니다.
            </p>
          </div>
        </section>
      </article>

      <Footer />
    </main>
  );
}
