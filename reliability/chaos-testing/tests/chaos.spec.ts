import Toxiproxy from 'toxiproxy-node-client';

describe('Chaos Testing', () => {
  const toxiproxy = new Toxiproxy('http://localhost:8474');
  const proxyName = 'test-api';

  beforeAll(async () => {
    await toxiproxy.createProxy({
      name: proxyName,
      listen: '0.0.0.0:20000',
      upstream: 'httpbin.org:80'
    });
  });

  afterAll(async () => {
    await toxiproxy.deleteProxy(proxyName);
  });

  it('should handle latency', async () => {
    await toxiproxy.addToxic(proxyName, {
      type: 'latency',
      attributes: { latency: 3000 }
    });

    const start = Date.now();
    const response = await fetch('http://localhost:20000/get');
    const duration = Date.now() - start;

    expect(duration).toBeGreaterThan(3000);
    expect(response.ok).toBe(true);

    await toxiproxy.removeToxic(proxyName, 'latency');
  });

  it('should handle connection timeout', async () => {
    await toxiproxy.addToxic(proxyName, {
      type: 'timeout',
      attributes: { timeout: 100 }
    });

    await expect(
      fetch('http://localhost:20000/get', { signal: AbortSignal.timeout(5000) })
    ).rejects.toThrow();

    await toxiproxy.removeToxic(proxyName, 'timeout');
  });
});
