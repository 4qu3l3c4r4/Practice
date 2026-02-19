#!/usr/bin/env bash
# Robot Framework discovery script
# Scans target URL and generates Robot-friendly selectors + test skeleton
#
# Usage: ./discover.sh <target_url> [output_dir]

set -euo pipefail

TARGET_URL="${1:?Usage: $0 <target_url> [output_dir]}"
OUTPUT_DIR="${2:-./discovery-output}"
SCRIPTS_DIR="$(cd "$(dirname "$0")" && cd ../../scripts/discovery 2>/dev/null && pwd || echo "../../scripts/discovery")"

mkdir -p "$OUTPUT_DIR"

echo "=== Robot Framework Discovery ==="
echo "Target: ${TARGET_URL}"
echo ""

if command -v node &>/dev/null && [ -f "$SCRIPTS_DIR/discover-web-ui.js" ]; then
  echo "[1/3] Scanning UI..."
  node "$SCRIPTS_DIR/discover-web-ui.js" "$TARGET_URL" "$OUTPUT_DIR/ui-discovery.json"

  echo "[2/3] Generating Robot variables file..."
  node -e "
    const r = require('./$OUTPUT_DIR/ui-discovery.json');
    const lines = ['*** Variables ***', '# Auto-generated from discovery scan of ${TARGET_URL}', ''];
    const seen = new Set();
    (r.testAttributes||[]).forEach(a => {
      const name = a.value.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase();
      if (!seen.has(name)) {
        seen.add(name);
        lines.push('\${LOC_' + name + '}    css:' + a.selector);
      }
    });
    (r.forms||[]).forEach(f => {
      f.fields.forEach(field => {
        if (field.selector && field.name) {
          const name = field.name.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase();
          if (!seen.has(name)) {
            seen.add(name);
            lines.push('\${LOC_' + name + '}    css:' + field.selector);
          }
        }
      });
    });
    require('fs').writeFileSync('$OUTPUT_DIR/discovered_locators.robot', lines.join('\n'));
    console.log('  Generated $OUTPUT_DIR/discovered_locators.robot (' + seen.size + ' locators)');
  " 2>/dev/null || echo "  Could not generate Robot variables"

  echo "[3/3] Generating test skeleton..."
  node -e "
    const r = require('./$OUTPUT_DIR/ui-discovery.json');
    const lines = [
      '*** Settings ***',
      'Library    SeleniumLibrary',
      'Variables  ../variables/env.py',
      'Resource   ../resources/keywords.robot',
      'Test Setup    Open Browser To Login Page',
      'Test Teardown    Close Browser',
      '',
      '*** Test Cases ***',
      '# Auto-generated from discovery scan',
      '',
    ];
    (r.forms||[]).forEach((f, i) => {
      lines.push('Submit ' + (f.id || 'Form ' + i));
      lines.push('    [Tags]    discovered    regression');
      lines.push('    [Documentation]    Auto-discovered form with ' + f.fields.length + ' fields');
      f.fields.forEach(field => {
        if (field.type === 'submit' || !field.selector) return;
        const label = field.label || field.name || field.type;
        if (field.tag === 'select') {
          lines.push('    Select From List By Value    css:' + field.selector + '    test-value');
        } else {
          lines.push('    Input Text    css:' + field.selector + '    test-value    # ' + label);
        }
      });
      lines.push('    Click Button    css:button[type=\"submit\"]');
      lines.push('    # TODO: Add expected result verification');
      lines.push('');
    });
    (r.buttons||[]).filter(b => b.text && b.visible && b.text.length < 50).slice(0, 10).forEach(b => {
      lines.push('Click ' + b.text.trim().replace(/\\s+/g, ' '));
      lines.push('    [Tags]    discovered    smoke');
      if (b.selector) {
        lines.push('    Click Element    css:' + b.selector);
      } else {
        lines.push('    Click Element    xpath://button[contains(text(),\"' + b.text.trim().substring(0,30) + '\")]');
      }
      lines.push('    # TODO: Add expected result verification');
      lines.push('');
    });
    require('fs').writeFileSync('$OUTPUT_DIR/discovered_tests.robot', lines.join('\n'));
    console.log('  Generated $OUTPUT_DIR/discovered_tests.robot');
  " 2>/dev/null || echo "  Could not generate test skeleton"
else
  echo "Node.js not found. Manual alternative:"
  echo "  1. Open ${TARGET_URL} in browser DevTools"
  echo "  2. Paste scripts/discovery/discover-web-ui.js"
  echo "  3. Run: JSON.stringify(discoverUI(), null, 2)"
fi

echo ""
echo "Done! Output in ${OUTPUT_DIR}/"
echo ""
echo "Next steps:"
echo "  1. Review discovered_locators.robot → copy to variables/"
echo "  2. Review discovered_tests.robot → copy to tests/"
echo "  3. Feed all files + AI_CONTEXT.md to your AI assistant"
