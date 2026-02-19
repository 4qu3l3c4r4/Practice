#!/usr/bin/env bash
# API template discovery script
# Finds endpoints from OpenAPI spec or by probing
#
# Usage: ./discover.sh <base_url> [output_dir]

set -euo pipefail

BASE_URL="${1:?Usage: $0 <base_url> [output_dir]}"
OUTPUT_DIR="${2:-./discovery-output}"
SCRIPTS_DIR="$(cd "$(dirname "$0")" && cd ../../scripts/discovery 2>/dev/null && pwd || echo "../../scripts/discovery")"

mkdir -p "$OUTPUT_DIR"

echo "=== API Discovery ==="
echo "Target: ${BASE_URL}"
echo ""

if [ -f "$SCRIPTS_DIR/discover-api.sh" ]; then
  bash "$SCRIPTS_DIR/discover-api.sh" "$BASE_URL" "$OUTPUT_DIR/api-discovery.json"
else
  echo "discover-api.sh not found. Requires: curl, jq"
fi

echo ""
echo "Done! Feed $OUTPUT_DIR/ + AI_CONTEXT.md to your AI assistant."
