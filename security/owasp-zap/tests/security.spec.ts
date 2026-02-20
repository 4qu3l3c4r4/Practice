describe('Security Scan', () => {
  const ZAP_URL = 'http://localhost:8080';
  const TARGET = process.env.TARGET_URL || 'https://example.com';

  it('should not have high-risk vulnerabilities', async () => {
    // Spider scan
    const spiderRes = await fetch(`${ZAP_URL}/JSON/spider/action/scan/?url=${TARGET}`);
    const { scan: spiderId } = await spiderRes.json();

    // Wait for spider
    let status = 0;
    while (status < 100) {
      const statusRes = await fetch(`${ZAP_URL}/JSON/spider/view/status/?scanId=${spiderId}`);
      const data = await statusRes.json();
      status = parseInt(data.status);
      await new Promise(r => setTimeout(r, 1000));
    }

    // Get alerts
    const alertsRes = await fetch(`${ZAP_URL}/JSON/core/view/alerts/?baseurl=${TARGET}`);
    const { alerts } = await alertsRes.json();

    const highRisk = alerts.filter((a: any) => a.risk === 'High');
    expect(highRisk).toHaveLength(0);
  }, 300000);
});
