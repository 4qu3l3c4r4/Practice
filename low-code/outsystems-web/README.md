# OutSystems Web Testing Template

E2E testing for OutSystems web applications using Playwright with TypeScript.

## Prerequisites

- Node.js 18+
- OutSystems application URL

## Setup

```bash
cp .env.example .env
npm install
npx playwright install
```

## Configuration

Edit `.env`:

```env
BASE_URL=https://your-app.outsystemscloud.com
USERNAME=test@example.com
PASSWORD=password123
HEADLESS=true
```

## Run tests

```bash
npm test                    # all tests
npm run test:headed         # with browser visible
npm run test:debug          # debug mode
npm run test:smoke          # smoke tests only
```

## Discovery

Extract OutSystems-generated selectors:

```bash
./discover.sh https://your-app.outsystemscloud.com
```

Outputs `discovery-output/outsystems-elements.json` with all testable elements.

## OutSystems selector patterns

OutSystems generates predictable IDs:

| Pattern | Example | Usage |
|---------|---------|-------|
| Widget ID | `[id*="wt123_wtContent"]` | Main content areas |
| Input fields | `[id$="_Input"]` | Form inputs |
| Buttons | `[id$="_Button"]` | Action buttons |
| Links | `[id$="_Link"]` | Navigation links |
| Blocks | `[id*="wt"][id*="block"]` | Reusable blocks |

## Writing tests

```typescript
test('login to OutSystems app', async ({ page }) => {
  await page.goto(process.env.BASE_URL!);
  
  // OutSystems login form
  await page.fill('[id$="_Input_Username"]', process.env.USERNAME!);
  await page.fill('[id$="_Input_Password"]', process.env.PASSWORD!);
  await page.click('[id$="_Button_Login"]');
  
  await expect(page.locator('[id*="wt"][id*="Dashboard"]')).toBeVisible();
});
```

## Project structure

```
tests/
  login.spec.ts           # Login tests
  dashboard.spec.ts       # Dashboard tests
pages/
  BasePage.ts             # Base page object
  LoginPage.ts            # Login page object
utils/
  outsystems-helpers.ts   # OutSystems-specific utilities
```

## CI/CD

See `.github/workflows/outsystems-e2e.yml` for GitHub Actions example.

## Tips

- Use `[id$="suffix"]` for dynamic OutSystems IDs
- OutSystems uses AJAX — always wait for network idle
- Screen names appear in IDs: `wt123_wtScreenName_wtWidget`
- Use browser DevTools to inspect generated IDs
