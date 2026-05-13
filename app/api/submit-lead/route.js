import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import {
  FBP_COOKIE_NAME,
  getCookieFromString,
  resolveFbc,
} from '@/lib/metaAttribution';

export const runtime = 'edge';

const hashData = async (data) => {
  if (!data) return undefined;
  const encoded = new TextEncoder().encode(data.toString().trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

// ── env 헬퍼: Edge Runtime에서는 getRequestContext().env 에서 읽어야 함
const getEnv = () => {
  try {
    return getRequestContext().env;
  } catch {
    return process.env; // local npm run dev fallback
  }
};

const normalizePhoneForKorea = (phone) => {
  const digits = phone.replace(/[^0-9]/g, '');
  return '82' + (digits.startsWith('0') ? digits.slice(1) : digits);
};

const splitKoreanName = (name) => ({
  lastName: name.trim().slice(0, 1),
  firstName: name.trim().slice(1),
});

const getEventSourceUrl = (request, pageUrl) => {
  try {
    const url = new URL(pageUrl || request.headers.get('referer') || request.url);
    if (url.protocol === 'http:' || url.protocol === 'https:') {
      return url.href;
    }
  } catch {}
  return 'https://hi-ob.com';
};

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      company,
      inquiry,
      source,
      pageUrl,
      fbc: clientFbc,
      fbp: clientFbp,
      fbclid,
    } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ message: '필수 항목이 누락되었습니다.' }, { status: 400 });
    }

    const env = getEnv();

    const eventId = crypto.randomUUID();

    // ── 1. 리드 저장 (D1)
    const DB = env.DB;
    if (!DB) {
      console.error('[Lead DB Error]', 'DB binding is not configured');
      return NextResponse.json({ message: '리드 저장소가 설정되지 않았습니다.' }, { status: 503 });
    }

    await DB.prepare(`
      INSERT INTO leads (id, name, email, phone, company, inquiry, status, source, created_at)
      VALUES (?, ?, ?, ?, ?, ?, 'new', ?, datetime('now'))
    `).bind(eventId, name, email, phone, company || '', inquiry || '', source || 'hi-op').run();

    console.log('[NEW LEAD]', { name, email, company });

    // ── 2. Meta CAPI (함수 내부에서 env 읽기)
    const PIXEL_ID = env.META_PIXEL_ID || '1715625702927911';
    const ACCESS_TOKEN = env.META_ACCESS_TOKEN;
    const CAPI_MODE = env.META_CAPI_MODE || 'gtm_server';
    const GRAPH_API_VERSION = env.META_GRAPH_API_VERSION || 'v25.0';
    let capiStatus = CAPI_MODE === 'direct' ? 'not_configured' : 'delegated_to_gtm_server';

    if (CAPI_MODE === 'direct' && PIXEL_ID && ACCESS_TOKEN) {
      const { firstName, lastName } = splitKoreanName(name);
      const cookieHeader = request.headers.get('cookie');
      const referer = request.headers.get('referer');
      const fbc = resolveFbc({
        cookieHeader,
        bodyFbc: clientFbc,
        bodyFbclid: fbclid,
        pageUrl,
        referer,
      });
      const userData = {
        em: [await hashData(email)],
        ph: [await hashData(normalizePhoneForKorea(phone))],
        fn: [await hashData(firstName)],
        ln: [await hashData(lastName)],
        client_ip_address:
          request.headers.get('cf-connecting-ip') ||
          request.headers.get('x-forwarded-for')?.split(',')[0]?.trim(),
        client_user_agent: request.headers.get('user-agent') || undefined,
        fbp: getCookieFromString(cookieHeader, FBP_COOKIE_NAME) || clientFbp,
        fbc,
        external_id: email ? await hashData(email.trim().toLowerCase()) : undefined,
      };

      const testEventCode = env.META_TEST_EVENT_CODE;

      const capiPayload = {
        ...(testEventCode && { test_event_code: testEventCode }),
        data: [{
          event_name: 'Lead',
          event_time: Math.floor(Date.now() / 1000),
          action_source: 'website',
          event_source_url: getEventSourceUrl(request, pageUrl),
          event_id: eventId,
          user_data: Object.fromEntries(
            Object.entries(userData).filter(([, value]) => value !== undefined)
          ),
          custom_data: { company_name: company },
        }],
      };

      try {
        const capiResponse = await fetch(`https://graph.facebook.com/${GRAPH_API_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(capiPayload),
        });
        const capiBody = await capiResponse.json().catch(() => ({}));
        capiStatus = capiResponse.ok ? 'sent' : 'failed';
        if (!capiResponse.ok) {
          console.error('[CAPI Error]', {
            status: capiResponse.status,
            error: capiBody.error,
          });
        }
      } catch (err) {
        capiStatus = 'failed';
        console.error('[CAPI Error]', err);
      }
    }

    return NextResponse.json({ success: true, eventId, capiStatus });

  } catch (error) {
    console.error('[API Error]', error);
    return NextResponse.json({ message: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
