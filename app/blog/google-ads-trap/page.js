'use client';

import Link from 'next/link';
import Footer from '../../../components/Footer';

export default function BlogPost2() {
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
          <div style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--hiop-orange)', marginBottom: '2rem' }}>구글 광고 | 2025.05.09</div>
          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', lineHeight: 1.1, marginBottom: '3rem', fontFamily: 'Pretendard Variable, Pretendard, Noto Sans KR, sans-serif' }}>
            구글 광고의 함정: 스마트 캠페인이 당신의 예산을 갉아먹고 있다
          </h1>
          <p style={{ fontSize: '1.8rem', fontWeight: 700, lineHeight: 1.4, borderLeft: '10px solid var(--hiop-green)', paddingLeft: '2rem' }}>
            편리함 뒤에 숨겨진 블랙박스. 데이터 주도권이 없는 마케팅은 결국 구글의 배만 불려줄 뿐입니다.
          </p>
        </header>

        <section style={{ fontSize: '1.2rem', lineHeight: 2, color: '#111', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>1. &lsquo;스마트&rsquo;라는 단어에 속지 마세요</h2>
            <p>
              구글 광고의 &lsquo;스마트 캠페인&rsquo;이나 &lsquo;실적 최대화(PMax) 캠페인&rsquo;은 광고주에게 매우 매력적으로 다가옵니다. 키워드를 고를 필요도 없고, 입찰가를 조정할 필요도 없습니다. 구글의 인공지능이 알아서 최적의 사용자에게 광고를 보여준다고 말하죠.
            </p>
            <p style={{ marginTop: '1.5rem' }}>
              하지만 &lsquo;알아서&rsquo;라는 말은 곧 &lsquo;광고주가 통제할 수 없다&rsquo;는 뜻이기도 합니다. 어떤 키워드에서 전환이 났는지, 어떤 지면에서 돈이 샜는지 투명하게 공개되지 않습니다. 특히 브랜드 키워드(자사명)에 광고비를 낭비하며 &lsquo;가짜 전환&rsquo;을 만들어내는 경우가 허다합니다.
            </p>
          </div>

          <div style={{ background: '#f4f4f0', padding: '3rem', border: '4px solid #000', boxShadow: '10px 10px 0 #000' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>2. 데이터 오염과 최적화의 실패</h2>
            <p>
              구글 인공지능이 가장 잘 작동하려면 &lsquo;깨끗한 데이터&rsquo;가 필요합니다. 만약 웹사이트 추적이 엉망이라서 단순 페이지 방문을 구매로 집계하고 있다면, 구글 인공지능은 계속해서 &lsquo;구경만 하는 사람&rsquo;들을 찾아 광고비를 씁니다.
            </p>
            <p style={{ marginTop: '1.5rem' }}>
              히옵은 이 블랙박스를 해체합니다. 어떤 검색어가 실질적인 매출을 만드는지 분석하고, 가치가 낮은 지면은 철저히 배제하는 엔지니어링 기반 최적화를 수행합니다.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>3. 해결책: 데이터 주도권을 되찾는 마케팅</h2>
            <p>
              성공적인 구글 광고를 위해서는 인공지능에게 모든 것을 맡기는 대신, 인공지능이 올바른 방향으로 달릴 수 있도록 가이드라인을 직접 설계해야 합니다.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '2rem', display: 'grid', gap: '1rem' }}>
              <li style={{ fontWeight: 800, fontSize: '1.4rem' }}>✓ 제외 키워드의 철저한 관리로 예산 누수 차단</li>
              <li style={{ fontWeight: 800, fontSize: '1.4rem' }}>✓ 타겟 오디언스의 세밀한 데이터 매핑</li>
              <li style={{ fontWeight: 800, fontSize: '1.4rem' }}>✓ 자사몰 데이터와 실시간 연동 (GTM / GA4)</li>
            </ul>
          </div>

          <div style={{ borderTop: '4px solid #000', paddingTop: '4rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '2rem' }}>지금 내 구글 광고 계정, 안전한가요?</h3>
            <a href="https://open.kakao.com/o/srdaF2si" target="_blank" rel="noopener noreferrer" className="btn-brutal primary" style={{ fontSize: '1.8rem', background: 'var(--hiop-green)', color: '#000' }}>
              무료 계정 진단 신청하고 낭비 예산 찾기 →
            </a>
          </div>
        </section>
      </article>

      <Footer />
    </main>
  );
}
