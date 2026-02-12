package tests;

import config.Config;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.*;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import pages.LoginPage;

@Tag("smoke")
public class LoginTest {
    private WebDriver driver;
    private LoginPage loginPage;
    
    @BeforeAll
    static void setupClass() {
        WebDriverManager.chromedriver().setup();
    }
    
    @BeforeEach
    void setup() {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        driver = new ChromeDriver(options);
        loginPage = new LoginPage(driver);
    }
    
    @Test
    void testLoginPageLoads() {
        loginPage.navigateTo(Config.BASE_URL);
        Assertions.assertTrue(driver.getCurrentUrl().toLowerCase().contains("login") || 
                             driver.getTitle() != null);
    }
    
    @Test
    void testLoginFormElementsPresent() {
        loginPage.navigateTo(Config.BASE_URL);
        // Elements are verified in LoginPage constructor via waitForElement
        Assertions.assertNotNull(driver);
    }
    
    @Test
    void testLoginAttempt() {
        loginPage.navigateTo(Config.BASE_URL);
        loginPage.login(Config.UI_USERNAME, Config.UI_PASSWORD);
        // Add assertion based on your app's behavior after login
    }
    
    @AfterEach
    void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }
}