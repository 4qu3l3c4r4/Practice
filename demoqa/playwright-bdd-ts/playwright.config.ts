import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import { config as loadEnv } from 'dotenv';

loadEnv({ path: './.env' });

const BASE_URL = process.env.BASE_URL || 'https://demoqa.com';
const HEADLESS_MODE = process.env.HEADLESS_MODE !== 'false';
const VIDEO_RECORDING = process.env.VIDEO_RECORDING === 'true';

const testDir = defineBddConfig({
  paths: ['src/tests/features/**/*.feature'],
  require: ['src/tests/steps/**/*.ts', 'src/fixtures/fixtures.ts'],
});

export default defineConfig({
  testDir,
  timeout: 60000,
  expect: { timeout: 10000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 2 : 4,

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
  },

  outputDir: 'reports/test-results',

  projects: [
    {
      name: 'smoke',
      testMatch: /.*\.feature/,
      grep: /@smoke/,
      use: { ...devices['Desktop Chrome'], headless: HEADLESS_MODE },
    },
    {
      name: 'all',
      testMatch: /.*\.feature/,
      use: { ...devices['Desktop Chrome'], headless: HEADLESS_MODE },
    },
  ],
});

