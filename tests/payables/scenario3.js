import { test, expect } from "@playwright/test";

const {
  addWorksheet,
  saveWorkbook,
  logStep,
} = require("../../logs/excel-helper.js");
const testName = "test-Payables-scenario3";
const { getFormattedDateTime } = require("../../utils/utils.js");

export async function runScenario3(page) {
  const sheet = addWorksheet(testName);
  await logStep(sheet, "Invoices geklikt", async () => {
    await page.waitForTimeout(3000);
    await page.getByRole("link", { name: "Tasks" }).click();
    await page.getByRole("button", { name: "Create" }).click();
  });
  await logStep(sheet, "Create invoice gestart", async () => {
    await page.getByTitle("Search: Business Unit").click();
    await page.getByText("Profource BV").first().click();
  });
  await logStep(
    sheet,
    "Business Unit is geselecteerd: Profource BV",
    async () => {
      await page.getByRole("link", { name: "Search: Supplier" }).click();
      await page
        .getByRole("textbox", { name: "Supplier", exact: true })
        .click();
      await page
        .getByRole("textbox", { name: "Supplier", exact: true })
        .fill("Interim Finance Group B.V.");
    }
  );
  await logStep(
    sheet,
    "Supplier Interim Finance Group B.V. is geselecteerd",
    async () => {
      await page
        .getByRole("textbox", { name: "Supplier", exact: true })
        .press("Enter");
      await page.getByText("Interim Finance Group B.V.").click();
      await page.getByRole("button", { name: "OK" }).click();
      await page.getByTitle("Search: Supplier Site").click();
      await page.getByRole("cell", { name: "Amsterdam", exact: true }).click();
    }
  );
  await logStep(sheet, "Gegevens zijn ingevuld", async () => {
    await page.getByRole("textbox", { name: "Number" }).click();
    await page
      .getByRole("textbox", { name: "Number" })
      .fill("Test-Scenario-EC-3" + getFormattedDateTime());
    await page.getByRole("textbox", { name: "Amount" }).click();
    await page.getByRole("textbox", { name: "Amount" }).fill("-1210");
    await page.getByRole("textbox", { name: "Amount" }).press("Tab");
    await page
      .locator(
        'select[name="_FOpt1:_FOr1:0:_FONSr2:0:MAnt2:1:pm1:r1:0:ap1:r2:0:so1"]'
      )
      .selectOption("3");
    await page.getByRole("button", { name: "OK" }).click();
    await page.getByRole("button", { name: "Expand Lines" }).click();
    await page.getByRole("button", { name: "Collapse Lines" }).click();
    await page.getByRole("button", { name: "Expand Lines" }).click();
  });
  await logStep(sheet, "Distribution Combination zijn ingevuld", async () => {
    await page
      .getByRole("row", { name: "1 Item Type Amount" })
      .getByLabel("Amount")
      .click();
    await page
      .getByRole("row", { name: "1 Item Type Amount" })
      .getByLabel("Amount")
      .fill("-1000");
    await page
      .getByRole("textbox", { name: "Distribution Combination ID" })
      .click();
    await page
      .getByRole("textbox", { name: "Distribution Combination ID" })
      .fill("20-80500-40410-0000-104236-12882-00000-00000-00-00000");
    await page
      .getByRole("textbox", { name: "Distribution Combination ID" })
      .press("Tab");
  });
  await logStep(sheet, "Validate is uitgevoerd", async () => {
    await page
      .getByRole("menuitem", { name: "Invoice Actions" })
      .locator("div")
      .click();
    await page.getByText("Validate").click();
  });
  await logStep(sheet, "Invoice actions save", async () => {
    await page.getByRole("button", { name: "Save", exact: true }).click();
  });
  await logStep(sheet, "Invoice actions View Approval", async () => {
    await page
      .getByRole("menuitem", { name: "Invoice Actions" })
      .locator("div")
      .click();
    await page
      .getByText("View Approval and Notification History", { exact: true })
      .click();
    await page.getByRole("button", { name: "Done" }).click();
  });
  await logStep(sheet, "Invoice actions approval", async () => {
    await page
      .getByRole("menuitem", { name: "Invoice Actions" })
      .locator("div")
      .click();
    await page.getByText("Approval", { exact: true }).click();
    await page.getByText("Initiate").click();
  });
  await page
    .getByRole("button", { name: "Save", exact: true })
    .click({ timeout: 10000 });
  await page.waitForSelector("text=Last Saved", { timeout: 10000 });
  await logStep(sheet, "Post to Ledger", async () => {
    await page
      .getByRole("menuitem", { name: "Invoice Actions" })
      .locator("div")
      .click({ timeout: 10000 });
    await page.getByText("Post to Ledger").click();
  });
  await logStep(sheet, "Save and Close", async () => {
    await page.getByRole("button", { name: "Save and Close" }).click();
  });
  console.log("✅ Scenario 3 completed successfully");
  await saveWorkbook();
}
