import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { searchTestCases } from "../../data/testSearchData";
import { config } from "../../utils/config";

test.describe("Search Users Flow", () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    await login.goto();
    await login.login(config.username, config.password);
    await page.waitForURL(/dashboard/);
    await dashboard.goto();
  });

  for (const tc of searchTestCases) {
    test(`TC${tc.id}: ${tc.description}`, async ({ page }) => {
      const dashboard = new DashboardPage(page);
      const { username, userRole, employeeName, status } = tc.criteria;

      if (username !== undefined) await dashboard.setUsername(username);
      if (userRole !== undefined) await dashboard.setUserRole(userRole);
      if (employeeName !== undefined)
        await dashboard.setEmployeeName(employeeName);
      if (status !== undefined) await dashboard.setStatus(status);

      const { showSearchingIndicator } = tc.validations;
      if (!showSearchingIndicator) {
        await dashboard.search();
      }

      const v = tc.validations;
      if (v.rowCountGreaterThanZero) {
        const rowsLocator = page.locator(
          'div[role="rowgroup"] div[role="row"]'
        );
        await expect(rowsLocator.first()).toBeVisible({ timeout: 5000 });
        const count = await dashboard.getRowCount();
        expect(count).toBeGreaterThan(0);
      }
      if (v.firstCellTextEquals) {
        const actual = (
          await page.getByText(v.firstCellTextEquals).nth(2).textContent()
        )?.trim();
        expect(actual).toBe(v.firstCellTextEquals);
      }
      if (v.noRecordsFound) {
        await dashboard.search();
        await dashboard.expectNoRecords();
      }
      if (v.showErrorState) {
        await dashboard.expectEmployeeErrorState();
      }
      if (v.resetFields) {
        await dashboard.search();
        await dashboard.reset();
        await dashboard.expectFiltersReset();
      }
      if (v.caseInsensitiveCompare && username) {
        const countLower = await dashboard.searchAndGetCount(username);
        const countUpper = await dashboard.searchAndGetCount(
          username.toUpperCase()
        );
        expect(countLower).toBe(countUpper);
      }
    });
  }
});
