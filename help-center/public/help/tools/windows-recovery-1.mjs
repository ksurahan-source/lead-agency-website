#!/usr/bin/env node
// Retired recovery endpoint. Kept as a harmless response for old links.
import { pathToFileURL } from 'node:url';
export async function recoverWindows() {
  return { schema:'HiobWindowsRecovery.v1', ready:false, retired:true, checks:[], actions:[], paidCalls:0,
    blocker:{code:'LEGACY_RECOVERY_RETIRED', action:'로컬 엔진 복구는 종료됐습니다. 기존 프로젝트는 보존하고 https://hi-ob.com/help/troubleshooting/renderer 에서 서버 렌더 버전·권한·작업 상태를 확인하세요.'} };
}
if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  process.stdout.write(JSON.stringify(await recoverWindows(), null, 2)+'\n'); process.exitCode=2;
}
