# Shared Scripts

## verify-dom-structure.js

Canonical copy of the browser console DOM verification script. Each template has its own copy under `scripts/` (or `Scripts/` for Katalon).

To sync all copies after editing the canonical version:

```bash
for f in $(find . -name "verify-dom-structure.js" -not -path "./scripts/*"); do
  cp scripts/verify-dom-structure.js "$f"
done
```
