export default {async fetch(request,env){
 const url=new URL(request.url);
 if(url.pathname==='/mcp'||url.pathname==='/mcp/')return Response.redirect('https://hi-ob.com/help',302);
 if(url.pathname!=='/help'&&!url.pathname.startsWith('/help/'))return new Response('Not found',{status:404});
 if(!['GET','HEAD'].includes(request.method))return new Response('Method not allowed',{status:405});
 if(url.pathname==='/help'||url.pathname==='/help/')url.pathname='/help/index.html';
 const response=await env.ASSETS.fetch(new Request(url,request));
 const headers=new Headers(response.headers);headers.set('X-Content-Type-Options','nosniff');headers.set('Referrer-Policy','strict-origin-when-cross-origin');headers.set('X-Frame-Options','DENY');headers.set('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'");
 if(url.pathname.endsWith('.zip')){headers.set('Content-Type','application/zip');headers.set('Content-Disposition','attachment; filename="hiob-video-skill-1.0.0.zip"');}
 return new Response(response.body,{status:response.status,headers});
}};
