using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;

namespace Pages;

public class BasePage
{
    protected readonly IWebDriver Driver;
    protected readonly WebDriverWait Wait;

    public BasePage(IWebDriver driver)
    {
        Driver = driver;
        Wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
    }

    public void NavigateTo(string url)
    {
        Driver.Navigate().GoToUrl(url);
    }

    public IWebElement WaitForElement(By locator)
    {
        return Wait.Until(driver => driver.FindElement(locator));
    }
}