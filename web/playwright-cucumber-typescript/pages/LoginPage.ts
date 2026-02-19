import { Page } from '@playwright/test';
import { getLoginUrl } from '../utils/urls';

export class LoginPage {
  constructor(private page: Page) {}

  async navigateToLogin() {
    await this.page.goto(getLoginUrl());
  }

  async login(username: string, password: string) {
    await this.page.fill('[data-testid="username"]', username);
    await this.page.fill('[data-testid="password"]', password);
    await this.page.click('[data-testid="submit"]');
  }

  async isLoggedIn() {
    return this.page.url().includes('dashboard');
  }
}