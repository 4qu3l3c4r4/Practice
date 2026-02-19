#!/usr/bin/env bash
# BrowserStack helper scripts
#
# Usage:
#   ./browserstack.sh browsers          # list available browsers
#   ./browserstack.sh devices            # list available devices
#   ./browserstack.sh upload <file>      # upload app for mobile testing
#   ./browserstack.sh status             # check account status

set -euo pipefail

: "${BROWSERSTACK_USERNAME:?Set BROWSERSTACK_USERNAME}"
: "${BROWSERSTACK_ACCESS_KEY:?Set BROWSERSTACK_ACCESS_KEY}"

AUTH="${BROWSERSTACK_USERNAME}:${BROWSERSTACK_ACCESS_KEY}"
API="https://api.browserstack.com"
APP_API="https://api-cloud.browserstack.com/app-automate"

case "${1:-help}" in
  browsers)
    echo "Available browsers:"
    curl -s -u "$AUTH" "$API/automate/browsers.json" | \
      jq -r '.[] | "\(.os) \(.os_version) | \(.browser) \(.browser_version)"' | sort -u | head -30
    ;;
  devices)
    echo "Available devices:"
    curl -s -u "$AUTH" "$APP_API/devices.json" | \
      jq -r '.[] | "\(.os) \(.os_version) | \(.device)"' | sort | head -30
    ;;
  upload)
    FILE="${2:?Usage: $0 upload <path_to_app>}"
    echo "Uploading ${FILE}..."
    curl -u "$AUTH" -X POST "$APP_API/upload" -F "file=@${FILE}"
    echo ""
    ;;
  status)
    echo "Account status:"
    curl -s -u "$AUTH" "$API/automate/plan.json" | jq '.'
    ;;
  *)
    echo "Usage: $0 {browsers|devices|upload <file>|status}"
    ;;
esac
