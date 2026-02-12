using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using NUnit.Framework;

namespace Tests;

public class WebDriverFixture
{
    protected IWebDriver Driver = null!;

    [SetUp]
    public void Setup()
    {
        var options = new ChromeOptions();
        options.AddArguments("--headless", "--no-sandbox", "--disable-dev-shm-usage");
        Driver = new ChromeDriver(options);
        Driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);
    }

    [TearDown]
    public void TearDown()
    {
        Driver?.Quit();
    }
}