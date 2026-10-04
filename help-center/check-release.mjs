import { createHash } from "node:crypto";
import assert from "node:assert/strict";
import { MCP_RELEASE } from "./src/mcpInstall.mjs";
import {
  verifyCompatibility,
  verifyInstallDescriptor,
} from "./release-contract.mjs";
async function get(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!response.ok)
    throw new Error(
      "Release check failed: HTTP " + response.status + " at " + url,
    );
  return response;
}
verifyInstallDescriptor(
  await (await get("https://studio.hi-ob.com/api/mcp/install")).json(),
);
const manifest = await (await get(MCP_RELEASE.verificationUrl)).json();
verifyCompatibility(manifest);
const packed = await (await get(MCP_RELEASE.packageUrl)).arrayBuffer();
assert.equal(
  createHash("sha256").update(Buffer.from(packed)).digest("hex"),
  MCP_RELEASE.sha256,
  "Downloaded package does not match documented SHA256",
);
for (const url of [MCP_RELEASE.installerUrl, MCP_RELEASE.toolsInstallerUrl]) {
  const source = await (await get(url)).text();
  assert.ok(
    source.includes(MCP_RELEASE.version),
    "Installer release mismatch: " + url,
  );
}
console.log(
  JSON.stringify({
    status: "passed",
    checkedAt: new Date().toISOString(),
    mcp: MCP_RELEASE.version,
    sha256: MCP_RELEASE.sha256,
    bytes: packed.byteLength,
    providerCalls: 0,
  }),
);
