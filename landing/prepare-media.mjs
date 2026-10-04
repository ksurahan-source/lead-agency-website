import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const cwd=fileURLToPath(new URL('..',import.meta.url));
const file='landing/public/site/media/hiob-reel.mp4';
// Crop the original's baked-in advertising captions out of the decorative reel.
const filter='[0:v]crop=1080:1480:0:0,split=3[a][b][c];'+
 '[a]trim=start=0:end=5.8,setpts=PTS-STARTPTS,scale=526:720,crop=426:720:50:0[l];'+
 '[b]trim=start=5.8:end=11.6,setpts=PTS-STARTPTS,scale=526:720,crop=426:720:50:0[m];'+
 '[c]trim=start=11.6:end=17.4,setpts=PTS-STARTPTS,scale=526:720,crop=426:720:50:0[r];[l][m][r]hstack=inputs=3[v]';
execFileSync('ffmpeg',['-hide_banner','-loglevel','error','-i','public/showcase/hiob-marketing-ad-ko-final.mp4','-filter_complex',filter,'-map','[v]','-an','-c:v','libx264','-preset','fast','-crf','25','-r','24','-g','6','-keyint_min','6','-sc_threshold','0','-pix_fmt','yuv420p','-movflags','+faststart',file,'-y'],{cwd,stdio:'inherit'});
execFileSync('ffmpeg',['-hide_banner','-loglevel','error','-ss','.5','-i',file,'-frames:v','1','-q:v','3','landing/public/site/media/hiob-reel.jpg','-y'],{cwd,stdio:'inherit'});
