export const runtime = 'edge';

export function GET() {
  return Response.redirect('https://studio.hi-ob.com/api/mcp/install', 307);
}
