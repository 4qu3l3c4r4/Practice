package tests;

import config.Config;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.options.UiAutomator2Options;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.TestInfo;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;

public class BaseTest {
    protected static AndroidDriver driver;

    @BeforeAll
    public static void setUp() throws MalformedURLException {
        UiAutomator2Options options = new UiAutomator2Options()
                .setPlatformName(Config.getPlatformName())
                .setDeviceName(Config.getDeviceName())
                .setAppPackage(Config.getAppPackage())
                .setAppActivity(Config.getAppActivity());

        driver = new AndroidDriver(new URL(Config.getAppiumUrl()), options);
    }

    @AfterEach
    public void tearDownEach(TestInfo testInfo) {
        if (testInfo.getTags().contains("failed") && driver != null) {
            takeScreenshot(testInfo.getDisplayName());
        }
    }

    @AfterAll
    public static void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    private void takeScreenshot(String testName) {
        try {
            File screenshot = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
            Files.createDirectories(Paths.get("screenshots"));
            Files.copy(screenshot.toPath(), Paths.get("screenshots", testName + ".png"));
        } catch (IOException e) {
            System.err.println("Failed to take screenshot: " + e.getMessage());
        }
    }
}