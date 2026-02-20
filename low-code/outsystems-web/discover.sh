#!/bin/bash
set -e

URL="${1:-$BASE_URL}"

if [ -z "$URL" ]; then
  echo "Usage: ./discover.sh <outsystems-app-url>"
  exit 1
fi

echo "🔍 Discovering OutSystems elements from $URL..."

mkdir -p discovery-output

# Use Playwright to extract OutSystems-specific IDs
node -e "
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('$URL');
  await page.waitForLoadState('networkidle');

  const elements = await page.evaluate(() => {
    const widgets = Array.from(document.querySelectorAll('[id*=\"wt\"]'));
    return widgets.map(el => ({
      id: el.id,
      tag: el.tagName.toLowerCase(),
      type: el.getAttribute('type'),
      text: el.textContent?.trim().substring(0, 50)
    }));
  });

  console.log(JSON.stringify(elements, null, 2));
  await browser.close();
})();
" > discovery-output/outsystems-elements.json

echo "✅ Found $(jq length discovery-output/outsystems-elements.json) OutSystems elements"
echo "📄 Output: discovery-output/outsystems-elements.json"
echo ""
echo "Next: Feed this to your AI assistant with AI_CONTEXT.md to generate tests"
