# Self-Healing Test Strategy

Every template in this repository includes self-healing capabilities to reduce test flakiness caused by UI changes, timing issues, and environment instability.

## What Is Self-Healing?

Self-healing tests automatically recover from failures caused by:
- **Selector changes** — element IDs, classes, or attributes renamed
- **Timing issues** — elements loading slower than expected
- **Transient failures** — network blips, animations, race conditions

## Strategy by Framework

### Playwright (TypeScript, Java, C#, Python)

- **Built-in auto-wait** — Playwright waits for elements to be actionable before interacting
- **Retry on failure** — `retries: 2` in config retries failed tests automatically
- **Resilient selectors** — use `ResilientLocator` utility that tries multiple selector strategies in order:
  1. `data-test-id` (most stable)
  2. `getByRole` (accessibility-based)
  3. `getByText` (content-based)
  4. CSS fallback

### Selenium (TypeScript, Java, C#, Python)

- **SmartLocator utility** — tries multiple `By` strategies with configurable timeout
- **Auto-retry wrapper** — retries failed actions with exponential backoff
- **Stale element protection** — automatically re-finds elements on `StaleElementReferenceException`

### Cypress

- **Built-in retry-ability** — Cypress retries assertions automatically
- **`retries: 2`** in config for full test retries
- **`cy.resilientGet()`** custom command — tries `data-test-id` → `role` → `text` → CSS

### WebdriverIO

- **`specFileRetries: 2`** — retries failed spec files
- **`waitforTimeout: 15000`** — generous wait for elements
- **Custom `resilientFind`** command — multi-strategy element lookup

### TestCafe

- **Built-in smart assertions** with auto-wait
- **`quarantineMode`** enabled — retries flaky tests up to 3 times
- **Resilient selector helper** — cascading selector strategies

### Appium (Java, Python, C#)

- **SmartFind utility** — tries `accessibility-id` → `resource-id` → `xpath` with retry
- **Implicit + explicit waits** combined
- **Stale element retry** on mobile-specific exceptions

### Robot Framework

- **`Wait Until Element Is Visible`** with configurable timeout
- **`Retry Keyword`** — built-in retry mechanism
- **Resilient locator keyword** — tries multiple strategies

### Low-Code (mabl, testRigor, Virtuoso)

- **Built-in AI self-healing** — these platforms handle it natively
- No additional utilities needed

## Selector Priority (Web)

Always prefer selectors in this order:
1. `[data-test-id="..."]` — dedicated test attribute, most stable
2. `getByRole('button', { name: '...' })` — accessibility-based, resilient to DOM changes
3. `getByText('...')` — content-based, good for labels
4. `#id` or `.class` — CSS selectors, least stable

## Selector Priority (Mobile)

1. `accessibility-id` — cross-platform, most stable
2. `resource-id` (Android) / `name` (iOS)
3. `class + text` combination
4. `xpath` — last resort

## Configuration Summary

| Template | Retries | Auto-Wait | Fallback Selectors | Stale Protection |
|----------|---------|-----------|-------------------|-----------------|
| Playwright TS | 2 | ✅ native | ✅ ResilientLocator | ✅ native |
| Playwright Java | 2 | ✅ native | ✅ ResilientLocator | ✅ native |
| Playwright C# | 2 | ✅ native | ✅ ResilientLocator | ✅ native |
| Playwright Python | 2 | ✅ native | ✅ resilient_locator | ✅ native |
| Selenium TS | 2 | ✅ SmartLocator | ✅ SmartLocator | ✅ retry wrapper |
| Selenium Java | 2 | ✅ SmartLocator | ✅ SmartLocator | ✅ retry wrapper |
| Selenium C# | 2 | ✅ SmartLocator | ✅ SmartLocator | ✅ retry wrapper |
| Selenium Python | 2 | ✅ smart_locator | ✅ smart_locator | ✅ retry wrapper |
| Cypress | 2 | ✅ native | ✅ cy.resilientGet | ✅ native |
| WebdriverIO | 2 | ✅ native | ✅ resilientFind | ✅ native |
| TestCafe | 3 (quarantine) | ✅ native | ✅ resilientSelector | ✅ native |
| Appium Java | 2 | ✅ SmartFind | ✅ SmartFind | ✅ retry wrapper |
| Appium Python | 2 | ✅ smart_find | ✅ smart_find | ✅ retry wrapper |
| Appium C# | 2 | ✅ SmartFind | ✅ SmartFind | ✅ retry wrapper |
| Robot Framework | 3x | ✅ Wait Until | ✅ Resilient Locator | ✅ keyword retry |
