import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import path from 'path';

const { like, eachLike } = MatchersV3;

const provider = new PactV3({
  consumer: 'MyConsumer',
  provider: 'MyProvider',
  dir: path.resolve(process.cwd(), 'pacts'),
});

describe('User API Contract', () => {
  it('GET /api/users returns a list of users', async () => {
    await provider
      .given('users exist')
      .uponReceiving('a request for users')
      .withRequest({ method: 'GET', path: '/api/users' })
      .willRespondWith({
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: eachLike({
          id: like(1),
          name: like('Jane Doe'),
          email: like('jane@example.com'),
        }),
      })
      .executeTest(async (mockServer) => {
        const res = await fetch(`${mockServer.url}/api/users`);
        expect(res.status).toBe(200);
        const body = await res.json();
        expect(body[0]).toHaveProperty('id');
        expect(body[0]).toHaveProperty('name');
      });
  });

  it('GET /api/users/:id returns a single user', async () => {
    await provider
      .given('user 1 exists')
      .uponReceiving('a request for user 1')
      .withRequest({ method: 'GET', path: '/api/users/1' })
      .willRespondWith({
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: like({ id: 1, name: 'Jane Doe', email: 'jane@example.com' }),
      })
      .executeTest(async (mockServer) => {
        const res = await fetch(`${mockServer.url}/api/users/1`);
        expect(res.status).toBe(200);
        const body = await res.json();
        expect(body.name).toBeDefined();
      });
  });
});
