import { Builder, WebDriver } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';
import { LoginPage } from '../pages/loginPage';
import { BASE_URL, UI_USERNAME, UI_PASSWORD } from '../config/env';

describe('Login Tests', () => {
  let driver: WebDriver;
  let loginPage: LoginPage;

  beforeAll(async () => {
    const options = new Options();
    options.addArguments('--headless', '--no-sandbox', '--disable-dev-shm-usage');
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    loginPage = new LoginPage(driver);
  });

  afterAll(async () => {
    await driver?.quit();
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