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
      } catch { continue; }
    }
    throw new Error(`Element '${id}' (${type}) not found with any strategy`);
  }
}