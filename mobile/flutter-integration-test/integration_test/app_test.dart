import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  group('App E2E Tests', () {
    testWidgets('app launches successfully', (tester) async {
      // TODO: Import your app's main.dart and call main()
      // app.main();
      await tester.pumpAndSettle();

      // TODO: Add your test assertions
      // expect(find.text('Welcome'), findsOneWidget);
    });
  });
}
