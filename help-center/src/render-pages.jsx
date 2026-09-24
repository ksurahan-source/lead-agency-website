import { renderToStaticMarkup } from "react-dom/server";
import HelpCenter from "./HelpCenter";
import ProductPage from "./ProductPage";
import WatchPage from "./WatchPage";
import { ORIGIN, LEGACY_HASHES, HELP_ROUTES, helpHref } from "./routes.mjs";
import { HELP_ARTICLES, HELP_TOPICS } from "./helpTopics.mjs";
import { MCP_RELEASE } from "./mcpInstall.mjs";
import "./base.css";
import "./public.css";

const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
function documentBody(route, context) {
  let body = renderToStaticMarkup(
    route.path === "/mcp" ? (
      <ProductPage {...context} />
    ) : route.path === "/watch/hiob" ? (
      <WatchPage {...context} />
    ) : (
      <HelpCenter route={route} />
    ),
  );
  body = body.replace(/href="#([^"]+)"/g, (match, id) =>
    LEGACY_HASHES[id] ? 'href="' + LEGACY_HASHES[id] + '"' : match,
  );
  // Build a visible table of contents from the actual article, not a second summary.
  body = body.replace(/<article\b[^>]*>[\s\S]*?<\/article>/g, (article) => {
    const headings = [];
    const result = article.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, text) => {
      const id = "step-" + (headings.length + 1);
      headings.push({ id, text });
      return '<h2 id="' + id + '">' + text + "</h2>";
    });
    const toc =
      headings.length > 1
        ? '<nav class="article-toc" aria-label="이 안내의 목차"><strong>이 안내에서</strong><ol>' +
          headings
            .map((h) => '<li><a href="#' + h.id + '">' + h.text + "</a></li>")
            .join("") +
          "</ol></nav>"
        : "";
    return result.replace('<div data-article-toc="true"></div>', toc);
  });
  return body;
}
function schemas(route, context) {
  const publisher = {
    "@type": "Organization",
    name: "HIOB",
    alternateName: "히옵",
    url: ORIGIN,
  };
  const common = { "@context": "https://schema.org", url: ORIGIN + route.path };
  if (route.path === "/watch/hiob")
    return [
      {
        ...common,
        "@type": "VideoObject",
        name: route.title,
        description: route.description,
        thumbnailUrl: [ORIGIN + context.media.poster],
        contentUrl: ORIGIN + context.media.film,
        uploadDate: context.publishedAt,
        duration: "PT30S",
        inLanguage: "ko",
        publisher,
        transcript: context.transcript.map((c) => c.text).join(" "),
      },
    ];
  const graph = [];
  if (route.path === "/mcp")
    graph.push({
      ...common,
      "@type": "SoftwareApplication",
      name: "HIOB MCP",
      applicationCategory: "MultimediaApplication",
      softwareVersion: MCP_RELEASE.version,
      description: route.description,
      publisher,
      operatingSystem: "macOS, Windows, Linux (환경별 검증 범위는 본문 참고)",
    });
  const article = HELP_ARTICLES.find((a) => a.id === route.article);
  if (article)
    graph.push({
      ...common,
      "@type": "TechArticle",
      headline: route.title,
      description: route.description,
      inLanguage: "ko",
      publisher,
      mainEntityOfPage: ORIGIN + route.path,
    });
  const crumbs = [{ name: "HIOB", path: "/" }];
  if (route.path.startsWith("/help"))
    crumbs.push({ name: "도움말", path: "/help" });
  if (article) {
    const topic = HELP_TOPICS.find((t) => t.id === article.topic);
    crumbs.push({ name: topic.title, path: helpHref(topic.id) });
  }
  if (route.path !== "/help")
    crumbs.push({ name: route.title, path: route.path });
  graph.push({
    ...common,
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: ORIGIN + c.path,
    })),
  });
  return graph;
}
export function renderPage(route, context) {
  const title = route.title.includes("HIOB")
    ? route.title
    : route.title + " | HIOB 도움말";
  return (
    '<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' +
    escape(title) +
    '</title><meta name="description" content="' +
    escape(route.description) +
    '"><link rel="canonical" href="' +
    ORIGIN +
    route.path +
    '"><meta property="og:title" content="' +
    escape(title) +
    '"><meta property="og:description" content="' +
    escape(route.description) +
    '"><meta property="og:type" content="website"><meta property="og:url" content="' +
    ORIGIN +
    route.path +
    '"><meta property="og:image" content="' +
    ORIGIN +
    context.media.poster +
    '"><meta name="twitter:card" content="summary_large_image"><link rel="icon" href="/site/favicon.svg"><link rel="stylesheet" href="' +
    context.css +
    '"><script type="application/ld+json">' +
    JSON.stringify(schemas(route, context)).replaceAll("<", "\\u003c") +
    '</script><script type="module" src="' +
    context.js +
    '"></script></head><body>' +
    documentBody(route, context) +
    "</body></html>"
  );
}
export function renderNotFound(context) {
  const route = HELP_ROUTES[0];
  return renderPage(route, context)
    .replace("<head>", '<head><meta name="robots" content="noindex">')
    .replace(
      /<main[\s\S]*?<\/main>/,
      '<main class="watch-page"><h1>안내를 찾을 수 없습니다.</h1><p>주소가 바뀌었거나 없는 페이지입니다.</p><a href="/help">전체 도움말에서 찾기 →</a></main>',
    )
    .replace("<h1>첫 영상까지, 한 단계씩.</h1>", "");
}
