import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const LEADS_FILE = process.env.NODE_ENV === 'production'
  ? '/tmp/leads.json'
  : path.join(process.cwd(), 'data', 'leads.json');
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'hiop2025';

const readLeads = () => {
  if (!fs.existsSync(LEADS_FILE)) return [];
  return JSON.parse(fs.readFileSync(LEADS_FILE, 'utf-8'));
};

const writeLeads = (leads) => {
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
};

// GET /api/leads — 리드 목록 조회
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const pw = searchParams.get('pw');

  if (pw !== ADMIN_PASSWORD) {
    return NextResponse.json({ message: '인증 실패' }, { status: 401 });
  }

  const leads = readLeads();
  return NextResponse.json({ leads });
}

// PATCH /api/leads — 리드 상태 업데이트
export async function PATCH(request) {
  const { searchParams } = new URL(request.url);
  const pw = searchParams.get('pw');

  if (pw !== ADMIN_PASSWORD) {
    return NextResponse.json({ message: '인증 실패' }, { status: 401 });
  }

  const { id, status } = await request.json();
  const leads = readLeads();
  const idx = leads.findIndex(l => l.id === id);

  if (idx === -1) {
    return NextResponse.json({ message: '리드를 찾을 수 없습니다.' }, { status: 404 });
  }

  leads[idx].status = status;
  leads[idx].updatedAt = new Date().toISOString();
  writeLeads(leads);

  return NextResponse.json({ success: true, lead: leads[idx] });
}

// DELETE /api/leads — 리드 삭제
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const pw = searchParams.get('pw');
  const id = searchParams.get('id');

  if (pw !== ADMIN_PASSWORD) {
    return NextResponse.json({ message: '인증 실패' }, { status: 401 });
  }

  const leads = readLeads();
  const filtered = leads.filter(l => l.id !== id);
  writeLeads(filtered);

  return NextResponse.json({ success: true });
}
