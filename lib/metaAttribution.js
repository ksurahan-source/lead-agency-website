export const FBC_COOKIE_NAME = '_fbc';
export const FBP_COOKIE_NAME = '_fbp';
export const META_ATTRIBUTION_MAX_AGE = 60 * 60 * 24 * 90;

export const safelyDecode = (value) => {
  if (!value) return undefined;

  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

export const getCookieFromString = (cookieHeader, name) => {
  const value = cookieHeader
    ?.split(';')
    .map(cookie => cookie.trim())
    .find(cookie => cookie.startsWith(`${name}=`))
    ?.slice(name.length + 1);

  return safelyDecode(value);
};

export const getFbclidFromUrl = (url) => {
  if (!url) return undefined;

  try {
    const parsedUrl = new URL(url);
    return parsedUrl.searchParams.get('fbclid') || undefined;
  } catch {
    return undefined;
  }
};

export const buildFbc = (fbclid, timestamp = Date.now()) => {
  const normalizedFbclid = typeof fbclid === 'string' ? fbclid.trim() : '';
  if (!normalizedFbclid) return undefined;

  return `fb.1.${timestamp}.${normalizedFbclid}`;
};

export const buildFbp = (timestamp = Date.now(), random = Math.random()) => {
  const randomPart = Math.floor(random * 10 ** 16).toString();
  return `fb.1.${timestamp}.${randomPart}`;
};

export const getFbclidFromFbc = (fbc) => {
  if (!fbc) return undefined;

  const parts = fbc.split('.');
  return parts.length >= 4 ? parts.slice(3).join('.') : undefined;
};

export const resolveFbc = ({ cookieHeader, bodyFbc, bodyFbclid, pageUrl, referer }) => {
  const clientFbc = safelyDecode(bodyFbc);
  if (clientFbc) return clientFbc;

  const cookieFbc = getCookieFromString(cookieHeader, FBC_COOKIE_NAME);
  if (cookieFbc) return cookieFbc;

  const fbclid = bodyFbclid || getFbclidFromUrl(pageUrl) || getFbclidFromUrl(referer);
  return buildFbc(fbclid);
};
