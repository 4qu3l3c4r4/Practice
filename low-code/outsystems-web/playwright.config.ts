import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 2,
  use: {
    baseURL: process.env.BASE_URL,
    headless: process.env.HEADLESS === 'true',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  reporter: [['html'], ['list']],
});
