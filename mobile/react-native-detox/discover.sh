#!/bin/bash
set -e

echo "🔍 Discovering React Native testIDs..."
mkdir -p discovery-output

find . -name "*.tsx" -o -name "*.jsx" | xargs grep -h "testID=" | \
  sed -E 's/.*testID="([^"]+)".*/\1/' | sort -u > discovery-output/testids.txt

echo "✅ Found $(wc -l < discovery-output/testids.txt) testIDs"
echo "📄 Output: discovery-output/testids.txt"
