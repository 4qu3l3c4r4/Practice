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
        Driver?.Quit();
    }
}