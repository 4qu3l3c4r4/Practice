# Chaos Testing Template

Chaos engineering using Toxiproxy to test system resilience.

## Prerequisites

- Docker
- Toxiproxy running

## Setup

```bash
docker run -d -p 8474:8474 -p 20000:20000 --name toxiproxy ghcr.io/shopify/toxiproxy
npm install
```

## Run tests

```bash
npm test
```

## Writing tests

```typescript
import Toxiproxy from 'toxiproxy-node-client';

const toxiproxy = new Toxiproxy('http://localhost:8474');

// Create proxy
await toxiproxy.createProxy({
  name: 'api',
  listen: '0.0.0.0:20000',
  upstream: 'api.example.com:443'
});

// Add latency
await toxiproxy.addToxic('api', {
  type: 'latency',
  attributes: { latency: 5000 }
});

// Test your app against localhost:20000
// Verify it handles latency gracefully

// Remove toxic
await toxiproxy.removeToxic('api', 'latency');
```
