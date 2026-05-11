'use client';

import Link from 'next/link';
import Footer from '../../../components/Footer';

export default function GoogleAnalyticsSetupAgencyPost() {
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
          <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--hiop-orange)', marginBottom: '2rem' }}>데이터 분석 | 2025.05.11</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1, marginBottom: '3rem', fontFamily: 'Black Han Sans, sans-serif' }}>
            GA4 연동 대행: 잘못된 데이터가 광고를 망치는 이유
          </h1>
          <p style={{ fontSize: '1.8rem', fontWeight: 700, lineHeight: 1.4, borderLeft: '10px solid var(--hiop-blue)', paddingLeft: '2rem' }}>
            GA4가 설치되어 있지만 전환 데이터가 정확하지 않다면, 구글 AI는 엉뚱한 유저를 학습하고 광고비는 낭비됩니다.
          </p>
        </header>

        <section style={{ fontSize: '1.2rem', lineHeight: 2, color: '#111', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>1. GA4 기본 설치로는 부족한 이유</h2>
            <p>
              구글 사이트킷이나 GTM으로 GA4 기본 코드를 설치하면 페이지뷰는 수집됩니다. 하지만 이커머스에 필요한 전자상거래 이벤트(view_item, add_to_cart, purchase)와 실제 결제금액은 별도로 구현해야 합니다.
            </p>
            <p style={{ marginTop: '1.5rem' }}>
              purchase 이벤트에 실제 결제금액이 전달되지 않으면, 구글 애즈의 tROAS 입찰은 작동하지 않습니다. 전환수만 카운트되고 가치가 0이면 구글 AI는 값비싼 상품을 구매하는 고가치 유저와 저가 상품 구매자를 구분할 수 없습니다.
            </p>
          </div>

          <div style={{ background: '#f4f4f0', padding: '3rem', border: '4px solid #000', boxShadow: '10px 10px 0 #000' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>2. 히옵의 GA4 연동 대행 서비스 범위</h2>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1.5rem' }}>
              {[
                ['GA4 전자상거래 이벤트 구현', 'view_item_list, view_item, add_to_cart, begin_checkout, purchase 전체 퍼널을 GTM으로 구현합니다. 실제 결제금액과 상품 데이터가 정확하게 전달됩니다.'],
                ['구글 애즈 전환 연동', 'GA4 전환 목표를 구글 애즈와 연동해 tROAS 입찰이 작동하는 기반을 만듭니다. 구글 전환 API로 서버사이드 전환도 보완합니다.'],
                ['맞춤 이벤트 설계', '리뷰 작성, 위시리스트 추가, 장바구니 이탈 등 비즈니스에 중요한 마이크로 전환 이벤트를 설계하고 구현합니다.'],
                ['대시보드 구성', 'GA4 탐색 보고서 또는 Looker Studio 대시보드로 채널별 ROAS, 상품별 매출 기여도를 실시간으로 확인합니다.'],
              ].map(([title, desc], i) => (
                <li key={i} style={{ padding: '1.5rem', background: '#fff', border: '2px solid #000' }}>
                  <div style={{ fontWeight: 900, fontSize: '1.3rem', color: 'var(--hiop-orange)', marginBottom: '0.5rem' }}>{title}</div>
                  <div>{desc}</div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>3. 플랫폼별 맞춤 구현 지원</h2>
            <p>
              카페24, 아임웹, 고도몰, Shopify 등 플랫폼마다 데이터레이어 구조가 다릅니다. 히옵은 플랫폼별 GA4 전자상거래 구현 경험을 보유하고 있어 국내 주요 쇼핑몰 플랫폼에서 정확한 이벤트 추적을 보장합니다.
            </p>
            <p style={{ marginTop: '1.5rem' }}>
              구현 완료 후에는 GA4 디버그뷰와 구글 태그 어시스턴트로 QA를 진행해 모든 이벤트가 정확하게 수집되는지 확인합니다.
            </p>
          </div>

          <div style={{ borderTop: '4px solid #000', paddingTop: '4rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '2rem' }}>GA4 연동 무료 진단 신청</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              <a href="https://open.kakao.com/o/srdaF2si" target="_blank" rel="noopener noreferrer" className="btn-brutal primary" style={{ fontSize: '1.8rem' }}>
                실시간 카카오톡 상담하기
              </a>
            </div>
            <p style={{ marginTop: '2rem', fontWeight: 700, color: '#666' }}>
              * 현재 GA4 전환 데이터 정확도를 무료로 진단합니다.
            </p>
          </div>
        </section>
      </article>

      <Footer />
    </main>
  );
}
