#!/usr/bin/env -S bash -euo pipefail

trap 'mv migrations.bak migrations' EXIT
mv migrations migrations.bak
supabase db reset --no-seed
