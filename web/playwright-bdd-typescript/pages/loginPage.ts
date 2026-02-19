import { Page } from '@playwright/test';
import { BasePage } from './basePage';
import { selectors } from '../elements/common';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToLoginPage() {
    const loginPath = process.env.LOGIN_PATH || '/login';
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    await this.navigate(`${baseUrl}${loginPath}`);
  }

  async login(username: string, password: string) {
    await this.page.fill(selectors.login.usernameInput, username);
    await this.page.fill(selectors.login.passwordInput, password);
    await this.page.click(selectors.login.submitButton);
  }
}