export async function resilientZapRequest(url: string, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(r => setTimeout(r, 2000 * (i + 1)));
    }
  }
}

export async function waitForScanComplete(zapUrl: string, scanId: string, timeout = 300000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const data = await resilientZapRequest(`${zapUrl}/JSON/spider/view/status/?scanId=${scanId}`);
      if (parseInt(data.status) >= 100) return;
    } catch (e) {
      // Continue waiting
    }
    await new Promise(r => setTimeout(r, 2000));
  }
  throw new Error(`Scan ${scanId} did not complete after ${timeout}ms`);
}
