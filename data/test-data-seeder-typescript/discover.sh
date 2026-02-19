#!/usr/bin/env bash
# Database discovery — introspects schema to find tables, columns, and relationships
#
# Usage: ./discover.sh [output_dir]

set -euo pipefail

OUTPUT_DIR="${1:-./discovery-output}"
mkdir -p "$OUTPUT_DIR"

: "${DATABASE_URL:?Set DATABASE_URL in .env}"

echo "=== Database Discovery ==="
echo ""

# Extract connection parts
if [[ "$DATABASE_URL" == postgresql://* ]] || [[ "$DATABASE_URL" == postgres://* ]]; then
  echo "Introspecting PostgreSQL schema..."

  psql "$DATABASE_URL" -t -A -c "
    SELECT json_agg(row_to_json(t)) FROM (
      SELECT table_name, column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_schema = 'public'
      ORDER BY table_name, ordinal_position
    ) t;
  " > "$OUTPUT_DIR/schema.json" 2>/dev/null

  psql "$DATABASE_URL" -t -A -c "
    SELECT json_agg(row_to_json(t)) FROM (
      SELECT table_name, pg_relation_size(quote_ident(table_name)) as size_bytes,
             (SELECT count(*) FROM information_schema.columns c WHERE c.table_name = t.table_name AND c.table_schema = 'public') as column_count
      FROM information_schema.tables t
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
      ORDER BY table_name
    ) t;
  " > "$OUTPUT_DIR/tables.json" 2>/dev/null

  echo "  Schema saved to $OUTPUT_DIR/schema.json"
  echo "  Tables saved to $OUTPUT_DIR/tables.json"
else
  echo "Only PostgreSQL auto-discovery is supported."
  echo "For other databases, manually export your schema."
fi

echo ""
echo "Done! Feed schema.json + AI_CONTEXT.md to your AI assistant"
echo "to generate seed fixtures for all tables."
