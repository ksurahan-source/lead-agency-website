import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import worker from "./worker.mjs";

test("published assets are only the new film and its own component references", async () => {
  const html = await readFile(
    new URL("./dist/index.html", import.meta.url),
    "utf8",
  );
  const files = await readdir(new URL("./dist/site/media/", import.meta.url));
  assert.doesNotMatch(html, /hiob-reel|viewok|showcase\/|hiob-product-film/);
  assert.ok(files.some((f) => /^hiob-film-[a-f0-9]{12}\.mp4$/.test(f)));
  assert.ok(
    files.some((f) => /^hiob-scroll-mobile-[a-f0-9]{12}\.mp4$/.test(f)),
  );
  for (const file of files) {
    assert.ok(html.includes(`/site/media/${file}`), file);
    const content = await readFile(
      new URL(`./dist/site/media/${file}`, import.meta.url),
    );
    assert.ok(
      file.includes(
        createHash("sha256").update(content).digest("hex").slice(0, 12),
      ),
    );
  }
});
test("page loads the small entry first and the separately bundled Three.js stage on demand", async () => {
  const meta = JSON.parse(
    await readFile(new URL("./dist/site/version.json", import.meta.url)),
  );
  const entry = await readFile(
    new URL(`./dist/site/${meta.assets.js.file}`, import.meta.url),
    "utf8",
  );
  assert.ok(meta.assets.js.bytes < 15000);
  assert.match(entry, /import\("\.\/chunks\/stage-three-/);
  const match = entry.match(/import\("(\.\/chunks\/stage-three-[^"]+)"/);
  assert.ok(
    (await readFile(new URL(`./dist/site/${match[1]}`, import.meta.url)))
      .length > 10000,
  );
});
test("fingerprinted film and chunks are immutable but release marker is revalidated", async () => {
  const env = { ASSETS: { fetch: async () => new Response("asset") } };
  for (const path of [
    "/site/chunks/stage-three-ABCDEFG8.js",
    "/site/media/hiob-film-012345abcdef.mp4",
    "/site/landing-abcdef012345.js",
  ]) {
    const result = await worker.fetch(
      new Request(`https://hi-ob.com${path}`),
      env,
    );
    assert.match(result.headers.get("cache-control"), /immutable/);
  }
  const result = await worker.fetch(
    new Request("https://hi-ob.com/site/version.json"),
    env,
  );
  assert.match(result.headers.get("cache-control"), /must-revalidate/);
});
