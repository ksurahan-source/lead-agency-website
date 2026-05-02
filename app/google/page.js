'use client';

import LeadForm from '@/components/LeadForm';
import PixelScrollTracker from '@/components/PixelScrollTracker';
import { motion } from 'framer-motion';
import { ArrowDown, Check } from 'lucide-react';

export default function GooglePage() {
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
        <div className="wrap" style={{ padding: '6rem 2rem' }}>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="massive-text" style={{ color: '#EA4335' }}>구글 광고</h1>
            <h1 className="massive-text">전략 설계</h1>
          </motion.div>
          
          <div className="grid-half" style={{ border: 'none', marginTop: '4rem' }}>
            <div style={{ padding: 0 }}>
              <p style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1.2 }}>
                검색 의도 분석부터<br />머신러닝 최적화까지<br /><span style={{ color: '#EA4335' }}>완벽히</span> 설계합니다.
              </p>
            </div>
            <div style={{ padding: 0 }}>
              <p style={{ fontSize: '1.2rem', color: '#444', maxWidth: '450px', fontWeight: 600 }}>
                GTM 설계 · 검색/디스플레이 · 유튜브 광고 · PMax까지 데이터 기반의 통합 Google 광고 솔루션을 제공합니다.
              </p>
              <div style={{ marginTop: '2.5rem' }}>
                <ArrowDown size={56} strokeWidth={3} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiries Section */}
      <section style={{ padding: '6rem 2rem', background: '#EA4335', color: '#fff', overflow: 'hidden' }}>
        <div className="wrap">
          <h2 className="massive-text" style={{ fontSize: '7vw', color: '#fff' }}>문의가</h2>
          <h2 className="massive-text" style={{ fontSize: '7vw', color: 'rgba(255,255,255,0.3)' }}>증명하는 성과</h2>
          
          <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
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
