import pytest
from appium.webdriver.common.appiumby import AppiumBy
import config


@pytest.mark.smoke
def test_app_launches(driver):
    if config.PLATFORM_NAME.lower() == 'ios':
        assert driver.session_id is not None
    else:
        assert driver.current_activity is not None


@pytest.mark.smoke
def test_content_visible(driver):
    if config.PLATFORM_NAME.lower() == 'ios':
        elements = driver.find_elements(AppiumBy.CLASS_NAME, "XCUIElementTypeStaticText")
    else:
        elements = driver.find_elements(AppiumBy.CLASS_NAME, "android.widget.TextView")
    assert len(elements) > 0
