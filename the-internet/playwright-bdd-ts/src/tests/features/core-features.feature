Feature: Funcionalidades principais no The Internet

  @checkboxes @regression
  Scenario: Alternar estado do primeiro checkbox
    Given que estou na página de checkboxes do The Internet
    When eu alterno o primeiro checkbox
    Then o primeiro checkbox deve estar marcado

  @dropdown @regression
  Scenario: Selecionar opção no dropdown
    Given que estou na página de dropdown do The Internet
    When eu seleciono a opção "Option 2"
    Then o dropdown deve exibir "Option 2"

  @dynamic @smoke @regression
  Scenario: Carregamento dinâmico exibe Hello World
    Given que estou na página de carregamento dinâmico do The Internet
    When eu inicio o carregamento
    Then devo ver o texto "Hello World!"

  @dragdrop @regression
  Scenario: Arrastar coluna A para B
    Given que estou na página de drag and drop do The Internet
    When eu arrasto a coluna A para a coluna B
    Then as colunas devem trocar de posição

  @upload @regression
  Scenario: Upload de arquivo com sucesso
    Given que estou na página de upload do The Internet
    When eu faço upload de um arquivo de exemplo
    Then o nome do arquivo deve ser exibido como enviado

  @editor @regression
  Scenario: Editar texto no editor WYSIWYG
    Given que estou na página do editor do The Internet
    When eu preencho o editor com "Texto de teste"
    Then o editor deve conter "Texto de teste"

  @hovers @edge
  Scenario: Exibir legenda ao passar o mouse
    Given que estou na página de hovers do The Internet
    When eu passo o mouse sobre a primeira imagem
    Then devo ver a legenda visível

