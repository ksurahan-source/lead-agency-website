'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function PortalPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="bg-light min-h-screen">
      {/* Navigation */}
      <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', borderBottom: '4px solid var(--border-dark)' }}>
        <div className="font-display" style={{ fontSize: '2.5rem', lineHeight: 1 }}>HI-OP</div>
        <div className="font-syne" style={{ fontWeight: 800, textTransform: 'uppercase' }}>MAXIMUM ROAS</div>
      </nav>

      {/* Hero Section */}
      <section style={{ padding: 'clamp(2rem, 8vw, 4rem) 1.2rem', position: 'relative', overflow: 'hidden' }}>
        <motion.h1 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="massive-text"
        >
          데이터 기반
        </motion.h1>
        <motion.h1 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="massive-text massive-text-stroke"
        >
          퍼포먼스 마케팅
        </motion.h1>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ maxWidth: '600px', fontSize: 'clamp(1.1rem, 4vw, 1.6rem)', fontWeight: 700, textAlign: 'right', lineHeight: 1.4 }}
          >
            히옵(HI-OP)은 가장 최신 기술을 적용한 디지털 광고를 설계하여 고객에게 <span style={{ color: 'var(--hiop-orange)' }}>최대의 ROAS</span>를 가져다 주는 것을 목표로 합니다.
          </motion.p>
        </div>
      </section>

      {/* Marquee */}
      <div className="marquee-container" style={{ marginTop: '4rem' }}>
        <div className="marquee-content">
          MAXIMUM ROAS • 히옵 컨설팅 • META ADS • GOOGLE ADS • TIKTOK & MOLOCO • MAXIMUM ROAS • 히옵 컨설팅 • META ADS • GOOGLE ADS • TIKTOK & MOLOCO •
        </div>
      </div>

      {/* Services Grid */}
      <section className="grid-half">
        <Link href="/meta" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
          <motion.div 
            whileHover={{ backgroundColor: 'var(--hiop-blue)', color: '#fff' }}
            style={{ height: '100%', padding: '4rem 2rem', transition: 'background-color 0.3s' }}
          >
            <div style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '2rem' }}>01 / META</div>
            <h2 className="massive-text" style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}>메타<br/>광고</h2>
            <p style={{ marginTop: '2rem', fontSize: '1.3rem', fontWeight: 700 }}>정밀한 타겟팅과 CAPI 연동을 통한 성과 최적화 솔루션.</p>
            <div style={{ marginTop: '3rem' }}>
              <ArrowUpRight size={56} strokeWidth={4} />
            </div>
          </motion.div>
        </Link>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Link href="/google" style={{ textDecoration: 'none', color: 'inherit', flex: 1, borderBottom: '4px solid var(--border-dark)' }}>
            <motion.div 
              whileHover={{ backgroundColor: 'var(--hiop-orange)', color: '#111' }}
              style={{ height: '100%', padding: '4rem 2rem', transition: 'background-color 0.3s' }}
            >
              <div style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '2rem' }}>02 / GOOGLE</div>
              <h2 className="massive-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}>구글<br/>광고</h2>
              <p style={{ marginTop: '1rem', fontSize: '1.3rem', fontWeight: 700 }}>검색 의도 분석 및 머신러닝 기반 스마트 캠페인.</p>
              <div style={{ marginTop: '2rem' }}>
                <ArrowUpRight size={48} strokeWidth={4} />
              </div>
            </motion.div>
          </Link>

          <Link href="/tiktok-moloco" style={{ textDecoration: 'none', color: 'inherit', flex: 1 }}>
            <motion.div 
              whileHover={{ backgroundColor: 'var(--hiop-green)', color: '#111' }}
              style={{ height: '100%', padding: '4rem 2rem', transition: 'background-color 0.3s' }}
            >
              <div style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '2rem' }}>03 / SHORT-FORM</div>
              <h2 className="massive-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}>틱톡 &<br/>몰로코</h2>
              <p style={{ marginTop: '1rem', fontSize: '1.3rem', fontWeight: 700 }}>글로벌 숏폼 및 머신러닝 RTB 광고 최적화.</p>
              <div style={{ marginTop: '2rem' }}>
                <ArrowUpRight size={48} strokeWidth={4} />
              </div>
            </motion.div>
          </Link>
        </div>
      </section>
      
      {/* SEO Deep Dive Section */}
      <section style={{ padding: '8rem 2rem', background: '#fff', borderTop: '4px solid var(--border-dark)' }}>
        <div className="wrap">
          <h2 className="font-display" style={{ fontSize: '3rem', marginBottom: '4rem', color: 'var(--text-dark)' }}>DEEP DIVE: DIGITAL PERFORMANCE ENGINEERING</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', fontSize: '1.1rem', lineHeight: '1.8', color: '#333' }}>
            <article>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontFamily: 'Black Han Sans, sans-serif' }}>01. 현대 디지털 마케팅의 패러다임 변화</h3>
              <p style={{ marginBottom: '1.5rem' }}>
                디지털 광고 시장은 이제 단순히 '노출'을 사는 시대를 지나 '데이터'를 설계하는 시대로 진입했습니다. 과거에는 좋은 소재와 적절한 타겟팅 설정만으로도 충분한 성과를 거둘 수 있었으나, 개인정보 보호 정책의 강화(iOS 14+ 업데이트 등)와 쿠키리스(Cookieless) 환경의 도래는 기존의 마케팅 방식을 완전히 무너뜨렸습니다. 이제는 매체에 전달되는 데이터의 질과 양이 곧 광고의 성과를 결정합니다.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                히옵(HI-OP)은 이러한 변화의 중심에서 '마케팅 엔지니어링'을 제안합니다. 우리는 광고를 단순히 집행하는 것이 아니라, 매체의 머신러닝 알고리즘이 가장 효율적으로 학습할 수 있는 환경을 구축합니다. 이는 테크니컬한 추적 인프라(GTM, CAPI, SDK 등)의 완벽한 설계로부터 시작됩니다.
              </p>
            </article>

            <article>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontFamily: 'Black Han Sans, sans-serif' }}>02. 왜 데이터 기반의 ROAS 최적화인가?</h3>
              <p style={{ marginBottom: '1.5rem' }}>
                많은 브랜드들이 광고비 대비 매출액(ROAS)을 고민하지만, 그 근본 원인에 대해서는 간과하곤 합니다. ROAS는 결과일 뿐, 그 과정을 만드는 것은 머신러닝의 '학습 효율'입니다. 메타(Meta), 구글(Google), 틱톡(TikTok)과 같은 글로벌 플랫폼들의 알고리즘은 우리가 제공하는 데이터를 바탕으로 '구매 가능성이 높은 사용자'를 찾아냅니다. 
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                만약 매체에 전달되는 데이터가 부정확하거나 누락이 많다면, 알고리즘은 잘못된 방향으로 학습하게 되고 이는 결국 광고비 낭비로 이어집니다. 히옵은 데이터 정합성을 99% 이상으로 끌어올려 알고리즘이 단 한 명의 잠재 고객도 놓치지 않도록 설계합니다. 이것이 우리가 제안하는 진정한 의미의 퍼포먼스 마케팅입니다.
              </p>
            </article>

            <article>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontFamily: 'Black Han Sans, sans-serif' }}>03. HI-OP의 세 가지 핵심 기둥</h3>
              <p style={{ marginBottom: '1rem', fontWeight: 800 }}>첫째, 테크니컬 인프라의 완성.</p>
              <p style={{ marginBottom: '1.5rem' }}>
                서버 사이드 트래킹(Server-side GTM)과 전환 API(CAPI)를 통해 브라우저 차단과 상관없는 견고한 데이터 파이프라인을 구축합니다. 이는 광고 성과 측정의 누락을 막고 매칭률을 극대화하는 기초가 됩니다.
              </p>
              <p style={{ marginBottom: '1rem', fontWeight: 800 }}>둘째, 알고리즘 맞춤형 계정 설계.</p>
              <p style={{ marginBottom: '1.5rem' }}>
                복잡한 계정 구조를 지양하고 매체의 머신러닝이 데이터를 가장 빠르게 통합 학습할 수 있는 단순하고 강력한 구조(Broad Targeting, Advantage+ 등)를 설계합니다.
              </p>
              <p style={{ marginBottom: '1rem', fontWeight: 800 }}>셋째, 데이터 기반의 소재 기획.</p>
              <p style={{ marginBottom: '1.5rem' }}>
                단순히 예쁜 디자인이 아니라, 클릭률(CTR)과 전환율(CVR) 데이터를 분석하여 유저의 행동을 이끌어내는 '장치'가 심어진 소재를 제작합니다. 특히 숏폼 광고의 경우 초기 3초 체류율을 극대화하는 기법을 적용합니다.
              </p>
            </article>

            <article>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontFamily: 'Black Han Sans, sans-serif' }}>04. 검색 엔진 최적화와 브랜드 신뢰도</h3>
              <p style={{ marginBottom: '1.5rem' }}>
                성공적인 퍼포먼스 마케팅은 강력한 검색 엔진 최적화(SEO)와 결합될 때 폭발적인 시너지를 냅니다. 유료 광고를 통해 유입된 고객이 브랜드의 전문성을 확인할 수 있는 깊이 있는 콘텐츠를 마주할 때 비로소 신뢰가 쌓이고 전환이 일어납니다. 히옵은 이러한 마케팅의 전 과정을 하나의 유기적인 시스템으로 보고 관리합니다.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                우리는 고객사의 비즈니스를 우리 자신의 것처럼 생각합니다. 한정된 예산 내에서 최대의 효율을 뽑아내기 위해 끊임없이 테스트하고 데이터에서 정답을 찾습니다. 디지털 광고의 복잡함에 지치셨다면, 이제 엔지니어링 기반의 히옵과 함께 지속 가능한 성장을 경험해 보십시오.
              </p>
            </article>
          </div>
        </div>
      </section>

      <footer style={{ padding: '4rem 2rem', borderTop: '4px solid var(--border-dark)', textAlign: 'center' }}>
        <div style={{ marginBottom: '2rem' }}>
          <a
            href="https://open.kakao.com/o/srdaF2si"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brutal"
            style={{ background: '#FEE500', color: '#000', fontSize: '1.2rem' }}
          >
            카카오톡 1:1 채팅 문의하기
          </a>
        </div>
        <p style={{ fontWeight: 800, fontSize: '1.2rem' }}>© 2025 HI-OP DIGITAL. ALL RIGHTS RESERVED.</p>
      </footer>
    </main>
  );
}
