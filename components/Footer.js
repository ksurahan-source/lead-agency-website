'use client';

import Link from 'next/link';

export default function Footer({ lang = 'ko' }) {
  const isKo = lang !== 'en';

  return (
    <footer style={{ padding: '6rem 2rem 4rem', borderTop: '4px solid var(--border-dark)', background: '#fff' }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
          <div>
            <div className="font-display" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{isKo ? '히옵' : 'HI-OB'}</div>
            <p style={{ fontWeight: 800, fontSize: '1.2rem', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
              {isKo
                ? '데이터 엔지니어링으로\n광고의 판을 바꿉니다.'
                : 'Engineering the most\nadvanced digital ads.'}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{isKo ? '서비스' : 'SERVICES'}</h4>
            <Link href="/tracking" style={{ fontWeight: 700, color: 'inherit', textDecoration: 'none' }}>{isKo ? '트래킹 완벽화' : 'Tracking Perfection'}</Link>
            <Link href="/lead-gen" style={{ fontWeight: 700, color: 'inherit', textDecoration: 'none' }}>{isKo ? '리드수집 웹사이트' : 'Lead Gen Website'}</Link>
            <Link href="/ecom-agency" style={{ fontWeight: 700, color: 'inherit', textDecoration: 'none' }}>{isKo ? '이커머스 마케팅 대행' : 'E-com Marketing'}</Link>
            <Link href="/package-1m" style={{ fontWeight: 700, color: 'inherit', textDecoration: 'none' }}>{isKo ? '100만원 패키지' : '1M KRW Package'}</Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{isKo ? '법적 고지' : 'LEGAL'}</h4>
            <Link href="/privacy" style={{ fontWeight: 900, color: 'var(--hiop-orange)', textDecoration: 'none' }}>
              {isKo ? '개인정보 처리방침' : 'Privacy Policy'}
            </Link>
            <Link href="/terms" style={{ fontWeight: 700, color: 'inherit', textDecoration: 'none' }}>
              {isKo ? '이용약관' : 'Terms of Use'}
            </Link>
          </div>
        </div>

        <div style={{ borderTop: '2px solid #eee', paddingTop: '3rem', fontSize: '0.9rem', color: '#666', lineHeight: 1.8 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', fontWeight: 600 }}>
            <span suppressHydrationWarning>{isKo ? '이메일' : 'Email'}: hiob4515@gmail.com</span>
            <span>{isKo ? '호스팅' : 'Hosting'}: Cloudflare</span>
          </div>
          <p style={{ marginTop: '2rem', fontWeight: 800, color: '#111' }}>
            © 2025 HI-OB DIGITAL. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
