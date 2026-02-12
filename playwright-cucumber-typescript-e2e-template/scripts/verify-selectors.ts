import { chromium } from '@playwright/test';
import dotenv from 'dotenv';
import { getLoginUrl } from '../utils/urls';

dotenv.config();

async function verifySelectors() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    console.log('Navigating to login page...');
    await page.goto(getLoginUrl());

    const selectors = [
      { name: 'Username input', selector: '[data-testid="username"]' },
      { name: 'Password input', selector: '[data-testid="password"]' },
      { name: 'Submit button', selector: '[data-testid="submit"]' },
    ];

    console.log('\nVerifying selectors:');
    for (const { name, selector } of selectors) {
      try {
        const element = await page.locator(selector).first();
        const isVisible = await element.isVisible();
        console.log(`✓ ${name}: ${isVisible ? 'Found' : 'Not visible'}`);
      } catch (error) {
        console.log(`✗ ${name}: Not found`);
      }
    }

    console.log('\nPress any key to close browser...');
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', () => process.exit(0));
  } catch (error) {
    console.error('Error:', error);
    await browser.close();
  }
}

verifySelectors();