'use client';

import { useEffect } from 'react';
import LeadForm from '@/components/LeadForm';
import PixelScrollTracker from '@/components/PixelScrollTracker';
import { motion } from 'framer-motion';
import { ArrowDown, Check } from 'lucide-react';

export default function GooglePage() {
  useEffect(() => {
    if (typeof window !== 'undefined' && /Mobi|Android|iPhone/i.test(navigator.userAgent)) {
      window.location.href = '/m/google';
    }
  }, []);

  return (
    <main className="bg-light min-h-screen">
      <PixelScrollTracker />

      {/* Navigation */}
      <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', borderBottom: '4px solid var(--border-dark)', position: 'sticky', top: 0, background: 'var(--bg-light)', zIndex: 100 }}>
        <div className="font-display" style={{ fontSize: '1.8rem' }}>HI-OP / GOOGLE</div>
        <a href="#contact" style={{ fontWeight: 800, textTransform: 'uppercase', color: 'inherit', textDecoration: 'none', fontSize: '1.1rem' }}>무료 진단 신청 →</a>
      </nav>

      {/* Hero */}
      <section style={{ borderBottom: '4px solid var(--border-dark)' }}>
        <div className="wrap" style={{ padding: 'clamp(3rem, 10vw, 6rem) 1.2rem' }}>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="massive-text" style={{ color: '#EA4335' }}>구글 광고</h1>
            <h1 className="massive-text">전략 설계</h1>
          </motion.div>
          
          <div className="grid-half" style={{ border: 'none', marginTop: 'clamp(2rem, 5vw, 4rem)' }}>
            <div style={{ padding: '2rem 0' }}>
              <p style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', fontWeight: 800, lineHeight: 1.2 }}>
                검색 의도 분석부터<br />머신러닝 최적화까지<br /><span style={{ color: '#EA4335' }}>완벽히</span> 설계합니다.
              </p>
            </div>
            <div style={{ padding: '0 0 2rem' }}>
              <p style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', color: '#444', maxWidth: '450px', fontWeight: 600 }}>
                GTM 설계 · 검색/디스플레이 · 유튜브 광고 · PMax까지 데이터 기반의 통합 Google 광고 솔루션을 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiries Section */}
      <section style={{ padding: 'clamp(3rem, 8vw, 6rem) 1.2rem', background: '#EA4335', color: '#fff', overflow: 'hidden' }}>
        <div className="wrap">
          <h2 className="massive-text" style={{ color: '#fff' }}>문의가</h2>
          <h2 className="massive-text" style={{ color: 'rgba(255,255,255,0.3)' }}>증명하는 성과</h2>
          
          <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem' }}>
            {[
              { b: 'OO 법률사무소', m: 'DB 단가 40% 절감' },
              { b: 'XX IT 솔루션', m: '검색 노출량 5배 증가' },
              { b: 'YY 가전 브랜드', m: 'PMax ROAS 420%' },
              { b: 'ZZ 스타트업', m: '가입 유저 1만명 돌파' },
              { b: 'AA 어학원', m: '상담 전환율 2.5배 상승' },
              { b: 'BB 코스메틱', m: '유튜브 광고 효율 200%' }
            ].map((stat, i) => (
              <div key={i} style={{ border: '3px solid #fff', padding: '1.5rem', background: 'rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>{stat.b}</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: 'Black Han Sans, sans-serif' }}>{stat.m}</div>
              </div>
            ))}
          </div>
          
          <div style={{ marginTop: '3rem', textAlign: 'right' }}>
            <p className="font-syne" style={{ fontSize: '2rem', fontWeight: 800 }}>AND 1,200+ MORE INQUIRIES</p>
          </div>
        </div>
      </section>

      {/* Engineering Focus Section */}
      <section className="split-section" style={{ borderBottom: '4px solid var(--border-dark)' }}>
        <div className="split-left" style={{ padding: '6rem 2rem' }}>
          <p style={{ fontWeight: 800, color: '#EA4335', marginBottom: '1rem' }}>INTENT ENGINEERING</p>
          <h2 style={{ fontSize: '4rem', marginBottom: '2rem' }}>구글 광고는<br/>키워드가 아니라<br/>'데이터' 싸움입니다.</h2>
          <p style={{ fontSize: '1.2rem', fontWeight: 600, color: '#444' }}>
            단순히 높은 입찰가를 쓰는 것이 정답이 아닙니다. <br/>
            사용자의 검색 의도를 데이터화하고 머신러닝이 이를 학습하게 만드는 것이 핵심입니다.
          </p>
        </div>
        <div className="split-right" style={{ padding: '6rem 2rem', background: '#eee' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>01. 향상된 전환(EC) 구축</h3>
              <p style={{ color: '#555', fontWeight: 600 }}>고객 정보를 해싱하여 매체에 직접 전달함으로써 누락된 전환 신호를 완벽하게 복구합니다.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>02. PMax 자산 최적화</h3>
              <p style={{ color: '#555', fontWeight: 600 }}>실적 최대화 캠페인의 시그널 데이터를 정교하게 설계하여 저효율 예산 낭비를 차단합니다.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>03. GA4 오디언스 연동</h3>
              <p style={{ color: '#555', fontWeight: 600 }}>GA4의 고급 사용자 행동 데이터를 구글 광고 오디언스로 직접 연동하여 고가치 타겟팅을 수행합니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="split-section" style={{ borderBottom: '4px solid var(--border-dark)' }}>
        <div className="split-left" style={{ background: '#EA4335', color: '#fff', padding: '5rem 2rem' }}>
          <h2 style={{ fontSize: '5rem', marginBottom: '2rem' }}>왜<br/>히옵인가?</h2>
          <p style={{ fontSize: '1.4rem', fontWeight: 700 }}>단순 입찰 조정을 넘어선 테크니컬 구글 광고 컨설팅.</p>
        </div>
        <div className="split-right" style={{ padding: '5rem 2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {[
              { t: 'GTM 인프라 설계', d: 'Google Tag Manager를 활용한 정밀한 사용자 행동 추적 및 데이터 정합성 확보' },
              { t: '검색 의도 분석', d: '사용자의 검색 의도 기반 키워드 포트폴리오 및 맞춤 소재 전략 수립' },
              { t: 'PMax 효율 극대화', d: '실적 최대화 캠페인의 자산 그룹 최적화 및 머신러닝 학습 촉진' },
              { t: '유튜브 풀퍼널 전략', d: '브랜드 인지부터 최종 전환까지 아우르는 비디오 광고 캠페인 설계' }
            ].map((item, idx) => (
              <div key={idx} style={{ borderBottom: '3px solid #ddd', paddingBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '0.8rem' }}>{item.t}</h3>
                <p style={{ color: '#444', fontSize: '1.1rem', fontWeight: 600 }}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: '7rem 2rem', borderBottom: '4px solid var(--border-dark)' }}>
        <div className="wrap">
          <h2 className="massive-text" style={{ fontSize: '7vw', marginBottom: '5rem' }}>핵심 서비스</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {[
              { title: 'GTM 기반 트래킹 설계', items: ['향상된 전환(EC) 연동', '서버사이드 GTM 구축', 'GA4 연동 및 진단'] },
              { title: '검색 & 디스플레이 최적화', items: ['키워드 포트폴리오 구축', '스마트 입찰 최적화', '광고 문안 및 에셋 개선'] },
              { title: '실적 최대화(PMax) 극대화', items: ['자산 그룹 시그널 최적화', '알고리즘 학습 촉진', '크로스 채널 예산 배분'] }
            ].map((s, i) => (
              <div key={i} className="brutalist-card">
                <h3 style={{ fontSize: '2rem', marginBottom: '2rem' }}>{s.title}</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {s.items.map(item => (
                    <li key={item} style={{ marginBottom: '1rem', fontWeight: 700, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                      <Check size={22} strokeWidth={4} color="#EA4335" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="split-section" style={{ background: 'var(--bg-dark)', color: 'var(--text-light)' }}>
        <div className="split-left" style={{ padding: '7rem 2rem' }}>
          <h2 className="massive-text" style={{ color: '#FBBC05' }}>최고의</h2>
          <h2 className="massive-text">성과를</h2>
          <p style={{ marginTop: '2.5rem', fontSize: '1.3rem', color: '#aaa', maxWidth: '450px', fontWeight: 600 }}>
            구글 광고의 핵심은 데이터와 머신러닝의 조화입니다. 지금 바로 전문가의 무료 진단을 신청하세요.
          </p>
        </div>
        <div className="split-right" style={{ padding: '7rem 2rem', background: '#F4F4F0' }}>
          <LeadForm source="google" />
        </div>
      </section>

      {/* MASSIVE GOOGLE SEO ENCYCLOPEDIA */}
      <section style={{ padding: '10rem 2rem', background: '#fff', borderTop: '4px solid var(--border-dark)', color: '#121212' }}>
        <div className="wrap">
          <h2 className="font-display" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '5rem', borderBottom: '10px solid #EA4335', display: 'inline-block' }}>
            THE GOOGLE ADS MASTER GUIDE 2025
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '5rem', fontSize: '1.15rem', lineHeight: '2.2', textAlign: 'justify' }}>
            
            <article>
              <h3 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontFamily: 'Black Han Sans, sans-serif' }}>CHAPTER 01: 검색 의도(Search Intent)의 다차원적 분석과 키워드 전략</h3>
              <p>
                구글 광고의 핵심은 '키워드'가 아니라 그 뒤에 숨겨진 '의도(Intent)'입니다. 사용자가 "마케팅 대행사"라고 검색했을 때, 그들이 단순히 정보를 찾는 중인지(Informational), 대행사를 비교 분석 중인지(Commercial), 아니면 즉시 계약을 원하는지(Transactional)를 구분하는 것이 승부의 시작입니다. 
              </p>
              <p>
                히옵(HI-OP)은 구글의 방대한 검색 시그널을 다차원적으로 분석합니다. 단순히 조회수가 높은 키워드에 높은 입찰가를 쓰는 방식은 광고비 낭비만 초래합니다. 우리는 실제 전환 데이터를 기반으로 '구매 결정 단계'에 있는 유저들이 주로 사용하는 키워드 포트폴리오를 구성합니다. 또한, 일치 검색(Exact Match)과 구문 검색(Phrase Match)의 정교한 조합, 그리고 제외 키워드(Negative Keywords)의 실시간 관리를 통해 타겟팅의 순도를 극한으로 끌어올립니다.
              </p>
            </article>

            <article>
              <h3 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontFamily: 'Black Han Sans, sans-serif' }}>CHAPTER 02: 실적 최대화(PMax) 캠페인의 블랙박스 해킹</h3>
              <p>
                PMax(Performance Max)는 구글의 가장 강력한 무기이자, 동시에 마케터들을 당혹스럽게 만드는 시스템입니다. 검색, 유튜브, 디스플레이, 지메일 등 모든 지면을 AI가 알아서 운영해주지만, 세부 데이터를 확인하기 어렵기 때문입니다. 히옵은 PMax의 '블랙박스'를 데이터로 해킹합니다.
              </p>
              <p>
                우리는 자산 그룹(Asset Groups)의 시그널 오디언스를 정교하게 설계하여 머신러닝이 엉뚱한 곳에서 헤매지 않도록 방향을 제시합니다. 또한, 브랜드 키워드 보호 전략과 스크립트 기반의 지면 제외 관리를 통해 PMax가 가장 고효율의 전환을 가져올 수 있도록 가이드를 제공합니다. AI가 주도하는 캠페인일수록, 그 AI를 길들이는 마케터의 엔지니어링 역량이 성과를 결정합니다.
              </p>
            </article>

            <article>
              <h3 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontFamily: 'Black Han Sans, sans-serif' }}>CHAPTER 03: 유튜브 풀퍼널 마케팅과 비디오 액션 캠페인(VAC)</h3>
              <p>
                유튜브는 이제 단순한 영상 플랫폼을 넘어, 전 세계에서 두 번째로 큰 검색 엔진입니다. 히옵은 유튜브를 인지(Awareness)의 수단으로만 쓰지 않습니다. 우리는 비디오 액션 캠페인(VAC)을 통해 영상 시청이 실제 웹사이트 전환으로 이어지도록 설계합니다. 
              </p>
              <p>
                영상의 초반 5초 이내에 유저의 문제를 건드리는 'Pain Point' 소구와, 구글 오디언스 데이터를 활용한 정밀 타겟팅을 결합합니다. 특히 유튜브 광고 이후 구글 검색 광고로 이어지는 유기적인 검색 시너지 효과를 분석하여, 전체 마케팅 퍼널의 효율을 극대화합니다. 유튜브는 보는 매체가 아니라, 사는 매체입니다.
              </p>
            </article>

            <article>
              <h3 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontFamily: 'Black Han Sans, sans-serif' }}>CHAPTER 04: GTM 서버사이드와 GA4의 데이터 거버넌스</h3>
              <p>
                구글 광고 성과의 절반은 구글 태그 매니저(GTM)와 구글 애널리틱스 4(GA4)에서 옵니다. 최근 쿠키 차단 환경에서 일반적인 클라이언트 사이드 태그는 데이터 누락이 심각합니다. 히옵은 GTM 서버사이드 설계를 통해 브라우저 차단과 상관없는 견고한 데이터 수집 환경을 구축합니다.
              </p>
              <p>
                GA4의 이벤트 모델링을 통해 유저의 복잡한 전환 경로를 추적하고, '향상된 전환(Enhanced Conversions)' 기능을 활성화하여 광고 클릭 후 발생하는 오프라인 성과까지 매칭합니다. 데이터가 깨끗해야 알고리즘이 똑똑해집니다. 히옵은 고객사의 데이터 거버넌스를 최신 기술로 재정립합니다.
              </p>
            </article>

            <article>
              <h3 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontFamily: 'Black Han Sans, sans-serif' }}>CHAPTER 05: 스마트 입찰(tROAS/tCPA)의 최적화와 예산 관리</h3>
              <p>
                입찰가는 이제 사람이 정하지 않습니다. 구글의 스마트 입찰 시스템이 매 경매(Auction)마다 유저의 실시간 시그널을 분석하여 입찰가를 결정합니다. 히옵의 역할은 이 시스템이 '정확한 목표'를 가질 수 있게 세팅하는 것입니다. 
              </p>
              <p>
                우리는 비즈니스의 마진 구조를 분석하여 목표 ROAS(tROAS) 또는 목표 CPA(tCPA)를 산출하고, 시기별/시즌별 예산 유동성을 관리하여 머신러닝의 학습 데이터가 끊기지 않도록 관리합니다. 단순히 광고비를 쓰는 대행사가 아닌, 고객사의 예산을 가장 효율적인 투자처에 배분하는 자산 관리자의 관점에서 구글 광고를 운영합니다.
              </p>
            </article>

          </div>
        </div>
      </section>

      <footer style={{ padding: '5rem 2rem', textAlign: 'center', borderTop: '4px solid var(--border-dark)' }}>
        <div style={{ marginBottom: '2.5rem' }}>
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
        <p style={{ fontWeight: 800, fontSize: '1.2rem' }}>© 2025 HI-OP / GOOGLE SPECIALIST. ALL RIGHTS RESERVED.</p>
      </footer>
    </main>
  );
}
