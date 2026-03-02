// Selectors centrais para páginas principais do DemoQA.
// Mantemos aqui os seletores usados pelos Page Objects.

export const selectors = {
  forms: {
    firstNameInput: '#firstName',
    lastNameInput: '#lastName',
    emailInput: '#userEmail',
    genderRadioMale: 'label[for="gender-radio-1"]',
    mobileInput: '#userNumber',
    submitButton: '#submit',
    confirmationModal: '.modal-content',
  },
  elements: {
    checkBox: {
      expandAllButton: 'button[title="Expand all"]',
      homeCheckbox: 'label[for="tree-node-home"] span.rct-checkbox',
      result: '#result',
    },
    radioButton: {
      yesLabel: 'label[for="yesRadio"]',
      impressiveLabel: 'label[for="impressiveRadio"]',
      output: '.text-success',
    },
    selectMenu: {
      oldSelect: '#oldSelectMenu',
    },
    uploadDownload: {
      uploadInput: '#uploadFile',
      uploadedPath: '#uploadedFilePath',
      downloadButton: '#downloadButton',
    },
    webTables: {
      addButton: '#addNewRecordButton',
      searchBox: '#searchBox',
      submitButton: '#submit',
      firstName: '#firstName',
      lastName: '#lastName',
      email: '#userEmail',
      age: '#age',
      salary: '#salary',
      department: '#department',
      tableBody: '.rt-tbody',
    },
    slider: {
      slider: 'input[type="range"]',
      value: '#sliderValue',
    },
  },
  alerts: {
    alertButton: '#alertButton',
    confirmButton: '#confirmButton',
    promptButton: '#promtButton',
    confirmResult: '#confirmResult',
    promptResult: '#promptResult',
  },
  interactions: {
    droppable: {
      draggable: '#draggable',
      droppable: '#droppable',
    },
  },
  frames: {
    frame1: '#frame1',
    frameHeading: '#sampleHeading',
  },
  modalDialogs: {
    showSmallModal: '#showSmallModal',
    smallModal: '#example-modal-sizes-title-sm',
    closeSmallModal: '#closeSmallModal',
  },
  toolTips: {
    toolTipButton: '#toolTipButton',
    toolTipInner: '.tooltip-inner',
  },
  datePicker: {
    dateInput: '#datePickerMonthYearInput',
    dateTimeInput: '#dateAndTimePickerInput',
  },
};

