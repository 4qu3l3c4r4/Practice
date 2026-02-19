#!/usr/bin/env bash
# Mock template discovery script
# Summarizes existing WireMock stubs + discovers real API endpoints to mock
#
# Usage: ./discover.sh [base_url] [output_dir]

set -euo pipefail

BASE_URL="${1:-}"
OUTPUT_DIR="${2:-./discovery-output}"
SCRIPTS_DIR="$(cd "$(dirname "$0")" && cd ../../scripts/discovery 2>/dev/null && pwd || echo "../../scripts/discovery")"

mkdir -p "$OUTPUT_DIR"

echo "=== Mock Discovery ==="

# Scan existing mappings
if [ -d "./mappings" ] && [ -f "$SCRIPTS_DIR/discover-wiremock.sh" ]; then
  echo "[1] Scanning existing WireMock mappings..."
  bash "$SCRIPTS_DIR/discover-wiremock.sh" ./mappings "$OUTPUT_DIR/wiremock-discovery.json"
fi

# Optionally scan real API to find endpoints that need mocking
if [ -n "$BASE_URL" ] && [ -f "$SCRIPTS_DIR/discover-api.sh" ]; then
  echo ""
  echo "[2] Scanning real API for endpoints to mock..."
  bash "$SCRIPTS_DIR/discover-api.sh" "$BASE_URL" "$OUTPUT_DIR/api-to-mock.json"
fi

echo ""
echo "Done! Feed $OUTPUT_DIR/ + AI_CONTEXT.md to your AI assistant."
