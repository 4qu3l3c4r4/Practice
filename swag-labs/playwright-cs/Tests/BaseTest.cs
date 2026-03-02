using Microsoft.Playwright;
using Microsoft.Playwright.NUnit;
using NUnit.Framework;

namespace Tests;

// Classe base para os testes, configurando contexto, vídeo e screenshots.
public class BaseTest : PageTest
{
    public override BrowserNewContextOptions ContextOptions()
    {
        var options = new BrowserNewContextOptions
        {
            RecordVideoDir = Config.VideoRecording ? "reports/videos/" : null
        };

        if (Config.HeadlessMode)
        {
            options.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
        }

        return options;
    }

    [SetUp]
    public void BaseSetUp()
    {
        Directory.CreateDirectory("logs");
        Directory.CreateDirectory("screenshots");
        Directory.CreateDirectory("reports");
    }

    [TearDown]
    public async Task BaseTearDown()
    {
        if (TestContext.CurrentContext.Result.Outcome.Status == NUnit.Framework.Interfaces.TestStatus.Failed)
        {
            try
            {
                var testName = TestContext.CurrentContext.Test.Name;
                var timestamp = DateTime.Now.ToString("yyyy-MM-dd_HH-mm-ss");
                var screenshotPath = $"screenshots/{testName}_{timestamp}.png";

                await Page.ScreenshotAsync(new PageScreenshotOptions { Path = screenshotPath });
            }
            catch (Exception ex)
            {
                TestContext.WriteLine($"Falha ao capturar screenshot: {ex.Message}");
            }
        }
    }
}

