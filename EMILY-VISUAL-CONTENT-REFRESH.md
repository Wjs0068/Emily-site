# Em's Bridal Hair: visual and content refresh plan

October 22, 2026 — proposal for review. No website implementation, deployment, commit, or push is included in this phase.

## Executive recommendation

Keep the existing romantic editorial identity and change what gets the most space. Show finished bridal hair in the hero and immediately following gallery, cut repeated emotional promises, keep pricing easy to find, introduce Emily briefly, and use six click-to-play video posters as a second way to experience the work.

Emily's feedback is specific: “less wordy” and “more photos of my work.” The rebuild already looks considered and has useful technical foundations. Its principal weakness is the evidence sequence: a process hero, two text sections, and then a three-image gallery led by another process photo. More explanatory copy cannot compensate for a limited view of the finished hairstyles.

Recommend Option A below. Target approximately 250–300 visible Home words, including package labels, prices, stats, review excerpts, and actions, excluding global navigation/footer. The current live main content contains approximately 537 words. This is an editorial target, not a reason to cut factual qualification or hide information in images. The visual page may remain a substantial scroll; reduce unproductive text and spacing rather than imposing an arbitrary screen count.

## Evidence and implementation baseline

Reviewed all nine requested root reports: README, AUDIT, ARCHITECTURE, DESIGN-SYSTEM, CONTENT-MIGRATION, ASSET-MIGRATION, FINAL-MIGRATION-AUDIT, OWNER-DECISIONS, and INTEGRATIONS. Inspected the actual Astro pages, header/footer, image component, HoneyBook component, base layout, tokens/global styles, content/data access, and Sanity schema structure. Visually reviewed the source image contact sheet and live preview pages. Reference research and limitations are in [REFERENCE-SITES-ANALYSIS.md](REFERENCE-SITES-ANALYSIS.md).

The repository was initially clean. `ARCHITECTURE.md` includes historical proposals for a native inquiry endpoint and Resend. **Those are not the current implementation:** the site is static Astro on Cloudflare, with an isolated HoneyBook loader on Inquire. Preserve that form and provider. Do not rebuild it from a historical proposal.

Sanity is prepared, not evidence that all production content is populated or approved. Home images and much of its editorial copy are currently hardcoded; Portfolio can consume approved Sanity gallery records. Production data access requires approval statuses and publication permission. There is no Reel schema, Instagram token flow, scheduled sync, or video component today. Existing Journal samples are gated; do not turn on sample content to populate the new homepage.

The live preview confirms two outstanding release issues recorded in the migration audit: Inquire has no configured form URL/mounted iframe and displays the unavailable message; the canonical still points to `https://emily-site-preview.workers.dev/`, rather than the supplied `https://emily-site-preview.wjschrumpf.workers.dev/`. Unlike the historical audit, the current preview now emits an OG image, but its URL uses that same incorrect host. Treat these as separate release verification tasks, not reasons to rewrite the design or the form. This phase did not submit an inquiry or change settings.

## What the live Home is doing

Viewport heights below are browser measurements after resize, not performance scores. Small differences can arise from font/image settling. Main-section counts include headings, labels, buttons, and visible review copy.

| Width  | Viewport height | Document width | Approx. document height | Selected Work starts |
| ------ | --------------- | -------------- | ----------------------- | -------------------- |
| 320px  | 844px           | 320px          | 9,592px                 | y ≈ 2,195px          |
| 390px  | 844px           | 390px          | 9,122px                 | y ≈ 1,995px          |
| 768px  | 1024px          | 768px          | 7,987px                 | y ≈ 1,705px          |
| 1440px | 900px           | 1440px         | 7,256px                 | y ≈ 1,552px          |

The gallery heading starts at these positions; the first finished photograph appears later, after the larger process image, especially when stacked on mobile. No document-level horizontal overflow was measured at these four Home widths or at 390/1440 on the five interior routes. This is limited read-only inspection, not a new full accessibility certification.

The site feels warm, coherent, and recognizably editorial. It shares the references' generous typography, tonal bands, and offset photographs. It gives finished work less prominence than Cara's repeated wedding galleries and has no equivalent to VN's visible video collection. Sarah also uses an artist portrait hero, so a finished-hair hero is our response to Emily's goal rather than a claim that every reference does it.

### Section-by-section decisions

| Current section / approximate words         | Decision             | Specific change                                                                                                                                                                                        | Destination for retained detail                                                                                                                   |
| ------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero / 28                                   | REPLACE WITH VISUALS | Replace IMG-01 with approved finished-hair photography; keep a service/location H1 and Check your date. Remove the supporting sentence and four-adjective slogan. Add a quiet View the portfolio link. | Brand language can remain in About; no necessary fact is lost.                                                                                    |
| Brand introduction / 49                     | SHORTEN              | Move below the immediate gallery. One sentence naming Emily, her location, and style specialization; no separate oversized emotional headline.                                                         | Services keeps preparation/timeline support; About keeps personal approach.                                                                       |
| Experience statistics / 25                  | COMBINE              | Remove the large standalone headline and band. Put the three existing statistics beside Meet Emily after owner confirmation.                                                                           | Canonical values remain in `siteSettings.experienceStats`; never infer an extra year or increased wedding count.                                  |
| Selected Work / 12, three photographs       | REPLACE WITH VISUALS | Move to directly below hero. Six distinct finished-look/context photographs, portrait-forward, with one Portfolio link. Replace dominant process image; reduce heading to Selected work.               | Full gallery and optional style context on Portfolio.                                                                                             |
| Package preview / 101                       | SHORTEN              | Keep three compact ruled rows: name, starting price, party size. One shared sentence about preview/planning, one Services link. Remove three interchangeable emotional summaries from Home.            | Full inclusions, second-artist details, timing, travel qualification, and add-ons remain on Services.                                             |
| Experience/process / 90 plus large portrait | MOVE                 | Move the complete four-step process to Services, where it already appears. Reuse the portrait for a compact Meet Emily paragraph and combined stats.                                                   | Services owns process; Inquire shows only the brief next step.                                                                                    |
| Testimonials / 86                           | SHORTEN              | Two short, approved, verbatim excerpts and names. Remove the elaborate display headline. Avoid another carousel or invented star rating.                                                               | Keep full originals in Sanity `quote`; use existing `excerpt`. Services can retain Lauren's full quote. Do not silently rewrite client testimony. |
| Availability + closing CTA / 46             | COMBINE              | One current availability line, one short invitation, one inquiry button. Remove the extra eyebrow/promise paragraph.                                                                                   | Detailed availability qualification on Inquire, using the same approved settings.                                                                 |
| Global footer                               | SHORTEN              | Keep service area, real social/contact links, and Privacy. Reduce the repeated wedding-planning prompt on Home to a normal inquiry link when appropriate.                                              | Footer remains useful on every route; no page-specific styling requirement has been implemented.                                                  |

The repetition is concentrated around calm mornings, collaborative styling, timelines, and reassurance. Each is useful once. Home currently explains the feeling in the hero, intro, process, closing, and footer. The four-step process also repeats on Services, and Inquire adds another three-step explanation before the form.

Calls to action are not the largest problem. There are two body inquiry actions (hero/closing), plus header/footer actions and three exploratory links. Keep the two deliberate body inquiry moments and sticky navigation; avoid inserting another booking button under every new gallery/video row. Portfolio is already in navigation, but its body link arrives too late and its own first image is process-oriented.

## Three possible homepage flows

| Option                                       | Order                                                                                                                                                                       | Advantage                                                                                                                | Tradeoff                                                                                                                                       |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **A. Finished-work editorial — recommended** | Finished-look hero → six-photo gallery → one-sentence introduction → six video posters → compact packages → Meet Emily + stats → two review excerpts → availability/inquiry | Answers what the work looks like before asking for much reading; balances photos, motion, price, personality, and proof. | Needs the new original photographs and video exports. At 320px the gallery will deliberately take more vertical space.                         |
| B. Lookbook first                            | Minimal service/location header with finished photo pair → nine-photo lookbook → short Emily introduction + stats → packages → one review → three featured videos → inquiry | Strongest still-photography portfolio emphasis and very little text.                                                     | Requires more approved distinct photos than we have; price and personal connection arrive later; nine photos can lengthen mobile considerably. |
| C. Artist and experience                     | Portrait/finished-hair split hero → short Meet Emily + stats → four-photo gallery → packages → three videos → two reviews → inquiry                                         | Makes Emily's warm personality and service qualification visible early; can use more existing branding material.         | Closest to the existing balance; smaller improvement for visitors arriving without Instagram context.                                          |

Option A combines Cara's recurring photographic proof, VN's accessible-looking poster/play affordance, and Sarah's brief artist introduction. It does not adopt their colors, fonts, scripts, business claims, or media.

### Recommended section specification

1. **Hero.** Approved finished look, readable hair, service/location H1, one inquiry button, one quiet Portfolio link. Prefer a shorter image-led composition with text outside the hair's focal area; use a separate mobile crop where necessary. Avoid auto-rotating hero slides or video as the LCP asset.
2. **Selected work.** Six images, mostly close finished looks with one broader wedding moment. Desktop three columns, mobile two when detail remains readable. Make the work visible at the start of the first scroll, without intro/stat blocks in between. No extra explanatory paragraph.
3. **One-sentence introduction.** “I'm Emily, a Denver bridal hairstylist creating soft updos, half-ups, and waves for weddings across Colorado.” This introduces who and where without requiring an About-page story.
4. **Video section.** “See the movement.” Six vertical posters; three columns/two rows on desktop, two columns/three rows at 390/768, one column at 320. Clicking opens a lightweight player dialog; load only the chosen video. No view-count badges. See the dedicated feasibility report.
5. **Packages at a glance.** Three ruled rows with the existing names, prices and party sizes. Shared preview/planning inclusion; clear starting-price qualifier and Services link. Keep all three starting prices visible rather than replacing them with a vague luxury statement.
6. **Meet Emily + experience.** IMG-10, one short paragraph, About link, compact approved stats. No numbered process here. This is the page's single substantial branding portrait.
7. **Kind words.** Two approved excerpts, simple attribution, optionally one related photograph only if identity/rights are established. Keep full quotes in their appropriate interior/CMS locations.
8. **Availability and inquiry.** Approved current availability and Check your date. It leads to the existing HoneyBook route.

If photos or videos are unavailable, omit the unready section or use the explicitly limited interim photo selection. Do not launch six empty slots, stock work, copied references, or a fake live feed.

## Detailed copy reduction plan

The following current wording is from actual source files, with whitespace normalized. These are proposed edits, not published changes. The numbers define 12 editorial areas; related sentences within an area should be reviewed together.

### 1. Home hero

**Current:** “Romantic bridal hair, made to feel effortless.” / “Soft, lasting styles and a calm, considered experience for weddings across Colorado.” / “Dreamy. Romantic. Effortless. Long-lasting.”

**Recommended:** “Romantic bridal hair in Denver & Colorado.” Keep “Check your date”; add “View the portfolio” as a quiet link. Delete the supporting sentence and slogan from Home.

**Reason:** Service and location remain explicit. Photography supplies the mood without three versions of the same promise.

### 2. Home introduction

**Current:** “A softer kind of wedding morning” / “Beautiful hair is only part of how the morning should feel.” / “Your bridal style should move naturally, photograph beautifully, and still feel like you. Emily pairs romantic texture with careful preparation, steady communication, and a timeline made around your people.”

**Recommended:** “I'm Emily, a Denver bridal hairstylist creating soft updos, half-ups, and waves for weddings across Colorado.”

**Reason:** Names the artist earlier, keeps relevant service language, and moves preparation/timeline detail to Services. Remove the Explore the experience link from this tiny introduction; Services already has its own section link.

### 3. Home statistics

**Current:** “Experience behind the ease” / “A practiced hand for the moments that matter.”

**Recommended:** Remove both lines. Keep the existing three values and labels beside Meet Emily, after confirmation.

**Reason:** The figures provide the evidence; a separate poetic explanation adds a section without adding information. The existing 300+, 9, and 3 are unresolved owner-review values, not newly confirmed claims.

### 4. Home gallery title

**Current:** “Selected work” / “Texture, movement, and details that hold.”

**Recommended:** “Selected work” / “View the portfolio”.

**Reason:** More space for visible hair; the new photographs should demonstrate texture and shape directly.

### 5. Home packages

**Current:** “Room for the people you want beside you.” / “Every collection begins with the bride and includes a bridal preview and wedding-morning planning.” Three summaries: “A beautifully paced morning shared with the people closest to you.”; “More room in the morning without sacrificing time, care, or attention.”; “A seamless, unrushed styling experience designed for a larger group.”

**Recommended:** “Bridal packages” / “Each collection includes a bridal preview and wedding-morning planning.” Keep The Intimate — starting at $1,750 — bride + up to 4 additional hair services; The Signature — starting at $2,300 — bride + up to 6; The Full Party — starting at $2,950 — bride + up to 8. Use complete “additional hair services” labels in the actual rows. Link “Compare packages.”

**Reason:** Party size and starting price distinguish the choices. Move summaries off Home; retain complete inclusions/qualifiers on Services. These prices remain subject to the existing owner approval process; no price change is proposed.

### 6. Home process → short artist introduction

**Current:** “Clear plans. Collaborative styling. A calm chair to land in.” Steps: “Tell me about your day” — “Share your date, venue, party size, and the feeling you want for your wedding morning.”; “Reserve your date” — “After availability is confirmed, your proposal and agreement make the details clear.”; “Shape the vision” — “At your bridal preview, we refine the texture, balance, and details until the style feels like you.”; “Settle into the morning” — “A thoughtful timeline and collaborative styling keep the room calm while every look comes together.”

**Recommended:** “Meet Emily” / “Romantic texture is my favorite part of the work. I'll help you find a style that feels like you.” / “More about Emily.” Move the complete process to Services only.

**Reason:** The portrait should introduce the person. Booking instructions belong where readers evaluate the service; they already exist there.

### 7. Home reviews

**Current heading:** “The kind of confidence that lasts past the last pin.” Current Kailey quote: “I seriously trust Emily with my life! I've never seen someone do such magic work on my hair—she is so gifted and definitely in the right industry! My mom also loved her; we couldn't stop smiling ever after the bridal preview!” Current Caley quote: “I can't even put into words how confident Emily made me feel on my wedding day. Emily is so talented.” Lauren already uses a short excerpt.

**Recommended:** Heading “Kind words.” Two proposed verbatim excerpts: Kailey — “My mom also loved her; we couldn't stop smiling ever after the bridal preview!”; Caley — “I can't even put into words how confident Emily made me feel on my wedding day.”

**Reason:** Shorten by selecting exact sentences, not by writing new customer praise. Emily/client approval is still required for published excerpts. Preserve all full quotes, including Lauren's complete Services quote, in Sanity.

### 8. Home closing

**Current:** “Your date, your people, your pace” / “Let the morning feel as beautiful as the finished look.” / “Tell Emily where you are getting ready and who will be in the chair.”

**Recommended:** Approved availability line / “Let's talk about your wedding hair.” / “Check your date.”

**Reason:** The visitor has already seen the work, price, artist, and reviews. Give a clear next step instead of another benefit statement. Preserve the truthful availability detail on Inquire.

### 9. Services fit introduction

**Current:** “For brides drawn to softness, movement, and a calm room.” / “The experience is designed around textured high updos, romantic half-up styles, and polished waves that feel touchable without losing their shape.” / “You do not need every detail decided before you inquire. Bring the references you love, and Emily will help translate them into a style that works with your hair, dress, and day.”

**Recommended:** “Textured high updos, romantic half-ups, and polished waves—shaped around your hair and your day.”

**Reason:** Keep the concrete specialties and place the package comparison sooner. The invitation to bring inspiration can live in the relevant FAQ/preview guidance.

### 10. About personal section

**Current:** “A boy mom, a French fry devotee, and happiest somewhere dreaming about romance.” / “The personal and professional parts of my life share the same thread: I care about people, the details they remember, and beauty that never feels too precious to enjoy.”

**Recommended:** “Boy mom. French fry devotee. Always drawn to a little romance.” Delete the following abstract paragraph.

**Reason:** Preserve Emily's specific personality. Keep her actual training, Dallas experience, and educator story elsewhere on About rather than replacing them with generic lifestyle copy.

### 11. FAQ opening

**Current:** “Clarity before the first pin.” / “A thoughtful wedding morning starts with clear expectations. Find the practical details here, then bring the specifics of your day to your inquiry.”

**Recommended:** “Bridal hair questions” / “Booking, previews, travel, and wedding-day details.”

**Reason:** Make the page's purpose immediate and reach the grouped native disclosures sooner. Do not shorten policy answers until the unresolved facts in OWNER-DECISIONS are settled.

### 12. Inquire opening and pre-form explanation

**Current:** “Tell me what you want the morning to feel like.” / “Start with the practical details, then share the style, people, and atmosphere you are picturing. You do not need to have every answer yet.” Later: “The more context you share, the more useful the first reply can be. Required fields and final qualification questions are managed in Emily's approved HoneyBook form.” The three-step What happens next section precedes the form, followed later by another full reassurance/photo section.

**Recommended:** “Inquire about your wedding date.” / “Share your date, venue, party size, and the hairstyle you have in mind.” Place approved availability, starting investment, location, and response expectation in a concise introduction beside/above the existing form. After the form: “Emily will review your details and reply with availability and next steps.”

**Reason:** Remove the sentence about who manages fields from public copy; it is implementation detail. Move detailed booking process to Services. Remove the large pre-form planning photo/steps and the closing reassurance block. Keep the form fallback, privacy notice, actual qualification information, and truthful response expectation. Do not invent a 24/48-hour reply promise or claim successful delivery is detectable inside the cross-origin form.

## Interior pages and information that must remain

| Page              | Recommended evolution                                                                                                                                                                                               | Preserve                                                                                                                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Services          | Reduce the hero/fit preamble, show a finished look, bring pricing higher, retain compact comparison, pair add-ons with genuinely relevant imagery. Combine repeated benefits and keep one clear process sequence.   | All three package prices/capacities, preview inclusion, wedding-day appointment length, included second artists, add-on prices/qualifiers, travel/timing/staffing proposal context, useful service FAQs.       |
| Portfolio         | Shorter heading area; finished results first; more distinct original work; style grouping only when enough assets exist; optional accessible enlargement. Current live/main copy is already brief (about 82 words). | Accurate alt text, optional confirmed credits, original aspect ratios/hotspots, static visible gallery, inquiry route. Do not manufacture metadata or style diversity.                                         |
| About             | Keep name/portrait and the meaningful training/Dallas/education story. Combine repeated calm/collaboration statements; use one supporting process image instead of a separate image for every paragraph.            | Emily's warm personal details and verified expertise; no invented publications or brand endorsements.                                                                                                          |
| FAQ               | Compact photo/header and direct category navigation. Keep native disclosures.                                                                                                                                       | Booking, retainer, changes/cancellation, minimums, assistants, travel, previews, extensions, child/service policies. Details remain in HTML; do not hide disputed facts behind prettier but less precise copy. |
| Inquire           | Form immediately after a brief qualification/introduction, supporting image optional and small. Reduce preliminary scrolling and remove repeated reassurance.                                                       | Existing HoneyBook loader/placement, privacy/fallback links, approved investment and availability, response expectation. The provider's accessibility limitations still require separate review.               |
| Journal / Privacy | Do not add a Home Journal section to fill space. Retain publication/sample gates. Update Privacy only when a selected video/Instagram integration actually changes data flows.                                      | Existing metadata/schema/canonical infrastructure, authentic approved articles, owner-approved privacy content.                                                                                                |

Useful SEO context remains in one natural Home H1/introduction, metadata, service-area information, Services, FAQ, About, and contextual Portfolio alt/captions. Do not stuff keywords into alt text or put essential facts in a photograph. Do not restore the old $1,600 minimum, retired package terminology, contradictory service cap, or unconfirmed retainer/travel promises.

## Photography and visual rhythm

Use the existing IMG-04 finished half-up prominently, IMG-05 at moderate portrait size, and the clean/cropped IMG-08 for a loose-updo result. Keep IMG-03 as bridal-party context. The final file check found six new root-level WebPs: prioritize `rsz_img_9637.webp` (monochrome rear view with clear textured hair) and `rsz_img_2432.webp` (blonde waves from behind); use the color reception view or turning portrait as context. Keep the horse portrait and distant field view secondary. Several show repeated style families, and four are only about 660px wide, so these are not six distinct close-ups or ready-made desktop hero originals. Request larger originals and a dedicated high-updo detail. IMG-01/02/11/12 move into supporting process roles; IMG-10 remains the key artist portrait. Full old/new inventory and missing categories are in [PHOTO-ASSET-REVIEW.md](PHOTO-ASSET-REVIEW.md).

Alternate image density with brief useful information: hero → gallery → introduction → motion → price → artist → proof → inquiry. There is no need for a second standalone hairstyle section in addition to the six-picture gallery. Do not expand to ten full-height sections merely to include every suggested ingredient.

### Existing tokens, preserved

Use `src/styles/tokens.css` as the source of truth:

| Role                         | Existing token/value                                                       |
| ---------------------------- | -------------------------------------------------------------------------- |
| Warm ivory canvas            | `--color-background: #f5ece3`                                              |
| Warm alternate / soft fields | `--color-background-alt: #ede0d4`; `--color-background-soft: #f1e6dc`      |
| Near-white surface           | `--color-surface: #fefcf1`                                                 |
| Deep brown text              | `--color-text: #5c4033`                                                    |
| Dusty rose accent / border   | `--color-accent: #a67d74`; `--color-border: #a67d74`                       |
| Olive                        | `--color-sage: #6b705c`; same value as text-muted                          |
| Typography                   | `--font-display` and `--font-body`: Fahkwang                               |
| Layout                       | `--layout-width: 76rem`; `--wide-width: 92rem`; existing responsive gutter |

Keep the existing spacing scale and restrained square/near-square actions. Reduce redundant sections/padding with those tokens; do not introduce a second design system. Use brown for small text where rose lacks contrast. Keep the sticky header, readable overlay treatment, focus indicators, reduced-motion behavior, and responsive foundations. No stock images, reference-site photos, giant pill controls, decorative gradients, card walls, auto-playing galleries, or heavy animation framework.

## Responsive design decisions

These are proposed layout specifications, not rendered redesign validation.

| Width  | Photos / hero                                                                                                                                                                                                            | Videos / text / navigation                                                                                                                                                                                                                                     |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 320px  | Separate portrait crop; keep the entire hairstyle within the image window. One-column gallery if two columns make the hair too small; use an occasional paired detail only after review. No overlap or negative margins. | One-column 9:16 posters; six clips remain available. Short wrapping H1, compact price rows, existing disclosure navigation. Use a player width that fits the viewport; provider embeds may need their own wider minimum and cannot be cropped into tiny tiles. |
| 390px  | Large hero, six images in two columns, 3:4 or 4:5 crops, existing ≥20px gutter.                                                                                                                                          | Two-column poster grid; one video player at a time. Artist portrait/text stack; stats in compact rows. Keep 44px controls and readable captions.                                                                                                               |
| 768px  | Two-column gallery with restrained asymmetry; preserve reading order and avoid the current tall portrait-plus-process stack.                                                                                             | Two-column video grid; packages in simple rows; artist/stat pairing if content fits. Existing header still uses its mobile menu below the actual 62rem breakpoint.                                                                                             |
| 1440px | Three-column gallery within existing wide bounds; hero can pair photo and short text or use an approved wide crop. No forced 16:9 crop of every portrait.                                                                | Three-column/two-row videos; compact packages; short artist/stat row; two review excerpts. Existing sticky desktop navigation remains.                                                                                                                         |

At every width: test 200% zoom/reflow, logical heading order, visible keyboard focus, image-overlay contrast, and no clipped hair/faces. Reserve intrinsic media dimensions. Load only the real LCP image eagerly; lazy-load the rest. For video, initial load should fetch posters only and no Meta script/player/video bytes before activation. A modal needs a name, close button, focus management, Escape, focus restoration, and pausing on close. Captions and descriptions must carry information that is otherwise available only through audio or motion.

Adding images can increase bytes even while reducing copy. Proposed budgets: no initial video requests, roughly ≤300KB combined for six optimized posters, and roughly ≤250KB for a mobile hero candidate where visual quality permits. These are optimization targets, not measured current transfer figures. Validate against real exports and [Core Web Vitals goals](https://web.dev/articles/vitals) (LCP ≤2.5s, CLS ≤0.1, INP ≤200ms at the 75th percentile), with later representative testing; no new Lighthouse score is claimed here.

## Implementation priorities after review

1. **Content and asset selection:** select from the six reviewed WebPs and migrated library, request larger originals/missing high-updo details, decide the hero/mobile crop, approve excerpts and current business facts, and confirm a verified Instagram profile. Resolve existing release questions separately; don't overwrite approval gates.
2. **Static visual refresh:** hero and immediate gallery first; reduce the 12 copy areas; compact packages, artist/stats, and closing; make Portfolio lead with results. No Instagram backend is needed to achieve the primary design improvement.
3. **Curated video launch:** Sanity-managed six-item collection, owner-supplied website-cleared videos/covers, lazy click-to-play, accessibility/fallbacks. Recommended storage/delivery is covered in the feasibility report.
4. **Optional automation pilot:** read current official API via the account Emily authorizes; verify exact fields/permissions, audio-limited cases, token lifecycle, and fallback. Never make the gallery depend on a successful live API call for every visitor.
5. **Verification and release preparation:** inspect 320/390/768/1440 layouts, keyboard/mobile navigation, art direction, image payloads, videos with blocked third parties, and HoneyBook loading without sending a lead. Check canonical/social metadata and approved CMS production gates. Review a concrete preview before any deployment authorization.

## What is needed from Emily

Larger originals of the six reviewed photos where available, plus missing high-updo detail; favorite hero/style direction; credits and publication rights; six original video exports and covers; website-appropriate audio or silent versions; verified Instagram handle and professional-account/business-portfolio status; approval of the proposed homepage direction and copy/excerpts; current pricing/availability/statistics and unresolved policies from OWNER-DECISIONS. Supply the verified HoneyBook standalone fallback link and approved response expectation as part of the existing launch checklist.

The intended outcome is a site where the visitor sees Emily's finished work immediately, understands the investment without digging, meets the person behind it, and has an obvious path to inquire.
