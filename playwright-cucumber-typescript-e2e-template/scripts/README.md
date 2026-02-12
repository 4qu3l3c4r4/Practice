# Scripts

Helper scripts for the E2E test suite.

## verify-selectors.ts
Interactive selector verification tool. Opens browser and checks if critical selectors exist on the login page.

```bash
npx ts-node scripts/verify-selectors.ts
```

## test-reporting.js
Shows available test commands and environment variables.

```bash
node scripts/test-reporting.js
```

## generate-pdf-report.js
Simple test results summary generator.

```bash
node scripts/generate-pdf-report.js
```

## verify-dom-structure.js
Browser console script for manual DOM verification. Copy and paste into browser DevTools console to check selectors and data attributes.