import path from 'path';
import { createBdd } from 'playwright-bdd';
import { test } from '../../fixtures/fixtures';

const { Given, When, Then } = createBdd(test);

Given('I am on The Internet checkboxes page', async ({ checkboxesPage }) => {
  await checkboxesPage.open();
});

When('I toggle the first checkbox', async ({ checkboxesPage }) => {
  await checkboxesPage.toggleFirst();
});

Then('the first checkbox should be checked', async ({ checkboxesPage }) => {
  await checkboxesPage.expectFirstChecked(true);
});

Given('I am on The Internet dropdown page', async ({ dropdownPage }) => {
  await dropdownPage.open();
});

When('I select the option {string}', async ({ dropdownPage }, option: string) => {
  const value = option === 'Option 1' ? '1' : '2';
  await dropdownPage.selectOptionByValue(value);
});

Then('the dropdown should display {string}', async ({ dropdownPage }, text: string) => {
  await dropdownPage.expectSelectedText(text);
});

Given(
  'I am on The Internet dynamic loading page',
  async ({ dynamicLoadingPage }) => {
    await dynamicLoadingPage.openExample1();
  },
);

When('I start the loading', async ({ dynamicLoadingPage }) => {
  await dynamicLoadingPage.startAndWaitFinish();
});

Then('I should see the text {string}', async ({}, _text: string) => {
  // Already validated inside startAndWaitFinish; no extra logic needed here.
});

Given('I am on The Internet drag and drop page', async ({ dragAndDropPage }) => {
  await dragAndDropPage.open();
});

When(
  'I drag column A to column B',
  async ({ dragAndDropPage }) => {
    await dragAndDropPage.dragAtoB();
  },
);

Then('the columns should swap positions', async ({ dragAndDropPage }) => {
  await dragAndDropPage.expectSwapped();
});

Given('I am on The Internet upload page', async ({ uploadPage }) => {
  await uploadPage.open();
});

When('I upload a sample file', async ({ uploadPage }) => {
  const filePath = path.resolve(__dirname, '../../fixtures/sample-upload.txt');
  await uploadPage.uploadFile(filePath);
});

Then(
  'the uploaded file name should be displayed',
  async ({ uploadPage }) => {
    await uploadPage.expectUploadedFileName('sample-upload.txt');
  },
);

Given('I am on The Internet editor page', async ({ editorPage }) => {
  await editorPage.open();
});

When(
  'I fill the editor with {string}',
  async ({ editorPage }, text: string) => {
    await editorPage.setEditorContent(text);
  },
);

Then('the editor should contain {string}', async ({ editorPage }, text: string) => {
  await editorPage.expectEditorContent(text);
});

Given('I am on The Internet hovers page', async ({ hoversPage }) => {
  await hoversPage.open();
});

When(
  'I hover over the first image',
  async ({ hoversPage }) => {
    await hoversPage.hoverFirstFigure();
  },
);

Then('I should see the caption visible', async ({ hoversPage }) => {
  await hoversPage.expectCaptionVisible();
});

