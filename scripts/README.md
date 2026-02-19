# Shared Scripts

## Discovery Scripts (`discovery/`)

Scripts that scan your target system and extract everything needed to write tests. Run these before implementing test cases — feed the output JSON to your AI assistant.

| Script | Scans | Extracts |
|--------|-------|----------|
| `discover-web-ui.js` | Web pages | Selectors, data-test-id, forms, buttons, links, ARIA, tables, modals |
| `discover-mobile-app.py` | Mobile apps | Resource IDs (Android), accessibility IDs (iOS), view hierarchy, visible text |
| `discover-api.sh` | REST APIs | Endpoints from OpenAPI/Swagger spec + common path probing |
| `discover-wiremock.sh` | WireMock mappings | Stub summary, methods, URLs, body patterns |

### Quick usage

```bash
# Web — scan a page, get all selectors
node discovery/discover-web-ui.js https://your-app.com report.json

# Mobile — scan running app via Appium
python discovery/discover-mobile-app.py --platform android

# API — find all endpoints
./discovery/discover-api.sh http://localhost:3000

# WireMock — summarize existing stubs
./discovery/discover-wiremock.sh ./mappings
```

### Feeding to AI

```
Here is the discovery report: <paste JSON>
Using the playwright-bdd-typescript template, generate test cases for all forms and buttons.
```

## DOM Verification (`verify-dom-structure.js`)

Browser console script to verify test selectors exist on the page. Paste into DevTools.

```javascript
DOMVerifier.runCompleteVerification();
DOMVerifier.findAllTestAttributes();
checkSelector('[data-test-id="MyComponent"]');
```

## AI Context Files

Every template includes an `AI_CONTEXT.md` file designed for LLM consumption. It contains:
- Tech stack and architecture
- Code patterns with examples
- Available commands
- Discovery workflow (which script to run, how to use the output)
- Rules and conventions

Point your AI assistant to `<template>/AI_CONTEXT.md` when starting implementation.
