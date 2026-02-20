# AI Context — OWASP ZAP Security Testing Template

## Template purpose

Security testing using OWASP ZAP API for vulnerability scanning.

## Tech stack

- OWASP ZAP (Docker)
- Node.js 18+
- Jest 29.x

## Code patterns

```typescript
const ZAP_URL = 'http://localhost:8080';
const TARGET = 'https://your-app.com';

// Spider scan (crawl)
const spiderResponse = await fetch(
  `${ZAP_URL}/JSON/spider/action/scan/?url=${TARGET}`
);
const { scan: spiderId } = await spiderResponse.json();

// Wait for spider to complete
let spiderStatus = 0;
while (spiderStatus < 100) {
  const statusResponse = await fetch(
    `${ZAP_URL}/JSON/spider/view/status/?scanId=${spiderId}`
  );
  const { status } = await statusResponse.json();
  spiderStatus = parseInt(status);
  await new Promise(resolve => setTimeout(resolve, 1000));
}

// Active scan
const scanResponse = await fetch(
  `${ZAP_URL}/JSON/ascan/action/scan/?url=${TARGET}`
);

// Get alerts
const alertsResponse = await fetch(
  `${ZAP_URL}/JSON/core/view/alerts/?baseurl=${TARGET}`
);
const { alerts } = await alertsResponse.json();

// Filter high-risk alerts
const highRisk = alerts.filter(a => a.risk === 'High');
expect(highRisk).toHaveLength(0);
```

## Rules

- Run ZAP in Docker for isolation
- Always spider before active scan
- Filter alerts by risk level
- Generate HTML reports
- Fail tests on high-risk vulnerabilities
