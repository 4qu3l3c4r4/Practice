/**
 * Web UI Discovery Script
 * 
 * Scans a web page and extracts all testable elements:
 * - data-test-id, data-testid, data-cy, data-qa attributes
 * - Form inputs with labels
 * - Buttons and links
 * - ARIA roles and labels
 * - Unique CSS selectors for interactive elements
 *
 * Usage (browser console):
 *   paste this script and call: discoverUI()
 *
 * Usage (Playwright):
 *   const result = await page.evaluate(discoverUIScript);
 *
 * Usage (CLI via Playwright):
 *   node discover-web-ui.js https://your-app.com
 */

function discoverUI() {
  const results = {
    url: window.location.href,
    timestamp: new Date().toISOString(),
    testAttributes: [],
    forms: [],
    buttons: [],
    links: [],
    inputs: [],
    selectors: [],
    ariaElements: [],
    tables: [],
    modals: [],
  };

  // 1. Test attributes (data-test-id, data-testid, data-cy, data-qa, data-test)
  const testAttrSelectors = [
    'data-test-id', 'data-testid', 'data-test', 'data-cy', 'data-qa', 'data-automation-id'
  ];
  testAttrSelectors.forEach(attr => {
    document.querySelectorAll(`[${attr}]`).forEach(el => {
      results.testAttributes.push({
        attribute: attr,
        value: el.getAttribute(attr),
        tag: el.tagName.toLowerCase(),
        text: el.textContent?.trim().substring(0, 80) || '',
        selector: `[${attr}="${el.getAttribute(attr)}"]`,
        visible: el.offsetParent !== null,
      });
    });
  });

  // 2. Forms
  document.querySelectorAll('form').forEach((form, i) => {
    const fields = [];
    form.querySelectorAll('input, select, textarea').forEach(input => {
      const label = input.labels?.[0]?.textContent?.trim()
        || input.getAttribute('aria-label')
        || input.getAttribute('placeholder')
        || '';
      fields.push({
        tag: input.tagName.toLowerCase(),
        type: input.type || '',
        name: input.name || '',
        id: input.id || '',
        label,
        required: input.required,
        selector: input.id ? `#${input.id}` : input.name ? `[name="${input.name}"]` : null,
      });
    });
    results.forms.push({
      action: form.action || '',
      method: form.method || 'get',
      id: form.id || `form-${i}`,
      fields,
    });
  });

  // 3. Buttons
  document.querySelectorAll('button, [role="button"], input[type="submit"], input[type="button"]').forEach(btn => {
    results.buttons.push({
      text: btn.textContent?.trim().substring(0, 80) || btn.value || '',
      type: btn.type || '',
      id: btn.id || '',
      selector: btn.id ? `#${btn.id}`
        : btn.getAttribute('data-test-id') ? `[data-test-id="${btn.getAttribute('data-test-id')}"]`
        : null,
      disabled: btn.disabled,
      visible: btn.offsetParent !== null,
    });
  });

  // 4. Links
  document.querySelectorAll('a[href]').forEach(a => {
    results.links.push({
      text: a.textContent?.trim().substring(0, 80) || '',
      href: a.href,
      id: a.id || '',
      external: a.hostname !== window.location.hostname,
    });
  });

  // 5. All inputs (standalone, outside forms too)
  document.querySelectorAll('input, select, textarea').forEach(input => {
    if (input.closest('form')) return; // already captured in forms
    const label = input.labels?.[0]?.textContent?.trim()
      || input.getAttribute('aria-label')
      || input.getAttribute('placeholder')
      || '';
    results.inputs.push({
      tag: input.tagName.toLowerCase(),
      type: input.type || '',
      name: input.name || '',
      id: input.id || '',
      label,
      selector: input.id ? `#${input.id}` : input.name ? `[name="${input.name}"]` : null,
    });
  });

  // 6. ARIA elements
  document.querySelectorAll('[role], [aria-label], [aria-labelledby]').forEach(el => {
    results.ariaElements.push({
      role: el.getAttribute('role') || '',
      ariaLabel: el.getAttribute('aria-label') || '',
      tag: el.tagName.toLowerCase(),
      id: el.id || '',
      text: el.textContent?.trim().substring(0, 50) || '',
    });
  });

  // 7. Tables
  document.querySelectorAll('table').forEach((table, i) => {
    const headers = Array.from(table.querySelectorAll('th')).map(th => th.textContent?.trim());
    results.tables.push({
      id: table.id || `table-${i}`,
      headers,
      rowCount: table.querySelectorAll('tbody tr').length,
      selector: table.id ? `#${table.id}` : `table:nth-of-type(${i + 1})`,
    });
  });

  // 8. Modals / dialogs
  document.querySelectorAll('[role="dialog"], dialog, .modal, [class*="modal"]').forEach(modal => {
    results.modals.push({
      id: modal.id || '',
      role: modal.getAttribute('role') || modal.tagName.toLowerCase(),
      visible: modal.offsetParent !== null || modal.open === true,
    });
  });

  return results;
}

// --- CLI runner (node discover-web-ui.js <url>) ---
if (typeof process !== 'undefined' && process.argv?.[2]) {
  (async () => {
    const { chromium } = require('playwright');
    const url = process.argv[2];
    const output = process.argv[3] || 'discovery-report.json';

    console.log(`Scanning ${url} ...`);
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });

    const result = await page.evaluate(discoverUI);
    require('fs').writeFileSync(output, JSON.stringify(result, null, 2));
    console.log(`Report saved to ${output}`);
    console.log(`  Test attributes: ${result.testAttributes.length}`);
    console.log(`  Forms: ${result.forms.length}`);
    console.log(`  Buttons: ${result.buttons.length}`);
    console.log(`  Links: ${result.links.length}`);
    console.log(`  Inputs: ${result.inputs.length}`);
    console.log(`  ARIA elements: ${result.ariaElements.length}`);
    console.log(`  Tables: ${result.tables.length}`);

    await browser.close();
  })();
}

if (typeof module !== 'undefined') module.exports = { discoverUI };
