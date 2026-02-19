# WebdriverIO + TypeScript E2E Template

End-to-end test template using WebdriverIO with TypeScript and Mocha.

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
npx wdio run wdio.conf.ts   # all tests
npm test                     # alias
```

## Environment variables

| Variable       | Description    | Default                |
|---------------|----------------|------------------------|
| `BASE_URL`    | App URL        | `http://localhost:3000` |
| `UI_USERNAME` | Login username | —                      |
| `UI_PASSWORD` | Login password | —                      |

## Project structure

```
├── specs/
│   └── smoke.spec.ts        # Smoke tests (3 tests)
├── wdio.conf.ts             # WebdriverIO configuration
├── tsconfig.json
├── package.json             # @wdio/cli, chromedriver
└── scripts/                 # DOM verification tools
```

## How it works

- `wdio.conf.ts` configures Chrome (headless), base URL from env, and Mocha as the test framework.
- Tests use WebdriverIO's `$` and `$$` selectors with `browser.url()` for navigation.
- WebdriverIO auto-manages ChromeDriver.

## Adding new tests

1. Create spec files in `specs/` (suffix with `.spec.ts`)
2. WebdriverIO auto-discovers files matching the `specs` pattern in `wdio.conf.ts`

## CI/CD

GitHub Actions workflow at `.github/workflows/e2e.yml`. Set `BASE_URL`, `UI_USERNAME`, `UI_PASSWORD` as repository secrets.
