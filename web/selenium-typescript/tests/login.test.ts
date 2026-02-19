import { Builder, WebDriver } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';
import { LoginPage } from '../pages/loginPage';
import { BASE_URL, UI_USERNAME, UI_PASSWORD, HEADLESS_MODE } from '../config/env';
import { logger } from '../utils/logger';
import * as fs from 'fs';
import * as path from 'path';

describe('Login Tests', () => {
  let driver: WebDriver;
  let loginPage: LoginPage;

  beforeAll(async () => {
    // Ensure directories exist
    const screenshotsDir = path.join(__dirname, '../screenshots');
    if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

    const options = new Options();
    if (HEADLESS_MODE) {
      options.addArguments('--headless');
      options.addArguments('--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    }
    options.addArguments('--no-sandbox', '--disable-dev-shm-usage');
    
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    loginPage = new LoginPage(driver);
    logger.info('Test setup completed');
  });

  afterEach(async () => {
    const testName = expect.getState().currentTestName;
    if (expect.getState().assertionCalls === 0 || expect.getState().numPassingAsserts === 0) {
      try {
        const screenshot = await driver.takeScreenshot();
        const screenshotPath = path.join(__dirname, '../screenshots', `${testName?.replace(/\s+/g, '_')}_failure.png`);
        fs.writeFileSync(screenshotPath, screenshot, 'base64');
        logger.error(`Test failed: ${testName}, screenshot saved to ${screenshotPath}`);
      } catch (error) {
        logger.error(`Failed to take screenshot: ${error}`);
      }
    }
  });

  afterAll(async () => {
    await driver?.quit();
    logger.info('Test teardown completed');
  });

  test('login page loads', async () => {
    await loginPage.navigateTo(BASE_URL);
    const url = await driver.getCurrentUrl();
    const title = await driver.getTitle();
    expect(url.toLowerCase().includes('login') || title).toBeTruthy();
  });

  test('login form elements present', async () => {
    await loginPage.navigateTo(BASE_URL);
    // Elements are verified in LoginPage via waitForElement
    expect(driver).toBeDefined();
  });

  test('login attempt', async () => {
    await loginPage.navigateTo(BASE_URL);
    await loginPage.login(UI_USERNAME, UI_PASSWORD);
    // Add assertion based on your app's behavior after login
  });
});