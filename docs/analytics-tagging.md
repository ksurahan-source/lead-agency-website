# Analytics & Tagging — homepage (GTM / GA4 / Meta / sGTM)

The homepage rebuild **preserves the existing measurement contract**. No IDs changed.

## Live IDs (reused, not invented)

| Thing | ID | Where |
|---|---|---|
| GTM web container | `GTM-P74PV945` | `NEXT_PUBLIC_GTM_ID` (fallback in `app/layout.js`) |
| GA4 property | `G-ZSRNLEWD1F` | inside the GTM container (`hi-op-gtm-final.json`) |
| Meta Pixel | `1715625702927911` | `app/layout.js` + `META_PIXEL_ID` server fallback |

## dataLayer contract (unchanged — do not rename)

Consumed by the GTM container `hi-op-gtm-final.json`:

| dataLayer event | → GA4 event | source (preserved) |
|---|---|---|
| `gtm.js` | — | `DeferredAnalytics` |
| Pageview (All Pages) | `page_view` | GTM config tag |
| `generate_lead` | `generate_lead` (₩300k) | `CreativeVelocityForm` |
| `stay_3min` / `stay_7min` / `stay_20min` | `stay_duration` | `TrackingBridge` |
| Kakao link click | `kakao_chat_click` (₩50k) | GTM Link Click trigger |
| built-in scroll (paths `/(meta|google|tiktok-moloco)`) | `scroll_depth` | GTM Scroll trigger |

**New, non-breaking additions** (homepage): `cta_click` (with `cta_location`) and `reel_play`
(see `components/home/track.js`). They follow the same schema (`event_id` dedup, `currency: KRW`,
`x-fb-ck-*` / `x-fb-cd-*`). To send them to GA4, add CE triggers in the GTM UI — no code change needed.

**Lead landing (`/lead`)**: fires `business_line_view` with `business_line: 'lead'` /
`content_group: 'lead'` (see `components/LeadPageSignal.js`) so the lead business can be reported
separately from ecom. Wiring it into GA4 (content group + custom dimension): see
[ga4-business-line-mapping.md](./ga4-business-line-mapping.md).

## Enabling GCP server-side GTM (sGTM)

Code is now sGTM-ready. The first-party loader was wired in `components/DeferredAnalytics.js`.

1. **Cloudflare Pages env** → set `NEXT_PUBLIC_GTM_SERVER_URL=https://<your-sgtm-domain>`
   (e.g. `https://sgtm.hi-ob.com`). The container then loads first-party from your GCP
   server container (ad-blocker / ITP resilient). Unset = falls back to Google's CDN.
2. **GTM web container (UI)** → in the GA4 Config tag, set `server_container_url` to the same
   sGTM domain so GA4 hits route through the server container.
3. **GTM server container (GCP, Cloud Run)** → map the custom domain to the Cloud Run service;
   add a GA4 client + the Meta Conversions API tag (it reads the `x-fb-ud-*` / `x-fb-ck-*` /
   `x-fb-cd-*` params the dataLayer already emits).
4. **Meta CAPI mode** (optional) → set `META_CAPI_MODE=gtm_server` to delegate server CAPI to
   sGTM instead of the app's direct Graph call (`app/api/submit-lead`, `app/api/track-view`
   already support `direct` | `both` | `gtm_server`).

## Real assets used

- `public/team/founders.jpg` — real founder + cofounder photo (guide section).
- `public/proof/measurement-lift.jpg` — real Meta dashboard, **client name redacted**,
  proof numbers kept (+91.8% / +97.2% CAPI lift, EMQ 9.3/10).
- `public/showcase/*.mp4` (+ jpg posters) — HI-OP-produced ad examples (labeled honestly).

## TODO before launch

- **Replace placeholder reviews** in `app/page.js` (`placeholderQuotes`) with real HI-OP
  reviews. They are clearly marked and a visible "예시 후기" note is shown.
- Add performance screenshots (Meta Events Manager lift + EMQ, ROAS, before/after, store
  sales graph) — redact client names, keep the ratios.
