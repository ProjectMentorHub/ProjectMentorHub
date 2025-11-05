#!/usr/bin/env bash
set -euo pipefail

REMOTE="origin"
BRANCH="main"
COMMIT_MSG=${1:-"auto-push: $(date '+%Y-%m-%d %H:%M:%S')"}

echo "----------------------------------------------------------"
echo "[INFO] Starting Git push from: $(pwd)"
echo "[INFO] Commit message: $COMMIT_MSG"
echo "----------------------------------------------------------"

# First-time init (if needed)
if [ ! -d ".git" ]; then
  echo "[INFO] Initializing new Git repo…"
  git init
  git branch -M "$BRANCH"
  read -p "Enter GitHub repo URL: " REPO_URL
  git remote add "$REMOTE" "$REPO_URL"
fi

# Always sync latest remote changes before committing
echo "[INFO] Fetching and rebasing on latest $REMOTE/$BRANCH…"
git fetch "$REMOTE" "$BRANCH"
# --autostash keeps local changes safe during rebase
git pull --rebase --autostash "$REMOTE" "$BRANCH" || {
  echo "[ERR] Rebase failed. Resolve conflicts, then run: git rebase --continue"
  exit 1
}

# Stage & commit if there are changes
git add -A
if git diff --cached --quiet; then
  echo "[INFO] No changes to commit."
else
  git commit -m "$COMMIT_MSG"
fi

# Push
echo "[INFO] Pushing to $REMOTE/$BRANCH…"
git push -u "$REMOTE" "$BRANCH"

echo "----------------------------------------------------------"
echo "[✅] Push complete! $(date)"
echo "----------------------------------------------------------"
