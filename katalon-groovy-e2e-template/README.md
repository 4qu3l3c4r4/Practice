# Katalon + Groovy E2E Template

End-to-end test template for Katalon Studio in script mode using Groovy.

## Prerequisites

- [Katalon Studio](https://katalon.com/) installed (Community or Enterprise)
- Chrome browser installed

## Setup

1. Open this folder as a Katalon project in Katalon Studio.
2. Copy `.env.example` to `.env` and set `BASE_URL`, `UI_USERNAME`, `UI_PASSWORD`.
3. Run tests from the Katalon Studio UI or CLI.

## Running tests

**From Katalon Studio:**
- Open `Scripts/SmokeTest.groovy` and click Run.

**From CLI (Katalon Runtime Engine):**
```bash
katalonc -projectPath="$(pwd)" \
  -testSuitePath="Test Suites/SmokeTest" \
  -browserType="Chrome (headless)"
```

## Environment variables

| Variable       | Description    |
|---------------|----------------|
| `BASE_URL`    | App URL        |
| `UI_USERNAME` | Login username |
| `UI_PASSWORD` | Login password |

Variables are read via `System.getProperty()` or `System.getenv()` in Groovy scripts.

## Project structure

```
├── Scripts/
│   ├── SmokeTest.groovy             # Smoke test script
│   ├── verify-dom-structure.js      # Browser console DOM verification
│   └── README.md
├── Keywords/
│   └── CustomKeywords.groovy        # Reusable keyword class
├── .env.example
└── .gitignore
```

## How it works

- `SmokeTest.groovy` uses Katalon's `WebUI` keywords (`openBrowser`, `navigateToUrl`, `setText`, `click`).
- `CustomKeywords.groovy` defines reusable methods annotated with `@Keyword`.
- Environment variables are loaded from system properties.

## Adding new tests

1. Create Groovy scripts in `Scripts/`
2. Add reusable keywords in `Keywords/CustomKeywords.groovy`
3. Use Katalon's `WebUI` API for browser interactions
