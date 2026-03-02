import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from '../../fixtures/fixtures';

const { Given, When, Then } = createBdd(test);

Given('que estou na página de frames do DemoQA', async ({ framesPage }) => {
  await framesPage.open();
});

Then('devo ver o texto {string} dentro do frame', async ({ framesPage }, text: string) => {
  await framesPage.expectFrameHeading(text);
});

Given('que estou na página de modal dialogs do DemoQA', async ({ modalDialogsPage }) => {
  await modalDialogsPage.open();
});

When('eu abro o modal pequeno', async ({ modalDialogsPage }) => {
  await modalDialogsPage.openSmallModal();
});

Then('devo ver o modal pequeno visível', async ({ modalDialogsPage }) => {
  await modalDialogsPage.expectSmallModalVisible();
});

When('eu fecho o modal pequeno', async ({ modalDialogsPage }) => {
  await modalDialogsPage.closeSmallModal();
});

Then('o modal pequeno não deve estar visível', async ({ page }) => {
  await expect(page.locator('#example-modal-sizes-title-sm')).toBeHidden();
});

Given('que estou na página de tool tips do DemoQA', async ({ toolTipsPage }) => {
  await toolTipsPage.open();
});

When('eu passo o mouse sobre o botão com tooltip', async ({ toolTipsPage }) => {
  await toolTipsPage.hoverButton();
});

Then('devo ver o tooltip visível', async ({ toolTipsPage }) => {
  await toolTipsPage.expectTooltipVisible();
});

Given('que estou na página de date picker do DemoQA', async ({ datePickerPage }) => {
  await datePickerPage.open();
});

When('eu preencho a data com {string}', async ({ datePickerPage }, value: string) => {
  await datePickerPage.setDate(value);
});

Then('o campo de data deve conter {string}', async ({ datePickerPage }, value: string) => {
  await datePickerPage.expectDateValue(value);
});

Given('que estou na página de slider do DemoQA', async ({ sliderPage }) => {
  await sliderPage.open();
});

When('eu ajusto o slider para {int}', async ({ sliderPage }, value: number) => {
  await sliderPage.setSliderValueWithArrows(value);
});

Then('o valor do slider deve ser {int}', async ({ sliderPage }, value: number) => {
  await sliderPage.expectSliderValue(value);
});

