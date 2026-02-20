import { Page } from '@playwright/test';

export async function salesforceResilientLocator(page: Page, componentName: string) {
  const strategies = [
    `[data-test-id="${componentName}"]`,
    `lightning-${componentName}`,
    `c-${componentName}`,
    `[title*="${componentName}"]`,
    `:text("${componentName}")`
  ];

  for (const selector of strategies) {
    try {
      const element = page.locator(selector).first();
      await element.waitFor({ state: 'visible', timeout: 5000 });
      return element;
    } catch (e) {
      continue;
    }
  }
  throw new Error(`Salesforce component not found: ${componentName}`);
}
