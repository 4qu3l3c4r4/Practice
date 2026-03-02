import { expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { selectors } from '../elements/common';

export class UploadPage extends BasePage {
  async open() {
    await this.navigate('/upload');
  }

  async uploadFile(path: string) {
    await this.page.setInputFiles(selectors.upload.fileInput, path);
    await this.page.click(selectors.upload.submitButton);
  }

  async expectUploadedFileName(name: string) {
    await expect(this.page.locator(selectors.upload.uploadedFiles)).toHaveText(name);
  }
}

