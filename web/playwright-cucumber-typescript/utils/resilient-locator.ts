import { Locator, Page } from '@playwright/test';

/**
 * Self-healing locator that tries multiple selector strategies.
 * Falls through: data-test-id → role → text → CSS
 */
export class ResilientLocator {
  constructor(private page: Page) {}

  async find(
    selectors: { testId?: string; role?: { role: string; name?: string }; text?: string; css?: string },
    options?: { timeout?: number }
  ): Promise<Locator> {
    const timeout = options?.timeout ?? 5000;

    if (selectors.testId) {
      const loc = this.page.locator(`[data-test-id="${selectors.testId}"]`);
      if (await loc.first().isVisible({ timeout }).catch(() => false)) return loc.first();
    }
    if (selectors.role) {
      const loc = this.page.getByRole(selectors.role.role as any, { name: selectors.role.name });
      if (await loc.first().isVisible({ timeout }).catch(() => false)) return loc.first();
    }
    if (selectors.text) {
      const loc = this.page.getByText(selectors.text);
      if (await loc.first().isVisible({ timeout }).catch(() => false)) return loc.first();
    }
    if (selectors.css) {
      const loc = this.page.locator(selectors.css);
      if (await loc.first().isVisible({ timeout }).catch(() => false)) return loc.first();
    }

    // Final fallback — return first non-null for Playwright's auto-wait to handle
    return this.page.locator(
      selectors.testId ? `[data-test-id="${selectors.testId}"]` :
      selectors.css ?? 'body'
    );
  }
}
