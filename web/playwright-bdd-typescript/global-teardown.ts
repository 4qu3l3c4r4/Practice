import * as fs from 'fs';
import * as path from 'path';

async function globalTeardown() {
  const logDir = path.join(__dirname, 'logs');
  if (fs.existsSync(logDir)) {
    console.log('[global-teardown] Logs preserved at', logDir);
  }
}

export default globalTeardown;
