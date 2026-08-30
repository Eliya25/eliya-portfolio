import { describe, expect, it } from "vitest";

import { normalizeSiteUrl } from "./site";

describe("normalizeSiteUrl", () => {
  it("removes trailing slashes", () => {
    expect(normalizeSiteUrl("https://portfolio.example.com///")).toBe(
      "https://portfolio.example.com",
    );
  });

  it.each([
    "http://portfolio.example.com",
    "portfolio.example.com",
    "https://localhost:3000",
    "not a url",
  ])("rejects an invalid production URL: %s", (value) => {
    expect(() => normalizeSiteUrl(value)).toThrow(/must be a valid HTTPS URL/);
  });
});
