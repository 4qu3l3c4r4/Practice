using Microsoft.Playwright;

namespace Pages;

public class LoginPage : BasePage
{
    private const string UsernameSelector = "input[name='username'], input#username, input[type='email']";
    private const string PasswordSelector = "input[name='password'], input#password";
    private const string SubmitSelector = "button[type='submit'], input[type='submit']";

    public LoginPage(IPage page) : base(page) { }

    public async Task LoginAsync(string username, string password)
    {
        await Page.Locator(UsernameSelector).FillAsync(username);
        await Page.Locator(PasswordSelector).FillAsync(password);
        await Page.Locator(SubmitSelector).ClickAsync();
    }
}