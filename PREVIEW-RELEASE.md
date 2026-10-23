# Cloudflare preview release

Target: https://emily-site-preview.wjschrumpf.workers.dev/

Repository: `Wjs0068/Emily-site`, branch `main`. The existing GitHub check **Workers Builds: emily-site-preview** on commit `8306bf3` confirms this connection. Release through the existing push-triggered build; no custom domain or manual deployment is configured by this change.

The approved implementation and photo-selection decisions are documented in `VISUAL-REFRESH-IMPLEMENTATION.md` and `PHOTO-SELECTION-REVIEW.md`. The earlier research reports are included for context. Six canonical photo assets are committed under `src/assets/refresh/`; duplicate root uploads remain local. Generated screenshots, Playwright output, browser-session files, build output, dependencies, and local environment files are excluded from this release. Historical screenshots already tracked by earlier commits are unchanged.

## Preview safeguards

- The common layout emits `noindex,nofollow` for development content and for configured `workers.dev`/`pages.dev` hosts. This also covers the current preview when `PUBLIC_SITE_URL` is unset. `robots.txt` permits crawlers to read the noindex directive; it does not grant indexing permission.
- `/dev/video-showcase/` is generated only by the development server. Production builds omit that route, its sample content, and video files. Home renders video only when the existing approval, publication-permission, website-rights, and accessibility gates pass; no sample video substitutes for real content.
- Existing `CONTENT_MODE=production` requirements remain unchanged: configured Sanity/site/inquiry settings, owner-approved privacy policy, and approved content are still required. Preview approval does not mark unresolved business facts or rights as owner-approved.
- Validation uses `CONTENT_MODE=development`, the existing preview URL, and the existing public HoneyBook configuration. This is a temporary review build, not an assertion that production content approval is complete.

## Release checks

Before pushing: Prettier, ESLint, Astro check/build, the existing Playwright/axe/responsive suite, generated HTML noindex/demo checks, asset-copy checks, and a staged-file audit. After pushing: inspect the GitHub check for the new commit and fetch the live preview to verify the updated Home/Portfolio, noindex, and demo exclusion.

Final pre-push checks passed: 84 Playwright tests (zero failed/skipped/flaky), axe/responsive checks, formatting, lint, Astro check, and the optimized build. All 11 generated HTML pages are `noindex,nofollow`; no development video route, sample media, or Home video section is published. Wrangler's upload-free dry run read the generated `dist/client/wrangler.json`, confirmed the `emily-site-preview` target, and passed. An intentionally unconfigured production-content build still failed at the existing missing-Sanity gate, as expected.

Keep Cloudflare build environment settings in the existing dashboard configuration. No secrets are stored in this document or committed as part of the release. If the push does not trigger a build or Cloudflare reports failure, report that status without changing unrelated application code.
