import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const HEADLESS_MODE = process.env.HEADLESS_MODE !== 'false';
const VIDEO_RECORDING = process.env.VIDEO_RECORDING === 'true';
const REAL_CHROME_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

export default defineConfig({
  retries: process.env.CI ? 2 : 1,
  projects: [
    {
      name: 'chromium',
      use: {
        ...{
          headless: HEADLESS_MODE,
          baseURL: process.env.BASE_URL,
          ...(HEADLESS_MODE && { userAgent: REAL_CHROME_UA }),
        },
      },
    },
  ],
  globalSetup: './global-setup.ts',
  globalTeardown: './global-teardown.ts',
  use: {
    screenshot: 'only-on-failure',
    video: VIDEO_RECORDING ? 'on' : 'retain-on-failure',
  },
});