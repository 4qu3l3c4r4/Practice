package tests;

import config.Config;
import io.restassured.RestAssured;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

@Tag("smoke")
public class ApiTest {

    @BeforeAll
    public static void setup() {
        RestAssured.baseURI = Config.getBaseUrl();
    }

    @Test
    void health_check_returns_200() {
        get("/api/health").then().statusCode(200);
    }

    @Test
    void get_users_returns_array() {
        get("/api/users").then()
                .statusCode(200)
                .body("$", instanceOf(java.util.List.class));
    }

    @Test
    void create_user() {
        given()
                .contentType("application/json")
                .body("{\"name\":\"Test User\",\"email\":\"test@example.com\"}")
        .when()
                .post("/api/users")
        .then()
                .statusCode(201)
                .body("id", notNullValue());
    }

    @Test
    void unknown_route_returns_404() {
        get("/api/nonexistent").then().statusCode(404);
    }
}
