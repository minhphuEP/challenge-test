import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { loginTestCases } from "../../data/testLoginData";

test.describe("Login Flow", () => {
  for (const tc of loginTestCases) {
    test(`TC${tc.id}: ${tc.description}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login(tc.username, tc.password);

      if (tc.requiredMessages) {
        const rm = tc.requiredMessages;
        if (rm.username) {
          await loginPage.expectUsernameRequired(rm.username);
        }
        if (rm.password) {
          await loginPage.expectPasswordRequired(rm.password);
        }
      } else if (tc.expectError) {
        await loginPage.expectError(tc.expectedErrorMessage!);
      } else {
        await page.waitForURL(/dashboard/);
      }
    });
  }
});
