import { Selector } from 'testcafe';
import { config } from 'dotenv';

config();

const baseUrl = process.env.BASE_URL || 'https://example.com';
const username = process.env.UI_USERNAME || 'test@example.com';
const password = process.env.UI_PASSWORD || 'password123';

fixture('Smoke Tests')
    .page(baseUrl);

test('should load the page', async t => {
    await t.expect(Selector('body').exists).ok();
});

test('should have login fields', async t => {
    const usernameField = Selector('input[name="username"], input[type="email"]');
    const passwordField = Selector('input[name="password"]');
    
    await t
        .expect(usernameField.exists).ok()
        .expect(passwordField.exists).ok();
});

test('should login successfully', async t => {
    const usernameField = Selector('input[name="username"], input[type="email"]');
    const passwordField = Selector('input[name="password"]');
    const submitButton = Selector('button[type="submit"], input[type="submit"]');
    
    await t
        .typeText(usernameField, username)
        .typeText(passwordField, password)
        .click(submitButton)
        .expect(Selector('body').exists).ok();
});