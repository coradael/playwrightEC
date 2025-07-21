// utils.js
function getFormattedDateTime() {
  return new Date()
    .toLocaleString("nl-NL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(/\D/g, "");
}

// Exporteer de functie zodat je hem kunt gebruiken in andere bestanden
module.exports = { getFormattedDateTime };
