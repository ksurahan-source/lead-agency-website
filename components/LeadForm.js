'use client';

import { useState } from 'react';
import Link from 'next/link';
import { captureMetaAttribution } from '@/lib/browserMetaAttribution';

const t = {
  ko: {
    lead: {
      title: '무료 진단 신청',
      company: '회사명 / 서비스명',
      companyPlaceholder: '하이옵 마케팅',
      inquiry: '현재 문의 상황',
      inquiryPlaceholder: '현재 운영 중인 매체, 월 광고비, 문의가 막히는 지점을 간단히 적어주세요.',
      submit: '무료 진단 신청하기 →',
    },
    ecom: {
      title: '이커머스 성장 진단 신청',
      company: '브랜드명 / 스토어명',
      companyPlaceholder: '하이옵 스토어',
      inquiry: '현재 매출 / 광고 상황',
      inquiryPlaceholder: '월 매출, 월 광고비, 주요 판매채널, ROAS 고민을 간단히 적어주세요.',
      submit: '이커머스 진단 신청하기 →',
    },
    video: {
      title: '영상 제작 신청',
      company: '가게명 / 업종',
      companyPlaceholder: '예) 망원동 OO카페 (카페)',
      inquiry: '어떤 영상이 필요하세요?',
      inquiryPlaceholder: '업종, 위치, 알리고 싶은 메뉴·서비스를 간단히 적어주세요. 인스타/플레이스 링크가 있으면 함께 남겨주세요.',
      submit: '5만원 영상 제작 신청하기 →',
    },
    name: '성함 *', namePlaceholder: '홍길동',
    email: '이메일 *', emailPlaceholder: 'example@naver.com',
    phone: '연락처 *', phonePlaceholder: '010-0000-0000',
    submitting: '제출 중...',
    successTitle: '신청 완료!',
    successMsg: '성공적으로 접수되었습니다.\n24시간 내로 담당자가 연락드립니다.',
    labelName: '성함', labelEmail: '이메일', labelPhone: '연락처',
    kakao: '카카오톡 실시간 문의',
  },
  en: {
    lead: {
      title: 'Free Diagnosis',
      company: 'Company / Service Name',
      companyPlaceholder: 'HI-OB Marketing',
      inquiry: 'Current lead generation situation',
      inquiryPlaceholder: 'Tell us your channels, monthly ad spend, and where inquiries seem to stall.',
      submit: 'Apply for Free Diagnosis →',
    },
    ecom: {
      title: 'Ecommerce Growth Diagnosis',
      company: 'Brand / Store Name',
      companyPlaceholder: 'HI-OB Store',
      inquiry: 'Current sales / advertising situation',
      inquiryPlaceholder: 'Share monthly revenue, ad spend, sales channels, and your ROAS challenge.',
      submit: 'Apply for Ecommerce Diagnosis →',
    },
    video: {
      title: 'Request Your Video',
      company: 'Store / Business Type',
      companyPlaceholder: 'e.g. Mangwon OO Cafe (Cafe)',
      inquiry: 'What kind of video do you need?',
      inquiryPlaceholder: 'Tell us your business type, location, and what you want to promote. Add your Instagram / Place link if you have one.',
      submit: 'Request Video for ₩50,000 →',
    },
    name: 'Name *', namePlaceholder: 'John Doe',
    email: 'Email *', emailPlaceholder: 'example@company.com',
    phone: 'Phone *', phonePlaceholder: '010-0000-0000',
    submitting: 'Submitting...',
    successTitle: 'Application Complete!',
    successMsg: 'Successfully submitted.\nOur team will contact you within 24 hours.',
    labelName: 'Name', labelEmail: 'Email', labelPhone: 'Phone',
    kakao: 'KakaoTalk Live Chat',
  },
};

const normalizePhoneForKorea = (phone) => {
  const digits = phone.replace(/[^0-9]/g, '');
  return '82' + (digits.startsWith('0') ? digits.slice(1) : digits);
};

const splitKoreanName = (name) => ({
  lastName: name.trim().slice(0, 1),
  firstName: name.trim().slice(1),
});

const hashData = async (value) => {
  if (!value || typeof crypto === 'undefined' || !crypto.subtle) return undefined;
  const encoded = new TextEncoder().encode(value.toString().trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
  return Array.from(new Uint8Array(hashBuffer))
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
};

export default function LeadForm({ source = 'hi-op', lang = 'ko', variant = 'lead' }) {
  const s = t[lang] || t.ko;
  const formCopy = s[variant] || s.lead;
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
      const { fbc, fbp, fbclid } = captureMetaAttribution();
      const eventSourceUrl = window.location.href;
      const contentName = formData.company || 'general';
      const eventValue = 300000;
      const eventCurrency = 'KRW';

      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source,
          pageUrl: eventSourceUrl,
          fbc,
          fbp,
          fbclid,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || '제출 중 오류가 발생했습니다.');

      setSubmittedData({ ...formData });
      setStatus('success');

      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Lead', {
          content_name: contentName,
          value: eventValue,
          currency: eventCurrency,
        }, { eventID: data.eventId });
      }

      if (typeof window !== 'undefined' && window.dataLayer) {
        const phoneNumber = normalizePhoneForKorea(formData.phone);
        const { firstName, lastName } = splitKoreanName(formData.name);
        const externalId = await hashData(formData.email);
        const emailAddress = formData.email.trim().toLowerCase();
        const hashedPhoneNumber = await hashData(phoneNumber);
        const hashedFirstName = await hashData(firstName);
        const hashedLastName = await hashData(lastName);
        const leadCompany = formData.company || '';

        window.dataLayer.push({
          event: 'generate_lead',
          event_id: data.eventId,
          event_name: 'Lead',
          action_source: 'website',
          event_source_url: window.location.href,
          page_location: window.location.href,
          page_referrer: document.referrer,
          page_title: document.title,
          content_name: contentName,
          lead_company: leadCompany,
          lead_source: source,
          value: eventValue,
          currency: eventCurrency,
          fbp,
          fbc,
          fbclid,
          external_id: externalId,
          'x-fb-ud-em': externalId,
          'x-fb-ud-ph': hashedPhoneNumber,
          'x-fb-ud-fn': hashedFirstName,
          'x-fb-ud-ln': hashedLastName,
          'x-fb-ud-external_id': externalId,
          'x-fb-ck-fbp': fbp,
          'x-fb-ck-fbc': fbc,
          'x-fb-cd-content_name': contentName,
          custom_properties: JSON.stringify({
            lead_company: leadCompany,
            lead_source: source,
            page_title: document.title,
          }),
          user_data: {
            email: emailAddress,
            email_address: emailAddress,
            phone_number: phoneNumber,
            external_id: externalId,
            first_name: firstName,
            last_name: lastName,
            address: {
              first_name: firstName,
              last_name: lastName,
            },
          },
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
      <div
        className="brutalist-card"
        style={{ background: 'var(--hiob-orange)', textAlign: 'center' }}
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
              <span style={{ fontWeight: 900, fontSize: '0.9rem', color: 'var(--hiob-orange)' }}>{r.label}</span>
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
      </div>
    );
  }

  return (
    <div className="brutalist-card">
      <h3 style={{ fontSize: '2.2rem', marginBottom: '2.5rem' }}>{formCopy.title}</h3>
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
          <label className="form-label-brutal">{formCopy.company}</label>
          <input name="company" type="text" className="form-input-brutal" placeholder={formCopy.companyPlaceholder}
            value={formData.company} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label className="form-label-brutal">{formCopy.inquiry}</label>
          <textarea name="inquiry" className="form-input-brutal" placeholder={formCopy.inquiryPlaceholder}
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
                  <Link href="/privacy" target="_blank" style={{ color: 'var(--hiob-orange)', textDecoration: 'underline' }}>개인정보 수집 및 이용</Link>에 동의합니다. (필수)
                </>
              ) : (
                <>
                  I agree to the <Link href="/privacy" target="_blank" style={{ color: 'var(--hiob-orange)', textDecoration: 'underline' }}>collection and use of personal information</Link>. (Required)
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
          {status === 'submitting' ? s.submitting : formCopy.submit}
        </button>
      </form>
    </div>
  );
}
