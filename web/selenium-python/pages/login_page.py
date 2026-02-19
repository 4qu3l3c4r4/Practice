from selenium.webdriver.common.by import By
from .base_page import BasePage

class LoginPage(BasePage):
    USERNAME_INPUT = (By.CSS_SELECTOR, 'input[name="username"], input#username, input[type="email"]')
    PASSWORD_INPUT = (By.CSS_SELECTOR, 'input[name="password"], input#password')
    SUBMIT_BUTTON = (By.CSS_SELECTOR, 'button[type="submit"], input[type="submit"]')
    
    def login(self, username, password):
        self.wait_for_element(self.USERNAME_INPUT).send_keys(username)
        self.driver.find_element(*self.PASSWORD_INPUT).send_keys(password)
        self.driver.find_element(*self.SUBMIT_BUTTON).click()