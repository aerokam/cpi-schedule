# CPI Release Schedule Pipeline

This project fetches the official CPI release schedules from the Bureau of Labor Statistics (BLS), generates clean CSV files for the current, previous, and next calendar years, and uploads them to Cloudflare R2. The pipeline is intentionally minimal, reproducible, and free of committed output artifacts.

## Overview

The pipeline performs the following steps:

1. Fetches the BLS CPI release schedule pages for:
   - previous year
   - current year
   - next year
2. Extracts only the CPI-related rows.
3. Writes normalized CSV files into `data/`.
4. Uploads each CSV to Cloudflare R2.
5. Logs all activity to `logs/bls.log`.

All generated files (`data/`) and logs (`logs/`) are ignored by Git.

## Files

- **updateCpiReleaseSchedules.js** — Main scraper and CSV generator.
- **upload.js** — Uploads generated CSVs to Cloudflare R2.
- **updateCpiReleaseSchedules.sh** — Automation entrypoint (creates folders, logs, runs scraper).
- **package.json** — Dependencies and scripts.
- **.gitignore** — Excludes `node_modules/`, `data/`, and `logs/`.

## Installation

```bash
git clone https://github.com/aerokam/cpi-schedule.git
cd cpi-schedule
npm install
```

## Running the Pipeline

To fetch all CPI schedules and upload them to Cloudflare:

```bash
./updateCpiReleaseSchedules.sh
```

This will:

- create `logs/` and `data/` if missing  
- write a timestamped header to `logs/bls.log`  
- run the scraper  
- generate CSVs in `data/`  
- upload each CSV to Cloudflare R2  

## Output

Generated files (ignored by Git):

```
data/
  CpiReleaseSchedule2024.csv
  CpiReleaseSchedule2025.csv
  CpiReleaseSchedule2026.csv
```

Log output (also ignored by Git):

```
logs/bls.log
```

## Cloudflare R2

The uploader writes each CSV to the configured R2 bucket using the file’s basename:

```
CpiReleaseSchedule2024.csv
CpiReleaseSchedule2025.csv
CpiReleaseSchedule2026.csv
```

No folder structure is created in R2.

## Update Policy

The pipeline is designed to be run manually or scheduled as needed.  
It is deterministic: given the same BLS source pages, it produces identical CSVs.

Typical usage:

- Run after BLS updates a release schedule.
- Run at year-end when the next year’s calendar becomes available.
- Run on demand for validation or downstream automation.

## Scheduling (Optional)

The script can be scheduled using:

- Windows Task Scheduler  
- cron  
- cloud-based schedulers  

Scheduling is currently **disabled** by default.

## License

MIT
