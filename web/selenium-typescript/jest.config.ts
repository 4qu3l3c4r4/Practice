import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  setupFilesAfterEnv: ['<rootDir>/config/env.ts'],
  testTimeout: 30000,
  // Self-healing: retry failed tests
  retryTimes: 2,
};

export default config;
