const { chromium } = require("@playwright/test");
// const fs = require("fs");
//const path = require("path");

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    locale: "en-US", //defau8lt locale in English
  });
  const page = await context.newPage();

  // 👉 PAS DEZE URL AAN naar jouw loginpagina
  await page.goto(
    "https://eccs-test.login.em2.oraclecloud.com/oam/server/obrareq.cgi?encquery%3D7gTpvB61khH82pAmrAZREkQYCisnyN20ze5k1h5uzqD90zZPZ0Y52YuLJ0E90D8yiXNGAqleop4uGgQ8yyDZOv2R3uUkJ8I%2BB04Rb1D2Er2eBOvknsq4aqn5cdygmgjgvCjQkDxoKGVytU4mGKxXIQGIE1la4keQWPt5lF%2FcIWJ6V1W99B%2FequyEtRtqTWquGYRnd9Yg5QQD8dk%2F5j42NmpOJdspSeLwefk%2BugL4Y8QTP6AvlIZ0wdmn44VF7QDNoHbz%2FvEQsgagnZMKwBa%2FebZgYhPpdYNAhYT0J1NMXHeVWjf4NjF7NEtPMQ8g6j0lSgPPqakstdudZHSVNIsJS19Q9SRoUPnL8s4iKNr6of9jOP9XQhyg2XMjuOoVvU5Tk6DG5R3fDCPWhImPPt2nZ5mhHmobOLkSV5CZERrjFxooX2J3F4EsRarC85ip4mD6XdwqqfzWQ9IpcmXLW71IVfG%2FSavR3EwJl6FJlgZOHzOaLv5pnilVORhgds3TN0uaIYA%2BcpoLvxyiZVjCC%2BhpwFkL8XMxTQPUrss2qkmidmaUAp5h7m0Kzw4%2FL72pYduFAknx58Yz1zWmHkG8APSvlwy3OTcwyW0wA5LljEEjo5C7UVV50ogEHuDbSoLu%2BqM%2FTfxMwkeZXYBHX7Z9b4SCqCllXpg%2F1pSolJveb0BsfwfAIbUg1SOpYk7GApSYDgIJsmbd2w1LQZhYdhSFa8%2FbtQOSXZDsZ22LPbsmG8qNY%2BeR00%2BqhF6XcF7kvx0y96sB08%2F2Zd1updstOYTaeo3n2bYpgbSmbdkaabqlaHepFzPrM6myNSFiPSo4IbcUcZvdUIwmvGHEaRJS%2BgQUEe23BcOCkhegljVmdyzya8IDC9DYHJ5e5EkjOYBj8KT%2FAMrDExqK7rk7VlccoHiERJjtsMXTxkEPpsPeFCGOrxeT%2FjfK7kNoAb2pemvOl77u3W%2BXZoAB37PNCxg1qmsdrjWGNhTTJCzAkVLtY161QLlcoSgPSXTcSKziKzdyRG%2FZ0dXYe36P%2F5ih18e%2BWGAhKCF2R5NU477yUje5p3n%2F8Uw0jqccWZke%2BvaNoquQN27UKXl5IPxDk01pgSjAuoWGKQU7H4jTgW9efqm0BHAS%2BPaK%2FLxF13o388O1I2eb4vbzN6Sg5AYHQ%2FTn2IGcdMcl%2B0zZ4ONt9SflXmtxcdqgNj%2FPY5r22I9ejLRrIJeRXl8cesYyIzqxEIoby4OxMdW3VEBCr056rC4TngXs6NFo8e5Y5ofkSswHxoyDyoIJXlImJ5d1cjqYZq7N8zgtnKC5fDEzDlhEj4%2FHaIBLV3Dd7LOp%2F%2BQgQLQY1PNXYx9DfyKCjw7eVVtPWU8tUhUGqZf%2FHweQjcYPPzxUJAyzHPT9s%2FfzXhBRkyRahMH%2BR1va6IJSzuyWVLDfQ6vG2pjOBJiR2Z1ELb8NQipE1jPfaOp8OTKZ7GA06Qjd4ZLeCRip4e%2F5IY1JwDhwQ3GjTs03K%2FrxUKo1oTfiOMScI7FFROkpMCwss%2FfXut9W7FBBmxql9eThoeqsFSpDGrc24SV4Ullkk1sseVldVDVQDpY2rCWtq5OBM0%2BBv57S0fAMAoRS3djVUANO%2FEFlhFr88bg0zUk4q8qTSPFS%2FQcwZgnmOQ5jTJZU%2FpEFN1odGxb9%2FjW1nIUT2SDLZ7gKlttmWzwxZdK1iawp9w%3D%3D%20agentid%3DOraFusionApp_11AG%20ver%3D1%20crmethod%3D2%26cksum%3Dce4f446b3cd8d9e4cff3740f668d2e75117aa7ae&ECID-Context=1.006DxWpdIFL6MQT6yB6iMG00EiA60003P%5E%3BkXjE"
  );

  // await page
  //   .getByRole("textbox", { name: "User ID" })
  //   .fill("saltal@profource.com");
  // await page.getByRole("textbox", { name: "User ID" }).press("Tab");
  // await page.getByRole("textbox", { name: "Password" }).fill("Oracle2025!");
  // await page.getByRole("button", { name: "Sign In" }).click();
  // await page.waitForSelector("text=/^(Over mij|Me)$/");
  // await page.fill("#username", USERNAME);
  // await page.fill("#password", PASSWORD);
  // await page.getByRole("button", { name: "Sign In" }).click();
  // await page.waitForSelector("text=/^(Over mij|Me)$/");

  console.log("👉 Log handmatig in en druk daarna op Enter in de terminal...");
  await new Promise((resolve) =>
    process.stdin.once("data", () => resolve(null))
  );

  //Sla ingelogde sessie op in auth.json
  await context.storageState({ path: "storage/storageState.json" });

  await browser.close();

  console.log("✅ Loginstatus opgeslagen in storageState.json");
})();
