import time
from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import (
    StaleElementReferenceException, TimeoutException, NoSuchElementException
)


class SmartLocator:
    """Self-healing locator — tries multiple By strategies with retry and stale element protection."""

    def __init__(self, driver: WebDriver, timeout: float = 10):
        self.driver = driver
        self.timeout = timeout

    def find(self, *strategies: tuple[str, str]) -> WebElement:
        per = self.timeout / max(len(strategies), 1)
        for by, value in strategies:
            try:
                return WebDriverWait(self.driver, per).until(
                    EC.visibility_of_element_located((by, value))
                )
            except (TimeoutException, NoSuchElementException):
                pass
        raise NoSuchElementException(f"SmartLocator: all {len(strategies)} strategies failed")

    def retry_action(self, action, attempts=3, delay=0.5):
        """Retry an action with stale element protection."""
        for i in range(attempts):
            try:
                return action()
            except StaleElementReferenceException:
                if i == attempts - 1:
                    raise
                time.sleep(delay * (i + 1))


def web_strategies(test_id: str = None, css: str = None, xpath: str = None, text: str = None):
    """Build a list of (By, value) tuples for SmartLocator.find()."""
    s = []
    if test_id:
        s.append((By.CSS_SELECTOR, f'[data-test-id="{test_id}"]'))
        s.append((By.ID, test_id))
    if text:
        s.append((By.LINK_TEXT, text))
    if css:
        s.append((By.CSS_SELECTOR, css))
    if xpath:
        s.append((By.XPATH, xpath))
    return s
