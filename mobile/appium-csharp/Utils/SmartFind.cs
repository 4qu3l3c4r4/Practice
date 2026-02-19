using OpenQA.Selenium;
using OpenQA.Selenium.Appium;
using OpenQA.Selenium.Support.UI;
using System;

namespace Utils
{
    /// <summary>
    /// Self-healing element finder for mobile — tries accessibility-id → resource-id → xpath.
    /// </summary>
    public class SmartFind
    {
        private readonly AppiumDriver _driver;
        private readonly TimeSpan _timeout;

        public SmartFind(AppiumDriver driver, TimeSpan? timeout = null)
        {
            _driver = driver;
            _timeout = timeout ?? TimeSpan.FromSeconds(10);
        }

        public IWebElement Find(string? accessibilityId = null, string? resourceId = null, string? xpath = null)
        {
            var per = TimeSpan.FromSeconds(_timeout.TotalSeconds / 3);

            if (accessibilityId != null)
            {
                try
                {
                    var wait = new WebDriverWait(_driver, per);
                    return wait.Until(d => {
                        var el = d.FindElement(MobileBy.AccessibilityId(accessibilityId));
                        return el.Displayed ? el : null;
                    });
                }
                catch (WebDriverTimeoutException) { }
            }

            if (resourceId != null)
            {
                try
                {
                    var wait = new WebDriverWait(_driver, per);
                    return wait.Until(d => {
                        var el = d.FindElement(MobileBy.Id(resourceId));
                        return el.Displayed ? el : null;
                    });
                }
                catch (WebDriverTimeoutException) { }
            }

            if (xpath != null)
            {
                var wait = new WebDriverWait(_driver, per);
                return wait.Until(d => {
                    var el = d.FindElement(By.XPath(xpath));
                    return el.Displayed ? el : null;
                });
            }

            throw new NoSuchElementException("SmartFind: all strategies failed");
        }

        public T Retry<T>(Func<T> action, int attempts = 3, int delayMs = 500)
        {
            for (int i = 0; i < attempts; i++)
            {
                try { return action(); }
                catch (StaleElementReferenceException)
                {
                    if (i == attempts - 1) throw;
                    Thread.Sleep(delayMs * (i + 1));
                }
            }
            throw new InvalidOperationException("Retry exhausted");
        }
    }
}
