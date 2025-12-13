#!/usr/bin/env bash
cd /c/Users/aerok/projects/bls

mkdir -p logs
mkdir -p data

echo -e "=============== $(date '+%Y-%m-%d %H:%M:%S') ===============\n" >> logs/bls.log

node updateCpiReleaseSchedules.js >> logs/bls.log 2>&1