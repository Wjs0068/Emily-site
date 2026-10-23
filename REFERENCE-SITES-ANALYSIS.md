# Reference websites: visual analysis

Research date: October 22, 2026. Observations describe the public sites as rendered during this session, not their underlying private design files. No reference photography, video, branding, or copy was downloaded for reuse in Emily's website.

## Method and evidence

Used a headed Playwright browser at 1440px desktop and 390px mobile, scrolled through homepages, inspected navigation and public inquiry destinations, captured screenshots, and compared rendered media with DOM observations where available. References: [VN Artistry](https://vnartistry.com/), [Sarah Corzi](https://www.sarahcorzi.com/), [Cara Clyne](https://www.caraclyne.co/).

Evidence is in `output/playwright/visual-refresh/`:

- VN: `vnartistry-desktop-1440.png`, `vnartistry-mobile-390.png`, `vnartistry-mobile-menu.png`, `vnartistry-inquiry.png`.
- Cara: `caraclyne-1440.png`, `caraclyne-390.png`, `caraclyne-mobile-menu.png`, `cara-inquiry.png`, `cara-services.png`.
- Sarah: `sarahcorzi-desktop-1440.png` (hero), `sarahcorzi-mobile-top.png`, `sarahcorzi-desktop-part-*.png`, and `sarahcorzi-mobile-part-*.png` (sequential viewport captures; later bottom-of-page repeats do not represent extra sections).
- Emily: `emily-home-{320,390,768,1440}.png` and desktop/mobile captures of the five requested interior pages.

**Sarah limitation:** the workplace environment routes this domain through Zscaler browser isolation. The rendered page can be seen and scrolled, but its DOM/media/network details cannot be inspected as if it were a normal local page. A native full-page screenshot captures the isolation viewport, not the entire remote document. Sequential screenshots document the visual review. Initial white/loading frames and incompletely faded images are capture limitations, not asserted site defects. Navigation labels and homepage content were corroborated with the [public page extraction](https://www.sarahcorzi.com/). No form was completed or submitted on any site.

## Side-by-side comparison

| Question                   | VN Artistry                                                                                                                 | Sarah Corzi                                                                                                 | Cara Clyne                                                                                                 |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| First impression           | Warm brown/cream, large artist portrait, clear inquiry and portfolio routes                                                 | Studio artist portrait, large serif name treatment, green/ivory/rose palette                                | Wedding-led hero with a large color photograph and smaller monochrome image, then repeated wedding imagery |
| How soon is work visible?  | Artist first; a horizontal work-photo strip follows the hero before substantive text                                        | Artist first; wedding imagery appears after a short introduction                                            | Wedding imagery is present immediately in the hero; a mosaic follows the publication band                  |
| Text versus imagery        | A substantial page with many sections, but short service labels and large video/photo groups                                | Relatively brief introduction and experience copy; photos and testimonials carry the middle                 | Large image-led areas and repeated galleries; artist paragraph is noticeably longer than surrounding copy  |
| Photo arrangements         | Horizontal strip, simple three-column photo grid, portrait service teasers                                                  | Offset/overlapping wedding-photo pairs, larger image sections, small lower gallery                          | Mixed-size mosaics, full-width groups, offset portraits, large paired photography                          |
| Video                      | Six native videos with posters/play buttons and social-source links; browser saw same-site MP4 URLs and no homepage iframes | No definite video player established in inspected screens; isolated DOM prevents a reliable media inventory | No video/iframe elements found on rendered homepage during inspection                                      |
| Services                   | Three very short ruled links, followed by image-led routes for different audiences                                          | Brief experience teaser links to package page                                                               | Homepage directs to a separate bridal service page; not a full package comparison on Home                  |
| Artist introduction        | Short portrait-and-bio section after work                                                                                   | Artist identity leads the page; short introductory paragraph follows                                        | Artist portrait and bio appear after initial wedding galleries/positioning                                 |
| Reviews                    | Three visible cards within a larger review carousel, source links and navigation                                            | Large dark testimonial area associated with wedding imagery; extracted page includes four reviews           | More than one proof treatment: three review cards, then a compact four-person quotation row                |
| Booking guidance           | Distinct inquiry routes by audience; dedicated form with service-type tabs                                                  | Prominent book actions link to `/book`; booking completion not verified                                     | Service and availability actions lead toward a separate contact page and wedding inquiry link              |
| Mobile                     | Collapsed menu; visual groups compress/reflow, while portrait content remains prominent                                     | Collapsed menu, stacked name/portrait, offset photo pair retained, compact FAQ at bottom                    | Collapsed menu; wide image group becomes a single lead image/slider-style presentation                     |
| Premium quality comes from | Consistent palette, portrait quality, clear separation of photo/video/proof chapters                                        | Large confident typography and cohesive studio/wedding art direction                                        | Repetition of polished wedding photography and variation in image scale                                    |
| Main caution for Emily     | More sections and audience branches than Emily needs; proof badges and cards are not the brand goal                         | Large artist hero does not by itself show a range of finished hair                                          | Long page, substantial blank/dark spacing, repeated proof, and some small service actions                  |

The successful shared pattern is not simply “very few words.” It is **large, purposeful images arranged into recognizable chapters, with concise links between them**. VN is textually longer than Emily's Home in an unfiltered DOM count because of its review carousel; it still feels more immediately visual. Cara's broad wedding photography creates atmosphere but is not always close enough to show hair technique. Emily should combine that atmosphere with clearer hairstyle close-ups.

## VN Artistry

### What was observed

Desktop order: navigation → artist portrait hero → horizontal work-photo strip → compact statistics/review/publication band → six portrait videos → short service link list → three image-led audience routes → six-image Portfolio grid → artist introduction → review carousel → brand-logo band → final booking actions → multi-column footer.

The hero prioritizes the artist's name, location, and two useful routes. It is not a finished-work hero. The next strip supplies rapid visual evidence without a paragraph of explanation. The video collection then makes the page feel active well before the main still-image Portfolio section. The six-video arrangement is three columns by two rows on desktop, with large vertical posters, a recognizable play affordance, short overlays, and source-platform links.

Browser inspection found six native `<video>` elements. Each referenced an MP4 and poster under the site's own `/photos/social/` paths, had `autoplay=false`, and used `preload=metadata`. No homepage iframes were present. This supports a same-site video implementation; it does **not** demonstrate automatic Instagram synchronization or explain its authors' rights/licensing arrangements. Emily can borrow the poster/player interaction without assuming the same integration exists behind it.

Photography alternates between an immersive hero, a fast work strip, three destination images, a clean six-picture grid, and a single artist portrait. Ruled service links are particularly effective: they name the choice and move detailed explanation onto another page. The portrait introduction is short and occurs after enough evidence of the work.

The review carousel shows a few reviews at once, with arrows/dots and external source links. The footer provides service/exploration/social navigation and contact context. The dedicated [booking page](https://vnartistry.com/book) has separate audience tabs and a substantial inquiry form; no submission behavior or delivery was tested.

At 390px, navigation becomes a compact menu button. Opening it revealed a dedicated menu panel with clear destinations and inquiry action; a screenshot was saved. The homepage still uses large media rather than converting everything into text panels. Full-page capture was possible, although animation timing can change which rotating review or strip image appears.

### Implications for Emily

- Adopt a finite six-poster video collection, an uncomplicated photo grid, short service rows, and one compact artist introduction.
- Keep source links as a fallback, but give Emily's visitors a meaningful view of the work on her site.
- Put finished hairstyle photographs ahead of video so visitors immediately understand the specific service.
- Do not copy audience branches for education/events unless Emily actually offers and wants to market those services.
- Avoid importing view-count badges, brand logos, unverified ratings, carousel complexity, or the rounded review-card treatment. Emily's existing editorial rules and near-square controls are a better fit.

## Sarah Corzi

### What was observed

The desktop header places a monogram/crest at left, centered navigation, and social icons at right. The hero uses a studio portrait with large serif name typography spread across the composition. On mobile, the name stacks above/over the portrait and the menu collapses. The hero's booking action is prominent, with location beneath the main identity treatment. A moving/oversized availability band sits below it.

The homepage then moves through a short artist welcome, wedding imagery, an experience teaser with offset overlapping portrait photographs, a testimonial area, further imagery and inquiry action, and a short FAQ. The bottom includes Instagram/TikTok links. The brief introduction names the service and operating markets; it does not attempt to tell the entire career story on Home.

The offset wedding pair is the most transferable composition: one large portrait image and a smaller companion, with short supporting copy and a clear package link. Its mobile version preserves the visual relationship without requiring a long explanatory section. The lower gallery includes a hairstyle finishing close-up alongside broader bridal imagery. The dark testimonial chapter gives a visual change of pace, though not every animation frame rendered fully in isolation.

This is a more personal artist-brand presentation than a complete hairstyle catalogue. The hero demonstrates the artist's presence, while the wedding photographs and testimonials supply service evidence later. It would not solve Emily's particular concern if we copied that hierarchy literally and kept another large branding portrait above most of the hair work.

Public homepage extraction corroborates four testimonial entries and three homepage FAQ prompts, with links to fuller package, About, and FAQ pages. Booking actions point to [the book route](https://www.sarahcorzi.com/book). The isolated environment and unsuccessful text fetch of that route mean the actual form/provider and end-to-end inquiry behavior remain **unverified**. No particular CRM is attributed to it.

No video implementation could be established reliably. Social icons and links are not evidence of an embedded Reel feed. This report therefore does not recommend a Sarah-style “automatic video feed” or claim one exists.

### Implications for Emily

- Adopt the brevity of the welcome, a clear relationship between the artist's face and name, and an occasional offset photo pair.
- Preserve Emily's own Fahkwang typography and ivory/rose/olive/brown palette; do not import the crest, green identity, serif lockup, or pill-shaped action.
- Use short service copy with a package link, but retain Emily's useful published starting prices.
- Do not copy the moving availability banner, giant decorative type, or photo overlaps where they obscure hair or strain a 320px layout.
- Treat all mobile composition conclusions as visual observations. No remote DOM accessibility or video-absence audit is claimed.

## Cara Clyne

### What was observed

Desktop order: slim dark navigation → asymmetric wedding-photo hero → publication band → wedding mosaic → short service/positioning passage with offset photographs → artist portrait/bio → second mosaic → three-card reviews → larger image group → compact four-person quotation row → service CTA/image pairing → photo-led footer with navigation/social links. Some oversized dark/blank areas lengthen the captured page.

The site supplies wedding imagery immediately. Rather than relying on one big gallery late in the page, it repeatedly returns to photographs in different sizes: tall images at the edges, smaller paired frames, and mixed monochrome/color work. That repetition makes the overall service visually evident even if the visitor reads very little.

The first gallery is a mixed-size mosaic across a wide dark field. Later groupings repeat that editorial device with different photographs, providing visual continuity. The artist introduction comes after initial evidence of the work, with a small portrait and comparatively long bio. The main service action leads to a separate service page rather than filling the homepage with all pricing and policies.

At 390px, navigation is a menu button; opening it produced a clear destination list. Gallery regions show a single leading photograph with additional items represented in the rendered region. The mobile visual experience therefore depends more on a slider-like presentation than the desktop mosaic. That can conceal range if visitors never interact, which is a reason to prefer Emily's visible static grid.

The rendered homepage inspection found no native video or iframe elements. The footer is photographic and navigational, including real social destinations. The [service page](https://www.caraclyne.co/bridal-hair-christchurch) places practical investment/process information on an interior route. The [contact page](https://www.caraclyne.co/contact) points wedding visitors to a dedicated inquiry action while separating other contact needs. Those routes were viewed without submitting anything.

Public text extraction includes service/training/blog/template-like content that was not present in the inspected live homepage DOM and screenshots. It is not counted as a visible homepage section here. This is one reason the rendered browser, rather than extraction alone, governs the section inventory.

### Implications for Emily

- Adopt finished wedding imagery before substantial explanation, repeated visual proof, occasional monochrome/context contrast where Emily's actual photos support it, and a small artist section after the work.
- Make hairstyle detail more legible than in distant couple/fashion photographs. Emily sells hair; a beautiful dress image alone does not show whether an updo is the right fit.
- Do not copy publication logos, testimonials, luxury-market claims, tiny navigation typography, pill actions, or very long dark spacer sections.
- Avoid two separate testimonial chapters and multiple giant galleries on Emily's Home. One substantial finished-work gallery plus video offers enough range without reproducing the reference's length.

## Patterns to carry into the refresh

| Pattern                                | Application for Emily                                                         | Boundary                                                                    |
| -------------------------------------- | ----------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Work immediately after the hero        | Move Selected Work ahead of intro/stats; use six finished-look/context photos | Use only her approved originals; no repeated fillers                        |
| Alternating scale                      | Large hero, consistent portrait gallery, compact portrait/bio                 | Preserve hair/face focal points; no arbitrary overlaps on narrow screens    |
| Video posters with clear play controls | Six 9:16 covers and one requested player at a time                            | No autoplay, initial embed scripts, copied view counts, or assumed API feed |
| Short service navigation               | Three compact package rows and one full-services link                         | Keep real starting prices/capacities and complete details on Services       |
| Small artist introduction              | IMG-10, short first-person copy, compact approved experience stats            | Do not replace Emily's voice with a generic luxury persona                  |
| Brief photo-backed proof               | Two exact approved review excerpts near inquiry                               | Do not invent sources, stars, identities, or photo/testimonial pairings     |
| Clear inquiry destination              | Existing sticky Inquire and hero/final actions                                | Preserve HoneyBook; make the form quicker to reach                          |

The recommended synthesis is in [EMILY-VISUAL-CONTENT-REFRESH.md](EMILY-VISUAL-CONTENT-REFRESH.md). It is an evolution of the existing site, not a clone of any reference.
