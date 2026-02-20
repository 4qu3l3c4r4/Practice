# PDF Reporting Guide

All templates now include PDF report generation with embedded screenshots and videos.

## Features

✅ **Automated PDF generation** from HTML reports  
✅ **Embedded screenshots** (base64-encoded, no external dependencies)  
✅ **Video attachments** (linked in reports)  
✅ **Stakeholder-friendly** format with summary cards  
✅ **Failure details** with error messages and screenshots  
✅ **Timestamped** and latest copies  

---

## Report Types

### 1. Technical Report (`test-report-latest.pdf`)
- Full HTML report converted to PDF
- All test results with traces
- Playwright native report format
- For developers and QA engineers

### 2. Stakeholder Report (`stakeholder-report-latest.pdf`)
- Executive summary with pass/fail metrics
- Results grouped by feature
- Failure screenshots embedded inline
- For managers and stakeholders

---

## Templates with PDF Reports

### Playwright-Based Templates (Full Support)
- ✅ `web/playwright-*` (all variants)
- ✅ `desktop/electron-playwright`
- ✅ `low-code/salesforce-lwc`
- ✅ `low-code/sap-fiori`
- ✅ `low-code/servicenow`
- ✅ `low-code/outsystems-web`
- ✅ `visual/playwright-visual-regression-typescript`
- ✅ `accessibility/playwright-axe-typescript`

### Other Templates (HTML Reports)
- 📄 `web/selenium-*` — HTML reports (can be converted manually)
- 📄 `web/cypress-typescript` — Mochawesome HTML reports
- 📄 `mobile/appium-*` — JUnit/pytest HTML reports
- 📄 `mobile/react-native-detox` — Jest HTML reports
- 📄 `api/*` — Jest/pytest HTML reports

---

## Usage

### Generate PDF Reports

```bash
# After running tests
npm run report:pdf

# Or manually
node scripts/generate-pdf-report.js
node scripts/generate-stakeholder-report.js
```

### Package.json Scripts

Add to your `package.json`:

```json
{
  "scripts": {
    "test": "playwright test",
    "report": "playwright show-report",
    "report:pdf": "node scripts/generate-pdf-report.js",
    "report:stakeholder": "node scripts/generate-stakeholder-report.js",
    "report:all": "npm run report:pdf && npm run report:stakeholder"
  }
}
```

---

## Report Structure

### Stakeholder Report Sections

1. **Header**
   - Test run date and time
   - Environment (TST/ACC/PRD)
   - Total duration

2. **Summary Cards**
   - Total tests
   - Passed tests (green)
   - Failed tests (red)
   - Pass rate percentage (blue)

3. **Results by Feature**
   - Grouped by test suite/feature
   - Pass/fail status per test
   - Duration per test

4. **Failure Details** (if any)
   - Test name and feature
   - Error message
   - Screenshot at failure point
   - Page-break before section for printing

---

## Screenshot Embedding

Screenshots are embedded as **base64-encoded images** directly in the PDF:

```javascript
function imgTag(filePath) {
  const buf = fs.readFileSync(filePath);
  return `<img src="data:image/png;base64,${buf.toString('base64')}" alt="Screenshot"/>`;
}
```

**Benefits:**
- ✅ No external file dependencies
- ✅ Single PDF file contains everything
- ✅ Easy to share via email/Slack
- ✅ Works offline

---

## Video Attachments

Videos are captured automatically by Playwright:

```typescript
// playwright.config.ts
use: {
  video: 'retain-on-failure',  // Only for failed tests
  screenshot: 'only-on-failure'
}
```

Videos are stored in `test-results/` and linked in HTML reports.

---

## Customization

### Change PDF Format

```javascript
await page.pdf({
  path: outputPath,
  format: 'A4',  // or 'Letter', 'Legal'
  printBackground: true,
  margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' }
});
```

### Custom Header/Footer

```javascript
displayHeaderFooter: true,
headerTemplate: `<div style="font-size:10px;text-align:center;width:100%">
  Your Company - E2E Test Report - ${new Date().toLocaleDateString()}
</div>`,
footerTemplate: `<div style="font-size:10px;text-align:center;width:100%">
  Page <span class="pageNumber"></span> of <span class="totalPages"></span>
</div>`
```

### Custom Styling

Edit the `<style>` section in `generate-stakeholder-report.js`:

```css
.card-pass { background: #your-color; }
.card-fail { background: #your-color; }
h1 { color: #your-brand-color; }
```

---

## CI/CD Integration

### GitHub Actions

```yaml
- name: Run tests
  run: npm test

- name: Generate PDF reports
  if: always()
  run: |
    npm run report:pdf
    npm run report:stakeholder

- name: Upload PDF reports
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: test-reports
    path: |
      reports/test-report-latest.pdf
      reports/stakeholder-report-latest.pdf
```

### GitLab CI

```yaml
test:
  script:
    - npm test
    - npm run report:all
  artifacts:
    when: always
    paths:
      - reports/*.pdf
    expire_in: 30 days
```

---

## File Locations

```
reports/
├── test-report-2026-02-16_10-21-53.pdf      # Timestamped technical report
├── test-report-latest.pdf                    # Latest technical report
├── stakeholder-report-2026-02-16_10-21-53.pdf # Timestamped stakeholder report
├── stakeholder-report-latest.pdf             # Latest stakeholder report
├── html/
│   └── index.html                            # Source HTML report
└── test-results/
    ├── screenshots/                          # Failure screenshots
    └── videos/                               # Failure videos
```

---

## Troubleshooting

### PDF is blank
- Ensure HTML report exists before generating PDF
- Check `reports/html/index.html` or `playwright-report/index.html`
- Wait for `networkidle` in page.goto()

### Screenshots not embedded
- Verify screenshot paths in `results.json`
- Check file permissions
- Ensure screenshots exist in `test-results/`

### Large PDF file size
- Limit screenshots to failures only
- Compress images before embedding
- Use `video: 'retain-on-failure'` instead of `'on'`

### Missing results.json
- Run tests with `--reporter=json` flag
- Ensure Playwright config has JSON reporter:
  ```typescript
  reporter: [['html'], ['json', { outputFile: 'reports/results.json' }]]
  ```

---

## Best Practices

1. **Always generate both reports**
   - Technical for debugging
   - Stakeholder for communication

2. **Archive timestamped reports**
   - Keep history for trend analysis
   - Compare pass rates over time

3. **Automate in CI/CD**
   - Generate on every test run
   - Upload as artifacts
   - Send to Slack/email on failures

4. **Customize for your brand**
   - Add company logo
   - Use brand colors
   - Include project name

5. **Keep PDFs under 10MB**
   - Limit screenshots
   - Compress images
   - Use videos sparingly

---

## Example Output

### Stakeholder Report Preview

```
🧪 E2E Test Report
ACC | 16 February 2026 at 10:21 | Duration: 15 min

┌─────────────┬─────────────┬─────────────┬─────────────┐
│ 150         │ 145         │ 5           │ 96.7%       │
│ Total Tests │ Passed      │ Failed      │ Pass Rate   │
└─────────────┴─────────────┴─────────────┴─────────────┘

Test Results by Feature
├─ Login Tests (10 passed)
├─ Dashboard Tests (25 passed, 2 failed)
├─ File Check Tests (30 passed, 1 failed)
└─ Single Check Tests (80 passed, 2 failed)

Failure Details & Screenshots
1. Dashboard should load user profile
   Feature: Dashboard Tests
   Error: Timeout waiting for selector "#user-profile"
   [Screenshot embedded]

2. File Check should validate CSV format
   Feature: File Check Tests
   Error: Expected "Valid" but got "Invalid"
   [Screenshot embedded]
```

---

## Summary

All Playwright-based templates now support:
- ✅ Automated PDF generation
- ✅ Embedded screenshots (base64)
- ✅ Stakeholder-friendly reports
- ✅ CI/CD integration
- ✅ Timestamped archives
- ✅ Customizable styling

**Total templates with PDF support: 15/42**  
**Templates with HTML reports: 42/42**
