import pytest
import os
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
    context_args = {
        **browser_context_args,
        "viewport": {"width": 1280, "height": 720},
    }
    
    # Add real Chrome user agent for headless mode
    if Config.HEADLESS_MODE:
        context_args["user_agent"] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    
    return context_args

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

@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    rep = outcome.get_result()
    
    if rep.when == "call" and rep.failed:
        page = item.funcargs.get('page')
        if page:
            # Take screenshot on failure
            os.makedirs('screenshots', exist_ok=True)
            screenshot_path = f"screenshots/{item.name}.png"
            page.screenshot(path=screenshot_path)
            
            # Log console errors
            console_logs = []
            def handle_console(msg):
                if msg.type in ['error', 'warning']:
                    console_logs.append(f"[{msg.type.upper()}] {msg.text}")
            
            page.on('console', handle_console)
            
            if console_logs:
                print(f"\nConsole errors for {item.name}:")
                for log in console_logs:
                    print(log)