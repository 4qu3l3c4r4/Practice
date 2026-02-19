// BrowserStack capabilities for Selenium WebDriver (Node.js / Java / Python / C#)
// Copy the relevant section into your test config.

module.exports = {
  // Common BrowserStack options
  commonCaps: {
    'bstack:options': {
      userName: process.env.BROWSERSTACK_USERNAME,
      accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
      projectName: process.env.BROWSERSTACK_PROJECT || 'E2E Tests',
      buildName: process.env.BROWSERSTACK_BUILD || 'local',
      debug: true,
      networkLogs: true,
      consoleLogs: 'info',
    },
  },

  // Desktop browsers
  desktop: [
    { browserName: 'Chrome', browserVersion: 'latest', 'bstack:options': { os: 'Windows', osVersion: '11' } },
    { browserName: 'Firefox', browserVersion: 'latest', 'bstack:options': { os: 'Windows', osVersion: '11' } },
    { browserName: 'Safari', browserVersion: 'latest', 'bstack:options': { os: 'OS X', osVersion: 'Sonoma' } },
    { browserName: 'Edge', browserVersion: 'latest', 'bstack:options': { os: 'Windows', osVersion: '11' } },
  ],

  // Mobile devices (Appium)
  mobile: [
    { 'bstack:options': { deviceName: 'Samsung Galaxy S24', osVersion: '14.0', platformName: 'android' } },
    { 'bstack:options': { deviceName: 'Google Pixel 8', osVersion: '14.0', platformName: 'android' } },
    { 'bstack:options': { deviceName: 'iPhone 15', osVersion: '17', platformName: 'ios' } },
    { 'bstack:options': { deviceName: 'iPhone 14', osVersion: '16', platformName: 'ios' } },
  ],

  hubUrl: 'https://hub-cloud.browserstack.com/wd/hub',
};
