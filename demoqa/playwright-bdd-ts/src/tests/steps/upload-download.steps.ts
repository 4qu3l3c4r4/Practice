import path from 'path';
import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from '../../fixtures/fixtures';

const { Given, When, Then } = createBdd(test);

Given('que estou na página de upload e download do DemoQA', async ({ uploadDownloadPage }) => {
  await uploadDownloadPage.open();
});

When('eu faço upload de um arquivo de exemplo', async ({ uploadDownloadPage }) => {
  const filePath = path.resolve(__dirname, '../../fixtures/sample-upload.txt');
  await uploadDownloadPage.uploadFile(filePath);
});

Then('devo ver o caminho do arquivo enviado', async ({ uploadDownloadPage }) => {
  await uploadDownloadPage.expectUploadedPathContains('sample-upload.txt');
});

When('eu faço download do arquivo', async ({ uploadDownloadPage, page }) => {
  // Guardamos o download no contexto do step para validação no próximo Then.
  // @ts-expect-error - armazenamos em runtime no objeto page para simplificar o World.
  page.__lastDownload = await uploadDownloadPage.downloadFile();
});

Then('o download deve ter um nome de arquivo sugerido', async ({ page }) => {
  // @ts-expect-error - ver comentário acima.
  const download = page.__lastDownload;
  const filename = download.suggestedFilename();
  expect(filename).toBeTruthy();
});

