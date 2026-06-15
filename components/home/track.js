'use client';

import { captureMetaAttribution } from '@/lib/browserMetaAttribution';

// Shared dataLayer push for the homepage. Matches the schema used by
// TrackingBridge / CreativeVelocityForm so server-side GTM (sGTM) and the
// Meta CAPI tag can consume new homepage signals with the same dedup +
// x-fb-* conventions. These are NON-breaking additions to the GTM contract.

const pageContext = () => {
  if (typeof window === 'undefined') return {};
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

const newId = (prefix) =>
  (typeof window !== 'undefined' && window.crypto?.randomUUID?.()) || `${prefix}-${Date.now()}`;

export const pushDataLayer = (event, payload = {}) => {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    event_id: newId(event),
    currency: 'KRW',
    ...pageContext(),
    ...payload,
  });
};

export const trackCta = (location, label) =>
  pushDataLayer('cta_click', {
    event_name: 'cta_click',
    cta_location: location,
    content_name: label,
    'x-fb-cd-content_name': label,
    custom_properties: JSON.stringify({ signal_type: 'cta_click', cta_location: location }),
  });

export const trackReel = (name) =>
  pushDataLayer('reel_play', {
    event_name: 'reel_play',
    content_name: name,
    'x-fb-cd-content_name': name,
    custom_properties: JSON.stringify({ signal_type: 'reel_play', reel: name }),
  });
