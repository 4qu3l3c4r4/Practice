import { test as base } from 'playwright-bdd';
import { BasicAuthPage } from '../pages/BasicAuthPage';
import { CheckboxesPage } from '../pages/CheckboxesPage';
import { DropdownPage } from '../pages/DropdownPage';
import { DynamicLoadingPage } from '../pages/DynamicLoadingPage';
import { DragAndDropPage } from '../pages/DragAndDropPage';
import { UploadPage } from '../pages/UploadPage';
import { EditorPage } from '../pages/EditorPage';
import { HoversPage } from '../pages/HoversPage';
import { JavascriptAlertsPage } from '../pages/JavascriptAlertsPage';
import { InfiniteScrollPage } from '../pages/InfiniteScrollPage';
import { WindowsPage } from '../pages/WindowsPage';

export const test = base.extend<{
  basicAuthPage: BasicAuthPage;
  checkboxesPage: CheckboxesPage;
  dropdownPage: DropdownPage;
  dynamicLoadingPage: DynamicLoadingPage;
  dragAndDropPage: DragAndDropPage;
  uploadPage: UploadPage;
  editorPage: EditorPage;
  hoversPage: HoversPage;
  javascriptAlertsPage: JavascriptAlertsPage;
  infiniteScrollPage: InfiniteScrollPage;
  windowsPage: WindowsPage;
  basicAuthUsername: string;
  basicAuthPassword: string;
}>({
  basicAuthUsername: async ({}, use) => {
    await use(process.env.BASIC_AUTH_USERNAME || 'admin');
  },
  basicAuthPassword: async ({}, use) => {
    await use(process.env.BASIC_AUTH_PASSWORD || 'admin');
  },
  basicAuthPage: async ({ page }, use) => {
    await use(new BasicAuthPage(page));
  },
  checkboxesPage: async ({ page }, use) => {
    await use(new CheckboxesPage(page));
  },
  dropdownPage: async ({ page }, use) => {
    await use(new DropdownPage(page));
  },
  dynamicLoadingPage: async ({ page }, use) => {
    await use(new DynamicLoadingPage(page));
  },
  dragAndDropPage: async ({ page }, use) => {
    await use(new DragAndDropPage(page));
  },
  uploadPage: async ({ page }, use) => {
    await use(new UploadPage(page));
  },
  editorPage: async ({ page }, use) => {
    await use(new EditorPage(page));
  },
  hoversPage: async ({ page }, use) => {
    await use(new HoversPage(page));
  },
  javascriptAlertsPage: async ({ page }, use) => {
    await use(new JavascriptAlertsPage(page));
  },
  infiniteScrollPage: async ({ page }, use) => {
    await use(new InfiniteScrollPage(page));
  },
  windowsPage: async ({ page }, use) => {
    await use(new WindowsPage(page));
  },
});

