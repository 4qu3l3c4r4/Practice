using Microsoft.Playwright;

namespace Pages;

public class BasePage
{
    protected readonly IPage Page;

    public BasePage(IPage page)
    {
        Page = page;
    }

    public async Task NavigateToAsync(string url)
    {
        await Page.GotoAsync(url);
    }

    public async Task<ILocator> WaitForElementAsync(string selector)
    {
        return Page.Locator(selector);
    }
}