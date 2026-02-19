# AI Context — Postman + Newman API Template

> This file is designed to be read by AI assistants (Kiro, Cursor, Copilot, Claude, ChatGPT, etc.) to help implement tests using this template.

## Template purpose

API testing using Postman collections executed via Newman CLI. For teams that already use Postman and want to automate collection runs in CI.

## Tech stack

- Postman (collection authoring — GUI or JSON)
- Newman 6.x (CLI runner)
- newman-reporter-htmlextra (HTML reports)
- Node.js 18+

## Architecture

```
collections/
  smoke.postman_collection.json       → Postman collection (exported JSON)
  env.postman_environment.json        → Environment variables (baseUrl, apiToken)
package.json                          → Newman scripts
```

## Key patterns

### Postman collection structure (v2.1)

```json
{
  "info": { "name": "My API Tests", "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json" },
  "item": [
    {
      "name": "Get Users",
      "request": {
        "method": "GET",
        "url": "{{baseUrl}}/api/users",
        "header": [{ "key": "Authorization", "value": "Bearer {{apiToken}}" }]
      },
      "event": [{
        "listen": "test",
        "script": {
          "exec": [
            "pm.test('Status is 200', () => pm.response.to.have.status(200));",
            "pm.test('Returns array', () => pm.expect(pm.response.json()).to.be.an('array'));"
          ]
        }
      }]
    }
  ]
}
```

### Test scripts (pm.test)

```javascript
// Status code
pm.test('Status is 200', () => pm.response.to.have.status(200));

// Response time
pm.test('Fast response', () => pm.expect(pm.response.responseTime).to.be.below(500));

// JSON body
pm.test('Has id', () => pm.expect(pm.response.json()).to.have.property('id'));

// Array
pm.test('Returns array', () => pm.expect(pm.response.json()).to.be.an('array'));

// Schema validation
const schema = { type: 'object', required: ['id', 'name'] };
pm.test('Valid schema', () => pm.response.to.have.jsonSchema(schema));

// Save variable for chaining
pm.environment.set('userId', pm.response.json().id);

// Use in next request: {{userId}}
```

### Environment variables

Use `{{variableName}}` in URLs, headers, and bodies. Define in environment JSON or override via CLI:

```bash
newman run collection.json --env-var "baseUrl=https://staging.example.com"
```

## Commands

```bash
npm test                    # run collection
npm run test:html           # run + HTML report
npm run test:ci             # run + JUnit XML (for CI)

# Direct newman usage
newman run collections/smoke.postman_collection.json \
  -e collections/env.postman_environment.json \
  --env-var "baseUrl=https://staging.example.com" \
  --env-var "apiToken=my-token" \
  -n 3 \                    # iterations
  --delay-request 100       # ms between requests
```

## Discovery workflow

1. Run `./discover.sh http://your-api.com` to find endpoints
2. It generates a Postman collection JSON from discovered endpoints
3. Import into Postman GUI to refine, or use directly with Newman
4. Add test scripts to each request
5. Export updated collection back to `collections/`

## Workflow: Postman GUI → Newman CI

1. Author/edit collections in Postman GUI
2. Export collection as JSON v2.1 → save to `collections/`
3. Export environment → save to `collections/`
4. Run `npm test` locally to verify
5. CI runs `npm run test:ci` on every push

## Rules

- Use `{{variables}}` for all URLs, tokens, and dynamic values — never hardcode
- One collection per feature area or API domain
- Chain requests using `pm.environment.set()` / `pm.environment.get()`
- Keep environment files in git (without secrets — use `--env-var` in CI)
- Use folders within collections to group related requests
