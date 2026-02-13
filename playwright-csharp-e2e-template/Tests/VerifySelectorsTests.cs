using NUnit.Framework;

namespace Tests;

[TestFixture]
[Category("SelectorVerification")]
public class VerifySelectorsTests : BaseTest
{
    [Test]
    public async Task VerifyLoginSelectors()
    {
        await Page.GotoAsync(Config.BaseUrl);
        
        var usernameCount = await Page.Locator("input[name='username'], input#username, input[type='email']").CountAsync();
        var passwordCount = await Page.Locator("input[name='password'], input#password").CountAsync();
        var submitCount = await Page.Locator("button[type='submit'], input[type='submit']").CountAsync();
        
        Assert.That(usernameCount, Is.GreaterThan(0), "Username input not found");
        Assert.That(passwordCount, Is.GreaterThan(0), "Password input not found");
        Assert.That(submitCount, Is.GreaterThan(0), "Submit button not found");
    }
}