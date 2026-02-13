import { FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
  console.log('Test execution completed. Logs preserved in logs/ directory.');
}

export default globalTeardown;