using Microsoft.Playwright.NUnit;
using NUnit.Framework;
using Pages;

namespace Tests;

[TestFixture]
[Category("Smoke")]
public class SmokeTests : PageTest
{
    private LoginPage _loginPage = null!;

    [SetUp]
    public void TestSetup()
    {
        _loginPage = new LoginPage(Page);
    }

    [Test]
    public async Task LoginPageLoads()
    {
        await _loginPage.NavigateToAsync(Config.BaseUrl);
        Assert.That(Page.Url.ToLower().Contains("login") || !string.IsNullOrEmpty(await Page.TitleAsync()));
    }

    [Test]
    public async Task LoginFormElementsPresent()
    {
        await _loginPage.NavigateToAsync(Config.BaseUrl);
        await Expect(Page.Locator("input[name='username'], input#username, input[type='email']")).ToBeVisibleAsync();
        await Expect(Page.Locator("input[name='password'], input#password")).ToBeVisibleAsync();
        await Expect(Page.Locator("button[type='submit'], input[type='submit']")).ToBeVisibleAsync();
    }

    [Test]
    public async Task LoginAttempt()
    {
        await _loginPage.NavigateToAsync(Config.BaseUrl);
        await _loginPage.LoginAsync(Config.Username, Config.Password);
        // Add assertion based on your app's behavior after login
    }
}