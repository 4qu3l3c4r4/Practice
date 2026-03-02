Feature: Elementos básicos no DemoQA

  @elements @smoke @regression
  Scenario: Selecionar checkbox "Home" e ver resultado
    Given que estou na página de checkboxes do DemoQA
    When eu seleciono o checkbox Home
    Then devo ver o resultado contendo "home"

  @elements @regression
  Scenario: Selecionar radio "Yes" e ver mensagem
    Given que estou na página de radio buttons do DemoQA
    When eu seleciono a opção Yes
    Then devo ver o texto "Yes" como resultado

  @elements @edge
  Scenario: Alternar radio entre Yes e Impressive
    Given que estou na página de radio buttons do DemoQA
    When eu seleciono a opção Yes
    And eu seleciono a opção Impressive
    Then devo ver o texto "Impressive" como resultado

  @elements @regression
  Scenario: Selecionar opção no dropdown antigo
    Given que estou na página de select menu do DemoQA
    When eu seleciono "Purple" no dropdown antigo
    Then o dropdown antigo deve estar com "Purple" selecionado

