# Public customer help

Owned by lead-agency-website. Scoped Worker on hi-ob.com/help* and exact /mcp; existing homepage/lead Pages deployment is not replaced. Customer auth, credit and generation stay on studio.hi-ob.com.

Build with `npm run help:build`. Deploy `npx wrangler deploy --config help-center/wrangler.toml` with authorized Cloudflare credentials after source commit. The help release mirrors the tested MCP 0.6.0 descriptor; update it with immutable installer releases. No service credentials in assets. Skill 1.1.0 contains only public workflow instructions.

Guide articles have one category and cross-link shared information. Bank account details remain in authenticated Studio and are never hardcoded here.
