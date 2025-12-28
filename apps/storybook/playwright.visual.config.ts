import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig, devices } from "@playwright/test";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Visual regression testing configuration for Storybook.
 * Tests component stories in isolation for faster visual regression detection.
 */
export default defineConfig({
  testDir: ".",
  testMatch: "storybook-visual.spec.ts",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html", { outputFolder: "playwright-report/visual" }]],

  // Snapshot configuration
  snapshotDir: "./tests/visual/__snapshots__",
  snapshotPathTemplate: "{snapshotDir}/{testFilePath}/{projectName}/{arg}{ext}",

  expect: {
    // Visual comparison settings
    toHaveScreenshot: {
      // Allow 0.1% pixel difference for anti-aliasing
      maxDiffPixelRatio: 0.001,
      // Threshold for color difference (0-1)
      threshold: 0.2,
      // Animation handling
      animations: "disabled",
    },
  },

  use: {
    baseURL: "http://localhost:6006",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    // Consistent viewport for screenshots
    viewport: { width: 1280, height: 720 },
    // Disable animations for consistent screenshots
    actionTimeout: 10000,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    // Dark mode variant
    {
      name: "chromium-dark",
      use: {
        ...devices["Desktop Chrome"],
        colorScheme: "dark",
      },
    },
  ],

  webServer: {
    command: "pnpm storybook:dev",
    url: "http://localhost:6006",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
    cwd: __dirname,
  },
});
