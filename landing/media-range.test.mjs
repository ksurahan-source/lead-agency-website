import test from 'node:test';
import assert from 'node:assert/strict';
import { mediaRange } from './media-range.mjs';
const response = () => new Response('0123456789', { headers: { 'content-type': 'video/mp4', etag: '"asset"' } });
test('serves a precise byte range for a video seek when the upstream ignores Range', async () => {
  const result = await mediaRange(new Request('https://hi-ob.com/site/reel.mp4', { headers: { Range:'bytes=2-5' } }), response());
  assert.equal(result.status,206);assert.equal(result.headers.get('content-range'),'bytes 2-5/10');assert.equal(await result.text(),'2345');
});
test('handles suffix and open-ended ranges and refuses out-of-bounds seeks', async () => {
  for (const [range,status,text] of [['bytes=-3',206,'789'],['bytes=8-',206,'89'],['bytes=10-',416,''],['bytes=5-2',416,'']]) {
    const result=await mediaRange(new Request('https://hi-ob.com/site/reel.mp4',{headers:{Range:range}}),response());
    assert.equal(result.status,status);assert.equal(await result.text(),text);
  }
});
test('a changed entity is sent in full, and existing partial responses are preserved',async()=>{
  const request=new Request('https://hi-ob.com/site/reel.mp4',{headers:{Range:'bytes=0-2','if-range':'"old"'}});
  assert.equal((await mediaRange(request,response())).status,200);
  const partial=new Response('abc',{status:206});assert.equal(await mediaRange(request,partial),partial);
});
