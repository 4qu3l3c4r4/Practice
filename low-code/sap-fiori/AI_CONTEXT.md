# AI Context — SAP Fiori Testing Template

## Template purpose

E2E testing for SAP Fiori applications using Playwright.

## Tech stack

- Playwright 1.40+
- TypeScript 5.x

## SAP UI5 selector patterns

```typescript
// By ID suffix (IDs are dynamic)
'[id$="--idInput"]'
'[id$="--idButton"]'

// By CSS class (UI5 controls)
'.sapMInput'
'.sapMBtn'
'.sapMList'
'.sapMTable'

// By control type
'[data-sap-ui*="Input"]'
```

## Code patterns

```typescript
// Login
await page.fill('#sap-user', username);
await page.fill('#sap-password', password);
await page.click('#LOGON_BUTTON');

// Navigate
await page.click('.sapMTile[title="App Name"]');

// Fill input
await page.fill('[id$="--idInput"] input', 'value');

// Click button
await page.click('[id$="--idSaveButton"]');
```

## Rules

- SAP generates dynamic IDs - use suffix matching
- Use CSS classes for control types
- Wait for networkidle after navigation
- Handle SAP-specific popups and dialogs
