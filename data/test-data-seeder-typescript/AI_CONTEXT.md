# AI Context — Test Data Seeder TypeScript Template

> This file is designed to be read by AI assistants (Kiro, Cursor, Copilot, Claude, ChatGPT, etc.) to help implement tests using this template.

## Template purpose

Database test data seeding and cleanup for E2E and integration tests. Seeds known test data before tests run, cleans up after.

## Tech stack

- Node.js 18+
- TypeScript
- pg (PostgreSQL client) — swap for mysql2, mongodb, etc. as needed
- dotenv

## Architecture

```
seeds/
  db.ts              → Database connection + SeedData interface
  fixtures.ts        → Test data definitions (up/down per fixture)
  seed.ts            → Run all seeds
  clean.ts           → Run all cleanups
```

## Key patterns

### Fixture definition

Every fixture has `up` (insert) and `down` (delete) methods:

```typescript
import { SeedData } from './db';

export const users: SeedData = {
  name: 'users',
  up: async (db) => {
    await db.query(`
      INSERT INTO users (email, name, role) VALUES
        ('test@example.com', 'Test User', 'user')
      ON CONFLICT (email) DO NOTHING
    `);
  },
  down: async (db) => {
    await db.query(`DELETE FROM users WHERE email = 'test@example.com'`);
  },
};
```

### Seed runner

```typescript
// seed.ts runs all fixtures in order
for (const fixture of [users, organizations, transactions]) {
  await fixture.up(db);
}

// clean.ts runs in reverse order (respects foreign keys)
for (const fixture of [transactions, organizations, users]) {
  await fixture.down(db);
}
```

### Integration with E2E tests

```bash
# Before test suite
npm run seed

# Run tests
npm run test:e2e

# After test suite
npm run seed:clean

# Or reset (clean + seed)
npm run seed:reset
```

## Commands

```bash
npm run seed          # insert test data
npm run seed:clean    # remove test data
npm run seed:reset    # clean + seed
```

## Discovery workflow

1. Run `./discover.sh` to introspect the database schema
2. Review `discovery-output/schema.json` for all tables and columns
3. Create fixtures in `seeds/fixtures.ts` for each table that needs test data
4. Use `ON CONFLICT DO NOTHING` or `IF NOT EXISTS` for idempotent seeds
5. Clean up uses specific WHERE clauses to only delete test data (never `TRUNCATE`)

## Rules

- Fixtures must be idempotent — running seed twice should not fail or duplicate data
- Clean only deletes data created by seed (use specific WHERE clauses)
- Respect foreign key order: seed parents first, clean children first
- Use realistic but obviously fake data (e.g., `test@example.com`, `Test Corp`)
- Never seed into production databases — check `SEED_ENV` variable
