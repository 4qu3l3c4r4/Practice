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
        Assert.That(Driver!.SessionId, Is.Not.Null);
    }

    [Test]
    public void ContentVisible()
    {
        var className = Config.IsIos ? "XCUIElementTypeStaticText" : "android.widget.TextView";
        var elements = Driver!.FindElements(MobileBy.ClassName(className));
        Assert.That(elements.Count, Is.GreaterThan(0));
    }
}
