import fetch from "node-fetch";
import * as cheerio from "cheerio";
import fs from "fs";

const URL = "https://www.bls.gov/schedule/2026/home.htm";

async function scrapeCpi2026() {
  const response = await fetch(URL);

  if (response.status !== 200) {
    console.error("Non-200 response:", response.status);
    return;
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  const rows = [];

  $(".release-list tbody tr").each((i, el) => {
    const date = $(el).find(".date-cell").text().trim();
    const time = $(el).find(".time-cell").text().trim();
    const desc = $(el).find(".desc-cell").text().trim();

    if (desc.includes("Consumer Price Index")) {
      rows.push({ date, time, desc });
    }
  });

  // Build CSV
  let csv = "Date,Time,Description\n";
  for (const r of rows) {
    csv += `"${r.date}","${r.time}","${r.desc}"\n`;
  }

  fs.writeFileSync("CpiReleaseSchedule2026.csv", csv);
  console.log("Wrote CpiReleaseSchedule2026.csv");
}

scrapeCpi2026();