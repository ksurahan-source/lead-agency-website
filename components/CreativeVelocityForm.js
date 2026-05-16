'use client';

import { useState } from 'react';
import Link from 'next/link';
import { captureMetaAttribution } from '@/lib/browserMetaAttribution';

const initialForm = {
  brand: '',
  website: '',
  adSpend: '',
  roasCac: '',
  creativeVolume: '',
  bottleneck: '',
  filming: '',
  contact: '',
  name: '',
  email: '',
};

const spendOptions = ['₩1,000만 미만', '₩1,000만-₩3,000만', '₩3,000만-₩5,000만', '₩5,000만 이상'];
const creativeOptions = ['월 5개 미만', '월 5-15개', '월 15-30개', '월 30개 이상'];
const bottleneckOptions = ['소재 피로도', '테스트 속도 부족', 'CAC 상승', '내부 제작 리소스 부족', '데이터/추적 불명확'];
const filmingOptions = ['가능', '일부 가능', '어려움', '확인 필요'];

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
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
};

function SelectField({ label, name, value, options, onChange, required = true }) {
  const fieldId = `cv-${name}`;

  return (
    <div className="cv-form-field">
      <label htmlFor={fieldId}>{label}</label>
      <select id={fieldId} name={name} value={value} onChange={onChange} required={required}>
        <option value="">선택</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default function CreativeVelocityForm({
  source = 'creative_velocity_home',
  eyebrow = '무료 진단',
  title = '무료 소재 병목 진단 신청',
  description = '월 광고비, 소재 제작량, 내부 촬영 가능 여부를 기준으로 소재 병목을 먼저 확인합니다.',
  submitLabel = '무료 소재 병목 진단 신청',
  successTitle = '무료 소재 병목 진단 신청이 접수되었습니다.',
}) {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const buildInquiry = () => [
    `[${title}]`,
    `브랜드명: ${formData.brand}`,
    `웹사이트: ${formData.website}`,
    `월 광고비: ${formData.adSpend}`,
    `현재 ROAS/CAC: ${formData.roasCac || '미입력'}`,
    `월 제작 소재 수: ${formData.creativeVolume}`,
    `가장 큰 문제: ${formData.bottleneck}`,
    `내부 촬영 가능 여부: ${formData.filming}`,
  ].join('\n');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: 'creative_velocity_form_attempt' });
    }

    try {
      const { fbc, fbp, fbclid } = captureMetaAttribution();
      const eventSourceUrl = window.location.href;
      const eventValue = 300000;
      const eventCurrency = 'KRW';

      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name || formData.brand,
          email: formData.email,
          phone: formData.contact,
          company: formData.brand,
          inquiry: buildInquiry(),
          source,
          pageUrl: eventSourceUrl,
          fbc,
          fbp,
          fbclid,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || '제출 중 오류가 발생했습니다.');

      setStatus('success');

      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Lead', {
          content_name: formData.brand || 'Creative Velocity Diagnosis',
          value: eventValue,
          currency: eventCurrency,
        }, { eventID: data.eventId });
      }

      if (typeof window !== 'undefined' && window.dataLayer) {
        const phoneNumber = normalizePhoneForKorea(formData.contact);
        const { firstName, lastName } = splitKoreanName(formData.name || formData.brand);
        const externalId = await hashData(formData.email);
        const hashedPhoneNumber = await hashData(phoneNumber);
        const hashedFirstName = await hashData(firstName);
        const hashedLastName = await hashData(lastName);

        window.dataLayer.push({
          event: 'generate_lead',
          event_id: data.eventId,
          event_name: 'Lead',
          action_source: 'website',
          event_source_url: eventSourceUrl,
          page_location: eventSourceUrl,
          page_referrer: document.referrer,
          page_title: document.title,
          content_name: formData.brand || 'Creative Velocity Diagnosis',
          lead_company: formData.brand,
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
          'x-fb-cd-content_name': formData.brand || 'Creative Velocity Diagnosis',
          custom_properties: JSON.stringify({
            ad_spend: formData.adSpend,
            creative_volume: formData.creativeVolume,
            bottleneck: formData.bottleneck,
            filming: formData.filming,
          }),
          user_data: {
            email: formData.email.trim().toLowerCase(),
            email_address: formData.email.trim().toLowerCase(),
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

      setFormData(initialForm);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message);
    }
  };

  if (status === 'success') {
    return (
      <div className="cv-form cv-form-success">
        <span>진단 신청 접수 완료</span>
        <h3>{successTitle}</h3>
        <p>브랜드의 소재 병목과 광고 구조를 확인한 뒤 24시간 내 연락드리겠습니다.</p>
        <a href="https://open.kakao.com/o/srdaF2si" target="_blank" rel="noopener noreferrer">
          카카오톡으로 바로 문의하기
        </a>
      </div>
    );
  }

  return (
    <form className="cv-form" onSubmit={handleSubmit}>
      <div className="cv-form-head">
        <span>{eyebrow}</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className="cv-form-grid">
        <label className="cv-form-field">
          <span>브랜드명 *</span>
          <input name="brand" value={formData.brand} onChange={handleChange} placeholder="브랜드명" required />
        </label>
        <label className="cv-form-field">
          <span>웹사이트 *</span>
          <input name="website" value={formData.website} onChange={handleChange} placeholder="브랜드 웹사이트 URL" required />
        </label>
      </div>

      <div className="cv-form-grid">
        <SelectField label="월 광고비 *" name="adSpend" value={formData.adSpend} options={spendOptions} onChange={handleChange} />
        <label className="cv-form-field">
          <span>현재 ROAS/CAC</span>
          <input name="roasCac" value={formData.roasCac} onChange={handleChange} placeholder="예: ROAS 240% / CAC 38,000원" />
        </label>
      </div>

      <div className="cv-form-grid">
        <SelectField label="월 제작 소재 수 *" name="creativeVolume" value={formData.creativeVolume} options={creativeOptions} onChange={handleChange} />
        <SelectField label="내부 촬영 가능 여부 *" name="filming" value={formData.filming} options={filmingOptions} onChange={handleChange} />
      </div>

      <SelectField label="가장 큰 문제 *" name="bottleneck" value={formData.bottleneck} options={bottleneckOptions} onChange={handleChange} />

      <div className="cv-form-grid">
        <label className="cv-form-field">
          <span>담당자명 *</span>
          <input name="name" value={formData.name} onChange={handleChange} placeholder="홍길동" required />
        </label>
        <label className="cv-form-field">
          <span>연락처 *</span>
          <input name="contact" type="tel" value={formData.contact} onChange={handleChange} placeholder="010-0000-0000" required />
        </label>
      </div>

      <label className="cv-form-field">
        <span>이메일 *</span>
        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="담당자 이메일 주소" required />
      </label>

      <label className="cv-consent">
        <input type="checkbox" required />
        <span>
          <Link href="/privacy" target="_blank">개인정보 수집 및 이용</Link>에 동의합니다. (필수)
        </span>
      </label>

      {status === 'error' && <div className="cv-form-error">{errorMessage}</div>}

      <button type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? '제출 중...' : submitLabel}
      </button>
    </form>
  );
}
