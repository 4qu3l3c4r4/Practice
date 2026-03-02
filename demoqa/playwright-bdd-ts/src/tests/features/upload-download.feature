Feature: Upload e Download no DemoQA

  @files @smoke @regression
  Scenario: Upload de arquivo com sucesso
    Given que estou na página de upload e download do DemoQA
    When eu faço upload de um arquivo de exemplo
    Then devo ver o caminho do arquivo enviado

  @files @edge
  Scenario: Download de arquivo gera um evento de download
    Given que estou na página de upload e download do DemoQA
    When eu faço download do arquivo
    Then o download deve ter um nome de arquivo sugerido

