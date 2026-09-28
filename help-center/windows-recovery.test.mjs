import test from 'node:test';
import assert from 'node:assert/strict';
import { recoverWindows, parseOptions } from './public/help/tools/windows-recovery-1.mjs';
const hash = 'a'.repeat(64);
function fixture(overrides = {}) {
  const commands = [];
  let infoCalls = 0, doctorCalls = 0;
  const root = 'C:\\Users\\고객\\AppData\\Local\\HIOB\\MCP';
  const deps = { platform: 'win32', env: { LOCALAPPDATA: 'C:\\Users\\고객\\AppData\\Local',
    PATH: 'test-path', SUPABASE_SECRET_KEY: 'never-forward', TYPECAST_API_KEY: 'never-forward', ...overrides.env },
    files: {
      realpath: async file => overrides.escape && file.endsWith('cli.mjs') ? 'C:\\outside\\cli.mjs' : file,
      readFile: async file => {
        if (overrides.missing) throw Error('file not found');
        if (file.endsWith('current.json')) return JSON.stringify({ schema: 'HiobMcpActiveRelease.v1', version: '0.6.3', sha256: hash, sessionContract: 1, ...overrides.pointer });
        if (file.endsWith('.release-sha256')) return overrides.receipt || hash;
        if (file.endsWith('package.json')) return JSON.stringify({name:'@hiob/mcp',version:'0.6.3',hiobSessionContract:1});
        throw Error('unexpected file');
      },
    },
    run: async (file, args, options) => {
      commands.push({file,args,options});
      assert.equal(options.env.SUPABASE_SECRET_KEY, undefined);
      assert.equal(options.env.TYPECAST_API_KEY, undefined);
      if (args[0] === '--version') { if (overrides.noDocker) throw Error('not found'); return {stdout:'Docker'}; }
      if (args[0] === 'context') return {stdout:JSON.stringify(overrides.endpoint || 'npipe:////./pipe/dockerDesktopLinuxEngine')};
      if (args[0] === 'info') {
        infoCalls++;
        if (overrides.stopped && infoCalls === 1) throw Error('engine stopped');
        return {stdout:overrides.os || 'linux'};
      }
      if (args[0] === 'desktop') {
        assert.deepEqual(args,['desktop','start','--timeout','45']);
        assert.ok(options.timeout < 60000);
        if (overrides.startFails) throw Error('secret or raw infrastructure detail');
        return {stdout:''};
      }
      if (args[0] === 'buildx') { if (overrides.noBuildx) throw Error('not found'); return {stdout:'buildx'}; }
      assert.ok(args[0].startsWith(root));
      if (args[1] === 'doctor') {
        doctorCalls++;
        const result = {platform:overrides.doctorPlatform || 'win32', renderBackend:'docker',ready:!(overrides.needsSetup && (doctorCalls === 1 || overrides.stillFails))};
        if (!result.ready) throw Object.assign(new Error('not ready'),{code:2,stdout:JSON.stringify(result)});
        return {stdout:JSON.stringify(result)};
      }
      assert.equal(args[1], 'setup-renderer');
      if (overrides.setupFails) throw Error('build failed');
      return {stdout:'{}'};
    },
  };
  return {deps,commands};
}
test('default diagnosis does not start Docker or alter installations', async () => {
  const f=fixture({stopped:true});
  const result=await recoverWindows({},f.deps);
  assert.equal(result.blocker.code,'DOCKER_ENGINE_STOPPED');
  assert.equal(result.ready,false);
  assert.deepEqual(result.actions,[]);
  assert.equal(f.commands.length,3);
});
test('explicit repair starts local Docker and prepares the installed version without restarting host or forwarding keys', async () => {
  const f=fixture({stopped:true,needsSetup:true});
  const result=await recoverWindows({repair:true},f.deps);
  assert.equal(result.ready,true);
  assert.deepEqual(result.actions,['docker_start_requested','renderer_setup_completed']);
  assert.equal(result.voice,'not_checked');
  assert.equal(result.videoRender,'not_tested');
  assert.equal(result.paidCalls,0);
});
test('ready installation is not rebuilt', async () => {
  const f=fixture(); const result=await recoverWindows({repair:true},f.deps);
  assert.equal(result.ready,true); assert.deepEqual(result.actions,[]);
});
for (const endpoint of ['tcp://example.com:2375','ssh://server','npipe:////other-host/pipe/docker']) {
  test('refuses nonlocal Docker endpoint '+endpoint,async()=>{
    const f=fixture({endpoint}); const result=await recoverWindows({repair:true},f.deps);
    assert.equal(result.blocker.code,'LOCAL_DOCKER_REQUIRED');
    assert.ok(!f.commands.some(c=>['info','desktop'].includes(c.args[0])));
  });
}
test('Docker context overrides DOCKER_HOST just as Docker does',async()=>{
  const f=fixture({env:{DOCKER_CONTEXT:'desktop-linux',DOCKER_HOST:'tcp://example.com'}});
  assert.equal((await recoverWindows({},f.deps)).ready,true);
  for (const {args, options} of f.commands.filter(c=>!['context','--version'].includes(c.args[0]))) {
    assert.equal(options.env.DOCKER_CONTEXT,undefined,args.join(' '));
    assert.equal(options.env.DOCKER_HOST,'npipe:////./pipe/dockerDesktopLinuxEngine',args.join(' '));
  }
});
for (const [name,overrides,code] of [
  ['Docker absent',{noDocker:true},'DOCKER_CLI_UNAVAILABLE'],
  ['start refused',{stopped:true,startFails:true},'DOCKER_START_FAILED'],
  ['Windows containers',{os:'windows'},'LINUX_CONTAINERS_REQUIRED'],
  ['Buildx absent',{noBuildx:true},'BUILDX_UNAVAILABLE'],
  ['installation missing',{missing:true},'MCP_INSTALL_NOT_FOUND'],
  ['path traversal',{pointer:{version:'../../other'}},'MCP_INSTALL_INVALID'],
  ['link escape',{escape:true},'MCP_INSTALL_INVALID'],
  ['receipt mismatch',{receipt:'b'.repeat(64)},'MCP_INSTALL_INVALID'],
  ['setup fails',{needsSetup:true,setupFails:true},'RENDERER_SETUP_FAILED'],
  ['post-setup probe fails',{needsSetup:true,stillFails:true},'RENDERER_NOT_READY'],
  ['wrong host proof',{doctorPlatform:'darwin'},'RENDERER_NOT_READY'],
]) test(name+' remains blocked without claiming repair or leaking errors',async()=>{
  const f=fixture(overrides);const result=await recoverWindows({repair:true},f.deps);
  assert.equal(result.ready,false);assert.equal(result.blocker.code,code);
  assert.ok(!JSON.stringify(result).includes('raw infrastructure detail'));
});
test('non-Windows platform performs no commands',async()=>{
  const f=fixture();f.deps.platform='darwin';
  assert.equal((await recoverWindows({repair:true},f.deps)).blocker.code,'WINDOWS_REQUIRED');
  assert.equal(f.commands.length,0);
});
test('missing renderer on diagnosis never triggers installation',async()=>{
  const f=fixture({needsSetup:true});
  assert.equal((await recoverWindows({},f.deps)).blocker.code,'RENDERER_NOT_READY');
  assert.ok(!f.commands.some(c=>c.args[1]==='setup-renderer'));
});
test('options reject typos and duplicate repair flags',()=>{
  assert.deepEqual(parseOptions(['--repair']),{repair:true});
  assert.deepEqual(parseOptions(['--install-dir','C:\\HIOB']),{installDir:'C:\\HIOB'});
  assert.throws(()=>parseOptions(['--repair','--repair']));
  assert.throws(()=>parseOptions(['--install-dir']));
  assert.throws(()=>parseOptions(['--approve-voice']));
});
