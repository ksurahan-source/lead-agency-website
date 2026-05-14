'use client';

import LeadForm from './LeadForm';

export default function LeadFormTop({
  eyebrow = '무료 진단',
  title = '광고비 누수 지점을 우선 진단합니다',
  description = '성과가 잘 보이지 않는 이유를 감으로 추측하지 않습니다. 계정, 이벤트, 랜딩, 소재 흐름을 먼저 확인하고 우선 개선 지점을 정리합니다.',
  bullets = ['전환 누락 체크', '랜딩 메시지 진단', '매체별 다음 액션 정리'],
  source = 'hi-ob-top',
  lang = 'ko',
  formVariant = 'lead',
  accent = 'var(--hiop-orange)',
}) {
  return (
    <section className="lead-form-top" style={{ '--lead-accent': accent }}>
      <div className="wrap lead-form-top-grid">
        <div className="lead-form-top-copy">
          <p className="lead-form-top-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="lead-form-top-description">{description}</p>
          <div className="lead-form-top-bullets">
            {bullets.map((bullet) => (
              <span key={bullet}>{bullet}</span>
            ))}
          </div>
        </div>
        <div className="lead-form-top-panel">
          <LeadForm source={source} lang={lang} variant={formVariant} />
        </div>
      </div>
    </section>
  );
}
