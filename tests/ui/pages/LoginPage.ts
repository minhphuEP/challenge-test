import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly userInput: Locator;
  readonly passInput: Locator;
  readonly loginBtn: Locator;
  readonly errorMsg: Locator;
  readonly usernameRequiredMsg: Locator;
  readonly passwordRequiredMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userInput = page.locator('input[name="username"]');
    this.passInput = page.locator('input[name="password"]');
    this.loginBtn = page.locator('button[type="submit"]');
    this.errorMsg = page.locator("p.oxd-alert-content-text");
    this.usernameRequiredMsg = page.locator(
      `xpath=(//input[@name="username"]/parent::div/following::span)[1]`
    );
    this.passwordRequiredMsg = page.locator(
      `xpath=(//input[@name="password"]/parent::div/following::span)[1]`
    );
  }

  async goto() {
    await this.page.goto("/");
  }

  async login(username: string, password: string) {
    await this.userInput.fill(username);
    await this.passInput.fill(password);
    await this.loginBtn.click();
  }

  async expectError(message: string) {
    await expect(this.errorMsg).toHaveText(message);
  }

  async expectUsernameRequired(message: string) {
    await expect(this.usernameRequiredMsg).toHaveText(message);
  }

  async expectPasswordRequired(message: string) {
    await expect(this.passwordRequiredMsg).toHaveText(message);
  }
}
