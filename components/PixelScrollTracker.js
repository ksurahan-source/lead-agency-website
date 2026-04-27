'use client';

import { useEffect } from 'react';

export default function PixelScrollTracker() {
  useEffect(() => {
    let fired = false;

    const handleScroll = () => {
      if (fired || !window.fbq) return;
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (scrolled / total >= 0.5) {
        fired = true;
        window.fbq('track', 'ViewContent', { content_name: 'landing_page' });
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
}
