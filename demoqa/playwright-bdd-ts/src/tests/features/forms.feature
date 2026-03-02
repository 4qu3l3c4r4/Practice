Feature: Formulários no DemoQA

  @forms @smoke @regression
  Scenario: Enviar formulário com dados válidos
    Given que estou na página de formulário de prática do DemoQA
    When eu preencho todos os campos obrigatórios com dados válidos
    And eu submeto o formulário
    Then devo ver um modal de confirmação com os dados enviados

  @forms @negative
  Scenario: Tentar enviar formulário com campos obrigatórios vazios
    Given que estou na página de formulário de prática do DemoQA
    When eu tento submeter o formulário sem preencher os campos obrigatórios
    Then os campos obrigatórios devem ser marcados como inválidos

