from playwright.sync_api import Page, Locator


class ResilientLocator:
    """Self-healing locator — tries data-test-id → role → text → CSS."""

    def __init__(self, page: Page, timeout: float = 5000):
        self.page = page
        self.timeout = timeout

    def find(self, *, test_id: str = None, role: str = None, role_name: str = None,
             text: str = None, css: str = None) -> Locator:
        per = self.timeout / 4

        if test_id:
            loc = self.page.locator(f'[data-test-id="{test_id}"]').first
            if loc.is_visible(timeout=per):
                return loc

        if role:
            loc = self.page.get_by_role(role, name=role_name).first
            try:
                if loc.is_visible(timeout=per):
                    return loc
            except Exception:
                pass

        if text:
            loc = self.page.get_by_text(text).first
            try:
                if loc.is_visible(timeout=per):
                    return loc
            except Exception:
                pass

        if css:
            return self.page.locator(css).first

        return self.page.locator(f'[data-test-id="{test_id}"]')
