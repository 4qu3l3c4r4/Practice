import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  projects: [
    {
      name: 'chromium',
      use: {
        ...{
          headless: process.env.HEADLESS_MODE !== 'false',
          baseURL: process.env.BASE_URL,
        },
      },
    },
  ],
  globalSetup: './global-setup.ts',
  globalTeardown: './global-teardown.ts',
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});