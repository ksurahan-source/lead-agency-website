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
        highlight: '계정 정지? 세팅 오류? 즉시 해결'
      },
      { 
        id: '1-2',
        icon: <Target size={24} />,
        label: '데이터 엔지니어링',
        title: '트래킹 완벽화', 
        desc: 'CAPI, 서버사이드 트래킹, GA4 통합 설치로 누락되는 데이터를 완벽히 복구합니다.', 
        price: '영구적 데이터 자산',
        href: '/tracking',
        highlight: '유실 데이터 40% 이상 복구'
      },
      { 
        id: '1-3',
        icon: <MousePointer2 size={24} />,
        label: '웹사이트 제작',
        title: '리드수집용 웹사이트', 
        desc: '전환에 최적화된 랜딩페이지 설계. 흩어지는 트래픽을 진짜 고객으로 바꿉니다.', 
        price: 'DB 수집 극대화',
        href: '/lead-gen',
        highlight: '문의량이 폭발하는 고전환 설계'
      },
    ]
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
        highlight: '릴스 지면 자동 최적화 솔루션'
      },
      { 
        id: '2-2',
        icon: <BarChart3 size={24} />,
        label: '마케팅 대행',
        title: '이커머스 퍼포먼스 대행', 
        desc: '데이터 기반의 정교한 타겟팅. 전문가가 내부 마케팅 팀장이 되어드립니다.', 
        price: '월 15만원 / 15%',
        href: '/ecom-agency',
        highlight: '오직 4~6개사 한정 집중 운영'
      },
    ]
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
        highlight: '초기 대표님을 위한 맞춤형 시작'
      },
    ]
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
        highlight: '탑티어 마케터의 세팅 시크릿'
      },
      { 
        id: '4-2',
        icon: <Download size={24} />,
        label: '무료 가이드',
        title: '이커머스 트래킹 가이드', 
        desc: '개발 지식 없어도 이해하는 이커머스 추적 체계 구축 가이드북.', 
        price: 'PDF 무료 배포',
        href: '/ecom-guide',
        highlight: '매출 누락 방지 핵심 리포트'
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
          <img src="/logo/hiop_horizontal_dark.svg" alt="히옵" style={{ height: '2.2rem', width: 'auto', maxWidth: '160px', display: 'block' }} />
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div style={{ fontWeight: 900, fontSize: '0.9rem', letterSpacing: '0.05em' }}>데이터 엔지니어링 마케팅</div>
          <Link href="/en" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'inherit', textDecoration: 'none', opacity: 0.5 }}>EN</Link>
        </div>
      </nav>

      {/* 히어로 */}
      <section style={{ padding: 'clamp(4rem, 12vw, 8rem) 1.2rem', backgroundColor: '#121212', color: '#fcfaf7', borderBottom: '4px solid #121212' }}>
        <div className="wrap">
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <h1 className="massive-text" style={{ color: '#fff' }}>
              광고를 돌리지 말고<br />
              <span style={{ color: 'var(--hiop-orange)' }}>엔지니어링</span> 하세요.
            </h1>
          </motion.div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4rem' }}>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ maxWidth: '650px', fontSize: 'clamp(1.1rem, 3vw, 1.6rem)', fontWeight: 700, textAlign: 'right', lineHeight: 1.5, opacity: 0.9 }}>
              단순한 대행이 아닙니다. 계정 트러블슈팅부터 데이터 트래킹, 고전환 웹사이트 제작까지 — 비즈니스의 막힌 혈을 뚫고 진짜 성과를 증명합니다.
            </motion.p>
          </div>
        </div>
      </section>

      {/* 마퀴 */}
      <div className="marquee-container" style={{ borderBottom: '4px solid #121212' }}>
        <div className="marquee-content" style={{ padding: '0.5rem 0' }}>
          데이터 엔지니어링 • CAPI 구축 • 퍼포먼스 마케팅 • 릴스 영상 제작 • 데이터 트래킹 완벽화 • 데이터 엔지니어링 • CAPI 구축 • 퍼포먼스 마케팅 • 릴스 영상 제작 • 데이터 트래킹 완벽화 •
        </div>
      </div>

      {/* 서비스 섹션 */}
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
            {cat.services.map((s, i) => (
              <Link key={s.id} href={s.href} style={{ textDecoration: 'none', color: 'inherit', borderRight: '4px solid #121212' }}>
                <motion.div 
                  className="brutalist-card"
                  style={{ border: 'none', boxShadow: 'none', height: '100%', borderRadius: 0 }}
                >
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
                </motion.div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* 리드 폼 */}
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
