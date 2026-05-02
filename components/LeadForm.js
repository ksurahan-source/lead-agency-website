'use client';

import { useState, useRef, useCallback } from 'react';
import Script from 'next/script';
import { motion } from 'framer-motion';

export default function LeadForm({ source = 'hi-op' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    inquiry: '',
  });
  const [submittedData, setSubmittedData] = useState({});
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const turnstileRef = useRef(null);

  const handleTurnstileVerify = useCallback((token) => {
    setTurnstileToken(token);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: 'form_attempt' });
    }

    if (!turnstileToken) {
      setStatus('error');
      setErrorMessage('보안 확인을 완료해 주세요.');
      return;
    }

    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, turnstileToken, source }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || '오류가 발생했습니다.');

      setSubmittedData({ ...formData });
      setStatus('success');

      // Meta Pixel
      if (typeof window !== 'undefined' && window.fbq) {
        const phoneDigits = formData.phone.replace(/[^0-9]/g, '');
        const ln = formData.name.slice(0, 1);
        const fn = formData.name.slice(1);

        window.fbq('init', '907001489050252', {
          em: formData.email.trim().toLowerCase(),
          ph: '82' + (phoneDigits.startsWith('0') ? phoneDigits.slice(1) : phoneDigits),
          fn,
          ln,
        });
        window.fbq('track', 'Lead', {
          content_name: formData.company || 'general',
        }, { eventID: data.eventId });
      }

      // GTM dataLayer push
      if (typeof window !== 'undefined' && window.dataLayer) {
        const digits = formData.phone.replace(/[^0-9]/g, '');
        const phoneE164 = '+82' + (digits.startsWith('0') ? digits.slice(1) : digits);
        const lastName  = formData.name.slice(0, 1);
        const firstName = formData.name.slice(1);

        window.dataLayer.push({
          event: 'generate_lead',
          event_id: data.eventId,
          user_data: {
            email:        formData.email.trim().toLowerCase(),
            phone_number: phoneE164,
            first_name:   firstName,
            last_name:    lastName,
          },
          lead_company: formData.company,
        });
      }

      setFormData({ name: '', email: '', phone: '', company: '', inquiry: '' });
      setTurnstileToken('');
      if (window.turnstile && turnstileRef.current) {
        window.turnstile.reset(turnstileRef.current);
      }

    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message);
    }
  };

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="brutalist-card" 
        style={{ background: 'var(--hiop-orange)', textAlign: 'center' }}
      >
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🤘</div>
        <h3 className="font-syne" style={{ fontSize: '2rem', marginBottom: '1rem' }}>SUCCESS!</h3>
        <p style={{ fontWeight: 700, marginBottom: '2rem' }}>상담 신청이 완료되었습니다. 24시간 내로 담당자가 연락드립니다.</p>
        
        <div style={{ background: '#000', color: '#fff', padding: '1.5rem', textAlign: 'left', marginBottom: '2rem' }}>
          {[{ label: 'NAME', value: submittedData.name }, { label: 'EMAIL', value: submittedData.email }, { label: 'PHONE', value: submittedData.phone }].map(r => (
            <div key={r.label} style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 800, fontSize: '0.8rem', color: 'var(--hiop-orange)' }}>{r.label}</span>
              <span style={{ fontWeight: 600 }}>{r.value}</span>
            </div>
          ))}
        </div>

        <a
          href="https://open.kakao.com/o/sYX283ri"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-brutal"
          style={{ width: '100%', background: '#FEE500', color: '#000', border: '3px solid #000', boxShadow: '6px 6px 0 #000' }}
        >
          KAKAOTALK CHAT
        </a>
      </motion.div>
    );
  }

  return (
    <div className="brutalist-card">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="lazyOnload"
        onLoad={() => {
          window.onTurnstileVerify = handleTurnstileVerify;
        }}
      />
      <h3 className="font-syne" style={{ fontSize: '2rem', marginBottom: '2rem' }}>GET IN TOUCH</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label-brutal">NAME *</label>
          <input
            name="name" type="text"
            className="form-input-brutal" placeholder="HONG GILDONG"
            required value={formData.name} onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label-brutal">EMAIL *</label>
          <input
            name="email" type="email"
            className="form-input-brutal" placeholder="YOU@COMPANY.COM"
            required value={formData.email} onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label-brutal">PHONE *</label>
          <input
            name="phone" type="tel"
            className="form-input-brutal" placeholder="010-0000-0000"
            required value={formData.phone} onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label-brutal">COMPANY</label>
          <input
            name="company" type="text"
            className="form-input-brutal" placeholder="BRAND NAME"
            value={formData.company} onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label-brutal">MESSAGE</label>
          <textarea
            name="inquiry"
            className="form-input-brutal" placeholder="Tell us about your goals..."
            style={{ minHeight: '120px' }}
            value={formData.inquiry} onChange={handleChange}
          />
        </div>

        <div
          ref={turnstileRef}
          className="cf-turnstile"
          data-sitekey="0x4AAAAAADDiw-g8qa_PP9MP"
          data-callback="onTurnstileVerify"
          data-theme="light"
          style={{ margin: '1rem 0' }}
        />

        {status === 'error' && (
          <div style={{ background: '#ff000020', padding: '1rem', border: '2px solid #ff0000', marginBottom: '1.5rem', fontWeight: 700 }}>
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          className="btn-brutal primary"
          style={{ width: '100%' }}
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'SENDING...' : 'SUBMIT REQUEST →'}
        </button>
      </form>
    </div>
  );
}
