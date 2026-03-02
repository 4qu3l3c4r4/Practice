Feature: Checkout no Swag Labs

  # Fluxos críticos de negócio: adicionar produto ao carrinho e finalizar compra.

  @e2e @smoke @regression
  Scenario: Cliente realiza compra de uma mochila com sucesso
    Given que estou autenticado no Swag Labs
    And eu estou na lista de produtos
    When eu adiciono a mochila ao carrinho
    And eu abro o carrinho
    And eu inicio o checkout com dados válidos
    Then o pedido deve ser concluído com sucesso
    And devo ver o resumo de totais do pedido

  @e2e @negative
  Scenario: Checkout falha quando o primeiro nome está em branco
    Given que estou autenticado no Swag Labs
    And eu estou na lista de produtos
    When eu adiciono a mochila ao carrinho
    And eu abro o carrinho
    And eu tento iniciar o checkout sem preencher o primeiro nome
    Then devo ver uma mensagem de erro informando que o primeiro nome é obrigatório

