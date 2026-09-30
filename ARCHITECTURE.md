# Proposed Website Architecture

Status: proposal only; implementation is intentionally blocked pending approval of this audit and architecture.

## Goals

- Present Emily as a premium Denver and Colorado bridal-hair specialist.
- Make photography, expertise, availability, pricing, and inquiry the primary conversion story.
- Deliver mostly static HTML with minimal client JavaScript and excellent Core Web Vitals.
- Let a nontechnical owner safely edit business content in Sanity without changing layout code.
- Keep the inquiry delivery layer replaceable so a CRM can take over later.
- Meet WCAG 2.2 AA and representative production Lighthouse scores of at least 95 in all four requested categories.

## Recommended platform

### Runtime and deployment

- **Astro + TypeScript + modern CSS**.
- **Cloudflare Workers with static assets**, not Cloudflare Pages. Current Astro 6+ Cloudflare adapter guidance removed Pages support and recommends Workers for adapter-backed applications.
- Scaffold only after approval using Cloudflare's current C3 flow: `npm create cloudflare@latest -- ems-bridal-hair --framework=astro`.
- Use the official `@astrojs/cloudflare` adapter because the inquiry endpoint needs on-demand execution.
- Use Astro's default static output and set `export const prerender = false` only on `/api/inquiries` (and an optional authenticated preview route). All public content pages and published journal posts remain prerendered.
- Connect the repository to Workers Builds for production and branch preview deployments. Use `wrangler types` after binding changes and `astro check` during builds.
- Set the Wrangler compatibility date to the implementation date. Store secrets with `wrangler secret put` and local-only values in `.dev.vars`.

This is deliberately not a database-backed application. Sanity is the content store; Resend is the initial inquiry delivery system. Add persistent lead storage only if email delivery and CRM requirements justify it.

### CMS

- Use the current official `@sanity/astro` integration, not the deprecated `astro-sanity` package.
- Host Sanity Studio separately (Sanity-hosted or a dedicated studio subdomain) so public pages do not ship Studio/React code.
- Query published content at build time with `useCdn: false` for freshness.
- Configure a Sanity publish webhook to trigger the approved build pipeline. If Workers Builds does not expose a suitable external hook in the selected account, route the webhook through a minimal authenticated GitHub/GitLab pipeline trigger.
- Keep Visual Editing optional and out of the first release unless the owner needs live page previews. Standard Studio previews are sufficient for this content model.

## Public information architecture

| Route              | Purpose                                                                     | Primary conversion action       |
| ------------------ | --------------------------------------------------------------------------- | ------------------------------- |
| `/`                | Brand promise, availability, selected work, package preview, process, proof | Inquire                         |
| `/services/`       | Full packages, add-ons, inclusions, pricing context, process                | Check availability              |
| `/portfolio/`      | Curated bridal-hair gallery with useful context                             | Inquire about a style           |
| `/about/`          | Emily's story, expertise, approach, personal details, portraiture           | Meet Emily / inquire            |
| `/faq/`            | Booking, pricing, preview, travel, timing, extensions, policies             | Still have a question / inquire |
| `/journal/`        | Searchable/scannable article index                                          | Read article / inquire          |
| `/journal/[slug]/` | Helpful, first-hand editorial content                                       | Related service / inquire       |
| `/inquire/`        | Focused wedding inquiry form and expectation setting                        | Submit inquiry                  |

Utility routes: `/privacy/`, `/terms/` if counsel recommends it, `/accessibility/`, `/thank-you/` only if needed, `404`, `robots.txt`, and `sitemap-index.xml`/`sitemap.xml`.

### Navigation

Desktop: wordmark, Services, Portfolio, About, FAQ, Journal, and a visually distinct Inquire link.  
Mobile: accessible disclosure menu with the same destinations, clear close control, focus management, Escape support, and no body overflow.  
Footer: short service-area statement, verified social profiles only, email/contact fallback, and utility/legal links.

## Page composition

### Home

1. Full-bleed, art-directed hero photography with the service/location in the H1
2. Current availability and single inquiry CTA
3. Short positioning statement: romantic, effortless, long-lasting styles
4. Selected portfolio sequence
5. Three-package preview linking to Services
6. Four-step client experience
7. Two or three testimonials with source/context
8. Emily introduction linking to About
9. Final availability and inquiry CTA

### Services

1. Service and location H1
2. Who the experience is for
3. Comparable package table/list with complete inclusions and starting prices
4. Add-ons
5. Preview, staffing, timing, travel, and extension details
6. Booking process
7. Relevant FAQs
8. Inquiry CTA

### Portfolio

Use one editorial flow rather than a dense card wall. Allow lightweight category filtering only if the library is large enough. Gallery items should show style category, venue/location, and photographer where useful and permitted. A no-JavaScript visitor must still see the full curated gallery.

### About

Lead with Emily's name/portrait and specific expertise. Preserve the age-13 origin story, Dallas experience, education work, Denver move, and personable details after copyediting. Connect every credential to the calm, collaborative wedding-morning experience.

### FAQ

Use native `<details>`/`<summary>` or an equally accessible disclosure component. Group questions by Booking, Services and Pricing, Preview and Preparation, Travel, and Wedding Day. Every answer remains present in server-rendered HTML.

### Journal

The index includes featured image, title, excerpt, published date, and category. Posts use semantic long-form typography, a visible updated date, author, breadcrumb, share image, internal links, related posts, and a relevant CTA.

### Inquire

Open with current availability, investment range, service area, expected response time, and next steps. Keep the form on the same route without an iframe. Provide an email fallback and a concise privacy notice.

## Sanity content model

Layout, typography, spacing, animation, and component choices remain in source code. Sanity controls business content only.

### `siteSettings` singleton

- `businessName`, `shortName`, `tagline`
- `publicEmail`, optional `publicPhone`
- `serviceAreas[]` with place name and type; no private street address
- `socialLinks[]` with platform and verified URL
- `bookingAvailability`: status, headline, detail, booking years, last reviewed date
- `announcement`: enabled, text, optional internal link
- `experienceStats[]` for weddings, years, educator experience
- `defaultSeo`: title template, description, default social image
- `inquiryIntro`, `responseTime`, `investmentNote`

### `package`

- `name`, `slug`, `summary`
- `startingPrice` as a number, `currency`, and `priceQualifier`
- `partySizeLabel` and optional normalized service count
- ordered `features[]`
- `includesSecondArtist`, `featured`, `active`, `sortOrder`
- image with required alt text and hotspot
- optional notes for travel/staffing; no layout controls

### `addon`

- `name`, `description`
- `pricingType`: fixed, starting-at, or custom quote
- numeric `price` when applicable, `currency`, display qualifier
- image with alt text
- `active`, `sortOrder`

### `testimonial`

- `quote`, `clientName`
- optional wedding venue/location/date
- optional image, source label, and source URL
- publication-permission confirmation
- `featured`, `sortOrder`

### `galleryItem`

- required image, required contextual alt text, hotspot/crop
- optional caption
- style category (updo, half-up, down/glam waves, short hair, etc.)
- venue, location, season/year
- photographer name and URL
- featured flag and sort order
- optional related blog post

### `faq`

- `question`
- Portable Text `answer` with restrained link support
- category, active flag, sort order

### `blogPost`

- `title`, unique required `slug`
- `author` object (name and optional image/bio; no separate schema needed initially)
- `publishedAt`, `updatedAt`
- featured image with alt/caption/credit
- `excerpt`
- Portable Text body supporting H2/H3, lists, links, internal references, and inline images
- categories/tags kept intentionally small
- `seoTitle`, `metaDescription`, `socialImage`
- publish status is determined by existence of `publishedAt` and non-draft document state

Schema validation should enforce required alt text, sensible title/description lengths, nonnegative prices, unique slugs, and a published date for live posts.

## Rendering and data flow

```mermaid
flowchart LR
  Owner[Business owner] --> Studio[Sanity Studio]
  Studio -->|Publish webhook| Build[Build trigger]
  Build --> Worker[Astro on Cloudflare Workers]
  Sanity[(Sanity Content Lake)] -->|Build-time GROQ| Worker
  Visitor -->|Static HTML and images| Worker
  Visitor -->|POST inquiry| Endpoint[/api/inquiries]
  Endpoint --> Turnstile[Turnstile Siteverify]
  Endpoint --> Limiter[Workers rate-limit binding]
  Endpoint --> Delivery[InquiryDelivery interface]
  Delivery --> Resend[Resend]
  Delivery -. future .-> CRM[CRM adapter]
```

Centralize GROQ queries and typed result shapes in `src/lib/sanity/`. Generate every published journal route with `getStaticPaths()`. Fail builds on missing required singleton data, duplicate slugs, or invalid critical content rather than silently rendering broken pages.

## Proposed project structure

```text
src/
  components/
    global/
    home/
    services/
    forms/
    content/
  layouts/
    BaseLayout.astro
    JournalLayout.astro
  lib/
    env.ts
    sanity/
    seo/
    inquiry/
  pages/
    index.astro
    services/index.astro
    portfolio/index.astro
    about/index.astro
    faq/index.astro
    journal/index.astro
    journal/[slug].astro
    inquire/index.astro
    api/inquiries.ts
    privacy.astro
    accessibility.astro
    404.astro
  styles/
    tokens.css
    global.css
sanity/
  schemaTypes/
public/
  fonts/
  social/
```

## Design system direction

The existing palette provides a useful reference: warm ivory, muted rose/taupe, deep brown, and sage/olive. Retain the warmth but improve contrast and avoid letting one hue dominate. Photography should carry most of the atmosphere.

Define source-controlled tokens for:

- font families, optical sizes, body sizes, line heights, and normal letter spacing
- spacing scale based on a small set of fluid-but-bounded values
- content, wide, and full-bleed layout widths
- mobile/tablet/desktop breakpoints chosen from content stress tests
- small radii (0–8px) for controls and framed media only
- color roles with tested text/background pairings
- focus-ring appearance
- motion durations/easing and reduced-motion overrides

Use a licensed expressive editorial display face paired with a highly readable text face; self-host WOFF2 subsets. Avoid viewport-width font scaling. Motion should be limited to image reveals, menu transitions, and subtle gallery changes, with no essential information dependent on animation or hover.

## Image strategy

- Export/download original owned files from Wix or the photographer; never use Wix URLs in production.
- Upload approved assets to Sanity with hotspot/crop metadata, meaningful alt text, captions, and credits.
- Use `@sanity/image-url` directly for Sanity images. Do not pass Sanity CDN images through Astro's image transformer, which would double-process them.
- Generate width candidates appropriate to layout (for example 480, 768, 1080, 1440, and 1920), `auto=format`, quality tuned by visual review, and accurate `sizes`.
- Include intrinsic width/height or CSS `aspect-ratio` to eliminate layout shift.
- Load only the true LCP image eagerly with `fetchpriority="high"`; lazy-load below-fold images.
- Use art direction for the hero when desktop and mobile crops materially differ.
- Keep gallery HTML static; progressive enhancement may add filtering without hiding content.

## Inquiry architecture

### Fields

- name, email, phone
- wedding date
- venue
- getting-ready location
- number of hair services
- desired bridal style
- extension interest
- Instagram handle
- referral source
- additional notes
- privacy acknowledgement where legally appropriate
- hidden honeypot and submission-start timestamp
- Turnstile token

### Server flow

1. Accept POST only and reject unexpected content types or oversized bodies.
2. Parse into a shared typed DTO and validate server-side with bounded lengths, normalized email/phone/date values, and an allowlist for option fields.
3. Apply Cloudflare's Workers Rate Limiting binding. For this anonymous form, use a conservative endpoint plus privacy-safe client key; do not store raw IPs. Turnstile remains the primary bot defense.
4. Validate every Turnstile token with Siteverify using the secret, token, `CF-Connecting-IP`, expected hostname, and inquiry action. Tokens are single-use and expire after five minutes.
5. Call an `InquiryDelivery` interface. The first adapter uses Resend with a verified sending domain, safe escaped content, `replyTo` set to the bride's validated email, and an idempotency key.
6. Return a small JSON success/error contract. Emit no secrets or sensitive form values to logs.
7. Fire the GA4 `generate_lead` event only after a confirmed 2xx response.

The client progressively enhances a native HTML form. Without JavaScript it should still submit and receive an accessible response page. With JavaScript, preserve entered values on recoverable errors, move focus to an error summary, announce status through an `aria-live` region, disable duplicate submission, and reset expired Turnstile tokens.

Environment variables/bindings will include:

- `PUBLIC_SANITY_PROJECT_ID`
- `PUBLIC_SANITY_DATASET`
- `PUBLIC_SITE_URL`
- `PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `RESEND_API_KEY`
- `INQUIRY_TO_EMAIL`
- `INQUIRY_FROM_EMAIL`
- `PUBLIC_GA_MEASUREMENT_ID` (optional)
- `PUBLIC_GOOGLE_SITE_VERIFICATION` (optional)
- `INQUIRY_RATE_LIMITER` binding

Secrets must never be committed or prefixed `PUBLIC_`.

## SEO architecture

### Suggested metadata direction

| Page      | Title direction                          |
| --------- | ---------------------------------------- |
| Home      | `Denver Bridal Hairstylist               | Em's Bridal Hair` |
| Services  | `Bridal Hair Packages in Denver, CO      | Em's Bridal Hair` |
| Portfolio | `Denver & Colorado Bridal Hair Portfolio | Em's Bridal Hair` |
| About     | `About Emily, Denver Bridal Hairstylist  | Em's Bridal Hair` |
| FAQ       | `Denver Bridal Hair FAQ                  | Em's Bridal Hair` |
| Journal   | `Colorado Wedding Hair Journal           | Em's Bridal Hair` |
| Inquire   | `Inquire About Your Wedding Date         | Em's Bridal Hair` |

Final titles and descriptions should be written after the canonical domain and approved service area are known. Use one natural primary intent per page, not repetitive keyword variants.

### Structured data

- One sitewide identity node with `@type: ["LocalBusiness", "HairSalon"]` only if that classification remains truthful, stable `@id`, name, URL, public contact details, images, price range, real social profiles, and `areaServed` for Denver/Colorado locations actually served.
- Omit a private home street address. Do not invent opening hours or a storefront.
- Use `Service` nodes on Services for on-location bridal hairstyling, linked to the provider and legitimate service areas.
- Use `BlogPosting` on published journal posts and `BreadcrumbList` on interior pages/posts.
- Use `FAQPage` only for visible FAQ content. Do not expect a guaranteed Google rich result.
- Keep schema values generated from the same Sanity content rendered on-page.

Generate canonicals from a validated `PUBLIC_SITE_URL`, include an XML sitemap containing only canonical public pages and published posts, and ship a deliberate robots file. Add unique OG/Twitter images and descriptions. Search Console verification should be environment-driven.

Future local pages are appropriate only for locations Emily genuinely serves and can document with unique venue guidance, original work, travel details, and testimonials. No templated city doorway pages.

## Analytics

- Support GA4 through an optional measurement ID.
- Load analytics asynchronously after consent where required and never block first render.
- Track only high-value events initially: `inquiry_start`, `inquiry_submit`, and confirmed `generate_lead`.
- Do not send form field values, names, email addresses, phone numbers, dates, or free text to analytics.
- Add Search Console verification and document sitemap submission in the launch checklist.

## Accessibility and quality gates

- Semantic landmarks, one H1 per page, logical heading order, real lists, buttons for actions, links for navigation
- Full keyboard operation and visible focus states
- WCAG AA contrast in all states, including image overlays
- 200% zoom and reflow without horizontal scrolling at 320 CSS pixels
- Touch targets, form labels/instructions/errors, autocomplete attributes, and reduced-motion support
- Playwright tests at 390×844, 768×1024, 1440×900, and a wide desktop
- Automated axe checks plus manual keyboard, VoiceOver/NVDA smoke tests, and form-error testing
- Lighthouse CI against production-like preview URLs, targeting Performance, Accessibility, Best Practices, and SEO scores of at least 95

Performance budgets should include no framework hydration by default, one small menu/form enhancement bundle, self-hosted font subsets, no third-party gallery library, LCP image preload only, stable media dimensions, and deferred analytics/Turnstile loading.

## Redirect and retirement plan

| Old route                  | New behavior                                                             |
| -------------------------- | ------------------------------------------------------------------------ |
| `/home`                    | 301 to `/faq/` because that is the content currently published there     |
| `/inquiry-services-page`   | 301 to `/services/`                                                      |
| `/book-online`             | 301 to `/inquire/` if linked/backlinked; otherwise 410                   |
| `/pricing-plans/list`      | 301 to `/services/`                                                      |
| `/event-list`              | 410 unless a real Events destination is approved                         |
| Wix template policy routes | Do not copy; 301 only when a legitimate equivalent exists, otherwise 410 |

The current Wix subdomain cannot automatically redirect to a new domain without Wix/domain configuration. Preserve this mapping for whichever legacy paths exist on the final domain and add prominent migration links/redirects in Wix where supported.

## Required decisions before build

- Final domain and public business name styling (`Em's` versus `Ems`)
- Verified Instagram and any other real social profiles
- Canonical package prices, capacities, staffing, travel, retainer, preview, and add-on policies
- Exact 2027 availability and owner workflow for keeping it current
- Legitimate service areas and whether Studio 33 can be publicly named/addressed
- Public email/phone and expected inquiry response time
- Photo usage rights, client permissions, photographer credits, and original files
- Approved privacy policy and any required terms/cancellation/refund language
- Resend sending domain and inquiry recipient
- Whether owner confirmation email is desired in addition to the internal lead email
- Whether first-release Sanity preview/Visual Editing is necessary

## Current documentation references

- Astro Cloudflare adapter: <https://docs.astro.build/en/guides/integrations-guide/cloudflare/>
- Cloudflare Astro on Workers: <https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/>
- Workers Builds: <https://developers.cloudflare.com/workers/ci-cd/builds/>
- Official Sanity Astro integration: <https://www.sanity.io/docs/astro/configure-sanity-astro>
- Sanity static/server rendering: <https://www.sanity.io/docs/astro/static-and-server-rendering>
- Sanity images and Portable Text: <https://www.sanity.io/docs/astro/images-and-portable-text-astro>
- Turnstile server validation: <https://developers.cloudflare.com/turnstile/get-started/server-side-validation/>
- Workers Rate Limiting binding: <https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/>
- Resend on Cloudflare Workers: <https://resend.com/docs/send-with-cloudflare-workers>
