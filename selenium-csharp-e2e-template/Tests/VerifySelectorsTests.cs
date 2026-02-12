using NUnit.Framework;
using OpenQA.Selenium;

namespace Tests;

[TestFixture]
[Category("SelectorVerification")]
public class VerifySelectorsTests : WebDriverFixture
{
    [Test]
    public void VerifyLoginSelectors()
    {
        Driver.Navigate().GoToUrl(Config.BaseUrl);
        
        var usernameElements = Driver.FindElements(By.CssSelector("input[name='username'], input#username, input[type='email']"));
        var passwordElements = Driver.FindElements(By.CssSelector("input[name='password'], input#password"));
        var submitElements = Driver.FindElements(By.CssSelector("button[type='submit'], input[type='submit']"));
        
        Assert.That(usernameElements.Count, Is.GreaterThan(0), "Username input not found");
        Assert.That(passwordElements.Count, Is.GreaterThan(0), "Password input not found");
        Assert.That(submitElements.Count, Is.GreaterThan(0), "Submit button not found");
    }
}