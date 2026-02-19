package config;

import io.github.cdimascio.dotenv.Dotenv;

public class Config {
    private static final Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();

    private static String get(String key, String defaultValue) {
        return System.getProperty(key, dotenv.get(key, defaultValue));
    }

    public static String getAppiumUrl()          { return get("APPIUM_URL", "http://127.0.0.1:4723"); }
    public static String getPlatformName()       { return get("PLATFORM_NAME", "Android"); }
    public static String getDeviceName()         { return get("DEVICE_NAME", "emulator-5554"); }
    public static String getAppPackage()         { return get("APP_PACKAGE", "com.android.settings"); }
    public static String getAppActivity()        { return get("APP_ACTIVITY", ".Settings"); }
    public static String getIosDeviceName()      { return get("IOS_DEVICE_NAME", "iPhone 15"); }
    public static String getIosPlatformVersion() { return get("IOS_PLATFORM_VERSION", "17.4"); }
    public static String getIosBundleId()        { return get("IOS_BUNDLE_ID", "com.apple.Preferences"); }

    public static boolean isIos() {
        return getPlatformName().equalsIgnoreCase("iOS");
    }
}
