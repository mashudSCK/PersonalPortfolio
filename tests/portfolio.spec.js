import { expect, test } from "@playwright/test";

test("renders portfolio content from data modules", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".hero-name")).toHaveText("Mashud Shamsher Khalid");
  await expect(page.locator(".project-card")).toHaveCount(6);
  await expect(page.locator(".skills-card")).toHaveCount(4);
  await expect(page.locator(".achievement-card")).toHaveCount(6);
});

test("persists theme choice", async ({ page }) => {
  await page.goto("/");
  await page.locator("#themeToggle").click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("mobile navigation exposes state and closes with Escape", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.locator("#navToggle");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toBeFocused();
});

test("mobile projects expand from three featured builds", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const toggle = page.locator("#projectsToggle");
  await expect(page.locator(".project-card:visible")).toHaveCount(3);
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");

  await toggle.click();
  await expect(page.locator(".project-card:visible")).toHaveCount(6);
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(toggle).toHaveText("Show fewer projects");
});

test("contact form enforces field limits and CAPTCHA", async ({ page }) => {
  await page.goto("/");
  await page.locator("#name").fill("Test User");
  await page.locator("#email").fill("test@example.com");
  await page.locator("#subject").fill("Portfolio question");
  await page.locator("#message").fill("This is a valid test message.");
  await page.locator(".btn-submit").click();
  await expect(page.locator("#form-message")).toContainText(
    "complete the CAPTCHA",
  );
});
