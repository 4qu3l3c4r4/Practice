Feature: Web Tables no DemoQA

  @tables @smoke @regression
  Scenario: Adicionar e remover um registro
    Given que estou na página de web tables do DemoQA
    When eu adiciono um novo registro válido
    Then a tabela deve conter o email do novo registro
    When eu removo o registro pelo email
    Then o email não deve mais aparecer na tabela

  @tables @negative
  Scenario: Tentar cadastrar registro sem email
    Given que estou na página de web tables do DemoQA
    When eu tento adicionar um registro sem email
    Then o campo de email deve ser marcado como inválido

