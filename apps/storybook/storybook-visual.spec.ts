/**
 * Storybook Screenshot Regression Tests
 *
 * Visual regression tests for Storybook stories in both light and dark themes.
 * Tests key components at the story level (component isolation) for faster
 * feedback than full E2E visual tests.
 *
 * Run: pnpm test:visual:storybook
 * Update: pnpm test:visual:storybook --update-screenshots
 */

import { test, expect } from "@playwright/test";

/**
 * Helper to set theme and wait for transition
 */
async function setTheme(page: any, theme: "light" | "dark") {
  await page.emulateMedia({ colorScheme: theme });
  await page.waitForTimeout(100);
}

/**
 * Critical UI components to test (from each major category)
 * Format: "title--story" from story title (e.g., "UI/Button" + "Default" = "ui-button--default")
 */
const CRITICAL_STORIES = [
  // Base primitives
  "ui-button--default",
  "ui-button--secondary",
  "ui-button--outline",
  "ui-button--ghost",
  "ui-button--destructive",
  "ui-button--with-icon",
  "ui-button--icon-only",
  "ui-input--default",
  "ui-textarea--default",
  "ui-switch--default",
  "ui-checkbox--default",
  "ui-radio-group--default",
  "ui-select--default",
  "ui-slider--default",
  "ui-segmented-control--default",
  "ui-badge--default",
  "ui-avatar--default",
  "ui-icon-button--default",

  // Forms
  "form--default",
  "range-slider--default",

  // Feedback
  "dialog--basic",
  "dialog--with-header",
  "dialog--long-content",
  "alert-dialog--default",
  "toast--default",
  "sonner--default",

  // Navigation
  "tabs--default",
  "sidebar--default",
  "sidebar--collapsed",
  "navigation-menu--default",
  "breadcrumb--default",
  "pagination--default",
  "mode-selector--default",
  "model-selector--default",

  // Overlays
  "popover--default",
  "tooltip--default",
  "dropdown-menu--default",
  "context-menu--default",
  "drawer--default",
  "sheet--default",
  "hover-card--default",

  // Chat components
  "chat-header--default",
  "chat-input--default",
  "chat-messages--default",
  "chat-sidebar--expanded",
  "chat-sidebar--collapsed",
  "compose-view--default",

  // Modals
  "settingsmodal--main-view",
  "settingsmodal--personalization-panel",
  "discoverysettingsmodal--default",

  // Display
  "card--default",
  "progress--default",
  "skeleton--default",
  "table--default",

  // Templates
  "chat-full-width-template--default",
  "chat-two-pane-template--default",
  "dashboard-template--default",

  // Showcase pages
  "design-system-page--default",
  "typography-page--default",
  "spacing-page--default",
  "color-showcase--default",
  "foundations-showcase--default",
  "iconography-showcase--default",
];

test.describe("Storybook visual regression - Light Theme", () => {
  test.beforeEach(async ({ page }) => {
    await setTheme(page, "light");
  });

  for (const storyId of CRITICAL_STORIES) {
    test(storyId, async ({ page }) => {
      await page.goto(`http://localhost:6006/iframe.html?id=${storyId}`);
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveScreenshot(`${storyId}-light.png`);
    });
  }
});

test.describe("Storybook visual regression - Dark Theme", () => {
  test.beforeEach(async ({ page }) => {
    await setTheme(page, "dark");
  });

  for (const storyId of CRITICAL_STORIES) {
    test(storyId, async ({ page }) => {
      await page.goto(`http://localhost:6006/iframe.html?id=${storyId}`);
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveScreenshot(`${storyId}-dark.png`);
    });
  }
});

test.describe("Storybook visual regression - Interactive States", () => {
  // Test hover/focus states for critical interactive elements
  const INTERACTIVE_STORIES = [
    "ui-button--default",
    "ui-input--default",
    "ui-icon-button--default",
    "ui-switch--default",
  ];

  for (const storyId of INTERACTIVE_STORIES) {
    test(`${storyId} - hover state`, async ({ page }) => {
      await setTheme(page, "light");
      await page.goto(`http://localhost:6006/iframe.html?id=${storyId}`);
      await page.waitForLoadState("networkidle");

      // Hover over the main element
      const main = page.locator("main, #root").first();
      const interactive = main.locator("button, input, a, [role='button']").first();
      if ((await interactive.count()) > 0) {
        await interactive.hover();
        await page.waitForTimeout(100);
        await expect(page).toHaveScreenshot(`${storyId}-hover-light.png`);
      }
    });

    test(`${storyId} - focus state`, async ({ page }) => {
      await setTheme(page, "light");
      await page.goto(`http://localhost:6006/iframe.html?id=${storyId}`);
      await page.waitForLoadState("networkidle");

      const main = page.locator("main, #root").first();
      const interactive = main.locator("button, input, a, [role='button']").first();
      if ((await interactive.count()) > 0) {
        await interactive.focus();
        await page.waitForTimeout(100);
        await expect(page).toHaveScreenshot(`${storyId}-focus-light.png`);
      }
    });
  }
});
