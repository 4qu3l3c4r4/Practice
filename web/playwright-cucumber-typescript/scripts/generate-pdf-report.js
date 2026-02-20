const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function generatePDFReport() {
  console.log('🔄 Generating PDF report with screenshots and videos...');

  const reportsDir = path.join(__dirname, '../reports');
  const htmlReportPath = path.join(reportsDir, 'html', 'index.html');
  const playwrightReportPath = path.join(reportsDir, 'playwright-report', 'index.html');
  
  const candidatePaths = [htmlReportPath, playwrightReportPath];
  const reportPath = candidatePaths.find(p => fs.existsSync(p));

  if (!reportPath) {
    console.error('❌ Report not found. Tried:', candidatePaths);
    process.exit(1);
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0] + '_' +
    new Date().toTimeString().split(' ')[0].replace(/:/g, '-');
  const outputPath = path.join(reportsDir, `test-report-${timestamp}.pdf`);
  const latestPath = path.join(reportsDir, 'test-report-latest.pdf');

  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto(`file://${reportPath}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
      displayHeaderFooter: true,
      headerTemplate: `<div style="font-size:10px;text-align:center;width:100%;color:#666">E2E Test Report - ${new Date().toLocaleDateString()}</div>`,
      footerTemplate: `<div style="font-size:10px;text-align:center;width:100%;color:#666">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>`,
    });

    fs.copyFileSync(outputPath, latestPath);
    const size = (fs.statSync(outputPath).size / (1024 * 1024)).toFixed(2);
    console.log(`✅ PDF generated: ${outputPath} (${size} MB)`);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

generatePDFReport().catch(console.error);
