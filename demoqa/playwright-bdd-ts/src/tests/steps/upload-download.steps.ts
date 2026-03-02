import path from 'path';
import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from '../../fixtures/fixtures';

const { Given, When, Then } = createBdd(test);

Given('I am on the DemoQA upload and download page', async ({ uploadDownloadPage }) => {
  await uploadDownloadPage.open();
});

When('I upload a sample file', async ({ uploadDownloadPage }) => {
  const filePath = path.resolve(__dirname, '../../fixtures/sample-upload.txt');
  await uploadDownloadPage.uploadFile(filePath);
});

Then('I should see the uploaded file path', async ({ uploadDownloadPage }) => {
  await uploadDownloadPage.expectUploadedPathContains('sample-upload.txt');
});

When('I download the file', async ({ uploadDownloadPage, page }) => {
  // Store the download on the page object so the next step can validate it.
  // @ts-expect-error - stored dynamically on the page object.
  page.__lastDownload = await uploadDownloadPage.downloadFile();
});

Then('the download should have a suggested filename', async ({ page }) => {
  // @ts-expect-error - see comment above.
  const download = page.__lastDownload;
  const filename = download.suggestedFilename();
  expect(filename).toBeTruthy();
});

