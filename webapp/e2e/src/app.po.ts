import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getFooterLeftText(): Promise<string> {
    return element(by.css('app-root footer div.has-text-left small')).getText() as Promise<string>;
  }
}
