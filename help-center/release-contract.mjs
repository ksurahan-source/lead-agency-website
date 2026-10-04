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
export function verifyCompatibility(manifest, release = MCP_RELEASE) {
  assert.equal(
    manifest.version,
    release.version,
    "Public release version differs from installation guide",
  );
  assert.equal(
    manifest.packageSha256,
    release.sha256,
    "Public package hash differs from installation guide",
  );
  for (const platform of release.platforms) {
    assert.ok(
      manifest.results?.some(
        (row) =>
          row.platform + "-" + row.arch === platform &&
          row.version === release.version &&
          row.packageSha256 === release.sha256 &&
          row.result === "passed" &&
          row.tests?.renderAndReview === "passed" &&
          row.tests?.audioBinding === "passed",
      ),
      "No exact-package render and audio evidence for " + platform,
    );
  }
}
