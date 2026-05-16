export const AUTH_COOKIE_NAME = 'hiob_session';
export const AUTH_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

const PASSWORD_ITERATIONS = 210000;
const SESSION_VERSION = 1;

type SessionPayload = {
  v: number;
  email: string;
  exp: number;
};

export async function verifyPassword(email: string, password: string) {
  const allowedEmail = process.env.AUTH_ALLOWED_EMAIL?.trim().toLowerCase();
  const salt = process.env.AUTH_PASSWORD_SALT?.trim();
  const expectedHash = process.env.AUTH_PASSWORD_HASH?.trim().toLowerCase();

  if (!allowedEmail || !salt || !expectedHash) return false;
  if (email.trim().toLowerCase() !== allowedEmail) return false;

  const hash = await pbkdf2Hex(password, salt);

  return constantTimeEqual(hash, expectedHash);
}

export async function createSessionToken(email: string, now = Date.now()) {
  const secret = getSessionSecret();
  if (!secret) throw new Error('AUTH_SESSION_SECRET is not configured');

  const payload: SessionPayload = {
    v: SESSION_VERSION,
    email: email.trim().toLowerCase(),
    exp: now + AUTH_SESSION_MAX_AGE_SECONDS * 1000,
  };
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = await hmacSha256Hex(encodedPayload, secret);

  return `${encodedPayload}.${signature}`;
}

export async function verifySessionToken(token: string | undefined) {
  const secret = getSessionSecret();
  if (!token || !secret) return false;

  const [encodedPayload, signature] = token.split('.');
  if (!encodedPayload || !signature) return false;

  const expectedSignature = await hmacSha256Hex(encodedPayload, secret);
  if (!constantTimeEqual(signature, expectedSignature)) return false;

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as Partial<SessionPayload>;
    const allowedEmail = process.env.AUTH_ALLOWED_EMAIL?.trim().toLowerCase();

    return (
      payload.v === SESSION_VERSION &&
      typeof payload.email === 'string' &&
      payload.email === allowedEmail &&
      typeof payload.exp === 'number' &&
      payload.exp > Date.now()
    );
  } catch {
    return false;
  }
}

export async function isAuthenticatedRequest(request: Request) {
  return verifySessionToken(getCookieFromHeader(request.headers.get('cookie'), AUTH_COOKIE_NAME));
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: AUTH_SESSION_MAX_AGE_SECONDS,
  };
}

function getSessionSecret() {
  return process.env.AUTH_SESSION_SECRET?.trim();
}

async function pbkdf2Hex(password: string, salt: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    utf8(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  );
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

async function hmacSha256Hex(message: string, secret: string) {
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

function getCookieFromHeader(cookieHeader: string | null, name: string) {
  return cookieHeader
    ?.split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`))
    ?.slice(name.length + 1);
}

function constantTimeEqual(left: string, right: string) {
  if (left.length !== right.length) return false;

  let result = 0;
  for (let index = 0; index < left.length; index += 1) {
    result |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }

  return result === 0;
}

function base64UrlEncode(value: string) {
  return btoa(value).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlDecode(value: string) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=');

  return atob(padded);
}

function toHex(bytes: Uint8Array) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function utf8(value: string) {
  return new TextEncoder().encode(value);
}
