# AI Context — React Native Detox Template

> This file is designed to be read by AI assistants to help implement tests using this template.

## Template purpose

E2E testing for React Native mobile apps using Detox (gray-box testing framework).

## Tech stack

- React Native
- Detox 20.x
- Jest
- Node.js 18+

## Code patterns

```javascript
describe('App E2E', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should display welcome screen', async () => {
    await expect(element(by.id('welcome'))).toBeVisible();
  });

  it('should tap button and navigate', async () => {
    await element(by.id('nextButton')).tap();
    await expect(element(by.text('Next Screen'))).toBeVisible();
  });
});
```

## Matchers

| Matcher | Usage |
|---------|-------|
| `by.id('testID')` | testID prop (preferred) |
| `by.text('text')` | Visible text |
| `by.label('label')` | Accessibility label |
| `by.type('RCTButton')` | Component type |

## Actions

```javascript
await element(by.id('input')).typeText('text');
await element(by.id('button')).tap();
await element(by.id('scrollView')).scroll(200, 'down');
await element(by.id('input')).clearText();
await element(by.id('switch')).longPress();
```

## Assertions

```javascript
await expect(element(by.id('element'))).toBeVisible();
await expect(element(by.id('element'))).toExist();
await expect(element(by.id('text'))).toHaveText('Expected');
await expect(element(by.id('element'))).not.toBeVisible();
```

## Rules

- Use `testID` prop on all testable components
- Call `device.launchApp()` in beforeAll
- Use `device.reloadReactNative()` to reset state
- One test file per feature
