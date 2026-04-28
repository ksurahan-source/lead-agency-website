import Link from 'next/link';

export const metadata = {
  title: 'HI-OP | 디지털 퍼포먼스 마케팅 포털',
  description: '히옵은 가장 최신 기술을 적용한 디지털 광고를 설계하여 고객에게 최대의 ROAS를 가져다 주는 것을 목표로 합니다.',
};

export default function PortalPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div className="wrap" style={{ textAlign: 'center' }}>
        <img src="/images/logo.png" alt="HI-OP Logo" style={{ width: '180px', margin: '0 auto 2rem', display: 'block', borderRadius: '16px' }} />
        
        <h1 className="hero-h1 fade-up">
          가장 진보된 형태의<br />
          <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #ff4500, #ff8c00)', WebkitBackgroundClip: 'text', color: 'transparent' }}>디지털 퍼포먼스 마케팅</span>
        </h1>
        
        <p className="hero-sub fade-up delay-1" style={{ maxWidth: '600px', margin: '0 auto 3rem' }}>
          히옵(HI-OP)은 가장 최신 기술을 적용한 디지털 광고를 설계하여 
          고객에게 <strong>최대의 ROAS</strong>를 가져다 주는 것을 목표로 합니다.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', width: '100%', maxWidth: '1000px', margin: '0 auto' }} className="fade-up delay-2">
          
          {/* Meta */}
          <Link href="/meta" style={{ textDecoration: 'none' }}>
            <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'all 0.3s', border: '1px solid #1877F240' }}>
              <div style={{ fontSize: '3rem', color: '#1877F2', marginBottom: '1rem', fontWeight: 'bold' }}>M</div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#fff' }}>Meta Ads</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                정밀한 타겟팅과 CAPI 연동을 통한 페이스북/인스타그램 광고 최적화 솔루션.
              </p>
              <div style={{ color: '#1877F2', fontWeight: '600', fontSize: '0.9rem' }}>알아보기 →</div>
            </div>
          </Link>

          {/* Google */}
          <Link href="/google" style={{ textDecoration: 'none' }}>
            <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'all 0.3s', border: '1px solid #EA433540' }}>
              <div style={{ fontSize: '3rem', color: '#EA4335', marginBottom: '1rem', fontWeight: 'bold' }}>G</div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#fff' }}>Google Ads</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                검색 의도 분석 및 머신러닝 기반 스마트 캠페인을 활용한 구글 광고.
              </p>
              <div style={{ color: '#EA4335', fontWeight: '600', fontSize: '0.9rem' }}>알아보기 →</div>
            </div>
          </Link>

          {/* TikTok & Moloco */}
          <Link href="/tiktok-moloco" style={{ textDecoration: 'none' }}>
            <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'all 0.3s', border: '1px solid #00f2fe40' }}>
              <div style={{ fontSize: '3rem', color: '#00f2fe', marginBottom: '1rem', fontWeight: 'bold' }}>T&M</div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#fff' }}>TikTok & Moloco</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                글로벌 숏폼 틱톡과 머신러닝 기반 RTB 몰로코 광고 최적화.
              </p>
              <div style={{ color: '#00f2fe', fontWeight: '600', fontSize: '0.9rem' }}>알아보기 →</div>
            </div>
          </Link>

        </div>
      </div>
    </main>
  );
}
