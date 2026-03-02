import { createBdd } from 'playwright-bdd';
import { test } from '../../fixtures/fixtures';

const { Given, When, Then, And } = createBdd(test);

Given('que estou na página de checkboxes do DemoQA', async ({ checkBoxPage }) => {
  await checkBoxPage.open();
});

When('eu seleciono o checkbox Home', async ({ checkBoxPage }) => {
  await checkBoxPage.selectHome();
});

Then('devo ver o resultado contendo {string}', async ({ checkBoxPage }, text: string) => {
  await checkBoxPage.expectResultContains(text);
});

Given('que estou na página de radio buttons do DemoQA', async ({ radioButtonPage }) => {
  await radioButtonPage.open();
});

When('eu seleciono a opção Yes', async ({ radioButtonPage }) => {
  await radioButtonPage.chooseYes();
});

And('eu seleciono a opção Impressive', async ({ radioButtonPage }) => {
  await radioButtonPage.chooseImpressive();
});

Then('devo ver o texto {string} como resultado', async ({ radioButtonPage }, value: string) => {
  await radioButtonPage.expectOutputIs(value);
});

Given('que estou na página de select menu do DemoQA', async ({ selectMenuPage }) => {
  await selectMenuPage.open();
});

When('eu seleciono {string} no dropdown antigo', async ({ selectMenuPage }, label: string) => {
  await selectMenuPage.selectOldStyleOptionByLabel(label);
});

Then('o dropdown antigo deve estar com {string} selecionado', async ({ selectMenuPage }, label: string) => {
  await selectMenuPage.expectOldStyleValue(label);
});

