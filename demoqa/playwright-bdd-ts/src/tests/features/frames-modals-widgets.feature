Feature: Frames, Modais, Tooltips, DatePicker e Slider no DemoQA

  @frames @smoke @regression
  Scenario: Ler texto dentro do frame
    Given que estou na página de frames do DemoQA
    Then devo ver o texto "This is a sample page" dentro do frame

  @modals @regression
  Scenario: Abrir e fechar um modal pequeno
    Given que estou na página de modal dialogs do DemoQA
    When eu abro o modal pequeno
    Then devo ver o modal pequeno visível
    When eu fecho o modal pequeno
    Then o modal pequeno não deve estar visível

  @tooltips @edge
  Scenario: Tooltip aparece ao passar o mouse
    Given que estou na página de tool tips do DemoQA
    When eu passo o mouse sobre o botão com tooltip
    Then devo ver o tooltip visível

  @datepicker @regression
  Scenario: Preencher date picker via input
    Given que estou na página de date picker do DemoQA
    When eu preencho a data com "03/02/2026"
    Then o campo de data deve conter "03/02/2026"

  @slider @regression
  Scenario: Ajustar slider para um valor específico
    Given que estou na página de slider do DemoQA
    When eu ajusto o slider para 50
    Then o valor do slider deve ser 50

