'use client';

import { useLang } from '../../hooks/useLang';

const content = {
  ko: {
    title: '개인정보 처리방침',
    intro: '히옵(HI-OP, 이하 "회사")은 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.',
    sections: [
      {
        title: '1. 개인정보의 처리 목적',
        content: '회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.\n1. 서비스 제공 및 운영: 디지털 마케팅 컨설팅, 광고 대행, 웹사이트 제작 및 관련 서비스 제공\n2. 고객 상담 및 응대: 서비스 문의에 대한 답변, 무료 진단 결과 통보, 상담 신청 처리\n3. 마케팅 및 광고에의 활용: 신규 서비스 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 및 참여기회 제공'
      },
      {
        title: '2. 처리하는 개인정보의 항목',
        content: '회사는 서비스 제공을 위해 다음과 같은 개인정보 항목을 수집하고 있습니다.\n- 필수항목: 성함, 이메일 주소, 연락처(전화번호)\n- 선택항목: 회사명/브랜드명, 문의내용, 접속 IP 정보, 쿠키, 서비스 이용 기록'
      },
      {
        title: '3. 개인정보의 처리 및 보유 기간',
        content: '회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.\n- 수집 및 이용 동의일로부터 3년 (단, 정보주체의 삭제 요청이 있을 경우 지체 없이 파기)'
      },
      {
        title: '4. 개인정보의 제3자 제공 및 위탁',
        content: '회사는 정보주체의 개인정보를 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다. 현재 회사는 개인정보를 외부에 제공하거나 위탁하고 있지 않습니다.'
      },
      {
        title: '5. 정보주체의 권리·의무 및 그 행사방법',
        content: '정보주체는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다. 권리 행사는 회사에 대해 서면, 전자우편 등을 통하여 하실 수 있으며 회사는 이에 대해 지체 없이 조치하겠습니다.'
      },
      {
        title: '6. 개인정보 보호책임자',
        content: '회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.\n- 개인정보 보호책임자: 최수라한\n- 연락처: info@hi-ob.com'
      }
    ],
    footer: '본 방침은 2025년 5월 10일부터 시행됩니다.'
  },
  en: {
    title: 'Privacy Policy',
    intro: 'HI-OP ("Company") establishes and discloses the following privacy policy in order to protect the personal information of data subjects and to process related grievances quickly and smoothly.',
    sections: [
      {
        title: '1. Purpose of Processing Personal Information',
        content: 'The company processes personal information for the following purposes. The personal information being processed will not be used for purposes other than the following purposes, and if the purpose of use is changed, necessary measures such as receiving separate consent will be implemented in accordance with Article 18 of the Personal Information Protection Act.'
      },
      {
        title: '2. Items of Personal Information Processed',
        content: '- Required: Name, Email, Phone number\n- Optional: Company/Brand Name, Inquiry details, IP address, Cookies, Usage logs'
      }
      // Simplified for brevity in EN, but full KO version is the primary legal one for Korea
    ],
    footer: 'Effective Date: May 10, 2025'
  }
};

export default function PrivacyPage() {
  const [lang] = useLang();
  const c = content[lang] || content.ko;

  return (
    <main className="bg-light min-h-screen pb-20">
      <nav style={{ padding: '1.5rem 2rem', borderBottom: '4px solid var(--border-dark)' }}>
        <div className="font-display" style={{ fontSize: '2rem' }}>HI-OP / PRIVACY</div>
      </nav>

      <div className="wrap" style={{ marginTop: '5rem', maxWidth: '900px' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '3rem', fontFamily: 'Pretendard Variable, Pretendard, Noto Sans KR, sans-serif' }}>{c.title}</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '4rem', fontWeight: 600, lineHeight: 1.8 }}>{c.intro}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          {c.sections.map((s, i) => (
            <section key={i}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', fontWeight: 800 }}>{s.title}</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: 2, whiteSpace: 'pre-line', color: '#333' }}>{s.content}</p>
            </section>
          ))}
        </div>

        <p style={{ marginTop: '6rem', fontWeight: 800, color: '#666' }}>{c.footer}</p>
      </div>
    </main>
  );
}
