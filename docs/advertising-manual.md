# HIOB advertising manual maintenance

Canonical content: `help-center/src/advertisingPlaybook.mjs`.

Consumers:
- `AdvertisingGuide.jsx` → `/help/advertising`: readable static HTML, source links, copy buttons.
- `playbookMarkdown()` → `/help/skills/advertising-playbook-2026-09-29.md`: same full manual.
- `export-advertising-guidance.mjs` → Studio `data/advertising-guide.json`: bounded offline AI guidance with full-document SHA-256.
- Studio model guidance → public `/api/models` and existing authenticated `production_check` / `generation_status` responses.

Update the reviewed release and editorial version when behavior changes. Recheck the actual MCP service scope and provider adapters; do not import raw vendor capabilities as HIOB support. Keep old downloads when introducing a new dated path. Do not claim server response delivery guarantees agent compliance.

From this Help checkout, explicitly export the reviewed brief into the intended Studio checkout:

```sh
node help-center/export-advertising-guidance.mjs /absolute/path/to/hiob-studio/data/advertising-guide.json
npm run help:build
node --test help-center/advertising-playbook.test.mjs help-center/public-pages.test.mjs
```

Studio checks:

```sh
node --test test/model-catalog.test.mjs test/desktop-generation-contract.test.mjs test/production-readiness.test.mjs
npx vitest run test/ui/model-catalog.test.jsx
```

After normal deployments, compare the public Markdown SHA-256 with `/api/models` → `guidance.advertisingGuide.contentSha256`; inspect readable HTML, TOC, disclosure/copy interaction, mobile overflow, and source links. Authenticated receipt of the guide and the quality of a generated ad are separate proofs. This guide update does not require a paid generation or MCP package reinstall.

Research reviewed 2026-09-29: Daniel Schiffer YouTube auto transcript (`zCvYyHLgqmc`, ranges cited in the manual); StudioBinder official shot-list course text and video description; Google Ads ABCDs; TikTok Creative Codes; Runway reference-media/image-reference/motion guides; HIOB brain and current source contracts. No claim of watching full videos where only transcripts or descriptions were available. The manual's prompt templates and acceptance criteria are HIOB adaptations, not verbatim vendor instructions or a tested guarantee of advertising success.
