# Milestone 5 quality report

Audit date: 2026-08-30  
Production: <https://eliya-portfolio.vercel.app>  
Production deployment: `dpl_gu1USKcGmzZV9o1Qeqpav4RhZ41e`

## Automated validation

- ESLint: passed
- Prettier check: passed
- TypeScript check: passed
- Vitest: 18 tests passed
- Next.js production build: passed; all public routes generated
- Playwright: 7 tests passed in Chromium
- GitHub Actions: lint, formatting, type-check, unit tests, build, and deterministic E2E

The Playwright suite covers Home → Projects → Lumière, verified external link targets without navigating to them, important internal-link responses, keyboard focus order, horizontal overflow, and axe WCAG A/AA checks.

## Accessibility and responsive review

The public routes `/`, `/about`, `/projects`, and `/projects/lumiere` were checked at 320px, 375px, 768px, and 1440px.

- Primary navigation remains visible and keyboard accessible at mobile widths.
- Skip-link and primary navigation focus follow a logical order.
- `:focus-visible` provides a three-pixel outline that does not rely on color alone.
- Heading levels remain sequential within each route.
- Links have descriptive accessible names; decorative arrows are hidden from assistive technology.
- axe reported no WCAG 2 A/AA or WCAG 2.1 A/AA violations in the tested routes and viewports, including automated color-contrast checks.
- Reduced-motion preferences disable smooth scrolling and reduce animation durations.
- Project images have descriptive alternative text.
- The video has an explicit accessible label. Codec inspection found a VP8 video track and no audio codec; the case study identifies it as a silent interface walkthrough, so artificial captions were not added.
- No horizontal overflow was detected at any tested viewport.

This is an automated and code-level review, not a certification or a substitute for testing with a range of assistive-technology users.

## Lighthouse lab results

Lighthouse was run against the public production deployment with a headless Chromium browser.

| Route   | Performance | Accessibility | Best practices | SEO |   LCP | CLS |    TBT |
| ------- | ----------: | ------------: | -------------: | --: | ----: | --: | -----: |
| Home    |          95 |           100 |            100 | 100 | 2.2 s |   0 | 200 ms |
| Lumière |          81 |           100 |            100 | 100 | 2.6 s |   0 | 590 ms |

These are lab measurements from one run and can vary with network, CPU, cache, and deployment conditions. They are not field Core Web Vitals. Real Core Web Vitals should only be reported after Vercel Speed Insights has collected sufficient field data.

The first Lumière audit identified the 1.5MB video poster as unnecessary image transfer. Converting the same local poster to a 1200×630 JPEG reduced it to about 65KB. In the subsequent production audit, the Lumière performance score improved from 71 to 81 and measured LCP improved from 9.9 seconds to 2.6 seconds.

## Production smoke test

The following returned HTTP 200 with the expected content type:

- `/`
- `/about`
- `/projects`
- `/projects/lumiere`
- `/sitemap.xml` (`application/xml`)
- `/robots.txt` (`text/plain`)
- `/images/projects/lumiere/interface.png` (`image/png`)
- `/images/projects/lumiere/poster.jpg` (`image/jpeg`)
- `/opengraph-image` (`image/png`)
- the external Lumière WebM (`video/webm`)

The four HTML routes expose route-specific titles, canonical URLs, Open Graph metadata, and large Twitter cards. The sitemap and robots output use the configured HTTPS production origin without double slashes. A post-deploy Vercel error-log scan returned no runtime errors.
