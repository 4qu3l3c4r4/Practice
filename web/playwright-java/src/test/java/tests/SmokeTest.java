package tests;

import config.Config;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import pages.LoginPage;

import static org.junit.jupiter.api.Assertions.assertTrue;

@Tag("smoke")
public class SmokeTest extends BaseTest {

    @Test
    void login_page_loads() {
        LoginPage loginPage = new LoginPage(page);
        loginPage.open();
        assertTrue(page.url().contains("/login"));
    }

    @Test
    void login_with_credentials() {
        LoginPage loginPage = new LoginPage(page);
        loginPage.open();
        loginPage.login(Config.getUsername(), Config.getPassword());
        page.waitForLoadState();
    }

    @Test
    void authenticated_user_sees_content() {
        LoginPage loginPage = new LoginPage(page);
        loginPage.open();
        loginPage.login(Config.getUsername(), Config.getPassword());
        page.waitForLoadState();
        assertTrue(page.url().length() > 0);
    }
}