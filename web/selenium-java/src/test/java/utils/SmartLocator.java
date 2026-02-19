package utils;

import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.*;
import java.time.Duration;
import java.util.List;
import java.util.function.Supplier;

/**
 * Self-healing locator — tries multiple By strategies with retry and stale element protection.
 */
public class SmartLocator {
    private final WebDriver driver;
    private final Duration timeout;

    public SmartLocator(WebDriver driver) {
        this(driver, Duration.ofSeconds(10));
    }

    public SmartLocator(WebDriver driver, Duration timeout) {
        this.driver = driver;
        this.timeout = timeout;
    }

    public WebElement find(By... strategies) {
        Duration perStrategy = timeout.dividedBy(Math.max(strategies.length, 1));
        for (By by : strategies) {
            try {
                WebDriverWait wait = new WebDriverWait(driver, perStrategy);
                return wait.until(ExpectedConditions.visibilityOfElementLocated(by));
            } catch (TimeoutException | NoSuchElementException e) {
                // try next
            }
        }
        throw new NoSuchElementException("SmartLocator: all " + strategies.length + " strategies failed");
    }

    /** Retry an action with stale element protection */
    public <T> T retryAction(Supplier<T> action, int attempts) {
        for (int i = 0; i < attempts; i++) {
            try {
                return action.get();
            } catch (StaleElementReferenceException e) {
                if (i == attempts - 1) throw e;
                try { Thread.sleep(500L * (i + 1)); } catch (InterruptedException ignored) {}
            }
        }
        throw new RuntimeException("retryAction exhausted");
    }

    /** Shorthand for data-test-id → id → css fallback */
    public static By[] webStrategies(String testId, String cssBackup) {
        return new By[]{
            By.cssSelector("[data-test-id=\"" + testId + "\"]"),
            By.id(testId),
            By.cssSelector(cssBackup)
        };
    }
}
