export const runtime = 'edge';

// Studio owns installation, authentication and project consent.
export function GET() {
  return Response.redirect('https://studio.hi-ob.com/mcp/install', 307);
}
