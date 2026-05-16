import { getRequestContext } from '@cloudflare/next-on-pages';

export const STUDIO_COOKIE_NAME = 'hiob_studio_session';
export const STUDIO_SESSION_MAX_AGE = 60 * 60 * 24 * 7;

const PASSWORD_ITERATIONS = 210000;
const SESSION_VERSION = 1;

export function getStudioEnv() {
  try {
    return getRequestContext().env;
  } catch {
    return process.env;
  }
}

export function hasStudioAuthConfig() {
  const env = getStudioEnv();

  return Boolean(
    env.STUDIO_AUTH_ALLOWED_EMAIL?.trim() &&
      env.STUDIO_AUTH_PASSWORD_SALT?.trim() &&
      env.STUDIO_AUTH_PASSWORD_HASH?.trim() &&
      env.STUDIO_AUTH_SESSION_SECRET?.trim(),
  );
}

export async function verifyStudioPassword(email, password) {
  const env = getStudioEnv();
  const allowedEmail = env.STUDIO_AUTH_ALLOWED_EMAIL?.trim().toLowerCase();
  const salt = env.STUDIO_AUTH_PASSWORD_SALT?.trim();
  const expectedHash = env.STUDIO_AUTH_PASSWORD_HASH?.trim().toLowerCase();

  if (!allowedEmail || !salt || !expectedHash) return false;
  if (email.trim().toLowerCase() !== allowedEmail) return false;

  const hash = await pbkdf2Hex(password, salt);

  return constantTimeEqual(hash, expectedHash);
}

export async function createStudioSession(email, now = Date.now()) {
  const secret = getStudioSessionSecret();
  if (!secret) throw new Error('Studio session secret is not configured');

  const payload = {
    v: SESSION_VERSION,
    email: email.trim().toLowerCase(),
    exp: now + STUDIO_SESSION_MAX_AGE * 1000,
  };
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = await hmacSha256Hex(encodedPayload, secret);

  return `${encodedPayload}.${signature}`;
}

export async function getStudioSession(token) {
  const secret = getStudioSessionSecret();
  if (!token || !secret) return null;

  const [encodedPayload, signature] = token.split('.');
  if (!encodedPayload || !signature) return null;

  const expectedSignature = await hmacSha256Hex(encodedPayload, secret);
  if (!constantTimeEqual(signature, expectedSignature)) return null;

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload));
    const allowedEmail = getStudioEnv().STUDIO_AUTH_ALLOWED_EMAIL?.trim().toLowerCase();

    if (
      payload.v !== SESSION_VERSION ||
      payload.email !== allowedEmail ||
      typeof payload.exp !== 'number' ||
      payload.exp <= Date.now()
    ) {
      return null;
    }

    return {
      email: payload.email,
      expiresAt: new Date(payload.exp).toISOString(),
    };
  } catch {
    return null;
  }
}

export async function verifyStudioSessionToken(token) {
  return Boolean(await getStudioSession(token));
}

export async function isStudioRequestAuthenticated(request) {
  return verifyStudioSessionToken(getCookieFromHeader(request.headers.get('cookie'), STUDIO_COOKIE_NAME));
}

export function getStudioCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: STUDIO_SESSION_MAX_AGE,
  };
}

function getStudioSessionSecret() {
  return getStudioEnv().STUDIO_AUTH_SESSION_SECRET?.trim();
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

function getCookieFromHeader(cookieHeader, name) {
  return cookieHeader
    ?.split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`))
    ?.slice(name.length + 1);
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
