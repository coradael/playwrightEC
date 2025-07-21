import { test, expect } from "@playwright/test";

const {
  addWorksheet,
  saveWorkbook,
  logStep,
} = require("../../logs/excel-helper.js");
const testName = "test-Payables-Scenario1";
const { getFormattedDateTime } = require("../../utils/utils.js");

export async function runScenario1(page) {
  const sheet = addWorksheet(testName);
  await logStep(sheet, "succesvol ingelogd", async () => {
    await page.waitForSelector("text=/^(Over mij|Me)$/");
  });
  await logStep(sheet, "Naar 'Invoices' geklikt", async () => {
    await page.getByRole("link", { name: "Navigator" }).click();
    await page.waitForTimeout(3000);
    await page.getByTitle("Payables", { exact: true }).click();
    const invoicesLink = page.getByRole("link", { name: "Invoices" });
    // Check of "Invoices" zichtbaar is
    if (await invoicesLink.isVisible()) {
      // Als zichtbaar: klik erop
      await invoicesLink.click({ delay: 150 });
    } else {
      // Als niet zichtbaar: klik eerst op "Payables"
      await page.getByTitle("Payables", { exact: true }).click({ delay: 150 });
      // Wacht even zodat "Invoices" kan verschijnen
      await page.waitForTimeout(500);
      // Klik daarna alsnog op "Invoices"
      await invoicesLink.click({ delay: 150 });
    }
  });
  await logStep(sheet, "Create invoice gestart", async () => {
    await page.waitForTimeout(3000);
    await page.getByRole("link", { name: "Tasks" }).click();
    await page.getByRole("button", { name: "Create" }).click();
  });
  await logStep(sheet, "Business Unit: Profource BV", async () => {
    await page.getByTitle("Search: Business Unit").click();
    await page.getByText("Profource BV").first().click();
  });

  await logStep(sheet, "Interim Finance Group B.V.", async () => {
    await page.getByRole("link", { name: "Search: Supplier" }).click();
    await page.getByRole("textbox", { name: "Supplier", exact: true }).click();
    await page
      .getByRole("textbox", { name: "Supplier", exact: true })
      .fill("Interim Finance Group B.V.");
  });
  await logStep(sheet, "Supplier Site Amsterdam", async () => {
    await page
      .getByRole("textbox", { name: "Supplier", exact: true })
      .press("Enter");
    await page.getByText("Interim Finance Group B.V.").click();
    await page.getByRole("button", { name: "OK" }).click();
    await page.getByTitle("Search: Supplier Site").click();
    await page.getByRole("cell", { name: "Amsterdam", exact: true }).click();
  });
  await logStep(sheet, "Gegevens zijn ingevuld", async () => {
    await page.getByRole("textbox", { name: "Number" }).click();
    await page
      .getByRole("textbox", { name: "Number" })
      .fill("Test-Scenario-EC-1-" + getFormattedDateTime());
    await page.getByRole("textbox", { name: "Amount" }).click();
    await page.getByRole("textbox", { name: "Amount" }).fill("121");
    await page.getByRole("textbox", { name: "Amount" }).press("Tab");
    await page.getByRole("button", { name: "Expand Lines" }).click();
    await page.getByRole("button", { name: "Collapse Lines" }).click();
    await page.getByRole("button", { name: "Expand Lines" }).click();
  });
  await logStep(sheet, "Distribution Combination is ingevuld", async () => {
    await page
      .getByRole("row", { name: "1 Item Type Amount" })
      .getByLabel("Amount")
      .click();
    await page
      .getByRole("row", { name: "1 Item Type Amount" })
      .getByLabel("Amount")
      .fill("100");
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
  await logStep(sheet, "Validatie is uitgevoerd", async () => {
    await page
      .getByRole("menuitem", { name: "Invoice Actions" })
      .locator("div")
      .click();
    await page.getByText("Validate").click();
    await page.waitForSelector("text=Validated");
  });
  await logStep(sheet, "Invoice actions save", async () => {
    await page.getByRole("button", { name: "Save", exact: true }).click();
  });
  await logStep(sheet, "Invoice actions approval", async () => {
    await page
      .getByRole("menuitem", { name: "Invoice Actions" })
      .locator("div")
      .click();
    await page.getByText("Approval", { exact: true }).click();
    await page.getByText("Initiate").click();
  });
  await logStep(sheet, "Invoice actions View Approval", async () => {
    await page
      .getByRole("menuitem", { name: "Invoice Actions" })
      .locator("div")
      .click();
    await page.getByText("View Approval and Notification").click();
    await page.getByRole("button", { name: "Done" }).click();
  });
  await logStep(sheet, "Post to Ledger", async () => {
    await page
      .getByRole("menuitem", { name: "Invoice Actions" })
      .locator("div")
      .click();
    await page.getByText("Post to Ledger").click();
    await page.getByRole("button", { name: "OK" }).click();
  });
  await logStep(sheet, "Save and Close", async () => {
    await page.getByRole("button", { name: "Save and Close" }).click();
  });
  console.log("✅ Scenario 1 completed successfully");
  await saveWorkbook();
}
