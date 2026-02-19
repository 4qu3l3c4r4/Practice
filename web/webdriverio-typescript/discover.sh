#!/usr/bin/env bash
# Web template discovery script
# Scans target URL and generates selectors + test skeletons
#
# Usage: ./discover.sh <target_url> [output_dir]

set -euo pipefail

TARGET_URL="${1:?Usage: $0 <target_url> [output_dir]}"
OUTPUT_DIR="${2:-./discovery-output}"
SCRIPTS_DIR="$(cd "$(dirname "$0")" && cd ../../scripts/discovery 2>/dev/null && pwd || echo "../../scripts/discovery")"

mkdir -p "$OUTPUT_DIR"

echo "=== Web UI Discovery ==="
echo "Target: ${TARGET_URL}"
echo ""

if command -v node &>/dev/null && [ -f "$SCRIPTS_DIR/discover-web-ui.js" ]; then
  echo "[1/2] Scanning UI..."
  node "$SCRIPTS_DIR/discover-web-ui.js" "$TARGET_URL" "$OUTPUT_DIR/ui-discovery.json"

  echo "[2/2] Generating selector map..."
  node -e "
    const r = require('./$OUTPUT_DIR/ui-discovery.json');
    const s = (r.testAttributes||[]).map(a => a.selector);
    const f = (r.forms||[]).flatMap(f => f.fields.filter(x=>x.selector).map(x=>x.selector));
    const all = [...new Set([...s, ...f])];
    require('fs').writeFileSync('$OUTPUT_DIR/selectors.txt', all.join('\n'));
    console.log('  ' + all.length + ' selectors written to $OUTPUT_DIR/selectors.txt');
  " 2>/dev/null || echo "  Could not extract selectors"
else
  echo "Node.js not found. Manual alternative:"
  echo "  1. Open ${TARGET_URL} in browser"
  echo "  2. Open DevTools console"
  echo "  3. Paste contents of scripts/discovery/discover-web-ui.js"
  echo "  4. Run: JSON.stringify(discoverUI(), null, 2)"
  echo "  5. Save output to $OUTPUT_DIR/ui-discovery.json"
fi

echo ""
echo "Done! Feed $OUTPUT_DIR/ + AI_CONTEXT.md to your AI assistant."
