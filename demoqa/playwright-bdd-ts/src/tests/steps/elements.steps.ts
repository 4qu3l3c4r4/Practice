import { createBdd } from 'playwright-bdd';
import { test } from '../../fixtures/fixtures';

const { Given, When, Then, And } = createBdd(test);

Given('I am on the DemoQA checkboxes page', async ({ checkBoxPage }) => {
  await checkBoxPage.open();
});

When('I select the Home checkbox', async ({ checkBoxPage }) => {
  await checkBoxPage.selectHome();
});

Then('I should see the result containing {string}', async ({ checkBoxPage }, text: string) => {
  await checkBoxPage.expectResultContains(text);
});

Given('I am on the DemoQA radio buttons page', async ({ radioButtonPage }) => {
  await radioButtonPage.open();
});

When('I select the Yes option', async ({ radioButtonPage }) => {
  await radioButtonPage.chooseYes();
});

And('I select the Impressive option', async ({ radioButtonPage }) => {
  await radioButtonPage.chooseImpressive();
});

Then('I should see the text {string} as the result', async ({ radioButtonPage }, value: string) => {
  await radioButtonPage.expectOutputIs(value);
});

Given('I am on the DemoQA select menu page', async ({ selectMenuPage }) => {
  await selectMenuPage.open();
});

When('I select {string} in the old-style dropdown', async ({ selectMenuPage }, label: string) => {
  await selectMenuPage.selectOldStyleOptionByLabel(label);
});

Then('the old-style dropdown should have {string} selected', async ({ selectMenuPage }, label: string) => {
  await selectMenuPage.expectOldStyleValue(label);
});

