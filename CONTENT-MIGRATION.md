# Content Migration Plan

Status: the Astro implementation and all 16 Wix source assets are present. The final October 2, 2026 content/asset reconciliation is in `FINAL-MIGRATION-AUDIT.md`; remaining approvals are in `OWNER-DECISIONS.md`. A production Sanity dataset is not configured locally. The proposed workflows below are historical planning context, not approval to restore disputed policies or change the locked design.

## Migration principles

1. Migrate owned source content, not Wix-rendered HTML/CSS or app widgets.
2. Resolve pricing and policy conflicts before entering production content.
3. Rewrite for clarity and search intent without flattening Emily's voice.
4. Obtain original image files and confirm publication rights/credits; Wix URLs are reference-only.
5. Require meaningful alt text based on image purpose, not filenames or keyword stuffing.
6. Keep time-sensitive availability and announcements in the `siteSettings` singleton.
7. Do not migrate empty pages, default Wix social profiles, or template legal language.

## Content disposition matrix

| Existing content                           | New destination            | Sanity type                                  | Action                                                                        |
| ------------------------------------------ | -------------------------- | -------------------------------------------- | ----------------------------------------------------------------------------- |
| Hero promise and Denver location           | Home                       | `siteSettings` plus source-controlled layout | Rewrite H1 for service/location; retain romantic supporting language          |
| 300+ weddings / 9 years / 3 educator years | Home/About                 | `siteSettings.experienceStats`               | Verify and add review reminder because values age                             |
| Three bridal packages                      | Services and home preview  | `package`                                    | Reconcile prices/capacity; copyedit; complete dangling bullets                |
| Three add-ons                              | Services                   | `addon`                                      | Clarify terms and constraints                                                 |
| Kailey, Lauren, Caley quotes               | Home/Services              | `testimonial`                                | Correct only with client approval; add source/context and permission record   |
| “What it's like working with me” claims    | Home/Services              | Source copy or `siteSettings`                | Consolidate into process/value section                                        |
| Biography and personal details             | About                      | Source copy or a focused settings field      | Copyedit while preserving voice; verify credentials                           |
| “Who this is for/not for”                  | Services                   | Source copy                                  | Reframe positively and remove dismissive language                             |
| Booking availability                       | Global/Home/Inquire        | `siteSettings.bookingAvailability`           | Migrate only after revalidation                                               |
| 15 FAQ entries                             | FAQ                        | `faq`                                        | Merge duplicate minimum questions; resolve contradictions; categorize         |
| HoneyBook form                             | Inquire                    | Isolated public-loader integration           | Preserve the published HoneyBook placement; do not rebuild or submit the form |
| Generic inquiry-services page              | None                       | None                                         | Do not migrate; real package content is stronger                              |
| Empty event/booking/pricing pages          | None                       | None                                         | Remove/redirect per architecture                                              |
| Wix legal/accessibility templates          | New approved utility pages | None or source content                       | Do not migrate; replace with accurate reviewed documents                      |
| Footer social icons/URLs                   | Footer                     | `siteSettings.socialLinks`                   | Replace only with verified owner profiles                                     |

## Image inventory

The following original Wix media endpoints were derived from the rendered asset URLs. They are migration references, not approved production sources. Download the highest-quality originals through Wix Media Manager or from the photographer whenever possible; do not rely on a transformed Wix derivative.

| ID     | Current filename/alt                                          | Current use                       | Original media reference                                                              | Migration note                                                                                |
| ------ | ------------------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| IMG-01 | `EmsBridalHairBranding2026-3399.jpg`                          | Hero, Emily styling hair          | `https://static.wixstatic.com/media/3fb963_709d39b90be349c1aa37d0f86ad8486d~mv2.jpg`  | Candidate hero/editorial process image; write contextual alt                                  |
| IMG-02 | `EmsBridalHairBranding2026-3944.jpg`                          | Hero, bridal styling              | `https://static.wixstatic.com/media/3fb963_fc8c40a26d844778b0bc1e9b231d4feb~mv2.jpg`  | Candidate hero image; confirm mobile focal point                                              |
| IMG-03 | `IMG_1190.jpg`                                                | Package-section wide image        | `https://static.wixstatic.com/media/3fb963_a0d4f12785af4c7d8e7e79f993d15e6f~mv2.jpg`  | Inspect original before assigning alt/crop                                                    |
| IMG-04 | `015A0371.JPG`                                                | Bride Spotlight / Kailey area     | `https://static.wixstatic.com/media/3fb963_5159f38dad0541e78e7b102250d7c7b5~mv2.jpg`  | Link to correct testimonial only after identity/permission confirmation                       |
| IMG-05 | `Lauren.jpeg`                                                 | Bride Spotlight / Lauren area     | `https://static.wixstatic.com/media/3fb963_324869cbcabd48f383d58b6e32d7998c~mv2.jpeg` | Confirm client and photographer credit                                                        |
| IMG-06 | `EmsBridalHairBranding2026-2805.jpg`                          | Experience section                | `https://static.wixstatic.com/media/3fb963_28140ba908254a4ba3167244642a5c35~mv2.jpg`  | Editorial process candidate                                                                   |
| IMG-07 | `EmsBridalHairBranding2026-3577.jpg`                          | Experience section                | `https://static.wixstatic.com/media/3fb963_25ae5b33fd064a60a145821b56b29088~mv2.jpg`  | Editorial process candidate                                                                   |
| IMG-08 | `Caley Wedding.jpg`                                           | Caley testimonial                 | `https://static.wixstatic.com/media/3fb963_1ebbc36398f444caa0c2563f5ab7d69b~mv2.jpg`  | Confirm testimonial pairing and rights                                                        |
| IMG-09 | `download (4)_edited.jpg`                                     | Large transition/background image | `https://static.wixstatic.com/media/3fb963_7182c646a9ed4073b22c8fbcc541943f~mv2.jpg`  | Current page initially serves a blurred 147×83 derivative at ~980×714; replace from original  |
| IMG-10 | `EmsBridalHairBranding2026-3255.jpg`                          | About portrait                    | `https://static.wixstatic.com/media/3fb963_27d95b16cf22489e8caf23f4bed233ee~mv2.jpg`  | Primary About portrait candidate                                                              |
| IMG-11 | `EmsBridalHairBranding2026-3632.jpg`                          | Second-style add-on               | `https://static.wixstatic.com/media/3fb963_e502622652cd4e94ae4233e2a679758e~mv2.jpg`  | Preserve useful crop/hotspot metadata                                                         |
| IMG-12 | `EmsBridalHairBranding2026-4201.jpg`                          | Additional-guest add-on           | `https://static.wixstatic.com/media/3fb963_c5f1b00f130a4388a7fb5bde4211433e~mv2.jpg`  | Verify that image meaning matches add-on                                                      |
| IMG-13 | `EmsBridalHairBranding2026-3015.jpg`                          | Extension-rental add-on           | `https://static.wixstatic.com/media/3fb963_5c8ab8e23f3446e1bdcc33f07bec69d4~mv2.jpg`  | Verify that extensions are visible before writing alt                                         |
| IMG-14 | `Multicolored Aesthetic Photo Collage Vision Board Flyer.PNG` | Fit/mood collage                  | `https://static.wixstatic.com/media/3fb963_ffc29661abce42a39ce54dcd0b3d9a81~mv2.png`  | Prefer individual original photographs over a baked collage if available                      |
| IMG-15 | `IMG_1514.jpg`                                                | Availability/footer image         | `https://static.wixstatic.com/media/3fb963_41abcd73e7e344078b33b1a894d0f0fa~mv2.jpg`  | Current page initially serves an 82×165 blurred derivative at ~491×660; replace from original |
| IMG-16 | No visible filename; default OG image                         | Sitewide social sharing           | `https://static.wixstatic.com/media/3fb963_31c615c9f5354e5b9bba4bfcd9502b8d~mv2.jpg`  | Review at full size; create purpose-built 1200×630 social crops                               |

Excluded assets: six generic 30×30 Wix social-network icons. Use the chosen icon library in source code and only render verified networks.

### Current alt-text state

The 15 visible content images use filenames as alt text. None are suitable final alternatives. Alt text must be written after reviewing each original and its destination context. Examples of the decision process:

- If an adjacent caption already identifies the bride/style, use a concise complementary description.
- If an image is purely atmospheric and adds no information, use `alt=""`.
- If hair detail is the reason the image exists, describe the visible style (texture, shape, accessories) without phrases such as “image of” or SEO keywords.
- Do not identify a bride by name unless permission and identity are confirmed.

## Asset migration workflow after approval

1. Request original full-resolution files, photographer names/URLs, client permissions, and any usage restrictions.
2. Download a preservation copy of each Wix original and compare dimensions/checksums with owner-supplied originals.
3. Remove duplicates, screenshots, low-resolution derivatives, and baked collages where source frames exist.
4. Rename files descriptively before upload, without embedding private client data.
5. Upload approved assets to Sanity and populate hotspot, crop, alt, caption, credit, venue, style category, and orientation.
6. Create desktop/mobile hero art direction and a 1200×630 social crop.
7. Test responsive widths, modern-format negotiation, lazy loading, intrinsic sizing, and visual quality on real devices.
8. Keep a rights/credit worksheet outside the public site if contracts or personal data are involved.

## Copy migration workflow

### Pass 1: factual reconciliation

Owner must approve a single source of truth for packages, minimum investment, party size, second-artist rules, additional services, travel, preview/trial terminology, retainer, cancellation/change rules, flower-girl age, extension rental, and current availability.

### Pass 2: voice-preserving edit

Retain the romantic, personal tone and concrete phrases such as “calm getting-ready morning.” Correct mechanics, remove repetition, replace generic claims with evidence, and make the client the subject of most copy.

### Pass 3: search and conversion edit

Assign one intent to each page, write unique titles/descriptions, add natural Denver/Colorado context, connect journal topics to services and portfolio work, and place CTAs at genuine decision points. Avoid keyword repetition and unsupported superlatives.

### Pass 4: structured CMS entry

Enter approved content into Sanity, validate required fields, preview all routes, and export a dataset backup before launch.

## Proposed initial journal topics

These are opportunities, not content to fabricate. Each article should use Emily's first-hand expertise and original work.

- How to choose between a romantic updo and half-up bridal style in Colorado weather
- What clip-in extensions change for bridal hair, and who actually needs them
- A realistic wedding-morning hair timeline for a bride and bridal party
- How altitude, dry air, wind, and summer weather affect Colorado wedding hair
- Bridal hair preview preparation checklist
- Venue-specific real wedding stories where Emily has permission and useful firsthand detail

Do not publish generic AI-written advice or city pages without original experience, images, and editorial review.

## Legacy URL mapping

| Existing URL                | Destination/action                                            |
| --------------------------- | ------------------------------------------------------------- |
| `/`                         | New Home                                                      |
| `/home`                     | `/faq/`                                                       |
| `/inquiry-services-page`    | `/services/`                                                  |
| `/book-online`              | `/inquire/` or 410 after backlink review                      |
| `/pricing-plans/list`       | `/services/`                                                  |
| `/event-list`               | 410 unless events are approved                                |
| `/accessibility-statement`  | `/accessibility/` only after an accurate statement exists     |
| `/english-privacy-policy`   | `/privacy/` only after an approved policy exists              |
| `/english-terms-conditions` | `/terms/` only if approved terms exist                        |
| `/english-refund-policy`    | Approved policy destination or 410; do not copy template text |

## Content owner checklist

- [ ] Confirm business name spelling and final domain
- [ ] Confirm real social profile URLs
- [ ] Approve package/pricing source of truth
- [ ] Approve booking, travel, staffing, retainer, and change policies
- [ ] Confirm current availability and response time
- [ ] Confirm actual service areas and public studio information
- [ ] Supply original photography and credits/permissions
- [ ] Approve testimonials and contextual details
- [ ] Supply public contact details and inquiry recipient
- [ ] Obtain an appropriate privacy policy and any needed legal terms
- [ ] Decide whether to send an automatic inquiry acknowledgement
- [ ] Approve final edited copy before CMS import

## Migration acceptance criteria

- Every retained fact has an owner-approved source.
- No conflicting price, service count, package name, or policy remains.
- Every production image is owner-supplied or migrated into Sanity; none hotlink Wix.
- Every informative image has approved meaningful alt text and every decorative image has empty alt.
- Every photograph has confirmed publication rights and required credit.
- All old public routes have an intentional redirect, replacement, or 410 response.
- No Wix template legal text, Wix-owned social link, or stale availability is published.
- Sanity content can be edited without exposing layout controls or secrets.
- A content-only publish triggers a tested rebuild and deployment.
