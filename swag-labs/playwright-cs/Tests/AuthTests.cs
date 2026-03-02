using NUnit.Framework;
using Pages;

namespace Tests;

// Swag Labs authentication tests with Playwright C#.
// Includes positive, negative and edge-case scenarios.
[TestFixture]
[Category("Auth")]
[Retry(2)]
public class AuthTests : BaseTest
{
    private LoginPage _loginPage = null!;

    [SetUp]
    public void TestSetup()
    {
        _loginPage = new LoginPage(Page);
    }

    [Test]
    [Category("Smoke")]
    public async Task Login_WithValidCredentials_ShouldRedirectToInventory()
    {
        // Happy path: login with default user.
        await _loginPage.OpenAsync();
        await _loginPage.LoginAsync(Config.Username, Config.Password);

        await Expect(Page).ToHaveURLAsync(new Regex("inventory\\.html$"));
        await Expect(Page.Locator("#inventory_container")).ToBeVisibleAsync();
    }

    [Test]
    [Category("Negative")]
    public async Task Login_WithInvalidPassword_ShouldShowErrorMessage()
    {
        // Negative scenario: invalid password.
        await _loginPage.OpenAsync();
        await _loginPage.LoginAsync(Config.Username, "senha_incorreta!");

        var errorText = await _loginPage.GetErrorMessageAsync();
        StringAssert.Contains(
            "Epic sadface: Username and password do not match any user in this service",
            errorText);
    }

    [Test]
    [Category("Edge")]
    [Category("Negative")]
    public async Task Login_WithEmptyFields_ShouldRequireUsername()
    {
        // Edge case: click login without filling any field.
        await _loginPage.OpenAsync();
        await Page.Locator("#login-button").ClickAsync();

        var errorText = await _loginPage.GetErrorMessageAsync();
        StringAssert.Contains("Epic sadface: Username is required", errorText);
    }
}

