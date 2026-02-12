namespace AppiumE2E;

public static class Config
{
    public static string AppiumUrl => Environment.GetEnvironmentVariable("APPIUM_URL") ?? "http://localhost:4723";
    public static string PlatformName => Environment.GetEnvironmentVariable("PLATFORM_NAME") ?? "Android";
    public static string DeviceName => Environment.GetEnvironmentVariable("DEVICE_NAME") ?? "emulator-5554";
    public static string AppPackage => Environment.GetEnvironmentVariable("APP_PACKAGE") ?? "com.example.app";
    public static string AppActivity => Environment.GetEnvironmentVariable("APP_ACTIVITY") ?? ".MainActivity";
}