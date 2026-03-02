Feature: Funcionalidades avançadas no The Internet

  @alerts @regression
  Scenario: Interagir com alerts JavaScript
    Given que estou na página de alerts JavaScript do The Internet
    When eu aceito o alert simples
    And eu cancelo o confirm
    And eu preencho o prompt com "QA"
    Then o resultado deve indicar as ações realizadas

  @scroll @edge
  Scenario: Infinite scroll carrega mais conteúdo
    Given que estou na página de infinite scroll do The Internet
    When eu rolo até carregar pelo menos 5 parágrafos
    Then a página deve conter pelo menos 5 parágrafos

  @windows @regression
  Scenario: Abrir nova janela
    Given que estou na página de múltiplas janelas do The Internet
    When eu abro uma nova janela
    Then devo ver o texto "New Window" na nova janela

