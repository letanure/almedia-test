import { defineConfig, devices } from "@playwright/test"

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Use parallel workers on CI for speed */
  workers: process.env.CI ? 2 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["html", { outputFolder: "./tests/playwright-report" }]],
  /* Store snapshots based on environment */
  snapshotDir: process.env.CI
    ? "./tests/e2e/.snapshots-ci"
    : "./tests/e2e/.snapshots",
  snapshotPathTemplate: process.env.CI
    ? "{snapshotDir}/{testFileName}-{testName}-{arg}-{projectName}{ext}"
    : "{snapshotDir}/{testFileName}-{testName}-{arg}-{projectName}-{platform}{ext}",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.CI ? "http://localhost:4173" : "http://localhost:5173",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",

    /* Screenshot settings for visual regression testing */
    screenshot: "only-on-failure",

    /* Performance optimizations for CI */
    ...(process.env.CI && {
      /* Disable video recording on CI for speed */
      video: "off",
      /* Reduce navigation timeout */
      navigationTimeout: 15_000,
      /* Reduce action timeout */
      actionTimeout: 10_000,
    }),
  },

  /* Visual comparison settings */
  expect: {
    /* Animation handling */
    toHaveScreenshot: {
      animations: "disabled",
      /* Threshold for screenshot comparisons */
      threshold: 0.2,
    },
  },

  /* Configure projects for major browsers */
  projects: process.env.CI
    ? [
        /* CI: Only run Chromium for speed */
        {
          name: "chromium",
          use: { ...devices["Desktop Chrome"] },
        },
      ]
    : [
        /* Local: Run all browsers */
        {
          name: "chromium",
          use: { ...devices["Desktop Chrome"] },
        },

        /* Mobile viewport testing */
        {
          name: "mobile-chrome",
          use: { ...devices["Pixel 5"] },
        },
      ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: process.env.CI ? "pnpm run preview" : "pnpm run dev",
    url: process.env.CI ? "http://localhost:4173" : "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
  },
})
