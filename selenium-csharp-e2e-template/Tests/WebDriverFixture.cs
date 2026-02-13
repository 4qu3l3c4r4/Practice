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
        options.AddArguments("--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");
        Driver = new ChromeDriver(options);
        Driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);
    }

    [TearDown]
    public void TearDown()
    {
        if (Driver != null)
        {
            try
            {
                TakeScreenshot();
            }
            catch
            {
                // Ignore screenshot errors
            }
            Driver.Quit();
        }
    }

    private void TakeScreenshot()
    {
        Directory.CreateDirectory("screenshots");
        var screenshot = ((ITakesScreenshot)Driver).GetScreenshot();
        var fileName = $"screenshots/test-{DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()}.png";
        screenshot.SaveAsFile(fileName);
    }
}