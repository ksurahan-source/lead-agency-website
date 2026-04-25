'use client';

import { useState } from 'react';

export default function LeadForm() {
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
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || '오류가 발생했습니다.');

      // 제출 데이터 저장 (성공 화면 표시용)
      setSubmittedData({ ...formData });
      setStatus('success');

      // GTM dataLayer push — GA4 & Meta Pixel 이벤트 트리거
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'generate_lead',
          event_id: data.eventId,
          lead_name:    formData.name,
          lead_email:   formData.email,
          lead_phone:   formData.phone,
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
      <div className="glass-form">
        <div className="success-box">
          <div className="success-icon">🎉</div>
          <h3>상담 신청이 완료되었습니다!</h3>
          <p style={{ margin: '0.5rem 0 1.5rem' }}>
            24시간 내로 담당자가 연락드릴 예정입니다.
          </p>

          {/* 제출 데이터 표시 — GTM/CAPI 데이터 레이어 확인용 */}
          <div className="success-summary">
            {[
              { label: '이름',    value: submittedData.name },
              { label: '이메일',  value: submittedData.email },
              { label: '연락처',  value: submittedData.phone },
              { label: '회사명',  value: submittedData.company || '-' },
            ].map(row => (
              <div key={row.label} className="success-row">
                <span className="success-row-label">{row.label}</span>
                <span className="success-row-value">{row.value}</span>
              </div>
            ))}
          </div>

          {/* 카카오 오픈채팅 버튼 */}
          <a
            href="https://open.kakao.com/o/sYX283ri"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-kakao"
          >
            <svg width="20" height="20" viewBox="0 0 48 48" fill="none" style={{ flexShrink: 0 }}>
              <ellipse cx="24" cy="22" rx="22" ry="18" fill="#3A1D1D" fillOpacity="0.15"/>
              <path d="M24 6C13.507 6 5 13.164 5 22c0 5.523 3.395 10.368 8.583 13.318L11.5 42l8.29-4.634C20.988 37.776 22.476 38 24 38c10.493 0 19-7.164 19-16S34.493 6 24 6Z" fill="#FEE500"/>
              <path d="M16 20.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5v5c0 .828-.672 1.5-1.5 1.5S16 26.328 16 25.5v-5ZM24 19h-2.5v8H24c2.21 0 4-1.79 4-4s-1.79-4-4-4Zm0 6h-1v-4h1c1.105 0 2 .895 2 2s-.895 2-2 2ZM30 19c-.828 0-1.5.672-1.5 1.5V27h5c.828 0 1.5-.672 1.5-1.5S34.328 24 33.5 24H30v-3.5c0-.828-.672-1.5-1.5-1.5Z" fill="#3C1E1E"/>
            </svg>
            카카오 오픈채팅으로 바로 문의하기
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-form">
      <h3>무료 상담 신청</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">이름 *</label>
          <input
            id="name" name="name" type="text"
            className="form-input" placeholder="홍길동"
            required value={formData.name} onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">이메일 *</label>
          <input
            id="email" name="email" type="email"
            className="form-input" placeholder="example@company.com"
            required value={formData.email} onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="phone">연락처 *</label>
          <input
            id="phone" name="phone" type="tel"
            className="form-input" placeholder="010-0000-0000"
            required value={formData.phone} onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="company">회사명 / 브랜드명</label>
          <input
            id="company" name="company" type="text"
            className="form-input" placeholder="히옵 컨설팅"
            value={formData.company} onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="inquiry">문의 내용</label>
          <textarea
            id="inquiry" name="inquiry"
            className="form-input" placeholder="현재 픽셀/CAPI 상황, 월 광고 예산, 궁금한 점 등을 자유롭게 적어주세요."
            value={formData.inquiry} onChange={handleChange}
          />
        </div>

        {status === 'error' && (
          <p className="form-error" style={{ marginBottom: '1rem' }}>{errorMessage}</p>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? '제출 중...' : '무료 상담 신청하기 →'}
        </button>
      </form>
    </div>
  );
}
