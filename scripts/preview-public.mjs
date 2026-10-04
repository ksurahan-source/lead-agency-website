// Local-only preview of both public Workers, with their real routing logic.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import help from "../help-center/worker.mjs";
import landing from "../landing/worker.mjs";
const root = fileURLToPath(new URL("..", import.meta.url));
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".vtt": "text/vtt",
};
function assets(directory) {
  const base = resolve(root, directory);
  return {
    async fetch(request) {
      const path = resolve(
        base,
        "." + decodeURIComponent(new URL(request.url).pathname),
      );
      if (!path.startsWith(base + sep))
        return new Response("not found", { status: 404 });
      try {
        const bytes = await readFile(path);
        return new Response(bytes, {
          headers: {
            "Content-Type": mime[extname(path)] || "application/octet-stream",
            "Content-Length": String(bytes.length),
          },
        });
      } catch {
        return new Response("not found", { status: 404 });
      }
    },
  };
}
const helpEnv = { ASSETS: assets("help-center/dist") },
  landingEnv = { ASSETS: assets("landing/dist") };
createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://127.0.0.1:8798");
    const request = new Request(url, {
      method: req.method,
      headers: req.headers,
    });
    const isLanding = url.pathname === "/" || url.pathname.startsWith("/site/");
    const response = await (isLanding ? landing : help).fetch(
      request,
      isLanding ? landingEnv : helpEnv,
    );
    res.writeHead(response.status, Object.fromEntries(response.headers));
    res.end(Buffer.from(await response.arrayBuffer()));
  } catch {
    res.writeHead(500);
    res.end("Preview request failed");
  }
}).listen(8798, "127.0.0.1", () =>
  console.log("Public preview: http://127.0.0.1:8798"),
);
