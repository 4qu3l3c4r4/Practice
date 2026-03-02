import { expect, type Download } from '@playwright/test';
import { BasePage } from './BasePage';
import { selectors } from '../elements/common';

// Página Elements > Upload and Download.
export class UploadDownloadPage extends BasePage {
  async open() {
    await this.navigate('/upload-download');
    await this.page.locator(selectors.elements.uploadDownload.uploadInput).waitFor({ state: 'visible' });
  }

  async uploadFile(filePath: string) {
    await this.page.setInputFiles(selectors.elements.uploadDownload.uploadInput, filePath);
    await expect(this.page.locator(selectors.elements.uploadDownload.uploadedPath)).toBeVisible();
  }

  async expectUploadedPathContains(text: string) {
    await expect(this.page.locator(selectors.elements.uploadDownload.uploadedPath)).toContainText(text);
  }

  async downloadFile(): Promise<Download> {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.page.click(selectors.elements.uploadDownload.downloadButton),
    ]);
    return download;
  }
}

