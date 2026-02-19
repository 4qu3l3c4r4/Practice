#!/usr/bin/env bash
# WireMock Mapping Discovery Script
#
# Scans WireMock mappings directory and generates a summary of all stubs.
#
# Usage:
#   ./discover-wiremock.sh [mappings_dir] [output_file]
#   ./discover-wiremock.sh ./mappings
#   ./discover-wiremock.sh ./mappings wiremock-discovery.json

set -euo pipefail

MAPPINGS_DIR="${1:-./mappings}"
OUTPUT="${2:-wiremock-discovery.json}"

if [ ! -d "$MAPPINGS_DIR" ]; then
  echo "Error: ${MAPPINGS_DIR} not found" >&2
  exit 1
fi

echo "Scanning WireMock mappings in ${MAPPINGS_DIR}..."

STUBS='[]'
for f in "$MAPPINGS_DIR"/*.json; do
  [ -f "$f" ] || continue
  STUB=$(jq '{
    file: input_filename | split("/") | last,
    method: .request.method,
    url: (.request.url // .request.urlPattern // .request.urlPath // "unknown"),
    status: .response.status,
    hasBodyPatterns: (.request.bodyPatterns != null),
    hasHeaders: (.request.headers != null),
    priority: (.priority // null),
    scenario: (.scenarioName // null),
  }' --arg f "$f" "$f" 2>/dev/null || echo '{"file":"'$(basename "$f")'","error":"parse_failed"}')
  STUBS=$(echo "$STUBS" | jq --argjson s "$STUB" '. + [$s]')
done

COUNT=$(echo "$STUBS" | jq 'length')
METHODS=$(echo "$STUBS" | jq '[.[].method // empty] | group_by(.) | map({(.[0]): length}) | add // {}')
URLS=$(echo "$STUBS" | jq '[.[].url // empty] | unique')

jq -n \
  --arg dir "$MAPPINGS_DIR" \
  --arg ts "$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
  --argjson count "$COUNT" \
  --argjson methods "$METHODS" \
  --argjson urls "$URLS" \
  --argjson stubs "$STUBS" \
  '{
    mappingsDir: $dir,
    timestamp: $ts,
    totalStubs: $count,
    methodBreakdown: $methods,
    uniqueUrls: $urls,
    stubs: $stubs
  }' > "$OUTPUT"

echo "Report saved to ${OUTPUT}"
echo "  Total stubs: ${COUNT}"
echo "  Methods: $(echo "$METHODS" | jq -c '.')"
