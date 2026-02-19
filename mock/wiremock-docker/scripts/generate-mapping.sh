#!/usr/bin/env bash
# Generate a new WireMock mapping stub
# Usage: ./generate-mapping.sh <method> <url> <name>
# Example: ./generate-mapping.sh GET /api/products get-products

set -euo pipefail

METHOD="${1:?Usage: $0 <METHOD> <URL> <NAME>}"
URL="${2:?Usage: $0 <METHOD> <URL> <NAME>}"
NAME="${3:?Usage: $0 <METHOD> <URL> <NAME>}"

FILE="mappings/${NAME}.json"

if [ -f "$FILE" ]; then
  echo "Error: $FILE already exists" >&2
  exit 1
fi

cat > "$FILE" <<EOF
{
  "request": {
    "method": "${METHOD}",
    "url": "${URL}"
  },
  "response": {
    "status": 200,
    "headers": { "Content-Type": "application/json" },
    "jsonBody": {}
  }
}
EOF

echo "Created $FILE"
