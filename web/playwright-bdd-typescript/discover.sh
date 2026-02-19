#!/usr/bin/env bash
# Template-specific discovery script
# Runs the appropriate discovery tools and outputs a report tailored for this template.
#
# Usage: ./discover.sh <target_url> [output_dir]
# Example: ./discover.sh https://your-app.com ./discovery-output

set -euo pipefail

TARGET_URL="${1:?Usage: $0 <target_url> [output_dir]}"
OUTPUT_DIR="${2:-./discovery-output}"
SCRIPTS_DIR="$(cd "$(dirname "$0")/../../scripts/discovery" 2>/dev/null && pwd || echo "../../scripts/discovery")"

mkdir -p "$OUTPUT_DIR"

echo "============================================"
echo " Web UI Discovery (Playwright BDD TypeScript)"
echo " Target: ${TARGET_URL}"
echo "============================================"
echo ""

# 1. Scan the main pages
echo "[1/3] Scanning web UI for selectors, forms, buttons..."
if command -v node &>/dev/null && [ -f "$SCRIPTS_DIR/discover-web-ui.js" ]; then
  node "$SCRIPTS_DIR/discover-web-ui.js" "$TARGET_URL" "$OUTPUT_DIR/ui-discovery.json"
else
  echo "  SKIP: node not found or discover-web-ui.js missing"
  echo "  Manual alternative: paste discoverUI() into browser DevTools on ${TARGET_URL}"
fi

# 2. Generate selector mapping for elements/common.ts
echo ""
echo "[2/3] Generating selector mapping..."
if [ -f "$OUTPUT_DIR/ui-discovery.json" ]; then
  node -e "
    const report = require('./$OUTPUT_DIR/ui-discovery.json');
    const lines = ['// Auto-generated from discovery report', '// Review and update as needed', '', 'export const selectors = {'];
    (report.testAttributes || []).forEach(a => {
      const key = a.value.replace(/[^a-zA-Z0-9]/g, '_');
      lines.push('  ' + key + ': ' + JSON.stringify(a.selector) + ',');
    });
    lines.push('};');
    require('fs').writeFileSync('$OUTPUT_DIR/selectors.ts', lines.join('\n'));
    console.log('  Generated $OUTPUT_DIR/selectors.ts (' + (report.testAttributes||[]).length + ' selectors)');
  " 2>/dev/null || echo "  Could not auto-generate selectors.ts"
fi

# 3. Generate feature file skeleton
echo ""
echo "[3/3] Generating feature file skeleton..."
if [ -f "$OUTPUT_DIR/ui-discovery.json" ]; then
  node -e "
    const report = require('./$OUTPUT_DIR/ui-discovery.json');
    const lines = ['Feature: Discovered UI flows', '  Auto-generated from discovery scan of ' + report.url, ''];
    (report.forms || []).forEach((form, i) => {
      lines.push('  Scenario: Submit form ' + (form.id || i));
      lines.push('    Given I am on the page \"' + report.url + '\"');
      form.fields.forEach(f => {
        if (f.type === 'submit') return;
        lines.push('    When I enter ' + (f.label || f.name || f.type) + ' \"test-value\"');
      });
      lines.push('    And I click the submit button');
      lines.push('    Then I should see a result');
      lines.push('');
    });
    (report.buttons || []).filter(b => b.text && b.visible).forEach(b => {
      lines.push('  Scenario: Click button \"' + b.text.substring(0,50) + '\"');
      lines.push('    Given I am on the page \"' + report.url + '\"');
      lines.push('    When I click \"' + b.text.substring(0,50) + '\"');
      lines.push('    Then I should see the expected result');
      lines.push('');
    });
    require('fs').writeFileSync('$OUTPUT_DIR/discovered-flows.feature', lines.join('\n'));
    console.log('  Generated $OUTPUT_DIR/discovered-flows.feature');
  " 2>/dev/null || echo "  Could not auto-generate feature skeleton"
fi

echo ""
echo "============================================"
echo " Discovery complete!"
echo " Output: ${OUTPUT_DIR}/"
echo ""
echo " Files generated:"
ls -la "$OUTPUT_DIR/" 2>/dev/null
echo ""
echo " Next steps:"
echo "   1. Review $OUTPUT_DIR/ui-discovery.json"
echo "   2. Copy selectors to elements/common.ts"
echo "   3. Use discovered-flows.feature as a starting point for tests/features/"
echo "   4. Feed all files to your AI assistant with AI_CONTEXT.md"
echo "============================================"
