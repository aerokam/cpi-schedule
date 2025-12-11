# cpi-schedule
Fetch BLS CPI release schedule and upload to Cloudflare.

# BLS CPI Release Schedule Scraper

This project retrieves the official CPI release schedule from the Bureau of Labor Statistics (BLS), normalizes it, and outputs a clean CSV for downstream automation. It is designed to run locally or as part of a scheduled pipeline.

## Overview

The scraper performs the following steps:

1. Fetches the CPI release schedule from the BLS website.
2. Parses and normalizes the release dates.
3. Writes a clean `CpiReleaseSchedule.csv` file.
4. (Optional) Uploads the CSV to a remote endpoint using `upload.js`.

The project is intentionally minimal and reproducible, with no committed output artifacts or dependencies.

## Files

- `getCpiReleaseSchedule.js` — Core scraper logic.
- `upload.js` — Optional upload step for remote storage.
- `updateCpiReleaseSchedule.sh` — Orchestrates the full pipeline.
- `package.json` — Dependencies and scripts.
- `.gitignore` — Excludes `node_modules` and generated CSV output.

## Installation

Clone the repository and install dependencies:

\`\`\`
git clone https://github.com/aerokam/cpi-schedule.git
cd cpi-schedule
npm install
\`\`\`

## Running the Scraper

\`\`\`
node getCpiReleaseSchedule.js
\`\`\`

This generates `CpiReleaseSchedule.csv` locally (ignored by Git).

## Full Pipeline

\`\`\`
./updateCpiReleaseSchedule.sh
\`\`\`

This runs the scraper and (optionally) uploads the result.

## Scheduling

This project is designed to run via:

- Windows Task Scheduler (local)
- Any cron-like environment
- Cloud-based schedulers

The pipeline is deterministic and produces the same output given the same BLS source.

## License

MIT
