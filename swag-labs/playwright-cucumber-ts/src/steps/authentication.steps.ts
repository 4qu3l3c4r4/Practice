import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { PlaywrightWorld } from '../support/world';
import { LoginPage } from '../pages/loginPage';

let loginPage: LoginPage;

Before(async function (this: PlaywrightWorld) {
  await this.init();
  loginPage = new LoginPage(this.page);
});

After(async function (this: PlaywrightWorld) {
  await this.dispose();
});

Given('que estou na página de login do Swag Labs', async function (this: PlaywrightWorld) {
  await loginPage.open();
});

When('eu faço login com credenciais válidas', async function (this: PlaywrightWorld) {
  await loginPage.login(process.env.UI_USERNAME || 'standard_user', process.env.UI_PASSWORD || 'secret_sauce');
});

Then('devo ser redirecionado para a página de inventário', async function (this: PlaywrightWorld) {
  await expect(this.page).toHaveURL(/inventory\.html$/);
  await expect(this.page.locator('#inventory_container')).toBeVisible();
});

When('eu tento fazer login com senha inválida', async function (this: PlaywrightWorld) {
  await loginPage.login(process.env.UI_USERNAME || 'standard_user', 'senha_incorreta!');
});

Then('devo ver uma mensagem de erro de credenciais inválidas', async function () {
  const error = await loginPage.getErrorMessage();
  expect(error).toContain('Epic sadface: Username and password do not match any user in this service');
});

When('eu tento fazer login sem preencher usuário e senha', async function (this: PlaywrightWorld) {
  await loginPage.open();
  await this.page.click('#login-button');
});

Then('devo ver uma mensagem informando que o usuário é obrigatório', async function () {
  const error = await loginPage.getErrorMessage();
  expect(error).toContain('Epic sadface: Username is required');
});

