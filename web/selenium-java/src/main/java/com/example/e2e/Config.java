package com.example.e2e;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Stream;

public final class Config {
    private static final Map<String, String> ENV = new HashMap<>(System.getenv());

    static {
        Path envFile = Path.of(System.getProperty("user.dir"), ".env");
        if (Files.exists(envFile)) {
            try {
                Files.lines(envFile)
                    .filter(line -> line.contains("=") && !line.trim().startsWith("#"))
                    .forEach(line -> {
                        int eq = line.indexOf('=');
                        String key = line.substring(0, eq).trim();
                        String value = line.substring(eq + 1).trim();
                        if (value.startsWith("\"") && value.endsWith("\""))
                            value = value.substring(1, value.length() - 1);
                        ENV.put(key, value);
                    });
            } catch (Exception ignored) {}
        }
    }

    public static String getBaseUrl() {
        return get("BASE_URL", "http://localhost:3000").replaceAll("/$", "");
    }

    public static String getUsername() {
        return get("UI_USERNAME", "");
    }

    public static String getPassword() {
        return get("UI_PASSWORD", "");
    }

    public static boolean isHeadless() {
        return "true".equalsIgnoreCase(get("HEADLESS", "true"));
    }

    public static String getBrowser() {
        return get("BROWSER", "chrome").toLowerCase();
    }

    private static String get(String key, String defaultValue) {
        return ENV.getOrDefault(key, System.getProperty(key, defaultValue));
    }
}
