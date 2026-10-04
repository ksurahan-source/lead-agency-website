# Public customer help

Owned by lead-agency-website. Scoped Worker on hi-ob.com/help* and exact /mcp; existing homepage/lead Pages deployment is not replaced. Customer auth, credit and generation stay on studio.hi-ob.com.

Build with `npm run help:build`. Deploy `npx wrangler deploy --config help-center/wrangler.toml` with authorized Cloudflare credentials after source commit. The help release targets MCP 0.9.0 beta and mirrors its immutable public installer descriptor. Update both generated descriptors and the matching production guide together; the build guard must not be bypassed while these disagree. No service credentials belong in assets. Skill 1.2.0 contains public workflow instructions for direct recordings, Typecast, and mixed narration.

Source tests and installation readiness are separate from Windows real-device and authorized AWS MP4 end-to-end proof, which remain pending. Connected projects use server audio/material/final inspections; the checks do not verify spoken words or approve creative quality. Old versioned skill downloads remain available for existing links, while the current skills page links to 1.2.0.

Guide articles have one category and cross-link shared information. Bank account details remain in authenticated Studio and are never hardcoded here.
