package config;

import io.github.cdimascio.dotenv.Dotenv;

public class Config {
    private static final Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();

    public static String getBaseUrl() {
        return dotenv.get("BASE_URL", "http://localhost:3000");
    }

    public static String getApiToken() {
        return dotenv.get("API_TOKEN", "");
    }
}
