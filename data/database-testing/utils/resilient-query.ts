export async function resilientQuery(client: any, query: string, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await client.query(query);
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
}

export async function waitForTable(client: any, tableName: string, timeout = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      await client.query(`SELECT 1 FROM ${tableName} LIMIT 1`);
      return;
    } catch (e) {
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  throw new Error(`Table ${tableName} not ready after ${timeout}ms`);
}
