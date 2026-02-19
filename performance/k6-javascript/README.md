# k6 Load Testing Template

Performance and load testing using k6 (Grafana).

## Prerequisites

```bash
# macOS
brew install k6

# Docker alternative
docker run --rm -i grafana/k6 run - <load-test.js
```

## Running tests

```bash
# Load test (ramp up/down)
k6 run load-test.js

# Stress test (100 concurrent users)
k6 run stress-test.js

# Override base URL
k6 run -e BASE_URL=https://staging.example.com load-test.js

# Output to JSON
k6 run --out json=results.json load-test.js
```

## Test types

| File | Description |
|------|-------------|
| `load-test.js` | Gradual ramp: 0→10 users over 2 min |
| `stress-test.js` | Constant 100 users for 30s |

## Thresholds

Tests fail if thresholds are breached:
- `http_req_duration p(95)<500` — 95th percentile under 500ms
- `http_req_failed rate<0.01` — less than 1% failure rate

## Project structure

```
├── load-test.js
├── stress-test.js
└── .env.example
```
