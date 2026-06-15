# GA4 Business-Line Mapping — split **lead** vs **ecom** (GTM guide)

Goal: in GA4 (`G-ZSRNLEWD1F`, inside the GTM web container `GTM-P74PV945` /
`hi-op-gtm-final.json`), report the **lead business** (`/lead`) separately from the
**ecommerce business** (`/`) — with zero code changes beyond what already ships.

> Companion to [analytics-tagging.md](./analytics-tagging.md). No IDs change. All steps are in the
> GTM **UI** + GA4 **Admin** — nothing to deploy.

---

## 1. What the code already emits

Every route loads the same GTM + GA4 + Pixel (root `app/layout.js` → `DeferredAnalytics` +
`TrackingBridge`), and each `dataLayer` push carries `page_path` (from `components/home/track.js`
and `TrackingBridge`). On `/lead` we additionally fire an explicit signal
(`components/LeadPageSignal.js`):

```js
// dataLayer push on /lead mount
{
  event: 'business_line_view',
  business_line: 'lead',
  content_group: 'lead',
  content_name: 'lead_landing',
  page_path: '/lead',          // present on every event site-wide
}
```

So you have **two** ways to classify traffic:
- **`page_path`** — present on *every* hit (most robust; covers all pages).
- **`business_line` / `content_group`** — explicit, only on the `business_line_view` event.

The recommended setup uses `page_path` as the source of truth so **100% of GA4 hits** get a
business line, and uses the explicit event as a clean funnel entry-point.

---

## 2. GTM — create the variables

GTM **Variables → New** (Variables → User-Defined):

| Variable name | Type | Config |
|---|---|---|
| `DLV - page_path` | Data Layer Variable | Name: `page_path` (Version 2) |
| `DLV - business_line` | Data Layer Variable | Name: `business_line` |
| `Lookup - business_line` | **RegEx Table** | Input: `{{DLV - page_path}}` → see below |

**`Lookup - business_line`** (RegEx Table variable) — this is the key piece; it classifies
*every* page, not just the lead landing:

| Pattern (input = `{{DLV - page_path}}`) | Output |
|---|---|
| `^/lead` | `lead` |
| `^/(growth\|creative\|system\|ecom-agency\|ecom-guide\|meta\|google)` | `ecom` |
| `.*` (Set Default Value) | `ecom` |

> Enable “Full matches only” = **off**, “Ignore case” = on. The default value (`ecom`) makes the
> homepage `/` and everything else fall into the ecommerce line. Adjust the patterns if you add
> more lead routes later (e.g. `^/lead`).

---

## 3. GTM — send `content_group` to GA4 on **every** hit

GA4 has a **built-in** `content_group` dimension (no registration needed). Populate it from the
RegEx variable so all page_views are classified.

1. Open your **GA4 Configuration** tag (or the GA4 **Settings Variable** if you use one — in
   `hi-op-gtm-final.json` it's the GA4 Config that fires on All Pages).
2. Under **Fields to Set** (Config tag) or **Configuration / Shared event parameters**:
   - Field name: `content_group`
   - Value: `{{Lookup - business_line}}`
3. Save. Now every `page_view` carries `content_group = lead | ecom`.

> If you use a GA4 **Settings Variable** shared across event tags, set `content_group` there so
> *all* events (page_view, generate_lead, scroll_depth, etc.) inherit the business line.

---

## 4. GTM — the explicit `business_line_view` event (optional but recommended)

Gives you a precise "entered the lead funnel" event and a `business_line` event parameter.

1. **Trigger → New** → *Custom Event* → Event name: `business_line_view` → fires on All Custom Events of that name.
2. **Tag → New** → *GA4 Event*:
   - Configuration tag: your GA4 config
   - Event name: `business_line_view`
   - Event parameters:
     - `business_line` = `{{DLV - business_line}}`
     - `content_group` = `{{Lookup - business_line}}`
   - Trigger: the `business_line_view` trigger above.

---

## 5. GA4 Admin — register the custom dimension

`content_group` is built-in, but `business_line` (the event param) needs registering to appear in reports.

**GA4 Admin → Custom definitions → Create custom dimension:**

| Field | Value |
|---|---|
| Dimension name | `Business line` |
| Scope | **Event** |
| Event parameter | `business_line` |

(Do this once; data populates going forward — custom dimensions are not retroactive.)

---

## 6. Use it in GA4

- **Reports → add a filter/comparison** on **Content group** = `lead` vs `ecom`.
- **Explore → Funnel exploration**: steps `page_view` → `generate_lead`, with a filter
  `Content group exactly matches lead`. Compare against `ecom` to see each business line's
  cost-per-lead funnel separately.
- **Free-form exploration**: dimension **Content group** (or **Business line**) × metrics
  (Sessions, Conversions, `generate_lead`).
- **Looker Studio / GA4 audiences**: build a "Lead visitors" audience where
  `content_group = lead` for remarketing.

---

## 7. Verify before trusting it

1. **GTM Preview** (Tag Assistant): load `/lead`. Confirm
   - `Lookup - business_line` = `lead`
   - GA4 Config / page_view sends `content_group: lead`
   - `business_line_view` tag fired with `business_line: lead`
   - Then load `/` and confirm `content_group: ecom`.
2. **GA4 DebugView** (Admin → DebugView, with Preview on): see `content_group` on `page_view`
   and `business_line` on `business_line_view` in real time.
3. **GA4 Realtime → by Content group** should split lead vs ecom within ~minutes.

---

## Mapping at a glance

| dataLayer (code) | GTM variable | GA4 field | GA4 surface |
|---|---|---|---|
| `page_path` (all hits) | `Lookup - business_line` (RegEx) | `content_group` (built-in) | Content group dimension |
| `business_line` (event) | `DLV - business_line` | `business_line` (custom dim) | Business line dimension |
| `business_line_view` (event) | Custom Event trigger | `business_line_view` (event) | funnel entry / count |

> sGTM note: if you enable the server container (see [analytics-tagging.md](./analytics-tagging.md)
> §"Enabling sGTM"), set `content_group` the same way in the **server** GA4 client — the
> `page_path` / `content_group` params already flow through.
