using DotNetEnv;

public static class Config
{
    static Config()
    {
        // Carrega variáveis de ambiente do arquivo .env na raiz do projeto.
        Env.Load();
    }

    public static string BaseUrl => Environment.GetEnvironmentVariable("BASE_URL") ?? "https://www.saucedemo.com";
    public static string Username => Environment.GetEnvironmentVariable("UI_USERNAME") ?? "standard_user";
    public static string Password => Environment.GetEnvironmentVariable("UI_PASSWORD") ?? "secret_sauce";
    public static bool HeadlessMode => bool.Parse(Environment.GetEnvironmentVariable("HEADLESS_MODE") ?? "true");
    public static bool VideoRecording => bool.Parse(Environment.GetEnvironmentVariable("VIDEO_RECORDING") ?? "false");
}

