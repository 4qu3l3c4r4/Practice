using OpenQA.Selenium.Appium;
using OpenQA.Selenium.Appium.Android;

namespace AppiumE2E.Tests;

public class AppiumFixture
{
    protected AndroidDriver? Driver;

    [SetUp]
    public void Setup()
    {
        var options = new AppiumOptions();
        options.AddAdditionalAppiumOption("platformName", Config.PlatformName);
        options.AddAdditionalAppiumOption("deviceName", Config.DeviceName);
        options.AddAdditionalAppiumOption("appPackage", Config.AppPackage);
        options.AddAdditionalAppiumOption("appActivity", Config.AppActivity);

        Driver = new AndroidDriver(new Uri(Config.AppiumUrl), options);
    }

    [TearDown]
    public void TearDown()
    {
        if (TestContext.CurrentContext.Result.Outcome.Status == NUnit.Framework.Interfaces.TestStatus.Failed && Driver != null)
        {
            TakeScreenshot(TestContext.CurrentContext.Test.Name);
        }
        Driver?.Quit();
    }

    private void TakeScreenshot(string testName)
    {
        try
        {
            var screenshot = Driver?.GetScreenshot();
            if (screenshot != null)
            {
                Directory.CreateDirectory("screenshots");
                screenshot.SaveAsFile($"screenshots/{testName}.png");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Failed to take screenshot: {ex.Message}");
        }
    }
}