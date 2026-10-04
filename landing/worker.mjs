import { mediaRange } from "./media-range.mjs";
const landingWorker = {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== "/" && !url.pathname.startsWith("/site/"))
      return new Response("Not found", { status: 404 });
    if (!["GET", "HEAD"].includes(request.method))
      return new Response("Method not allowed", {
        status: 405,
        headers: { Allow: "GET, HEAD" },
      });
    if (url.pathname === "/") url.pathname = "/index.html";
    const response = await mediaRange(
      request,
      await env.ASSETS.fetch(new Request(url, request)),
    );
    const headers = new Headers(response.headers);
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    headers.set("X-Frame-Options", "DENY");
    headers.set(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self' https://www.googletagmanager.com https://connect.facebook.net https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://www.facebook.com https://*.google-analytics.com https://*.googletagmanager.com https://www.google.com https://ad.doubleclick.net; media-src 'self'; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://www.facebook.com https://www.google.com https://ad.doubleclick.net https://cloudflareinsights.com https://bded8a3c6ae-1-1053047382554.us-central1.run.app/events https://e1-0850197d5e074be58352ddc860645af6.ecs.us-east-1.on.aws/events; frame-src https://www.googletagmanager.com; object-src 'none'; base-uri 'none'; frame-ancestors 'none'",
    );
    const fingerprinted =
      /-[a-f0-9]{12}\.(js|css|jpg|png|mp4|vtt)$/.test(url.pathname) ||
      /^\/site\/chunks\/[\w-]+-[A-Z0-9]{8}\.js$/.test(url.pathname);
    headers.set(
      "Cache-Control",
      fingerprinted
        ? "public, max-age=31536000, immutable"
        : url.pathname === "/index.html" ||
            url.pathname.endsWith("version.json")
          ? "public, max-age=0, must-revalidate"
          : "public, max-age=86400",
    );
    return new Response(response.body, { status: response.status, headers });
  },
};

export default landingWorker;
