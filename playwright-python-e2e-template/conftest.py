import pytest
from dotenv import load_dotenv
from config import Config
from pages.login_page import LoginPage

load_dotenv()

@pytest.fixture
def base_url():
    return Config.BASE_URL

@pytest.fixture
def username():
    return Config.UI_USERNAME

@pytest.fixture
def password():
    return Config.UI_PASSWORD

@pytest.fixture
def browser_context_args(browser_context_args):
    return {
        **browser_context_args,
        "viewport": {"width": 1280, "height": 720},
    }

@pytest.fixture
def browser_type_launch_args(browser_type_launch_args):
    return {
        **browser_type_launch_args,
        "headless": Config.HEADLESS_MODE,
    }

@pytest.fixture
async def logged_in_page(page, base_url, username, password):
    login_page = LoginPage(page)
    await login_page.open()
    await login_page.login(username, password)
    return page