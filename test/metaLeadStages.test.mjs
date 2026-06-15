import { test } from 'node:test';
import assert from 'node:assert';
import {
  STAGE_EVENTS,
  buildLeadStageEvent,
  sendLeadStageEvent,
} from '../lib/metaLeadStages.js';

test('STAGE_EVENTS: has expected mappings', async (t) => {
  assert.strictEqual(STAGE_EVENTS.contacted, 'lead_contacted');
  assert.strictEqual(STAGE_EVENTS.consulted, 'lead_consulted');
  assert.strictEqual(STAGE_EVENTS.paid, 'lead_paid');
});

test('buildLeadStageEvent: return null for unknown status', async (t) => {
  const lead = {
    id: 'lead-1',
    source_id: 'meta-id-1',
    email: 'test@example.com',
    phone: '821058582196',
  };

  const result = await buildLeadStageEvent(lead, 'unknown_status');

  assert.strictEqual(result, null);
});

test('buildLeadStageEvent: include lead_id when source_id present', async (t) => {
  const lead = {
    id: 'lead-1',
    source_id: 'meta-id-123',
    email: 'test@example.com',
    phone: '821058582196',
  };

  const payload = await buildLeadStageEvent(lead, 'contacted');

  assert(payload, 'Should return payload');
  assert.strictEqual(payload.data.length, 1);

  const event = payload.data[0];
  assert.strictEqual(event.event_name, 'lead_contacted');
  assert.strictEqual(event.action_source, 'system_generated');
  assert(event.event_id.includes('meta_lead_'), 'event_id should contain meta_lead_');
  assert(event.event_id.includes('meta-id-123'), 'event_id should contain source_id');
  assert(event.event_id.includes('contacted'), 'event_id should contain status');

  assert.strictEqual(event.user_data.lead_id, 'meta-id-123');
  assert(event.user_data.em, 'Should hash email');
  assert(event.user_data.ph, 'Should hash phone');
  assert(event.user_data.em[0], 'Hashed email should be non-empty');
  assert(event.user_data.ph[0], 'Hashed phone should be non-empty');
});

test('buildLeadStageEvent: omit lead_id when source_id absent (web lead)', async (t) => {
  const lead = {
    id: 'lead-2',
    source_id: null,
    email: 'user@example.com',
    phone: '821058582196',
  };

  const payload = await buildLeadStageEvent(lead, 'consulted');

  assert(payload, 'Should return payload');
  const event = payload.data[0];

  assert.strictEqual(event.user_data.lead_id, undefined);
  assert(event.user_data.em, 'Should include email hash');
  assert(event.user_data.ph, 'Should include phone hash');
});

test('buildLeadStageEvent: include custom_data.value and currency for paid status', async (t) => {
  const lead = {
    id: 'lead-3',
    source_id: 'meta-id-3',
    email: 'paid@example.com',
  };

  const payload = await buildLeadStageEvent(lead, 'paid', { paidValue: 1000000 });

  assert(payload);
  const event = payload.data[0];

  assert.strictEqual(event.event_name, 'lead_paid');
  assert.strictEqual(event.custom_data.value, 1000000);
  assert.strictEqual(event.custom_data.currency, 'KRW');
});

test('buildLeadStageEvent: omit custom_data for non-paid status', async (t) => {
  const lead = {
    id: 'lead-4',
    source_id: 'meta-id-4',
    email: 'contacted@example.com',
  };

  const payload = await buildLeadStageEvent(lead, 'contacted');

  assert(payload);
  const event = payload.data[0];

  assert.strictEqual(event.custom_data, undefined);
});

test('buildLeadStageEvent: include test_event_code when provided', async (t) => {
  const lead = {
    id: 'lead-5',
    source_id: 'meta-id-5',
    email: 'test@example.com',
  };

  const payload = await buildLeadStageEvent(lead, 'contacted', {
    testEventCode: 'test-code-123',
  });

  assert.strictEqual(payload.test_event_code, 'test-code-123');
});

test('buildLeadStageEvent: event_id is idempotent', async (t) => {
  const lead = {
    id: 'lead-6',
    source_id: 'meta-id-6',
    email: 'idempotent@example.com',
  };

  const payload1 = await buildLeadStageEvent(lead, 'paid');
  const payload2 = await buildLeadStageEvent(lead, 'paid');

  const eventId1 = payload1.data[0].event_id;
  const eventId2 = payload2.data[0].event_id;

  assert.strictEqual(eventId1, eventId2, 'event_id should be deterministic');
});

test('sendLeadStageEvent: return ok=true on success', async (t) => {
  globalThis.fetch = async () => ({
    ok: true,
    status: 200,
    json: async () => ({ events_received: 1 }),
  });

  const payload = {
    data: [{
      event_name: 'lead_contacted',
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'system_generated',
    }],
  };

  const result = await sendLeadStageEvent(payload, {
    pixelId: '123456',
    accessToken: 'token',
  });

  assert.strictEqual(result.ok, true);
  assert.strictEqual(result.status, 200);
});

test('sendLeadStageEvent: return ok=false on failure', async (t) => {
  globalThis.fetch = async () => ({
    ok: false,
    status: 400,
    json: async () => ({ error: { message: 'Invalid access token' } }),
  });

  const payload = {
    data: [{
      event_name: 'lead_contacted',
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'system_generated',
    }],
  };

  const result = await sendLeadStageEvent(payload, {
    pixelId: '123456',
    accessToken: 'bad-token',
  });

  assert.strictEqual(result.ok, false);
  assert.strictEqual(result.status, 400);
});

test('sendLeadStageEvent: handle fetch error', async (t) => {
  globalThis.fetch = async () => {
    throw new Error('Network error');
  };

  const payload = {
    data: [{
      event_name: 'lead_contacted',
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'system_generated',
    }],
  };

  const result = await sendLeadStageEvent(payload, {
    pixelId: '123456',
    accessToken: 'token',
  });

  assert.strictEqual(result.ok, false);
  assert.strictEqual(result.status, 0);
  assert(result.body.error, 'Should include error message');
});

test('buildLeadStageEvent: hash email and phone', async (t) => {
  const lead = {
    id: 'lead-7',
    source_id: 'meta-id-7',
    email: 'hashing@example.com',
    phone: '821058582196',
  };

  const payload = await buildLeadStageEvent(lead, 'contacted');
  const event = payload.data[0];

  // Verify hashes are present and non-empty
  assert(event.user_data.em[0], 'Email hash should be present');
  assert(event.user_data.ph[0], 'Phone hash should be present');

  // Verify hashes are deterministic (same input = same hash)
  const payload2 = await buildLeadStageEvent(lead, 'contacted');
  const event2 = payload2.data[0];

  assert.strictEqual(event.user_data.em[0], event2.user_data.em[0], 'Email hash should be deterministic');
  assert.strictEqual(event.user_data.ph[0], event2.user_data.ph[0], 'Phone hash should be deterministic');
});

test('buildLeadStageEvent: handle missing email/phone', async (t) => {
  const lead = {
    id: 'lead-8',
    source_id: 'meta-id-8',
    email: null,
    phone: null,
  };

  const payload = await buildLeadStageEvent(lead, 'contacted');
  const event = payload.data[0];

  assert.strictEqual(event.user_data.em, undefined);
  assert.strictEqual(event.user_data.ph, undefined);
});

// ── 버그헌트 후속 (2026-06-12): 멱등 정규화 + converted 별칭 ─────────────────
import { test as _t2 } from 'node:test';
import assert2 from 'node:assert/strict';
import { STAGE_EVENTS as _SE, buildLeadStageEvent as _build } from '../lib/metaLeadStages.js';

_t2('already-E.164 phone is NOT double-prefixed (8282 bug)', async () => {
  const lead = { id: 'l1', source_id: 'm1', phone: '821058582196' };
  const a = await _build(lead, 'contacted', {});
  const b = await _build({ ...lead, phone: '+82 10-5858-2196' }, 'contacted', {});
  // same person, stored-normalized vs Meta-format input → identical hash
  assert2.deepEqual(a.data[0].user_data.ph, b.data[0].user_data.ph);
});

_t2("admin 'converted' status fires the paid-stage event", async () => {
  assert2.equal(_SE.converted, 'lead_paid');
  const evt = await _build({ id: 'l2', source_id: 'm2', email: 'a@b.c' }, 'converted', { paidValue: 500000 });
  assert2.equal(evt.data[0].event_name, 'lead_paid');
  assert2.equal(evt.data[0].custom_data.value, 500000);
  assert2.equal(evt.data[0].event_id, 'meta_lead_m2_converted');
});
