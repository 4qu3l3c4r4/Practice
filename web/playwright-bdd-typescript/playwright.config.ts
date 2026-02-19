import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import { config } from 'dotenv';

config({ path: './.env' });

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const HEADLESS_MODE = process.env.HEADLESS_MODE !== 'false';
const TEST_ISOLATION = process.env.TEST_ISOLATION !== 'false';
const VIDEO_RECORDING = process.env.VIDEO_RECORDING === 'true';

// Real Chrome user agent in headless to avoid 403 from WAF/bot detection
const REAL_CHROME_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const testDir = defineBddConfig({
  paths: ['tests/features/**/*.feature'],
  require: ['tests/steps/**/*.ts', 'utils/fixtures.ts'],
});

export default defineConfig({
  testDir,
  timeout: 60000,
  expect: { timeout: 10000 },
  fullyParallel: TEST_ISOLATION,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: TEST_ISOLATION ? (process.env.CI ? 2 : 4) : 1,

  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html', open: 'never' }],
    ['json', { outputFile: 'reports/results.json' }],
  ],

  use: {
    baseURL: BASE_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: VIDEO_RECORDING ? 'on' : 'off',
    ignoreHTTPSErrors: true,
    actionTimeout: 15000,
    navigationTimeout: 30000,
    ...(HEADLESS_MODE && { userAgent: REAL_CHROME_UA }),
    storageState: TEST_ISOLATION ? 'tests/storage-state.json' : undefined,
  },

  outputDir: 'reports/test-results',
  globalSetup: TEST_ISOLATION ? require.resolve('./global-setup') : undefined,

  projects: [
    {
      name: 'smoke',
      testMatch: /.*\.feature/,
      grep: /@smoke/,
      use: { ...devices['Desktop Chrome'], headless: HEADLESS_MODE },
    },
    {
      name: 'login',
      testMatch: /.*\.feature/,
      grep: /@login/,
      use: {
        ...devices['Desktop Chrome'],
        headless: HEADLESS_MODE,
        storageState: undefined, // no pre-auth so login page is visible
      },
    },
    {
      name: 'all',
      testMatch: /.*\.feature/,
      use: { ...devices['Desktop Chrome'], headless: HEADLESS_MODE },
    },
    // Uncomment for multi-browser:
    // {
    //   name: 'firefox',
    //   testMatch: /.*\.feature/,
    //   use: { ...devices['Desktop Firefox'], headless: HEADLESS_MODE },
    // },
    // {
    //   name: 'webkit',
    //   testMatch: /.*\.feature/,
    //   use: { ...devices['Desktop Safari'], headless: HEADLESS_MODE },
    // },
  ],
});
