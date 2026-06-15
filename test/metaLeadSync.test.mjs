import { test } from 'node:test';
import assert from 'node:assert';
import {
  fetchMetaLeads,
  normalizeLeadFields,
  buildLeadRow,
  upsertLead,
} from '../lib/metaLeadSync.js';

// Mock globalThis.fetch for tests
const mockFetch = (response) => {
  globalThis.fetch = async () => ({
    ok: response.ok,
    status: response.status,
    json: async () => response.json,
  });
};

// Mock crypto.randomUUID
const originalRandomUUID = crypto.randomUUID;
const mockUUID = 'test-uuid-12345';
crypto.randomUUID = () => mockUUID;

test('normalizeLeadFields: extract email, full_name, phone', async (t) => {
  const fieldData = [
    { name: 'email', values: ['user@example.com'] },
    { name: 'full_name', values: ['John Doe'] },
    { name: 'phone_number', values: ['01058582196'] },
  ];

  const result = normalizeLeadFields(fieldData);

  assert.deepStrictEqual(result, {
    email: 'user@example.com',
    full_name: 'John Doe',
    phone_number: '01058582196',
  });
});

test('normalizeLeadFields: handle missing fields', async (t) => {
  const fieldData = [
    { name: 'email', values: ['user@example.com'] },
  ];

  const result = normalizeLeadFields(fieldData);

  assert.strictEqual(result.email, 'user@example.com');
  assert.strictEqual(result.full_name, undefined);
  assert.strictEqual(result.phone_number, undefined);
});

test('normalizeLeadFields: handle null/undefined input', async (t) => {
  const result = normalizeLeadFields(null);

  assert.deepStrictEqual(result, {
    email: undefined,
    full_name: undefined,
    phone_number: undefined,
  });
});

test('buildLeadRow: create row with all fields', async (t) => {
  const metaLead = {
    id: 'meta-id-123',
    created_time: 1718000000,
    ad_id: 'ad-123',
    ad_name: 'My Ad',
    adset_id: 'adset-123',
    adset_name: 'My Adset',
    campaign_id: 'campaign-123',
    campaign_name: 'My Campaign',
    field_data: [
      { name: 'full_name', values: ['Jane Kim'] },
      { name: 'email', values: ['jane@example.com'] },
      { name: 'phone_number', values: ['01058582196'] },
    ],
  };

  const row = buildLeadRow(metaLead);

  assert.strictEqual(row.source_id, 'meta-id-123');
  assert.strictEqual(row.name, 'Jane Kim');
  assert.strictEqual(row.email, 'jane@example.com');
  assert.strictEqual(row.phone, '821058582196'); // E.164 with leading 0 stripped
  assert.strictEqual(row.company, '');
  assert.strictEqual(row.inquiry, '');
  assert.strictEqual(row.status, 'new');
  assert.strictEqual(row.source, 'meta_lead_ads');

  const metadata = JSON.parse(row.metadata);
  assert.strictEqual(metadata.created_time, 1718000000);
  assert.strictEqual(metadata.ad_id, 'ad-123');
  assert.strictEqual(metadata.campaign_name, 'My Campaign');
  assert.strictEqual(metadata.platform, 'ig');
});

test('buildLeadRow: handle missing field_data', async (t) => {
  const metaLead = {
    id: 'meta-id-456',
    created_time: 1718000000,
    ad_id: 'ad-456',
    ad_name: 'Ad 2',
    field_data: [],
  };

  const row = buildLeadRow(metaLead);

  assert.strictEqual(row.source_id, 'meta-id-456');
  assert.strictEqual(row.name, '');
  assert.strictEqual(row.email, '');
  assert.strictEqual(row.phone, '');
});

test('upsertLead: skip if source_id exists', async (t) => {
  const mockDB = {
    prepare: (sql) => ({
      bind: (...args) => ({
        first: async () => ({ id: 'existing-id' }),
      }),
    }),
  };

  const row = {
    id: 'new-id',
    source_id: 'existing-source-id',
    name: 'Test',
    email: 'test@example.com',
    phone: '821058582196',
    company: '',
    inquiry: '',
    status: 'new',
    source: 'meta_lead_ads',
    metadata: '{}',
    created_at: new Date().toISOString(),
  };

  const result = await upsertLead(mockDB, row);

  assert.strictEqual(result.action, 'skipped');
  assert.strictEqual(result.id, 'existing-id');
});

test('upsertLead: insert if source_id does not exist', async (t) => {
  let insertCalled = false;

  const mockDB = {
    prepare: (sql) => ({
      bind: (...args) => ({
        first: async () => null,
        run: async () => { insertCalled = true; return { changes: 1 }; },
      }),
    }),
  };

  const row = {
    id: 'new-id',
    source_id: 'new-source-id',
    name: 'Test',
    email: 'test@example.com',
    phone: '821058582196',
    company: '',
    inquiry: '',
    status: 'new',
    source: 'meta_lead_ads',
    metadata: '{}',
    created_at: new Date().toISOString(),
  };

  const result = await upsertLead(mockDB, row);

  assert.strictEqual(result.action, 'inserted');
  assert.strictEqual(result.id, 'new-id');
  assert(insertCalled, 'INSERT should have been called');
});

test('fetchMetaLeads: handle API error', async (t) => {
  mockFetch({
    ok: false,
    status: 400,
    json: { error: { message: 'Invalid form ID' } },
  });

  const result = await fetchMetaLeads('bad-form-id', 'token');

  assert.strictEqual(result.leads.length, 0);
  assert.strictEqual(result.after, null);
  assert(result.error, 'Should have error message');
  assert(result.error.includes('Meta API error'), 'Error should mention Meta API');
});

test('fetchMetaLeads: parse leads and cursor', async (t) => {
  mockFetch({
    ok: true,
    status: 200,
    json: {
      data: [
        {
          id: 'lead-1',
          created_time: 1718000000,
          field_data: [{ name: 'email', values: ['user1@example.com'] }],
        },
      ],
      paging: {
        cursors: {
          after: 'next-cursor',
        },
      },
    },
  });

  const result = await fetchMetaLeads('form-id', 'token');

  assert.strictEqual(result.leads.length, 1);
  assert.strictEqual(result.leads[0].id, 'lead-1');
  assert.strictEqual(result.after, 'next-cursor');
  assert.strictEqual(result.error, null);
});

// Restore crypto.randomUUID
crypto.randomUUID = originalRandomUUID;
