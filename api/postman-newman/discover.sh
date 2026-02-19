#!/usr/bin/env bash
# API discovery for Postman/Newman
# Finds endpoints and generates a Postman collection skeleton
#
# Usage: ./discover.sh <base_url> [output_dir]

set -euo pipefail

BASE_URL="${1:?Usage: $0 <base_url> [output_dir]}"
OUTPUT_DIR="${2:-./discovery-output}"
SCRIPTS_DIR="$(cd "$(dirname "$0")" && cd ../../scripts/discovery 2>/dev/null && pwd || echo "../../scripts/discovery")"

mkdir -p "$OUTPUT_DIR"

echo "=== Postman/Newman API Discovery ==="
echo "Target: ${BASE_URL}"
echo ""

# 1. Run API discovery
if [ -f "$SCRIPTS_DIR/discover-api.sh" ]; then
  echo "[1/2] Discovering endpoints..."
  bash "$SCRIPTS_DIR/discover-api.sh" "$BASE_URL" "$OUTPUT_DIR/api-discovery.json"
else
  echo "discover-api.sh not found"
  exit 1
fi

# 2. Generate Postman collection from discovered endpoints
echo ""
echo "[2/2] Generating Postman collection..."
node -e "
  const report = require('./$OUTPUT_DIR/api-discovery.json');
  const items = [];

  // From OpenAPI endpoints
  (report.endpoints || []).forEach(ep => {
    items.push({
      name: ep.summary || ep.method + ' ' + ep.path,
      request: {
        method: ep.method,
        url: '{{baseUrl}}' + ep.path,
        header: [{ key: 'Content-Type', value: 'application/json' }],
      },
      event: [{
        listen: 'test',
        script: { exec: ['pm.test(\"Status is 2xx\", () => pm.expect(pm.response.code).to.be.within(200, 299));'] }
      }]
    });
  });

  // From probed paths
  (report.probedPaths || []).filter(p => p.status >= 200 && p.status < 400).forEach(p => {
    if (!items.find(i => i.request.url.includes(p.path))) {
      items.push({
        name: 'GET ' + p.path,
        request: { method: 'GET', url: '{{baseUrl}}' + p.path },
        event: [{
          listen: 'test',
          script: { exec: ['pm.test(\"Status is ' + p.status + '\", () => pm.response.to.have.status(' + p.status + '));'] }
        }]
      });
    }
  });

  const collection = {
    info: { name: 'Discovered API', schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json' },
    item: items,
  };
  require('fs').writeFileSync('$OUTPUT_DIR/discovered.postman_collection.json', JSON.stringify(collection, null, 2));
  console.log('  Generated $OUTPUT_DIR/discovered.postman_collection.json (' + items.length + ' requests)');
" 2>/dev/null || echo "  Could not generate Postman collection (requires Node.js)"

echo ""
echo "Done! Copy discovered collection to collections/ or import into Postman."
