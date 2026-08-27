# Eliya Cohen — Portfolio

Personal portfolio for Eliya Cohen, Backend Engineer & Development Team Lead.

This repository currently contains the Milestone 1 foundation: the Next.js application shell, accessible theme system, shared layout, and CI validation. Project content and case studies are intentionally deferred to Milestone 2.

## Development

```bash
pnpm install
pnpm dev
```

## Validation

```bash
pnpm lint
pnpm type-check
pnpm test
pnpm build
```

## Adding a project

1. Add `src/content/projects/<slug>.mdx`.
2. Use the same kebab-case value for the filename and frontmatter `slug`.
3. Provide every required field defined in `src/lib/content/project-schema.ts`.
4. Keep the body to Markdown and explicitly approved MDX components. Imports, exports, JavaScript expressions, and unapproved components are rejected.
5. Run `pnpm test` and `pnpm build`. Invalid frontmatter stops the build and reports the source filename and failing fields.

Projects are discovered automatically; the projects index, static routes, metadata, and sitemap require no manual registration.
