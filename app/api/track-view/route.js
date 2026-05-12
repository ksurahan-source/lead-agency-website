import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

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
    const { eventSourceUrl, fbc, fbp, eventId } = body;

    const clientIp = request.headers.get('CF-Connecting-IP')
      || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
    const userAgent = request.headers.get('user-agent');

    const env = getEnv();
    const PIXEL_ID = '1715625702927911';
    const ACCESS_TOKEN = env.META_ACCESS_TOKEN || 'EAASW8xJXY4gBRZAchAScwjhAZBPyzZB9aQRQuPsoPyM5iZB8aSEtz9srdjUNJrZAVPC98qhoZC72bTGgElIx9tc8B8Xg2swqaSUBssaYykj5iT0WHSjFgu0Y3wUfdVusYXWB0OtbiGqUlbDEZAntQ5V3WMHHhADF7fFkZA62oCTwQISt14zIF1S9fqu2wUoVNAZDZD';

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

    await fetch(`https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`, {
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
