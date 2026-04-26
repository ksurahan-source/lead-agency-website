import { NextResponse } from 'next/server';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

// Helper: hash data for Meta CAPI
const hashData = (data) => {
  if (!data) return undefined;
  return crypto.createHash('sha256').update(data.toString().trim().toLowerCase()).digest('hex');
};

// Helper: leads file path (/tmp is writable on Vercel serverless)
const LEADS_FILE = process.env.NODE_ENV === 'production'
  ? '/tmp/leads.json'
  : path.join(process.cwd(), 'data', 'leads.json');

// Helper: ensure data dir & file exist
const ensureLeadsFile = () => {
  const dir = path.dirname(LEADS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(LEADS_FILE)) fs.writeFileSync(LEADS_FILE, JSON.stringify([]));
};

// Helper: read leads
const readLeads = () => {
  ensureLeadsFile();
  return JSON.parse(fs.readFileSync(LEADS_FILE, 'utf-8'));
};

// Helper: write leads
const writeLeads = (leads) => {
  ensureLeadsFile();
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, inquiry, source, turnstileToken } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ message: '필수 항목이 누락되었습니다.' }, { status: 400 });
    }

    // ── Turnstile 검증
    const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY;
    if (TURNSTILE_SECRET) {
      if (!turnstileToken) {
        return NextResponse.json({ message: '보안 확인을 완료해 주세요.' }, { status: 400 });
      }
      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret: TURNSTILE_SECRET, response: turnstileToken }),
      });
      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        return NextResponse.json({ message: '보안 확인에 실패했습니다. 다시 시도해 주세요.' }, { status: 400 });
      }
    }

    const eventId = crypto.randomUUID();

    // ── 1. 리드 저장 (JSON 파일)
    const leads = readLeads();
    const newLead = {
      id: eventId,
      name,
      email,
      phone,
      company: company || '',
      inquiry: inquiry || '',
      status: 'new',          // new | contacted | converted | closed
      source: source || 'hi-op', // 출처 기록 (hi-op 기본값)
      createdAt: new Date().toISOString(),
    };
    leads.unshift(newLead);   // 최신순
    writeLeads(leads);

    console.log('[NEW LEAD]', { name, email, company });

    // ── 2. Meta CAPI
    const PIXEL_ID = process.env.META_PIXEL_ID;
    const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;

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
            em: [hashData(email)],
            ph: [hashData(phone)],
            fn: [hashData(fn)],
            ln: [hashData(ln)],
          },
          custom_data: { company_name: company },
        }],
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
