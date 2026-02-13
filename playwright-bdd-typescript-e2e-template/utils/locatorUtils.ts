import { Page, Locator } from '@playwright/test';
import { ElementType, locatorMap } from './locatorStrategies';

export class DynamicLocator {
  constructor(private page: Page) {}

  find(id: string, type: ElementType = 'container'): Locator {
    const strategies = locatorMap[type](id);
    return this.page.locator(strategies.join(', ')).first();
  }

  async findVisible(id: string, type: ElementType = 'container', timeout = 10000): Promise<Locator> {
    const strategies = locatorMap[type](id);
    for (const selector of strategies) {
      try {
        const loc = this.page.locator(selector).first();
        await loc.waitFor({ state: 'visible', timeout: timeout / strategies.length });
        return loc;
      } catch {
        continue;
      }
    }
    throw new Error(`Element '${id}' (${type}) not found with any strategy`);
  }

  async findWithRetry(id: string, type: ElementType = 'container', maxRetries = 3): Promise<Locator> {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await this.findVisible(id, type);
      } catch {
        if (i === maxRetries - 1) throw new Error(`Element '${id}' (${type}) not found after ${maxRetries} retries`);
        await this.page.waitForTimeout(1000);
      }
    }
    throw new Error('Unreachable');
  }

  async findByText(text: string, elementType = '*'): Promise<Locator> {
    const selectors = [`${elementType}:has-text("${text}")`, `${elementType}[aria-label="${text}"]`];
    for (const sel of selectors) {
      try {
        const loc = this.page.locator(sel).first();
        await loc.waitFor({ state: 'visible', timeout: 5000 });
        return loc;
      } catch {
        continue;
      }
    }
    throw new Error(`Element with text '${text}' not found`);
  }

  async findByTestId(testId: string): Promise<Locator> {
    const selectors = [`[data-testid="${testId}"]`, `[data-test-id="${testId}"]`, `[data-test="${testId}"]`];
    for (const sel of selectors) {
      try {
        const loc = this.page.locator(sel).first();
        await loc.waitFor({ state: 'visible', timeout: 5000 });
        return loc;
      } catch {
        continue;
      }
    }
    throw new Error(`Element with testId '${testId}' not found`);
  }
}
