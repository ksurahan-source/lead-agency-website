import assert from "node:assert/strict";
import { MCP_RELEASE } from "./src/mcpInstall.mjs";
export function verifyInstallDescriptor(descriptor) {
  for (const key of Object.keys(MCP_RELEASE))
    assert.deepEqual(
      descriptor[key],
      MCP_RELEASE[key],
      "Public installer differs from documentation: " + key,
    );
}
export function verifyCompatibility(manifest) {
  assert.equal(
    manifest.version,
    MCP_RELEASE.version,
    "Public release version differs from installation guide",
  );
  assert.equal(
    manifest.packageSha256,
    MCP_RELEASE.sha256,
    "Public package hash differs from installation guide",
  );
  for (const platform of MCP_RELEASE.platforms) {
    assert.ok(
      manifest.results?.some(
        (row) =>
          row.platform + "-" + row.arch === platform &&
          row.version === MCP_RELEASE.version &&
          row.packageSha256 === MCP_RELEASE.sha256 &&
          row.result === "passed" &&
          row.tests?.renderAndReview === "passed" &&
          row.tests?.audioBinding === "passed",
      ),
      "No exact-package render and audio evidence for " + platform,
    );
  }
}
