import { test, expect } from "@playwright/test";

test("create flow renders the first session step", async ({ page }) => {
  await page.goto("/create");

  await expect(page.getByRole("heading", { name: "Enter the spark." })).toBeVisible();
  await expect(page.getByRole("button", { name: "Build Territories" })).toBeVisible();
});
