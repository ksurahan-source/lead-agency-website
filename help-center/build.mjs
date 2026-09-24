import { cp, mkdir, readFile, writeFile, rm } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { PUBLIC_ROUTES, ORIGIN } from "./src/routes.mjs";
import { MCP_RELEASE } from "./src/mcpInstall.mjs";

// Product examples and human-readable support summaries were reviewed against this release.
// Updating the installer descriptor requires re-reviewing that editorial copy too.
if (MCP_RELEASE.version !== "0.5.0") throw new Error("Review ProductPage and customer procedures against the new MCP release before publishing");

const root = fileURLToPath(new URL("..", import.meta.url));
const destination = new URL("./dist/", import.meta.url);
const digest = (value) =>
  createHash("sha256").update(value).digest("hex").slice(0, 12);
function run(command, args, capture = false) {
  const result = spawnSync(command, args, {
    cwd: root,
    ...(capture ? { encoding: "utf8" } : { stdio: "inherit" }),
  });
  if (result.status !== 0)
    throw new Error(
      command + " failed: " + (result.stderr || result.error || result.status),
    );
  return capture ? result.stdout.trim() : undefined;
}
await rm(destination, { recursive: true, force: true });
await mkdir(new URL("help/assets/", destination), { recursive: true });
await mkdir(new URL(".build/", import.meta.url), { recursive: true });
// Only reviewed skill files are copied; the retired SPA shell is not published.
await cp(
  new URL("public/help/skills/", import.meta.url),
  new URL("help/skills/", destination),
  { recursive: true },
);
run("npx", [
  "--yes",
  "--package=esbuild@0.28.1",
  "esbuild",
  "help-center/src/render-pages.jsx",
  "--bundle",
  "--minify",
  "--jsx=automatic",
  "--platform=node",
  "--packages=external",
  "--format=esm",
  "--outfile=help-center/.build/render.mjs",
]);
run("npx", [
  "--yes",
  "--package=esbuild@0.28.1",
  "esbuild",
  "help-center/src/enhance.mjs",
  "--bundle",
  "--minify",
  "--format=esm",
  "--outfile=help-center/.build/enhance.js",
]);
const assets = {};
for (const [key, file] of Object.entries({
  css: "render.css",
  js: "enhance.js",
})) {
  const content = await readFile(new URL(".build/" + file, import.meta.url));
  assets[key] = "/help/assets/help-" + digest(content) + "." + key;
  await writeFile(new URL("." + assets[key], destination), content);
}
const media = {};
for (const [key, file] of Object.entries({
  poster: "hiob-poster.jpg",
  film: "hiob-film.mp4",
  captions: "hiob-film.vtt",
})) {
  const content = await readFile(
    new URL("../landing/public/site/media/" + file, import.meta.url),
  );
  const dot = file.lastIndexOf(".");
  media[key] =
    "/site/media/" +
    file.slice(0, dot) +
    "-" +
    digest(content) +
    file.slice(dot);
}
const captions = await readFile(
  new URL("../landing/public/site/media/hiob-film.vtt", import.meta.url),
  "utf8",
);
const transcript = [
  ...captions.matchAll(
    /(\d\d):(\d\d):(\d\d)\.\d+ --> [^\n]+\n([^\n]+(?:\n[^\n]+)*)/g,
  ),
].map((m) => ({
  time: m[2] + ":" + m[3],
  text: m[4].trim().replaceAll("\n", " "),
}));
if (!transcript.length) throw new Error("Film transcript is missing");
const publishedAt = run(
  "git",
  [
    "log",
    "-1",
    "--format=%aI",
    "--",
    "landing/public/site/media/hiob-film.mp4",
  ],
  true,
);
if (!publishedAt) throw new Error("Film publication revision is missing");
const cssText = await readFile(new URL('.build/render.css', import.meta.url), 'utf8');
const context = { ...assets, cssText, media, transcript, publishedAt };
const { renderPage, renderNotFound } = await import("./.build/render.mjs");
for (const route of PUBLIC_ROUTES) {
  const target = new URL("." + route.path + "/index.html", destination);
  await mkdir(new URL(".", target), { recursive: true });
  await writeFile(target, renderPage(route, context));
}
await writeFile(new URL("help/404.html", destination), renderNotFound(context));
const legacyPaths = [
  "/",
  "/lead",
  "/growth",
  "/creative",
  "/system",
  "/privacy",
  "/terms",
];
const urls = [...legacyPaths, ...PUBLIC_ROUTES.map((r) => r.path)];
await writeFile(
  new URL("sitemap.xml", destination),
  '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    urls.map((path) => "<url><loc>" + ORIGIN + path + "</loc></url>").join("") +
    "</urlset>",
);
await writeFile(
  new URL("video-sitemap.xml", destination),
  '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"><url><loc>' +
    ORIGIN +
    "/watch/hiob</loc><video:video><video:thumbnail_loc>" +
    ORIGIN +
    media.poster +
    "</video:thumbnail_loc><video:title>HIOB 사용 흐름 — 대화에서 영상 프로젝트까지</video:title><video:description>자료·기획·장면·목소리·편집을 연결하는 30초 연출 영상</video:description><video:content_loc>" +
    ORIGIN +
    media.film +
    "</video:content_loc><video:duration>30</video:duration></video:video></url></urlset>",
);
// Preserve the existing public crawling policy; private access still requires authentication.
await writeFile(
  new URL("robots.txt", destination),
  "User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /agent\nDisallow: /api/\n\nSitemap: https://hi-ob.com/sitemap.xml\nSitemap: https://hi-ob.com/video-sitemap.xml\n",
);
run("python3", [
  "-c",
  "import pathlib,zipfile; root=pathlib.Path('help-center/public/help/skills'); z=zipfile.ZipFile('help-center/dist/help/hiob-video-skill-1.0.0.zip','w',zipfile.ZIP_DEFLATED); [z.write(p,p.relative_to(root)) for p in sorted(root.rglob('*')) if p.is_file()]; z.close()",
]);
const source = run("git", ["rev-parse", "HEAD"], true);
await writeFile(
  new URL("help/version.json", destination),
  JSON.stringify({
    source,
    mcp: MCP_RELEASE.version,
    skill: "1.0.0",
    routes: PUBLIC_ROUTES.length,
    assets,
    media,
    builtAt: new Date().toISOString(),
  }),
);
console.log(
  "Built " +
    PUBLIC_ROUTES.length +
    " readable HTML documents; browser needs no React runtime.",
);
