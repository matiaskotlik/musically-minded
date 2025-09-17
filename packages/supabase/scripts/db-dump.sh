#!/usr/bin/env -S bash -euo pipefail

supabase db dump --local | prettier --stdin-filepath database.sql
