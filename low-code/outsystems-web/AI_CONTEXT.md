# AI Context — OutSystems Web Testing Template

> This file is designed to be read by AI assistants (Kiro, Cursor, Copilot, Claude, ChatGPT, etc.) to help implement tests using this template.

## Template purpose

E2E testing for OutSystems web applications using Playwright with TypeScript.

## Tech stack

- Node.js 18+
- Playwright 1.40+
- TypeScript 5.x
- dotenv (environment config)

## Project structure

```
tests/login.spec.ts              → Test files
pages/LoginPage.ts               → Page objects
utils/outsystems-helpers.ts      → OutSystems utilities
playwright.config.ts             → Playwright config
```

## OutSystems ID patterns

OutSystems generates IDs following these patterns:

| Element | Pattern | Example |
|---------|---------|---------|
| Screen | `wt{N}_wt{ScreenName}` | `wt123_wtLoginScreen` |
| Input | `wt{N}_wt{ScreenName}_wt{WidgetName}_Input` | `wt123_wtLogin_wtUsername_Input` |
| Button | `wt{N}_wt{ScreenName}_wt{WidgetName}_Button` | `wt123_wtLogin_wtSubmit_Button` |
| Link | `wt{N}_wt{ScreenName}_wt{WidgetName}_Link` | `wt123_wtNav_wtHome_Link` |
| Block | `wt{N}_block_wt{BlockName}` | `wt123_block_wtHeader` |
| Container | `wt{N}_wt{ScreenName}_wt{ContainerName}` | `wt123_wtDashboard_wtContent` |

## Selector strategies

```typescript
// Exact ID (fragile - changes between deployments)
page.locator('#wt123_wtLogin_wtUsername_Input')

// Suffix match (recommended - stable across deployments)
page.locator('[id$="_wtUsername_Input"]')

// Contains match (for blocks/containers)
page.locator('[id*="wtDashboard"][id*="wtContent"]')

// Data attributes (if added by developers)
page.locator('[data-test-id="login-username"]')

// Role + name (accessible, but OutSystems may not set properly)
page.getByRole('button', { name: 'Login' })
```

## Code patterns

### Page Object

```typescript
export class LoginPage {
  constructor(private page: Page) {}

  async login(username: string, password: string) {
    await this.page.fill('[id$="_Input_Username"]', username);
    await this.page.fill('[id$="_Input_Password"]', password);
    await this.page.click('[id$="_Button_Login"]');
    await this.page.waitForLoadState('networkidle');
  }

  async isLoggedIn() {
    return this.page.locator('[id*="Dashboard"]').isVisible();
  }
}
```

### Test

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('user can login', async ({ page }) => {
  await page.goto(process.env.BASE_URL!);
  
  const loginPage = new LoginPage(page);
  await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);
  
  expect(await loginPage.isLoggedIn()).toBeTruthy();
});
```

## OutSystems-specific helpers

```typescript
// Wait for OutSystems AJAX calls
export async function waitForOutSystemsAjax(page: Page) {
  await page.waitForLoadState('networkidle');
  await page.waitForFunction(() => {
    return (window as any).OutSystemsApp?.isLoading === false;
  });
}

// Find widget by name (suffix match)
export function findWidget(page: Page, widgetName: string) {
  return page.locator(`[id$="_wt${widgetName}"]`);
}

// Find input by name
export function findInput(page: Page, inputName: string) {
  return page.locator(`[id$="_wt${inputName}_Input"]`);
}

// Find button by name
export function findButton(page: Page, buttonName: string) {
  return page.locator(`[id$="_wt${buttonName}_Button"]`);
}
```

## Commands

```bash
npm test
npm run test:headed
npm run test:debug
npx playwright test --grep @smoke
```

## Discovery workflow

1. Run `./discover.sh https://your-app.outsystemscloud.com`
2. Review `discovery-output/outsystems-elements.json`
3. Map OutSystems widget names to selectors
4. Create page objects for each screen
5. Write tests using page objects

## Rules

- Always use suffix selectors `[id$="..."]` for stability
- Wait for `networkidle` after navigation/actions
- OutSystems screens reload on navigation — use `waitForLoadState()`
- Group tests by OutSystems screen/module
- Use page objects for each OutSystems screen
- Never hardcode full IDs (they change per deployment)
