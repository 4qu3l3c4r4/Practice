package com.example.e2e;

import com.example.e2e.pages.LoginPage;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import static org.junit.jupiter.api.Assertions.*;

class LoginTest {
    private WebDriver driver;

    @BeforeEach
    void setUp() {
        String browser = Config.getBrowser();
        if ("firefox".equals(browser)) {
            FirefoxOptions opts = new FirefoxOptions();
            if (Config.isHeadless()) opts.addArguments("--headless");
            driver = new FirefoxDriver(opts);
        } else {
            ChromeOptions opts = new ChromeOptions();
            if (Config.isHeadless()) {
                opts.addArguments("--headless=new");
                opts.addArguments("--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");
            }
            opts.addArguments("--ignore-certificate-errors");
            driver = new ChromeDriver(opts);
        }
        driver.manage().timeouts().implicitlyWait(java.time.Duration.ofSeconds(10));
    }

    @AfterEach
    void tearDown() {
        if (driver != null) {
            try {
                takeScreenshot();
            } catch (Exception e) {
                // Ignore screenshot errors
            }
            driver.quit();
        }
    }

    private void takeScreenshot() throws IOException {
        Path screenshotsDir = Paths.get("screenshots");
        Files.createDirectories(screenshotsDir);
        
        File screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
        Path destination = screenshotsDir.resolve("test-" + System.currentTimeMillis() + ".png");
        Files.copy(screenshot.toPath(), destination);
    }

    @Test
    @Tag("smoke")
    void loginPageLoads() {
        LoginPage page = new LoginPage(driver, Config.getBaseUrl());
        page.navigateToLogin();
        assertTrue(driver.getCurrentUrl().startsWith(Config.getBaseUrl()));
    }

    @Test
    @Tag("smoke")
    void loginWithCredentials() {
        String user = Config.getUsername();
        String pass = Config.getPassword();
        if (user == null || user.isEmpty() || pass == null || pass.isEmpty()) {
            return; // skip if not set
        }
        LoginPage page = new LoginPage(driver, Config.getBaseUrl());
        page.login(user, pass);
        assertFalse(driver.getCurrentUrl().toLowerCase().contains("login"));
    }
}
