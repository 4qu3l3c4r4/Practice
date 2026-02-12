using OpenQA.Selenium;

namespace Pages;

public class LoginPage : BasePage
{
    private static readonly By UsernameInput = By.CssSelector("input[name='username'], input#username, input[type='email']");
    private static readonly By PasswordInput = By.CssSelector("input[name='password'], input#password");
    private static readonly By SubmitButton = By.CssSelector("button[type='submit'], input[type='submit']");

    public LoginPage(IWebDriver driver) : base(driver) { }

    public void Login(string username, string password)
    {
        WaitForElement(UsernameInput).SendKeys(username);
        Driver.FindElement(PasswordInput).SendKeys(password);
        Driver.FindElement(SubmitButton).Click();
    }
}