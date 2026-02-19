import { config } from 'dotenv';
config();

export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./specs/**/*.spec.ts'],
    maxInstances: 1,
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: process.env.HEADLESS !== 'false' ? [
                '--headless',
                '--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            ] : []
        }
    }],
    logLevel: 'info',
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    services: ['chromedriver'],
    baseUrl: process.env.BASE_URL || 'https://example.com',
    specFileRetries: 2,
    specFileRetriesDelay: 1,
    waitforTimeout: 15000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
};