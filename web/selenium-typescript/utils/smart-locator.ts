import { By, WebDriver, WebElement, until } from 'selenium-webdriver';

interface LocatorStrategy {
  by: By;
  label: string;
}

/**
 * Self-healing locator — tries multiple By strategies with retry and stale element protection.
 */
export class SmartLocator {
  constructor(private driver: WebDriver, private timeout = 10000) {}

  async find(strategies: LocatorStrategy[]): Promise<WebElement> {
    for (const { by, label } of strategies) {
      try {
        const el = await this.driver.wait(until.elementLocated(by), this.timeout / strategies.length);
        await this.driver.wait(until.elementIsVisible(el), 2000);
        return el;
      } catch {
        console.warn(`SmartLocator: "${label}" failed, trying next...`);
      }
    }
    throw new Error(`SmartLocator: all ${strategies.length} strategies failed`);
  }

  /** Retry an action up to `attempts` times, handling stale elements */
  async retryAction<T>(action: () => Promise<T>, attempts = 3, delayMs = 500): Promise<T> {
    for (let i = 0; i < attempts; i++) {
      try {
        return await action();
      } catch (err: any) {
        if (i === attempts - 1) throw err;
        if (err.name === 'StaleElementReferenceError' || err.message?.includes('stale')) {
          console.warn(`SmartLocator: stale element, retry ${i + 1}/${attempts}`);
        }
        await new Promise(r => setTimeout(r, delayMs * (i + 1)));
      }
    }
    throw new Error('retryAction exhausted');
  }
}

/** Shorthand: build strategies for a typical web element */
export function webStrategies(opts: { testId?: string; id?: string; css?: string; xpath?: string; text?: string }): LocatorStrategy[] {
  const s: LocatorStrategy[] = [];
  if (opts.testId) s.push({ by: By.css(`[data-test-id="${opts.testId}"]`), label: `data-test-id=${opts.testId}` });
  if (opts.id) s.push({ by: By.id(opts.id), label: `id=${opts.id}` });
  if (opts.text) s.push({ by: By.linkText(opts.text), label: `text=${opts.text}` });
  if (opts.css) s.push({ by: By.css(opts.css), label: `css=${opts.css}` });
  if (opts.xpath) s.push({ by: By.xpath(opts.xpath), label: `xpath=${opts.xpath}` });
  return s;
}
