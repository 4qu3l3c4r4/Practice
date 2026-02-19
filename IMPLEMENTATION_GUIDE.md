# Implementation Guide

Step-by-step guide for implementing any test template against your system. Follow this before writing a single test.

---

## Phase 1: Gather system information

Before choosing a template, collect this information about your target system. Save it in a file called `SYSTEM_PROFILE.md` in your project root — your AI assistant can use it throughout implementation.

### 1.1 Application basics

```markdown
## Application Profile

- **App name:**
- **App type:** web | mobile (Android/iOS/both) | API | all
- **Tech stack:** (e.g., React, Angular, Vue, Flutter, Swift, Spring Boot, .NET, Django)
- **Base URL (per env):**
  - DEV: http://...
  - TST: http://...
  - ACC: http://...
  - PRD: https://...
- **Authentication method:** username/password | SSO/SAML | OAuth2 | API key | MFA | none
- **Login URL:**
- **Test credentials (non-prod):**
  - Username: (or where to find it)
  - Password: (or where to find it)
```

### 1.2 Architecture & infrastructure

```markdown
## Infrastructure

- **Hosting:** AWS / Azure / GCP / on-prem
- **CI/CD:** GitHub Actions / Jenkins / GitLab CI / Azure DevOps / other
- **Environments:** dev / tst / acc / prd (list all)
- **API gateway:** (if any)
- **CDN:** (if any)
- **Database:** (type, for test data seeding)
- **Feature flags:** (system used, if any)
```

### 1.3 For web applications

```markdown
## Web-specific

- **Selector strategy:** data-test-id | data-testid | data-cy | data-qa | CSS classes | none
- **SPA or MPA:** single-page app | multi-page | hybrid
- **Key pages to test:** (list URLs/routes)
  - Login: /login
  - Dashboard: /dashboard
  - ...
- **Dynamic content:** (areas that change frequently)
- **Iframes:** yes/no (where?)
- **Shadow DOM:** yes/no
- **File upload flows:** yes/no
- **Download flows:** yes/no
```

### 1.4 For mobile applications

```markdown
## Mobile-specific

- **Platforms:** Android | iOS | both
- **App type:** native | hybrid (WebView) | React Native | Flutter
- **Distribution:** App Store / Play Store / internal (MDM) / APK/IPA sideload
- **Android:**
  - Min SDK version:
  - App package: com.example.app
  - Main activity: .MainActivity
- **iOS:**
  - Min iOS version:
  - Bundle ID: com.example.app
- **Deep links:** (if any)
- **Push notifications:** yes/no (need testing?)
- **Biometric auth:** yes/no
```

### 1.5 For APIs

```markdown
## API-specific

- **API style:** REST | GraphQL | gRPC | SOAP
- **OpenAPI/Swagger spec URL:** (if available)
- **Base path:** /api/v1
- **Auth:** Bearer token | API key (header name?) | OAuth2 | none
- **Rate limiting:** yes/no (limits?)
- **Key endpoints to test:** (list)
  - GET /api/users
  - POST /api/users
  - ...
- **Expected response times:** (SLA, e.g., p95 < 500ms)
```

### 1.6 Test data & dependencies

```markdown
## Test data

- **Test data source:** static fixtures | database seeding | API calls | WireMock | shared test env
- **Data cleanup:** automatic | manual | not needed (isolated env)
- **External dependencies:** (third-party APIs, payment gateways, etc.)
- **Need mocking:** yes/no (which services?)
```

---

## Phase 2: Choose your template(s)

Based on your system profile, pick from this decision tree:

```
What are you testing?
│
├── Web UI
│   ├── Need BDD/Gherkin?
│   │   ├── Yes → web/playwright-bdd-typescript
│   │   └── No  → web/playwright-{language} or web/selenium-{language}
│   ├── Need component testing? → web/cypress-typescript
│   └── .NET shop? → web/playwright-csharp or web/selenium-csharp
│
├── Mobile app
│   └── mobile/appium-{java|python|csharp}  (all support Android + iOS)
│
├── API
│   ├── Node.js team → api/supertest-typescript
│   ├── Java team → api/rest-assured-java
│   └── Python team → api/pytest-requests-python
│
├── Visual regression → visual/playwright-visual-regression-typescript
├── Accessibility → accessibility/playwright-axe-typescript
├── Load testing → performance/k6-javascript or performance/artillery-yaml
├── Contract testing → contract/pact-typescript
├── API mocking → mock/wiremock-docker
├── Database seeding → data/test-data-seeder-typescript
├── Cloud device farm → cloud/browserstack (config layer for existing tests)
│
└── Non-technical QA team → low-code/{testrigor|mabl|virtuoso-qa}
```

Most projects need multiple templates. Common combos:
- **Full web stack:** `playwright-bdd-typescript` + `wiremock-docker` + `playwright-axe-typescript`
- **API-first:** `supertest-typescript` + `wiremock-docker` + `k6-javascript` + `pact-typescript`
- **Mobile:** `appium-java` + `wiremock-docker`
- **Complete:** web + api + visual + a11y + performance + mock

---

## Phase 3: Run discovery

Before writing tests, scan your system to extract everything testable.

### 3.1 Web discovery

```bash
# Install Playwright if not already
npm install playwright

# Scan your app (generates discovery-report.json)
node scripts/discovery/discover-web-ui.js https://your-app.com/login discovery-login.json
node scripts/discovery/discover-web-ui.js https://your-app.com/dashboard discovery-dashboard.json

# Or paste the discoverUI() function into browser DevTools on each page
```

**What you get:** all `data-test-id` attributes, forms with field names/types/labels, buttons, links, ARIA roles, tables, modals — with CSS selectors ready to use.

### 3.2 Mobile discovery

```bash
# Start Appium server
appium &

# Scan Android
python scripts/discovery/discover-mobile-app.py --platform android --output android-report.json

# Scan iOS
python scripts/discovery/discover-mobile-app.py --platform ios --output ios-report.json
```

**What you get:** all resource-ids (Android), accessibility identifiers (iOS), view hierarchy, visible text, clickable elements.

### 3.3 API discovery

```bash
# Scan API (finds OpenAPI spec or probes common paths)
./scripts/discovery/discover-api.sh https://your-api.com api-report.json
```

**What you get:** all endpoints with methods, parameters, request/response schemas (from OpenAPI), or reachable paths with status codes (from probing).

### 3.4 WireMock discovery (if you have existing mocks)

```bash
./scripts/discovery/discover-wiremock.sh ./mappings wiremock-report.json
```

---

## Phase 4: Set up the template

```bash
# 1. Copy the template to your project
cp -r e2e-templates/web/playwright-bdd-typescript ./my-project-e2e

# 2. Configure environment
cd my-project-e2e
cp .env.example .env
# Edit .env with your system's URLs, credentials, etc.

# 3. Install dependencies
npm install          # Node.js templates
# or
pip install -r requirements.txt  # Python templates
# or
mvn install          # Java templates
# or
dotnet restore       # C# templates

# 4. Verify setup works
npm test             # should run the example smoke test
```

---

## Phase 5: Implement tests

### 5.1 Feed discovery to AI

Take the discovery report + the template's `AI_CONTEXT.md` and give them to your AI assistant:

```
I'm implementing E2E tests for our corporate portal.

System profile: <paste SYSTEM_PROFILE.md>
Discovery report: <paste discovery-report.json>
Template context: <paste AI_CONTEXT.md>

Generate:
1. Page objects for all discovered pages
2. Selectors file from all data-test-id attributes found
3. Feature files covering login, dashboard navigation, and form submissions
4. Step definitions for all features
```

### 5.2 Implementation order

Follow this order for the most efficient implementation:

1. **Selectors/elements** — Map all discovered selectors into the template's selector file
2. **Page objects** — One per page/screen, using the selectors
3. **Auth/login flow** — Get login working first (everything depends on it)
4. **Smoke tests** — Basic navigation: can you reach each page?
5. **Happy path tests** — Core business flows end-to-end
6. **Negative tests** — Error handling, validation, edge cases
7. **Data-driven tests** — Same flow with different inputs

### 5.3 Test naming conventions

```
Feature: Login
  Scenario: Successful login with valid credentials        ← happy path
  Scenario: Login fails with invalid password              ← negative
  Scenario: Login fails with empty fields                  ← validation
  Scenario: Login redirects to dashboard after success     ← navigation
  Scenario: Login shows MFA prompt for production          ← conditional
```

---

## Phase 6: CI/CD integration

### GitHub Actions (example)

```yaml
name: E2E Tests
on:
  push:
    branches: [main, develop]
  pull_request:

jobs:
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npm test
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: test-results
          path: |
            reports/
            screenshots/
```

---

## Phase 7: Maintain

### When the UI changes

1. Re-run discovery: `node scripts/discovery/discover-web-ui.js https://your-app.com report.json`
2. Diff with previous report to find changed selectors
3. Update selectors file and page objects
4. Run tests to verify

### When APIs change

1. Re-run: `./scripts/discovery/discover-api.sh https://your-api.com new-report.json`
2. Compare endpoints with existing tests
3. Update or add test cases

### When tests become flaky

1. Run in headed mode to observe
2. Check for timing issues (add waits for dynamic content)
3. Check for test data pollution (enable test isolation)
4. Tag as `@flaky` and investigate root cause

---

## Checklist

Use this checklist when implementing a new template:

- [ ] System profile documented (`SYSTEM_PROFILE.md`)
- [ ] Template chosen based on tech stack and needs
- [ ] Discovery scripts run against target system
- [ ] `.env` configured with correct URLs and credentials
- [ ] Dependencies installed and example test passes
- [ ] Selectors/elements mapped from discovery report
- [ ] Page objects created for key pages
- [ ] Login/auth flow working
- [ ] Smoke tests passing
- [ ] Happy path tests for core flows
- [ ] Negative/edge case tests
- [ ] CI/CD pipeline configured
- [ ] Test reports accessible (HTML, screenshots, videos)
- [ ] Team knows how to run tests locally
