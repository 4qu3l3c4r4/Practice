import { Page } from '@playwright/test';

export async function sapResilientLocator(page: Page, controlId: string) {
  const strategies = [
    `[id$="--${controlId}"]`,
    `[id*="${controlId}"]`,
    `[data-sap-ui*="${controlId}"]`,
    `.sapM${controlId}`
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
  throw new Error(`SAP control not found: ${controlId}`);
}
