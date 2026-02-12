import { config } from 'dotenv';
config();

export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./specs/**/*.spec.ts'],
    maxInstances: 1,
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: process.env.HEADLESS !== 'false' ? ['--headless'] : []
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
    baseUrl: process.env.BASE_URL || 'https://example.com'
};