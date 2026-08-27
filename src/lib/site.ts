const DEFAULT_SITE_URL = "https://eliya-portfolio.vercel.app";

export const siteConfig = {
  name: "Eliya Cohen",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL,
} as const;
