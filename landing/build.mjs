import { cp, mkdir, readFile, writeFile, rm, rename } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("..", import.meta.url));
const destination = new URL("./dist/", import.meta.url);
await rm(destination, { recursive: true, force: true });
await mkdir(new URL("site/media/", destination), { recursive: true });
let html = await readFile(new URL("./src/index.html", import.meta.url), "utf8");
html = html.replace(
  "<!-- CINEMA -->",
  await readFile(new URL("./src/cinema.html", import.meta.url), "utf8"),
);
// Publish only assets referenced by this page. Rejected or untracked old films
// must never hitch a ride from the public directory into a production build.
const references = [...new Set(html.match(/\/site\/media\/[a-zA-Z0-9.-]+/g))];
const media = [];
for (const ref of references) {
  const content = await readFile(new URL(`./public${ref}`, import.meta.url));
  const dot = ref.lastIndexOf(".");
  const name = `${ref.slice(0, dot)}-${createHash("sha256").update(content).digest("hex").slice(0, 12)}${ref.slice(dot)}`;
  await writeFile(new URL(`.${name}`, destination), content);
  html = html.replaceAll(ref, name);
  media.push({ file: name, bytes: content.length });
}
await cp(
  new URL("./public/site/favicon.svg", import.meta.url),
  new URL("site/favicon.svg", destination),
);
const built = spawnSync(
  "npx",
  [
    "--yes",
    "--package=esbuild@0.28.1",
    "esbuild",
    "landing/src/landing.js",
    "--bundle",
    "--splitting",
    "--minify",
    "--format=esm",
    "--entry-names=[name]",
    "--chunk-names=chunks/[name]-[hash]",
    "--outdir=landing/dist/site",
  ],
  { cwd: root, stdio: "inherit" },
);
if (built.status !== 0) throw new Error("Landing build failed");
const assets = {};
for (const extension of ["js", "css"]) {
  const from = new URL(`site/landing.${extension}`, destination),
    content = await readFile(from);
  const name = `landing-${createHash("sha256").update(content).digest("hex").slice(0, 12)}.${extension}`;
  await rename(from, new URL(`site/${name}`, destination));
  html = html.replace(`/site/landing.${extension}`, `/site/${name}`);
  assets[extension] = { file: name, bytes: content.length };
  // The complete landing stylesheet is only 16 KB before compression. Including
  // it in HTML removes a render-blocking round trip for the first visit.
  if (extension === "css") {
    html = html.replace(`<link rel="stylesheet" href="/site/${name}" />`, `<style>${content.toString()}</style>`);
  }
}
await writeFile(new URL("index.html", destination), html);
const source = spawnSync("git", ["rev-parse", "HEAD"], {
  cwd: root,
  encoding: "utf8",
}).stdout.trim();
await writeFile(
  new URL("site/version.json", destination),
  JSON.stringify({ source, builtAt: new Date().toISOString(), assets, media }),
);
console.log(
  JSON.stringify({
    source,
    assets,
    mediaBytes: media.reduce((n, m) => n + m.bytes, 0),
  }),
);
