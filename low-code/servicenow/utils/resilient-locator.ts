import { Page } from '@playwright/test';

export async function serviceNowResilientLocator(page: Page, table: string, field: string) {
  const strategies = [
    `#${table}.${field}`,
    `#sys_display.${table}.${field}`,
    `[name="${table}.${field}"]`,
    `[data-field="${field}"]`
  ];

  for (const selector of strategies) {
    try {
      const element = page.locator(selector);
      await element.waitFor({ state: 'visible', timeout: 5000 });
      return element;
    } catch (e) {
      continue;
    }
  }
  throw new Error(`ServiceNow field not found: ${table}.${field}`);
}
