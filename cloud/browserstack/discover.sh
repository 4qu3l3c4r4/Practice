#!/usr/bin/env bash
# BrowserStack discovery — lists available browsers and devices for your account
#
# Usage: ./discover.sh [output_dir]

set -euo pipefail

OUTPUT_DIR="${1:-./discovery-output}"
mkdir -p "$OUTPUT_DIR"

: "${BROWSERSTACK_USERNAME:?Set BROWSERSTACK_USERNAME in .env}"
: "${BROWSERSTACK_ACCESS_KEY:?Set BROWSERSTACK_ACCESS_KEY in .env}"

AUTH="${BROWSERSTACK_USERNAME}:${BROWSERSTACK_ACCESS_KEY}"

echo "=== BrowserStack Discovery ==="
echo ""

echo "[1/3] Fetching available browsers..."
curl -s -u "$AUTH" "https://api.browserstack.com/automate/browsers.json" > "$OUTPUT_DIR/browsers.json"
COUNT=$(jq 'length' "$OUTPUT_DIR/browsers.json")
echo "  $COUNT browser configurations saved"

echo "[2/3] Fetching available devices..."
curl -s -u "$AUTH" "https://api-cloud.browserstack.com/app-automate/devices.json" > "$OUTPUT_DIR/devices.json"
COUNT=$(jq 'length' "$OUTPUT_DIR/devices.json")
echo "  $COUNT device configurations saved"

echo "[3/3] Fetching account plan..."
curl -s -u "$AUTH" "https://api.browserstack.com/automate/plan.json" > "$OUTPUT_DIR/plan.json"
jq '.' "$OUTPUT_DIR/plan.json"

echo ""
echo "Done! Output in ${OUTPUT_DIR}/"
echo "Feed browsers.json + devices.json + AI_CONTEXT.md to your AI assistant"
echo "to generate cross-browser/cross-device test configurations."
