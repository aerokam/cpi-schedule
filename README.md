# cpi-schedule
Fetch BLS CPI release schedule and upload to Cloudflare.

# BLS CPI Release Schedule Scraper

This project retrieves the official CPI release schedule from the Bureau of Labor Statistics (BLS), normalizes it, and outputs clean CSV files for downstream automation. It supports both the current CPI release schedule and the full-year BLS release calendars (e.g., 2026). The project is intentionally minimal and reproducible, with no committed output artifacts or dependencies.

## Overview

The scraper performs the following steps:

1. Fetches the CPI release schedule or full-year BLS release calendar.
2. Parses and normalizes the release dates.
3. Writes clean CSV output files.
4. (Optional) Uploads the CSV to Cloudflare R2 using upload.js.

## Files

- getCpiReleaseSchedule.js — Scrapes the current CPI release schedule.
- getCpiReleaseSchedule2026.js — Scrapes the full-year 2026 BLS release calendar.
- upload.js — Uploads a CSV file to Cloudflare R2.
- updateCpiReleaseSchedule.sh — Formerly used for daily automation (now inactive).
- package.json — Dependencies and scripts.
- .gitignore — Excludes node_modules and generated CSV output.

## Installation

Clone the repository and install dependencies:

git clone https://github.com/aerokam/cpi-schedule.git
cd cpi-schedule
npm install

## Running the Scrapers

Current CPI Release Schedule:
node getCpiReleaseSchedule.js

2026 Release Calendar:
node getCpiReleaseSchedule2026.js

Both commands generate CSV files locally (ignored by Git).

## Uploading to Cloudflare R2

The upload script reads a local CSV file and writes it to the configured R2 bucket:

node upload.js

The file to upload is currently hardcoded in upload.js and can be changed as needed.

## Update Policy

This project no longer runs on a daily schedule. Both CPI release schedule files are updated manually only when the Bureau of Labor Statistics (BLS) publishes changes.

### Current CPI Release Schedule (2025)

The current CPI release schedule is only refreshed when BLS updates the page. Two dates from this schedule are still required for downstream calculations:
- The simulated CPI release on 11/26/2025
- The actual CPI release on 12/18/2025

These remain necessary until the 2026 calendar fully covers the transition period.

### 2026 Release Calendar

The full-year 2026 release calendar is scraped once and uploaded once. It will only be updated again if BLS revises the page. This file provides all CPI release dates for 2026.

### Future Years

Toward the end of 2026, the 2027 release calendar will be added using the same one-time scrape-and-upload process. Each new year follows the same pattern: scrape once, upload once, and update only if BLS changes the schedule.

No automated daily scraping or uploading is currently required.

## Scheduling

This project was originally designed to run via:

- Windows Task Scheduler (local)
- Cron-like environments
- Cloud-based schedulers

The pipeline is deterministic and produces the same output given the same BLS source. Scheduling is no longer active but can be re-enabled if needed.

## License

MIT
