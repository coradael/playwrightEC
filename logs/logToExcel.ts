import fs from "fs";
import ExcelJS from "exceljs";

const logbestandPad = "logs/test-log.xlsx";

export async function logExcel(message: string) {
  const tijd = new Date().toISOString();
  const workbook = new ExcelJS.Workbook();
  let data: [string, string][] = [];

  // ✅ Als bestand bestaat, lees het in
  if (fs.existsSync(logbestandPad)) {
    await workbook.xlsx.readFile(logbestandPad);
    const existingSheet = workbook.getWorksheet("Log");

    if (existingSheet) {
      existingSheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        // Sla koprij over als we die opnieuw willen toevoegen
        if (rowNumber === 1) return;
        const tijdCel = row.getCell(1).value?.toString() || "";
        const berichtCel = row.getCell(2).value?.toString() || "";
        data.push([tijdCel, berichtCel]);
      });
    }
  }

  // ✅ Voeg de nieuwe logregel toe
  data.push([tijd, message]);

  // ✅ Verwijder oude sheet (indien nodig)
  const oldSheet = workbook.getWorksheet("Log");
  if (oldSheet) {
    workbook.removeWorksheet(oldSheet.id);
  }

  // ✅ Maak een nieuw werkblad en voeg alle rijen toe
  const sheet = workbook.addWorksheet("Log");
  sheet.columns = [
    { header: "Tijd", key: "tijd", width: 30 },
    { header: "Bericht", key: "message", width: 80 },
  ];

  // Voeg alle bestaande + nieuwe rijen toe
  for (const row of data) {
    sheet.addRow({ tijd: row[0], message: row[1] });
  }

  // ✅ Schrijf het Excel-bestand opnieuw
  await workbook.xlsx.writeFile(logbestandPad);
}
