import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from '../../fixtures/fixtures';

const { Given, When, Then } = createBdd(test);

Given('I am on the DemoQA frames page', async ({ framesPage }) => {
  await framesPage.open();
});

Then('I should see the text {string} inside the frame', async ({ framesPage }, text: string) => {
  await framesPage.expectFrameHeading(text);
});

Given('I am on the DemoQA modal dialogs page', async ({ modalDialogsPage }) => {
  await modalDialogsPage.open();
});

When('I open the small modal', async ({ modalDialogsPage }) => {
  await modalDialogsPage.openSmallModal();
});

Then('I should see the small modal visible', async ({ modalDialogsPage }) => {
  await modalDialogsPage.expectSmallModalVisible();
});

When('I close the small modal', async ({ modalDialogsPage }) => {
  await modalDialogsPage.closeSmallModal();
});

Then('the small modal should not be visible', async ({ page }) => {
  await expect(page.locator('#example-modal-sizes-title-sm')).toBeHidden();
});

Given('I am on the DemoQA tool tips page', async ({ toolTipsPage }) => {
  await toolTipsPage.open();
});

When('I hover over the tooltip button', async ({ toolTipsPage }) => {
  await toolTipsPage.hoverButton();
});

Then('I should see the tooltip visible', async ({ toolTipsPage }) => {
  await toolTipsPage.expectTooltipVisible();
});

Given('I am on the DemoQA date picker page', async ({ datePickerPage }) => {
  await datePickerPage.open();
});

When('I fill the date with {string}', async ({ datePickerPage }, value: string) => {
  await datePickerPage.setDate(value);
});

Then('the date field should contain {string}', async ({ datePickerPage }, value: string) => {
  await datePickerPage.expectDateValue(value);
});

Given('I am on the DemoQA slider page', async ({ sliderPage }) => {
  await sliderPage.open();
});

When('I set the slider to {int}', async ({ sliderPage }, value: number) => {
  await sliderPage.setSliderValueWithArrows(value);
});

Then('the slider value should be {int}', async ({ sliderPage }, value: number) => {
  await sliderPage.expectSliderValue(value);
});

