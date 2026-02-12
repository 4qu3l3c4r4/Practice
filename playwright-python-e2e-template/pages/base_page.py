from config import Config

class BasePage:
    def __init__(self, page):
        self.page = page
        self.base_url = Config.BASE_URL

    async def navigate(self, path=""):
        url = f"{self.base_url}{path}"
        await self.page.goto(url)

    async def wait_for_element(self, selector, timeout=30000):
        await self.page.wait_for_selector(selector, timeout=timeout)