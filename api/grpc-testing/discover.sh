#!/bin/bash
set -e

echo "🔍 Discovering gRPC services from .proto files..."
mkdir -p discovery-output

find . -name "*.proto" -exec echo "Found: {}" \;

echo "✅ Discovery complete"
echo "📄 Place .proto files in protos/ directory"
