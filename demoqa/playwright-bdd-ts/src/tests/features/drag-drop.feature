Feature: Drag and Drop no DemoQA

  @dnd @smoke @regression
  Scenario: Arrastar e soltar com sucesso
    Given que estou na página de droppable do DemoQA
    When eu arrasto o elemento até a área de drop
    Then devo ver o estado "Dropped!"

