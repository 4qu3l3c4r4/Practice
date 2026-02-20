# New Templates Added

## ✅ Flutter Integration Test Template

**Location:** `mobile/flutter-integration-test/`

**Purpose:** E2E testing for Flutter mobile apps using Flutter's official integration_test package

**Key Features:**
- Native Flutter testing with integration_test package
- Supports Android & iOS
- Discovery script extracts all Key() declarations from Dart code
- Page Object pattern support
- AI_CONTEXT.md for LLM-assisted test generation

**Quick Start:**
```bash
cd mobile/flutter-integration-test
cp .env.example .env
flutter pub get
flutter test integration_test/
```

**Discovery:**
```bash
./discover.sh
# Outputs: discovery-output/keys.txt
```

---

## ✅ OutSystems Web Testing Template

**Location:** `low-code/outsystems-web/`

**Purpose:** E2E testing for OutSystems web applications using Playwright + TypeScript

**Key Features:**
- Playwright-based testing for OutSystems apps
- OutSystems-specific selector patterns (wt* IDs)
- Helper utilities for OutSystems widget discovery
- Suffix-based selectors for deployment stability
- Page Object pattern with BasePage
- AI_CONTEXT.md with OutSystems ID patterns

**Quick Start:**
```bash
cd low-code/outsystems-web
cp .env.example .env
npm install
npx playwright install
npm test
```

**Discovery:**
```bash
./discover.sh https://your-app.outsystemscloud.com
# Outputs: discovery-output/outsystems-elements.json
```

---

## Updated Files

- `README.md` — Added Flutter and OutSystems to decision table and directory structure

## Template Structure

Both templates follow the established pattern:
- ✅ AI_CONTEXT.md (LLM-readable context)
- ✅ discover.sh (element discovery script)
- ✅ README.md (human-readable setup)
- ✅ .env.example (configuration template)
- ✅ .gitignore (ignore patterns)
- ✅ Sample test files
- ✅ Page Object / utility patterns

## Next Steps

1. Test the templates with real Flutter/OutSystems apps
2. Add GitHub Actions workflows (.github/workflows/)
3. Consider adding Patrol as alternative Flutter testing option
4. Add OutSystems mobile app template (using Appium)
