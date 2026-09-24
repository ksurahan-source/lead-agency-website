# HIOB public documentation and discovery loop

The homepage is a visual introduction. Product and help documents provide the complete explanation in the first HTML response. Installation JSON is the machine contract, never the only explanation for a customer or a search reader.

## URL ownership

| Surface | Runtime | Source |
| --- | --- | --- |
| / and /site/* | hiob-creative-landing Worker | landing/ |
| /mcp, /mcp/ | hiob-customer-help Worker | help-center/ |
| /help and /help/* | hiob-customer-help Worker | help-center/ |
| /watch/hiob* | hiob-customer-help Worker | help-center/ |
| /robots.txt, /sitemap.xml, /video-sitemap.xml | hiob-customer-help Worker | help-center/build.mjs |
| /growth, /creative, /system, /lead, /terms, /privacy, /api/* | Existing Pages app | app/ |
| Studio, accounts, project permissions, credits, generation | Separate studio.hi-ob.com deployment | Canonical Studio repository |

The public sitemap preserves the existing service routes. A help deployment must not claim ownership of Studio/auth/creative APIs. Unknown help/watch paths return 404, not a client application shell. Legacy hash links are migrated by the small browser enhancement, because fragments do not reach the server.

## Content contract

- helpTopics.mjs owns question/title/summary/category/search vocabulary.
- routes.mjs maps each task to a canonical public URL.
- HelpArticles.jsx owns the visible procedures. ProductPage.jsx explains roles, examples, cost boundaries and the path to installation. WatchPage.jsx exposes the actual caption transcript with the film.
- mcpInstall.mjs owns the immutable release descriptor used in visible commands and compatibility tables. check-release.mjs compares every field with the deployed install API and verifies the downloaded package hash plus exact-package audio/render evidence.
- Static HTML, small search/copy JavaScript, metadata, navigation, schema and sitemaps are generated from these sources. No React client runtime is shipped.
- A skill archive is immutable. Change its contents only with a deliberate version bump and validation of the linked release.
- Neither structured data nor a JSON endpoint proves that a page is indexed or cited. The body is written for customers, with quick orientation, a visible table of contents, full instructions and task-specific recovery.

## Release sequence

1. Update only facts supported by the release and approved product/brain guidance. Preserve environment caveats. Public support labels are not customer or creative-quality proof.
2. Run npm run public:test and the scoped ESLint command in public-docs.yml. The generated HTML tests run without JavaScript and check internal links, metadata, OS commands, old URLs, real 404 responses and film fingerprints.
3. Run npm run help:release-check. A changed version, command, credit policy or package hash blocks deployment pending reconciliation.
4. Inspect desktop and mobile via the browser: product reading, OS switching, old hash URL, copy/paste, search, transcript and video playback. Preserve the current direct-scroll homepage behavior.
5. Commit the reviewed source. Build/deploy landing first, then help; the help watch page uses the same fingerprinted film served by landing. Run scripts/check-public-site.mjs with the expected full revision after both deploys.
6. Record source SHA, both Worker versions, public-check.json, actual browser results and performance reports. Generated version.json identifies code, not customer success.
7. Roll back both Workers to the previously recorded compatible versions if a real regression requires it. For the first migration, retain the expanded help route ownership and deploy the fixed help source rather than leaving new discovery routes on an old SPA-only Worker.

## Performance evidence

Use Google PageSpeed Insights and separate desktop/mobile profiles. Homepage: three runs per profile, report median and minimum, target median 95 and minimum 90. Representative /mcp, /help/install/windows and /help/create should be 95 or above. Preserve failed runs and never report the best run as the baseline.

Local Lighthouse against a public URL is lab evidence, not a Google PSI server result. CrUX is a 28-day field distribution: absent data is unknown, not a pass. Target p75 LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1. Scroll and hover are not INP; inspect target, decoded and actually presented video timestamps separately. Fixed-profile scroll latency needs its own recording.

## Daily and weekly operation

Daily: run scripts/check-public-site.mjs into a dated output folder. Read the report; a successful command without inspected results is not completion. Notify only new failures, meaningful changes or a required customer action. Do not trigger paid media generation.

Weekly: use existing authenticated Google Search Console, Bing Webmaster and Naver access. Inspect sitemap/indexing and the reports actually available to that account. Keep impressions, citations, visits, signup, MCP connection, project attachment and first export as separate measures. A copied command is not a successful install.

No access or no data must be recorded explicitly. Do not create new subscriptions, grant crawler access to private pages, fake reviews, or mass-publish AI articles. Choose one evidenced bottleneck and make a scoped repair.

## Conversion evidence boundary

This release does not wire a new customer event collector. Existing homepage analytics remains in place. Documentation/copy events and actual Studio/MCP success need a common, consent-aware implementation in the Studio repository before a cross-domain completion rate can be reported. Never infer connected projects from outbound clicks.

The follow-up event contract is: document_view and command_copy (public page/OS only), then connection_attached and export_succeeded from actual server results. Exclude copied prompt text, customer documents, private paths and project content. Prefer existing consent and storage, and verify receipts before calling the funnel wired.
