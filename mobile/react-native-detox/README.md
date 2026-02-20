# React Native Detox Template

E2E testing for React Native apps using Detox.

## Prerequisites

- Node.js 18+
- React Native project
- iOS Simulator / Android Emulator
- Xcode (iOS) / Android Studio (Android)

## Setup

```bash
cp .env.example .env
npm install
```

## Configuration

Edit `.env`:

```env
PLATFORM=ios
DEVICE_NAME=iPhone 15
APP_PATH=./ios/build/YourApp.app
```

## Run tests

```bash
# Build app
detox build --configuration ios.sim.debug

# Run tests
detox test --configuration ios.sim.debug

# Android
detox build --configuration android.emu.debug
detox test --configuration android.emu.debug
```

## Writing tests

```javascript
describe('Login', () => {
  it('should login successfully', async () => {
    await element(by.id('email')).typeText('user@test.com');
    await element(by.id('password')).typeText('password123');
    await element(by.id('loginButton')).tap();
    await expect(element(by.text('Dashboard'))).toBeVisible();
  });
});
```

## Discovery

```bash
./discover.sh
```
