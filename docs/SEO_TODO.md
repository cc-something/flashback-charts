# SEO / Lighthouse Todo

## 1. Font loading

- [x] Limit the home page to one display font plus one body/UI font.
- [x] Load decade-specific fonts only on the relevant decade and year pages.
- [x] Remove unused global font families from the shared document head.
- [x] Preload only the one or two fonts used above the fold on each page.
- [x] Consider self-hosting or subsetting the remaining fonts if the payload stays high.

## 2. Home page rendering

- [x] Keep the home hero in the shared base font stack and avoid decade font switching there.
- [x] Render decade cards and previews in the shared home font on the home page.
- [x] Make sure above-the-fold content is immediately visible and not gated behind client-only transitions.
- [x] Avoid intro effects on the main heading and hero content that could delay LCP detection.

## 3. JavaScript payload

- [x] Split the large main app bundle so home only ships what home needs.
- [x] Defer chart, decade, and detail logic until navigation.
- [x] Audit global code that is only needed on deeper pages.

## 4. Images and media

- [x] Reduce initial home-page image work where possible.
- [x] Lazy-load below-the-fold images more aggressively.
- [x] Make sure the primary above-the-fold image is prioritized and never lazy-loaded.

## 5. Third-party and misc

- [ ] Fix the broken Plausible script URL that currently returns 404.
- [ ] Keep only the external preconnects we still need after font cleanup.
- [ ] Re-run Lighthouse after each change batch because the current report had `NO_LCP` errors.

## 6. Accessibility

- [ ] Increase the search button hit area to at least 24x24.
