'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const t = {
  ko: {
    title: '무료 진단 신청',
    name: '성함 *', namePlaceholder: '홍길동',
    email: '이메일 *', emailPlaceholder: 'example@naver.com',
    phone: '연락처 *', phonePlaceholder: '010-0000-0000',
    company: '회사명 / 브랜드명', companyPlaceholder: '하이옵 마케팅',
    inquiry: '문의 내용', inquiryPlaceholder: '현재 고민 중인 매체나 목표를 자유롭게 적어주세요.',
    submit: '무료 진단 신청하기 →', submitting: '제출 중...',
    successTitle: '신청 완료!',
    successMsg: '성공적으로 접수되었습니다.\n24시간 내로 담당자가 연락드립니다.',
    labelName: '성함', labelEmail: '이메일', labelPhone: '연락처',
    kakao: '카카오톡 실시간 문의',
  },
  en: {
    title: 'Free Diagnosis',
    name: 'Name *', namePlaceholder: 'John Doe',
    email: 'Email *', emailPlaceholder: 'example@company.com',
    phone: 'Phone *', phonePlaceholder: '010-0000-0000',
    company: 'Company / Brand Name', companyPlaceholder: 'HI-OP Marketing',
    inquiry: 'Inquiry', inquiryPlaceholder: 'Tell us about your current challenges or advertising goals.',
    submit: 'Apply for Free Diagnosis →', submitting: 'Submitting...',
    successTitle: 'Application Complete!',
    successMsg: 'Successfully submitted.\nOur team will contact you within 24 hours.',
    labelName: 'Name', labelEmail: 'Email', labelPhone: 'Phone',
    kakao: 'KakaoTalk Live Chat',
  },
};

export default function LeadForm({ source = 'hi-op', lang = 'ko' }) {
  const s = t[lang] || t.ko;
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', inquiry: '',
  });
  const [submittedData, setSubmittedData] = useState({});
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

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

    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || '제출 중 오류가 발생했습니다.');

      setSubmittedData({ ...formData });
      setStatus('success');

      if (typeof window !== 'undefined' && window.fbq) {
        const phoneDigits = formData.phone.replace(/[^0-9]/g, '');
        const ln = formData.name.slice(0, 1);
        const fn = formData.name.slice(1);

        window.fbq('init', '1715625702927911', {
          em: formData.email.trim().toLowerCase(),
          ph: '82' + (phoneDigits.startsWith('0') ? phoneDigits.slice(1) : phoneDigits),
          fn,
          ln,
        });
        window.fbq('track', 'Lead', {
          content_name: formData.company || 'general',
        }, { eventID: data.eventId });
      }

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
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
        <h3 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>{s.successTitle}</h3>
        <p style={{ fontWeight: 800, marginBottom: '2rem', fontSize: '1.1rem' }}>
          {s.successMsg.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}
        </p>

        <div style={{ background: '#000', color: '#fff', padding: '1.5rem', textAlign: 'left', marginBottom: '2rem', border: '3px solid #000' }}>
          {[{ label: s.labelName, value: submittedData.name },
            { label: s.labelEmail, value: submittedData.email },
            { label: s.labelPhone, value: submittedData.phone }].map(r => (
            <div key={r.label} style={{ marginBottom: '0.6rem', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 900, fontSize: '0.9rem', color: 'var(--hiop-orange)' }}>{r.label}</span>
              <span style={{ fontWeight: 700 }}>{r.value}</span>
            </div>
          ))}
        </div>

        <a
          href="https://open.kakao.com/o/srdaF2si"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-brutal"
          style={{ width: '100%', background: '#FEE500', color: '#000', border: '4px solid #000', boxShadow: '8px 8px 0 #000' }}
        >
          {s.kakao}
        </a>
      </motion.div>
    );
  }

  return (
    <div className="brutalist-card">
      <h3 style={{ fontSize: '2.2rem', marginBottom: '2.5rem' }}>{s.title}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label-brutal">{s.name}</label>
          <input name="name" type="text" className="form-input-brutal" placeholder={s.namePlaceholder}
            required value={formData.name} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label className="form-label-brutal">{s.email}</label>
          <input name="email" type="email" className="form-input-brutal" placeholder={s.emailPlaceholder}
            required value={formData.email} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label className="form-label-brutal">{s.phone}</label>
          <input name="phone" type="tel" className="form-input-brutal" placeholder={s.phonePlaceholder}
            required value={formData.phone} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label className="form-label-brutal">{s.company}</label>
          <input name="company" type="text" className="form-input-brutal" placeholder={s.companyPlaceholder}
            value={formData.company} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label className="form-label-brutal">{s.inquiry}</label>
          <textarea name="inquiry" className="form-input-brutal" placeholder={s.inquiryPlaceholder}
            style={{ minHeight: '140px' }} value={formData.inquiry} onChange={handleChange} />
        </div>

        <div className="form-group" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              required
              style={{ width: '20px', height: '20px', marginTop: '4px', cursor: 'pointer' }}
            />
            <span style={{ fontSize: '0.95rem', fontWeight: 700, lineHeight: 1.4 }}>
              {lang === 'ko' ? (
                <>
                  <Link href="/privacy" target="_blank" style={{ color: 'var(--hiop-orange)', textDecoration: 'underline' }}>개인정보 수집 및 이용</Link>에 동의합니다. (필수)
                </>
              ) : (
                <>
                  I agree to the <Link href="/privacy" target="_blank" style={{ color: 'var(--hiop-orange)', textDecoration: 'underline' }}>collection and use of personal information</Link>. (Required)
                </>
              )}
            </span>
          </label>
        </div>

        {status === 'error' && (
          <div style={{ background: '#ff000015', padding: '1.2rem', border: '3px solid #ff0000', marginBottom: '2rem', fontWeight: 800, color: '#d00' }}>
            {errorMessage}
          </div>
        )}

        <button type="submit" className="btn-brutal primary" style={{ width: '100%' }}
          disabled={status === 'submitting'}>
          {status === 'submitting' ? s.submitting : s.submit}
        </button>
      </form>
    </div>
  );
}

import Link from 'next/link';
