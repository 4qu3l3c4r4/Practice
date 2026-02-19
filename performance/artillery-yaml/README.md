# Artillery Load Testing Template

YAML-based load testing using Artillery.

## Setup

```bash
npm install
```

## Running tests

```bash
npm run test:load                # run load test
npm run test:load:report         # run + generate HTML report

# Override target
artillery run --target https://staging.example.com load-test.yml
```

## Test phases

| Phase | Duration | Arrival rate | Description |
|-------|----------|-------------|-------------|
| Warm up | 30s | 5 req/s | Gradual start |
| Sustained | 60s | 20 req/s | Main load |
| Cool down | 30s | 5 req/s | Ramp down |

## Thresholds

- `p95 < 500ms`
- `maxErrorRate < 1%`

## Project structure

```
├── load-test.yml
├── package.json
└── .env.example
```
