package com.example.e2e.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class LoginPage extends BasePage {
    private static final By USERNAME = By.cssSelector("input[name='username'], input#username, input[type='email']");
    private static final By PASSWORD = By.cssSelector("input[name='password'], input#password");
    private static final By SUBMIT = By.cssSelector("button[type='submit'], input[type='submit']");

    public LoginPage(WebDriver driver, String baseUrl) {
        super(driver, baseUrl, 10);
    }

    public void navigateToLogin() {
        open("");
    }

    public void enterUsername(String username) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(USERNAME)).clear();
        driver.findElement(USERNAME).sendKeys(username);
    }

    public void enterPassword(String password) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(PASSWORD)).clear();
        driver.findElement(PASSWORD).sendKeys(password);
    }

    public void clickSubmit() {
        wait.until(ExpectedConditions.elementToBeClickable(SUBMIT)).click();
    }

    public void login(String username, String password) {
        navigateToLogin();
        enterUsername(username);
        enterPassword(password);
        clickSubmit();
    }
}
