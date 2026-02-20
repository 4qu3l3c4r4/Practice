# OWASP ZAP Security Testing Template

Security testing using OWASP ZAP API.

## Prerequisites

- Docker
- OWASP ZAP running in Docker

## Setup

```bash
docker run -u zap -p 8080:8080 -d owasp/zap2docker-stable zap.sh -daemon -host 0.0.0.0 -port 8080 -config api.disablekey=true
```

## Run tests

```bash
npm test
```

## Writing tests

```typescript
const ZAP_URL = 'http://localhost:8080';
const TARGET = 'https://your-app.com';

// Spider scan
await fetch(`${ZAP_URL}/JSON/spider/action/scan/?url=${TARGET}`);

// Active scan
await fetch(`${ZAP_URL}/JSON/ascan/action/scan/?url=${TARGET}`);

// Get alerts
const alerts = await fetch(`${ZAP_URL}/JSON/core/view/alerts/?baseurl=${TARGET}`);
```
