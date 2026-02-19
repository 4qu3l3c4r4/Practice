import pytest
from appium import webdriver
from appium.options.android import UiAutomator2Options
from appium.options.ios import XCUITestOptions
import config
from pathlib import Path


def _create_driver():
    if config.PLATFORM_NAME.lower() == 'ios':
        options = XCUITestOptions()
        options.platform_name = 'iOS'
        options.device_name = config.IOS_DEVICE_NAME
        options.platform_version = config.IOS_PLATFORM_VERSION
        options.bundle_id = config.IOS_BUNDLE_ID
    else:
        options = UiAutomator2Options()
        options.platform_name = config.PLATFORM_NAME
        options.device_name = config.DEVICE_NAME
        options.app_package = config.APP_PACKAGE
        options.app_activity = config.APP_ACTIVITY

    return webdriver.Remote(config.APPIUM_URL, options=options)


@pytest.fixture
def driver():
    d = _create_driver()
    yield d
    d.quit()


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
