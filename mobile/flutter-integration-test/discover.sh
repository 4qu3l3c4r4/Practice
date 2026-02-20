#!/bin/bash
set -e

echo "🔍 Discovering Flutter widgets and Keys..."

mkdir -p discovery-output

# Extract all Key() declarations from Dart files
find . -name "*.dart" -not -path "*/.*" -not -path "*/test/*" | xargs grep -h "Key(" | \
  sed -E "s/.*Key\('([^']+)'\).*/\1/" | sort -u > discovery-output/keys.txt

echo "✅ Found $(wc -l < discovery-output/keys.txt) unique Keys"
echo "📄 Output: discovery-output/keys.txt"
echo ""
echo "Next: Feed this to your AI assistant with AI_CONTEXT.md to generate tests"
