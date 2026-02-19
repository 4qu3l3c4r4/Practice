from pages.base_page import BasePage
from config import Config

class LoginPage(BasePage):
    def __init__(self, page):
        super().__init__(page)
        self.username_input = "input[type=email], input[name=username]"
        self.password_input = "input[type=password]"
        self.submit_button = "button[type=submit]"

    async def open(self):
        await self.navigate(Config.LOGIN_PATH)

    async def login(self, username, password):
        await self.page.fill(self.username_input, username)
        await self.page.fill(self.password_input, password)
        await self.page.click(self.submit_button)