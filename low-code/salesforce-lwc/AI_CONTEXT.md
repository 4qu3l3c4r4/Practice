# AI Context — Salesforce LWC Testing Template

## Template purpose

E2E testing for Salesforce Lightning Web Components using Playwright.

## Tech stack

- Playwright 1.40+
- TypeScript 5.x

## Salesforce selector patterns

```typescript
// Lightning components
'lightning-input[data-name="fieldName"]'
'lightning-button[title="Save"]'
'lightning-combobox[data-name="Status"]'

// Custom LWC (c- namespace)
'c-my-component'
'c-custom-datatable'

// Shadow DOM
page.locator('c-my-component').locator('input')

// Aura components
'[data-aura-class="className"]'
```

## Code patterns

```typescript
// Login
await page.goto(process.env.SALESFORCE_URL);
await page.fill('#username', username);
await page.fill('#password', password);
await page.click('#Login');

// Navigate to object
await page.click('[title="Accounts"]');

// Create record
await page.click('button[title="New"]');
await page.fill('lightning-input[data-name="Name"] input', 'Test');
await page.click('button[title="Save"]');

// Wait for toast
await expect(page.locator('.toastMessage')).toBeVisible();
```

## Rules

- Always wait for networkidle after login
- Use data-name attributes for Lightning components
- Handle shadow DOM with locator chaining
- Wait for toast messages to confirm actions
