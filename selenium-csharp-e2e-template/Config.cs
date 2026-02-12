using DotNetEnv;

public static class Config
{
    static Config()
    {
        Env.Load();
    }

    public static string BaseUrl => Environment.GetEnvironmentVariable("BASE_URL") ?? "https://example.com";
    public static string Username => Environment.GetEnvironmentVariable("UI_USERNAME") ?? "test@example.com";
    public static string Password => Environment.GetEnvironmentVariable("UI_PASSWORD") ?? "password123";
}