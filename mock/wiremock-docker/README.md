# WireMock Docker Mock Template

Reusable WireMock template for mocking APIs in E2E and integration tests. Run locally via Docker or standalone JAR.

## Prerequisites

- Docker (recommended) or Java 11+

## Quick Start

```bash
# Docker (recommended)
docker-compose up -d

# Or standalone JAR
java -jar wiremock-standalone.jar --port 8080 --root-dir .
```

WireMock starts at `http://localhost:8080`.

## Adding Mappings

Create JSON files in `mappings/`. Each file defines a request matcher and a response.

### Simple GET stub

```json
{
  "request": {
    "method": "GET",
    "url": "/api/users/1"
  },
  "response": {
    "status": 200,
    "headers": { "Content-Type": "application/json" },
    "jsonBody": {
      "id": 1,
      "name": "Jane Doe",
      "email": "jane@example.com"
    }
  }
}
```

### POST with body matching

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
    "jsonBody": { "result": "MATCH", "status": "ACTIVE" }
  }
}
```

### Response from file

Put response bodies in `__files/` and reference them:

```json
{
  "request": {
    "method": "GET",
    "url": "/api/report"
  },
  "response": {
    "status": 200,
    "headers": { "Content-Type": "application/json" },
    "bodyFileName": "report-response.json"
  }
}
```

## Project structure

```
├── mappings/                # WireMock stub mappings (one JSON per endpoint)
│   ├── get-user.json        # Example GET stub
│   ├── post-check.json      # Example POST stub with body matching
│   └── error-500.json       # Example error response
├── __files/                 # Static response body files
│   └── report-response.json
├── scripts/
│   └── generate-mapping.sh  # Helper to scaffold new mappings
├── docker-compose.yml       # Docker setup
├── .env.example
└── README.md
```

## Environment variables

| Variable         | Description          | Default |
|-----------------|----------------------|---------|
| `WIREMOCK_PORT` | Port to expose       | `8080`  |
| `VERBOSE`       | Enable request log   | `false` |

## Useful API endpoints

| Endpoint                          | Description                    |
|----------------------------------|--------------------------------|
| `GET /__admin/mappings`          | List all stubs                 |
| `POST /__admin/mappings`         | Create stub at runtime         |
| `DELETE /__admin/mappings`       | Remove all stubs               |
| `POST /__admin/mappings/reset`   | Reload from files              |
| `GET /__admin/requests`          | View received requests         |

## Request matching cheat sheet

| Matcher                  | Example                                                    |
|-------------------------|------------------------------------------------------------|
| Exact URL               | `"url": "/api/users/1"`                                    |
| URL pattern             | `"urlPattern": "/api/users/[0-9]+"`                        |
| URL path                | `"urlPath": "/api/users"`                                  |
| Query param             | `"queryParameters": { "status": { "equalTo": "active" } }` |
| Header                  | `"headers": { "Authorization": { "contains": "Bearer" } }` |
| JSON body path          | `"bodyPatterns": [{ "matchesJsonPath": "$.name" }]`        |
| JSON body path + value  | `"matchesJsonPath": "$[?(@.name == 'test')]"`              |
| Regex body path         | `"matchesJsonPath": "$.id[?(@.value =~ /NL.*/)]"`         |

## Tips

- Use `priority` field (lower = higher priority) when multiple stubs match the same request
- Use `"scenarioName"` and `"requiredScenarioState"` for stateful mocking
- Hot reload: mappings are picked up automatically, or call `POST /__admin/mappings/reset`
- Use `scripts/generate-mapping.sh` to scaffold new stubs quickly
