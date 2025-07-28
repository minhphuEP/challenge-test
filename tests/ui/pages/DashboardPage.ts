import { Page, Locator, expect } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly adminMenuItem: Locator;
  readonly searchInput: Locator;
  readonly userRoleDropdown: Locator;
  readonly employeeNameInput: Locator;
  readonly statusDropdown: Locator;
  readonly searchBtn: Locator;
  readonly resetBtn: Locator;
  readonly noRecords: Locator;
  readonly errorMsg: Locator;
  readonly invalidMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.adminMenuItem = page.getByRole("link", { name: "Admin" });
    this.searchInput = page.locator('input[placeholder="Search"]');
    this.userRoleDropdown = page.locator("div.oxd-select-text--after").first();
    this.employeeNameInput = page.locator(
      'input[placeholder="Type for hints..."]'
    );
    this.statusDropdown = page.locator("div.oxd-select-text--after").last();
    this.searchBtn = page.locator('button[type="submit"]', {
      hasText: "Search",
    });
    this.resetBtn = page.locator('button[type="button"]', { hasText: "Reset" });
    this.noRecords = page.getByText("No Records Found", { exact: true });
    this.errorMsg = page.locator("span.ac_input_error");
    this.invalidMsg = page.locator(
      `xpath=(//label[text()="Employee Name"]/parent::div//following::span[text()="Invalid"])`
    );
  }

  async goto() {
    await this.page.goto("/web/index.php/admin/viewSystemUsers");
  }

  async goToAdminModule() {
    await this.adminMenuItem.click();
    await this.page.waitForURL(/viewSystemUsers/);
  }

  async setUsername(username: string) {
    await this.searchInput.fill(username);
  }

  async setUserRole(role: string) {
    await this.userRoleDropdown.click();
    await this.page.getByRole("option", { name: role }).click();
  }

  async setEmployeeName(name: string) {
    await this.employeeNameInput.fill(name);
  }

  async setStatus(status: string) {
    await this.statusDropdown.click();
    await this.page.getByRole("option", { name: status }).click();
  }

  async search() {
    await this.searchBtn.click();
  }

  async reset() {
    await this.resetBtn.click();
  }

  async getRowCount(): Promise<number> {
    return await this.page
      .locator('div[role="rowgroup"] div[role="row"]')
      .count();
  }

  async getCellText(row: number, col: number): Promise<string | null> {
    const rowLocator = this.page
      .locator('div.oxd-table-body div.oxd-table-row[role="row"]')
      .nth(row - 1);
    await expect(rowLocator).toBeVisible({ timeout: 5000 });

    const cellLocator = rowLocator
      .locator('div.oxd-table-cell[role="cell"] div')
      .nth(col - 1);
    await expect(cellLocator).toBeVisible({ timeout: 5000 });

    return cellLocator.textContent();
  }

  async expectNoRecords() {
    await expect(this.noRecords).toBeVisible();
  }

  async getInvalidMessageText(): Promise<string> {
    const text = await this.invalidMsg.textContent();
    return text?.trim() ?? "";
  }

  async expectInvalidMessage() {
    await expect(this.invalidMsg).toBeVisible();
  }

  async expectEmployeeErrorState() {
    await expect(this.errorMsg).toBeVisible();
  }

  async expectFiltersReset() {
    await expect(this.employeeNameInput).toHaveValue("");
  }

  async searchAndGetCount(username: string): Promise<number> {
    await this.setUsername(username);
    await this.search();
    return this.getRowCount();
  }
}
