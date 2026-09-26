import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import worker from "./worker.mjs";
import { PUBLIC_ROUTES, LEGACY_HASHES, ORIGIN } from "./src/routes.mjs";
import {
  MCP_RELEASE,
  MCP_WINDOWS_INSTALL_COMMAND,
  MCP_CODEX_INSTALL_COMMAND,
  MCP_LINUX_INSTALL_COMMAND,
} from "./src/mcpInstall.mjs";
const dist = new URL("./dist/", import.meta.url);
const read = (path) => readFile(new URL("." + path, dist), "utf8");
const decode = (text) =>
  text
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
const documents = new Map(
  await Promise.all(
    PUBLIC_ROUTES.map(async (route) => [
      route.path,
      await read(route.path + "/index.html"),
    ]),
  ),
);
const env = {
  ASSETS: {
    async fetch(request) {
      try {
        return new Response(await read(new URL(request.url).pathname), {
          headers: { "Content-Type": "text/html; charset=utf-8" },
        });
      } catch {
        return new Response("not found", { status: 404 });
      }
    },
  },
};
test("all public routes expose distinct readable documents without running JavaScript", () => {
  const titles = new Set();
  for (const [path, html] of documents) {
    assert.equal((html.match(/<h1(?: |>)/g) || []).length, 1, path);
    assert.ok(
      html.includes('href="' + ORIGIN + path + '"'),
      "self canonical " + path,
    );
    assert.ok(
      !html.includes('<div id="root"></div>'),
      "no client-only shell " + path,
    );
    assert.ok(!html.includes("data-article-toc"), "TOC resolved " + path);
    const title = html.match(/<title>(.*?)<\/title>/)[1];
    assert.ok(!titles.has(title), "unique title " + path);
    titles.add(title);
    const visible = html
      .replace(/<script[\s\S]*?<\/script>/g, "")
      .replace(/<[^>]+>/g, "");
    assert.ok(visible.length > 300, "substantive initial HTML " + path);
    assert.ok(!html.includes('href="#windows"'), "real document links " + path);
    const schemas = JSON.parse(
      html.match(/type="application\/ld\+json">([\s\S]*?)<\/script>/)[1],
    );
    assert.ok(schemas.length > 0, "parseable schema " + path);
  }
});
test("all local document links and in-page anchors resolve", () => {
  const legacy = new Set(["/", "/terms", "/privacy"]);
  for (const [path, html] of documents) {
    for (const [, raw] of html.matchAll(/href="([^"]+)"/g)) {
      const href = decode(raw);
      if (href.startsWith("#"))
        assert.ok(
          html.includes('id="' + href.slice(1) + '"'),
          path + " " + href,
        );
      if (
        !href.startsWith("/") ||
        href.startsWith("/site/") ||
        href.startsWith("/help/assets/")
      )
        continue;
      const destination = href.split(/[?#]/)[0];
      assert.ok(
        documents.has(destination) ||
          legacy.has(destination) ||
          /^\/help\/(?:skills\/|hiob-video-skill-)/.test(destination),
        path + " -> " + destination,
      );
    }
  }
});
test("OS instructions visibly retain the release commands and unverified environments", () => {
  for (const [os, command] of Object.entries({
    windows: MCP_WINDOWS_INSTALL_COMMAND,
    macos: MCP_CODEX_INSTALL_COMMAND,
    linux: MCP_LINUX_INSTALL_COMMAND,
  })) {
    const html = decode(documents.get("/help/install/" + os));
    assert.ok(html.includes("<pre>" + command + "</pre>"), os);
    assert.ok(html.includes(MCP_RELEASE.version));
    assert.ok(html.includes("이 안내에서"));
  }
  assert.ok(
    documents.get("/help/install/windows").includes("최종 검증은 진행 전"),
  );
  const compatibility = documents.get("/help/compatibility");
  for (const row of MCP_RELEASE.compatibility) {
    assert.ok(compatibility.includes(row.label));
    assert.ok(compatibility.includes(row.renderLabel));
  }
});
test("product and watch pages describe the human-led workflow and actual film transcript", () => {
  const product = documents.get("/mcp"),
    watch = documents.get("/watch/hiob");
  assert.ok(product.includes("당신은 방향을 정합니다."));
  assert.ok(product.includes("기획을 먼저 확인"));
  assert.ok(product.includes("실제 고객 기기 검증 대기"));
  assert.ok(watch.includes('<video controls=""'));
  assert.ok(watch.includes("쓰던 AI에,"));
  assert.ok(watch.includes("히옵이 연결합니다."));
  assert.ok(
    watch.includes("실제 고객 화면 녹화나 설치 성공의 증거 영상은 아닙니다."),
  );
  assert.ok(watch.includes('kind="captions"'));
});
test("worker serves MCP with 200, normalizes old paths, preserves actual 404 and rejects writes", async () => {
  for (const path of documents.keys()) {
    const response = await worker.fetch(new Request(ORIGIN + path), env);
    assert.equal(response.status, 200, path);
    assert.ok((await response.text()).includes("<h1"));
  }
  for (const [from, to] of [
    ["/mcp/", "/mcp"],
    ["/help/voice", "/help/troubleshooting/voice"],
    ["/help/install/windows/", "/help/install/windows"],
  ]) {
    const response = await worker.fetch(new Request(ORIGIN + from), env);
    assert.equal(response.status, 308);
    assert.equal(response.headers.get("location"), ORIGIN + to);
  }
  const missing = await worker.fetch(
    new Request(ORIGIN + "/help/not-a-page"),
    env,
  );
  assert.equal(missing.status, 404);
  assert.equal(missing.headers.get("x-robots-tag"), "noindex");
  assert.ok((await missing.text()).includes("안내를 찾을 수 없습니다"));
  assert.equal(
    (await worker.fetch(new Request(ORIGIN + "/mcp", { method: "POST" }), env))
      .status,
    405,
  );
  assert.equal(
    await (
      await worker.fetch(new Request(ORIGIN + "/mcp", { method: "HEAD" }), env)
    ).text(),
    "",
  );
});
test("sitemap preserves existing services and includes every new canonical document", async () => {
  const sitemap = await read("/sitemap.xml");
  for (const path of [
    ...documents.keys(),
    "/growth",
    "/creative",
    "/system",
    "/privacy",
    "/terms",
  ])
    assert.ok(sitemap.includes("<loc>" + ORIGIN + path + "</loc>"));
  assert.ok(!sitemap.includes("#"));
  const robots = await read("/robots.txt");
  assert.ok(robots.includes("Sitemap: https://hi-ob.com/video-sitemap.xml"));
  assert.ok(robots.includes("Disallow: /api/"));
  for (const value of Object.values(LEGACY_HASHES))
    assert.ok(documents.has(value), value);
});
test("watch media fingerprints match assets actually published by the landing build", async () => {
  const help = JSON.parse(await read("/help/version.json"));
  const landing = JSON.parse(
    await readFile(
      new URL("../landing/dist/site/version.json", import.meta.url),
    ),
  );
  for (const file of Object.values(help.media))
    assert.ok(
      landing.media.some((item) => item.file === file),
      file,
    );
});

test("update help explains diagnosis without claiming account or creative success", () => {
  const update = documents.get("/help/troubleshooting/update");
  assert.ok(update, "update route must exist");
  for (const term of ["release_check", "current", "update_available", "candidate", "unavailable", "무결성", "품질"]) assert.ok(update.includes(term), term);
  assert.ok(documents.get("/help/skills").includes("hiob-video-skill-1.1.0.zip"));
});

test("every linked skill download and its references are served by the worker", async () => {
  const paths = new Set([...documents.get('/help/skills').matchAll(/href="(\/help\/(?:skills\/|hiob-video-skill-)[^"]+)"/g)].map(m => m[1]));
  paths.add('/help/hiob-video-skill-1.0.0.zip');
  paths.add('/help/skills/hiob-video-1.1.0/references/production-workflow.md');
  assert.ok(paths.size >= 4);
  for (const path of paths) {
    const response = await worker.fetch(new Request(ORIGIN + path), env);
    assert.equal(response.status, 200, path);
    if (path.endsWith('.zip')) assert.equal(response.headers.get('content-disposition'), 'attachment; filename="' + path.split('/').at(-1) + '"');
  }
  assert.equal((await worker.fetch(new Request(ORIGIN + '/help/hiob-video-skill-9.9.9.zip'), env)).status, 404);
});
