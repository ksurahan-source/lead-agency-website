'use client';
import { useState, useEffect } from 'react';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  // GTM Custom Event Trigger Example
  const trackChatOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen && typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: 'chat_opened' });
    }
  };

  const trackPhoneClick = () => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: 'phone_call_clicked' });
    }
  };

  return (
    <div className="floating-contact">
      {isOpen && (
        <div className="chat-window fade-up">
          <div className="chat-header">
            <h4>Chart Leaders 고객센터</h4>
            <button className="chat-close" onClick={() => setIsOpen(false)}>✕</button>
          </div>
          <div className="chat-body">
            <p>안녕하세요! 글로벌 트레이딩의 정석, Chart Leaders입니다.<br/>무엇을 도와드릴까요?</p>
            <div style={{marginTop: '1.5rem'}}>
              <a href="#" className="btn btn-primary" style={{display: 'block', textAlign: 'center', fontSize: '0.9rem', padding: '0.8rem', textDecoration: 'none'}}>
                카카오톡 실시간 상담
              </a>
            </div>
          </div>
        </div>
      )}
      
      <div className="floating-buttons">
        <a href="tel:02-1234-5678" onClick={trackPhoneClick} className="float-btn phone" title="전화 상담">
          📞
        </a>
        <button onClick={trackChatOpen} className="float-btn chat" title="1:1 채팅">
          💬
        </button>
      </div>
    </div>
  );
}
