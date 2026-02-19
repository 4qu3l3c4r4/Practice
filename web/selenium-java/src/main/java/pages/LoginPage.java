package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class LoginPage extends BasePage {
    private static final By USERNAME_INPUT = By.cssSelector("input[name='username'], input#username, input[type='email']");
    private static final By PASSWORD_INPUT = By.cssSelector("input[name='password'], input#password");
    private static final By SUBMIT_BUTTON = By.cssSelector("button[type='submit'], input[type='submit']");
    
    public LoginPage(WebDriver driver) {
        super(driver);
    }
    
    public void login(String username, String password) {
        waitForElement(USERNAME_INPUT).sendKeys(username);
        driver.findElement(PASSWORD_INPUT).sendKeys(password);
        driver.findElement(SUBMIT_BUTTON).click();
    }
}