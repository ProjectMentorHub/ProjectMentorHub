#!/usr/bin/env bash
set -euo pipefail

# ------------------ SETTINGS ------------------
QUIET_SECS=60            # wait this long with no new events before pushing
EXCLUDE_RE='(^|/)(\.git|node_modules|build|dist|\.next|coverage|\.cache|.parcel-cache|.turbo|tmp|logs)(/|$)'
ADD_PATHS=(
  "src/**"
  "public/**"
  "package.json"
  "package-lock.json"
  "yarn.lock"
  "pnpm-lock.yaml"
  "postcss.config.js"
  "tailwind.config.js"
  ".github/workflows/**"
)
# ----------------------------------------------

WATCH_DIR="$(pwd)"
echo "[AutoPush] Watching: $WATCH_DIR"
command -v inotifywait >/dev/null || { echo "Install: sudo apt install inotify-tools"; exit 1; }

branch="$(git rev-parse --abbrev-ref HEAD)"
echo "[AutoPush] Branch: $branch"

# function: stage only relevant files
stage_changes() {
  git add -A -f "${ADD_PATHS[@]}" 2>/dev/null || true
}

# debounce loop: push only after QUIET_SECS of silence
while true; do
  echo "[AutoPush] Waiting for changes (quiet=${QUIET_SECS}s)…"
  # Block until the first event
  inotifywait -r -e modify,create,delete,move --exclude "$EXCLUDE_RE" "$WATCH_DIR" >/dev/null 2>&1

  last_event=$(date +%s)
  while true; do
    # Wait QUIET_SECS for any new event; if none, break
    inotifywait -t "$QUIET_SECS" -r -e modify,create,delete,move --exclude "$EXCLUDE_RE" "$WATCH_DIR" >/dev/null 2>&1 || break
    last_event=$(date +%s)
  done

  # Stage & check if there are real changes
  stage_changes
  if git diff --cached --quiet; then
    echo "[AutoPush] No relevant changes. Skipping commit."
    continue
  fi

  commit_msg="auto-save: $(date '+%Y-%m-%d %H:%M:%S')"
  echo "[AutoPush] Committing & pushing → $commit_msg"
  git commit -m "$commit_msg" || true
  git push origin "$branch" || {
    echo "[AutoPush] Push failed, attempting pull-rebase then re-push…"
    git pull --rebase origin "$branch"
    git push origin "$branch"
  }
  echo "[AutoPush] ✅ Pushed at $(date)"
done

