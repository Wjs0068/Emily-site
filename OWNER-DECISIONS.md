# Launch decisions for Emily

Please answer or check each item. A checked item means the exact wording, value, permission, or policy is approved for public use.

## Business

- [ ] How should the business name be styled everywhere: “Em’s Bridal Hair” or something else?
- [ ] What public email should appear on the site?
- [ ] Should a public phone number appear? If yes, what number?
- [ ] What is the verified Instagram URL?
- [ ] Which areas do you currently serve (Denver, surrounding areas, and/or all Colorado)?

## Availability

- [ ] Which booking years are open now? Is 2026 fully booked?
- [ ] Is “Now booking 2027” current, and is 2027 availability limited?
- [ ] On what date did you last review this availability?

## Packages

- [ ] Confirm the current package names.
- [ ] Confirm each starting price and minimum investment.
- [ ] Confirm how many services each package includes and whether the bride counts.
- [ ] Can another guest be added to every package? What limits apply?
- [ ] When is a second artist included, and when is one an extra charge?

## Booking

- [ ] How far in advance can someone book?
- [ ] Is the retainer still $250? Is it non-refundable, and is it applied to the balance?
- [ ] What additions or removals can be made after signing, and by what deadline?
- [ ] What are the current cancellation and refund rules?

## Travel

- [ ] Is travel still calculated at $30 per 30 minutes round trip? How is time rounded?
- [ ] Who pays tolls?
- [ ] Who pays parking?
- [ ] When is lodging required?
- [ ] When does an early start change staffing or cost?

## Bridal preview

- [ ] Should the site always say “bridal preview,” “trial,” or another term?
- [ ] Is the appointment approximately two hours?
- [ ] Can one or two looks usually be tested?
- [ ] Is the preview required or optional?
- [ ] Is it included in every package or charged separately?
- [ ] Do previews still happen at Studio 33 in Littleton, and may that city-level location be public?
- [ ] Can mothers or bridesmaids book a preview? Under what terms?
- [ ] What age qualifies for flower-girl service?

## Content

- [ ] Approve or correct: 300+ weddings styled.
- [ ] Approve or correct: 9 years of experience.
- [ ] Approve or correct: 3 years as a bridal educator.
- [ ] Include the statement that early work caught the attention of hair brands online? May any brands be named?
- [ ] Approve the Kailey, Lauren, and Caley testimonial wording and publication permission.
- [ ] Supply or approve photographer names and links where credit is required.
- [ ] Confirm publication rights for every image used on the site.

## Inquiry

- [ ] Is HoneyBook still the approved inquiry provider?
- [ ] What is the approved public HoneyBook form or embed URL?
- [ ] What response time should the site promise?

## Legal

- [ ] Approve the draft privacy policy after appropriate owner/legal review.
- [ ] Approve the cancellation and refund language used in proposals and public pages.
- [ ] Are separate website terms and conditions needed?

## Final migration audit — October 2, 2026

These are recovered Wix facts, not new approvals. Confirm the current policy against your contract before publishing a precise answer. The complete 15-answer comparison is in `FINAL-MIGRATION-AUDIT.md`. Earlier unchecked items remain unresolved.

### Booking and contract facts

- [ ] **Booking window:** Wix says booking opens only 12 months in advance and Saturdays fill first. Is that still accurate alongside the current 2027 availability messaging?
- [ ] **Securing the date:** Wix requires an inquiry, signed contract, and a $250 retainer. Confirm the current sequence and amount.
- [ ] **Retainer refundability:** Wix calls the $250 retainer non-refundable. Confirm the current refund/cancellation wording.
- [ ] **Retainer credit:** Wix says it is applied to wedding-day services. Confirm whether the entire retainer reduces the remaining balance.
- [ ] **Changes:** Wix allows up to four added services until 90 days before the wedding, with approval; limits the resulting count to seven services plus the bride; and prohibits removals after the 90-day cutoff. Confirm additions, removals, approval requirements, and the cutoff interpretation separately. The old service cap conflicts with The Full Party and must not be restored.
- [ ] **Location changes:** Wix says a changed getting-ready location updates the contract and invoice. Confirm the current process and any deadlines or extra costs.
- [ ] **Minimum:** Confirm the current bride-only/minimum investment policy for The Intimate. The old $1,600 and “classic package” wording is retired, not a candidate for reinstatement.

### Staffing and travel facts

- [ ] **Assistant fee:** Wix says $250 when the morning is short, avoiding an early start, or there are more than nine services. Confirm only the rules for staffing beyond the artists already included in The Signature and The Full Party; do not automatically charge this fee on those packages.
- [ ] **Travel:** Wix says $30 for each 30 minutes round trip between Emily's home and the prep location. Confirm the formula, time rounding, starting point, and whether parking, tolls, lodging, or early starts are extra. No private home address should be published.
- [ ] **Extensions:** Wix's FAQ specifies a $175 rental and recommends it particularly for glam waves. The price already appears on Services. Confirm the current price and recommendation; no price was added to the FAQ without approval.

### Preview and child-service facts

- [ ] **Before booking:** Wix requires a signed agreement and paid $250 retainer before scheduling a preview. Confirm the prerequisites independently of the retainer amount.
- [ ] **Length and looks:** Wix describes a two-hour preview with time for one or two looks for most brides. Confirm both values; the two-hour wedding-day appointment is a different service.
- [ ] **Included versus optional:** Wix says the preview cost is included but attendance is not required. Confirm both policies. Current packages already include a preview; the FAQ still defers inclusion to the proposal.
- [ ] **Location:** Confirm Studio 33 in Littleton is still the preview location and may be named publicly.
- [ ] **Additional previews:** Wix allows previews for mothers/bridesmaids in a contracted bridal party if Emily's schedule permits. Confirm current eligibility, fee, duration, and whether extra previews for the bride are available. Wix does not specify those extra terms.
- [ ] **Flower girl:** Wix defines the age as eight and under. Confirm the current age definition, service scope, and price.

### Photographs, testimonials, and social sharing

- [ ] **Caley / IMG-08:** Supply the clean photographer original for `08-caley-wedding.jpg`, without the video mute badge. No clean alternate was found in the repository or among the documented Wix originals. A bottom-only crop removes the artifact for now; please confirm rights/credits and approve the crop or provide the original. Upload the clean source or this crop to Sanity, never the badge-bearing source.
- [ ] **Lauren / IMG-05:** Supply a higher-resolution photographer original if available; the current 1320×1640 source is soft/grainy and should not be enlarged further.
- [ ] **Portfolio metadata:** For each retained photo, provide the verified bride name (with permission to publish), venue, location, photographer name/link, and wedding date. Leave unknown values blank. Filenames and scenery are not identity/location evidence. The gallery schema now supports all these fields.
- [ ] **Full Lauren testimonial:** Approve publication of the complete unchanged Wix quote recovered in `src/lib/content.ts`. For production Sanity, copy that full wording into Lauren's `quote` and the existing short Home wording into `excerpt`. Confirm all three testimonial permissions; other pre-existing quotes contain copyedited spelling/punctuation and should be reviewed with their clients.
- [ ] **Sharing image:** Review `public/images/social/emily-bridal-hair-og.jpg` (1200×630), made from the high-resolution branding photo already used on Services, with existing Fahkwang typography, colors, and site wording. Confirm publication permission and brand styling before release. The old square-ish Wix OG original remains archived.
- [ ] **Collage:** Keep IMG-14 archived. Individual photo originals can be supplied later if they add distinct work; restoring the baked collage is unnecessary.

### Production configuration and release

- [ ] **Domain:** Supply the final production domain and confirm the business name/service area before release. Local `PUBLIC_SITE_URL` is unset. The live preview's canonical points to `https://emily-site-preview.workers.dev/`, which differs from the supplied `https://emily-site-preview.wjschrumpf.workers.dev/`; correct the deployment setting. No new domain was invented.
- [ ] **Live HoneyBook configuration:** The repository and live preview both contain placement `632a07d8b2f1e1000827a1ea` and the public loader, but the live inquiry page has no `data-form-url`, displays the unavailable message, and does not mount an iframe. Configure `PUBLIC_HONEYBOOK_FORM_URL=https://public.honeybook.com/public_contact_form_app/07c4a1d/index.html` and `INQUIRY_PROVIDER=honeybook` at build time and redeploy the reviewed repository. No form rebuild is needed.
- [ ] **Standalone inquiry fallback:** Supply HoneyBook's verified direct link for this contact form so the fallback can eventually stop depending on the old Wix site. The frame endpoint is not a standalone fallback.
- [ ] **CMS release:** Populate owner-approved Sanity documents, including the complete Lauren quote and approved clean/cropped images, and confirm package/policy/availability data and image rights. Use `CONTENT_MODE=production` only after those requirements and privacy approval are satisfied. A successful development-mode build does not constitute production content approval.
