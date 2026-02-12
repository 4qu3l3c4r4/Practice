import pytest
from appium.webdriver.common.appiumby import AppiumBy

@pytest.mark.smoke
def test_app_launches(driver):
    assert driver.current_activity is not None

@pytest.mark.smoke
def test_content_visible(driver):
    elements = driver.find_elements(AppiumBy.CLASS_NAME, "android.widget.TextView")
    assert len(elements) > 0