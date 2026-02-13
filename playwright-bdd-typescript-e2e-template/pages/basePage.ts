import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async navigate(path: string) {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  async waitForElement(selector: string, timeout = 10000) {
    return this.page.waitForSelector(selector, { timeout });
  }

  async clickButton(selector: string) {
    const btn = this.page.locator(selector).first();
    await btn.waitFor({ state: 'visible', timeout: 10000 });
    await btn.click();
  }

  async verifyURL(expected: string) {
    await this.page.waitForURL(expected);
  }

  async findWithRetry(selector: string, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
      try {
        const el = this.page.locator(selector).first();
        await el.waitFor({ state: 'visible', timeout: 5000 });
        return el;
      } catch {
        if (i === maxRetries - 1) throw new Error(`Element '${selector}' not found after ${maxRetries} retries`);
        await this.page.waitForTimeout(1000);
      }
    }
  }
}
