using OpenQA.Selenium.Appium;
using OpenQA.Selenium.Appium.Android;
using OpenQA.Selenium.Appium.iOS;

namespace AppiumE2E.Tests;

public class AppiumFixture
{
    protected AppiumDriver? Driver;

    [SetUp]
    public void Setup()
    {
        var options = new AppiumOptions();

        if (Config.IsIos)
        {
            options.AddAdditionalAppiumOption("platformName", "iOS");
            options.AddAdditionalAppiumOption("appium:deviceName", Config.IosDeviceName);
            options.AddAdditionalAppiumOption("appium:platformVersion", Config.IosPlatformVersion);
            options.AddAdditionalAppiumOption("appium:bundleId", Config.IosBundleId);
            options.AddAdditionalAppiumOption("appium:automationName", "XCUITest");
            Driver = new IOSDriver(new Uri(Config.AppiumUrl), options);
        }
        else
        {
            options.AddAdditionalAppiumOption("platformName", Config.PlatformName);
            options.AddAdditionalAppiumOption("deviceName", Config.DeviceName);
            options.AddAdditionalAppiumOption("appPackage", Config.AppPackage);
            options.AddAdditionalAppiumOption("appActivity", Config.AppActivity);
            Driver = new AndroidDriver(new Uri(Config.AppiumUrl), options);
        }
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
