'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function PortalPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for mobile device and redirect to /m
    if (typeof window !== 'undefined' && /Mobi|Android|iPhone/i.test(navigator.userAgent)) {
      window.location.href = '/m';
    }
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
      
      {/* MASSIVE SEO ENCYCLOPEDIA SECTION */}
      <section style={{ padding: '10rem 2rem', background: '#fff', borderTop: '4px solid var(--border-dark)', color: '#121212' }}>
        <div className="wrap">
          <h2 className="font-display" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '5rem', borderBottom: '10px solid var(--hiop-orange)', display: 'inline-block' }}>
            HI-OP DIGITAL MARKETING HANDBOOK 2025
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '5rem', fontSize: '1.15rem', lineHeight: '2.2', textAlign: 'justify' }}>
            
            <article id="ch1">
              <h3 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontFamily: 'Black Han Sans, sans-serif' }}>CHAPTER 01: 디지털 마케팅의 패러다임 시프트와 엔지니어링의 대두</h3>
              <p>
                현대 디지털 마케팅 시장은 지난 10년 동안 그 어떤 산업보다도 급격한 변화를 겪어왔습니다. 과거의 마케팅이 단순히 '누구에게 보여줄 것인가'라는 타겟팅의 문제였다면, 현재의 마케팅은 '어떤 데이터를 어떻게 수집하여 매체에 학습시킬 것인가'라는 엔지니어링의 문제로 변모했습니다. 특히 애플의 iOS 14.5 업데이트로 시작된 앱 추적 투명성(ATT) 정책과 구글의 서드파티 쿠키 중단 계획은 기존의 마케팅 문법을 완전히 파괴했습니다.
              </p>
              <p>
                이러한 기술적 장벽 앞에서 단순히 광고 소재를 제작하고 입찰가를 조정하는 전통적인 방식의 대행사들은 성과의 한계에 부딪혔습니다. 히옵(HI-OP)은 이러한 시장의 문제를 해결하기 위해 탄생한 '퍼포먼스 엔지니어링 그룹'입니다. 우리는 마케팅을 예술이 아닌 과학으로 정의하며, 모든 의사결정의 근거를 정제된 데이터에서 찾습니다.
              </p>
              <p>
                데이터 엔지니어링 기반의 마케팅은 단순히 트래킹 코드를 심는 것을 넘어섭니다. 이는 비즈니스의 전체 퍼널(Funnel)을 데이터화하고, 각 단계에서 발생하는 사용자 행동을 매체의 머신러닝 알고리즘이 이해할 수 있는 언어로 번역하는 과정입니다. 히옵은 서버 사이드 트래킹(Server-side GTM), 전환 API(CAPI), 그리고 고도화된 MMP 데이터 매핑을 통해 쿠키리스 시대에도 완벽한 성과 측정을 보장합니다.
              </p>
            </article>

            <article id="ch2">
              <h3 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontFamily: 'Black Han Sans, sans-serif' }}>CHAPTER 02: ROAS 최적화의 기술적 메커니즘과 알고리즘 학습</h3>
              <p>
                광고주들이 가장 많이 묻는 질문 중 하나는 "어떻게 하면 ROAS를 높일 수 있는가?"입니다. 히옵의 답변은 명확합니다. "알고리즘을 올바르게 학습시켜야 합니다." 현재 메타(Meta), 구글(Google), 틱톡(TikTok)의 광고 엔진은 고도의 인공지능 머신러닝을 기반으로 작동합니다. 이 인공지능은 우리가 제공하는 '전환 데이터'를 먹고 자랍니다. 
              </p>
              <p>
                만약 우리가 제공하는 데이터의 품질이 낮거나, 실제 구매가 발생했음에도 불구하고 기술적 오류로 인해 누락된다면 알고리즘은 잘못된 방향으로 최적화됩니다. 이는 결국 구매 의사가 없는 사용자에게 광고비가 낭비되는 결과로 이어집니다. 히옵은 데이터 정합성을 확보하여 단 한 건의 전환 데이터도 놓치지 않도록 설계합니다. 
              </p>
              <p>
                또한, 우리는 '통합 학습(Unified Learning)' 전략을 취합니다. 복잡하게 쪼개진 캠페인 구조는 머신러닝이 데이터를 분산 학습하게 만들어 성과 안착을 방해합니다. 히옵은 매체의 알고리즘이 가장 빠르게 데이터를 통합하여 최적의 오디언스를 찾아낼 수 있도록 심플하고 강력한 계정 구조를 설계합니다. 이것이 바로 우리가 제안하는 '알고리즘 중심의 퍼포먼스 마케팅'입니다.
              </p>
            </article>

            <article id="ch3">
              <h3 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontFamily: 'Black Han Sans, sans-serif' }}>CHAPTER 03: 풀퍼널(Full-Funnel) 전략과 고객 생애 가치(LTV)의 극대화</h3>
              <p>
                성공적인 비즈니스는 단발성 구매에 그치지 않습니다. 히옵은 고객의 첫 유입부터 재구매, 그리고 충성 고객이 되기까지의 모든 여정을 설계합니다. 인지 단계에서는 잠재 고객의 시선을 사로잡는 강력한 후킹 소재와 브랜딩 캠페인을, 고려 단계에서는 신뢰를 구축할 수 있는 정보성 콘텐츠와 리타겟팅을, 그리고 마지막 전환 단계에서는 강력한 구매 동기를 부여하는 액션 캠페인을 전개합니다.
              </p>
              <p>
                이 과정에서 중요한 것은 단순히 유입을 늘리는 것이 아니라, '진성 유저'를 획득하는 것입니다. 히옵은 구매 데이터와 사용자 행동 패턴을 분석하여 고객 생애 가치(LTV)가 높은 오디언스 세그먼트를 발굴합니다. 이를 통해 신규 고객 획득 비용(CAC)을 낮추고, 장기적인 비즈니스 성장을 견인합니다.
              </p>
              <p>
                데이터는 거짓말을 하지 않습니다. 하지만 데이터를 읽는 눈은 마케터의 역량에 달려 있습니다. 히옵은 정량적인 수치 뒤에 숨겨진 정성적인 유저의 심리를 읽어내어, 가장 효과적인 메시지를 가장 적절한 시점에 전달합니다. 우리의 풀퍼널 전략은 단순히 광고를 넘어서 비즈니스의 성장 엔진이 됩니다.
              </p>
            </article>

            <article id="ch4">
              <h3 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontFamily: 'Black Han Sans, sans-serif' }}>CHAPTER 04: 미래 마케팅의 핵심 - 투명성과 실시간 데이터 사이언스</h3>
              <p>
                히옵이 다른 대행사와 차별화되는 가장 큰 지점은 바로 '투명성'입니다. 우리는 블랙박스 같은 광고 운영을 거부합니다. 모든 성과는 실시간으로 업데이트되는 대시보드를 통해 고객사에게 투명하게 공유됩니다. 어떤 소재가 효율적인지, 어떤 매체에서 성과가 나고 있는지 마케터와 광고주가 동일한 데이터를 보고 논의합니다.
              </p>
              <p>
                또한 우리는 AI 기술을 적극적으로 활용합니다. 광고 문안 작성, 이미지 생성, 그리고 입찰가 자동 조정에 이르기까지 최신 AI 툴들을 활용하여 인간의 한계를 넘어선 효율을 추구합니다. 하지만 AI를 제어하고 최종적인 전략을 수립하는 것은 여전히 인간의 몫입니다. 히옵의 전문가들은 AI가 생성한 방대한 옵션 중 비즈니스 목표에 가장 부합하는 최선의 선택을 내립니다.
              </p>
              <p>
                디지털 광고는 매분 매초가 전쟁터입니다. 히옵은 이 전쟁터에서 고객사의 승리를 보장하는 가장 강력한 무기가 되어드릴 것입니다. 기술적 우위, 데이터 기반의 전략, 그리고 멈추지 않는 도전 정신. 히옵과 함께라면 당신의 비즈니스는 한계를 넘어 성장할 수 있습니다.
              </p>
            </article>

            <article id="ch5">
              <h3 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontFamily: 'Black Han Sans, sans-serif' }}>CHAPTER 05: 히옵 마케팅의 철학과 실행 원칙</h3>
              <p>
                우리의 철학은 단순합니다. "고객사의 성장이 곧 우리의 성장이다." 히옵은 단순한 대행사가 아닌 비즈니스 파트너로서 함께 고민합니다. 우리는 안주하지 않습니다. 매일같이 쏟아지는 새로운 광고 기술과 매체의 업데이트를 누구보다 빠르게 학습하고 현업에 적용합니다. 
              </p>
              <p>
                실행에 있어서는 '속도'와 '정확도'를 중시합니다. 가설을 세우고, 테스트하고, 데이터를 확인하고, 다시 개선하는 PDCA(Plan-Do-Check-Act) 사이클을 극한의 속도로 돌립니다. 이 과정을 통해 우리는 비즈니스에 가장 최적화된 '승리의 공식'을 찾아냅니다. 
              </p>
              <p>
                지금 이 순간에도 경쟁자들은 데이터를 쌓고 학습하고 있습니다. 더 늦기 전에 히옵의 엔지니어링 기반 마케팅 솔루션을 경험해 보십시오. 우리는 당신의 브랜드를 세상에 알리는 것을 넘어, 숫자로 증명되는 실질적인 비즈니스의 성공을 만들어냅니다.
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
