import { expect, test } from "@playwright/test";

test("home has real content and working destinations", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Useful software.",
  );
  await expect(page.locator(".mash-bento a")).toHaveCount(5);
  await expect(
    page.getByRole("link", { name: /Featured build/ }),
  ).toHaveAttribute("href", "/showcase");
  await expect(page.locator("body")).not.toContainText("PLACEHOLDER");
});
test("projects filter without losing source links", async ({ page }) => {
  await page.goto("/projects");
  await expect(page.locator(".project-card")).toHaveCount(8);
  await page.getByRole("button", { name: "Mobile", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await expect(page.locator(".project-card h2")).toHaveText(
    "Do Your Tasks Pls",
  );
  await expect(page.getByRole("link", { name: "Source code" })).toHaveAttribute(
    "href",
    "https://github.com/mashudSCK/To-Do-List-APP",
  );
  await page.getByRole("button", { name: "Campus", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(5);
  await page.getByRole("button", { name: "All", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(8);
});
test("carousel supports buttons, keyboard, and wraparound", async ({
  page,
}) => {
  await page.goto("/showcase");
  await expect(page.locator(".project-story h2")).toHaveText(
    "The Shelves of Mash",
  );
  await page.getByRole("button", { name: "Next project" }).click();
  await expect(page.locator(".project-story h2")).toHaveText("Sulyap");
  await page.getByRole("region", { name: "Project showcase" }).focus();
  await page.keyboard.press("ArrowLeft");
  await expect(page.locator(".project-story h2")).toHaveText(
    "The Shelves of Mash",
  );
  await page.getByRole("button", { name: "Previous project" }).click();
  await expect(page.locator(".project-story h2")).toHaveText("Expense Tracker");
});
test("theme persists after reload", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page
    .getByRole("button", { name: "Switch to dark theme", exact: true })
    .click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});
test("contact requires CAPTCHA and retains limits", async ({ page }) => {
  await page.goto("/contact");
  await page.locator("#name").fill("Test User");
  await page.locator("#email").fill("test@example.com");
  await page.locator("#subject").fill("Portfolio question");
  await page.locator("#message").fill("This is a valid test message.");
  await page.getByRole("button", { name: "Send Message" }).click();
  await expect(page.locator(".contact-status")).toContainText(
    "complete the CAPTCHA",
  );
  await expect(page.locator("#message")).toHaveAttribute("maxlength", "3000");
});
test("contact handles mocked success and failure", async ({ page }) => {
  await page.goto("/contact");
  await page.route("https://api.web3forms.com/submit", (route) =>
    route.fulfill({ json: { success: true } }),
  );
  async function fill() {
    await page.locator("#name").fill("Test User");
    await page.locator("#email").fill("test@example.com");
    await page.locator("#subject").fill("Portfolio question");
    await page.locator("#message").fill("This is a valid test message.");
    await page.locator("#contactForm").evaluate((form) => {
      const input = document.createElement("input");
      input.name = "h-captcha-response";
      input.value = "test-token";
      form.append(input);
    });
  }
  await fill();
  await page.getByRole("button", { name: "Send Message" }).click();
  await expect(page.locator(".contact-status")).toContainText("Message sent");
  await page.unroute("https://api.web3forms.com/submit");
  await page.route("https://api.web3forms.com/submit", (route) =>
    route.abort(),
  );
  await fill();
  await page.getByRole("button", { name: "Send Message" }).click();
  await expect(page.locator(".contact-status")).toContainText(
    "could not be sent",
  );
  await expect(
    page.getByRole("button", { name: "Send Message" }),
  ).toBeEnabled();
});
test("mobile routes fit and navigation and jump work", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const route of [
    "/",
    "/projects",
    "/showcase",
    "/about",
    "/lab",
    "/contact",
  ]) {
    await page.goto(route);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page
    .getByRole("navigation", { name: "Primary navigation" })
    .getByRole("link", { name: "Lab" })
    .click();
  await expect(page).toHaveURL(/\/lab$/);
  await page.getByRole("button", { name: "Start game" }).click();
  await expect(
    page.getByRole("button", { name: "Jump", exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("status")).toContainText("0 obstacles cleared");
  expect(errors).toEqual([]);
});

test("touch devices animate the background unless motion is reduced", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator(".hero-canvas canvas")).toBeAttached({
    timeout: 20000,
  });
  const size = await page
    .locator(".hero-canvas canvas")
    .evaluate((canvas) => ({ width: canvas.width, viewport: innerWidth }));
  expect(size.width).toBeLessThan(size.viewport);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".hero-canvas canvas")).toHaveCount(0);
  await context.close();
});
