using Microsoft.Playwright;

namespace Pages;

// Classe base para páginas, contendo operações comuns de navegação e waits.
public class BasePage
{
    protected readonly IPage Page;

    public BasePage(IPage page)
    {
        Page = page;
    }

    public async Task NavigateToAsync(string path = "/")
    {
        await Page.GotoAsync(Config.BaseUrl.TrimEnd('/') + path);
    }
}

