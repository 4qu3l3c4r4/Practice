Feature: Alerts no DemoQA

  @alerts @smoke @regression
  Scenario: Aceitar um alert simples
    Given que estou na página de alerts do DemoQA
    When eu abro e aceito um alert simples
    Then a página deve continuar utilizável

  @alerts @negative
  Scenario: Dismiss em confirm deve indicar Cancel
    Given que estou na página de alerts do DemoQA
    When eu abro um confirm e clico em cancelar
    Then devo ver um resultado indicando "Cancel"

  @alerts @edge
  Scenario: Prompt com texto deve aparecer no resultado
    Given que estou na página de alerts do DemoQA
    When eu abro um prompt e informo "Texto QA"
    Then devo ver um resultado contendo "Texto QA"

