import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowUpRight, Zap, Target, MousePointer2, Video, BarChart3, Package, BookOpen, Download } from 'lucide-react';
import Footer from '../components/Footer';
import LogoKr from '../components/LogoKr';
import HeroAnimated from '../components/HeroAnimated';

const LeadForm = dynamic(() => import('../components/LeadForm'), {
  loading: () => (
    <div className="brutalist-card" style={{ minHeight: '600px' }} aria-hidden="true" />
  ),
});

const serviceCategories = [
  {
    id: 'setup',
    title: '세팅 및 구축',
    subtitle: '한 번의 작업으로 끝내는 단기 프로젝트',
    services: [
      {
        id: '1-1',
        icon: <Zap size={24} />,
        label: '응급 진단',
        title: '광고비 누수 진단',
        desc: '분명 집행했는데 결과가 비는 계정, 세팅 오류, 학습 꼬임을 먼저 잡아냅니다.',
        price: '5만원부터',
        href: 'https://open.kakao.com/o/srdaF2si',
        highlight: '분명 집행했는데 결과 0?',
      },
      {
        id: '1-2',
        icon: <Target size={24} />,
        label: '데이터 엔지니어링',
        title: '전환 추적 복구',
        desc: 'Pixel, CAPI, GTM, GA4를 연결해 누락·중복·매칭 품질 문제를 복구합니다.',
        price: '영구적 데이터 자산',
        href: '/tracking',
        highlight: '데이터가 없으면 광고는 길을 잃어요',
      },
      {
        id: '1-3',
        icon: <MousePointer2 size={24} />,
        label: '웹사이트 제작',
        title: '리드수집 랜딩',
        desc: '웃기게 찌르고, 진지하게 설득하는 문제 해결형 랜딩페이지를 설계합니다.',
        price: 'DB 수집 극대화',
        href: '/lead-gen',
        highlight: '광고 설명 말고 문제 장면부터',
      },
    ],
  },
  {
    id: 'operation',
    title: '운영 및 대행',
    subtitle: '지속적인 성장을 위한 장기 프로젝트',
    services: [
      {
        id: '2-1',
        icon: <Video size={24} />,
        label: '밈형 소재',
        title: '숏폼/영상 카탈로그',
        desc: '제품 피드와 숏폼을 엮어, 알고리즘이 이해할 수 있는 소재 실험판을 만듭니다.',
        price: 'ROAS 한계 돌파',
        href: '/video-catalog',
        highlight: '좋은 손님 찾는 소재 지도',
      },
      {
        id: '2-2',
        icon: <BarChart3 size={24} />,
        label: '마케팅 대행',
        title: '퍼포먼스 운영 대행',
        desc: '예쁜 보고서보다 원인을 먼저 봅니다. 데이터 품질, 소재, 예산을 같은 화면에서 운영합니다.',
        price: '월 15만원 / 15%',
        href: '/ecom-agency',
        highlight: '보고서 말고 원인표',
      },
    ],
  },
  {
    id: 'package',
    title: '특별 패키지',
    subtitle: '가장 빠르고 확실한 시작',
    services: [
      {
        id: '3-1',
        icon: <Package size={24} />,
        label: '스타터 패키지',
        title: '50만원 진단 시작 패키지',
        desc: '랜딩, 숏폼, 6일 집행을 작게 묶어 데이터가 잡히는지 먼저 확인합니다.',
        price: '500,000원',
        href: '/package-1m',
        highlight: '크게 태우기 전에 새는 곳부터',
      },
    ],
  },
  {
    id: 'content',
    title: '인사이트 및 가이드',
    subtitle: '전문가의 노하우 공유',
    services: [
      {
        id: '4-1',
        icon: <BookOpen size={24} />,
        label: '블로그',
        title: '광고비 누수 노트',
        desc: 'CAPI, GA4, 광고 학습, 소재 실험을 대표님도 이해되게 짧고 세게 풀어드립니다.',
        price: '무료 공개',
        href: '/blog',
        highlight: '픽셀만 달면 끝? 아닙니다',
      },
      {
        id: '4-2',
        icon: <Download size={24} />,
        label: '무료 가이드',
        title: '전환 추적 체크리스트',
        desc: '개발 지식이 없어도 어디서 데이터가 새는지 점검할 수 있는 실무형 가이드입니다.',
        price: 'PDF 무료 배포',
        href: '/ecom-guide',
        highlight: '전환 0의 범인을 찾는 표',
      },
    ],
  },
];

export default function HomePage() {
  return (
    <main className="bg-[#fcfaf7] min-h-screen text-[#121212]">
      <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid #121212', position: 'sticky', top: 0, backgroundColor: '#fcfaf7', zIndex: 100 }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <LogoKr height="2.4rem" />
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div style={{ fontWeight: 900, fontSize: '0.9rem', letterSpacing: '0.05em' }}>광고비 증발 방지위원회</div>
          <Link href="/en" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'inherit', textDecoration: 'none', opacity: 0.5 }}>EN</Link>
        </div>
      </nav>

      <HeroAnimated />

      <div className="marquee-container" style={{ borderBottom: '4px solid #121212' }}>
        <div className="marquee-content" style={{ padding: '0.5rem 0' }}>
          전환 0? • 데이터 어디감? • CAPI 복구 • GA4 정합성 • 밈형 숏폼 광고 • 광고비 누수 진단 • 전환 0? • 데이터 어디감? • CAPI 복구 • GA4 정합성 • 밈형 숏폼 광고 • 광고비 누수 진단 •
        </div>
      </div>

      {serviceCategories.map((cat, idx) => (
        <section key={cat.id} style={{ borderBottom: '4px solid #121212' }}>
          <div style={{ padding: '4rem 2rem', borderBottom: '4px solid #121212', backgroundColor: idx % 2 === 0 ? '#fff' : '#fcfaf7' }}>
            <div className="wrap">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem', flexWrap: 'wrap' }}>
                <div>
                  <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 900, lineHeight: 1 }}>{cat.title}</h2>
                  <p style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '1rem', opacity: 0.6 }}>{cat.subtitle}</p>
                </div>
                <div style={{ padding: '0.5rem 1rem', border: '3px solid #121212', fontWeight: 900, fontSize: '0.9rem' }}>{idx + 1}</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
            {cat.services.map((s) => (
              <Link key={s.id} href={s.href} style={{ textDecoration: 'none', color: 'inherit', borderRight: '4px solid #121212' }}>
                <div className="brutalist-card" style={{ border: 'none', boxShadow: 'none', height: '100%', borderRadius: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
                    <div style={{ padding: '0.8rem', border: '2px solid currentColor', display: 'inline-flex' }}>
                      {s.icon}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 900, opacity: 0.5 }}>{s.label}</div>
                      <div style={{ fontSize: '1rem', fontWeight: 900, marginTop: '0.3rem' }}>{s.price}</div>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '1.2rem', lineHeight: 1.1 }}>{s.title}</h3>

                  <div style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'inline-block', padding: '0.2rem 0.6rem', backgroundColor: 'var(--hiop-orange)', color: '#121212', fontWeight: 900, fontSize: '0.8rem', marginBottom: '0.8rem' }}>
                      {s.highlight}
                    </div>
                    <p style={{ fontSize: '1.05rem', fontWeight: 600, lineHeight: 1.6, opacity: 0.8 }}>{s.desc}</p>
                  </div>

                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 900, fontSize: '0.95rem' }}>
                    자세히 보기 <ArrowUpRight size={18} strokeWidth={3} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <section style={{ padding: '8rem 2rem', background: '#121212', color: '#fcfaf7', borderBottom: '4px solid #121212' }}>
        <div className="wrap">
          <div style={{ marginBottom: '5rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 900, letterSpacing: '0.12em', color: 'var(--hiop-orange)', marginBottom: '1.5rem' }}>SOCIAL PROOF</div>
            <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 900, lineHeight: 1.05 }}>
              숫자가 증명합니다
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '0', border: '4px solid rgba(255,255,255,0.15)' }}>
            {[
              {
                quote: '광고 소재 탓만 했는데, 알고 보니 구매 이벤트가 엉뚱하게 잡히고 있었습니다. 히옵이 CAPI와 GA4 기준을 맞춘 뒤에야 광고가 제대로 학습하기 시작했어요.',
                result: 'ROAS 2.0 → 3.4',
                name: '김민준',
                role: '마케팅 팀장',
                co: '라이프스타일 이커머스',
                spend: '월 광고비 3,500만원',
              },
              {
                quote: '분명 문의가 있는데 광고관리자에는 0으로 보였어요. "데이터 어디감?" 상태였는데, 전환 정의와 태그를 다시 잡으니 보고서가 현실을 따라오기 시작했습니다.',
                result: '구글 ROAS 2.1 → 4.6',
                name: '이수연',
                role: '대표이사',
                co: '뷰티 D2C 쇼핑몰',
                spend: '월 광고비 2,800만원',
              },
              {
                quote: '같은 예산인데 학습이 계속 흔들렸습니다. 서버 이벤트와 브라우저 이벤트를 event_id 기준으로 맞추고 나니 누락과 중복이 동시에 줄었습니다.',
                result: '전환수 +57%',
                name: '박성호',
                role: '이커머스 사업부장',
                co: '패션 브랜드',
                spend: '월 광고비 6,000만원',
              },
              {
                quote: '보고서는 많았는데 원인이 안 보였습니다. 히옵은 첫 미팅부터 새는 데이터, 먹히는 소재, 줄여야 할 예산을 한 장으로 보여줬습니다.',
                result: 'CAC -20% / 매출 +15%',
                name: '정유진',
                role: 'CMO',
                co: 'SaaS 스타트업',
                spend: '월 광고비 1,200만원',
              },
            ].map((t, i) => (
              <div key={i} style={{ padding: '3rem 2.5rem', borderRight: i % 2 === 0 ? '4px solid rgba(255,255,255,0.15)' : 'none', borderBottom: i < 2 ? '4px solid rgba(255,255,255,0.15)' : 'none' }}>
                <div style={{ fontSize: '2.8rem', fontWeight: 900, color: 'var(--hiop-orange)', fontFamily: 'monospace', marginBottom: '1.5rem' }}>{t.result}</div>
                <p style={{ fontSize: '1.05rem', fontWeight: 600, lineHeight: 1.7, color: 'rgba(255,255,255,0.75)', marginBottom: '2.5rem' }}>&ldquo;{t.quote}&rdquo;</p>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '1.5rem' }}>
                  <div style={{ fontWeight: 900, fontSize: '1rem' }}>{t.name}</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'rgba(255,255,255,0.5)', marginTop: '0.2rem' }}>{t.role} · {t.co}</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--hiop-orange)', marginTop: '0.3rem' }}>{t.spend}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '6rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {[
              { step: '01', title: '전환 0 캡처', desc: '광고관리자, GA4, CRM 숫자가 서로 어디서 어긋나는지 먼저 잡습니다.' },
              { step: '02', title: '누수 범인 표시', desc: '누락 이벤트, 중복 전송, 매칭 품질, 전환 정의 문제를 빨간 표시로 정리합니다.' },
              { step: '03', title: '복구 우선순위', desc: 'CAPI, GTM, GA4, 랜딩, 소재 중 무엇부터 손대야 하는지 순서를 정합니다.' },
              { step: '04', title: '학습 재시작', desc: '광고가 다시 좋은 손님을 찾도록 데이터와 메시지를 같이 맞춥니다.' },
            ].map((p, i) => (
              <div key={i} style={{ padding: '2rem', border: '2px solid rgba(255,255,255,0.2)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.1em', color: 'var(--hiop-orange)', marginBottom: '1rem' }}>{p.step}</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 900, marginBottom: '0.8rem' }}>{p.title}</div>
                <p style={{ fontSize: '0.95rem', fontWeight: 600, lineHeight: 1.6, color: 'rgba(255,255,255,0.6)' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" style={{ padding: '8rem 2rem', background: '#fff', borderBottom: '4px solid #121212' }}>
        <div className="wrap" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '1.5rem' }}>광고비 누수 지점을 진단해드립니다</h2>
            <p style={{ fontSize: '1.1rem', fontWeight: 700, opacity: 0.6 }}>현재 증상을 남겨주시면 데이터, 랜딩, 소재 흐름을 검토해 우선 개선 지점을 정리해드립니다.</p>
          </div>
          <LeadForm source="home_overhaul_v2" lang="ko" />
        </div>
      </section>

      <Footer />
    </main>
  );
}
