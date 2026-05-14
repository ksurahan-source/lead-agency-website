'use client';

import { useEffect } from 'react';
import { captureMetaAttribution } from '@/lib/browserMetaAttribution';

const getPageContext = () => {
  const { fbp, fbc, fbclid } = captureMetaAttribution();

  return {
    action_source: 'website',
    event_source_url: window.location.href,
    page_location: window.location.href,
    page_referrer: document.referrer,
    page_title: document.title,
    page_path: window.location.pathname,
    fbp,
    fbc,
    fbclid,
    'x-fb-ck-fbp': fbp,
    'x-fb-ck-fbc': fbc,
  };
};

const pushEvent = (event, extra = {}) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    event_id: crypto.randomUUID(),
    currency: 'KRW',
    ...getPageContext(),
    ...extra,
  });
};

const getOrCreatePageViewEventId = () => {
  window.__hiobPageViewEventId = window.__hiobPageViewEventId || crypto.randomUUID();
  return window.__hiobPageViewEventId;
};

const scheduleIdle = (callback) => {
  if ('requestIdleCallback' in window) {
    return {
      type: 'idle',
      id: window.requestIdleCallback(callback, { timeout: 2500 }),
    };
  }

  return {
    type: 'timeout',
    id: window.setTimeout(callback, 1200),
  };
};

const cancelIdle = (handle) => {
  if (!handle) return;

  if (handle.type === 'idle') {
    window.cancelIdleCallback(handle.id);
    return;
  }

  window.clearTimeout(handle.id);
};

const trackViewContent = (eventId, extra = {}) => {
  if (!window.fbq) return;
  window.fbq('track', 'ViewContent', {
    content_name: extra.content_name || document.title,
    value: extra.value,
    currency: 'KRW',
  }, { eventID: eventId });
};

export default function TrackingBridge() {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const pageViewEventId = getOrCreatePageViewEventId();

    pushEvent('hiob_page_view', {
      event_id: pageViewEventId,
      event_name: 'PageView',
      value: 1,
      currency: 'KRW',
      content_name: document.title,
      'x-fb-cd-content_name': document.title,
      custom_properties: JSON.stringify({ signal_type: 'page_view' }),
    });

    const serverPageViewHandle = scheduleIdle(() => {
      fetch('/api/track-view', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
        body: JSON.stringify({
          eventSourceUrl: window.location.href,
          ...captureMetaAttribution(),
          eventId: pageViewEventId,
          eventName: 'PageView',
          contentName: document.title,
          value: 1,
          currency: 'KRW',
        }),
      }).catch(() => {});
    });

    const scrollSignals = [
      { threshold: 25, value: 3 },
      { threshold: 50, value: 9 },
      { threshold: 75, value: 27 },
      { threshold: 90, value: 50 },
    ];
    const firedScrollThresholds = new Set();

    const handleScrollDepth = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight <= 0
        ? 100
        : Math.round((window.scrollY / scrollableHeight) * 100);

      scrollSignals.forEach(({ threshold, value }) => {
        if (progress < threshold || firedScrollThresholds.has(threshold)) return;
        firedScrollThresholds.add(threshold);

        const eventId = crypto.randomUUID();
        const payload = {
          event_id: eventId,
          event_name: 'ViewContent',
          value,
          scroll_threshold: threshold,
          content_name: `scroll_${threshold}`,
          'x-fb-cd-content_name': `scroll_${threshold}`,
          custom_properties: JSON.stringify({
            signal_type: 'scroll_depth',
            scroll_threshold: threshold,
            page_path: window.location.pathname,
          }),
        };

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'hiob_scroll_depth',
          currency: 'KRW',
          ...getPageContext(),
          ...payload,
        });

        trackViewContent(eventId, payload);
      });
    };

    const timers = [
      { event: 'stay_3min', minutes: 3, value: 100, sendPixel: false },
      { event: 'stay_7min', minutes: 7, value: 1000, sendPixel: true },
      { event: 'stay_20min', minutes: 20, value: 5000, sendPixel: true },
    ].map(({ event, minutes, value, sendPixel }) => window.setTimeout(() => {
      const eventId = crypto.randomUUID();
      const payload = {
        event_id: eventId,
        event_name: sendPixel ? 'ViewContent' : 'stay_duration',
        value,
        duration_min: minutes,
        content_name: `${minutes}min_stay`,
        'x-fb-cd-content_name': `${minutes}min_stay`,
        custom_properties: JSON.stringify({
          signal_type: 'stay_duration',
          duration_min: minutes,
          page_path: window.location.pathname,
        }),
      };

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event,
        currency: 'KRW',
        ...getPageContext(),
        ...payload,
      });

      if (sendPixel) {
        trackViewContent(eventId, payload);
      }
    }, minutes * 60 * 1000));

    const handleKakaoClick = (event) => {
      const link = event.target.closest?.('a[href*="open.kakao.com"]');
      if (!link) return;

      const eventId = crypto.randomUUID();
      const payload = {
        event_id: eventId,
        event_name: 'Contact',
        value: 50000,
        content_name: 'kakao_chat_click',
        link_url: link.href,
        'x-fb-cd-content_name': 'kakao_chat_click',
        custom_properties: JSON.stringify({
          signal_type: 'contact',
          contact_channel: 'kakao',
          link_url: link.href,
        }),
      };

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'kakao_chat_click',
        currency: 'KRW',
        ...getPageContext(),
        ...payload,
      });

      if (window.fbq) {
        window.fbq('track', 'Contact', {
          content_name: 'kakao_chat_click',
          value: 50000,
          currency: 'KRW',
        }, { eventID: eventId });
      }
    };

    document.addEventListener('click', handleKakaoClick);
    window.addEventListener('scroll', handleScrollDepth, { passive: true });
    handleScrollDepth();

    return () => {
      cancelIdle(serverPageViewHandle);
      timers.forEach(timer => window.clearTimeout(timer));
      document.removeEventListener('click', handleKakaoClick);
      window.removeEventListener('scroll', handleScrollDepth);
    };
  }, []);

  return null;
}
