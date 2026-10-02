# Content and inquiry integrations

## Release modes

Local builds default to `CONTENT_MODE=development`. In this mode, reviewed layout fallback content, unresolved owner-review values, and clearly labeled journal samples can render without Sanity. Set `CONTENT_MODE=production` only for a release build. Production mode requires `PUBLIC_SITE_URL`, a Sanity project, owner-approved CMS content, a confirmed HoneyBook integration, and `PRIVACY_POLICY_STATUS=OWNER_APPROVED`; it does not fall back to sample business content.

Sanity documents use one of three internal statuses: `OWNER_APPROVED`, `DEVELOPMENT_SAMPLE`, or `UNRESOLVED`. Production queries select only `OWNER_APPROVED` documents. Time-sensitive availability, experience statistics, optional brand recognition, and a public preview location also have nested approval states. Production requires all policy-decision FAQ keys, rejects stale `$1,600` or “classic package” language, and only fetches testimonials and gallery images with confirmed publication permission. Site settings must exist as the `siteSettings` singleton. Journal posts are required only when `PUBLIC_SHOW_JOURNAL=true`.

## HoneyBook

The live Wix inquiry page embeds Emily's published HoneyBook contact form. Browser inspection found Wix's outer `filesusr.com` iframe, HoneyBook placement `632a07d8b2f1e1000827a1ea`, contact form `69686ba711cbe2002a8d7598`, and this public HoneyBook frame endpoint:

```text
https://public.honeybook.com/public_contact_form_app/07c4a1d/index.html
```

That endpoint renders the form only when HoneyBook's placement loader provides the public form configuration. Opening it directly or placing it in a bare iframe renders a blank page. The Astro component uses HoneyBook's published loader and placement on `/inquire/`; it does not copy Wix's wrapper. Set these build variables in the deployment environment:

```dotenv
INQUIRY_PROVIDER=honeybook
PUBLIC_HONEYBOOK_FORM_URL=https://public.honeybook.com/public_contact_form_app/07c4a1d/index.html
PUBLIC_CONTACT_EMAIL=optional-public-fallback@example.com
```

The URL is public, not a credential. The form is only loaded on `/inquire/`, with reserved height. The fallback currently opens the live Wix inquiry page; the Wix embed did not expose a verified standalone link for this contact form. Emily can replace that fallback by copying the direct link from the same contact form in HoneyBook (`Publish` → copy link). A separate lead-form link appeared in HoneyBook's public configuration, but returned a 404 and is not this Wix-embedded contact form.

The iframe is cross-origin, so this site cannot change its internal labels, focus behavior, validation, error states, or detect a successful submission. Axe found serious or critical issues inside HoneyBook's own frame: invalid `autocomplete="nope"`, low-contrast helper text, and an unlabeled select input. The site-level axe test excludes the provider iframe, while the live-load test verifies its fields. Emily should review the provider form's accessibility in HoneyBook or with HoneyBook support.

## Privacy policy

`/privacy/` is the canonical site privacy page. It defaults to `PRIVACY_POLICY_STATUS=DRAFT`, is marked `noindex,nofollow`, and displays an owner/legal-review notice. A production content build fails unless the status is explicitly changed to `OWNER_APPROVED` after review. The footer and inquiry notice always link to the local route; no Wix privacy-template URL is used.

## Analytics

GA4 is disabled unless `PUBLIC_GA_MEASUREMENT_ID` is set. The site can emit `inquiry_start` when the direct HoneyBook link is clicked or browser focus moves into the iframe. It does not emit `inquiry_submit`, because a cross-origin HoneyBook iframe does not expose a trustworthy successful-submit signal. No inquiry field values are attached to analytics events.

## Journal publishing

Journal navigation and sitemap inclusion are controlled by `PUBLIC_SHOW_JOURNAL`. Leave it `false` until at least one owner-approved Sanity `blogPost` exists. Development sample articles are marked `noindex,nofollow`, receive no `BlogPosting` schema, and are never included in the production sitemap.
