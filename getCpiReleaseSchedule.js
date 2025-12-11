import * as cheerio from "cheerio";
import fs from "fs";

const TARGET_URL = "https://www.bls.gov/schedule/news_release/cpi.htm";

async function main() {
  try {
    const res = await fetch(TARGET_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Referer": "https://www.google.com/",
        "Connection": "keep-alive"
      }
    });

    console.log("Status:", res.status);
    if (res.status !== 200) return;

    const html = await res.text();
    const $ = cheerio.load(html);

    const rows = $(".release-list tbody tr");
    console.log("Found rows:", rows.length);

    if (rows.length > 0) {
      const firstRowTds = $(rows[0])
        .find("td")
        .map((i, td) => $(td).text().trim())
        .get();
      console.log("First row:", firstRowTds);
    }

    // ✅ NEW: Build CSV
    const header = ["Reference Month", "Release Date", "Release Time"];

    const dataRows = rows.toArray().map(el => {
    return $(el)
        .find("td")
        .toArray()
        .map(td => $(td).text().trim());
    });

    const csv = [header, ...dataRows]
      .map(row =>
        row
          .map(value => `"${value.replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    console.log("\nCSV OUTPUT:\n");
    console.log(csv);
    
    fs.writeFileSync("CpiReleaseSchedule.csv", csv, "utf8");
    console.log("Wrote CpiReleaseSchedule.csv");

  } catch (err) {
    console.error("Request failed:", err);
  }
}

main();