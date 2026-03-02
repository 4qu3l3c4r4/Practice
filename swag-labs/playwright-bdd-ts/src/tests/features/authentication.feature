Feature: Autenticação no Swag Labs

  # Cenários de autenticação básicos. Estes cenários são a base para os fluxos
  # de negócio (checkout, carrinho, etc.).

  @login @smoke @regression
  Scenario: Login bem-sucedido com credenciais válidas
    Given que estou na página de login do Swag Labs
    When eu faço login com credenciais válidas
    Then devo ver a lista de produtos na tela inicial

  @login @negative @regression
  Scenario: Login falha com senha inválida
    Given que estou na página de login do Swag Labs
    When eu tento fazer login com usuário válido e senha inválida
    Then devo ver uma mensagem de erro informando que as credenciais são inválidas

  @login @negative
  Scenario: Login falha com usuário bloqueado
    Given que estou na página de login do Swag Labs
    When eu tento fazer login com um usuário bloqueado
    Then devo ver uma mensagem indicando que o usuário está bloqueado

  @login @edge @negative
  Scenario: Login com campos vazios
    Given que estou na página de login do Swag Labs
    When eu tento fazer login sem preencher usuário e senha
    Then devo ver uma mensagem de erro informando que o usuário é obrigatório

