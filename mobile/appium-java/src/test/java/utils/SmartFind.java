package utils;

import io.appium.java_client.AppiumDriver;
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.*;
import java.time.Duration;

/**
 * Self-healing element finder for mobile — tries accessibility-id → resource-id → xpath with retry.
 */
public class SmartFind {
    private final AppiumDriver driver;
    private final Duration timeout;

    public SmartFind(AppiumDriver driver) {
        this(driver, Duration.ofSeconds(10));
    }

    public SmartFind(AppiumDriver driver, Duration timeout) {
        this.driver = driver;
        this.timeout = timeout;
    }

    public WebElement find(String accessibilityId, String resourceId, String xpath) {
        Duration per = timeout.dividedBy(3);

        if (accessibilityId != null) {
            try {
                return new WebDriverWait(driver, per)
                    .until(ExpectedConditions.visibilityOfElementLocated(
                        AppiumBy.accessibilityId(accessibilityId)));
            } catch (TimeoutException ignored) {}
        }
        if (resourceId != null) {
            try {
                return new WebDriverWait(driver, per)
                    .until(ExpectedConditions.visibilityOfElementLocated(
                        AppiumBy.id(resourceId)));
            } catch (TimeoutException ignored) {}
        }
        if (xpath != null) {
            return new WebDriverWait(driver, per)
                .until(ExpectedConditions.visibilityOfElementLocated(By.xpath(xpath)));
        }
        throw new NoSuchElementException("SmartFind: all strategies failed");
    }

    /** Retry action with stale element protection */
    public <T> T retry(java.util.function.Supplier<T> action, int attempts) {
        for (int i = 0; i < attempts; i++) {
            try {
                return action.get();
            } catch (StaleElementReferenceException e) {
                if (i == attempts - 1) throw e;
                try { Thread.sleep(500L * (i + 1)); } catch (InterruptedException ignored) {}
            }
        }
        throw new RuntimeException("retry exhausted");
    }
}
