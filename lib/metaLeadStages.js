/**
 * Meta Lead Stage Events (CAPI)
 * Send lead progression events back to Meta
 */

const hashData = async (data) => {
  if (!data) return undefined;
  const encoded = new TextEncoder().encode(data.toString().trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

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
 * Map lead status to Meta CAPI event name
 * @type {Object}
 */
export const STAGE_EVENTS = {
  contacted: 'lead_contacted',
  consulted: 'lead_consulted',
  paid: 'lead_paid',
  // The admin UI's historical "converted" status (db/schema.sql) means the deal
  // closed — same funnel terminus as 'paid'. Alias it so the founder's existing
  // button fires the conversion event instead of silently doing nothing.
  converted: 'lead_paid',
};

/**
 * Build a lead stage event payload for Meta CAPI
 * @param {Object} lead - Lead row with id, source_id, name, email, phone
 * @param {string} newStatus - New status (must be key in STAGE_EVENTS)
 * @param {Object} options - { testEventCode, paidValue=500000 }
 * @returns {Promise<Object|null>} Event payload or null if status not in map
 */
export async function buildLeadStageEvent(lead, newStatus, options = {}) {
  const { testEventCode, paidValue = 500000 } = options;

  const eventName = STAGE_EVENTS[newStatus];
  if (!eventName) {
    return null;
  }

  const eventTime = Math.floor(Date.now() / 1000);
  const eventId = `meta_lead_${lead.source_id || lead.id}_${newStatus}`;

  const userDataObj = {};

  // Include lead_id only if lead came from Meta Lead Ads
  if (lead.source_id) {
    userDataObj.lead_id = lead.source_id;
  }

  // Hash email if present
  if (lead.email) {
    userDataObj.em = [await hashData(lead.email)];
  }

  // Hash phone if present
  if (lead.phone) {
    userDataObj.ph = [await hashData(normalizePhoneForKorea(lead.phone))];
  }

  // Value rides on the TERMINAL event (lead_paid) — both 'paid' and the admin's
  // legacy 'converted' alias mean money landed.
  const customData = eventName === 'lead_paid'
    ? { value: paidValue, currency: 'KRW' }
    : {};

  const eventPayload = {
    event_name: eventName,
    event_time: eventTime,
    action_source: 'system_generated',
    event_id: eventId,
    user_data: userDataObj,
    ...(Object.keys(customData).length > 0 && { custom_data: customData }),
  };

  return {
    data: [eventPayload],
    ...(testEventCode && { test_event_code: testEventCode }),
  };
}

/**
 * Send a lead stage event to Meta
 * @param {Object} payload - Event payload from buildLeadStageEvent
 * @param {Object} options - { pixelId, accessToken, graphVersion='v25.0' }
 * @returns {Promise<{ok: boolean, status: number, body: Object}>}
 */
export async function sendLeadStageEvent(payload, options = {}) {
  const {
    pixelId,
    accessToken,
    graphVersion = 'v25.0',
  } = options;

  try {
    const url = `https://graph.facebook.com/${graphVersion}/${pixelId}/events?access_token=${accessToken}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const body = await response.json().catch(() => ({}));
    return {
      ok: response.ok,
      status: response.status,
      body,
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      body: { error: error.message },
    };
  }
}
