function fn() {
  var config = {
    baseUrl: karate.properties['BASE_URL'] || java.lang.System.getProperty('BASE_URL') || 'http://localhost:8080',
    username: karate.properties['UI_USERNAME'] || java.lang.System.getProperty('UI_USERNAME') || 'test@example.com',
    password: karate.properties['UI_PASSWORD'] || java.lang.System.getProperty('UI_PASSWORD') || 'password'
  };
  
  karate.log('Base URL:', config.baseUrl);
  return config;
}