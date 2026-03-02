Feature: Autenticação no Swag Labs (Cucumber)

  @login @smoke @regression
  Scenario: Login bem-sucedido com credenciais válidas
    Given que estou na página de login do Swag Labs
    When eu faço login com credenciais válidas
    Then devo ser redirecionado para a página de inventário

  @login @negative @regression
  Scenario: Login falha com senha inválida
    Given que estou na página de login do Swag Labs
    When eu tento fazer login com senha inválida
    Then devo ver uma mensagem de erro de credenciais inválidas

  @login @negative @edge
  Scenario: Login falha com campos vazios
    Given que estou na página de login do Swag Labs
    When eu tento fazer login sem preencher usuário e senha
    Then devo ver uma mensagem informando que o usuário é obrigatório

