# SEO Deep Scan

## Summary

This pass focused on technical SEO first, then metadata quality, then a low-risk performance cleanup that supports crawlability and page speed.

Implemented in three commits:

- `fix: restore prerendered html`
- `feat: strengthen seo metadata`
- `perf: split route bundles`

## What Was Fixed

### 1. Restored real prerendered HTML

The site uses `vite-ssg`, but prerendering was failing because several stores and components touched browser-only globals like `window`, `navigator`, and `localStorage` during SSR setup.

That caused static output to fall back to a near-empty shell instead of route-specific HTML.

Fixed by making SSR-safe guards in:

- `src/stores/chart.ts`
- `src/stores/player.ts`
- `src/components/MiniPlayer.vue`
- `src/components/HotkeysModal.vue`
- `src/composables/useEmailSignup.ts`
- `src/stores/toast.ts`

Result:

- home, decade, and year pages now render full HTML during prerender
- route-specific metadata is present in static output
- search engines now receive crawlable page content without relying on hydration

### 2. Strengthened metadata and structured data

Improved SEO signals across the main route types in:

- `src/content/chartContent.ts`
- `src/pages/HomePage.vue`
- `src/pages/DecadePage.vue`
- `src/pages/YearPage.vue`
- `src/App.vue`
- `scripts/generate-sitemap.ts`

Changes:

- stronger, search-oriented page titles
- better meta descriptions with explicit Australia/year intent
- `lang="en-AU"` in rendered HTML
- `og:site_name`, `og:image`, `twitter:image`
- richer JSON-LD on home, decade, and year pages
- stronger on-page intro copy for crawlable text
- sitemap generation now requires a real `VITE_SITE_URL`
- sitemap homepage URL normalized to `https://flashbackcharts.com` instead of a trailing-slash variant

Result:

- home page now targets "Australia top 10 songs by year"
- decade pages now target decade-level Australian chart queries more directly
- year pages now target "Top 10 Songs in Australia in YYYY" and include stronger snippet copy

### 3. Reduced JS on the critical path

Added low-risk code splitting in:

- `src/App.vue`
- `src/router.ts`

Changes:

- lazy-loaded modal-only UI
- lazy-loaded route page components

Result:

- main client bundle dropped from about `540.44 kB` to `502.27 kB` minified
- route/page code now ships in separate chunks

## Verification

Ran:

- `pnpm check`
- `pnpm build`

Confirmed in generated `dist` output:

- full prerendered HTML instead of an empty app shell
- unique titles and descriptions for home, decade, and year routes
- canonical tags aligned with sitemap URLs
- `og:image` and `twitter:image` present where expected
- JSON-LD present in static HTML
- `robots.txt` and `sitemap.xml` generated with the production domain

## Remaining Follow-Up

The worktree still contains unrelated local changes that were intentionally left alone:

- `docs/TODO.md`
- `public/og/*`
- `scripts/generate-og-images.ts`
- `src/themes/decades/1940s.ts`

Potential future SEO follow-up:

- generate and wire dedicated OG images for every decade/year page instead of using content thumbnails as the fallback share image
- keep shrinking the main app bundle if page speed becomes the next bottleneck
