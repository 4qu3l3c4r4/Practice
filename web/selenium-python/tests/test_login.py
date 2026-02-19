import pytest
from pages.login_page import LoginPage
import config

@pytest.mark.smoke
def test_login_page_loads(driver):
    login_page = LoginPage(driver)
    login_page.navigate_to(config.BASE_URL)
    assert "login" in driver.current_url.lower() or driver.title

@pytest.mark.smoke
def test_login_form_elements_present(driver):
    login_page = LoginPage(driver)
    login_page.navigate_to(config.BASE_URL)
    assert login_page.wait_for_element(login_page.USERNAME_INPUT)
    assert driver.find_element(*login_page.PASSWORD_INPUT)
    assert driver.find_element(*login_page.SUBMIT_BUTTON)

@pytest.mark.smoke
def test_login_attempt(driver):
    login_page = LoginPage(driver)
    login_page.navigate_to(config.BASE_URL)
    login_page.login(config.UI_USERNAME, config.UI_PASSWORD)
    # Add assertion based on your app's behavior after login