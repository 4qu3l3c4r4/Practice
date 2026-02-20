#!/bin/bash
set -e

echo "🔍 Discovering Electron app structure..."
mkdir -p discovery-output

find . -name "*.html" -o -name "*.js" | grep -v node_modules > discovery-output/files.txt

echo "✅ Found $(wc -l < discovery-output/files.txt) files"
