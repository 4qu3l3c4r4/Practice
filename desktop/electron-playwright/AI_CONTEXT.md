# AI Context — Electron Playwright Testing Template

## Template purpose

E2E testing for Electron desktop applications using Playwright.

## Tech stack

- Playwright 1.40+
- Electron 27+
- TypeScript 5.x

## Code patterns

```typescript
import { _electron as electron } from '@playwright/test';

const app = await electron.launch({ args: ['./main.js'] });
const window = await app.firstWindow();

// Interact with app
await window.click('#button');
await window.fill('#input', 'text');

// Assertions
await expect(window.locator('#result')).toBeVisible();

// IPC communication
const result = await app.evaluate(async ({ ipcMain }) => {
  return new Promise(resolve => {
    ipcMain.once('response', (event, data) => resolve(data));
  });
});

await app.close();
```

## Rules

- Launch app with electron.launch()
- Use firstWindow() to get main window
- Test IPC communication between main/renderer
- Close app after each test
