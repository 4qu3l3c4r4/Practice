# CI/CD Pipeline Templates

Ready-to-use pipeline configurations for running E2E tests in CI. Each provider has pipelines for all language stacks (Node.js, Python, Java, .NET).

## Providers

| Provider | File | Format |
|----------|------|--------|
| GitHub Actions | `github-actions/*.yml` | YAML workflows |
| GitLab CI | `gitlab-ci/.gitlab-ci.yml` | YAML pipeline |
| Azure DevOps | `azure-devops/azure-pipelines.yml` | YAML pipeline |
| Jenkins | `jenkins/Jenkinsfile` | Groovy pipeline |

## Pipelines per language

| Language | Templates covered |
|----------|------------------|
| Node.js | Playwright, Cypress, WebdriverIO, TestCafe, Supertest, Newman |
| Python | Selenium, Playwright-Python, pytest-requests, Robot Framework |
| Java | Selenium, Playwright-Java, REST Assured, Karate, Appium |
| .NET | Playwright C#, Selenium C#, Appium C# |
| Load test | k6, Artillery (manual trigger) |

## How to use

1. Pick your CI provider folder
2. Copy the relevant pipeline file to your project root
3. Uncomment the stage matching your template's language
4. Set secrets/variables: `BASE_URL`, `UI_USERNAME`, `UI_PASSWORD`
5. Push — pipeline runs automatically

## Secrets setup

| Provider | Where to set |
|----------|-------------|
| GitHub Actions | Settings → Secrets and variables → Actions |
| GitLab CI | Settings → CI/CD → Variables |
| Azure DevOps | Pipelines → Library → Variable groups |
| Jenkins | Manage Jenkins → Credentials |

## Common patterns

- Tests run on `push` to main/develop and on PRs
- 30-minute timeout
- Artifacts (reports, screenshots) uploaded on success and failure
- JUnit XML for test result integration
- Load tests are manual trigger only
