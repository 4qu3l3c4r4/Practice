#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function generateReport() {
  console.log('E2E Test Results Summary');
  console.log('========================');
  
  const reportsDir = path.join(process.cwd(), 'reports');
  
  if (!fs.existsSync(reportsDir)) {
    console.log('No reports directory found. Run tests first.');
    return;
  }

  const files = fs.readdirSync(reportsDir);
  console.log(`Found ${files.length} report files`);
  
  files.forEach(file => {
    console.log(`- ${file}`);
  });
  
  console.log('\nFor detailed reports, check the reports/ directory');
}

generateReport();