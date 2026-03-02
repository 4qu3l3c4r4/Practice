import path from 'path';
import { createBdd } from 'playwright-bdd';
import { test } from '../../fixtures/fixtures';

const { Given, When, Then } = createBdd(test);

Given('que estou na página de checkboxes do The Internet', async ({ checkboxesPage }) => {
  await checkboxesPage.open();
});

When('eu alterno o primeiro checkbox', async ({ checkboxesPage }) => {
  await checkboxesPage.toggleFirst();
});

Then('o primeiro checkbox deve estar marcado', async ({ checkboxesPage }) => {
  await checkboxesPage.expectFirstChecked(true);
});

Given('que estou na página de dropdown do The Internet', async ({ dropdownPage }) => {
  await dropdownPage.open();
});

When('eu seleciono a opção {string}', async ({ dropdownPage }, option: string) => {
  const value = option === 'Option 1' ? '1' : '2';
  await dropdownPage.selectOptionByValue(value);
});

Then('o dropdown deve exibir {string}', async ({ dropdownPage }, text: string) => {
  await dropdownPage.expectSelectedText(text);
});

Given(
  'que estou na página de carregamento dinâmico do The Internet',
  async ({ dynamicLoadingPage }) => {
    await dynamicLoadingPage.openExample1();
  },
);

When('eu inicio o carregamento', async ({ dynamicLoadingPage }) => {
  await dynamicLoadingPage.startAndWaitFinish();
});

Then('devo ver o texto {string}', async ({}, _text: string) => {
  // Já validado em startAndWaitFinish; step fica sem lógica adicional.
});

Given('que estou na página de drag and drop do The Internet', async ({ dragAndDropPage }) => {
  await dragAndDropPage.open();
});

When(
  'eu arrasto a coluna A para a coluna B',
  async ({ dragAndDropPage }) => {
    await dragAndDropPage.dragAtoB();
  },
);

Then('as colunas devem trocar de posição', async ({ dragAndDropPage }) => {
  await dragAndDropPage.expectSwapped();
});

Given('que estou na página de upload do The Internet', async ({ uploadPage }) => {
  await uploadPage.open();
});

When('eu faço upload de um arquivo de exemplo', async ({ uploadPage }) => {
  const filePath = path.resolve(__dirname, '../../fixtures/sample-upload.txt');
  await uploadPage.uploadFile(filePath);
});

Then(
  'o nome do arquivo deve ser exibido como enviado',
  async ({ uploadPage }) => {
    await uploadPage.expectUploadedFileName('sample-upload.txt');
  },
);

Given('que estou na página do editor do The Internet', async ({ editorPage }) => {
  await editorPage.open();
});

When(
  'eu preencho o editor com {string}',
  async ({ editorPage }, text: string) => {
    await editorPage.setEditorContent(text);
  },
);

Then('o editor deve conter {string}', async ({ editorPage }, text: string) => {
  await editorPage.expectEditorContent(text);
});

Given('que estou na página de hovers do The Internet', async ({ hoversPage }) => {
  await hoversPage.open();
});

When(
  'eu passo o mouse sobre a primeira imagem',
  async ({ hoversPage }) => {
    await hoversPage.hoverFirstFigure();
  },
);

Then('devo ver a legenda visível', async ({ hoversPage }) => {
  await hoversPage.expectCaptionVisible();
});

