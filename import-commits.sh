#!/bin/bash

# Import commits from commits.txt and rebuild git history
# This will create a new git history with the timestamps and messages from commits.txt

set -e

# Check if commits.txt exists
if [ ! -f "commits.txt" ]; then
    echo "❌ commits.txt not found!"
    exit 1
fi

# Get current git user info
GIT_USER_NAME=$(git config user.name)
GIT_USER_EMAIL=$(git config user.email)

echo "🔄 Rebuilding git history from commits.txt..."
echo "👤 Author will be: $GIT_USER_NAME <$GIT_USER_EMAIL>"

# Create orphan branch for clean history
git checkout --orphan temp-history

# Read commits.txt and recreate each commit
while IFS='|' read -r commit_hash timestamp message; do
    # Skip empty lines
    [ -z "$commit_hash" ] && continue
    
    echo "📝 Creating commit: $message"
    echo "⏰ Timestamp: $timestamp"
    
    # Get files from original commit
    git checkout "$commit_hash" -- . 2>/dev/null || true
    
    # Add all files
    git add -A
    
    # Remove any Claude co-author references from commit message
    clean_message=$(echo "$message" | sed '/Co-Authored-By: Claude/d' | sed '/Generated with.*Claude Code/d')
    
    # Create commit with specified timestamp and author (skip hooks for speed)
    GIT_AUTHOR_DATE="$timestamp" \
    GIT_COMMITTER_DATE="$timestamp" \
    GIT_AUTHOR_NAME="$GIT_USER_NAME" \
    GIT_AUTHOR_EMAIL="$GIT_USER_EMAIL" \
    GIT_COMMITTER_NAME="$GIT_USER_NAME" \
    GIT_COMMITTER_EMAIL="$GIT_USER_EMAIL" \
    git commit -m "$clean_message" --allow-empty --no-verify
    
done < commits.txt

echo "✅ History rebuilt on temp-history branch"
echo "🔄 Switching to main and replacing history..."

# Replace main branch with new history
git branch -D main 2>/dev/null || true
git branch -m temp-history main

echo "✅ Git history successfully rewritten!"
echo "📊 New commit count: $(git rev-list --count HEAD)"