'use client';

import { useEffect } from 'react';

const interactionEvents = ['pointerdown', 'keydown', 'scroll', 'touchstart'];

const appendScript = (id, src) => {
  if (!src || document.getElementById(id)) return;

  const script = document.createElement('script');
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
};

const initGtm = (gtmId, gtmServerUrl) => {
  if (!gtmId || window.__hiobGtmLoaded) return;

  window.__hiobGtmLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'gtm.start': Date.now(),
    event: 'gtm.js',
  });

  // First-party loading via the GCP server-side GTM container when configured
  // (ad-blocker / ITP resilient). Falls back to Google's CDN otherwise.
  const base = gtmServerUrl ? gtmServerUrl.replace(/\/+$/, '') : 'https://www.googletagmanager.com';
  appendScript('hiob-gtm', `${base}/gtm.js?id=${encodeURIComponent(gtmId)}`);
};

const getOrCreatePageViewEventId = () => {
  window.__hiobPageViewEventId = window.__hiobPageViewEventId || crypto.randomUUID();
  return window.__hiobPageViewEventId;
};

const initMetaPixel = (pixelId) => {
  if (!pixelId || window.__hiobMetaPixelLoaded) return;

  window.__hiobMetaPixelLoaded = true;

  if (!window.fbq) {
    const fbq = function fbq() {
      if (fbq.callMethod) {
        fbq.callMethod.apply(fbq, arguments);
      } else {
        fbq.queue.push(arguments);
      }
    };

    window.fbq = fbq;
    window._fbq = fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.queue = [];
  }

  appendScript('hiob-meta-pixel', 'https://connect.facebook.net/en_US/fbevents.js');
  window.fbq('init', pixelId);
  window.fbq('track', 'PageView', {}, { eventID: getOrCreatePageViewEventId() });
};

export default function DeferredAnalytics({ gtmId, pixelId, gtmServerUrl }) {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    window.dataLayer = window.dataLayer || [];

    const loadAnalytics = () => {
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, loadAnalytics);
      });

      const run = () => {
        initGtm(gtmId, gtmServerUrl);
        initMetaPixel(pixelId);
      };

      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(run, { timeout: 1500 });
      } else {
        window.setTimeout(run, 250);
      }
    };

    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, loadAnalytics, { passive: true, once: true });
    });

    // Fallback: load anyway after 3s so bouncers (no scroll/click/keypress)
    // still register a PageView in GTM/Pixel. Without this, ~30% of arriving
    // sessions fire zero events anywhere.
    const fallbackTimer = window.setTimeout(loadAnalytics, 3000);

    return () => {
      window.clearTimeout(fallbackTimer);
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, loadAnalytics);
      });
    };
  }, [gtmId, pixelId, gtmServerUrl]);

  return null;
}
