/**
 * Browser DevTools Console script for E2E DOM verification.
 * Paste this into the Console on your app page to verify login selectors
 * and list data-testid / data-test-id attributes.
 *
 * Canonical copy — keep in sync across all templates.
 */
(function () {
  console.log('E2E DOM verification – generic login selectors\n');
  const checks = [
    { label: 'Username/email input', selector: 'input[name="username"], input#username, input[type="email"]' },
    { label: 'Password input', selector: 'input[name="password"], input#password' },
    { label: 'Submit button', selector: 'button[type="submit"], input[type="submit"]' },
  ];
  checks.forEach(function (c) {
    try {
      var n = document.querySelectorAll(c.selector).length;
      console.log((n > 0 ? '  OK ' : '  MISSING ') + c.label + ' (' + n + ')');
    } catch (e) {
      console.log('  ERROR ' + c.label, e.message);
    }
  });
  var testIds = document.querySelectorAll('[data-testid], [data-test-id]');
  var values = new Set();
  testIds.forEach(function (el) {
    values.add(el.getAttribute('data-testid') || el.getAttribute('data-test-id'));
  });
  console.log('\nElements with data-testid / data-test-id:', Array.from(values).sort().join(', ') || 'none');
})();
