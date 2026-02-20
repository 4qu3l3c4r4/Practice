# AI Context — Chaos Testing Template

## Template purpose

Chaos engineering using Toxiproxy to test system resilience.

## Tech stack

- Toxiproxy (Docker)
- toxiproxy-node-client
- Jest 29.x

## Code patterns

```typescript
import Toxiproxy from 'toxiproxy-node-client';

const toxiproxy = new Toxiproxy('http://localhost:8474');

// Create proxy
await toxiproxy.createProxy({
  name: 'api',
  listen: '0.0.0.0:20000',
  upstream: 'api.example.com:443'
});

// Test scenarios

// 1. Latency
await toxiproxy.addToxic('api', {
  type: 'latency',
  attributes: { latency: 5000 }
});

// 2. Connection timeout
await toxiproxy.addToxic('api', {
  type: 'timeout',
  attributes: { timeout: 1000 }
});

// 3. Bandwidth limit
await toxiproxy.addToxic('api', {
  type: 'bandwidth',
  attributes: { rate: 10 }
});

// 4. Connection down
await toxiproxy.addToxic('api', {
  type: 'down'
});

// Cleanup
await toxiproxy.removeToxic('api', 'latency');
await toxiproxy.deleteProxy('api');
```

## Rules

- Test one failure mode at a time
- Verify graceful degradation
- Test retry logic
- Measure recovery time
- Clean up proxies after tests
