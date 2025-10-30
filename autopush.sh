#!/bin/bash
# ------------------------------------------------------------------
# AutoPush: Automatically commit and push any change in this folder
# ------------------------------------------------------------------

WATCH_DIR="$(pwd)"  # dynamically uses current directory
echo "[AutoPush] Watching all files under: $WATCH_DIR"

# Make sure inotify-tools is installed
command -v inotifywait >/dev/null 2>&1 || {
  echo "Error: inotifywait not found. Install with: sudo apt install inotify-tools"
  exit 1
}

while inotifywait -r -e modify,create,delete,move "$WATCH_DIR"; do
  # Give the system 2 seconds to settle file locks
  sleep 2

  # Stage and push only if there are real changes
  git add -A
  git diff --cached --quiet && continue

  COMMIT_MSG="auto-save: $(date '+%Y-%m-%d %H:%M:%S')"
  echo "[AutoPush] Detected changes → committing: $COMMIT_MSG"

  git commit -m "$COMMIT_MSG"
  git push origin main

  echo "[AutoPush] ✅ Pushed at $(date)"
done

