# Discovery Scripts

Scripts that scan your target system and extract everything needed to write tests. Run these before implementing test cases — feed the output to your AI assistant or use it as reference.

## Available Scripts

| Script | What it scans | Output |
|--------|--------------|--------|
| `discover-web-ui.js` | Web pages | Selectors, forms, buttons, links, ARIA, tables |
| `discover-mobile-app.py` | Mobile apps (Android/iOS) | Resource IDs, accessibility IDs, view hierarchy |
| `discover-api.sh` | REST APIs | Endpoints from OpenAPI spec + probing |
| `discover-wiremock.sh` | WireMock mappings | Stub summary, methods, URLs |

## Usage

### Web UI Discovery

```bash
# CLI (requires playwright installed)
node discover-web-ui.js https://your-app.com discovery-report.json

# Or paste the discoverUI() function into browser DevTools console
```

### Mobile App Discovery

```bash
# Requires: Appium server running + device connected
python discover-mobile-app.py --platform android --output report.json
python discover-mobile-app.py --platform ios --output report.json
```

### API Discovery

```bash
# Requires: curl, jq
./discover-api.sh http://localhost:3000 api-report.json
```

### WireMock Discovery

```bash
./discover-wiremock.sh ./mappings wiremock-report.json
```

## Feeding output to AI

The JSON reports are structured for AI consumption. Example prompt:

```
Here is the discovery report for our web app: <paste JSON>
Using the playwright-bdd-typescript template, generate test cases
covering all forms, buttons, and navigation flows found in the report.
```
