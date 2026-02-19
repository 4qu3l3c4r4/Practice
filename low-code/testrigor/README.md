# testRigor E2E Template

End-to-end test template for testRigor — an AI-powered codeless testing platform using plain English.

## Prerequisites

- [testRigor](https://testrigor.com/) account
- A test suite created in the testRigor UI

## Setup

1. Create a test suite in the testRigor web UI.
2. Set your app URL as the base URL in the suite settings.
3. Copy `.env.example` to `.env` and set your API key (for CI integration).

## Writing tests

Tests are written in plain English directly in the testRigor UI or in text files:

```
open url "${BASE_URL}"
check that page contains "Login"
enter "test@example.com" into "Email"
enter "password123" into "Password"
click "Sign In"
check that page contains "Dashboard"
```

See `tests/example-plain-english.txt` for more examples.

## Running tests

**From testRigor UI:** Click Run on your test suite.

**From CLI (API):**
```bash
curl -X POST "https://api.testrigor.com/api/v1/apps/YOUR_APP_ID/retest" \
  -H "auth-token: YOUR_API_KEY"
```

## Environment variables

| Variable           | Description          |
|-------------------|----------------------|
| `BASE_URL`        | App URL              |
| `TESTRIGOR_API_KEY` | API key for CI runs |

## Project structure

```
├── tests/
│   └── example-plain-english.txt   # Example test cases in natural language
├── scripts/
│   ├── verify-dom-structure.js     # Browser console DOM verification
│   └── README.md
├── .env.example
└── .gitignore
```

## Key features

- No code required — tests are plain English
- AI-powered element detection (no selectors needed)
- Auto-healing when UI changes
- Cross-browser and mobile testing built in
