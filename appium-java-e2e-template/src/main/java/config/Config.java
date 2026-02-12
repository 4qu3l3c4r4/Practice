package config;

import io.github.cdimascio.dotenv.Dotenv;

public class Config {
    private static final Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();

    public static String getAppiumUrl() {
        return System.getProperty("APPIUM_URL", dotenv.get("APPIUM_URL", "http://127.0.0.1:4723"));
    }

    public static String getPlatformName() {
        return System.getProperty("PLATFORM_NAME", dotenv.get("PLATFORM_NAME", "Android"));
    }

    public static String getDeviceName() {
        return System.getProperty("DEVICE_NAME", dotenv.get("DEVICE_NAME", "emulator-5554"));
    }

    public static String getAppPackage() {
        return System.getProperty("APP_PACKAGE", dotenv.get("APP_PACKAGE", "com.android.settings"));
    }

    public static String getAppActivity() {
        return System.getProperty("APP_ACTIVITY", dotenv.get("APP_ACTIVITY", ".Settings"));
    }
}