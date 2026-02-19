namespace AppiumE2E;

public static class Config
{
    public static string AppiumUrl => Environment.GetEnvironmentVariable("APPIUM_URL") ?? "http://localhost:4723";
    public static string PlatformName => Environment.GetEnvironmentVariable("PLATFORM_NAME") ?? "Android";

    // Android
    public static string DeviceName => Environment.GetEnvironmentVariable("DEVICE_NAME") ?? "emulator-5554";
    public static string AppPackage => Environment.GetEnvironmentVariable("APP_PACKAGE") ?? "com.android.settings";
    public static string AppActivity => Environment.GetEnvironmentVariable("APP_ACTIVITY") ?? ".Settings";

    // iOS
    public static string IosDeviceName => Environment.GetEnvironmentVariable("IOS_DEVICE_NAME") ?? "iPhone 15";
    public static string IosPlatformVersion => Environment.GetEnvironmentVariable("IOS_PLATFORM_VERSION") ?? "17.4";
    public static string IosBundleId => Environment.GetEnvironmentVariable("IOS_BUNDLE_ID") ?? "com.apple.Preferences";

    public static bool IsIos => PlatformName.Equals("iOS", StringComparison.OrdinalIgnoreCase);
}
