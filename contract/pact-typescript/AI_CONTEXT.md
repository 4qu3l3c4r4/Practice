# AI Context — Pact Contract Testing Template

> This file is designed to be read by AI assistants (Kiro, Cursor, Copilot, Claude, ChatGPT, etc.) to help implement tests using this template.

## Template purpose

Consumer-driven contract testing using Pact (TypeScript).

## Tech stack

- Node.js 18+
- TypeScript
- @pact-foundation/pact
- Jest

## Project structure

```
tests/consumer.test.ts     → Consumer contract tests
pacts/                     → Generated contract JSON files
```

## Code patterns

```typescript
await provider
    .given('users exist')
    .uponReceiving('a request for users')
    .withRequest({ method: 'GET', path: '/api/users' })
    .willRespondWith({
        status: 200,
        body: eachLike({ id: like(1), name: like('Jane') }),
    })
    .executeTest(async (mockServer) => {
        const res = await fetch(`${mockServer.url}/api/users`);
        expect(res.status).toBe(200);
    });
```

### Matchers: `like()` (type), `eachLike()` (array), `regex()`, `integer()`, `string()`

## Commands

```bash
npm test                    # generate contracts
npm run test:publish        # publish to Pact Broker
```

## Discovery & test generation workflow

1. Run `scripts/discovery/discover-api.sh` to find all endpoints that need contracts.
2. Review the discovery report JSON for available selectors/endpoints/elements
3. Create test files following the patterns above
4. Run tests to verify

## Rules

- Follow existing patterns in the template
- Keep test data in `.env` or config files, not hardcoded
- Use Page Object Model for web/mobile tests
- One test file per feature area
- Name tests descriptively
