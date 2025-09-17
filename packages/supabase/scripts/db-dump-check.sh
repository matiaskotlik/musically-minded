#!/usr/bin/env -S bash -euo pipefail

DATABASE_DUMP="$(mktemp -d)/database.sql"
SCHEMA_DUMP="$(mktemp -d)/schema.sql"

# capture database dump
. scripts/db-dump.sh > "$DATABASE_DUMP"

# capture schema database dump
. scripts/db-clear.sh
. scripts/db-schema-apply.sh
. scripts/db-dump.sh > "$SCHEMA_DUMP"

# diff
diff "$DATABASE_DUMP" "$SCHEMA_DUMP"
