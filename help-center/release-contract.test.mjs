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
  const release = { ...MCP_RELEASE, platforms: ["darwin-arm64"] };
  const manifest = {
    version: release.version,
    packageSha256: release.sha256,
    results: release.platforms.map((platform) => {
      const [os, arch] = platform.split("-");
      return {
        platform: os,
        arch,
        version: release.version,
        packageSha256: release.sha256,
        result: "passed",
        tests: { renderAndReview: "passed", audioBinding: "passed" },
      };
    }),
  };
  assert.doesNotThrow(() => verifyCompatibility(manifest, release));
  const badAudio = structuredClone(manifest);
  badAudio.results[0].tests.audioBinding = "not_tested";
  assert.throws(() => verifyCompatibility(badAudio, release));
  const missingRender = structuredClone(manifest);
  missingRender.results[0].tests.renderAndReview = "not_tested";
  assert.throws(() => verifyCompatibility(missingRender, release));
  const oldPackage = structuredClone(manifest);
  oldPackage.results[0].packageSha256 = "old";
  assert.throws(() => verifyCompatibility(oldPackage, release));
  assert.throws(() => verifyCompatibility({ ...manifest, results: [] }, release));
});
test("a release without final-render platform claims still requires exact release identity", () => {
  const release = { ...MCP_RELEASE, platforms: [] };
  const manifest = {
    version: release.version,
    packageSha256: release.sha256,
    results: [],
  };
  assert.doesNotThrow(() => verifyCompatibility(manifest, release));
  assert.throws(() => verifyCompatibility({ ...manifest, version: "old" }, release));
  assert.throws(() => verifyCompatibility({ ...manifest, packageSha256: "old" }, release));
});
