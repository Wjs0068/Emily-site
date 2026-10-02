# Final Wix-to-Astro Migration Audit

Audited October 2, 2026. The visual design is locked; this pass adds missing source content to existing areas, corrects image descriptions, removes an image artifact, and documents decisions. It does not redesign pages, add a carousel, restore a collage, rebuild HoneyBook, submit an inquiry, or deploy changes.

Sources: [live Wix home](https://emilyschrumpfbeaut.wixsite.com/s-bridal-hair), [all 15 Wix FAQ answers](https://emilyschrumpfbeaut.wixsite.com/s-bridal-hair/home), the 16 originals documented in `ASSET-MIGRATION.md`, current repository source/rendered pages, and the [supplied live Astro preview](https://emily-site-preview.wjschrumpf.workers.dev/). Old planning reports are historical; this report records the final implementation and remaining work.

## Completeness verdict

The repository migration audit and authorized completion pass are complete. All valuable remaining source content has either been represented, recovered for owner review, or explicitly retired with a reason. Production content migration and launch cannot yet be declared complete: precise business policies, image/testimonial permissions, approved Sanity content, final domain/contact details, privacy approval, and live HoneyBook build configuration remain unresolved. A successful development-mode build is not owner approval. No further visual redesign is needed to resolve those items.

## Content fully represented

- Romantic bridal-hair positioning, Denver/Colorado service context, current package structure, previews, personalized planning/preparation guidance, styling/product expertise, and the three add-ons already have destinations across Home, Services, About, FAQ, Portfolio, and Inquire. Displayed development prices and time-sensitive values still need the existing owner approvals.
- The complete Lauren testimonial was recovered from Wix and stored in `src/lib/content.ts` without rewriting, shortening, spelling fixes, or punctuation changes. Services displays it within the existing “The support behind the style” area. Home keeps its existing short excerpt and length.
- The smallest biography correction restores **cut and color and bridal styling** to the existing sentence about five years with a large Dallas bridal hair/makeup team. No employer, credential, or date was added.
- All 16 documented original media files remain preserved. All 16 SHA-256 checksums match `ASSET-MIGRATION.md`. Three originals are intentionally unused; the artifact-bearing Caley original is replaced only in rendered usage by a clean crop.
- Existing semantic FAQ disclosures, responsive image derivatives, internal navigation, inquiry handoff, and privacy draft gate remain in place.

## Content intentionally rewritten or improved

- Long Wix landing-page copy is already organized into focused pages and positively framed Services copy. Repetition, dangling package bullets, negative fit wording, and promotional/template debris remain removed.
- Disputed FAQ policy values are generalized to the current proposal/contract rather than silently treated as approved.
- The full Lauren quote now has a separate optional `excerpt` field across the testimonial schema, query, and TypeScript result. Production Sanity must store the full approved quote plus the existing Home excerpt; the development fallback is not automatically imported into Sanity.
- Visual inspection found IMG-04 shows long half-up curls, not an updo. Corrected its Portfolio style label and descriptive alt text on Home, Portfolio, and sample Journal pages. Corrected IMG-02 descriptions to finishing spray/updo and IMG-12 descriptions to the studio mirror scene. These are content corrections within the approved layout.
- Removed unverified photo-specific “Colorado” labels from the bridal-party and Caley Portfolio entries, and removed the location assertion from the bridal-party alt text. General service-area copy is unchanged; scenery alone does not establish a wedding location.
- Existing gallery fields already support venue, location, photographer name/URL, season, year, and publication permission. Added optional `brideName` and `weddingDate`, with owner-confirmation descriptions, and carried those and existing season/year through the gallery query/types. No identity, venue, photographer, or date was populated or inferred.

## Complete Wix FAQ comparison

The table covers every answer in the Wix FAQ, in original order. “Owner decision” means preserve the recovered fact in the decision log, not restore it visibly. No visible FAQ answer changed in this pass: the repository provides no `OWNER_APPROVED` evidence for the precise values, including values that appear consistent elsewhere on the preview. Questions mentioning an old value are not an approved answer.

| #   | Wix FAQ topic               | Exact source facts recovered                                                                                                                                                                                                                                        | Current Astro representation / generalization                                                                                                                    | Final disposition                                                                                                                                             |
| --- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | How far in advance to book  | Inquire once date and wedding venue are known; booking only 12 months ahead; dates often go as they open; Saturdays go first.                                                                                                                                       | Retains inquiry-after-date/location and popular Saturdays. Does not promise a 12-month window.                                                                   | Owner decision: confirm window against current 2027 availability.                                                                                             |
| 2   | Clip-in extensions          | Rental is $175; Emily recommends extensions for most brides, particularly glam waves.                                                                                                                                                                               | FAQ confirms rental/benefit and individualized advice without price or broad recommendation. Services already lists $175.                                        | Price is represented elsewhere; owner confirms current price/recommendation before a precise FAQ answer.                                                      |
| 3   | Travel fee                  | $30 per 30 minutes round trip, measured between Emily's home and the prep location.                                                                                                                                                                                 | Current proposal determines calculation and rounding after location is known. The old amount appears as a question, not a stated policy.                         | Owner decision: formula, origin, rounding, tolls, parking, lodging/early starts. Do not expose a private address.                                             |
| 4   | Securing the date           | Inquiry form, signed contract, $250 non-refundable retainer applied to wedding-day services.                                                                                                                                                                        | Proposal controls reservation requirements, amount, refund terms, and treatment of the remaining balance; separate FAQ entries cover these questions.            | Owner decisions: booking sequence, amount, non-refundability, and full balance credit, separately.                                                            |
| 5   | Contract changes            | Up to four services may be added until 90 days before the wedding, subject to approval, with a cap of seven services plus the bride. Removals after the 90-day cutoff are not allowed and require approval. Getting-ready location changes update contract/invoice. | Additions depend on timing/artist availability; signed agreement governs removals and deadlines. No numeric cap, cutoff, or location-update process is promised. | Owner decision: separate deadlines/approval and location-change process. **Do not restore the old cap**, which conflicts with The Full Party.                 |
| 6   | Booking minimum             | $1,600; may be higher by location; also applies when only the bride books.                                                                                                                                                                                          | Refers to current The Intimate collection and a confirmed proposal; package starting price is $1,750.                                                            | **Retire $1,600.** Owner confirms current bride-only/minimum policy rather than importing the old answer.                                                     |
| 7   | Assistant fee               | $250; short getting-ready window/avoiding a very early start, or more than nine services.                                                                                                                                                                           | Additional coverage/cost is determined by package, party size, timeline, and proposal.                                                                           | Owner decision: only staffing beyond current included coverage. **Do not restore rules that conflict with included second artists.**                          |
| 8   | Trial before booking        | No; agreed/signed contract and $250 retainer must precede scheduling.                                                                                                                                                                                               | Says previews are scheduled after the wedding date is reserved. Exact signing/payment requirements are generalized.                                              | Owner decision: booking prerequisites and current amount.                                                                                                     |
| 9   | Looks during preview        | Most brides can see one or two looks in a two-hour preview; narrow inspiration photos first.                                                                                                                                                                        | Focuses on refining one cohesive direction; possible variations depend on hair/styles/time. Appointment length is separately deferred to scheduling.             | Owner decisions: **two-hour preview** and **one–two looks**, independently. Do not confuse preview length with the included two-hour wedding-day appointment. |
| 10  | Preview cost included       | Yes.                                                                                                                                                                                                                                                                | FAQ defers inclusion to the proposal, while Services and package features already say each published package includes a preview.                                 | Owner decision: reconcile this FAQ generalization with current packages. No conflict in the recovered inclusion fact, but no explicit owner approval found.   |
| 11  | Preview required            | No; allows connection, trying the look, and adjustments beforehand.                                                                                                                                                                                                 | Recommends a preview and directs exceptions/circumstances to Emily without explicitly saying optional.                                                           | Owner decision: included cost and optional attendance are distinct policies.                                                                                  |
| 12  | Preview location            | Studio 33 in Littleton.                                                                                                                                                                                                                                             | FAQ asks if that is still current; the answer shares location privately. The fallback settings preserve the old location as `UNRESOLVED`.                        | Owner decision: current studio and permission to name its city-level location publicly.                                                                       |
| 13  | Mother/bridesmaid trial     | Available for a contracted bridal party if Emily's schedule permits.                                                                                                                                                                                                | Preserves possibility for contracted party members, subject to availability; pricing is confirmed directly.                                                      | Mostly represented. Owner confirms eligibility/price/length; Wix supplies no extra-bride-preview policy or fee.                                               |
| 14  | Minimum service requirement | Retired “classic package” is the minimum even for bride-only bookings.                                                                                                                                                                                              | Uses current collection/proposal-based capacity language and The Intimate instead.                                                                               | **Retire “classic package.”** Owner confirms current minimum/service requirements.                                                                            |
| 15  | Flower-girl age             | Eight and under.                                                                                                                                                                                                                                                    | Age, service scope, timing, and pricing are confirmed in the proposal; age cutoff is generalized.                                                                | Owner decision: confirm current age cutoff and terms.                                                                                                         |

The old FAQ does **not** establish travel rounding/tolls/parking/lodging, additional-preview fees, a policy for repeat previews for the bride, or new package staffing rules. Those values were not fabricated. All uncertain items and source-specific facts are listed in `OWNER-DECISIONS.md` alongside the pre-existing questions.

## Image use and quality

`ASSET-MIGRATION.md` now contains the required 16-row **asset / original Wix use / current Astro use / keep–add–replace–retire** table, based on source imports and rendered pages.

- **IMG-09 / `download (4)_edited.jpg`:** inspected the 1200×675 original. It shows pale fabric folds, not a bridal portrait or distinct hairstyle. It adds no missing Portfolio work, so it remains unused. Restoring a large background would change the locked design.
- **IMG-08 / Caley:** inspected the actual 1290×1713 file and visible lower-right mute badge. No separate clean original was found among repository assets or the 16 documented Wix originals. Created a 1290×1540 bottom crop, removing 173 pixels (about 10.1% of height) with the badge. Hairstyle, face, and bouquet remain intact. Visually verified the existing Portfolio placement at mobile and desktop. No generative fill, inpainting, invented content, distortion, or redesign. Original remains byte-for-byte intact. A photographer original is still requested for best quality and future crops.
- **IMG-05 / Lauren:** 1320×1640 soft/grainy original remains in existing placements; request a higher-quality original. It was not enlarged further or artificially enhanced.
- **IMG-14 / baked collage:** archived and unused. Individual photography remains preferable; no need to force all collage source photos into this layout.
- **IMG-16 / old OG:** inspected the 1067×1126 original. It is a branding/process shot, but the preserved source is not a purpose-built 1200×630 sharing image. Archived in favor of a composition from high-resolution IMG-02.
- **New sharing image:** `public/images/social/emily-bridal-hair-og.jpg`, exactly 1200×630. Uses IMG-02 (2477×3716) with a proportional crop, existing Fahkwang type, site colors, business label, and existing romantic/Denver/Colorado wording. No photograph is stretched. `scripts/generate-migration-media.mjs` reproduces this asset and the Caley crop.

Unused originals: **IMG-09, IMG-14, IMG-16**. The **badge-bearing IMG-08 original** is preserved but excluded from rendered use; its derived crop is used instead. Production Sanity must upload the approved crop or clean replacement rather than republish the archived original. Photo rights, credits, identities, and the new social composition's final approval remain owner questions.

## Social metadata and domain

The layout already supports unique page titles/descriptions and conditional canonical/OG URLs. It now defaults to the new sharing image, supplies its width/height/type/alt metadata, and uses Twitter's large-image card when an absolute image URL can be formed. Absolute image URLs require the existing `PUBLIC_SITE_URL` setting; local configuration leaves it unset. Local rendered metadata correctly omits canonical/image URLs rather than inventing a domain, and the social JPEG is available independently.

The live preview currently has no OG image, and its canonical is `https://emily-site-preview.workers.dev/`, which does not match the supplied `https://emily-site-preview.wjschrumpf.workers.dev/`. Correct the build-time URL for previews and use Emily's confirmed domain for production. Business/contact/social identities must also be confirmed before release. This pass does not replace those values with guesses or publish to a new domain.

## HoneyBook verification

`src/components/inquiry/HoneyBookInquiryForm.astro` already uses the latest public loader, not a bare frame:

- Placement: `632a07d8b2f1e1000827a1ea`.
- Loader: `https://widget.honeybook.com/assets_users_production/websiteplacements/placement-controller.min.js`.
- Public frame endpoint: `https://public.honeybook.com/public_contact_form_app/07c4a1d/index.html`.
- Provider is isolated to `/inquire/`; no form fields were rebuilt, entered, or submitted.

The supplied live preview also contains the loader/placement source, so it is **not behind the repository's loader implementation**. Its missing form is a **deployment configuration issue**: browser inspection found no `data-form-url`, no loader request/mounted iframe, and the visible unavailable message. Configure `PUBLIC_HONEYBOOK_FORM_URL` and `INQUIRY_PROVIDER=honeybook` at build time and redeploy. Existing Wix fallback remains until Emily supplies the correct standalone HoneyBook contact-form link; that is a conversion fallback, not a Wix social/template dependency.

Repository loading is validated separately with the known public URL enabled for a temporary local test build. Site-level axe cannot certify the cross-origin provider frame. The previously documented HoneyBook accessibility concerns remain third-party limitations in `INTEGRATIONS.md` and should be reviewed in HoneyBook.

## Wix cruft intentionally retired

| Content                                 | Confirmed current disposition                                                     |
| --------------------------------------- | --------------------------------------------------------------------------------- |
| “15% Off All Items”                     | Absent from rendered pages and site copy.                                         |
| Empty Events page                       | No restored page or navigation entry.                                             |
| Empty Book Online page                  | No restored page or navigation entry; existing inquiry route handles conversion.  |
| Empty Plans & Pricing page              | No restored page or navigation entry; Services contains actual packages.          |
| Generic duplicate Inquiry Services page | Not restored; distinct Services and Inquire pages remain.                         |
| Wix social profiles/icons               | Not restored; current unverified social settings are empty.                       |
| Wix legal templates                     | Not restored; local privacy page is the existing draft awaiting approval.         |
| Negative “Who this is not for” copy     | Absent; existing positive fit copy remains.                                       |
| Stale $1,600 minimum                    | Absent from rendered pages; appears only in internal decision/validation context. |
| Stale “classic package” terminology     | Absent from rendered pages; appears only in internal decision/validation context. |
| Baked mood-board collage                | Archived only, never imported by a page.                                          |

No production photograph hotlinks Wix. Internal source/audit references to retired facts are evidence and rejection rules, not published policies. Existing Journal samples are not migrated Wix content; they remain noindex and excluded from navigation/sitemap until the approved publishing gate is enabled.

## Final production blockers

1. Emily confirms current packages, minimum/service limits, included versus extra artists, booking/retainer/change/cancellation/travel/preview/child policies, availability, and statistics. The 15-answer table and owner checklist make each remaining fact reviewable.
2. Emily approves testimonials and image publication rights/credits, supplies verified optional Portfolio metadata, reviews the new sharing composition, and ideally supplies clean Caley and higher-resolution Lauren originals. Unknown metadata stays blank.
3. Populate the production Sanity dataset with approved records, including Lauren's full quote and Home excerpt and clean/cropped gallery assets. Production queries intentionally require approved documents/permissions rather than automatically publishing local unresolved fallbacks.
4. Confirm production domain, public contact details, verified social links, response time, and privacy policy. Set the production content/privacy gates only after review.
5. Correct live HoneyBook and canonical build configuration and deploy the reviewed repository. Replace the Wix fallback only with a verified standalone HoneyBook link.

## Validation

All final checks passed after the implementation changes. Tests did not submit a real inquiry.

- Prettier: `npm.cmd run format:check` passed; all matched files use the configured style. Changed text/code files were formatted first.
- ESLint: `npm.cmd run lint` passed.
- Astro check: `npm.cmd run check` passed on 29 files, with 0 errors, warnings, or hints.
- Full build: `npm.cmd run build` passed, including its own Astro check; 11 pages and 88 optimized image derivatives. This validates the current development content mode, not an unconfigured production Sanity release.
- Playwright/axe/responsive: `npm.cmd run test:e2e -- --workers=2 --reporter=list,html,json` passed **74/74 tests**, 0 skipped, failures, or flaky tests, in 43.6 seconds. The existing HoneyBook load test was enabled by temporarily setting the known `PUBLIC_HONEYBOOK_FORM_URL` and `INQUIRY_PROVIDER=honeybook` in the test process; checked-in environment files and form implementation were not changed. HTML results are generated in `playwright-report/`.
- Axe: all nine site-level checks found no serious or critical violations. The cross-origin HoneyBook iframe is excluded from site-level axe; provider accessibility issues previously documented in `INTEGRATIONS.md` remain outside this pass.
- Responsive coverage: nine routes at 320, 390, 768, 1440, and 1920 pixels; semantic image dimensions, navigation focus/Escape, sticky headers, anchors, privacy/sample gates, and HoneyBook isolation.
- Manual review: all 16 source images and old OG inspected; Services full quote and Caley crop inspected at mobile/desktop; Home excerpt retained; no-domain metadata and sharing-image response verified; retired copy absent on all seven primary/utility routes checked.
- Source integrity: all 16 original SHA-256 values match; originals unchanged.

For sandboxed Windows checks, Wrangler's writable local configuration/log destinations were temporarily directed under `.wrangler/` using `XDG_CONFIG_HOME` and `WRANGLER_LOG_PATH`. No user-level configuration or deployment settings were edited. The built Services quote was compared with the complete source string and matches character-for-character inside the quotation marks.

## Exact files changed

- `FINAL-MIGRATION-AUDIT.md` — this report (new).
- `ASSET-MIGRATION.md` — complete current-use matrix and derived-image rationale.
- `OWNER-DECISIONS.md` — precise source-grounded policy questions, asset/metadata requests, release configuration blockers.
- `CONTENT-MIGRATION.md` — corrected implementation status and retired native-form rebuild plan.
- `INTEGRATIONS.md` — live HoneyBook/configuration and social-domain findings.
- `src/lib/content.ts` — full unchanged Lauren quote, Home excerpt, corrected sample image description.
- `src/pages/index.astro` — excerpt support and corrected IMG-04 alt.
- `src/pages/services/index.astro` — full Lauren quote inside existing content and corrected image descriptions.
- `src/pages/about/index.astro` — minimal cut-and-color background edit.
- `src/pages/portfolio/index.astro` — badge-free crop, accurate descriptions/style label, unverified location removals.
- `src/pages/inquire/index.astro` — corrected mirror-image alt; form implementation unchanged.
- `src/pages/journal/index.astro` — corrected existing image alt.
- `src/pages/journal/[slug].astro` — corrected existing image alt.
- `src/layouts/BaseLayout.astro` — conditional default OG/Twitter image and dimensions/type/alt.
- `sanity/schemaTypes/testimonial.ts` — optional approved Home excerpt.
- `sanity/schemaTypes/galleryItem.ts` — optional confirmed bride identity and wedding date.
- `src/lib/sanity/types.ts` — excerpt and gallery metadata typing.
- `src/lib/sanity/queries.ts` — matching excerpt/gallery metadata projections.
- `scripts/generate-migration-media.mjs` — deterministic media generation (new).
- `src/assets/derived/08-caley-wedding-cropped.jpg` — safe Caley crop (new).
- `public/images/social/emily-bridal-hair-og.jpg` — 1200×630 sharing image (new).

Generated build/test/browser artifacts are ignored working outputs, not deliverable source changes. No source original, inquiry component, environment configuration, test implementation, dependency list, or visual design token was changed.
