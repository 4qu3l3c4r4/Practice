using Microsoft.Playwright;

namespace Pages;

// Page Object da tela de login do Swag Labs.
// Todos os seletores e ações dessa tela ficam centralizados aqui.
public class LoginPage : BasePage
{
    private const string UsernameSelector = "#user-name";
    private const string PasswordSelector = "#password";
    private const string SubmitSelector = "#login-button";
    private const string ErrorSelector = "[data-test='error']";

    public LoginPage(IPage page) : base(page) { }

    public async Task OpenAsync()
    {
        await NavigateToAsync("/");
        await Page.Locator(UsernameSelector).WaitForAsync(new LocatorWaitForOptions { State = WaitForSelectorState.Visible });
    }

    public async Task LoginAsync(string username, string password)
    {
        await Page.Locator(UsernameSelector).FillAsync(username);
        await Page.Locator(PasswordSelector).FillAsync(password);
        await Page.Locator(SubmitSelector).ClickAsync();
    }

    public async Task<string> GetErrorMessageAsync()
    {
        return await Page.Locator(ErrorSelector).InnerTextAsync();
    }
}

