/**
 * Self-healing element finder for WebdriverIO.
 * Tries: data-test-id → role → text → CSS fallback.
 */
export async function resilientFind(
  selectors: { testId?: string; role?: string; text?: string; css?: string },
  timeout = 10000
): Promise<WebdriverIO.Element> {
  if (selectors.testId) {
    const el = await $(`[data-test-id="${selectors.testId}"]`);
    if (await el.waitForDisplayed({ timeout: timeout / 4 }).catch(() => false)) return el;
  }
  if (selectors.role) {
    const el = await $(`[role="${selectors.role}"]`);
    if (await el.waitForDisplayed({ timeout: timeout / 4 }).catch(() => false)) return el;
  }
  if (selectors.text) {
    const el = await $(`=${selectors.text}`);
    if (await el.waitForDisplayed({ timeout: timeout / 4 }).catch(() => false)) return el;
  }
  if (selectors.css) {
    const el = await $(selectors.css);
    if (await el.waitForDisplayed({ timeout: timeout / 4 }).catch(() => false)) return el;
  }
  throw new Error('resilientFind: all strategies failed');
}
