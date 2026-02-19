package config;

import io.github.cdimascio.dotenv.Dotenv;

public class Config {
    private static final Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
    
    public static final String BASE_URL = dotenv.get("BASE_URL", "https://example.com");
    public static final String UI_USERNAME = dotenv.get("UI_USERNAME", "test@example.com");
    public static final String UI_PASSWORD = dotenv.get("UI_PASSWORD", "password123");
}