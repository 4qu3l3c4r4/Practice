# AI Context — BrowserStack Cloud Template

> This file is designed to be read by AI assistants (Kiro, Cursor, Copilot, Claude, ChatGPT, etc.) to help implement tests using this template.

## Template purpose

Cloud execution layer for running existing Playwright, Selenium, or Appium tests on BrowserStack's device farm. This is NOT a test framework — it provides configuration files to point your existing tests at BrowserStack.

## Tech stack

- BrowserStack Automate (web) / App Automate (mobile)
- Works with: Playwright, Selenium (any language), Appium, WebdriverIO, Cypress
- Authentication: username + access key

## Architecture

```
configs/
  playwright.browserstack.config.ts    → Playwright CDP connection to BrowserStack
  selenium.capabilities.js             → Selenium capabilities (desktop + mobile)
  appium.capabilities.yml              → Appium capabilities for mobile devices
scripts/
  browserstack.sh                      → CLI helper (list browsers, devices, upload apps)
```

## How to use with your existing tests

### Playwright

```bash
# Point your existing Playwright tests at BrowserStack
npx playwright test --config=configs/playwright.browserstack.config.ts
```

### Selenium (any language)

```javascript
// Replace your local WebDriver with BrowserStack hub
const driver = new Builder()
  .usingServer('https://hub-cloud.browserstack.com/wd/hub')
  .withCapabilities({
    browserName: 'Chrome',
    browserVersion: 'latest',
    'bstack:options': {
      os: 'Windows',
      osVersion: '11',
      userName: process.env.BROWSERSTACK_USERNAME,
      accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
    },
  })
  .build();
```

### Appium (mobile)

```python
# Upload app first
# curl -u "user:key" -X POST https://api-cloud.browserstack.com/app-automate/upload -F "file=@app.apk"

options = UiAutomator2Options()
options.set_capability('bstack:options', {
    'userName': os.getenv('BROWSERSTACK_USERNAME'),
    'accessKey': os.getenv('BROWSERSTACK_ACCESS_KEY'),
    'deviceName': 'Samsung Galaxy S24',
    'osVersion': '14.0',
    'appUrl': 'bs://<hash_from_upload>',
})
driver = webdriver.Remote('https://hub-cloud.browserstack.com/wd/hub', options=options)
```

## Available browser/device combos

Run `./discover.sh` to get the full list for your account, or use:

```bash
./scripts/browserstack.sh browsers    # list desktop browsers
./scripts/browserstack.sh devices     # list mobile devices
./scripts/browserstack.sh status      # account plan/limits
./scripts/browserstack.sh upload app.apk  # upload mobile app
```

## Common desktop configurations

| OS | Browser | Capability |
|----|---------|-----------|
| Windows 11 | Chrome latest | `{ os: 'Windows', osVersion: '11', browser: 'Chrome' }` |
| Windows 11 | Firefox latest | `{ os: 'Windows', osVersion: '11', browser: 'Firefox' }` |
| macOS Sonoma | Safari latest | `{ os: 'OS X', osVersion: 'Sonoma', browser: 'Safari' }` |
| macOS Sonoma | Chrome latest | `{ os: 'OS X', osVersion: 'Sonoma', browser: 'Chrome' }` |

## Common mobile configurations

| Device | OS | Platform |
|--------|-----|---------|
| Samsung Galaxy S24 | Android 14 | `android` |
| Google Pixel 8 | Android 14 | `android` |
| iPhone 15 | iOS 17 | `ios` |
| iPhone 14 | iOS 16 | `ios` |

## Commands

```bash
# Playwright on BrowserStack
npx playwright test --config=configs/playwright.browserstack.config.ts

# Helper scripts
./scripts/browserstack.sh browsers
./scripts/browserstack.sh devices
./scripts/browserstack.sh upload path/to/app.apk
./scripts/browserstack.sh status
```

## Discovery workflow

1. Run `./discover.sh` to fetch available browsers and devices for your account
2. Review `discovery-output/browsers.json` and `devices.json`
3. Pick target configurations and add them to your test config
4. Run your existing tests with the BrowserStack config

## Rules

- Never hardcode credentials — always use env vars
- Use `bstack:options` capability namespace (W3C standard)
- Set `projectName` and `buildName` for organized dashboards
- Enable `debug: true` and `networkLogs: true` for debugging
- Upload mobile apps via API before running Appium tests
