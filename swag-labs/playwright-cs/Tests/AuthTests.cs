using NUnit.Framework;
using Pages;

namespace Tests;

// Testes de autenticação do Swag Labs com Playwright C#.
// Inclui cenários positivos, negativos e de borda.
[TestFixture]
[Category("Auth")]
[Retry(2)]
public class AuthTests : BaseTest
{
    private LoginPage _loginPage = null!;

    [SetUp]
    public void TestSetup()
    {
        _loginPage = new LoginPage(Page);
    }

    [Test]
    [Category("Smoke")]
    public async Task Login_ComCredenciaisValidas_DeveRedirecionarParaInventory()
    {
        // Cenário feliz: login com usuário padrão.
        await _loginPage.OpenAsync();
        await _loginPage.LoginAsync(Config.Username, Config.Password);

        await Expect(Page).ToHaveURLAsync(new Regex("inventory\\.html$"));
        await Expect(Page.Locator("#inventory_container")).ToBeVisibleAsync();
    }

    [Test]
    [Category("Negative")]
    public async Task Login_ComSenhaInvalida_DeveExibirMensagemErro()
    {
        // Cenário negativo: senha incorreta.
        await _loginPage.OpenAsync();
        await _loginPage.LoginAsync(Config.Username, "senha_incorreta!");

        var errorText = await _loginPage.GetErrorMessageAsync();
        StringAssert.Contains(
            "Epic sadface: Username and password do not match any user in this service",
            errorText);
    }

    [Test]
    [Category("Edge")]
    [Category("Negative")]
    public async Task Login_CamposVazios_DeveInformarUsuarioObrigatorio()
    {
        // Cenário de borda: clique em login sem preencher nada.
        await _loginPage.OpenAsync();
        await Page.Locator("#login-button").ClickAsync();

        var errorText = await _loginPage.GetErrorMessageAsync();
        StringAssert.Contains("Epic sadface: Username is required", errorText);
    }
}

