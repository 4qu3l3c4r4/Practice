import { GenericContainer } from 'testcontainers';
import { Client } from 'pg';

describe('Database', () => {
  let container: any;
  let client: Client;

  beforeAll(async () => {
    container = await new GenericContainer('postgres:15')
      .withExposedPorts(5432)
      .withEnvironment({ POSTGRES_PASSWORD: 'test' })
      .start();

    client = new Client({
      host: container.getHost(),
      port: container.getMappedPort(5432),
      user: 'postgres',
      password: 'test',
      database: 'postgres'
    });

    await client.connect();
  });

  afterAll(async () => {
    await client.end();
    await container.stop();
  });

  it('should create and query table', async () => {
    await client.query('CREATE TABLE users (id INT, name TEXT)');
    await client.query('INSERT INTO users VALUES (1, \'John\')');
    
    const result = await client.query('SELECT * FROM users');
    expect(result.rows).toHaveLength(1);
    expect(result.rows[0].name).toBe('John');
  });
});
