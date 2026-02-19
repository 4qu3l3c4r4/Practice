#!/usr/bin/env bash
# API Discovery Script
#
# Discovers API endpoints from:
# 1. OpenAPI/Swagger spec (if available)
# 2. Live crawling common paths
# 3. HAR file parsing
#
# Usage:
#   ./discover-api.sh <base_url> [output_file]
#   ./discover-api.sh http://localhost:3000
#   ./discover-api.sh http://localhost:3000 api-discovery.json
#
# Requires: curl, jq

set -euo pipefail

BASE_URL="${1:?Usage: $0 <base_url> [output_file]}"
OUTPUT="${2:-api-discovery.json}"
BASE_URL="${BASE_URL%/}"

echo "Discovering API at ${BASE_URL}..."

ENDPOINTS='[]'
OPENAPI_FOUND=false

# 1. Try OpenAPI/Swagger spec
for path in /openapi.json /swagger.json /api-docs /v3/api-docs /api/swagger.json /docs/openapi.json; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "${BASE_URL}${path}" 2>/dev/null || echo "000")
  if [ "$STATUS" = "200" ]; then
    echo "  Found OpenAPI spec at ${path}"
    SPEC=$(curl -s "${BASE_URL}${path}")
    ENDPOINTS=$(echo "$SPEC" | jq -r '
      [.paths | to_entries[] | .key as $path |
       .value | to_entries[] | select(.key | test("get|post|put|patch|delete")) |
       {
         path: $path,
         method: .key | ascii_upcase,
         summary: (.value.summary // ""),
         parameters: [(.value.parameters // [])[] | {name: .name, in: .in, required: (.required // false)}],
         requestBody: (.value.requestBody.content["application/json"].schema // null),
         responses: [.value.responses | to_entries[] | {status: .key, description: (.value.description // "")}]
       }
      ]' 2>/dev/null || echo '[]')
    OPENAPI_FOUND=true
    break
  fi
done

# 2. Probe common endpoints
PROBED='[]'
COMMON_PATHS=(
  "/api/health" "/health" "/healthz" "/api/status"
  "/api/users" "/api/v1/users"
  "/api/auth/login" "/api/login" "/login"
  "/api/me" "/api/profile"
)

for path in "${COMMON_PATHS[@]}"; do
  RESULT=$(curl -s -o /dev/null -w '{"status":%{http_code},"time":%{time_total}}' "${BASE_URL}${path}" 2>/dev/null || echo '{"status":0,"time":0}')
  STATUS=$(echo "$RESULT" | jq -r '.status')
  TIME=$(echo "$RESULT" | jq -r '.time')
  if [ "$STATUS" != "0" ] && [ "$STATUS" != "000" ]; then
    PROBED=$(echo "$PROBED" | jq --arg p "$path" --arg s "$STATUS" --arg t "$TIME" \
      '. + [{path: $p, status: ($s|tonumber), responseTime: ($t|tonumber)}]')
  fi
done

# 3. Build report
jq -n \
  --arg url "$BASE_URL" \
  --arg ts "$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
  --argjson openapi "$OPENAPI_FOUND" \
  --argjson endpoints "$ENDPOINTS" \
  --argjson probed "$PROBED" \
  '{
    baseUrl: $url,
    timestamp: $ts,
    openapiSpecFound: $openapi,
    endpoints: $endpoints,
    probedPaths: $probed
  }' > "$OUTPUT"

echo "Report saved to ${OUTPUT}"
ENDPOINT_COUNT=$(echo "$ENDPOINTS" | jq 'length')
PROBED_COUNT=$(echo "$PROBED" | jq 'length')
echo "  OpenAPI endpoints: ${ENDPOINT_COUNT}"
echo "  Probed paths: ${PROBED_COUNT}"
