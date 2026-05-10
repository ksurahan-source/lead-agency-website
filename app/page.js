'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Zap, Target, MousePointer2, Video, BarChart3, Package, BookOpen, Download } from 'lucide-react';
import Footer from '../components/Footer';
import LeadForm from '../components/LeadForm';

const serviceCategories = [
  {
    id: 'setup',
    title: '세팅 / 구축',
    subtitle: '한 번 해주는 일 : 단기 프로젝트',
    services: [
      { 
        id: '1-1',
        icon: <Zap size={24} />,
        label: '미끼 상품',
        title: '트러블슈팅 진단', 
        desc: '광고 계정 비활성화, 세팅 오류 등 꽉 막힌 광고의 숨통을 틔워드립니다.', 
        price: '최소 5만원 ~',
        href: 'https://open.kakao.com/o/srdaF2si',
        highlight: '계정 정지? 세팅 오류? 즉시 해결'
      },
      { 
        id: '1-2',
        icon: <Target size={24} />,
        label: '핵심 구축 1',
        title: '트래킹 완벽화', 
        desc: 'CAPI, 서버사이드, GA4 통합 설치로 누락되는 결제 데이터를 완벽히 복구합니다.', 
        price: '데이터 자산 구축',
        href: '/tracking',
        highlight: 'iOS 업데이트 이후 유실 데이터 40% 복구'
      },
      { 
        id: '1-3',
        icon: <MousePointer2 size={24} />,
        label: '핵심 구축 2',
        title: '리드수집 웹사이트', 
        desc: '전환에 미친 랜딩페이지 설계. 흩어지는 트래픽을 진짜 고객으로 바꿉니다.', 
        price: 'DB 수집 극대화',
        href: '/lead-gen',
        highlight: '이탈률 90%? 문의량 폭발 랜딩페이지'
      },
    ]
  },
  {
    id: 'operation',
    title: '운영 / 대행',
    subtitle: '계속 해주는 일 : 장기/구독형 프로젝트',
    services: [
      { 
        id: '2-1',
        icon: <Video size={24} />,
        label: '고급 운영',
        title: '영상 카탈로그', 
        desc: '제품 피드와 다이내믹 영상을 결합. 메타 머신러닝이 알아서 영상을 매칭합니다.', 
        price: 'ROAS 한계 돌파',
        href: '/video-catalog',
        highlight: '릴스 지면 자동 점유 솔루션'
      },
      { 
        id: '2-2',
        icon: <BarChart3 size={24} />,
        label: '메인 수익 모델',
        title: '이커머스 마케팅 대행', 
        desc: '데이터 엔지니어링 기반 정교한 타겟팅. 전문가가 내부 마케팅 팀장이 되어드립니다.', 
        price: '월 15만원 / 15%',
        href: '/ecom-agency',
        highlight: '오직 4~6개사 한정 집중 수용'
      },
    ]
  },
  {
    id: 'package',
    title: '패키지',
    subtitle: '강력한 진입 장벽 낮추기',
    services: [
      { 
        id: '3-1',
        icon: <Package size={24} />,
        label: '진입 훅',
        title: '50만원 스타터 패키지', 
        desc: '웹사이트 구축 + 릴스 제작 + 6일 광고 집행. 하이옵의 실력을 맛보는 특별 메뉴.', 
        price: '500,000원',
        href: '/package-1m',
        highlight: '시작이 막막한 초보 대표님 필독'
      },
    ]
  },
  {
    id: 'content',
    title: '콘텐츠',
    subtitle: '전문가 인사이트 공유',
    services: [
      { 
        id: '4-1',
        icon: <BookOpen size={24} />,
        label: '잠재 고객 유입',
        title: 'SEO 블로그', 
        desc: '현업 최전선의 딥다이브 인사이트. 당장 숫자를 바꿀 수 있는 실무 기술 공유.', 
        price: '인사이트 무료',
        href: '/blog',
        highlight: '탑티어 마케터의 세팅 시크릿'
      },
      { 
        id: '4-2',
        icon: <Download size={24} />,
        label: '이메일 DB 수집',
        title: '트래킹 가이드', 
        desc: '개발 지식 없어도 이해하는 이커머스 추적 체계 A to Z 가이드북.', 
        price: 'PDF 무료 다운로드',
        href: '/ecom-guide',
        highlight: '매출 누락 방어 시크릿 가이드'
      },
    ]
  }
];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <main className="bg-[#fcfaf7] min-h-screen text-[#121212]">
      {/* 네비게이션 */}
      <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid #121212', position: 'sticky', top: 0, backgroundColor: '#fcfaf7', zIndex: 100 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src="/logo/히옵_horizontal_dark.svg" alt="히옵" style={{ height: '2.2rem', width: 'auto', display: 'block' }} />
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div className="font-syne" style={{ fontWeight: 800, fontSize: '0.9rem', letterSpacing: '0.1em' }}>PERFORMANCE ENGINEERING</div>
          <Link href="/en" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'inherit', textDecoration: 'none', opacity: 0.5 }}>EN</Link>
        </div>
      </nav>

      {/* 히어로 */}
      <section style={{ padding: 'clamp(4rem, 12vw, 8rem) 1.2rem', backgroundColor: '#121212', color: '#fcfaf7', borderBottom: '4px solid #121212' }}>
        <div className="wrap">
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <h1 style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em' }}>
              광고를 돌리지 말고<br />
              <span style={{ color: 'var(--hiop-orange)' }}>엔지니어링</span> 하세요.
            </h1>
          </motion.div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4rem' }}>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ maxWidth: '650px', fontSize: 'clamp(1.2rem, 4vw, 1.8rem)', fontWeight: 700, textAlign: 'right', lineHeight: 1.4, opacity: 0.8 }}>
              단순한 대행이 아닙니다. 계정 트러블슈팅부터 데이터 트래킹, 고전환 웹사이트 제작까지 — 비즈니스의 막힌 혈을 뚫고 진짜 성과를 증명합니다.
            </motion.p>
          </div>
        </div>
      </section>

      {/* 마퀴 */}
      <div className="marquee-container" style={{ borderBottom: '4px solid #121212', backgroundColor: 'var(--hiop-orange)', color: '#121212' }}>
        <div className="marquee-content" style={{ padding: '1rem 0', fontWeight: 900, fontSize: '1.2rem' }}>
          DATA ENGINEERING • CAPI SETUP • PERFORMANCE MARKETING • REELS PRODUCTION • TRACKING PERFECTION • DATA ENGINEERING • CAPI SETUP • PERFORMANCE MARKETING • REELS PRODUCTION • TRACKING PERFECTION •
        </div>
      </div>

      {/* 서비스 섹션 */}
      {serviceCategories.map((cat, idx) => (
        <section key={cat.id} style={{ borderBottom: '4px solid #121212' }}>
          <div style={{ padding: '4rem 2rem', borderBottom: '4px solid #121212', backgroundColor: idx % 2 === 0 ? '#fff' : '#fcfaf7' }}>
            <div className="wrap">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem', flexWrap: 'wrap' }}>
                <div>
                  <h2 className="font-display" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, lineHeight: 1 }}>{cat.title}</h2>
                  <p style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '1rem', opacity: 0.6 }}>{cat.subtitle}</p>
                </div>
                <div style={{ padding: '0.5rem 1rem', border: '2px solid #121212', fontWeight: 900, fontSize: '0.9rem' }}>0{idx + 1}</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
            {cat.services.map((s, i) => (
              <Link key={s.id} href={s.href} style={{ textDecoration: 'none', color: 'inherit', borderRight: '4px solid #121212', borderBottom: i === cat.services.length - 1 ? 'none' : 'none' }}>
                <motion.div 
                  whileHover={{ backgroundColor: '#121212', color: '#fcfaf7' }} 
                  style={{ padding: '3.5rem 2rem', height: '100%', transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)', position: 'relative', overflow: 'hidden' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
                    <div style={{ padding: '1rem', border: '3px solid currentColor', display: 'inline-flex' }}>
                      {s.icon}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 900, letterSpacing: '0.1em', opacity: 0.5 }}>{s.label}</div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, marginTop: '0.3rem' }}>{s.price}</div>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1.1 }}>{s.title}</h3>
                  
                  <div style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'inline-block', padding: '0.3rem 0.8rem', backgroundColor: 'var(--hiop-orange)', color: '#121212', fontWeight: 900, fontSize: '0.85rem', marginBottom: '1rem' }}>
                      {s.highlight}
                    </div>
                    <p style={{ fontSize: '1.15rem', fontWeight: 600, lineHeight: 1.6, opacity: 0.8 }}>{s.desc}</p>
                  </div>

                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 900, fontSize: '1rem' }}>
                    자세히 보기 <ArrowUpRight size={20} strokeWidth={3} />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* 리드 폼 - 섹션 1-1로 연결되는 브릿지 */}
      <section id="contact" style={{ padding: '8rem 2rem', background: '#fff', borderBottom: '4px solid #121212' }}>
        <div className="wrap" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="font-display" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, marginBottom: '1.5rem' }}>내 광고의 숨통을 틔우세요.</h2>
            <p style={{ fontSize: '1.2rem', fontWeight: 700, opacity: 0.6 }}>증상만 말씀해 주시면, 전문가가 가장 확실한 돌파구를 제시합니다.</p>
          </div>
          <LeadForm source="home_overhaul" lang="ko" />
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        :root {
          --hiop-orange: #ff5f00;
          --hiop-blue: #0019ff;
          --hiop-green: #00ff5f;
          --border-dark: #121212;
        }
        @font-face {
          font-family: 'Black Han Sans';
          src: url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=swap');
        }
        .font-display {
          font-family: 'Syne', sans-serif;
        }
        .massive-text {
          font-size: clamp(3rem, 12vw, 10rem);
          font-weight: 900;
          line-height: 0.9;
          letter-spacing: -0.04em;
        }
        .massive-text-stroke {
          -webkit-text-stroke: 2px #121212;
          -webkit-text-fill-color: transparent;
        }
        .wrap {
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
        }
        .marquee-container {
          overflow: hidden;
          white-space: nowrap;
          width: 100%;
        }
        .marquee-content {
          display: inline-block;
          animation: marquee 30s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .brutalist-card {
          border: 4px solid #121212;
          padding: 2.5rem;
          background: #fff;
          box-shadow: 10px 10px 0 #121212;
          transition: all 0.2s;
        }
        .brutalist-card:hover {
          transform: translate(-4px, -4px);
          box-shadow: 14px 14px 0 #121212;
        }
      `}</style>
    </main>
  );
}
