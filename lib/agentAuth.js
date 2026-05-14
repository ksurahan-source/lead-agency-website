import { getRequestContext } from '@cloudflare/next-on-pages';

export const AGENT_COOKIE_NAME = 'hiob_agent_session';
export const AGENT_SESSION_MAX_AGE = 60 * 60 * 24 * 7;

const PASSWORD_ITERATIONS = 100000;
const SESSION_VERSION = 1;

export function getAgentEnv() {
  try {
    return getRequestContext().env;
  } catch {
    return process.env;
  }
}

export function hasAgentAuthConfig() {
  const env = getAgentEnv();
  return Boolean(
    env.AGENT_ALLOWED_EMAIL &&
    env.AGENT_PASSWORD_SALT &&
    env.AGENT_PASSWORD_HASH &&
    env.AGENT_SESSION_SECRET,
  );
}

export async function verifyAgentPassword(email, password) {
  const env = getAgentEnv();
  const allowedEmail = env.AGENT_ALLOWED_EMAIL?.trim().toLowerCase();
  const salt = env.AGENT_PASSWORD_SALT?.trim();
  const expectedHash = env.AGENT_PASSWORD_HASH?.trim().toLowerCase();

  if (!allowedEmail || !salt || !expectedHash) return false;
  if (email.trim().toLowerCase() !== allowedEmail) return false;

  const hash = await pbkdf2Hex(password, salt);
  return constantTimeEqual(hash, expectedHash);
}

export async function createAgentSession(email, now = Date.now()) {
  const secret = getSessionSecret();
  if (!secret) throw new Error('Agent session secret is not configured');

  const payload = {
    v: SESSION_VERSION,
    email: email.trim().toLowerCase(),
    exp: now + AGENT_SESSION_MAX_AGE * 1000,
  };
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = await hmacSha256Hex(encodedPayload, secret);

  return `${encodedPayload}.${signature}`;
}

export async function verifyAgentSessionToken(token) {
  const secret = getSessionSecret();
  if (!token || !secret) return false;

  const [encodedPayload, signature] = token.split('.');
  if (!encodedPayload || !signature) return false;

  const expectedSignature = await hmacSha256Hex(encodedPayload, secret);
  if (!constantTimeEqual(signature, expectedSignature)) return false;

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload));
    const allowedEmail = getAgentEnv().AGENT_ALLOWED_EMAIL?.trim().toLowerCase();

    return (
      payload.v === SESSION_VERSION &&
      payload.email === allowedEmail &&
      typeof payload.exp === 'number' &&
      payload.exp > Date.now()
    );
  } catch {
    return false;
  }
}

export async function isAgentRequestAuthenticated(request) {
  const cookie = request.headers
    .get('cookie')
    ?.split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${AGENT_COOKIE_NAME}=`))
    ?.slice(AGENT_COOKIE_NAME.length + 1);

  return verifyAgentSessionToken(cookie);
}

export function getAgentCookieOptions() {
  return {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: AGENT_SESSION_MAX_AGE,
  };
}

function getSessionSecret() {
  return getAgentEnv().AGENT_SESSION_SECRET?.trim();
}

async function pbkdf2Hex(password, salt) {
  const key = await crypto.subtle.importKey('raw', utf8(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      hash: 'SHA-256',
      salt: utf8(salt),
      iterations: PASSWORD_ITERATIONS,
    },
    key,
    256,
  );

  return toHex(new Uint8Array(bits));
}

async function hmacSha256Hex(message, secret) {
  const key = await crypto.subtle.importKey(
    'raw',
    utf8(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, utf8(message));

  return toHex(new Uint8Array(signature));
}

function constantTimeEqual(left, right) {
  if (left.length !== right.length) return false;
  let result = 0;

  for (let index = 0; index < left.length; index += 1) {
    result |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }

  return result === 0;
}

function base64UrlEncode(value) {
  return btoa(value).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlDecode(value) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=');

  return atob(padded);
}

function toHex(bytes) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function utf8(value) {
  return new TextEncoder().encode(value);
}
