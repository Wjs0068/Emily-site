# Content and inquiry integrations

## Release modes

Local builds default to `CONTENT_MODE=development`. In this mode, reviewed layout fallback content, unresolved owner-review values, and clearly labeled journal samples can render without Sanity. Set `CONTENT_MODE=production` only for a release build. Production mode requires `PUBLIC_SITE_URL`, a Sanity project, owner-approved CMS content, a confirmed HoneyBook integration, and `PRIVACY_POLICY_STATUS=OWNER_APPROVED`; it does not fall back to sample business content.

Sanity documents use one of three internal statuses: `OWNER_APPROVED`, `DEVELOPMENT_SAMPLE`, or `UNRESOLVED`. Production queries select only `OWNER_APPROVED` documents. Time-sensitive availability, experience statistics, optional brand recognition, and a public preview location also have nested approval states. Production requires all policy-decision FAQ keys, rejects stale `$1,600` or “classic package” language, and only fetches testimonials and gallery images with confirmed publication permission. Site settings must exist as the `siteSettings` singleton. Journal posts are required only when `PUBLIC_SHOW_JOURNAL=true`.

## HoneyBook

Set these build variables after Emily confirms HoneyBook remains the CRM:

```dotenv
INQUIRY_PROVIDER=honeybook
PUBLIC_HONEYBOOK_FORM_URL=https://approved-public-form-url.example
PUBLIC_CONTACT_EMAIL=optional-public-fallback@example.com
```

The HoneyBook iframe exists only in the `/inquire/` page component and uses native lazy loading with reserved height. A direct form link and optional public email are provided if the embed fails. The iframe is cross-origin, so its internal labels, focus behavior, validation, error states, and successful-submit state cannot be audited or reliably detected by this site. The HoneyBook form owner must verify those details in HoneyBook.

## Privacy policy

`/privacy/` is the canonical site privacy page. It defaults to `PRIVACY_POLICY_STATUS=DRAFT`, is marked `noindex,nofollow`, and displays an owner/legal-review notice. A production content build fails unless the status is explicitly changed to `OWNER_APPROVED` after review. The footer and inquiry notice always link to the local route; no Wix privacy-template URL is used.

## Analytics

GA4 is disabled unless `PUBLIC_GA_MEASUREMENT_ID` is set. The site can emit `inquiry_start` when the direct HoneyBook link is clicked or browser focus moves into the iframe. It does not emit `inquiry_submit`, because a cross-origin HoneyBook iframe does not expose a trustworthy successful-submit signal. No inquiry field values are attached to analytics events.

## Journal publishing

Journal navigation and sitemap inclusion are controlled by `PUBLIC_SHOW_JOURNAL`. Leave it `false` until at least one owner-approved Sanity `blogPost` exists. Development sample articles are marked `noindex,nofollow`, receive no `BlogPosting` schema, and are never included in the production sitemap.
