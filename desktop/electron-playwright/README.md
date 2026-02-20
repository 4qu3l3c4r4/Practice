# Electron Playwright Testing Template

E2E testing for Electron desktop apps using Playwright.

## Setup

```bash
cp .env.example .env
npm install
npx playwright install
```

## Run tests

```bash
npm test
npm run test:headed
```

## Writing tests

```typescript
import { _electron as electron } from '@playwright/test';

const app = await electron.launch({ args: ['./main.js'] });
const window = await app.firstWindow();

await window.click('#button');
await expect(window.locator('#result')).toBeVisible();

await app.close();
```
