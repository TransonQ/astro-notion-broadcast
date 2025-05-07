#!/bin/bash
# This script triggers a Vercel deployment webhook when changes are detected in a Notion database.
# It uses the Vercel deployment hook URL stored in the environment variable VERCEL_DEPLOY_HOOK.
if [ -z "$VERCEL_DEPLOY_HOOK" ]; then
  echo "VERCEL_DEPLOY_HOOK is not set." >&2
  exit 1
fi

webhook_url="${VERCEL_DEPLOY_HOOK}?buildCache=true"

echo "[notion-poll]: Webhook triggered due to Notion database changes."

if curl -X POST "$webhook_url"; then
  echo "[notion-poll]: Webhook call succeeded."
else
  echo "[notion-poll]: Error triggering webhook." >&2
fi