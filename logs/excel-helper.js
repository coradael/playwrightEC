const ExcelJS = require("exceljs");

const workbook = new ExcelJS.Workbook();
const filePath = "./logs/TestResult.xlsx";
const usedSheetNames = new Set();

function addWorksheet(title) {
  let name = title.substring(0, 31); // Excel max 31 chars
  let count = 1;
  while (usedSheetNames.has(name)) {
    name = `${title.substring(0, 28)}_${count}`;
    count++;
  }
  usedSheetNames.add(name);

  const sheet = workbook.addWorksheet(name);
  sheet.columns = [
    { header: "Step", key: "step", width: 30 },
    { header: "Result", key: "result", width: 30 },
  ];
  return sheet;
}

async function saveWorkbook() {
  await workbook.xlsx.writeFile(filePath);
  console.log(`✅ Excel opgeslagen: ${filePath}`);
}

async function logStep(sheet, description, stepFn) {
  try {
    await stepFn();
    sheet.addRow({ step: description, result: "Passed" });
  } catch (e) {
    sheet.addRow({ step: description, result: `Failed: ${e.message}` });
    throw e; // ⛔ stopt de test hier
  }
}

module.exports = { addWorksheet, saveWorkbook, logStep };
