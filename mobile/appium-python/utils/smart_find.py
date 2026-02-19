import time
from appium.webdriver.common.appiumby import AppiumBy
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import (
    TimeoutException, NoSuchElementException, StaleElementReferenceException
)


class SmartFind:
    """Self-healing element finder for mobile — tries accessibility-id → resource-id → xpath."""

    def __init__(self, driver, timeout=10):
        self.driver = driver
        self.timeout = timeout

    def find(self, accessibility_id=None, resource_id=None, xpath=None):
        per = self.timeout / 3

        if accessibility_id:
            try:
                return WebDriverWait(self.driver, per).until(
                    EC.visibility_of_element_located((AppiumBy.ACCESSIBILITY_ID, accessibility_id))
                )
            except (TimeoutException, NoSuchElementException):
                pass

        if resource_id:
            try:
                return WebDriverWait(self.driver, per).until(
                    EC.visibility_of_element_located((AppiumBy.ID, resource_id))
                )
            except (TimeoutException, NoSuchElementException):
                pass

        if xpath:
            return WebDriverWait(self.driver, per).until(
                EC.visibility_of_element_located((AppiumBy.XPATH, xpath))
            )

        raise NoSuchElementException("SmartFind: all strategies failed")

    def retry(self, action, attempts=3, delay=0.5):
        """Retry action with stale element protection."""
        for i in range(attempts):
            try:
                return action()
            except StaleElementReferenceException:
                if i == attempts - 1:
                    raise
                time.sleep(delay * (i + 1))
