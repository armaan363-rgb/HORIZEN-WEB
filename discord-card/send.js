// Posts the Components V2 card to a channel via webhook (no bot code needed).
// Usage: WEBHOOK_URL="https://discord.com/api/webhooks/ID/TOKEN" node send.js
// Requires Node 18+.
const payload = require('./payload.json');
const url = process.env.WEBHOOK_URL;
if (!url) { console.error('Set WEBHOOK_URL'); process.exit(1); }

fetch(url + '?with_components=true&wait=true', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ ...payload, username: 'Horizen' })
}).then(async r => console.log(r.status, await r.text()));
