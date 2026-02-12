const fs = require('fs');
const path = require('path');

const resultsPath = path.join(__dirname, '..', 'reports', 'results.json');
if (!fs.existsSync(resultsPath)) {
  console.error('No results.json found. Run tests first.');
  process.exit(1);
}

const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
console.log('Test Results Summary');
console.log('='.repeat(40));
console.log(`Total suites: ${results.suites?.length || 0}`);
console.log(`Generated: ${new Date().toISOString()}`);