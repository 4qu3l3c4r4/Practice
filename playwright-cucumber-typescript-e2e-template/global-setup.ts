import { chromium, FullConfig } from '@playwright/test';
import dotenv from 'dotenv';
import { getLoginUrl } from './utils/urls';

dotenv.config();

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto(getLoginUrl());
    
    await page.fill('[data-testid="username"]', process.env.UI_USERNAME!);
    await page.fill('[data-testid="password"]', process.env.UI_PASSWORD!);
    await page.click('[data-testid="submit"]');

    if (process.env.REQUIRE_MFA === 'true') {
      await page.waitForURL(/dashboard/, { 
        timeout: parseInt(process.env.MFA_TIMEOUT_MS || '180000') 
      });
    } else {
      await page.waitForURL(/dashboard/);
    }

    await page.context().storageState({ path: 'tests/storage-state.json' });
  } catch (error) {
    console.error('Global setup failed:', error);
  } finally {
    await browser.close();
  }
}

export default globalSetup;