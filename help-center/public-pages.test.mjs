import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import worker from "./worker.mjs";
import { createHash } from 'node:crypto';
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
  assert.ok(documents.get("/help/skills").includes("hiob-video-skill-1.3.4.zip"));
});

test("every linked skill download and its references are served by the worker", async () => {
  const paths = new Set([...documents.get('/help/skills').matchAll(/href="(\/help\/(?:skills\/|hiob-video-skill-)[^"]+)"/g)].map(m => m[1]));
  for (const m of documents.get('/help/create').matchAll(/href="(\/help\/skills\/[^"]+)"/g)) paths.add(m[1]);
  paths.add('/help/hiob-video-skill-1.0.0.zip');
  paths.add('/help/skills/hiob-video-1.3.1/references/inspection-guide.md');
  paths.add('/help/skills/hiob-video-1.3.1/references/production-workflow.md');
  paths.add('/help/skills/inspection-guide-1.3.1.md');
  paths.add('/help/skills/hiob-video-1.1.0/references/production-workflow.md');
  assert.ok(paths.size >= 4);
  for (const path of paths) {
    const response = await worker.fetch(new Request(ORIGIN + path), env);
    assert.equal(response.status, 200, path);
    if (path.endsWith('.zip')) assert.equal(response.headers.get('content-disposition'), 'attachment; filename="' + path.split('/').at(-1) + '"');
  }
  assert.equal((await worker.fetch(new Request(ORIGIN + '/help/hiob-video-skill-9.9.9.zip'), env)).status, 404);
  assert.equal((await worker.fetch(new Request(ORIGIN + '/help/skills/production-guide-9.9.9.md'), env)).status, 404);
});

test("new-customer entries return to the welcome hub and explain setup before Codex approval", () => {
  for (const [route, html] of documents) {
    assert.ok(html.includes('href="https://studio.hi-ob.com/start"'), route + ' welcome entry');
    for (const [, raw] of html.matchAll(/href="(https:\/\/studio\.hi-ob\.com\/(?:studio\/(?:signup|login)|onboarding)[^"]*)"/g)) {
      const url = new URL(decode(raw));
      assert.equal(url.searchParams.get('next'), '/start', route + ' ' + url.pathname);
    }
  }
  const connect = documents.get('/help/connect');
  const article = connect.match(/<article\b[^>]*>([\s\S]*?)<\/article>/)?.[1];
  assert.ok(article, 'connection help article');
  const headings = [...article.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)]
    .map(([, heading]) => decode(heading.replace(/<[^>]+>/g, '')));
  assert.deepEqual(headings.slice(0, 6), [
    'HIOB 계정 만들기', '이메일 확인하기', '내 정보와 작업공간 설정하기',
    '첫 프로젝트 준비하기', 'Codex에 연결 요청하기', '연결된 프로젝트 확인하기',
  ]);
  assert.ok(connect.includes('Codex 로그인과 HIOB 계정은 별개'));
  assert.ok(connect.includes('connection_ensure()'));
  assert.ok(connect.includes('사이트 재방문 없이'));
  assert.ok(connect.includes('실제로 접근하면'));
  const windows = documents.get('/help/windows-test');
  assert.ok(windows.indexOf('다른 이메일로 회원가입하고 확인하기') < windows.indexOf('Windows에 설치하고 Codex 연결'));
  assert.ok(windows.includes('실제 고객 기기에서 확인하는 단계'));
  assert.ok(windows.includes('전화번호는 선택'));
});

test("public release manifest is served as JSON and matches installation instructions", async () => {
  const response = await worker.fetch(new Request(ORIGIN + '/help/mcp-release.json'), env);
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /^application\/json/);
  assert.deepEqual(await response.json(), MCP_RELEASE);
  assert.equal((await worker.fetch(new Request(ORIGIN + '/help/missing-release.json'), env)).status, 404);
});

test('retired Windows recovery stays hash-bound while current guidance uses server status without local repair',async()=>{
  const descriptor=await worker.fetch(new Request(ORIGIN+'/help/tools/windows-recovery-1.json'),env);
  assert.equal(descriptor.status,200);
  assert.match(descriptor.headers.get('content-type'),/^application\/json/);
  const receipt=await descriptor.json();
  const file=await worker.fetch(new Request(ORIGIN+'/help/tools/windows-recovery-1.mjs'),env);
  assert.equal(file.status,200);
  assert.match(file.headers.get('content-type'),/^text\/javascript/);
  assert.match(file.headers.get('content-disposition'),/attachment/);
  const bytes=Buffer.from(await file.arrayBuffer());
  assert.equal(bytes.length,receipt.bytes);
  assert.equal(createHash('sha256').update(bytes).digest('hex'),receipt.sha256);
  const renderer=decode(documents.get('/help/troubleshooting/renderer'));
  assert.ok(renderer.includes('예전 Windows 엔진 복구 도구는 종료'));
  assert.ok(renderer.includes('Remotion AWS Lambda'));
  assert.ok(renderer.includes('render_status'));
  assert.ok(!renderer.includes('node $file --repair'));
  assert.ok(!renderer.includes('docker version'));
  const voice=documents.get('/help/troubleshooting/voice');
  assert.ok(voice.includes('전체 제작 설정'));
  assert.ok(voice.includes('connection_attach'));
  assert.equal((await worker.fetch(new Request(ORIGIN+'/help/tools/not-a-tool.mjs'),env)).status,404);
});

test('original video preservation skill is downloadable for the current release',async()=>{
 const response=await worker.fetch(new Request(ORIGIN+'/help/skills/hiob-creative-edit-1.1.0/SKILL.md'),env);
 assert.equal(response.status,200);assert.match(await response.text(),/audio_export_download/);
});

test("asset sharing guide distinguishes placement from editable import", () => {
  const page=documents.get("/help/assets");
  assert.ok(page.includes("현재 편집 자료에 가져오기"));
  assert.ok(page.includes("같은 작업공간"));
  assert.ok(page.includes("asset_read"));
});
