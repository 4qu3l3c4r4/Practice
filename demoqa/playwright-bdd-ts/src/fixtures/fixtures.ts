import { test as base } from 'playwright-bdd';
import { PracticeFormPage } from '../pages/PracticeFormPage';
import { CheckBoxPage } from '../pages/CheckBoxPage';
import { RadioButtonPage } from '../pages/RadioButtonPage';
import { SelectMenuPage } from '../pages/SelectMenuPage';
import { UploadDownloadPage } from '../pages/UploadDownloadPage';
import { AlertsPage } from '../pages/AlertsPage';
import { DroppablePage } from '../pages/DroppablePage';
import { WebTablesPage } from '../pages/WebTablesPage';
import { FramesPage } from '../pages/FramesPage';
import { ModalDialogsPage } from '../pages/ModalDialogsPage';
import { ToolTipsPage } from '../pages/ToolTipsPage';
import { DatePickerPage } from '../pages/DatePickerPage';
import { SliderPage } from '../pages/SliderPage';

export const test = base.extend<{
  practiceFormPage: PracticeFormPage;
  checkBoxPage: CheckBoxPage;
  radioButtonPage: RadioButtonPage;
  selectMenuPage: SelectMenuPage;
  uploadDownloadPage: UploadDownloadPage;
  alertsPage: AlertsPage;
  droppablePage: DroppablePage;
  webTablesPage: WebTablesPage;
  framesPage: FramesPage;
  modalDialogsPage: ModalDialogsPage;
  toolTipsPage: ToolTipsPage;
  datePickerPage: DatePickerPage;
  sliderPage: SliderPage;
}>({
  practiceFormPage: async ({ page }, use) => {
    await use(new PracticeFormPage(page));
  },
  checkBoxPage: async ({ page }, use) => {
    await use(new CheckBoxPage(page));
  },
  radioButtonPage: async ({ page }, use) => {
    await use(new RadioButtonPage(page));
  },
  selectMenuPage: async ({ page }, use) => {
    await use(new SelectMenuPage(page));
  },
  uploadDownloadPage: async ({ page }, use) => {
    await use(new UploadDownloadPage(page));
  },
  alertsPage: async ({ page }, use) => {
    await use(new AlertsPage(page));
  },
  droppablePage: async ({ page }, use) => {
    await use(new DroppablePage(page));
  },
  webTablesPage: async ({ page }, use) => {
    await use(new WebTablesPage(page));
  },
  framesPage: async ({ page }, use) => {
    await use(new FramesPage(page));
  },
  modalDialogsPage: async ({ page }, use) => {
    await use(new ModalDialogsPage(page));
  },
  toolTipsPage: async ({ page }, use) => {
    await use(new ToolTipsPage(page));
  },
  datePickerPage: async ({ page }, use) => {
    await use(new DatePickerPage(page));
  },
  sliderPage: async ({ page }, use) => {
    await use(new SliderPage(page));
  },
});

