#!/usr/bin/env bash
# Rebuilds build/app.bundle.js from data/*.js + components/*.jsx
# Run this any time you edit a .jsx or data/*.js file.
#
# Usage:  ./build.sh
#
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
mkdir -p "$HERE/build"

# --- Find esbuild -----------------------------------------------------------
# Order: anything on PATH, then npx (which will download esbuild on demand),
# then the global Linux dev-container path (used inside our build sandbox).
ESBUILD=""
if command -v esbuild >/dev/null 2>&1; then
  ESBUILD="esbuild"
elif command -v npx >/dev/null 2>&1; then
  # --yes auto-confirms the install prompt the first time
  ESBUILD="npx --yes esbuild"
elif [ -x "/usr/local/lib/node_modules_global/lib/node_modules/tsx/node_modules/.bin/esbuild" ]; then
  ESBUILD="/usr/local/lib/node_modules_global/lib/node_modules/tsx/node_modules/.bin/esbuild"
fi
if [ -z "$ESBUILD" ]; then
  echo "ERROR: could not find esbuild and don't have npx either." >&2
  echo "Install esbuild with:  npm install -g esbuild" >&2
  echo "(or install Node from https://nodejs.org and re-run.)" >&2
  exit 1
fi

# --- Concatenate inputs in the same order index.html used to load them ------
TMP_BASE="$(mktemp -t cheer-bundle.XXXXXX)"
TMP="$TMP_BASE.jsx"
trap 'rm -f "$TMP" "$TMP_BASE"' EXIT
cat \
  "$HERE/data/defaults.js" \
  "$HERE/data/sync.js" \
  "$HERE/data/media.js" \
  "$HERE/data/store.js" \
  "$HERE/components/shared.jsx" \
  "$HERE/components/home.jsx" \
  "$HERE/components/pages.jsx" \
  "$HERE/components/app.jsx" \
  > "$TMP"

# --- Bundle to a temp file first, then move into place ----------------------
# This way, if esbuild fails the existing bundle is left intact (no 0-byte
# disaster like before).
OUT_TMP="$HERE/build/app.bundle.js.tmp"
if ! $ESBUILD \
    --loader:.jsx=jsx \
    --jsx=transform \
    --jsx-factory=React.createElement \
    --jsx-fragment=React.Fragment \
    "$TMP" > "$OUT_TMP"; then
  rm -f "$OUT_TMP"
  echo "ERROR: esbuild failed. Existing build/app.bundle.js was NOT changed." >&2
  exit 1
fi

# Sanity: refuse to ship an empty bundle.
if [ ! -s "$OUT_TMP" ]; then
  rm -f "$OUT_TMP"
  echo "ERROR: esbuild produced an empty bundle. Existing build/app.bundle.js was NOT changed." >&2
  exit 1
fi

mv "$OUT_TMP" "$HERE/build/app.bundle.js"
LINES="$(wc -l < "$HERE/build/app.bundle.js")"
BYTES="$(wc -c < "$HERE/build/app.bundle.js")"
echo "Wrote $HERE/build/app.bundle.js  (${LINES} lines, ${BYTES} bytes)."
