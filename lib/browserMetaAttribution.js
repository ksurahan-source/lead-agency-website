'use client';

import {
  FBC_COOKIE_NAME,
  FBP_COOKIE_NAME,
  META_ATTRIBUTION_MAX_AGE,
  buildFbc,
  buildFbp,
  getFbclidFromFbc,
  safelyDecode,
} from './metaAttribution';

const FBC_STORAGE_KEY = 'hiob.meta.fbc';
const FBCLID_STORAGE_KEY = 'hiob.meta.fbclid';

export const getBrowserCookie = (name) => {
  if (typeof document === 'undefined') return undefined;

  const value = document.cookie
    .split(';')
    .map(cookie => cookie.trim())
    .find(cookie => cookie.startsWith(`${name}=`))
    ?.slice(name.length + 1);

  return safelyDecode(value);
};

const getStorageItem = (key) => {
  try {
    return window.localStorage.getItem(key) || undefined;
  } catch {
    return undefined;
  }
};

const setStorageItem = (key, value) => {
  try {
    window.localStorage.setItem(key, value);
  } catch {}
};

const setFbcCookie = (fbc) => {
  if (typeof document === 'undefined' || !fbc) return;

  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${FBC_COOKIE_NAME}=${encodeURIComponent(fbc)}; Max-Age=${META_ATTRIBUTION_MAX_AGE}; Path=/; SameSite=Lax${secure}`;
};

const setFbpCookie = (fbp) => {
  if (typeof document === 'undefined' || !fbp) return;

  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${FBP_COOKIE_NAME}=${encodeURIComponent(fbp)}; Max-Age=${META_ATTRIBUTION_MAX_AGE}; Path=/; SameSite=Lax${secure}`;
};

const getUrlFbclid = () => {
  if (typeof window === 'undefined') return undefined;
  return new URLSearchParams(window.location.search).get('fbclid') || undefined;
};

export const captureMetaAttribution = () => {
  if (typeof window === 'undefined') return { fbp: undefined, fbc: undefined, fbclid: undefined };

  const urlFbclid = getUrlFbclid();
  const cookieFbp = getBrowserCookie(FBP_COOKIE_NAME);
  const cookieFbc = getBrowserCookie(FBC_COOKIE_NAME);
  const storedFbc = getStorageItem(FBC_STORAGE_KEY);
  const storedFbclid = getStorageItem(FBCLID_STORAGE_KEY);
  const cookieFbclid = getFbclidFromFbc(cookieFbc);

  const fbp = cookieFbp || buildFbp();
  let fbc = cookieFbc || storedFbc;
  let fbclid = urlFbclid || cookieFbclid || storedFbclid;

  if (urlFbclid && urlFbclid !== cookieFbclid) {
    fbc = buildFbc(urlFbclid);
    fbclid = urlFbclid;
  }

  if (fbc) {
    setFbcCookie(fbc);
    setStorageItem(FBC_STORAGE_KEY, fbc);
  }

  if (fbp) {
    setFbpCookie(fbp);
  }

  if (fbclid) {
    setStorageItem(FBCLID_STORAGE_KEY, fbclid);
  }

  return {
    fbp,
    fbc,
    fbclid,
  };
};
