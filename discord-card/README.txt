Components V2 card with link buttons (Container + Section + Thumbnail + ActionRow).

1. Edit payload.json: replace YOUR_BOT_ID and YOUR_CODE.
2. Channel > Edit > Integrations > Webhooks > New Webhook > copy URL.
3. WEBHOOK_URL="<url>" node send.js

In your own bot, send the same JSON as the message body with flags 32768
(MessageFlags.IsComponentsV2). Do not send "content" or "embeds" with it.
