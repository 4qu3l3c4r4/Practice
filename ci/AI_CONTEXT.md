# AI Context — CI/CD Pipeline Templates

> This file is designed to be read by AI assistants (Kiro, Cursor, Copilot, Claude, ChatGPT, etc.) to help set up CI/CD for test templates.

## Purpose

Ready-to-use CI/CD pipeline configurations for running any test template in continuous integration. Covers GitHub Actions, GitLab CI, Azure DevOps, and Jenkins.

## Available pipelines

```
ci/
├── github-actions/
│   ├── node-e2e.yml       # Playwright, Cypress, Supertest, Newman
│   ├── python-e2e.yml     # Selenium-Python, pytest-requests, Robot Framework
│   ├── java-e2e.yml       # Selenium-Java, REST Assured, Karate
│   ├── dotnet-e2e.yml     # Playwright C#, Selenium C#
│   └── load-test.yml      # k6, Artillery (manual trigger)
├── gitlab-ci/
│   └── .gitlab-ci.yml     # All languages in one file (pick relevant jobs)
├── azure-devops/
│   └── azure-pipelines.yml # All languages as stages
└── jenkins/
    └── Jenkinsfile         # All languages as stages (uncomment needed)
```

## How to integrate with a template

Given a template and CI provider, the AI should:

1. Identify the template's language (check for `package.json` → Node.js, `requirements.txt` → Python, `pom.xml` → Java, `*.csproj` → .NET)
2. Copy the matching pipeline file to the project root
3. Adjust the test command to match the template's `npm test` / `pytest` / `mvn test` / `dotnet test`
4. Set environment variables for `BASE_URL`, `UI_USERNAME`, `UI_PASSWORD`
5. Add artifact paths for reports and screenshots

## Key patterns per provider

### GitHub Actions
```yaml
- uses: actions/upload-artifact@v4
  if: always()                    # upload even on failure
  with:
    name: test-results
    path: reports/
```

### GitLab CI
```yaml
artifacts:
  when: always
  paths: [reports/]
  reports:
    junit: reports/results.xml    # integrates with MR widget
```

### Azure DevOps
```yaml
- task: PublishTestResults@2
  condition: always()
  inputs:
    testResultsFormat: JUnit
    testResultsFiles: 'reports/*.xml'
```

### Jenkins
```groovy
post {
    always { junit 'reports/*.xml' }
}
```

## Required secrets

All pipelines expect these secrets/variables:

| Variable | Description |
|----------|-------------|
| `BASE_URL` | Target application URL |
| `UI_USERNAME` | Test user credentials |
| `UI_PASSWORD` | Test user credentials |

## Rules

- Always upload artifacts on failure (screenshots, reports)
- Use JUnit XML format for test result integration
- Set timeouts (30 min default)
- Load tests should be manual trigger only (never on every push)
- Never store credentials in pipeline files — use secrets/variables
