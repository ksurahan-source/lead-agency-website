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
        label: '트러블슈팅',
        title: '계정 및 세팅 진단',
        desc: '광고 계정 비활성화, 세팅 오류 등 꽉 막힌 광고의 원인을 찾아 숨통을 틔워드립니다.',
        price: '5만원부터',
        href: 'https://open.kakao.com/o/srdaF2si',
        highlight: '계정 정지? 세팅 오류? 즉시 해결',
      },
      {
        id: '1-2',
        icon: <Target size={24} />,
        label: '데이터 엔지니어링',
        title: '트래킹 완벽화',
        desc: 'CAPI, 서버사이드 트래킹, GA4 통합 설치로 누락되는 데이터를 완벽히 복구합니다.',
        price: '영구적 데이터 자산',
        href: '/tracking',
        highlight: '유실 데이터 40% 이상 복구',
      },
      {
        id: '1-3',
        icon: <MousePointer2 size={24} />,
        label: '웹사이트 제작',
        title: '리드수집용 웹사이트',
        desc: '전환에 최적화된 랜딩페이지 설계. 흩어지는 트래픽을 진짜 고객으로 바꿉니다.',
        price: 'DB 수집 극대화',
        href: '/lead-gen',
        highlight: '문의량이 폭발하는 고전환 설계',
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
        label: '다이내믹 소재',
        title: '영상 카탈로그',
        desc: '제품 피드와 영상을 결합하여 메타 머신러닝이 알아서 최적의 소재를 송출합니다.',
        price: 'ROAS 한계 돌파',
        href: '/video-catalog',
        highlight: '릴스 지면 자동 최적화 솔루션',
      },
      {
        id: '2-2',
        icon: <BarChart3 size={24} />,
        label: '마케팅 대행',
        title: '이커머스 퍼포먼스 대행',
        desc: '데이터 기반의 정교한 타겟팅. 전문가가 내부 마케팅 팀장이 되어드립니다.',
        price: '월 15만원 / 15%',
        href: '/ecom-agency',
        highlight: '오직 4~6개사 한정 집중 운영',
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
        title: '50만원 시작 패키지',
        desc: '웹사이트 구축 + 릴스 제작 + 6일 광고 집행. 히옵의 실력을 직접 확인하세요.',
        price: '500,000원',
        href: '/package-1m',
        highlight: '초기 대표님을 위한 맞춤형 시작',
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
        title: '마케팅 인사이트',
        desc: '현업 최전선의 실무 기술 공유. 당장 숫자를 바꿀 수 있는 팁을 전해드립니다.',
        price: '무료 공개',
        href: '/blog',
        highlight: '탑티어 마케터의 세팅 시크릿',
      },
      {
        id: '4-2',
        icon: <Download size={24} />,
        label: '무료 가이드',
        title: '이커머스 트래킹 가이드',
        desc: '개발 지식 없어도 이해하는 이커머스 추적 체계 구축 가이드북.',
        price: 'PDF 무료 배포',
        href: '/ecom-guide',
        highlight: '매출 누락 방지 핵심 리포트',
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
          <div style={{ fontWeight: 900, fontSize: '0.9rem', letterSpacing: '0.05em' }}>데이터 엔지니어링 마케팅</div>
          <Link href="/en" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'inherit', textDecoration: 'none', opacity: 0.5 }}>EN</Link>
        </div>
      </nav>

      <HeroAnimated />

      <div className="marquee-container" style={{ borderBottom: '4px solid #121212' }}>
        <div className="marquee-content" style={{ padding: '0.5rem 0' }}>
          데이터 엔지니어링 • CAPI 구축 • 퍼포먼스 마케팅 • 릴스 영상 제작 • 데이터 트래킹 완벽화 • 데이터 엔지니어링 • CAPI 구축 • 퍼포먼스 마케팅 • 릴스 영상 제작 • 데이터 트래킹 완벽화 •
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
                quote: '데이터 구조를 바꾸니 ROAS가 바뀌었습니다. 픽셀 설정이 구매 완료가 아닌 장바구니 추가로 잡혀있었고, CAPI 연동 3주 만에 구매 전환 데이터가 40% 이상 늘었습니다.',
                result: 'ROAS 2.0 → 3.4',
                name: '김민준',
                role: '마케팅 팀장',
                co: '라이프스타일 이커머스',
                spend: '월 광고비 3,500만원',
              },
              {
                quote: '구글 PMax만 돌렸는데 계속 정체됐어요. GA4 전자상거래 추적부터 다시 깔고 검색 캠페인을 분리해줬습니다. 이제 PMax + 검색 투트랙으로 안정적으로 돌아갑니다.',
                result: '구글 ROAS 2.1 → 4.6',
                name: '이수연',
                role: '대표이사',
                co: '뷰티 D2C 쇼핑몰',
                spend: '월 광고비 2,800만원',
              },
              {
                quote: '실제 구매의 38%가 추적이 안 되고 있었습니다. 서버사이드 트래킹 구축 후 메타 픽셀 매칭 점수가 5.4→7.9로 올랐고, 같은 예산으로 구매가 300건→470건이 됐습니다.',
                result: '전환수 +57%',
                name: '박성호',
                role: '이커머스 사업부장',
                co: '패션 브랜드',
                spend: '월 광고비 6,000만원',
              },
              {
                quote: '이전 대행사는 항상 소재가 문제라고 했어요. 히옵은 첫 미팅부터 어느 채널 어느 세그먼트의 LTV가 높은지 보여줬습니다. 광고비 20% 줄이고 매출은 15% 늘었습니다.',
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
              { step: '01', title: '통증 인식', desc: '현재 ROAS가 왜 안 오르는지 무료 진단으로 먼저 확인합니다. 숫자로 문제를 보여줍니다.' },
              { step: '02', title: '증거 제시', desc: '같은 버티컬, 같은 규모 클라이언트의 수치를 구체적으로 공유합니다.' },
              { step: '03', title: '리스크 제거', desc: '데이터 인프라 구축 → 성과 확인 후 대행 운영. 단계별로 진입해 부담을 낮춥니다.' },
              { step: '04', title: '행동 유도', desc: '지금 사라지는 전환 데이터를 복구하면 현재 광고비에서 즉시 매출이 올라갑니다.' },
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
            <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '1.5rem' }}>내 광고의 숨통을 틔우세요.</h2>
            <p style={{ fontSize: '1.1rem', fontWeight: 700, opacity: 0.6 }}>증상만 말씀해 주시면, 전문가가 가장 확실한 돌파구를 제시합니다.</p>
          </div>
          <LeadForm source="home_overhaul_v2" lang="ko" />
        </div>
      </section>

      <Footer />
    </main>
  );
}
