# AI Context — Flutter Integration Test Template

> This file is designed to be read by AI assistants (Kiro, Cursor, Copilot, Claude, ChatGPT, etc.) to help implement tests using this template.

## Template purpose

E2E testing for Flutter mobile apps using Flutter's official `integration_test` package.

## Tech stack

- Flutter SDK 3.0+
- integration_test package
- flutter_test package
- Dart 3.0+

## Project structure

```
integration_test/app_test.dart     → Main test suite
integration_test/login_test.dart   → Feature tests
test_driver/integration_test.dart  → Driver for reports/screenshots
```

## Code patterns

```dart
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:my_app/main.dart' as app;

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  group('E2E Tests', () {
    testWidgets('user can login', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      await tester.enterText(find.byKey(Key('emailField')), 'user@test.com');
      await tester.enterText(find.byKey(Key('passwordField')), 'pass123');
      await tester.tap(find.byKey(Key('loginButton')));
      await tester.pumpAndSettle();

      expect(find.text('Dashboard'), findsOneWidget);
    });
  });
}
```

## Finders (selectors)

| Finder | Usage | When to use |
|--------|-------|-------------|
| `find.byKey(Key('id'))` | `find.byKey(Key('loginButton'))` | Preferred — requires Key() on widgets |
| `find.text('text')` | `find.text('Submit')` | Visible text |
| `find.byType(Widget)` | `find.byType(ElevatedButton)` | Widget type |
| `find.byIcon(Icons.icon)` | `find.byIcon(Icons.home)` | Icon buttons |
| `find.byTooltip('tip')` | `find.byTooltip('Settings')` | Tooltip text |
| `find.descendant()` | `find.descendant(of: find.byType(Card), matching: find.text('Title'))` | Nested elements |

## Common actions

```dart
// Tap
await tester.tap(find.byKey(Key('button')));
await tester.pumpAndSettle();

// Enter text
await tester.enterText(find.byKey(Key('input')), 'value');

// Scroll
await tester.drag(find.byType(ListView), Offset(0, -300));
await tester.pumpAndSettle();

// Long press
await tester.longPress(find.byKey(Key('item')));

// Wait for element
await tester.pumpAndSettle(Duration(seconds: 5));

// Verify element exists
expect(find.text('Success'), findsOneWidget);
expect(find.byKey(Key('error')), findsNothing);
```

## Commands

```bash
flutter test integration_test/
flutter test integration_test/app_test.dart
flutter drive --driver=test_driver/integration_test.dart --target=integration_test/app_test.dart
```

## Discovery workflow

1. Run `./discover.sh` to extract all Keys and widgets from the app
2. Review `discovery-output/flutter-widgets.json`
3. Create test files using discovered Keys
4. Run tests to verify

## Rules

- Always use `Key('unique-id')` on widgets for stable selectors
- Call `pumpAndSettle()` after interactions to wait for animations
- Group related tests with `group()`
- Use descriptive test names
- One test file per feature area
