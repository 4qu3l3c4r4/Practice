package tests;

import com.microsoft.playwright.*;
import config.Config;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.TestInfo;

import java.nio.file.Paths;
import java.io.File;

public class BaseTest {
    private static Playwright playwright;
    private static Browser browser;
    protected BrowserContext context;
    protected Page page;

    @BeforeAll
    static void launchBrowser() {
        // Create logs directory
        new File("logs").mkdirs();
        
        playwright = Playwright.create();
        BrowserType.LaunchOptions launchOptions = new BrowserType.LaunchOptions()
                .setHeadless(Config.isHeadless());
        
        // Add real Chrome user agent for headless mode
        if (Config.isHeadless()) {
            launchOptions.setArgs(java.util.Arrays.asList(
                "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            ));
        }
        
        browser = playwright.chromium().launch(launchOptions);
    }

    @AfterAll
    static void closeBrowser() {
        playwright.close();
    }

    @BeforeEach
    void createContextAndPage() {
        context = browser.newContext();
        page = context.newPage();
    }

    @AfterEach
    void closeContext(TestInfo testInfo) {
        // Screenshot on failure
        if (testInfo.getExecutionException().isPresent()) {
            new File("screenshots").mkdirs();
            String screenshotName = testInfo.getDisplayName().replaceAll("[^a-zA-Z0-9]", "_") + ".png";
            page.screenshot(new Page.ScreenshotOptions().setPath(Paths.get("screenshots", screenshotName)));
        }
        context.close();
    }
}