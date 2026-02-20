# Database Testing Template

Database validation and testing using Testcontainers and Jest.

## Setup

```bash
npm install
```

## Run tests

```bash
npm test
```

## Writing tests

```typescript
import { GenericContainer } from 'testcontainers';
import { Client } from 'pg';

test('database operations', async () => {
  const container = await new GenericContainer('postgres:15')
    .withExposedPorts(5432)
    .withEnvironment({ POSTGRES_PASSWORD: 'test' })
    .start();

  const client = new Client({
    host: container.getHost(),
    port: container.getMappedPort(5432),
    user: 'postgres',
    password: 'test'
  });

  await client.connect();
  const result = await client.query('SELECT 1');
  expect(result.rows[0]).toEqual({ '?column?': 1 });
  
  await client.end();
  await container.stop();
});
```
