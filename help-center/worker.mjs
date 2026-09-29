import { PUBLIC_ROUTES, ARTICLE_PATHS } from "./src/routes.mjs";
const documents = new Set(PUBLIC_ROUTES.map((route) => route.path));
const discovery = new Set([
  "/robots.txt",
  "/sitemap.xml",
  "/video-sitemap.xml",
]);
const aliases = Object.fromEntries(
  Object.entries(ARTICLE_PATHS)
    .filter(([, path]) => path.startsWith("/help/troubleshooting/"))
    .map(([id, path]) => ["/help/" + id, path]),
);
const helpWorker = {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (!["GET", "HEAD"].includes(request.method))
      return new Response("Method not allowed", {
        status: 405,
        headers: { Allow: "GET, HEAD" },
      });
    const normalized = url.pathname.replace(/\/$/, "");
    const canonical =
      aliases[normalized] || (documents.has(normalized) ? normalized : null);
    if (canonical && canonical !== url.pathname) {
      url.pathname = canonical;
      return Response.redirect(url.toString(), 308);
    }
    const asset = /^\/help\/skills\/creative-vault-2026-09-29(?:\.zip|\/(?:[0-9]{2}-[A-Z-]+\.md|manifest\.json))$/.test(url.pathname) || url.pathname === "/help/skills/advertising-playbook-2026-09-29.md" ||
      /^\/help\/(?:assets\/help-[a-f0-9]{12}\.(?:css|js)|tools\/windows-recovery-1\.(?:mjs|json)|(?:version|mcp-release)\.json|skills\/production-guide-0\.(?:6\.[1234]|9\.[0124567])\.md|hiob-video-skill-1\.[012]\.0\.zip|skills\/hiob-video(?:-1\.[12]\.0)?\/(?:SKILL\.md|references\/production-workflow\.md))$/.test(
        url.pathname,
      );
    const known =
      documents.has(url.pathname) || discovery.has(url.pathname) || asset;
    if (documents.has(url.pathname)) url.pathname += "/index.html";
    else if (!known) url.pathname = "/help/404.html";
    const response = await env.ASSETS.fetch(new Request(url, request));
    const headers = new Headers(response.headers);
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    headers.set("X-Frame-Options", "DENY");
    headers.set(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; media-src 'self'; connect-src 'self' https://cloudflareinsights.com; object-src 'none'; base-uri 'none'; frame-ancestors 'none'",
    );
    headers.set(
      "Cache-Control",
      asset && response.ok && url.pathname.includes("/assets/")
        ? "public, max-age=31536000, immutable"
        : "public, max-age=0, must-revalidate",
    );
    if (!known || response.status === 404)
      headers.set("X-Robots-Tag", "noindex");
    if (url.pathname.endsWith(".xml"))
      headers.set("Content-Type", "application/xml; charset=utf-8");
    if (known && url.pathname.endsWith(".json"))
      headers.set("Content-Type", "application/json; charset=utf-8");
    if (known && url.pathname.endsWith('.mjs')) {
      headers.set('Content-Type', 'text/javascript; charset=utf-8');
      headers.set('Content-Disposition', 'attachment; filename="windows-recovery-1.mjs"');
    }
    if (known && url.pathname.endsWith(".md")) headers.set("Content-Type", "text/markdown; charset=utf-8");
    if (url.pathname.endsWith(".zip")) {
      headers.set("Content-Type", "application/zip");
      headers.set(
        "Content-Disposition",
        'attachment; filename="' + url.pathname.split('/').at(-1) + '"',
      );
    }
    return new Response(request.method === "HEAD" ? null : response.body, {
      status: known ? response.status : 404,
      headers,
    });
  },
};
export default helpWorker;
