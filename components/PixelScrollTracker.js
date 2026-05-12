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
        window.removeEventListener('scroll', handleScroll);

        const eventId = crypto.randomUUID();
        window.fbq('track', 'ViewContent', { content_name: 'landing_page' }, { eventID: eventId });

        const getCookie = (name) => {
          const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
          return match ? match[2] : null;
        };
        const fbc = getCookie('_fbc') || (() => {
          const fbclid = new URLSearchParams(window.location.search).get('fbclid');
          return fbclid ? `fb.1.${Date.now()}.${fbclid}` : null;
        })();
        const fbp = getCookie('_fbp') || null;

        fetch('/api/track-view', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventId,
            eventSourceUrl: window.location.href,
            fbc,
            fbp,
          }),
        }).catch(() => {});
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
}
