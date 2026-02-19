# REST Assured + Java API Template

API test template using REST Assured with Maven and JUnit 5.

## Setup

```bash
cp .env.example .env
mvn install
```

## Running tests

```bash
mvn test                        # all tests
mvn test -Dgroups=smoke         # smoke tests only
```

## Environment variables

| Variable    | Description     | Default                  |
|------------|-----------------|--------------------------|
| `BASE_URL` | API base URL    | `http://localhost:3000`  |
| `API_TOKEN`| Auth token      | -                        |

## Project structure

```
├── src/
│   ├── main/java/config/Config.java
│   └── test/java/tests/ApiTest.java
├── pom.xml
└── .env.example
```
