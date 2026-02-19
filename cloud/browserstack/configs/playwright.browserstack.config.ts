// BrowserStack config for Playwright
// Usage: npx playwright test --config=configs/playwright.browserstack.config.ts

import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

const bsUser = process.env.BROWSERSTACK_USERNAME;
const bsKey = process.env.BROWSERSTACK_ACCESS_KEY;
const cdpUrl = `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify({
  'browser': 'chrome',
  'browser_version': 'latest',
  'os': 'Windows',
  'os_version': '11',
  'project': process.env.BROWSERSTACK_PROJECT || 'E2E Tests',
  'build': process.env.BROWSERSTACK_BUILD || 'local',
  'browserstack.username': bsUser,
  'browserstack.accessKey': bsKey,
}))}`;

export default defineConfig({
  testDir: '../tests',
  use: {
    connectOptions: { wsEndpoint: cdpUrl },
  },
  projects: [
    {
      name: 'chrome-windows',
      use: { connectOptions: { wsEndpoint: cdpUrl } },
    },
    {
      name: 'chrome-mac',
      use: {
        connectOptions: {
          wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify({
            browser: 'chrome', browser_version: 'latest', os: 'OS X', os_version: 'Sonoma',
            'browserstack.username': bsUser, 'browserstack.accessKey': bsKey,
            project: process.env.BROWSERSTACK_PROJECT, build: process.env.BROWSERSTACK_BUILD,
          }))}`,
        },
      },
    },
  ],
});
