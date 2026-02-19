# Playwright Cucumber + TypeScript E2E Template

End-to-end test template using Playwright as the browser driver with `@cucumber/cucumber` for native Gherkin BDD support.

## Prerequisites

- Node.js 20+
- npm

## Setup

```bash
cp .env.example .env        # configure BASE_URL, UI_USERNAME, UI_PASSWORD
npm install
npx playwright install       # download browsers (first time)
```

## Running tests

```bash
npm test                     # all tests, headless
npm run test:headed          # all tests, visible browser
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
| `REQUIRE_MFA`   | Wait for MFA approval                | `false`                |
| `MFA_TIMEOUT_MS`| MFA timeout in milliseconds          | `180000`               |

## How it works

1. `global-setup.ts` logs in and saves browser state to `tests/storage-state.json`.
2. Cucumber runs `.feature` files from `tests/features/` with step definitions in `tests/steps/`.
3. Cucumber configuration is in `cucumber.json`.
4. Playwright configuration (browser, timeouts) is in `playwright.config.ts`.

## Project structure

```
├── tests/
│   ├── features/          # Gherkin .feature files
│   └── steps/             # Cucumber step definitions
├── pages/                 # Page objects (LoginPage.ts)
├── utils/                 # URL utilities
├── scripts/               # Selector verification, reporting
├── global-setup.ts        # Pre-test authentication
├── cucumber.json          # Cucumber configuration
├── playwright.config.ts   # Browser configuration
└── package.json
```

## Adding new tests

1. Create a `.feature` file in `tests/features/`
2. Create step definitions in `tests/steps/` using `@cucumber/cucumber` Given/When/Then
3. Add page objects under `pages/` as needed

## Reports

- HTML report: `reports/html/`
- JSON results: `reports/results.json`

## CI/CD

GitHub Actions workflow at `.github/workflows/e2e.yml`. Set `BASE_URL`, `UI_USERNAME`, `UI_PASSWORD` as repository secrets.

## Scripts

| Script | Usage |
|--------|-------|
| `scripts/verify-dom-structure.js` | Paste into browser DevTools to check selectors |
| `scripts/verify-selectors.ts` | `npx ts-node scripts/verify-selectors.ts` |
