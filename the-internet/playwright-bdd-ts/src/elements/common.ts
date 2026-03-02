// Selectors centrais para The Internet (HerokuApp).

export const selectors = {
  basicAuth: {
    successMessage: 'p',
  },
  checkboxes: {
    firstCheckbox: 'form#checkboxes input[type="checkbox"]:nth-of-type(1)',
    secondCheckbox: 'form#checkboxes input[type="checkbox"]:nth-of-type(2)',
  },
  dropdown: {
    select: '#dropdown',
  },
  dynamicLoading: {
    startButton: '#start button',
    finishText: '#finish h4',
  },
  dragAndDrop: {
    columnA: '#column-a',
    columnB: '#column-b',
  },
  upload: {
    fileInput: '#file-upload',
    submitButton: '#file-submit',
    uploadedFiles: '#uploaded-files',
  },
  download: {
    fileLink: 'a[href^="download/"]',
  },
  frames: {
    iframe: '#mce_0_ifr',
    editorBody: 'body#tinymce',
  },
  hovers: {
    figure: '.figure:nth-of-type(1)',
    caption: '.figure:nth-of-type(1) .figcaption',
  },
  javascriptAlerts: {
    jsAlertButton: 'button[onclick="jsAlert()"]',
    jsConfirmButton: 'button[onclick="jsConfirm()"]',
    jsPromptButton: 'button[onclick="jsPrompt()"]',
    result: '#result',
  },
  shadowDom: {
    content: '#content',
  },
  infiniteScroll: {
    paragraphs: '#content p',
  },
  windows: {
    clickHereLink: 'a[href="/windows/new"]',
  },
};

