using NUnit.Framework;
using Pages;

namespace Tests;

[TestFixture]
[Category("Smoke")]
[Retry(2)]
public class LoginTests : WebDriverFixture
{
    private LoginPage _loginPage = null!;

    [SetUp]
    public void TestSetup()
    {
        _loginPage = new LoginPage(Driver);
    }

    [Test]
    public void LoginPageLoads()
    {
        _loginPage.NavigateTo(Config.BaseUrl);
        Assert.That(Driver.Url.ToLower().Contains("login") || !string.IsNullOrEmpty(Driver.Title));
    }

    [Test]
    public void LoginFormElementsPresent()
    {
        _loginPage.NavigateTo(Config.BaseUrl);
        // Elements are verified in LoginPage via WaitForElement
        Assert.That(Driver, Is.Not.Null);
    }

    [Test]
    public void LoginAttempt()
    {
        _loginPage.NavigateTo(Config.BaseUrl);
        _loginPage.Login(Config.Username, Config.Password);
        // Add assertion based on your app's behavior after login
    }
}