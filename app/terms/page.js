'use client';

import { useLang } from '../../hooks/useLang';

const content = {
  ko: {
    title: '이용약관',
    sections: [
      {
        title: '제1조 (목적)',
        content: '본 약관은 히옵(HI-OP, 이하 "회사")이 운영하는 웹사이트에서 제공하는 제반 서비스의 이용조건 및 절차, 회사와 이용자의 권리, 의무 및 책임사항 등을 규정함을 목적으로 합니다.'
      },
      {
        title: '제2조 (서비스의 제공 및 변경)',
        content: '회사는 디지털 마케팅 컨설팅, 광고 대행, 웹사이트 제작 및 관련 교육 서비스 등을 제공합니다. 서비스의 내용이 변경되는 경우 회사는 지체 없이 이용자에게 통지합니다.'
      },
      {
        title: '제3조 (이용자의 의무)',
        content: '이용자는 관련 법령, 본 약관의 규정, 이용안내 및 서비스와 관련하여 공지한 주의사항을 준수하여야 하며, 회사의 업무에 방해되는 행위를 하여서는 안 됩니다.'
      }
    ],
    footer: '본 약관은 2025년 5월 10일부터 시행됩니다.'
  },
  en: {
    title: 'Terms of Service',
    sections: [
      {
        title: 'Article 1 (Purpose)',
        content: 'The purpose of these terms is to prescribe the conditions and procedures for using the services provided by HI-OP ("Company").'
      }
    ],
    footer: 'Effective Date: May 10, 2025'
  }
};

export default function TermsPage() {
  const [lang] = useLang();
  const c = content[lang] || content.ko;

  return (
    <main className="bg-light min-h-screen pb-20">
      <nav style={{ padding: '1.5rem 2rem', borderBottom: '4px solid var(--border-dark)' }}>
        <div className="font-display" style={{ fontSize: '2rem' }}>HI-OP / TERMS</div>
      </nav>
      <div className="wrap" style={{ marginTop: '5rem', maxWidth: '900px' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '3rem', fontFamily: 'Black Han Sans, sans-serif' }}>{c.title}</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {c.sections.map((s, i) => (
            <section key={i}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 800 }}>{s.title}</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#333' }}>{s.content}</p>
            </section>
          ))}
        </div>
        <p style={{ marginTop: '5rem', fontWeight: 800, color: '#666' }}>{c.footer}</p>
      </div>
    </main>
  );
}
