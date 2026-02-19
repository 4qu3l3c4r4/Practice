# TestCafe + TypeScript E2E Template

End-to-end test template using TestCafe with TypeScript. No WebDriver or browser plugins needed.

## Prerequisites

- Node.js 20+
- npm

## Setup

```bash
cp .env.example .env        # configure BASE_URL, UI_USERNAME, UI_PASSWORD
npm install
```

## Running tests

```bash
npx testcafe chrome tests/           # Chrome, headed
npx testcafe chrome:headless tests/  # Chrome, headless
npm test                              # alias for headless
```

## Environment variables

| Variable       | Description    | Default                |
|---------------|----------------|------------------------|
| `BASE_URL`    | App URL        | `http://localhost:3000` |
| `UI_USERNAME` | Login username | —                      |
| `UI_PASSWORD` | Login password | —                      |

## Project structure

```
├── tests/
│   └── smoke.ts             # Smoke tests (3 tests using Selector API)
├── tsconfig.json
├── package.json             # testcafe, dotenv
└── scripts/                 # DOM verification tools
```

## How it works

- TestCafe manages browsers directly — no WebDriver, no Selenium, no browser plugins.
- Tests use TestCafe's `Selector` API and `t` (test controller) for interactions.
- Environment variables are loaded from `.env` using dotenv.

## Adding new tests

1. Create test files in `tests/` (any `.ts` file)
2. Use `fixture` and `test` from TestCafe API
3. TestCafe auto-discovers test files passed to the CLI

## CI/CD

GitHub Actions workflow at `.github/workflows/e2e.yml`. Set `BASE_URL`, `UI_USERNAME`, `UI_PASSWORD` as repository secrets.
