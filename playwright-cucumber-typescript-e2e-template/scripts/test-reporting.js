#!/usr/bin/env node

console.log('Available test commands:');
console.log('');
console.log('  npm test              - Run all tests');
console.log('  npm run test:headed   - Run with visible browser');
console.log('  npm run format        - Format code');
console.log('  npm run typecheck     - TypeScript checking');
console.log('');
console.log('Environment variables:');
console.log('  HEADLESS_MODE=false   - Show browser');
console.log('  TEST_ISOLATION=false  - Disable test isolation');
console.log('  REQUIRE_MFA=true      - Enable MFA waiting');