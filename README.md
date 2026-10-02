# Em's Bridal Hair

Astro rebuild of the Em's Bridal Hair website, designed for Cloudflare Workers with production-gated Sanity content and an isolated HoneyBook inquiry integration.

## Requirements

- Node.js 22.12 or newer
- npm
- Chromium for Playwright browser tests

## Local setup

```powershell
npm.cmd install
Copy-Item .env.example .env
npm.cmd run dev
```

The site is available at `http://localhost:4321`. Without Sanity environment variables, it builds from the reviewed local fallback content.

To enable Sanity, set these values in `.env`:

```dotenv
PUBLIC_SITE_URL=https://example.com
PUBLIC_SANITY_PROJECT_ID=your-project-id
PUBLIC_SANITY_DATASET=production
PUBLIC_HONEYBOOK_FORM_URL=https://public.honeybook.com/public_contact_form_app/07c4a1d/index.html
PUBLIC_CONTACT_EMAIL=
PUBLIC_GA_MEASUREMENT_ID=
PUBLIC_SHOW_JOURNAL=false
CONTENT_MODE=development
INQUIRY_PROVIDER=honeybook
PRIVACY_POLICY_STATUS=DRAFT
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
```

The public Sanity variables enable content fetching during the Astro build. The studio variables are required only for `npm.cmd run studio`.

## Commands

| Command                    | Purpose                                       |
| -------------------------- | --------------------------------------------- |
| `npm.cmd run dev`          | Start the Astro development server            |
| `npm.cmd run format:check` | Check Prettier formatting                     |
| `npm.cmd run lint`         | Run ESLint                                    |
| `npm.cmd run check`        | Run Astro and TypeScript diagnostics          |
| `npm.cmd run test:e2e`     | Run Playwright page and accessibility tests   |
| `npm.cmd run screenshots`  | Capture reviewed page sizes in `screenshots/` |
| `npm.cmd run build`        | Validate and create the production build      |
| `npm.cmd run studio`       | Start Sanity Studio                           |

Install the browser used by the end-to-end suite once per machine:

```powershell
npx.cmd playwright install chromium
```

The screenshot command expects the development server at `http://localhost:4321`.

## Content and assets

- Sanity schemas live in `sanity/schemaTypes/`.
- Development fallback content lives in `src/lib/content.ts`; production never silently uses it.
- Typed, centralized GROQ and content access live in `src/lib/sanity/`.
- Original Wix media is preserved unchanged in `src/assets/source/`.
- Migration and design decisions are documented in the root Markdown reports.

Do not replace uncertain business details with invented copy. Resolve `OWNER-DECISIONS.md` before a production content build. Integration behavior and iframe limitations are documented in `INTEGRATIONS.md`.

## Deployment

`npm.cmd run build` generates the static site in `dist/`. The Cloudflare Workers Static Assets configuration is in `wrangler.jsonc`; deploy through the connected Cloudflare workflow or with Wrangler after configuring the target account.
