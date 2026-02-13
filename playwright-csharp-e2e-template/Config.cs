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
    public static bool HeadlessMode => bool.Parse(Environment.GetEnvironmentVariable("HEADLESS_MODE") ?? "true");
    public static bool VideoRecording => bool.Parse(Environment.GetEnvironmentVariable("VIDEO_RECORDING") ?? "false");
}