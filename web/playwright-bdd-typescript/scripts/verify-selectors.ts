import { chromium } from '@playwright/test';
import { config } from 'dotenv';
import { selectors } from '../elements/common';

config({ path: './.env' });

(async () => {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(baseUrl, { waitUntil: 'networkidle' });

  console.log('Selector verification:\n');
  for (const [name, selector] of Object.entries(selectors.login)) {
    const count = await page.locator(selector).count();
    console.log(`  ${count > 0 ? 'OK' : 'MISSING'}  ${name}: ${selector} (${count})`);
  }

  await browser.close();
})();