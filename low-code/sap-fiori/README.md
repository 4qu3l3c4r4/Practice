# SAP Fiori Testing Template

E2E testing for SAP Fiori applications using Playwright.

## Setup

```bash
cp .env.example .env
npm install
npx playwright install
```

## Configuration

```env
SAP_URL=https://your-sap-system.com
SAP_USERNAME=user
SAP_PASSWORD=password
SAP_CLIENT=100
```

## SAP selector patterns

```typescript
// UI5 controls
page.locator('[id$="--idInput"]')
page.locator('[id*="button"]')

// By control type
page.locator('.sapMInput')
page.locator('.sapMBtn')
```
