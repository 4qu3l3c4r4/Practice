import { test } from './fixtures';
import { logger } from './logger';

test.beforeEach(async ({ page }, testInfo) => {
  logger.info(`Starting test: ${testInfo.title}`);

  page.on('console', (msg) => {
    if (msg.type() === 'error') logger.error(`Browser console: ${msg.text()}`);
  });
  page.on('pageerror', (error) => {
    logger.error(`Page error: ${error.message}`);
  });
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    const name = `failed-${testInfo.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-${Date.now()}`;
    try {
      await page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
      await testInfo.attach('screenshot', { path: `screenshots/${name}.png`, contentType: 'image/png' });
      logger.error(`Test failed: ${testInfo.title}`);
    } catch (e) {
      logger.error(`Failed to take screenshot: ${e}`);
    }
  } else {
    logger.info(`Test passed: ${testInfo.title}`);
  }
  logger.info(`Duration: ${testInfo.duration}ms`);
});

export { test };
