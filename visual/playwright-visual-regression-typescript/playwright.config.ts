import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './tests',
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.01,
    },
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium', viewport: { width: 1280, height: 720 } } },
    { name: 'mobile', use: { browserName: 'chromium', viewport: { width: 375, height: 812 } } },
  ],
});
