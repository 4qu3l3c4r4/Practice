# Mabl E2E Template

End-to-end test template for Mabl — a low-code AI testing platform with auto-healing.

## Prerequisites

- [Mabl](https://www.mabl.com/) account
- Mabl desktop app or CLI installed

## Setup

1. Create a workspace and application in the Mabl UI.
2. Set your app URL as the application URL.
3. Copy `.env.example` to `.env` and set your API key (for CI integration).

## Writing tests

Tests are created in the Mabl UI using the visual flow builder:

1. Open the Mabl Trainer (browser extension or desktop app).
2. Navigate through your app — Mabl records your actions.
3. Add assertions (element visible, text matches, etc.).
4. Save the test flow.

## Running tests

**From Mabl UI:** Click Run on your test plan.

**From CLI:**
```bash
mabl tests run --application-id YOUR_APP_ID --environment-id YOUR_ENV_ID
```

**From API (CI):**
```bash
curl -X POST "https://api.mabl.com/events/deployment" \
  -u "key:${MABL_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"environment_id": "YOUR_ENV_ID", "application_id": "YOUR_APP_ID"}'
```

## Environment variables

| Variable       | Description          |
|---------------|----------------------|
| `BASE_URL`    | App URL              |
| `MABL_API_KEY`| API key for CI runs  |

## Project structure

```
├── scripts/
│   ├── verify-dom-structure.js     # Browser console DOM verification
│   └── README.md
├── .env.example
└── .gitignore
```

## Key features

- Low-code visual test builder
- AI-powered auto-healing when UI changes
- Built-in API testing
- Performance and accessibility checks
- Native CI/CD integrations
