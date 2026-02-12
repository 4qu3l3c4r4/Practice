import pytest
from appium import webdriver
from appium.options.android import UiAutomator2Options
import config

@pytest.fixture
def driver():
    options = UiAutomator2Options()
    options.platform_name = config.PLATFORM_NAME
    options.device_name = config.DEVICE_NAME
    options.app_package = config.APP_PACKAGE
    options.app_activity = config.APP_ACTIVITY
    
    driver = webdriver.Remote(config.APPIUM_URL, options=options)
    yield driver
    driver.quit()