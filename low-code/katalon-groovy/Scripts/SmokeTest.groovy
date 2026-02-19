import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import com.kms.katalon.core.testobject.TestObject
import com.kms.katalon.core.testobject.ConditionType

// Load environment variables
String baseUrl = System.getenv('BASE_URL') ?: 'https://example.com'
String username = System.getenv('UI_USERNAME') ?: 'test@example.com'
String password = System.getenv('UI_PASSWORD') ?: 'password123'

// Open application
WebUI.openBrowser('')
WebUI.navigateToUrl(baseUrl)
WebUI.maximizeWindow()

// Verify title
WebUI.verifyElementPresent(new TestObject().addProperty("tag", ConditionType.EQUALS, "title"), 10)

// Login
CustomKeywords.loginWithCredentials(username, password)

// Verify login success (URL should change)
WebUI.delay(2)
String currentUrl = WebUI.getUrl()
assert !currentUrl.contains('login')

WebUI.closeBrowser()