# Test Data Seeder Template

Database test data seeding and cleanup for E2E and integration tests.

## Setup

```bash
cp .env.example .env    # set DATABASE_URL
npm install
```

## Usage

```bash
npm run seed            # insert test data
npm run seed:clean      # remove test data
npm run seed:reset      # clean + re-seed
```

## Adding fixtures

Edit `seeds/fixtures.ts` — each fixture has `up` (insert) and `down` (delete):

```typescript
export const myData: SeedData = {
  name: 'my-data',
  up: async (db) => {
    await db.query(`INSERT INTO my_table (...) VALUES (...) ON CONFLICT DO NOTHING`);
  },
  down: async (db) => {
    await db.query(`DELETE FROM my_table WHERE ...`);
  },
};
```

Then add it to `seeds/seed.ts` and `seeds/clean.ts`.

## Database discovery

```bash
./discover.sh           # introspects schema, outputs tables + columns as JSON
```

## Environment variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | Connection string | - |
| `SEED_ENV` | Safety check | `test` |

## Project structure

```
├── seeds/
│   ├── db.ts            # Connection + SeedData interface
│   ├── fixtures.ts      # Test data definitions
│   ├── seed.ts          # Run all seeds
│   └── clean.ts         # Run all cleanups
├── discover.sh          # Schema introspection
├── package.json
└── .env.example
```

## Adapting for other databases

Default uses PostgreSQL (`pg`). To switch:
1. Replace `pg` with `mysql2` or `mongodb` in `package.json`
2. Update `seeds/db.ts` connection logic
3. Update SQL syntax in fixtures
