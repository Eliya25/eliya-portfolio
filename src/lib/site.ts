import { z } from "zod";

const DEFAULT_SITE_URL = "https://eliya-portfolio.vercel.app";

const httpsUrlSchema = z
  .url({ protocol: /^https$/, hostname: z.regexes.domain })
  .transform((value) => value.replace(/\/+$/, ""));

export function normalizeSiteUrl(value: string): string {
  const result = httpsUrlSchema.safeParse(value);

  if (!result.success) {
    throw new Error(
      `NEXT_PUBLIC_SITE_URL must be a valid HTTPS URL. Received: ${JSON.stringify(value)}`,
    );
  }

  return result.data;
}

export function absoluteUrl(pathname = "/"): string {
  return new URL(pathname, `${siteConfig.url}/`).toString();
}

export const siteConfig = {
  name: "Eliya Cohen",
  url: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL),
} as const;
