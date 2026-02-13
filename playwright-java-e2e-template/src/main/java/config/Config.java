package config;

import io.github.cdimascio.dotenv.Dotenv;

public class Config {
    private static final Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();

    public static String getBaseUrl() {
        return dotenv.get("BASE_URL", "https://your-app.example.com");
    }

    public static String getUsername() {
        return dotenv.get("UI_USERNAME", "your-username@example.com");
    }

    public static String getPassword() {
        return dotenv.get("UI_PASSWORD", "your-password");
    }

    public static boolean isHeadless() {
        return Boolean.parseBoolean(dotenv.get("HEADLESS", "true"));
    }

    public static boolean isVideoRecordingEnabled() {
        return Boolean.parseBoolean(dotenv.get("VIDEO_RECORDING", "false"));
    }
}