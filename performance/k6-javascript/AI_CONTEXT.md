# AI Context — k6 Load Testing Template

> This file is designed to be read by AI assistants (Kiro, Cursor, Copilot, Claude, ChatGPT, etc.) to help implement tests using this template.

## Template purpose

Performance and load testing using k6 (Grafana).

## Tech stack

- k6 CLI (brew install k6 or Docker)
- JavaScript (ES6 modules)

## Project structure

```
load-test.js               → Gradual ramp load test
stress-test.js             → High-concurrency stress test
```

## Code patterns

```javascript
import http from 'k6/http';
import { check } from 'k6';

export const options = {
    stages: [{ duration: '1m', target: 20 }],
    thresholds: { http_req_duration: ['p(95)<500'] },
};

export default function () {
    const res = http.get(`${__ENV.BASE_URL}/api/health`);
    check(res, { 'status 200': (r) => r.status === 200 });
}
```

### Thresholds
- `http_req_duration`: response time percentiles
- `http_req_failed`: error rate
- `checks`: assertion pass rate

## Commands

```bash
k6 run load-test.js
k6 run -e BASE_URL=https://staging.example.com load-test.js
k6 run --out json=results.json load-test.js
```

## Discovery & test generation workflow

1. Run `scripts/discovery/discover-api.sh` to find endpoints to load test.
2. Review the discovery report JSON for available selectors/endpoints/elements
3. Create test files following the patterns above
4. Run tests to verify

## Rules

- Follow existing patterns in the template
- Keep test data in `.env` or config files, not hardcoded
- Use Page Object Model for web/mobile tests
- One test file per feature area
- Name tests descriptively
