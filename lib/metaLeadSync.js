/**
 * Meta Lead Ads synchronization library
 * Edge-safe, pure functions + fetch for pulling leads from Meta and storing in D1
 */

const normalizePhoneForKorea = (phone) => {
  if (!phone) return undefined;
  const digits = phone.replace(/[^0-9]/g, '');
  // Idempotent: already-E.164 input ('+8210…' from Meta, or a re-pass of a stored
  // normalized value) must NOT get a second '82' prefix — that breaks the SHA-256
  // match with Meta's own hash. Korean domestic numbers never start with 82.
  if (digits.startsWith('82') && digits.length >= 11) return digits;
  return '82' + (digits.startsWith('0') ? digits.slice(1) : digits);
};

/**
 * Fetch leads from Meta Lead Ads API
 * @param {string} formId - Meta Lead Form ID
 * @param {string} accessToken - Graph API access token
 * @param {Object} options - { sinceUnix, after, limit=100, graphVersion='v25.0' }
 * @returns {Promise<{leads: Array, after: string|null, error: string|null}>}
 */
export async function fetchMetaLeads(formId, accessToken, options = {}) {
  const {
    sinceUnix,
    after,
    limit = 100,
    graphVersion = 'v25.0',
  } = options;

  try {
    const params = new URLSearchParams({
      fields: 'created_time,ad_id,ad_name,adset_id,adset_name,campaign_id,campaign_name,field_data',
      limit: limit.toString(),
      access_token: accessToken,
    });

    if (after) {
      params.append('after', after);
    }

    // Only add filtering if sinceUnix is provided
    if (sinceUnix) {
      const filtering = JSON.stringify([{
        field: 'time_created',
        operator: 'GREATER_THAN',
        value: sinceUnix,
      }]);
      params.append('filtering', filtering);
    }

    const url = `https://graph.facebook.com/${graphVersion}/${formId}/leads?${params}`;
    const response = await fetch(url);

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      return {
        leads: [],
        after: null,
        error: `Meta API error: ${response.status} ${JSON.stringify(body.error || {})}`,
      };
    }

    const body = await response.json();
    return {
      leads: body.data || [],
      after: body.paging?.cursors?.after || null,
      error: null,
    };
  } catch (error) {
    return {
      leads: [],
      after: null,
      error: `Fetch error: ${error.message}`,
    };
  }
}

/**
 * Extract name, email, phone from Meta field_data array
 * field_data is [{name, values:[...]}, ...]
 * @param {Array} fieldData - Meta field_data array
 * @returns {Object} {email, full_name, phone_number}
 */
export function normalizeLeadFields(fieldData) {
  if (!fieldData || !Array.isArray(fieldData)) {
    return { email: undefined, full_name: undefined, phone_number: undefined };
  }

  const result = {
    email: undefined,
    full_name: undefined,
    phone_number: undefined,
  };

  for (const field of fieldData) {
    const { name, values } = field;
    if (!name || !values || !Array.isArray(values)) continue;

    const value = values[0]; // Take first value
    if (!value) continue;

    switch (name.toLowerCase()) {
      case 'email':
        result.email = value;
        break;
      case 'full_name':
        result.full_name = value;
        break;
      case 'phone_number':
        result.phone_number = value;
        break;
    }
  }

  return result;
}

/**
 * Build a normalized lead row from Meta lead data
 * @param {Object} metaLead - Meta lead with id, created_time, ad_*, field_data
 * @returns {Object} {id, source_id, name, email, phone, company, inquiry, status, source, metadata, created_at}
 */
export function buildLeadRow(metaLead) {
  const {
    id: sourceId,
    created_time: createdTime,
    ad_id: adId,
    ad_name: adName,
    adset_id: adsetId,
    adset_name: adsetName,
    campaign_id: campaignId,
    campaign_name: campaignName,
    field_data: fieldData,
  } = metaLead;

  const { email, full_name, phone_number } = normalizeLeadFields(fieldData);

  return {
    id: crypto.randomUUID(),
    source_id: sourceId,
    name: full_name || '',
    email: email || '',
    phone: normalizePhoneForKorea(phone_number) || '',
    company: '',
    inquiry: '',
    status: 'new',
    source: 'meta_lead_ads',
    metadata: JSON.stringify({
      created_time: createdTime,
      ad_id: adId,
      ad_name: adName,
      adset_id: adsetId,
      adset_name: adsetName,
      campaign_id: campaignId,
      campaign_name: campaignName,
      platform: 'ig',
    }),
    created_at: createdTime ? new Date(createdTime * 1000).toISOString() : new Date().toISOString(),
  };
}

/**
 * Upsert a lead row into D1
 * Returns {action: 'skipped'|'inserted', id}
 * @param {Object} DB - D1 database binding
 * @param {Object} row - Lead row from buildLeadRow
 * @returns {Promise<{action: string, id: string}>}
 */
export async function upsertLead(DB, row) {
  if (!row.source_id) {
    // No source_id means can't deduplicate — insert blindly
    await DB.prepare(`
      INSERT INTO leads (id, source_id, name, email, phone, company, inquiry, status, source, metadata, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `).bind(
      row.id,
      row.source_id,
      row.name,
      row.email,
      row.phone,
      row.company,
      row.inquiry,
      row.status,
      row.source,
      row.metadata,
      row.created_at
    ).run();
    return { action: 'inserted', id: row.id };
  }

  // Check if source_id already exists
  const existing = await DB.prepare('SELECT id FROM leads WHERE source_id = ?')
    .bind(row.source_id)
    .first();

  if (existing) {
    return { action: 'skipped', id: existing.id };
  }

  // Insert new lead
  await DB.prepare(`
    INSERT INTO leads (id, source_id, name, email, phone, company, inquiry, status, source, metadata, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
  `).bind(
    row.id,
    row.source_id,
    row.name,
    row.email,
    row.phone,
    row.company,
    row.inquiry,
    row.status,
    row.source,
    row.metadata,
    row.created_at
  ).run();

  return { action: 'inserted', id: row.id };
}
