import pytest
from appium import webdriver
from appium.options.android import UiAutomator2Options
import config
import os
from pathlib import Path

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

@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    rep = outcome.get_result()
    
    if rep.when == "call" and rep.failed:
        driver = item.funcargs.get('driver')
        if driver:
            screenshot_dir = Path("screenshots")
            screenshot_dir.mkdir(exist_ok=True)
            screenshot_path = screenshot_dir / f"{item.name}.png"
            driver.save_screenshot(str(screenshot_path))