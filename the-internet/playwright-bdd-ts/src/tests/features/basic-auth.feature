Feature: Autenticação básica no The Internet

  @auth @smoke @regression
  Scenario: Acessar /basic_auth com credenciais válidas
    Given que acesso a página de basic auth com credenciais válidas
    Then devo ver a mensagem de sucesso de autenticação

