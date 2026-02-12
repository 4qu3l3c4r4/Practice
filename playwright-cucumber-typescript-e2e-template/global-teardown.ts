import { FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
  // Add any cleanup logic here
}

export default globalTeardown;