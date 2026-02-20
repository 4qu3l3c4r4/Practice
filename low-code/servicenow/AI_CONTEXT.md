# AI Context — ServiceNow Testing Template

## Template purpose

E2E testing for ServiceNow applications using Playwright.

## Tech stack

- Playwright 1.40+
- TypeScript 5.x

## ServiceNow selector patterns

```typescript
// Form fields (table.field format)
'#incident.short_description'
'#incident.priority'
'#sys_display.incident.assigned_to'

// System buttons
'#sysverb_insert'   // Submit
'#sysverb_update'   // Update
'#sysverb_back'     // Back

// Lists and navigation
'.list_nav'
'[data-list-id]'
```

## Code patterns

```typescript
// Login
await page.fill('#user_name', username);
await page.fill('#user_password', password);
await page.click('#sysverb_login');

// Create record
await page.goto(`${url}/incident.do?sys_id=-1`);
await page.fill('#incident.short_description', 'Title');
await page.click('#sysverb_insert');

// Search
await page.fill('.navbar-search input', 'INC0010001');
await page.press('.navbar-search input', 'Enter');

// Switch to iframe (classic UI)
const frame = page.frameLocator('#gsft_main');
await frame.locator('#incident.short_description').fill('text');
```

## Rules

- ServiceNow uses iframes in classic UI
- Field IDs follow table.field pattern
- Wait for networkidle after navigation
- Handle both classic and Next Experience UI
