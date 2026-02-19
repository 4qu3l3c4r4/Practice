using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;
using System;

namespace Utils
{
    /// <summary>
    /// Self-healing locator — tries multiple By strategies with retry and stale element protection.
    /// </summary>
    public class SmartLocator
    {
        private readonly IWebDriver _driver;
        private readonly TimeSpan _timeout;

        public SmartLocator(IWebDriver driver, TimeSpan? timeout = null)
        {
            _driver = driver;
            _timeout = timeout ?? TimeSpan.FromSeconds(10);
        }

        public IWebElement Find(params By[] strategies)
        {
            var perStrategy = TimeSpan.FromSeconds(_timeout.TotalSeconds / Math.Max(strategies.Length, 1));
            foreach (var by in strategies)
            {
                try
                {
                    var wait = new WebDriverWait(_driver, perStrategy);
                    return wait.Until(d =>
                    {
                        var el = d.FindElement(by);
                        return el.Displayed ? el : null;
                    });
                }
                catch (WebDriverTimeoutException) { }
                catch (NoSuchElementException) { }
            }
            throw new NoSuchElementException($"SmartLocator: all {strategies.Length} strategies failed");
        }

        public T RetryAction<T>(Func<T> action, int attempts = 3, int delayMs = 500)
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
            throw new InvalidOperationException("RetryAction exhausted");
        }

        public static By[] WebStrategies(string testId, string cssBackup)
        {
            return new[]
            {
                By.CssSelector($"[data-test-id=\"{testId}\"]"),
                By.Id(testId),
                By.CssSelector(cssBackup)
            };
        }
    }
}
