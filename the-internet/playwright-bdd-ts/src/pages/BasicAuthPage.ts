import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { selectors } from '../elements/common';

// Página /basic_auth com autenticação HTTP básica.
export class BasicAuthPage extends BasePage {
  async openWithValidCredentials(username: string, password: string) {
    const url = new URL(this.page.url() || process.env.BASE_URL || 'https://the-internet.herokuapp.com');
    url.username = username;
    url.password = password;
    url.pathname = '/basic_auth';
    await this.page.goto(url.toString(), { waitUntil: 'domcontentloaded' });
  }

  async expectSuccessMessage() {
    await expect(this.page.locator(selectors.basicAuth.successMessage)).toContainText(
      'Congratulations! You must have the proper credentials.',
    );
  }
}

