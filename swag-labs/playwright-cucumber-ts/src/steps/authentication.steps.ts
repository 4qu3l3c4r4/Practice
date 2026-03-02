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

Given('I am on the Swag Labs login page', async function (this: PlaywrightWorld) {
  await loginPage.open();
});

When('I log in with valid credentials', async function (this: PlaywrightWorld) {
  await loginPage.login(process.env.UI_USERNAME || 'standard_user', process.env.UI_PASSWORD || 'secret_sauce');
});

Then('I should be redirected to the inventory page', async function (this: PlaywrightWorld) {
  await expect(this.page).toHaveURL(/inventory\.html$/);
  await expect(this.page.locator('#inventory_container')).toBeVisible();
});

When('I try to log in with an invalid password', async function (this: PlaywrightWorld) {
  await loginPage.login(process.env.UI_USERNAME || 'standard_user', 'invalid_password!');
});

Then('I should see an error message saying the credentials are invalid', async function () {
  const error = await loginPage.getErrorMessage();
  expect(error).toContain('Epic sadface: Username and password do not match any user in this service');
});

When('I try to log in without filling username and password', async function (this: PlaywrightWorld) {
  await loginPage.open();
  await this.page.click('#login-button');
});

Then('I should see an error message saying the username is required', async function () {
  const error = await loginPage.getErrorMessage();
  expect(error).toContain('Epic sadface: Username is required');
});

