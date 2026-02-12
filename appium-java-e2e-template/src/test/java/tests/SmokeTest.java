package tests;

import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@Tag("smoke")
public class SmokeTest extends BaseTest {

    @Test
    public void app_launches_successfully() {
        assertNotNull(driver.getSessionId(), "Driver session should exist");
    }

    @Test
    public void app_displays_content() {
        boolean elementPresent = !driver.findElements(By.xpath("//*[@resource-id or @text or @content-desc]")).isEmpty();
        assertTrue(elementPresent, "App should display some content");
    }
}