import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import com.kms.katalon.core.testobject.TestObject
import com.kms.katalon.core.testobject.ConditionType

class CustomKeywords {
    
    static void loginWithCredentials(String username, String password) {
        TestObject usernameField = new TestObject()
        usernameField.addProperty("css", ConditionType.EQUALS, "input[name='username'], input[type='email']")
        
        TestObject passwordField = new TestObject()
        passwordField.addProperty("css", ConditionType.EQUALS, "input[name='password']")
        
        TestObject submitButton = new TestObject()
        submitButton.addProperty("css", ConditionType.EQUALS, "button[type='submit'], input[type='submit']")
        
        WebUI.setText(usernameField, username)
        WebUI.setText(passwordField, password)
        WebUI.click(submitButton)
    }
}