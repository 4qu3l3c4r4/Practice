# ServiceNow Testing Template

E2E testing for ServiceNow applications using Playwright.

## Setup

```bash
cp .env.example .env
npm install
npx playwright install
```

## Configuration

```env
SERVICENOW_URL=https://your-instance.service-now.com
SERVICENOW_USERNAME=admin
SERVICENOW_PASSWORD=password
```

## ServiceNow selector patterns

```typescript
// Form fields
page.locator('#sys_display.incident.number')
page.locator('#incident.short_description')

// Buttons
page.locator('#sysverb_insert')  // Submit
page.locator('#sysverb_update')  // Update

// Lists
page.locator('.list_nav')
```
