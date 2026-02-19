import { defineConfig } from 'cypress';
import { config } from 'dotenv';

config();

export default defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL || 'https://example.com',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    video: process.env.VIDEO_RECORDING === 'true',
    screenshotOnRunFailure: true,
    viewportWidth: 1280,
    viewportHeight: 720,
    retries: { runMode: 2, openMode: 1 },
  },
});