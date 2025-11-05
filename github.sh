#!/usr/bin/env bash
# ------------------------------------------------------------------
# Push-to-GitHub Script
# ------------------------------------------------------------------
# This script automatically commits and pushes all changes
# from the current directory to your GitHub repository.

set -e  # stop if any command fails

# === CONFIGURE THESE ONCE ===
REMOTE="origin"            # your GitHub remote name
BRANCH="main"              # or "master" if you use that
COMMIT_MSG=${1:-"auto-push: $(date '+%Y-%m-%d %H:%M:%S')"}

# === LOGGING ===
echo "----------------------------------------------------------"
echo "[INFO] Starting Git push from: $(pwd)"
echo "[INFO] Commit message: $COMMIT_MSG"
echo "----------------------------------------------------------"

# === INITIALIZE REPO (only first time) ===
if [ ! -d ".git" ]; then
  echo "[INFO] Initializing new Git repository..."
  git init
  git branch -M "$BRANCH"
  echo "[INFO] Adding remote..."
  read -p "Enter your GitHub repo URL (e.g. https://github.com/username/repo.git): " REPO_URL
  git remote add "$REMOTE" "$REPO_URL"
fi

# === STAGE, COMMIT, PUSH ===
git add -A

if git diff --cached --quiet; then
  echo "[INFO] No changes to commit."
else
  git commit -m "$COMMIT_MSG"
fi

echo "[INFO] Pushing to $REMOTE/$BRANCH ..."
git push -u "$REMOTE" "$BRANCH"

echo "----------------------------------------------------------"
echo "[✅] Push complete! $(date)"
echo "----------------------------------------------------------"
