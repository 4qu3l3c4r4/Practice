import pytest
from pages.login_page import LoginPage

@pytest.mark.smoke
async def test_login_page_loads(page, base_url):
    login_page = LoginPage(page)
    await login_page.open()
    await login_page.wait_for_element(login_page.username_input)

@pytest.mark.smoke
async def test_login_with_credentials(page, username, password):
    login_page = LoginPage(page)
    await login_page.open()
    await login_page.login(username, password)
    await page.wait_for_load_state("networkidle")

@pytest.mark.smoke
async def test_authenticated_user_sees_main_content(logged_in_page):
    await logged_in_page.wait_for_load_state("networkidle")
    assert logged_in_page.url != f"{logged_in_page.url.split('/')[0]}//{logged_in_page.url.split('/')[2]}/login"