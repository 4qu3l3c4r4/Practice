package utils;

import com.microsoft.playwright.*;

/**
 * Self-healing locator — tries data-test-id → role → text → CSS.
 */
public class ResilientLocator {
    private final Page page;
    private final double timeout;

    public ResilientLocator(Page page) {
        this(page, 5000);
    }

    public ResilientLocator(Page page, double timeout) {
        this.page = page;
        this.timeout = timeout;
    }

    public Locator find(String testId, String role, String roleName, String text, String css) {
        double per = timeout / 4;
        if (testId != null) {
            Locator loc = page.locator("[data-test-id=\"" + testId + "\"]").first();
            if (loc.isVisible(new Locator.IsVisibleOptions().setTimeout(per))) return loc;
        }
        if (role != null) {
            Locator loc = page.getByRole(AriaRole.valueOf(role.toUpperCase()),
                    new Page.GetByRoleOptions().setName(roleName)).first();
            if (loc.isVisible(new Locator.IsVisibleOptions().setTimeout(per))) return loc;
        }
        if (text != null) {
            Locator loc = page.getByText(text).first();
            if (loc.isVisible(new Locator.IsVisibleOptions().setTimeout(per))) return loc;
        }
        if (css != null) {
            return page.locator(css).first();
        }
        return page.locator("[data-test-id=\"" + testId + "\"]");
    }
}
