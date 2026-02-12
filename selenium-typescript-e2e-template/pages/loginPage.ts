import { By } from 'selenium-webdriver';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
  private readonly usernameInput = By.css('input[name="username"], input#username, input[type="email"]');
  private readonly passwordInput = By.css('input[name="password"], input#password');
  private readonly submitButton = By.css('button[type="submit"], input[type="submit"]');

  async login(username: string, password: string): Promise<void> {
    const usernameElement = await this.waitForElement(this.usernameInput);
    await usernameElement.sendKeys(username);
    
    const passwordElement = await this.driver.findElement(this.passwordInput);
    await passwordElement.sendKeys(password);
    
    const submitElement = await this.driver.findElement(this.submitButton);
    await submitElement.click();
  }
}