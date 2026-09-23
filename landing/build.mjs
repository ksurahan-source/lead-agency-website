import { cp,mkdir,readFile,writeFile,rm,rename,readdir } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
const root=fileURLToPath(new URL('..',import.meta.url));
const destination=new URL('./dist/',import.meta.url);
await rm(destination,{recursive:true,force:true});await mkdir(destination,{recursive:true});
await cp(new URL('./public/',import.meta.url),destination,{recursive:true});
const built=spawnSync('npx',['--yes','--package=esbuild@0.28.1','esbuild','landing/src/landing.js','--bundle','--minify','--format=esm','--external:/site/*','--outfile=landing/dist/site/landing.js'],{cwd:root,stdio:'inherit'});
if(built.status!==0)throw new Error('Landing build failed');
let html=await readFile(new URL('./src/index.html',import.meta.url),'utf8');
html=html.replace('<!-- CINEMA -->',await readFile(new URL('./src/cinema.html',import.meta.url),'utf8'));
const assets={};
const media=new Map();
for(const entry of await readdir(new URL('site/media/',destination))){
 const from=new URL(`site/media/${entry}`,destination),content=await readFile(from);
 const dot=entry.lastIndexOf('.'),name=`${entry.slice(0,dot)}-${createHash('sha256').update(content).digest('hex').slice(0,12)}${entry.slice(dot)}`;
 await rename(from,new URL(`site/media/${name}`,destination));
 media.set(`/site/media/${entry}`,`/site/media/${name}`);
}
const rewriteMedia=text=>{for(const [from,to] of media)text=text.replaceAll(from,to);return text;};
html=rewriteMedia(html);
for(const extension of ['js','css']){
 const from=new URL(`site/landing.${extension}`,destination),content=Buffer.from(rewriteMedia(await readFile(from,'utf8')));
 await writeFile(from,content);
 const name=`landing-${createHash('sha256').update(content).digest('hex').slice(0,12)}.${extension}`;
 await rename(from,new URL(`site/${name}`,destination));html=html.replace(`/site/landing.${extension}`,`/site/${name}`);assets[extension]={file:name,bytes:content.length};
}
await writeFile(new URL('index.html',destination),html);
const source=spawnSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).stdout.trim();
await writeFile(new URL('site/version.json',destination),JSON.stringify({source,builtAt:new Date().toISOString(),assets}));
console.log(JSON.stringify({source,assets}));
