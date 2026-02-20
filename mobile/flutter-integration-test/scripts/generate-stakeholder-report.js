const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function generateStakeholderReport() {
  const resultsPath = path.join(__dirname, '../reports/results.json');
  if (!fs.existsSync(resultsPath)) {
    console.error('❌ results.json not found');
    process.exit(1);
  }

  const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
  const testResultsDir = path.join(__dirname, '../reports/test-results');

  function findSpecs(suite, parentTitles = []) {
    let specs = [];
    const titles = suite.title ? [...parentTitles, suite.title] : parentTitles;
    if (suite.specs) {
      suite.specs.forEach(sp => {
        const test = sp.tests[0];
        const result = test?.results[0];
        const screenshots = (result?.attachments || [])
          .filter(a => a.contentType === 'image/png' && a.path)
          .map(a => path.isAbsolute(a.path) ? a.path : path.resolve(testResultsDir, '..', a.path));
        specs.push({
          title: sp.title,
          feature: titles.filter(t => !t.endsWith('.js')).join(' › '),
          status: test?.status || 'unknown',
          duration: result?.duration || 0,
          error: result?.error?.message || '',
          screenshots,
        });
      });
    }
    if (suite.suites) suite.suites.forEach(ss => specs.push(...findSpecs(ss, titles)));
    return specs;
  }

  const allSpecs = results.suites.flatMap(s => findSpecs(s));
  const passed = allSpecs.filter(s => s.status === 'expected');
  const failed = allSpecs.filter(s => s.status === 'unexpected');
  const { startTime, duration } = results.stats;
  const runDate = new Date(startTime).toLocaleDateString('en-GB');
  const runTime = new Date(startTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  const durationMin = Math.round(duration / 60000);
  const passRate = ((passed.length / allSpecs.length) * 100).toFixed(1);

  const byFeature = {};
  allSpecs.forEach(s => {
    const key = s.feature || 'Other';
    if (!byFeature[key]) byFeature[key] = [];
    byFeature[key].push(s);
  });

  function imgTag(filePath) {
    try {
      if (fs.existsSync(filePath)) {
        const buf = fs.readFileSync(filePath);
        return `<img src="data:image/png;base64,${buf.toString('base64')}" alt="Screenshot"/>`;
      }
    } catch {}
    return null;
  }

  let html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    @page { margin: 15mm; }
    body { font-family: -apple-system, 'Segoe UI', sans-serif; font-size: 11px; color: #1e212a; line-height: 1.5; }
    h1 { font-size: 22px; color: #1d3ba3; margin-bottom: 4px; }
    h2 { font-size: 16px; color: #1d3ba3; margin-top: 28px; border-bottom: 2px solid #1d3ba3; padding-bottom: 4px; }
    h3 { font-size: 13px; color: #333; margin-top: 20px; margin-bottom: 6px; }
    .subtitle { color: #666; font-size: 12px; margin-bottom: 20px; }
    .summary-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 16px 0; }
    .summary-card { border-radius: 8px; padding: 14px; text-align: center; }
    .summary-card .num { font-size: 28px; font-weight: 700; }
    .summary-card .label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; color: #555; }
    .card-total { background: #f0f2f8; }
    .card-pass { background: #e6f4ea; }
    .card-fail { background: #fce8e6; }
    .card-rate { background: #e8f0fe; }
    .card-pass .num { color: #1e8e3e; }
    .card-fail .num { color: #d93025; }
    .card-rate .num { color: #1d3ba3; }
    table { width: 100%; border-collapse: collapse; margin: 8px 0 16px; font-size: 10.5px; }
    th { background: #f0f2f8; text-align: left; padding: 6px 8px; font-weight: 600; }
    td { padding: 5px 8px; border-bottom: 1px solid #e8e8e8; }
    .pass { color: #1e8e3e; font-weight: 600; }
    .fail { color: #d93025; font-weight: 600; }
    .screenshot-container { margin: 10px 0 20px; page-break-inside: avoid; }
    .screenshot-container img { max-width: 100%; border: 1px solid #ddd; border-radius: 4px; }
    .error-msg { background: #fce8e6; padding: 6px 10px; border-radius: 4px; font-family: monospace; font-size: 9.5px; color: #d93025; margin: 4px 0 8px; word-break: break-all; }
    .page-break { page-break-before: always; }
    .footer { margin-top: 30px; padding-top: 10px; border-top: 1px solid #ddd; font-size: 9px; color: #999; text-align: center; }
  </style></head><body>`;

  html += `<h1>🧪 E2E Test Report</h1>`;
  html += `<div class="subtitle">${runDate} at ${runTime} &nbsp;|&nbsp; Duration: ${durationMin} min</div>`;

  html += `<div class="summary-grid">
    <div class="summary-card card-total"><div class="num">${allSpecs.length}</div><div class="label">Total Tests</div></div>
    <div class="summary-card card-pass"><div class="num">${passed.length}</div><div class="label">Passed</div></div>
    <div class="summary-card card-fail"><div class="num">${failed.length}</div><div class="label">Failed</div></div>
    <div class="summary-card card-rate"><div class="num">${passRate}%</div><div class="label">Pass Rate</div></div>
  </div>`;

  html += `<h2>Test Results by Feature</h2>`;
  for (const [feature, specs] of Object.entries(byFeature)) {
    const fp = specs.filter(s => s.status === 'expected').length;
    const ff = specs.filter(s => s.status === 'unexpected').length;
    html += `<h3>${feature} <span style="font-weight:400;color:#888">(${fp} passed${ff ? `, ${ff} failed` : ''})</span></h3>`;
    html += `<table><tr><th>Test</th><th style="width:70px">Status</th><th style="width:70px">Duration</th></tr>`;
    specs.forEach(s => {
      const status = s.status === 'expected' ? '<span class="pass">✅ PASS</span>' : '<span class="fail">❌ FAIL</span>';
      const dur = s.duration > 60000 ? `${(s.duration / 60000).toFixed(1)}m` : `${(s.duration / 1000).toFixed(1)}s`;
      html += `<tr><td>${s.title}</td><td>${status}</td><td>${dur}</td></tr>`;
    });
    html += `</table>`;
  }

  if (failed.length > 0) {
    html += `<div class="page-break"></div>`;
    html += `<h2>Failure Details & Screenshots</h2>`;
    failed.forEach((s, i) => {
      html += `<div class="screenshot-container">`;
      html += `<h3>${i + 1}. ${s.title}</h3>`;
      html += `<div><strong>Feature:</strong> ${s.feature}</div>`;
      if (s.error) {
        const shortError = s.error.length > 300 ? s.error.substring(0, 300) + '…' : s.error;
        html += `<div class="error-msg">${shortError.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>`;
      }
      let hasScreenshot = false;
      s.screenshots.forEach(sp => {
        const tag = imgTag(sp);
        if (tag) {
          html += tag;
          hasScreenshot = true;
        }
      });
      if (!hasScreenshot) html += `<div style="color:#999;font-style:italic">No screenshot available</div>`;
      html += `</div>`;
    });
  }

  html += `<div class="footer">Generated by E2E Test Suite · ${runDate} at ${runTime}</div>`;
  html += `</body></html>`;

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0] + '_' +
    new Date().toTimeString().split(' ')[0].replace(/:/g, '-');
  const outputPath = path.join(__dirname, `../reports/stakeholder-report-${timestamp}.pdf`);
  const latestPath = path.join(__dirname, '../reports/stakeholder-report-latest.pdf');

  console.log('🔄 Generating stakeholder PDF report...');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'load' });
  await page.waitForTimeout(1000);
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '15mm', right: '15mm', bottom: '15mm', left: '15mm' },
  });
  await browser.close();

  fs.copyFileSync(outputPath, latestPath);
  const size = (fs.statSync(outputPath).size / (1024 * 1024)).toFixed(2);
  console.log(`✅ Stakeholder report: ${outputPath} (${size} MB)`);
}

generateStakeholderReport().catch(e => { console.error('❌', e); process.exit(1); });
