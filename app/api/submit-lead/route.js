import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

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

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, inquiry, source } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ message: '필수 항목이 누락되었습니다.' }, { status: 400 });
    }

    const env = getEnv();

    const eventId = crypto.randomUUID();

    // ── 1. 리드 저장 (D1)
    const DB = env.DB;
    if (DB) {
      await DB.prepare(`
        INSERT INTO leads (id, name, email, phone, company, inquiry, status, source, created_at)
        VALUES (?, ?, ?, ?, ?, ?, 'new', ?, datetime('now'))
      `).bind(eventId, name, email, phone, company || '', inquiry || '', source || 'hi-op').run();
    }

    console.log('[NEW LEAD]', { name, email, company });

    // ── 2. Meta CAPI (함수 내부에서 env 읽기)
    const PIXEL_ID = env.META_PIXEL_ID;
    const ACCESS_TOKEN = env.META_ACCESS_TOKEN;

    if (PIXEL_ID && ACCESS_TOKEN) {
      const nameParts = name.split(' ');
      const fn = nameParts[0] || '';
      const ln = nameParts.slice(1).join(' ');

      const capiPayload = {
        data: [{
          event_name: 'Lead',
          event_time: Math.floor(Date.now() / 1000),
          action_source: 'website',
          event_id: eventId,
          user_data: {
            em: [await hashData(email)],
            ph: [await hashData(phone)],
            fn: [await hashData(fn)],
            ln: [await hashData(ln)],
          },
          custom_data: { company_name: company },
        }],
        // 테스트 시에만 사용 — 프로덕션에서는 META_TEST_EVENT_CODE 환경변수를 제거하세요
        ...(env.META_TEST_EVENT_CODE && { test_event_code: env.META_TEST_EVENT_CODE }),
      };

      try {
        await fetch(`https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(capiPayload),
        });
      } catch (err) {
        console.error('[CAPI Error]', err);
      }
    }

    return NextResponse.json({ success: true, eventId });

  } catch (error) {
    console.error('[API Error]', error);
    return NextResponse.json({ message: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
