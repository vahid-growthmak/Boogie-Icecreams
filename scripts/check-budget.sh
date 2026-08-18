#!/usr/bin/env bash
# Boogie Ice Creams — performance budget gate.
#
# Usage:  pnpm build | tee .next/build.log && bash check-budget.sh .next/build.log
#         bash check-budget.sh            # re-uses .next/build.log if present
#
# Budgets are PRD §7. Exits non-zero on any breach so CI fails the merge.

set -euo pipefail

LOG="${1:-.next/build.log}"
PUBLIC_DIR="${PUBLIC_DIR:-public}"

# --- budgets (KB) ----------------------------------------------------------
BUDGET_HOME_JS=130
BUDGET_PDP_JS=150
BUDGET_IMAGE=200

fail=0
red()   { printf '\033[31m%s\033[0m\n' "$1"; }
green() { printf '\033[32m%s\033[0m\n' "$1"; }
dim()   { printf '\033[2m%s\033[0m\n'  "$1"; }

if [[ ! -f "$LOG" ]]; then
  red "No build log at $LOG"
  dim  "Run:  pnpm build | tee .next/build.log"
  exit 2
fi

# --- First Load JS per route ----------------------------------------------
# Next.js prints e.g.  "┌ ○ /                    5.2 kB    128 kB"
# We take the LAST size column on the route's line as First Load JS.
#
# Matching is a literal field comparison, not a regex: dynamic route names carry
# brackets ("/products/[slug]"), which no amount of shell-level escaping gets
# through awk's regex engine intact.
route_kb() {
  local route="$1"
  awk -v r="$route" '
    {
      # The route is always the field after the ○/●/ƒ marker; compare literally.
      matched = 0
      for (i = 1; i <= NF; i++) if ($i == r) { matched = 1; break }
      if (!matched) next
      for (i = NF; i > 1; i--) {
        if (($i == "kB" || $i == "KB") && $(i-1) ~ /^[0-9.]+$/) { print $(i-1); exit }
      }
    }' "$LOG" | head -n1
}

check_js() {
  local label="$1" route="$2" budget="$3"
  local kb; kb="$(route_kb "$route" || true)"

  if [[ -z "$kb" ]]; then
    red "?  $label ($route) — not found in build output"
    fail=1
    return
  fi

  if awk -v a="$kb" -v b="$budget" 'BEGIN { exit !(a > b) }'; then
    red "✗  $label  ${kb} kB  (budget ${budget} kB)"
    fail=1
  else
    green "✓  $label  ${kb} kB  (budget ${budget} kB)"
  fi
}

echo "First Load JS"
check_js "Home" "/"                "$BUDGET_HOME_JS"
check_js "PDP " "/products/[slug]" "$BUDGET_PDP_JS"

# --- image weights ---------------------------------------------------------
echo
echo "Images (budget ${BUDGET_IMAGE} KB each)"
oversize=0
while IFS= read -r -d '' img; do
  kb=$(( $(wc -c < "$img") / 1024 ))
  if (( kb > BUDGET_IMAGE )); then
    red "✗  ${kb} KB  $img"
    oversize=1
    fail=1
  fi
done < <(find "$PUBLIC_DIR" -type f \
           \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' \
              -o -iname '*.webp' -o -iname '*.avif' \) -print0 2>/dev/null)

(( oversize == 0 )) && green "✓  all images within budget"

# --- placeholder copy ------------------------------------------------------
echo
echo "Content"
if grep -rn 'TODO(copy):' app components content 2>/dev/null | grep -q .; then
  red "✗  TODO(copy): found — see boogie-brand-voice"
  grep -rn 'TODO(copy):' app components content 2>/dev/null | head -n 10
  fail=1
else
  green "✓  no TODO(copy): in shipped source"
fi

echo
if (( fail )); then
  red "Performance budget FAILED — see boogie-performance-budget"
  exit 1
fi
green "Performance budget met"
