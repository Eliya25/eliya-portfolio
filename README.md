# Eliya Cohen — Portfolio

Personal engineering portfolio for Eliya Cohen, Backend Engineer & Development Team Lead. The site presents selected work through concise project summaries and source-backed case studies, alongside professional background and a focused skills overview.

## Stack

- Next.js App Router, React, and TypeScript
- Tailwind CSS with a small CSS-token design system
- MDX project content with Zod frontmatter validation
- Vitest for content and schema logic
- Playwright and axe-core for the primary journey, internal links, responsive behavior, and accessibility checks
- GitHub Actions for CI validation
- Vercel for preview and production deployments

Most pages and content components are React Server Components. The theme toggle is the only Client Component because it reads and updates browser theme preferences.

## Setup

Requirements: Node.js 24 and pnpm 11.

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

`NEXT_PUBLIC_SITE_URL` must be a valid HTTPS origin. The application removes trailing slashes before constructing canonical, sitemap, and robots URLs. Local development can use the documented default; production must use the real public Vercel URL.

## Scripts

```bash
pnpm dev          # local Next.js server
pnpm lint         # ESLint
pnpm format       # write Prettier formatting
pnpm format:check # verify formatting
pnpm type-check   # TypeScript without emit
pnpm test         # Vitest unit tests
pnpm build        # production build
pnpm test:e2e     # Playwright E2E and accessibility checks
pnpm start        # serve the production build
```

Install Chromium once before running E2E locally:

```bash
pnpm exec playwright install chromium
```

## Content workflow

Projects live in `src/content/projects/<slug>.mdx`.

1. Use the same kebab-case value for the filename and frontmatter `slug`.
2. Provide every required field defined in `src/lib/content/project-schema.ts`.
3. Keep the body to Markdown and explicitly approved MDX components. Imports, exports, JavaScript expressions, and unknown components are rejected.
4. Use local project images under `public/images/projects/<slug>/` where practical.
5. Run `pnpm test` and `pnpm build`.

Projects are discovered automatically. The project index, static routes, metadata, and sitemap require no manual registration. Invalid frontmatter stops tests and the production build with the source filename and failing fields.

## Architecture

The App Router renders Home, About, Projects, and project case studies statically. The server-only content loader reads MDX, separates frontmatter, validates it with Zod, and supplies the same project model to cards, routes, metadata, and the sitemap. MDX is evaluated with a restrictive plugin and a small allowlist of Server Components for project media and diagrams.

The site URL is normalized in one module and reused for canonical URLs, Open Graph metadata, Twitter cards, robots, and sitemap entries. This prevents environment-specific URL construction from drifting across routes.

## Testing

Vitest covers schema edge cases, safe MDX rules, content loading, and URL normalization. Playwright covers:

- Home → Projects → Lumière
- verified GitHub and Live Demo link targets
- important internal-link responses
- 320px, 375px, 768px, and 1440px viewports
- WCAG A/AA automated checks on every public route
- horizontal overflow and primary keyboard focus order

The E2E suite uses only local portfolio content and does not call Gemini or TMDB.

## Deployment

Vercel hosts Preview and Production deployments. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS production origin in the Production environment before the production build. Preview deployments may use their own deployment URL for validation.

GitHub Actions performs CI validation only: install, lint, formatting, type-check, unit tests, production build, Chromium installation, and deterministic E2E. Branch Protection is intentionally not configured yet.

After deployment, smoke-test `/`, `/about`, `/projects`, `/projects/lumiere`, `/sitemap.xml`, and `/robots.txt`. Lighthouse provides a lab measurement; real Core Web Vitals should only be reported after sufficient field data is available.
