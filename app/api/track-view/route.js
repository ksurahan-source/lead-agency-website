import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import { resolveFbc } from '@/lib/metaAttribution';

export const runtime = 'edge';

const getEnv = () => {
  try {
    return getRequestContext().env;
  } catch {
    return process.env;
  }
};

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      eventSourceUrl,
      fbc: clientFbc,
      fbp,
      fbclid,
      eventId,
    } = body;

    const clientIp = request.headers.get('CF-Connecting-IP')
      || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
    const userAgent = request.headers.get('user-agent');
    const fbc = resolveFbc({
      cookieHeader: request.headers.get('cookie'),
      bodyFbc: clientFbc,
      bodyFbclid: fbclid,
      pageUrl: eventSourceUrl,
      referer: request.headers.get('referer'),
    });

    const env = getEnv();
    const PIXEL_ID = env.META_PIXEL_ID || '1715625702927911';
    const ACCESS_TOKEN = env.META_ACCESS_TOKEN;
    const GRAPH_API_VERSION = env.META_GRAPH_API_VERSION || 'v25.0';

    if (!ACCESS_TOKEN) {
      return NextResponse.json({ success: true, capiStatus: 'not_configured' });
    }

    const testEventCode = env.META_TEST_EVENT_CODE;

    const capiPayload = {
      ...(testEventCode && { test_event_code: testEventCode }),
      data: [{
        event_name: 'ViewContent',
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: eventSourceUrl || 'https://hi-ob.com',
        event_id: eventId,
        user_data: {
          ...(fbc && { fbc }),
          ...(fbp && { fbp }),
          ...(clientIp && { client_ip_address: clientIp }),
          ...(userAgent && { client_user_agent: userAgent }),
        },
      }],
    };

    await fetch(`https://graph.facebook.com/${GRAPH_API_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(capiPayload),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[track-view CAPI Error]', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
