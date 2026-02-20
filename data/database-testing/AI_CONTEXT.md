# AI Context — Database Testing Template

## Template purpose

Database validation and testing using Testcontainers.

## Tech stack

- Testcontainers 10.x
- Jest 29.x
- PostgreSQL/MySQL/MongoDB clients

## Code patterns

```typescript
import { GenericContainer } from 'testcontainers';

const container = await new GenericContainer('postgres:15')
  .withExposedPorts(5432)
  .withEnvironment({ POSTGRES_PASSWORD: 'test' })
  .start();

// Connect and test
const client = new Client({
  host: container.getHost(),
  port: container.getMappedPort(5432)
});

await client.query('CREATE TABLE users (id INT, name TEXT)');
await client.query('INSERT INTO users VALUES (1, \'John\')');
const result = await client.query('SELECT * FROM users');

expect(result.rows).toHaveLength(1);

await container.stop();
```

## Rules

- Use Testcontainers for isolated DB instances
- Clean up containers after tests
- Test migrations, constraints, triggers
- Validate data integrity
