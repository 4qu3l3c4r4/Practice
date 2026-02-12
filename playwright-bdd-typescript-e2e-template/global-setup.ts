import { chromium, FullConfig } from '@playwright/test';
import { config } from 'dotenv';

config({ path: './.env' });

const STORAGE_STATE_PATH = 'tests/storage-state.json';

async function globalSetup(config: FullConfig) {
  const baseURL = process.env.BASE_URL || 'http://localhost:3000';
  const username = process.env.UI_USERNAME || '';
  const password = process.env.UI_PASSWORD || '';
  const loginPath = process.env.LOGIN_PATH || '/login';

  if (!username || !password) {
    console.log('[global-setup] No credentials - skipping auth setup');
    const fs = await import('fs');
    fs.writeFileSync(STORAGE_STATE_PATH, JSON.stringify({ cookies: [], origins: [] }));
    return;
  }

  console.log(`[global-setup] Logging in to ${baseURL}...`);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await context.newPage();

  try {
    await page.goto(`${baseURL}${loginPath}`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.fill('input[type="email"], input[name="username"], #username', username);
    await page.fill('input[type="password"], #password', password);
    await page.click('button[type="submit"], input[type="submit"]');
    await page.waitForURL((url) => !url.pathname.includes('login'), { timeout: 30000 });
    console.log('[global-setup] Login successful - saving storage state');
    await context.storageState({ path: STORAGE_STATE_PATH });
  } catch (error) {
    console.error('[global-setup] Login failed:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

export default globalSetup;