package com.example.e2e.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public abstract class BasePage {
    protected final WebDriver driver;
    protected final WebDriverWait wait;
    protected final String baseUrl;

    public BasePage(WebDriver driver, String baseUrl, int timeoutSeconds) {
        this.driver = driver;
        this.baseUrl = baseUrl.replaceAll("/$", "");
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(timeoutSeconds));
    }

    public void open(String path) {
        String url = path == null || path.isEmpty() ? baseUrl : baseUrl + "/" + path.replaceFirst("^/", "");
        driver.get(url);
    }

    public String getTitle() {
        return driver.getTitle();
    }
}
