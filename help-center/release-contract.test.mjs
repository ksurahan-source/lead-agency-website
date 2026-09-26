import test from "node:test";
import assert from "node:assert/strict";
import { MCP_RELEASE } from "./src/mcpInstall.mjs";
import {
  verifyInstallDescriptor,
  verifyCompatibility,
} from "./release-contract.mjs";
test("reject changed install command, package, support claim or credit policy", () => {
  assert.doesNotThrow(() => verifyInstallDescriptor(MCP_RELEASE));
  for (const update of [
    { installerUrl: "https://example.com/install.sh" },
    { version: MCP_RELEASE.version + "-unexpected" },
    { platforms: [...MCP_RELEASE.platforms, "win32-x64"] },
    { generationRequiresCredits: false },
  ]) {
    assert.throws(() => verifyInstallDescriptor({ ...MCP_RELEASE, ...update }));
  }
});
test("a green test from another package or missing audio is not evidence for this release", () => {
  const manifest = {
    version: MCP_RELEASE.version,
    packageSha256: MCP_RELEASE.sha256,
    results: MCP_RELEASE.platforms.map((platform) => {
      const [os, arch] = platform.split("-");
      return {
        platform: os,
        arch,
        version: MCP_RELEASE.version,
        packageSha256: MCP_RELEASE.sha256,
        result: "passed",
        tests: { renderAndReview: "passed", audioBinding: "passed" },
      };
    }),
  };
  assert.doesNotThrow(() => verifyCompatibility(manifest));
  const badAudio = structuredClone(manifest);
  badAudio.results[0].tests.audioBinding = "not_tested";
  assert.throws(() => verifyCompatibility(badAudio));
  const oldPackage = structuredClone(manifest);
  oldPackage.results[0].packageSha256 = "old";
  assert.throws(() => verifyCompatibility(oldPackage));
});
