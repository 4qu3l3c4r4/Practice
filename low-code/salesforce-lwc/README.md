# Salesforce LWC Testing Template

E2E testing for Salesforce Lightning Web Components using Playwright.

## Setup

```bash
cp .env.example .env
npm install
npx playwright install
```

## Configuration

```env
SALESFORCE_URL=https://your-org.lightning.force.com
SALESFORCE_USERNAME=user@example.com
SALESFORCE_PASSWORD=password
SALESFORCE_TOKEN=security-token
```

## Run tests

```bash
npm test
```

## Salesforce selector patterns

```typescript
// Lightning components
page.locator('lightning-input[data-name="firstName"]')
page.locator('lightning-button[title="Save"]')

// Custom LWC
page.locator('c-my-component')

// Standard objects
page.locator('[data-aura-class="forceListViewManagerHeader"]')
```
