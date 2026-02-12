package pages;

import com.microsoft.playwright.Page;
import config.Config;

public class BasePage {
    protected final Page page;

    public BasePage(Page page) {
        this.page = page;
    }

    public void navigate(String path) {
        page.navigate(Config.getBaseUrl() + path);
    }

    public void waitForSelector(String selector) {
        page.waitForSelector(selector);
    }
}