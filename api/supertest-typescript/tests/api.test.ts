import request from 'supertest';

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
const api = request(baseUrl);

describe('API Smoke Tests', () => {
  it('smoke: GET /api/health returns 200', async () => {
    const res = await api.get('/api/health');
    expect(res.status).toBe(200);
  });

  it('smoke: GET /api/users returns array', async () => {
    const res = await api.get('/api/users').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/users creates a user', async () => {
    const res = await api
      .post('/api/users')
      .send({ name: 'Test User', email: 'test@example.com' })
      .expect(201);
    expect(res.body).toHaveProperty('id');
  });

  it('GET /api/users/:id returns user', async () => {
    const res = await api.get('/api/users/1').expect(200);
    expect(res.body).toHaveProperty('name');
  });

  it('returns 404 for unknown route', async () => {
    await api.get('/api/nonexistent').expect(404);
  });
});
