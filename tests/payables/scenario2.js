import { test, expect } from "@playwright/test";
import { chromium } from "playwright";

const {
  addWorksheet,
  saveWorkbook,
  logStep,
} = require("../../logs/excel-helper.js");
const testName = "test-Payables-scenario2";
const { getFormattedDateTime } = require("../../utils/utils.js");

export async function runScenario2(page) {
  const sheet = addWorksheet(testName);
  await logStep(sheet, "Create invoice gestart", async () => {
    await page.waitForTimeout(1000);
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
  await logStep(sheet, "Supplier Interim Finance Group B.V.", async () => {
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
      .fill("Test-Payables-Scenario-2-" + getFormattedDateTime());
    await page.getByRole("textbox", { name: "Amount" }).click();
    await page.getByRole("textbox", { name: "Amount" }).fill("121");
    await page.getByRole("textbox", { name: "Amount" }).press("Tab");
    await page.getByRole("button", { name: "Expand Lines" }).click();
    await page.getByRole("button", { name: "Collapse Lines" }).click();
    await page
      .getByRole("button", { name: "Expand Lines" })
      .click({ timeout: 10000 });
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
  await logStep(sheet, "Projec velden zijn ingevuld", async () => {
    await page.getByRole("textbox", { name: "Project Number" }).click();
    await page.getByRole("textbox", { name: "Project Number" }).fill("104236");
    await page.getByRole("textbox", { name: "Project Number" }).press("Tab");
    await page.getByTitle("Search: Task Number").click({ timeout: 10000 });
    await page.getByRole("combobox", { name: "Task Number" }).click();
    await page.getByRole("combobox", { name: "Task Number" }).fill("04");
    await page.getByRole("combobox", { name: "Task Number" }).press("Tab");
    await page.getByTitle("Search: Expenditure Type").click();
    await page
      .getByText("Inhuur externen", { exact: true })
      .first()
      .click({ timeout: 10000 });
    await page.getByTitle("Search: Expenditure Organization").click();
    await page
      .getByText("Team Externe Inhuur Doorleen", { exact: true })
      .first()
      .click({ timeout: 10000 });
  });
  await logStep(sheet, "Validatie is uitgevoerd", async () => {
    await page
      .getByRole("menuitem", { name: "Invoice Actions" })
      .locator("div")
      .click();
    await page.getByText("Validate").click();
  });
  await logStep(sheet, "Invoice actions save", async () => {
    await page.getByRole("button", { name: "Save", exact: true }).click();
  });
  await logStep(sheet, "Invoice actions approval", async () => {
    await page
      .getByRole("menuitem", { name: "Invoice Actions" })
      .locator("div")
      .click({ timeout: 10000 });
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
  console.log("✅ Scenario 2 completed successfully");
  await saveWorkbook();
}
