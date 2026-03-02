import type { Page } from '@playwright/test';

// Page Object da tela de login do Swag Labs.
export class LoginPage {
  constructor(private readonly page: Page) {}

  private usernameSelector = '#user-name';
  private passwordSelector = '#password';
  private submitSelector = '#login-button';
  private errorSelector = '[data-test="error"]';

  async open() {
    await this.page.goto(process.env.BASE_URL || 'https://www.saucedemo.com');
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameSelector, username);
    await this.page.fill(this.passwordSelector, password);
    await this.page.click(this.submitSelector);
  }

  async getErrorMessage() {
    return this.page.locator(this.errorSelector).innerText();
  }
}

