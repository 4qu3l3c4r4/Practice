#!/bin/bash
set -e

ENDPOINT="${1:-$GRAPHQL_ENDPOINT}"

if [ -z "$ENDPOINT" ]; then
  echo "Usage: ./discover.sh <graphql-endpoint>"
  exit 1
fi

echo "🔍 Discovering GraphQL schema from $ENDPOINT..."
mkdir -p discovery-output

# Introspection query
curl -X POST "$ENDPOINT" \
  -H "Content-Type: application/json" \
  -d '{"query":"{ __schema { types { name fields { name type { name } } } } }"}' \
  | jq '.' > discovery-output/schema.json

echo "✅ Schema saved to discovery-output/schema.json"
