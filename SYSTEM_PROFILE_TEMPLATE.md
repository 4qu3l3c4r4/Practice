# System Profile Template

> Copy this file to your project root and fill it out. Your AI assistant will use it to generate accurate test code.

## Application

- **Name:**
- **Type:** web | mobile | API | all
- **Tech stack:**
- **Base URLs:**
  - DEV:
  - TST:
  - ACC:
  - PRD:

## Authentication

- **Method:** username/password | SSO | OAuth2 | API key | MFA | none
- **Login URL:**
- **Test credentials location:** .env file | secrets manager | shared doc

## Web (if applicable)

- **Selector strategy:** data-test-id | data-testid | data-cy | CSS | none
- **SPA or MPA:**
- **Key pages:**
  - [ ] Login
  - [ ] Dashboard
  - [ ] (add more)
- **Shadow DOM:** yes | no
- **Iframes:** yes | no
- **File upload/download:** yes | no

## Mobile (if applicable)

- **Platforms:** Android | iOS | both
- **App type:** native | hybrid | React Native | Flutter
- **Android package:**
- **Android activity:**
- **iOS bundle ID:**
- **Min versions:** Android SDK __ / iOS __

## API (if applicable)

- **Style:** REST | GraphQL | gRPC | SOAP
- **OpenAPI spec URL:**
- **Auth header:** Authorization: Bearer | X-API-Key | other
- **Key endpoints:**
  -
  -

## Infrastructure

- **CI/CD:** GitHub Actions | Jenkins | GitLab CI | other
- **Environments:** dev / tst / acc / prd
- **Hosting:** AWS | Azure | GCP | on-prem

## Test data

- **Source:** static fixtures | DB seeding | API | WireMock
- **Cleanup:** automatic | manual | isolated env
- **External deps to mock:**
  -

## Performance requirements (if applicable)

- **Response time SLA:** p95 < ___ms
- **Concurrent users target:**
- **Error rate threshold:** < ___%
