# Flutter Integration Test Template

E2E testing for Flutter apps using the official `integration_test` package.

## Prerequisites

- Flutter SDK 3.0+
- Android Studio / Xcode (for emulators/simulators)
- Device or emulator running

## Setup

```bash
cp .env.example .env
flutter pub get
```

## Configuration

Edit `.env`:

```env
APP_BUNDLE_ID=com.example.app
PLATFORM=android  # or ios
DEVICE_ID=emulator-5554  # optional, auto-selects if not set
```

## Run tests

```bash
# Android
flutter test integration_test/app_test.dart

# iOS
flutter test integration_test/app_test.dart --device-id=<simulator-id>

# Specific device
flutter test integration_test/app_test.dart -d <device-id>

# With driver (for screenshots/reports)
flutter drive --driver=test_driver/integration_test.dart --target=integration_test/app_test.dart
```

## Discovery

Extract all widgets and keys from your Flutter app:

```bash
./discover.sh
```

Outputs `discovery-output/flutter-widgets.json` with all testable elements.

## Project structure

```
integration_test/
  app_test.dart           # Main test file
  login_test.dart         # Feature-specific tests
test_driver/
  integration_test.dart   # Test driver (for reports/screenshots)
```

## Writing tests

```dart
testWidgets('login flow', (tester) async {
  await tester.pumpWidget(MyApp());
  
  await tester.enterText(find.byKey(Key('email')), 'user@example.com');
  await tester.enterText(find.byKey(Key('password')), 'password123');
  await tester.tap(find.byKey(Key('loginButton')));
  await tester.pumpAndSettle();
  
  expect(find.text('Dashboard'), findsOneWidget);
});
```

## CI/CD

See `.github/workflows/flutter-e2e.yml` for GitHub Actions example.

## Tips

- Use `Key('unique-id')` on widgets for reliable selectors
- `pumpAndSettle()` waits for animations to complete
- `pump()` advances one frame
- Use `find.byType()`, `find.byKey()`, `find.text()` for locators
