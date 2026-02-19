# AI Context — Artillery Load Testing Template

> This file is designed to be read by AI assistants (Kiro, Cursor, Copilot, Claude, ChatGPT, etc.) to help implement tests using this template.

## Template purpose

YAML-based load testing using Artillery.

## Tech stack

- Node.js 18+
- Artillery 2.x

## Project structure

```
load-test.yml              → Load test definition
```

## Code patterns

```yaml
config:
  target: "http://localhost:3000"
  phases:
    - duration: 60
      arrivalRate: 20
  ensure:
    p95: 500
    maxErrorRate: 1

scenarios:
  - name: "Browse API"
    flow:
      - get:
          url: "/api/users"
          expect:
            - statusCode: 200
```

## Commands

```bash
npm run test:load
npm run test:load:report    # generates HTML report
```

## Discovery & test generation workflow

1. Run `scripts/discovery/discover-api.sh` to find endpoints to load test.
2. Review the discovery report JSON for available selectors/endpoints/elements
3. Create test files following the patterns above
4. Run tests to verify

## Rules

- Follow existing patterns in the template
- Keep test data in `.env` or config files, not hardcoded
- Use Page Object Model for web/mobile tests
- One test file per feature area
- Name tests descriptively
