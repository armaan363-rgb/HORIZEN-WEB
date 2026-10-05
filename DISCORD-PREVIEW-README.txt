Discord Components V2 link preview (discord:component-embed)

1. Edit embed.config.json: add "invite" and "support" URLs (empty = button left out).
2. Run: node build-embed.js   (rewrites the <script id="discord:component-embed"> in index, docs, commands)
3. Deploy to https://horizen.of.to (must be served as text/html).
4. Test in Discord's Embed Debugger: https://discord.com/developers/embeds
   Paste https://horizen.of.to/?v=2 (new ?v= forces a fresh fetch).

Rules (Discord draft docs): one Container only, max 40 components, max 3000 bytes of JSON,
link buttons only (style 5, no custom_id), no "id" fields. A bad payload falls back to the
normal Open Graph card (kept in the page) or shows nothing, so re-run the debugger after edits.
