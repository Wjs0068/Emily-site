# Em's Bridal Hair Design System

Extracted September 29, 2026 from the rendered Wix site and its computed CSS. This system intentionally formalizes the existing brand rather than replacing it.

## Color tokens

| Token                      | Hex       | Wix source                                                                                          | Semantic role                                             |
| -------------------------- | --------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `--color-background`       | `#F5ECE3` | Wix `--color_14`, `--color_15`, `--color_37`; computed on light text and page sections              | Primary warm ivory canvas and light text on dark sections |
| `--color-background-alt`   | `#EDE0D4` | Wix `--color_11`, `--color_36`; primary button text and alternating section fills                   | Warm blush-beige section background                       |
| `--color-background-soft`  | `#F1E6DC` | Wix `--color_13`, `--color_39`; subtle background variation                                         | Quiet tonal separation without card styling               |
| `--color-surface`          | `#FEFCF1` | Wix `--color_44`; rendered warm near-white surface                                                  | High-contrast editorial surface and overlays              |
| `--color-text`             | `#5C4033` | Wix `--color_23`, `--color_42`; repeated computed body/FAQ color                                    | Primary deep brown text and focus treatment               |
| `--color-text-muted`       | `#6B705C` | Wix `--color_12`, `--color_17`, `--color_43`; repeated computed muted text/background               | Supporting copy, captions, and labels                     |
| `--color-accent`           | `#A67D74` | Wix `--color_18`, `--color_41`, `--color_45`, `--color_48`; computed brand, H1/H2, and button color | Dusty rose headings, rules, and primary action            |
| `--color-accent-secondary` | `#EDE0D4` | Wix primary-button foreground and base fill family                                                  | Restrained contrast partner for rose                      |
| `--color-sage`             | `#6B705C` | Wix background-secondary/accent variable and computed sections                                      | Deep sage/olive color band and secondary action           |
| `--color-sage-soft`        | `#B1D3BB` | Wix `--color_31`; green family tint                                                                 | Sparingly used botanical accent                           |
| `--color-border`           | `#A67D74` | Wix primary and secondary button border variables                                                   | Rules and control borders                                 |

Supporting Wix values `#EFE3D8` (`--color_38`) and `#F3E9DF` (`--color_40`) are retained as reference shades but are not separate public tokens until a real component needs them. Blue, red, yellow, and purple Wix defaults were excluded because they belong to the platform palette and were not part of the bridal brand treatment.

## Color relationships

- Warm ivory is the dominant page canvas; rose carries the brand name, display headings, and action emphasis.
- Deep brown provides readable long-form text and the strongest focus state.
- Sage/olive appears as a full-width contrast band or supporting text, not as a decorative gradient.
- Tonal ivory/blush shifts divide editorial chapters without floating card containers.
- On rose, brown, or sage fields, use `#F5ECE3` only after checking WCAG AA contrast at the actual size/weight.

## Typography observations

- The rendered Wix site uses **Fahkwang** for the brand, H1/H2/H3, and substantial body copy. It is now self-hosted from `@fontsource/fahkwang` to preserve the brand without a render-blocking Google Fonts request.
- Existing headings are regular weight, airy, and editorial: the inspected hero H1 is 67px/80.4px and the brand is 25px regular.
- Existing text relies on negative letter spacing (`-0.67px` on the hero), but the rebuild uses normal letter spacing to improve rendering and satisfy the stated design constraints.
- The rebuild retains regular display weight and generous line height while using a bounded type scale rather than fixed desktop sizes on mobile.
- Uppercase is reserved for small eyebrow labels and actions. Body text remains sentence case.

## Spacing and layout observations

- The Wix composition uses large fields of whitespace, full-width colored bands, overlapping/asymmetric photographs, and long vertical pacing.
- The original fixed canvas is approximately 980–1193px and does not reflow on mobile. The rebuild preserves the visual cadence with responsive grids, bounded gutters, and `minmax(0, 1fr)` tracks.
- The token scale ranges from 6px to 128px. Sections use the larger intervals; related text uses the smaller intervals.
- Content widths are intentionally narrow for editorial reading while images can extend to wide or full-bleed tracks.

## Buttons and links

- Wix actions use square/near-square dusty-rose fields with ivory text or outlined rose treatments. They are not pill-shaped.
- The rebuild uses two treatments: solid rose for the primary inquiry action and understated text/arrow links for secondary navigation.
- Corners remain between 2px and 6px. Hover changes invert or deepen the existing rose/ivory relationship; there are no shadows.
- All controls keep visible keyboard focus, a minimum 44px touch target, and stable dimensions.

## Image treatment

- Photography is warm, candid, close, and process-oriented: hands styling hair, bridal profiles, textured updos, and intimate portraits.
- Existing compositions pair portrait crops with one large landscape/full-width frame and occasional overlaps.
- The rebuild preserves editorial asymmetry but gives every image intrinsic dimensions and a stable aspect ratio.
- Only the hero LCP image loads eagerly. Below-fold images are lazy-loaded and locally sourced during development.
- Final Sanity images will use hotspot/crop data, responsive CDN widths, modern formats, and contextual alt text.

## Borders, radii, and depth

- Existing content is largely borderless, with flat color relationships rather than elevation.
- Rules are thin and use dusty rose or semi-transparent brown.
- Radius tokens are 2px and 6px. Cards, large rounded panels, shadows, glass effects, and nested containers are intentionally excluded.

## Decorative motifs

- Offset portrait pairs and editorial image crops
- Fine horizontal rules and small numeric section markers
- Warm tonal page bands
- Large romantic words broken across lines
- Organic negative space and restrained botanical/sage color references
- Small uppercase labels used as publication-style furniture

## Accessibility adjustments

The brand colors are preserved, but not every original pairing is accessible at every size. Deep brown replaces dusty rose for small body copy where needed. Ivory-on-rose is reserved for sufficiently large/bold text or replaced with deep brown after contrast testing. Motion is optional, subtle, and disabled under `prefers-reduced-motion`.
