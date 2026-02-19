# AI Context — Supertest TypeScript API Template

> This file is designed to be read by AI assistants (Kiro, Cursor, Copilot, Claude, ChatGPT, etc.) to help implement tests using this template.

## Template purpose

REST API testing using Supertest with Jest and TypeScript.

## Tech stack

- Node.js 18+
- TypeScript
- Supertest
- Jest

## Project structure

```
tests/api.test.ts          → API tests
jest.config.js             → Jest config
```

## Code patterns

```typescript
it('GET /api/users returns array', async () => {
    const res = await api.get('/api/users').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
});

it('POST /api/users creates user', async () => {
    const res = await api
        .post('/api/users')
        .send({ name: 'Test', email: 'test@example.com' })
        .expect(201);
    expect(res.body).toHaveProperty('id');
});
```

## Commands

```bash
npm test
npm run test:smoke
```

## Discovery & test generation workflow

1. Run `scripts/discovery/discover-api.sh http://your-api.com` to find all endpoints.
2. Review the discovery report JSON for available selectors/endpoints/elements
3. Create test files following the patterns above
4. Run tests to verify

## Rules

- Follow existing patterns in the template
- Keep test data in `.env` or config files, not hardcoded
- Use Page Object Model for web/mobile tests
- One test file per feature area
- Name tests descriptively
