import { WebDriver, By, until, WebElement } from 'selenium-webdriver';

export class BasePage {
  constructor(protected driver: WebDriver) {}

  async navigateTo(url: string): Promise<void> {
    await this.driver.get(url);
  }

  async waitForElement(locator: By, timeout: number = 10000): Promise<WebElement> {
    return await this.driver.wait(until.elementLocated(locator), timeout);
  }
}