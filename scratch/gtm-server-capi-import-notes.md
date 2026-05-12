# GTM Server-side Meta CAPI Mapping

## Web container import

Import `hi-op-gtm-web-capi-bridge.json` into the existing web container `GTM-P74PV945`.

After import, edit this variable:

- `const - GTM Server URL`: replace `https://YOUR-SERVER-CONTAINER-DOMAIN` with the GTM server container URL, for example `https://sgtm.hi-ob.com`.

The web container keeps the current GA4 structure and forwards `generate_lead` to the server container with:

- `event_id`: same ID returned by `/api/submit-lead` and used by browser `fbq('track', 'Lead', ..., { eventID })`
- `event_name`: `Lead`
- `action_source`: `website`
- `event_source_url`, `page_location`, `page_referrer`, `page_title`
- `email`, `phone_number`, `first_name`, `last_name`
- `fbp`, `fbc`
- `value`, `currency`, `content_name`, `lead_company`, `lead_source`

## Server container setup

Use a separate GTM Server container. Do not put a Meta access token in the web container.

Create these server-side Event Data variables:

- `event_id`
- `event_name`
- `action_source`
- `event_source_url`
- `email`
- `phone_number`
- `first_name`
- `last_name`
- `fbp`
- `fbc`
- `value`
- `currency`
- `content_name`
- `lead_company`
- `lead_source`

Create a trigger:

- Custom trigger where `Event Name` equals `generate_lead`

Create a Meta CAPI tag in the server container:

- Pixel ID: `1715625702927911`
- API Access Token: store only in the server container
- Event Name: `{{event_name}}` or fixed `Lead`
- Event ID: `{{event_id}}`
- Action Source: `website`
- Event Source URL: `{{event_source_url}}`
- User data: map email, phone, first name, last name, fbp, fbc
- Custom data: map value, currency, content_name, lead_company, lead_source

Expected Events Manager result for a successful lead:

- Browser event: `Lead` with `eventID`
- Server event: `Lead` with the same `event_id`
- Status: browser/server received and deduplicated
