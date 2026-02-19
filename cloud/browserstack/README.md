# BrowserStack Cloud Template

Configuration template for running your existing Playwright, Selenium, or Appium tests on BrowserStack's cloud device farm.

## Prerequisites

- BrowserStack account ([browserstack.com](https://www.browserstack.com))
- Existing test suite (Playwright, Selenium, Appium, Cypress, or WebdriverIO)

## Setup

```bash
cp .env.example .env
# Set BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY
```

## Quick start

### Playwright

```bash
npx playwright test --config=configs/playwright.browserstack.config.ts
```

### Selenium

Copy capabilities from `configs/selenium.capabilities.js` into your existing Selenium config, replacing the local WebDriver URL with `https://hub-cloud.browserstack.com/wd/hub`.

### Appium (mobile)

1. Upload your app:
   ```bash
   ./scripts/browserstack.sh upload path/to/app.apk
   ```
2. Copy capabilities from `configs/appium.capabilities.yml` into your Appium config.

## Helper scripts

```bash
./scripts/browserstack.sh browsers    # list available browsers
./scripts/browserstack.sh devices     # list available devices
./scripts/browserstack.sh upload <file>  # upload mobile app
./scripts/browserstack.sh status      # account plan info
```

## Environment variables

| Variable | Description |
|----------|-------------|
| `BROWSERSTACK_USERNAME` | BrowserStack username |
| `BROWSERSTACK_ACCESS_KEY` | BrowserStack access key |
| `BROWSERSTACK_PROJECT` | Project name (dashboard grouping) |
| `BROWSERSTACK_BUILD` | Build name (dashboard grouping) |

## Project structure

```
├── configs/
│   ├── playwright.browserstack.config.ts   # Playwright CDP config
│   ├── selenium.capabilities.js            # Selenium caps (desktop + mobile)
│   └── appium.capabilities.yml             # Appium caps (Android + iOS)
├── scripts/
│   └── browserstack.sh                     # CLI helper
├── discover.sh                             # Fetch available browsers/devices
├── AI_CONTEXT.md
├── .env.example
└── README.md
```

## Dashboard

After running tests, view results at:
- Web: `https://automate.browserstack.com`
- Mobile: `https://app-automate.browserstack.com`
