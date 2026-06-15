'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Logo from '@/components/Logo';

const WHATSAPP = 'https://wa.me/60167471566';
const EMAIL_USER = 'hiob4515';
const EMAIL_DOMAIN = 'gmail.com';
const PHONE = '+60 16 747 1566';

const EmailAddress = () => (
  <>
    <span>{EMAIL_USER}</span>
    <span aria-hidden="true">@</span>
    <span>{EMAIL_DOMAIN}</span>
  </>
);

const services = [
  { label: '01 / ALL-IN-ONE', title: 'Starter\nPackage', desc: 'Website + Reels creative + 6-day ad campaign. Everything you need to start generating leads — in one week.' },
  { label: '02 / TRACKING', title: 'Tracking\nPerfection', desc: 'Full CAPI, GA4, and GTM integration. Zero data leakage. Your ad platform finally sees what it needs to optimize.' },
  { label: '03 / LEAD GEN', title: 'Lead Gen\nWebsite', desc: 'High-conversion one-page landing site built for paid traffic. Full conversion tracking setup included.' },
  { label: '04 / PERFORMANCE', title: 'Performance\nAds', desc: 'Meta and Google campaigns managed on a pure performance model — you pay based on results, not retainer.' },
  { label: '05 / E-COMMERCE', title: 'E-com\nMarketing', desc: 'Data-driven e-commerce performance marketing. Zero-leakage tracking framework for product sales.' },
  { label: '06 / CREATIVES', title: 'Video\nCreatives', desc: 'Algorithm-optimized Reels and video ads. ROAS uplift through dynamic creative strategy.' },
];

const stats = [
  { num: '15%', label: 'Performance fee on ad spend — no retainer lock-in' },
  { num: '7', label: 'Days from kickoff to live campaigns' },
  { num: '0', label: 'Data leakage with our CAPI setup' },
];

export default function EnPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const openEmail = (event) => {
    event.preventDefault();
    window.location.href = ['mailto:', EMAIL_USER, '@', EMAIL_DOMAIN].join('');
  };


  return (
    <main style={{ background: '#f5f0e8', minHeight: '100vh', fontFamily: 'var(--font-syne, sans-serif)' }}>

      {/* Nav */}
      <nav style={{ padding: '1.05rem clamp(1rem, 4vw, 2rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid #111' }}>
        <a href="/en" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} aria-label="hiob 홈">
          <Logo height={28} />
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <span className="font-syne" style={{ fontWeight: 800, fontSize: '0.9rem' }}>PERFORMANCE MARKETING</span>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
            style={{ background: '#25D366', color: '#fff', fontWeight: 800, fontSize: '0.85rem', padding: '0.5rem 1.2rem', textDecoration: 'none', border: '2px solid #111' }}>
            WhatsApp
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: 'clamp(3rem, 10vw, 6rem) 2rem', position: 'relative', overflow: 'hidden' }}>
        <motion.h1
          initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}
          style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.03em', color: '#111', wordBreak: 'keep-all' }}>
          Stop Wasting<br />Ad Budget.
        </motion.h1>
        <motion.h1
          initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.1 }}
          style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.03em', color: '#111', WebkitTextStroke: '3px #111', WebkitTextFillColor: 'transparent', wordBreak: 'keep-all' }}>
          Start Getting Leads.
        </motion.h1>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '3rem' }}>
          <p style={{ maxWidth: '560px', fontSize: 'clamp(1rem, 3vw, 1.4rem)', fontWeight: 700, lineHeight: 1.5, textAlign: 'right', color: '#111', width: '100%' }}>
            HI-OB is a performance marketing specialist operating across Southeast Asia and beyond. We engineer tracking, build creatives, and run your ads — from day one.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          style={{ display: 'flex', gap: '1rem', marginTop: '4rem', flexWrap: 'wrap' }}>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
            style={{ background: '#25D366', color: '#fff', fontWeight: 900, fontSize: '1.1rem', padding: '1.2rem 2.5rem', textDecoration: 'none', border: '3px solid #111', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            💬 WhatsApp: {PHONE}
          </a>
          <a href="#email" onClick={openEmail}
            style={{ background: '#fff', color: '#111', fontWeight: 900, fontSize: '1.1rem', padding: '1.2rem 2.5rem', textDecoration: 'none', border: '3px solid #111', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            ✉️ Email Us
          </a>
        </motion.div>
      </section>

      {/* Marquee */}
      <div className="marquee-container" style={{ marginTop: '2rem', borderTop: '4px solid #111', borderBottom: '4px solid #111' }}>
        <div className="marquee-content" style={{ fontWeight: 900, fontSize: '1.1rem' }}>
          PERFORMANCE MARKETING • META CAPI SETUP • GA4 + GTM ENGINEERING • LEAD GEN WEBSITES • REELS PRODUCTION • 7-DAY DELIVERY • 15% PERFORMANCE FEE • PERFORMANCE MARKETING • META CAPI SETUP • GA4 + GTM ENGINEERING •
        </div>
      </div>

      {/* Stats */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: '4px solid #111' }}>
        {stats.map((s, i) => (
          <div key={i} style={{ padding: 'clamp(2.5rem, 7vw, 4rem) clamp(0.8rem, 3vw, 2rem)', borderRight: i < 2 ? '4px solid #111' : 'none', textAlign: 'center' }}>
            <div style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', fontWeight: 900, color: '#111', lineHeight: 1 }}>{s.num}</div>
            <p style={{ marginTop: '1rem', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.5, color: '#444' }}>{s.label}</p>
          </div>
        ))}
      </section>

      {/* Services Grid */}
      <section style={{ borderTop: '4px solid #111', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {services.map((s, i) => (
          <motion.div key={i} whileHover={{ backgroundColor: '#111', color: '#fff' }}
            style={{ padding: '3rem 2rem', borderRight: '4px solid #111', borderBottom: '4px solid #111', cursor: 'default', transition: 'all 0.3s' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '1.5rem', opacity: 0.5 }}>{s.label}</div>
            <h3 style={{ fontSize: '2.2rem', marginBottom: '1rem', whiteSpace: 'pre-line', fontWeight: 900 }}>{s.title}</h3>
            <p style={{ fontSize: '1rem', fontWeight: 600, lineHeight: 1.6 }}>{s.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Pricing */}
      <section style={{ padding: 'clamp(4rem, 10vw, 8rem) 2rem', background: '#111', color: '#f5f0e8', borderTop: '4px solid #111' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.02em', wordBreak: 'keep-all' }}>
            Transparent Pricing.
          </h2>
          <p style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '4rem', opacity: 0.6 }}>
            No retainer traps. No surprise fees.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {/* Starter */}
            <div style={{ border: '3px solid #f5f0e8', padding: '2.5rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '1rem', opacity: 0.5, letterSpacing: '0.1em' }}>STARTER PACKAGE</div>
              <div style={{ fontSize: 'clamp(1.8rem, 6.5vw, 3rem)', fontWeight: 900, lineHeight: 1 }}>$350</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, opacity: 0.6, marginBottom: '2rem' }}>one-time setup</div>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {['Landing page build', 'Reels creative (1 video)', '6-day Meta/Google campaign', 'CAPI + GA4 tracking setup', '7-day delivery guarantee'].map(item => (
                  <li key={item} style={{ fontWeight: 700, display: 'flex', gap: '0.5rem' }}>
                    <span style={{ color: '#25D366' }}>✓</span> {item}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: '1.5rem', fontSize: '0.85rem', opacity: 0.5, fontWeight: 700 }}>
                + $700 to own the website outright
              </div>
            </div>

            {/* Performance */}
            <div style={{ border: '3px solid #25D366', padding: '2.5rem', background: '#1a2a1a' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '1rem', color: '#25D366', letterSpacing: '0.1em' }}>PERFORMANCE MODEL</div>
              <div style={{ fontSize: 'clamp(1.8rem, 6.5vw, 3rem)', fontWeight: 900, lineHeight: 1 }}>15%</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, opacity: 0.6, marginBottom: '2rem' }}>of ad spend / month</div>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {['No fixed retainer', 'We win when you win', 'Full campaign management', 'Creative refresh included', 'Monthly performance report'].map(item => (
                  <li key={item} style={{ fontWeight: 700, display: 'flex', gap: '0.5rem' }}>
                    <span style={{ color: '#25D366' }}>✓</span> {item}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: '1.5rem', fontSize: '0.85rem', opacity: 0.7, fontWeight: 700, color: '#25D366' }}>
                Min. $500 ad spend / month
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section style={{ padding: 'clamp(4rem, 10vw, 8rem) 2rem', background: '#f5f0e8', borderTop: '4px solid #111' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', fontWeight: 900, lineHeight: 0.95, marginBottom: '2rem', letterSpacing: '-0.03em', wordBreak: 'keep-all' }}>
            Ready to start?
          </h2>
          <p style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '3rem', color: '#444', lineHeight: 1.6 }}>
            Message us on WhatsApp or send an email. We respond within 24 hours.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              style={{ background: '#25D366', color: '#fff', fontWeight: 900, fontSize: '1.2rem', padding: '1.4rem 3rem', textDecoration: 'none', border: '3px solid #111', width: '100%', maxWidth: '500px', textAlign: 'center', display: 'block' }}>
              💬 WhatsApp: {PHONE}
            </a>
            <a href="#email" onClick={openEmail}
              style={{ background: '#fff', color: '#111', fontWeight: 900, fontSize: '1.1rem', padding: '1.2rem 3rem', textDecoration: 'none', border: '3px solid #111', width: '100%', maxWidth: '500px', textAlign: 'center', display: 'block' }}>
              <span>✉️ <EmailAddress /></span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: 'clamp(2.5rem, 8vw, 4rem) clamp(1.1rem, 4vw, 2rem)', borderTop: '4px solid #111', background: '#111', color: '#f5f0e8' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem' }}>
          <div>
            <div className="font-display" style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', wordBreak: 'keep-all' }}>HI-OB</div>
            <p style={{ fontWeight: 700, marginTop: '0.5rem', opacity: 0.6 }}>Performance Marketing — Southeast Asia & Beyond</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'right' }}>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', fontWeight: 700, textDecoration: 'none' }}>WhatsApp: {PHONE}</a>
            <a href="#email" onClick={openEmail} style={{ color: '#f5f0e8', fontWeight: 700, textDecoration: 'none' }}><EmailAddress /></a>
          </div>
        </div>
        <div style={{ marginTop: '3rem', borderTop: '1px solid #333', paddingTop: '2rem', fontSize: '0.85rem', opacity: 0.4, fontWeight: 700 }}>
          © 2025 HI-OB DIGITAL. ALL RIGHTS RESERVED.
        </div>
      </footer>

    </main>
  );
}
