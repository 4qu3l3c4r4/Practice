# AI Context — WireMock Docker Mock Template

> This file is designed to be read by AI assistants (Kiro, Cursor, Copilot, Claude, ChatGPT, etc.) to help implement tests using this template.

## Template purpose

API mocking and stubbing using WireMock in Docker.

## Tech stack

- Docker
- WireMock 3.x
- JSON mapping files

## Project structure

```
mappings/*.json            → Stub definitions (one per endpoint)
__files/*.json             → Response body files
scripts/generate-mapping.sh → Scaffold new stubs
docker-compose.yml         → Docker setup
```

## Code patterns

```json
{
  "request": {
    "method": "POST",
    "url": "/api/check",
    "bodyPatterns": [
      { "matchesJsonPath": "$.accountId" }
    ]
  },
  "response": {
    "status": 200,
    "headers": { "Content-Type": "application/json" },
    "jsonBody": { "result": "MATCH" }
  }
}
```

### Request matching
- Exact URL: `"url": "/path"`
- Regex: `"urlPattern": "/api/users/[0-9]+"`
- JSON body: `"matchesJsonPath": "$[?(@.name == 'test')]"`
- Headers: `"headers": { "Authorization": { "contains": "Bearer" } }`

## Commands

```bash
docker-compose up -d        # start WireMock
curl localhost:8080/__admin/mappings  # list stubs
scripts/generate-mapping.sh GET /api/products get-products
```

## Discovery & test generation workflow

1. Run `scripts/discovery/discover-wiremock.sh ./mappings` to summarize existing stubs.
Run `scripts/discovery/discover-api.sh` against the real API to find endpoints that need mocking.
2. Review the discovery report JSON for available selectors/endpoints/elements
3. Create test files following the patterns above
4. Run tests to verify

## Rules

- Follow existing patterns in the template
- Keep test data in `.env` or config files, not hardcoded
- Use Page Object Model for web/mobile tests
- One test file per feature area
- Name tests descriptively
