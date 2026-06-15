'use client';

import { useEffect } from 'react';
import { pushDataLayer } from '@/components/home/track';

// Explicit business-line signal for the /lead landing.
// The root layout already loads GTM + GA4 + Meta Pixel and fires page_view,
// scroll-depth, stay-duration, and form events on every route (incl. /lead).
// This adds one GA4/GTM-consumable event so the "lead" business can be
// segmented as its own content_group / funnel, separate from ecommerce (/).
export default function LeadPageSignal() {
  useEffect(() => {
    pushDataLayer('business_line_view', {
      event_name: 'business_line_view',
      business_line: 'lead',
      content_group: 'lead',
      content_name: 'lead_landing',
      'x-fb-cd-content_name': 'lead_landing',
      custom_properties: JSON.stringify({
        signal_type: 'business_line',
        business_line: 'lead',
      }),
    });
  }, []);

  return null;
}
