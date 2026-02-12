# Playwright BDD + TypeScript E2E Template

End-to-end test template using Playwright with playwright-bdd for Gherkin-style BDD tests in TypeScript.

## Prerequisites

- Node.js 20+
- npm

## Setup

```bash
cp .env.example .env        # configure BASE_URL, UI_USERNAME, UI_PASSWORD
npm install
npx playwright install       # download browsers (first time)
npm run bddgen               # generate BDD bindings from .feature files
```

## Running tests

```bash
npm run test                 # all tests, headless
npm run test:headed          # all tests, visible browser
npm run test:smoke           # smoke tests only (@smoke tag)
npm run test:smoke:headed    # smoke tests, visible browser
npm run test:all             # explicit all-project run
```

## Environment variables

| Variable         | Description                          | Default                |
|-----------------|--------------------------------------|------------------------|
| `BASE_URL`      | App URL (no trailing slash)          | `http://localhost:3000` |
| `UI_USERNAME`   | Login username                       | —                      |
| `UI_PASSWORD`   | Login password                       | —                      |
| `HEADLESS_MODE` | Run without visible browser          | `true`                 |
| `TEST_ISOLATION`| Fresh browser context per test       | `true`                 |
| `LOGIN_PATH`    | Login page path                      | `/login`               |

## How it works

1. `global-setup.ts` runs once before all tests — logs in with your credentials and saves the browser session to `tests/storage-state.json`.
2. Each test gets a fresh browser context pre-loaded with that session, so tests start already authenticated.
3. Tests are written as Gherkin `.feature` files in `tests/features/` with step definitions in `tests/steps/`.
4. After adding or changing steps, run `npm run bddgen` to regenerate bindings.

## Project structure

```
├── tests/
│   ├── features/          # Gherkin .feature files
│   └── steps/             # Step definitions (*.steps.ts)
├── pages/                 # Page objects (basePage.ts, loginPage.ts)
├── elements/              # Shared selectors (common.ts)
├── utils/                 # Fixtures, logger, URLs, locator utilities
├── scripts/               # Selector verification, reporting tools
├── global-setup.ts        # Pre-test authentication
├── playwright.config.ts   # Playwright + BDD configuration
└── package.json
```

## Adding new tests

1. Create a `.feature` file in `tests/features/`
2. Create matching step definitions in `tests/steps/`
3. Register any new page objects in `utils/fixtures.ts`
4. Run `npm run bddgen`

## Multi-browser

Uncomment the Firefox/WebKit projects in `playwright.config.ts`, then:

```bash
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Reports

- HTML report: `reports/html/` → open with `npm run report`
- JSON results: `reports/results.json`
- Screenshots on failure: `screenshots/`

## CI/CD

GitHub Actions workflow included at `.github/workflows/e2e.yml`. Set `BASE_URL`, `UI_USERNAME`, `UI_PASSWORD` as repository secrets.

## Scripts

| Script | Usage |
|--------|-------|
| `scripts/verify-dom-structure.js` | Paste into browser DevTools to check selectors |
| `scripts/verify-selectors.ts` | `npx ts-node scripts/verify-selectors.ts` |
| `scripts/test-reporting.js` | Shows available commands |
| `scripts/generate-pdf-report.js` | Summarizes test results |
