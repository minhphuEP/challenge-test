import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
  // Directory where all test files are located
  testDir: './tests',

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if test.only is left in source code
  forbidOnly: !!process.env.CI,

  // Retry failed tests on CI
  retries: process.env.CI ? 2 : 0,

  // Limit parallel workers on CI
  workers: process.env.CI ? 1 : undefined,

  // Global timeout for each test (in milliseconds)
  timeout: 60_000,

  // Directory for storing test artifacts (screenshots, videos, traces)
  outputDir: 'reports/test-results/',

  // Configure various reporters
  reporter: [
    ['list'],
    ['junit', { outputFile: 'reports/junit.xml' }],
    ['html',  { outputFolder: 'reports/html', open: 'never' }],
    ['allure-playwright', { outputFolder: 'reports/allure-results' }]
  ],

  // Shared settings for all tests
  use: {
    // Base URL for actions like `await page.goto('/')`
    baseURL: process.env.BASE_URL,

    // Run tests in headless mode
    headless: true,

    // Capture trace only on first retry
    trace: 'on-first-retry',

    // Take screenshot on test failure
    screenshot: 'only-on-failure',

    // Retain video on test failure
    video: 'retain-on-failure',

    // Ignore HTTPS errors (useful for self-signed certs)
    ignoreHTTPSErrors: true
  },

  // Define projects for cross-browser testing
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    }
  ]
});
