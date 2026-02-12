using OpenQA.Selenium.Appium;

namespace AppiumE2E.Tests;

[TestFixture]
[Category("Smoke")]
public class SmokeTests : AppiumFixture
{
    [Test]
    public void AppLaunches()
    {
        Assert.That(Driver, Is.Not.Null);
        Assert.That(Driver.CurrentActivity, Is.Not.Empty);
    }

    [Test]
    public void ContentVisible()
    {
        var elements = Driver.FindElements(MobileBy.ClassName("android.widget.TextView"));
        Assert.That(elements.Count, Is.GreaterThan(0));
    }
}