package tests;

import config.Config;
import io.appium.java_client.android.AndroidDriver;
import io.appium.java_client.android.options.UiAutomator2Options;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;

import java.net.MalformedURLException;
import java.net.URL;

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

    @AfterAll
    public static void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}