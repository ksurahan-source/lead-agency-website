import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { PUBLIC_ROUTES, ORIGIN } from "../help-center/src/routes.mjs";
import {
  verifyInstallDescriptor,
  verifyCompatibility,
} from "../help-center/release-contract.mjs";
const output = resolve(process.argv[2] || "output/public-site-check");
const expectedSource = process.argv[3];
if (expectedSource && !/^[a-f0-9]{40}$/.test(expectedSource))
  throw new Error("Expected source must be a full git SHA");
const results = [];
async function get(path, options = {}) {
  const response = await fetch(
    path.startsWith("https:") ? path : ORIGIN + path,
    { signal: AbortSignal.timeout(30000), ...options },
  );
  return response;
}
async function check(name, work) {
  try {
    const detail = await work();
    results.push({ name, status: "passed", ...detail });
  } catch (error) {
    results.push({ name, status: "failed", reason: error.message });
  }
}
function requireValue(condition, reason) {
  if (!condition) throw new Error(reason);
}
for (let start = 0; start < PUBLIC_ROUTES.length; start += 4) {
  await Promise.all(
    PUBLIC_ROUTES.slice(start, start + 4).map((route) =>
      check(route.path, async () => {
        const response = await get(route.path);
        const html = await response.text();
        requireValue(response.status === 200, "HTTP " + response.status);
        requireValue(
          response.url === ORIGIN + route.path,
          "Unexpected redirect: " + response.url,
        );
        requireValue(
          html.includes('href="' + ORIGIN + route.path + '"'),
          "Canonical missing",
        );
        requireValue(
          (html.match(/<h1(?: |>)/g) || []).length === 1,
          "Missing or duplicate H1",
        );
        requireValue(
          !/<meta[^>]+content="[^"]*noindex/.test(html),
          "Unexpected noindex",
        );
        requireValue(
          html.includes("<main") && !html.includes('<div id="root"></div>'),
          "HTML body missing",
        );
        return { bytes: Buffer.byteLength(html) };
      }),
    ),
  );
}
await check("deployed-source", async () => {
  const help = await (await get("/help/version.json")).json();
  const landing = await (await get("/site/version.json")).json();
  if (expectedSource) {
    requireValue(help.source === expectedSource, "Help revision mismatch");
    requireValue(
      landing.source === expectedSource,
      "Landing revision mismatch",
    );
  }
  return {
    help: help.source,
    landing: landing.source,
    mcp: help.mcp,
    routes: help.routes,
  };
});
await check("release-documentation", async () => {
  const descriptor = await (
    await get("https://studio.hi-ob.com/api/mcp/install")
  ).json();
  verifyInstallDescriptor(descriptor);
  verifyCompatibility(await (await get(descriptor.verificationUrl)).json());
  return { mcp: descriptor.version };
});
await check("sitemap-and-robots", async () => {
  const sitemap = await (await get("/sitemap.xml")).text();
  for (const path of [
    "/",
    "/growth",
    "/creative",
    "/system",
    ...PUBLIC_ROUTES.map((r) => r.path),
  ])
    requireValue(
      sitemap.includes("<loc>" + ORIGIN + path + "</loc>"),
      "Missing sitemap URL: " + path,
    );
  const robots = await (await get("/robots.txt")).text();
  requireValue(
    robots.includes("Sitemap: https://hi-ob.com/video-sitemap.xml"),
    "Video sitemap not advertised",
  );
});
await check("unknown-page-is-404", async () => {
  requireValue((await get("/help/does-not-exist")).status === 404, "Soft 404");
});
await check("legacy-path-redirect", async () => {
  const response = await get("/help/voice", { redirect: "manual" });
  requireValue(
    response.status === 308 &&
      response.headers.get("location") ===
        ORIGIN + "/help/troubleshooting/voice",
    "Legacy route is not normalized",
  );
});
await check("watch-film-range", async () => {
  const page = await (await get("/watch/hiob")).text();
  const media = page.match(/<source src="([^"]+)" type="video\/mp4"/)?.[1];
  requireValue(media, "Film not present");
  const response = await get(media, { headers: { Range: "bytes=0-1023" } });
  requireValue(
    response.status === 206,
    "Seeking needs byte ranges; HTTP " + response.status,
  );
  requireValue(
    (await response.arrayBuffer()).byteLength === 1024,
    "Range body differs",
  );
});
for (const agent of ["Googlebot", "OAI-SearchBot", "bingbot"])
  await check("public-reader-" + agent, async () => {
    const response = await get("/mcp", { headers: { "User-Agent": agent } });
    requireValue(
      response.status === 200 &&
        (await response.text()).includes("당신은 방향을 정합니다."),
      "Public HTML unavailable",
    );
    return {
      note: "User-agent response test only; not verified crawler IP or indexing evidence.",
    };
  });
const report = {
  checkedAt: new Date().toISOString(),
  scope:
    "Public HTTP, rendered HTML and installation contract; not search indexing or customer connection proof",
  providerCalls: 0,
  passed: results.every((r) => r.status === "passed"),
  results,
};
await mkdir(output, { recursive: true });
await writeFile(
  resolve(output, "public-check.json"),
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report));
if (!report.passed) process.exitCode = 1;
