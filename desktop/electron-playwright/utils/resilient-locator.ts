import { Page } from '@playwright/test';

export async function resilientLocator(page: Page, selectors: string[]) {
  for (const selector of selectors) {
    try {
      const element = page.locator(selector);
      await element.waitFor({ state: 'visible', timeout: 5000 });
      return element;
    } catch (e) {
      continue;
    }
  }
  throw new Error(`Element not found with any selector: ${selectors.join(', ')}`);
}

// Usage:
// const button = await resilientLocator(page, [
//   '[data-test-id="submit"]',
//   'button:has-text("Submit")',
//   '#submit-btn'
// ]);
