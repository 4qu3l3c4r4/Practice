# Virtuoso QA E2E Template

End-to-end test template for Virtuoso QA — an AI-native testing platform using natural language.

## Prerequisites

- [Virtuoso QA](https://www.virtuoso.qa/) account
- A project created in the Virtuoso UI

## Setup

1. Create a project in the Virtuoso web UI.
2. Set your app URL as the base URL in project settings.
3. Copy `.env.example` to `.env` and set your API key (for CI integration).

## Writing tests

Tests are written in natural language in the Virtuoso UI:

```
Navigate to "${BASE_URL}"
Verify that the page title is not empty
Enter "test@example.com" into the "Email" field
Enter "password123" into the "Password" field
Click the "Sign In" button
Verify that "Dashboard" is displayed on the page
```

See `tests/example-plain-english.txt` for more examples.

## Running tests

**From Virtuoso UI:** Click Execute on your test journey.

**From API (CI):**
```bash
curl -X POST "https://api.virtuoso.qa/api/execute" \
  -H "Authorization: Bearer ${VIRTUOSO_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"goalId": "YOUR_GOAL_ID"}'
```

## Environment variables

| Variable            | Description          |
|--------------------|----------------------|
| `BASE_URL`         | App URL              |
| `VIRTUOSO_API_KEY` | API key for CI runs  |

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

- Natural language test authoring
- AI-powered element recognition (no selectors needed)
- Self-healing tests
- Visual regression testing
- API testing support
