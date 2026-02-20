module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  testTimeout: 30000,
  maxWorkers: 1,
  bail: false,
  retry: 2,
};
