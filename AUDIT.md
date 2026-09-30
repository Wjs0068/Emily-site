# Em's Bridal Hair Website Audit

Audit date: September 29, 2026  
Source: <https://emilyschrumpfbeaut.wixsite.com/s-bridal-hair>

## Scope and method

This is a public-site audit only. The Wix site was not modified, no inquiry was submitted, and no private/admin content was accessed. The audit used the Wix XML sitemaps, rendered browser inspection, desktop and mobile viewport checks, DOM/metadata extraction, an automated WCAG 2 A/AA scan, and a review of the embedded HoneyBook inquiry form.

The crawl found ten public, indexable URLs across the Wix page and pricing-plan sitemaps. The member-profile sitemap is empty. The site's path-level `/s-bridal-hair/robots.txt` returns HTTP 400; the host-level `robots.txt` allows crawling generally, blocks lightbox query URLs and gallery internals, and does not advertise this site's sitemap.

## Executive summary

The site has valuable raw material: distinctive original photography, a restrained romantic palette, clear specialization in soft/organic bridal hair, three understandable package tiers, concrete experience claims, and enthusiastic bride testimonials. The current implementation obscures those strengths.

The most urgent findings are:

1. **Mobile is functionally broken.** At a 390px viewport the document remains 1,193px wide. The hero heading, menu, CTAs, package cards, images, and later sections are far off-screen; the captured initial mobile viewport is largely blank.
2. **The information architecture is inverted.** `/` is titled “Inquire Here” but contains the long-form home, services, about, testimonials, add-ons, availability, and inquiry experience. `/home` is actually the FAQ page.
3. **Eight public routes should not remain indexed at their current URLs.** Events, booking, and pricing pages are empty; three legal-policy pages and the accessibility statement are unedited Wix templates; and the inquiry-services page duplicates services with generic copy. Useful FAQ content at `/home` should move to `/faq/` with a redirect, leaving `/` as the only route retained in place.
4. **SEO fundamentals are absent.** No page has a meta description, the primary page title targets “Inquire Here” rather than Denver bridal hair, no business/service structured data was found, and the business is hosted on a Wix subdomain.
5. **Conversion paths are unreliable.** Multiple CTAs link back to the current URL, “More Info” buttons produced no visible detail, footer social links go to Wix's accounts, and package/FAQ language conflicts.
6. **Content quality needs an editorial pass.** There are spelling and grammar errors, dangling package bullets, old package terminology, and incompatible minimum-price statements.
7. **The page is unnecessarily heavy.** The rendered landing page issued 154 resource requests, including 95 scripts and 15 stylesheet/link resources, and produced roughly 1,015 DOM nodes. An initial browser session observed about 1.49 MB transferred before all lazy content was exercised; this is directional, not a formal Lighthouse result.

## Public page inventory

All listed pages have self-referencing canonical URLs and are indexable unless noted. No meta description was found on any page.

| Route                       | Browser title            | Visible purpose/content | Recommendation                                                                                                                     |
| --------------------------- | ------------------------ | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `/`                         | `Inquire Here            | Ems Bridal Hair`        | Actual long-form homepage: hero, packages, testimonials, process/value, embedded form, about, add-ons, fit statement, availability | Rebuild as `/`; replace title and split supporting content into focused pages                  |
| `/home`                     | `Home                    | Ems Bridal Hair`        | FAQ page with 15 questions                                                                                                         | Move to `/faq/`; redirect legacy route                                                         |
| `/inquiry-services-page`    | `Inquiry Services Page   | Ems Bridal Hair`        | Generic service summaries for on-site styling, trials, and bridal-party styling                                                    | Remove as duplicate; redirect to `/services/`                                                  |
| `/book-online`              | `Book Online             | Ems Bridal Hair`        | “Nothing to book right now. Check back soon.”                                                                                      | Remove; redirect to `/inquire/` if the route has backlinks, otherwise return 410               |
| `/event-list`               | `Events                  | Ems Bridal Hair`        | “No events at the moment”                                                                                                          | Remove; return 410 unless events become a real offering                                        |
| `/pricing-plans/list`       | `Plans & Pricing         | Ems Bridal Hair`        | “No plans available”                                                                                                               | Remove; redirect to `/services/`                                                               |
| `/accessibility-statement`  | `Accessibility Statement | Ems Bridal Hair`        | Unedited Wix template with placeholders such as `[enter relevant date]`                                                            | Unpublish immediately; replace later with an accurate statement at `/accessibility/`           |
| `/english-terms-conditions` | `Terms & Conditions      | Ems Bridal Hair`        | Wix instructional/template copy, not business terms                                                                                | Unpublish immediately; publish counsel-approved terms only if needed                           |
| `/english-refund-policy`    | `Refund Policy           | Ems Bridal Hair`        | Wix instructional/template copy, not a refund policy                                                                               | Unpublish immediately; do not migrate as policy content                                        |
| `/english-privacy-policy`   | `Privacy Policy          | Ems Bridal Hair`        | Wix instructional/template copy, not a privacy policy                                                                              | Highest legal priority: replace with a real policy before collecting inquiries on the new site |

## Navigation and internal links

The collapsed site navigation exposes these labels:

| Label            | Rendered destination |
| ---------------- | -------------------- |
| Home             | `/home`              |
| Inquire Here     | `/`                  |
| Experience       | `/home`              |
| Wedding Services | `/home`              |
| Inquiry          | `/home`              |
| FAQs             | `/home`              |
| Events           | `/event-list`        |

Several menu items appear intended as section navigation but expose the same `/home` URL. This is confusing to users, crawlers, and assistive technology. The body CTAs “Inquire HERE,” “EXACTLY ME,” and “Inquire here” point to `/`, which is already the current page; they do not provide a dependable route to the embedded form. The FAQ link correctly reaches `/home`, but its path and title do not describe the content.

The new primary navigation should be Home, Services, Portfolio, About, FAQ, Journal, and Inquire, with a persistent but restrained Inquire CTA.

## Landing-page content inventory

### Header and hero

- Brand: “Em's Bridal Hair”
- Location: “Denver, CO”
- H1: “Dreamy Romantic Effortless Long Lasting”
- CTA: “Inquire HERE”
- Trust signals: “300 + weddings,” “9 years of experience,” and “3 years as a bridal educator”
- Hero images: two behind-the-scenes images of Emily styling hair

The emotional positioning is useful, but the H1 does not identify the service or market. A search-oriented page needs a natural statement such as “Romantic bridal hairstyling in Denver and across Colorado,” while preserving the existing words as supporting brand language.

### Packages

| Package        | Positioning                                                            | Included                                                                                                                                                  | Published starting price |
| -------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -----------------------: |
| The Intimate   | An intimate, beautifully paced morning with the bride's closest people | Bridal preview; 2-hour bridal appointment; bride plus up to 4 additional hair services; timeline planning; styling guidance                               |                   $1,750 |
| The Signature  | A relaxed morning without sacrificing time or attention                | Bridal preview; “2-hour bridal appointment with” (incomplete); bride plus up to 6 additional services; second artist; timeline planning; styling guidance |                   $2,300 |
| The Full Party | A seamless, unrushed experience for a larger party                     | Bridal preview; “2-hour bridal appointment with” (incomplete); bride plus up to 8 additional services; second artist; timeline planning; styling guidance |                   $2,950 |

All three “More Info” controls were activated during the audit; no additional visible content appeared. Package pricing uses inconsistent formatting (`$1750` versus `$2,300`). “Hair services” should be defined: bride included, adult/child styling rules, hair-only scope, timing, travel, gratuity/tax, and what “starting at” can increase.

### Add-ons

| Add-on                   | Published copy                                                                    |        Price |
| ------------------------ | --------------------------------------------------------------------------------- | -----------: |
| 2nd Style                | Encouraged for all-down or half-up styles, especially in summer                   | Custom quote |
| Another guest            | Add to any package so no one is left out                                          |         $200 |
| Clip-in extension rental | Claimed usage by 80% of brides; positioned for hold and “Pinterest-worthy” styles |         $175 |

Clarify whether “Another guest” can exceed package staffing/capacity and when another artist fee applies. Explain extension color matching, deposit/damage terms, fitting, and whether hair must be purchased or can be rented.

### Testimonials

1. **Kailey:** “I seriously trust Emily with my life! I’ve never seen someone do such magic work on my hair - she is so gifted and definitely in the right industry! My mom also loved her, we couldn’t stop smiling ever after the bridal preview!”
2. **Lauren:** Praises Emily's talent and says she “understood what a Texan bride wants for her hair.” This supports destination/out-of-state credibility but can dilute Denver positioning without wedding context.
3. **Caley:** “I can't even put into words how confidant Emily made me feel on my wedding day. Emily is so talented.” “Confidant” should be “confident.”

No review platform, wedding venue, date, or photographer attribution is provided. Add those only with permission and link to an authentic review source where possible.

### Experience and process claims

- Customized timeline
- Personal prep guide
- Bridal hair educator
- Product knowledge
- Calm and positive through wedding-morning unknowns
- Long-lasting styling
- Communication throughout planning
- Collaborative styling

These are persuasive differentiators but are currently fragmented. They should become a concise “What to expect” sequence with evidence and a clear next step.

### About content

- Positioning: high updos and half-ups; Denver and all over Colorado
- Personal details: “Boy momma,” “Frech Fry Addict,” “In a meadow dreaming about romance”
- Story: interest in hair since age 13, began pursuing the craft at 17, work reshared by major hair brands, cosmetology school, five years with a large Dallas bridal hair/makeup team, then bridal educator, now Denver-based

This is warm and differentiating. It needs copyediting, named/verifiable credentials where appropriate, and a clearer connection between Emily's expertise and the bride's experience.

### Fit statement

The page targets 2027 brides seeking romantic, dreamy, textured organic high updos or half-ups and a calm morning. It excludes brides seeking stiff/tight updos or “just anyone” to do their hair. The positioning is useful; the exclusionary copy should be softened so it feels confident rather than dismissive.

### Current booking availability

As rendered on September 29, 2026:

- Denver and surrounding areas
- 2026 fully booked
- 2027 books open
- A limited number of 2027 dates remain available

Availability is high-value conversion content and time-sensitive. It belongs in the `siteSettings` singleton with a visible “last reviewed” workflow or scheduled editorial reminder.

## FAQ inventory

The FAQ is published at `/home`.

| Question                                    | Current answer summary                                                                                                 | Issue/action                                                                                |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| How far in advance should I book?           | As soon as date/venue are known; only 12 months in advance; Saturdays go first                                         | “Often times” should be “oftentimes”; reconcile with 2027 availability                      |
| Do you offer clip-in extensions?            | Yes, rentals are $175; highly recommended for glam waves                                                               | Correct “espesially” and “your”; align with add-on copy                                     |
| Do you have a travel fee?                   | $30 per 30 minutes round trip from Emily's home                                                                        | Clarify rounding, mileage/tolls/parking, and quote from venue without exposing home address |
| How do I secure my date?                    | Inquiry, signed contract, $250 non-refundable retainer applied to wedding-day services                                 | Preserve after confirming current policy                                                    |
| Can I change my contract?                   | Up to 4 services may be added until 90 days before, capped at 7 services plus bride; removals restricted after 90 days | Conflicts with Full Party capacity; rewrite precisely                                       |
| Do you have a booking minimum?              | “yes it is $1,600,” possibly higher by location, including bride-only bookings                                         | Conflicts with current $1,750 package floor                                                 |
| When does an assistant fee apply?           | Short morning, avoiding an early start, or more than 9 services; $250                                                  | Packages already include a second artist in tiers 2/3; define staffing rules                |
| Can I schedule a trial before booking?      | No; contract and $250 retainer first                                                                                   | Use “preview” or “trial” consistently                                                       |
| How many looks can I see during my preview? | Usually 1–2 during a 2-hour appointment                                                                                | Preserve after confirmation                                                                 |
| Is the bridal trial included?               | Yes                                                                                                                    | Align terminology with “bridal preview”                                                     |
| Is a bridal trial required?                 | No, but recommended                                                                                                    | Explain consequences/timing and use one term                                                |
| Where is my bridal trial?                   | Studio 33 in Littleton                                                                                                 | Confirm location and public-address permission before publishing structured data            |
| Can my mom or bridesmaid have a trial?      | Yes for contracted parties if schedule permits                                                                         | Copyedit possessive and define price                                                        |
| Do you have a minimum service requirement?  | “my classic package is my minimum”                                                                                     | Duplicate question; “classic package” does not exist in current package list                |
| What age is a flower girl?                  | 8 and under                                                                                                            | Clarify service/price if relevant                                                           |

## Inquiry and booking content

The landing page embeds a third-party HoneyBook form in a cross-origin iframe. Current fields/options are:

- Full name (required)
- Email (required)
- Phone number
- Wedding date
- Getting-ready address or venue (required)
- Instagram handle (required)
- Number of people needing hair services, including bride (required select)
- Wedding-day and desired-experience notes (required)
- Bridal style certainty: exact style / general idea / wants guidance (required radio)
- Budget qualification against the $1,750–$2,950+ range (required; implemented as checkboxes even though choices appear mutually exclusive)
- Referral motivation: Google / long-time follower / friend recommendation (required radio)
- Consent to receive texts
- Google reCAPTCHA disclosure

Issues:

- The form is embedded mid-way through a very long page rather than owning a focused inquiry route.
- Venue and getting-ready location are combined; these are operationally different.
- Phone, wedding date, and desired style should be explicitly required/optional based on business needs.
- Checkbox controls allow contradictory budget responses; use radio buttons.
- Referral options omit common sources such as Instagram, planner, venue, photographer, and other.
- Typographical errors include “mountian,” “ahwile,” and lowercase “im” and “google.”
- The iframe adds third-party requests, styling constraints, cross-origin accessibility limits, and tracking calls.
- Success/error behavior was not tested because submitting would create a real business lead.

## Social links

The footer renders Instagram, Facebook, Twitter/X, LinkedIn, YouTube, and TikTok icons, but every destination points to an official Wix account. No verified Emily-owned social URL was found. These links are misleading and should be removed until the owner provides correct profiles.

## Image and asset findings

The landing page contains 15 content-photo assets, one separate Open Graph image, and six Wix social icons. Detailed migration IDs and URLs are in `CONTENT-MIGRATION.md`.

Findings:

- All content-image alt text is a filename such as `EmsBridalHairBranding2026-3399.jpg`, not a meaningful description.
- Two large images are served first as heavily blurred 147×83 and 82×165 variants while rendered at approximately 980×714 and 491×660. This caused visibly blank/blurred states during inspection.
- Above-the-fold images use `loading="auto"`; many later images use lazy loading.
- Rendered Wix URLs request AVIF/automatic quality, but no useful source-level `srcset` was observed in the extracted DOM.
- Several crops are destructive and encode crop coordinates in the Wix URL. Original files and intended focal points must be preserved before leaving Wix.
- Photographer attribution, client consent, and publication rights are not documented publicly and must be confirmed before migration.
- Do not migrate Wix social icon assets or hotlink Wix production URLs.

## SEO audit

### Current implementation

- Root title: `Inquire Here | Ems Bridal Hair`; this misses the primary service and location.
- Other titles are generic Wix defaults such as `Home`, `Book Online`, `Events`, and `Plans & Pricing`.
- No meta description was found on any crawled page.
- Canonicals are self-referencing Wix subdomain URLs.
- Root Open Graph/Twitter metadata uses a 2500×1330 image and repeats the weak root title; no social description was found.
- No JSON-LD was found on the primary landing page, FAQ page, or services page.
- No custom-domain authority is visible.
- Empty and template pages are indexable and included in XML sitemaps.
- Heading hierarchy is presentation-led: brand as H2, location/stats as H6, long testimonial as H2, value bullets as H2, and two H1s on the landing page.
- The FAQ questions are paragraphs rather than semantic headings/disclosure controls.
- Internal links do not establish clear page topics or a crawlable content hierarchy.
- Existing natural targeting is limited to “Denver, CO,” “Denver & all over Colorado,” and bridal-hair language. “Denver bridal hairstylist,” “Denver wedding hair,” and close variants are not used in strategic titles/descriptions/headings.

### Opportunities

- Launch on a first-party domain and verify it in Google Search Console.
- Give every route a unique intent-led title, description, canonical, H1, OG image, and useful internal links.
- Build topical depth through real portfolio projects and journal posts tied to techniques, venues, seasons, timelines, extensions, and preparation.
- Use truthful service-area language for Denver and Colorado. Do not create city pages without distinct first-hand work, photos, and useful local guidance.
- Add a coherent `LocalBusiness`/`HairSalon` identity graph plus `Service`, `BlogPosting`, `BreadcrumbList`, and visible-content `FAQPage` markup where appropriate. Omit a private home address.
- Remove empty/generated routes from sitemaps and return intentional redirects or 410 responses.

## Accessibility audit

High-impact issues:

- At 390px, content width is 1,193px inside a 375px layout viewport. The menu begins around x=895, the hero H1 around x=480, and package cards extend to x=940.
- At the initial 820px inspection, content still overflowed horizontally (1,193px document versus 805px viewport).
- Fixed desktop typography remains at 67px on mobile, contributing to clipping.
- Heading levels do not represent document structure, and the landing page has two H1s.
- A visually empty H2 containing a zero-width character appears in the benefits section.
- A DOM check found seven links without direct text, `aria-label`, or title; child-image behavior should be manually verified with screen readers.
- Filename alt text fails to communicate image purpose. Decorative images should have empty alt; informative images need concise contextual alt.
- The Caley testimonial is rendered at 10px, too small for comfortable reading.
- Hover-dependent “Bride Spotlight” regions need equivalent keyboard/touch behavior.
- Form error, focus, success, and timeout behavior cannot be controlled reliably inside the third-party iframe.

An axe-core WCAG 2 A/AA scan flagged a serious color-contrast failure on the Wix promotional banner. Automated scans do not detect the severe horizontal overflow, content quality, or all iframe issues, so manual keyboard, zoom, screen-reader, reduced-motion, and touch testing remains required.

## Performance concerns

- 154 resource requests on the landing page after reload
- 95 script resources for mostly static marketing content
- 15 stylesheet/link resources
- 21 image resources in the rendered DOM, including social icons
- Roughly 1,015 DOM elements
- HoneyBook iframe plus reCAPTCHA and tracking requests
- Wix telemetry/beacon traffic and multiple console/request warnings
- Empty Wix app routes still load substantial booking, event, or pricing widget bundles
- Oversized fixed layout increases raster work and creates mobile overflow
- Blurred placeholders remained visible during capture for large sections

These observations are diagnostic rather than a production Lighthouse score. The rebuild should establish performance budgets and test deployed, cache-warm and cache-cold URLs under mobile throttling.

## Copy and consistency corrections

| Current                          | Recommended direction                              |
| -------------------------------- | -------------------------------------------------- |
| “Frech Fry Addict”               | “French-fry enthusiast” or owner-approved phrasing |
| “confidant”                      | “confident”                                        |
| “espesially”                     | “especially”                                       |
| “your considering”               | “you're considering”                               |
| “want's to collab”               | “wants to collaborate”                             |
| “mountian”                       | “mountain”                                         |
| “ahwile and im obsessed”         | “a while, and I'm obsessed”                        |
| “Found you on google”            | “Found you on Google”                              |
| “pinterest worthy”               | “Pinterest-worthy”                                 |
| “make sure no one feel left out” | “make sure no one feels left out”                  |
| “brides who want look romantic”  | “brides who want to look romantic”                 |
| “2-hour bridal appointment with” | Complete or remove the dangling “with”             |
| `300 +`                          | `300+`                                             |
| “Add Ons”                        | “Add-ons”                                          |
| “2nd Style”                      | “Second style”                                     |

The biography also contains comma splices and should be professionally edited while retaining Emily's conversational voice.

## Pricing and policy conflicts requiring owner confirmation

1. Is the minimum investment $1,750, the old $1,600 booking minimum, or a location-dependent amount?
2. Is the minimum package “The Intimate,” or is a “classic package” still sold?
3. Does Full Party cover bride plus eight others (nine total), while the FAQ caps changes at seven plus bride (eight total)?
4. When is a second artist included versus charged as a $250 assistant fee?
5. Can “Another guest” be added to every tier, and what is the hard service cap?
6. Are “bridal preview” and “bridal trial” the same included service?
7. Is the travel formula still $30 per 30 minutes round trip, and how are tolls, parking, lodging, or early starts handled?
8. Is the $250 retainer current, non-refundable, and applied to the balance?
9. Are 2027 books still open, and which dates/months are actually available?

## Conversion recommendations

- Give each intent a focused page while keeping a short proof-rich home page.
- Put current availability near the hero and repeat a direct `/inquire/` CTA after services, portfolio, FAQ, and journal content.
- Explain the process: inquire, availability review, proposal/contract/retainer, preview, planning, wedding day.
- Show complete package comparison and common extra costs before the form.
- Use a curated portfolio with style, venue, season, and photographer context.
- Add authentic review-source links and richer proof such as venues served and planner/photographer collaborations.
- Set expectations for response time and what happens after submission.
- Keep budget qualification, but phrase it warmly and use mutually exclusive controls.
- Provide a direct contact fallback for accessibility or form failure.

## What should not migrate

- Wix HTML, CSS, scripts, app widgets, banners, or tracking code
- Empty Events, Book Online, and Plans & Pricing content
- Unedited legal/accessibility templates
- Wix-owned social links and icons
- Generic inquiry-services copy that duplicates the real packages
- Filename-based alt text
- Stale “classic package” and $1,600 minimum language unless reconfirmed

## Source references

- Live site and all routes listed above, accessed September 29, 2026
- Wix page sitemap: <https://emilyschrumpfbeaut.wixsite.com/s-bridal-hair/pages-sitemap.xml>
- Wix pricing sitemap: <https://emilyschrumpfbeaut.wixsite.com/s-bridal-hair/pricing-plans-sitemap.xml>
- Host robots file: <https://emilyschrumpfbeaut.wixsite.com/robots.txt>
