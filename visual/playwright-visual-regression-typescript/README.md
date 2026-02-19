# Playwright Visual Regression Template

Screenshot comparison testing using Playwright's built-in `toHaveScreenshot()`.

## Setup

```bash
cp .env.example .env
npm install
npx playwright install chromium
```

## Running tests

```bash
# First run generates baseline snapshots
npm test

# Update baselines after intentional UI changes
npm run test:update
```

## How it works

- First run creates baseline screenshots in `tests/*.spec.ts-snapshots/`
- Subsequent runs compare against baselines
- Fails if pixel diff exceeds `maxDiffPixelRatio` (default: 1%)
- Runs on desktop (1280x720) and mobile (375x812) viewports

## Project structure

```
├── tests/
│   ├── visual.spec.ts                    # Visual tests
│   └── visual.spec.ts-snapshots/         # Baseline screenshots (auto-generated)
├── playwright.config.ts
├── package.json
└── .env.example
```

## Tips

- Commit baseline snapshots to git
- Use `--update-snapshots` only when UI changes are intentional
- Test specific components with `page.locator().toHaveScreenshot()`
- Increase `maxDiffPixelRatio` for pages with dynamic content
