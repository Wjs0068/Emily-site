# Content and inquiry integrations

## Release modes

Local builds default to `CONTENT_MODE=development`. In this mode, reviewed layout fallback content and clearly labeled journal samples can render without Sanity. Set `CONTENT_MODE=production` only for a release build. Production mode requires `PUBLIC_SITE_URL`, a Sanity project, owner-approved CMS content, and a confirmed HoneyBook integration; it does not fall back to sample business content.

Sanity documents use one of three internal statuses: `OWNER_APPROVED`, `DEVELOPMENT_SAMPLE`, or `UNRESOLVED`. Production queries select only `OWNER_APPROVED` documents. Packages, add-ons, testimonials, gallery items, and FAQ entries must have at least one approved result. Site settings must exist as the `siteSettings` singleton. Journal posts are required only when `PUBLIC_SHOW_JOURNAL=true`.

## HoneyBook

Set these build variables after Emily confirms HoneyBook remains the CRM:

```dotenv
INQUIRY_PROVIDER=honeybook
PUBLIC_HONEYBOOK_FORM_URL=https://approved-public-form-url.example
PUBLIC_CONTACT_EMAIL=optional-public-fallback@example.com
PUBLIC_PRIVACY_POLICY_URL=https://approved-public-privacy-policy.example
```

The HoneyBook iframe exists only in the `/inquire/` page component and uses native lazy loading with reserved height. A direct form link and optional public email are provided if the embed fails. The iframe is cross-origin, so its internal labels, focus behavior, validation, error states, and successful-submit state cannot be audited or reliably detected by this site. The HoneyBook form owner must verify those details in HoneyBook.

## Analytics

GA4 is disabled unless `PUBLIC_GA_MEASUREMENT_ID` is set. The site can emit `inquiry_start` when the direct HoneyBook link is clicked or browser focus moves into the iframe. It does not emit `inquiry_submit`, because a cross-origin HoneyBook iframe does not expose a trustworthy successful-submit signal. No inquiry field values are attached to analytics events.

## Journal publishing

Journal navigation and sitemap inclusion are controlled by `PUBLIC_SHOW_JOURNAL`. Leave it `false` until at least one owner-approved Sanity `blogPost` exists. Development sample articles are marked `noindex,nofollow`, receive no `BlogPosting` schema, and are never included in the production sitemap.
