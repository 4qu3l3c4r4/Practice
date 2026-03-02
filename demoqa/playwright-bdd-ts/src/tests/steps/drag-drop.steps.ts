import { createBdd } from 'playwright-bdd';
import { test } from '../../fixtures/fixtures';

const { Given, When, Then } = createBdd(test);

Given('que estou na página de droppable do DemoQA', async ({ droppablePage }) => {
  await droppablePage.open();
});

When('eu arrasto o elemento até a área de drop', async ({ droppablePage }) => {
  await droppablePage.dragAndDrop();
});

Then('devo ver o estado "Dropped!"', async ({ droppablePage }) => {
  await droppablePage.expectDropped();
});

