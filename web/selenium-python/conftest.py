import pytest
import os
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
import config

# Ensure screenshots directory exists
SCREENSHOTS_DIR = os.path.join(os.path.dirname(__file__), 'screenshots')
os.makedirs(SCREENSHOTS_DIR, exist_ok=True)

def pytest_addoption(parser):
    parser.addoption("--headless", action="store_true", help="Run in headless mode")

@pytest.fixture
def driver(request):
    options = Options()
    if request.config.getoption("--headless"):
        options.add_argument("--headless")
        options.add_argument('--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)
    driver.implicitly_wait(10)
    yield driver
    driver.quit()

@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    rep = outcome.get_result()
    if rep.when == "call" and rep.failed:
        driver = item.funcargs.get('driver')
        if driver:
            screenshot_path = os.path.join(SCREENSHOTS_DIR, f"{item.name}.png")
            driver.save_screenshot(screenshot_path)
            print(f"Screenshot saved: {screenshot_path}")