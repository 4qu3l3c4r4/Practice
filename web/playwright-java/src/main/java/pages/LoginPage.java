package pages;

import com.microsoft.playwright.Page;

public class LoginPage extends BasePage {
    private static final String USERNAME_SELECTOR = "[data-testid='username'], #username, input[name='username']";
    private static final String PASSWORD_SELECTOR = "[data-testid='password'], #password, input[name='password']";
    private static final String SUBMIT_SELECTOR = "[data-testid='submit'], button[type='submit'], input[type='submit']";

    public LoginPage(Page page) {
        super(page);
    }

    public void open() {
        navigate("/login");
    }

    public void login(String username, String password) {
        page.fill(USERNAME_SELECTOR, username);
        page.fill(PASSWORD_SELECTOR, password);
        page.click(SUBMIT_SELECTOR);
    }
}