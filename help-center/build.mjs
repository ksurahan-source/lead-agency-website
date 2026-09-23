import {cp,mkdir,readFile,writeFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('..',import.meta.url));
await mkdir(new URL('dist',import.meta.url),{recursive:true});
await cp(new URL('public/',import.meta.url),new URL('dist/',import.meta.url),{recursive:true});
for(const [command,args] of [
 ['npx',['--yes','--package=esbuild@0.28.1','esbuild','help-center/src/main.jsx','--bundle','--minify','--jsx=automatic','--format=esm','--outfile=help-center/dist/help/app.js']],
 ['python3',['-c',"import pathlib,zipfile; root=pathlib.Path('help-center/public/help/skills'); z=zipfile.ZipFile('help-center/dist/help/hiob-video-skill-1.0.0.zip','w',zipfile.ZIP_DEFLATED); [z.write(p,p.relative_to(root)) for p in sorted(root.rglob('*')) if p.is_file()]; z.close()"]]
]){const result=spawnSync(command,args,{cwd:root,stdio:'inherit'});if(result.status!==0)throw new Error(`${command} failed`);}
const result=spawnSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'});if(result.status!==0)throw new Error('git revision unavailable');
await writeFile(new URL('dist/help/version.json',import.meta.url),JSON.stringify({source:result.stdout.trim(),mcp:'0.5.0',skill:'1.0.0',builtAt:new Date().toISOString()}));
console.log('Public help and skill archive built.');
