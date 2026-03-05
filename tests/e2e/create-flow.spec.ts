import { expect, test } from "@playwright/test";

test("create flow renders the first session step", async ({ page }) => {
  await page.goto("/create");

  await expect(
    page.getByRole("heading", { name: "Start with the rough idea." }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Generate Recommendation" }),
  ).toBeVisible();
});
