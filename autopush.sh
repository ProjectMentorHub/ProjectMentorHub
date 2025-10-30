#!/bin/bash
echo "[AutoPush] Watching src/ and public/..."
while inotifywait -r -e modify,create,delete,move src public; do
  sleep 2
  git add -A
  git diff --cached --quiet || {
    git commit -m "auto-save: $(date '+%Y-%m-%d %H:%M:%S')"
    git push origin main
    echo "[AutoPush] Pushed at $(date)"
  }
done
