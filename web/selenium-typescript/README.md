# Selenium + TypeScript E2E Template

End-to-end test template using Selenium WebDriver with TypeScript and Jest.

## Prerequisites

- Node.js 20+
- npm
- Chrome browser installed

## Setup

```bash
cp .env.example .env        # configure BASE_URL, UI_USERNAME, UI_PASSWORD
npm install
```

## Running tests

```bash
npm test                     # all tests, headless
npm run test:headed          # all tests, visible browser
```

## Environment variables

| Variable       | Description                 | Default                |
|---------------|-----------------------------|------------------------|
| `BASE_URL`    | App URL                     | `http://localhost:3000` |
| `UI_USERNAME` | Login username              | —                      |
| `UI_PASSWORD` | Login password              | —                      |
| `BROWSER`     | Browser to use              | `chrome`               |

## Project structure

```
├── tests/
│   └── login.test.ts        # Smoke tests (Jest)
├── pages/
│   ├── basePage.ts          # BasePage (WebDriver wrapper, createDriver())
│   └── loginPage.ts         # LoginPage with generic selectors
├── config/
│   └── env.ts               # Environment variable loading
├── jest.config.ts           # Jest configuration (ts-jest, 30s timeout)
├── tsconfig.json
├── package.json             # selenium-webdriver, jest, ts-jest, dotenv
└── scripts/                 # DOM verification tools
```

## How it works

- `BasePage.createDriver()` creates a Chrome WebDriver (headless by default).
- `config/env.ts` loads `.env` variables using dotenv.
- Tests use Jest's `describe`/`it` with `beforeAll`/`afterAll` for driver lifecycle.
- Tests run sequentially (`--runInBand`) since they share a browser instance.

## Adding new tests

1. Create test files in `tests/` (suffix with `.test.ts`)
2. Add page objects under `pages/`

## CI/CD

GitHub Actions workflow at `.github/workflows/e2e.yml`. Set `BASE_URL`, `UI_USERNAME`, `UI_PASSWORD` as repository secrets.
