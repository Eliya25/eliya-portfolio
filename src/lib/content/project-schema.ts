import { z } from "zod";

const isoDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Expected an ISO date in YYYY-MM-DD format")
  .refine(
    (value) => !Number.isNaN(Date.parse(`${value}T00:00:00Z`)),
    "Expected a valid date",
  );

const httpsUrlSchema = z.url().refine((value) => value.startsWith("https://"), {
  message: "Expected an HTTPS URL",
});

export const projectImageSchema = z
  .object({
    src: z.string().startsWith("/images/projects/"),
    alt: z.string().trim().min(1),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
  })
  .strict();

export const projectSchema = z
  .object({
    slug: z
      .string()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Expected a kebab-case slug"),
    title: z.string().trim().min(1).max(100),
    shortDescription: z.string().trim().min(1).max(240),
    problemSummary: z.string().trim().min(1).max(320),
    publishedAt: isoDateSchema,
    updatedAt: isoDateSchema.optional(),
    featured: z.boolean(),
    status: z.enum(["active", "completed", "archived"]).optional(),
    technologies: z.array(z.string().trim().min(1)).min(1),
    repositoryUrl: httpsUrlSchema.optional(),
    demoUrl: httpsUrlSchema.optional(),
    coverImage: projectImageSchema.optional(),
    gallery: z.array(projectImageSchema).optional(),
    seo: z
      .object({
        title: z.string().trim().min(1).max(70).optional(),
        description: z.string().trim().min(1).max(160),
      })
      .strict(),
  })
  .strict()
  .superRefine(({ publishedAt, updatedAt, technologies }, context) => {
    if (updatedAt && updatedAt < publishedAt) {
      context.addIssue({
        code: "custom",
        path: ["updatedAt"],
        message: "updatedAt cannot be earlier than publishedAt",
      });
    }

    if (new Set(technologies).size !== technologies.length) {
      context.addIssue({
        code: "custom",
        path: ["technologies"],
        message: "Technologies must be unique",
      });
    }
  });

export type Project = z.infer<typeof projectSchema>;

export function parseProjectFrontmatter(
  frontmatter: unknown,
  sourceName: string,
): Project {
  const result = projectSchema.safeParse(frontmatter);

  if (!result.success) {
    throw new Error(
      `Invalid project frontmatter in ${sourceName}:\n${z.prettifyError(result.error)}`,
    );
  }

  return result.data;
}
