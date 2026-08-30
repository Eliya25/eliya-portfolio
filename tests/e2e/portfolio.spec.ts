import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = ["/", "/about", "/projects", "/projects/lumiere"];
const viewports = [
  { name: "mobile-320", width: 320, height: 800 },
  { name: "mobile-375", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1000 },
];

test("Home to Lumière exposes the verified project links", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "I build backend systems with fundamentals first.",
    }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Explore projects" }).click();
  await expect(page).toHaveURL(/\/projects$/);

  await page
    .getByRole("link", { name: "Lumière — AI Movie Concierge" })
    .click();
  await expect(page).toHaveURL(/\/projects\/lumiere$/);

  const main = page.getByRole("main");
  await expect(main.getByRole("link", { name: /GitHub/ })).toHaveAttribute(
    "href",
    "https://github.com/Eliya25/lumiere-ai-movie-concierge",
  );
  await expect(main.getByRole("link", { name: /Live demo/ })).toHaveAttribute(
    "href",
    "https://lumiere-ai-movie-concierge.vercel.app/",
  );
});

test("important internal links resolve successfully", async ({
  page,
  request,
}) => {
  const internalPaths = new Set(routes);

  for (const route of routes) {
    await page.goto(route);
    const hrefs = await page
      .locator('a[href^="/"]')
      .evaluateAll((links) =>
        links.map((link) => (link as HTMLAnchorElement).getAttribute("href")),
      );

    for (const href of hrefs) {
      if (href) internalPaths.add(href);
    }
  }

  for (const path of internalPaths) {
    const response = await request.get(path);
    expect(response.status(), `${path} should resolve`).toBeLessThan(400);
  }
});

for (const viewport of viewports) {
  test(`${viewport.name} has no critical accessibility or horizontal overflow issues`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);

    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator("main")).toBeVisible();
      await expect
        .poll(() =>
          page.evaluate(
            () => document.documentElement.scrollWidth <= window.innerWidth,
          ),
        )
        .toBe(true);

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      expect(results.violations).toEqual([]);
    }
  });
}

test("keyboard focus follows the primary navigation order", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Eliya Cohen" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Projects", exact: true }),
  ).toBeFocused();
});
