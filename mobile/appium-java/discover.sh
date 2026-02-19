#!/usr/bin/env bash
# Mobile template discovery script
# Scans running app via Appium and extracts element IDs
#
# Usage: ./discover.sh [--platform android|ios] [output_dir]

set -euo pipefail

PLATFORM="${1:---platform}"
if [ "$PLATFORM" = "--platform" ]; then
  PLATFORM="${2:-android}"
  OUTPUT_DIR="${3:-./discovery-output}"
else
  OUTPUT_DIR="${2:-./discovery-output}"
fi

SCRIPTS_DIR="$(cd "$(dirname "$0")" && cd ../../scripts/discovery 2>/dev/null && pwd || echo "../../scripts/discovery")"

mkdir -p "$OUTPUT_DIR"

echo "=== Mobile App Discovery (${PLATFORM}) ==="
echo ""

if command -v python3 &>/dev/null && [ -f "$SCRIPTS_DIR/discover-mobile-app.py" ]; then
  echo "Ensure Appium server is running and device/emulator is connected."
  echo ""
  python3 "$SCRIPTS_DIR/discover-mobile-app.py" --platform "$PLATFORM" --output "$OUTPUT_DIR/mobile-discovery.json"
else
  echo "Python3 not found or script missing."
  echo "Manual alternative: use Appium Inspector to browse the view hierarchy."
fi

echo ""
echo "Done! Feed $OUTPUT_DIR/ + AI_CONTEXT.md to your AI assistant."
