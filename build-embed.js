// Injects Discord's Components V2 link preview (discord:component-embed) into the site's pages.
// Edit embed.config.json (add "invite" and "support" URLs to get those buttons), then run:  node build-embed.js
const fs = require('fs');
const cfg = JSON.parse(fs.readFileSync('embed.config.json', 'utf8'));
const base = 'https://' + cfg.domain;
const START = '<!-- DISCORD-EMBED:START -->', END = '<!-- DISCORD-EMBED:END -->';

const pages = [
  { file: 'index.html', url: base + '/', title: 'Horizen',
    desc: 'Antinuke, moderation, music, leveling, logging and 600+ commands. Secure your server and keep it active. Add Horizen free.' },
  { file: 'commands/index.html', url: base + '/commands/', title: 'Horizen Commands',
    desc: 'Search and copy every Horizen command: antinuke, moderation, music, leveling, logging, fun, social and utility.' },
  { file: 'docs/index.html', url: base + '/docs/', title: 'Horizen Docs',
    desc: 'Set up the bot, configure Antinuke and AutoMod, and read the full command reference.' },
];

const btn = (label, url) => ({ type: 2, style: 5, label, url });   // link buttons only (style 5), no custom_id, no id
for (const p of pages) {
  const buttons = [];
  if (cfg.invite) buttons.push(btn('Invite', cfg.invite));
  buttons.push(btn('Website', base + '/'), btn('Commands', base + '/commands/'), btn('Docs', base + '/docs/'));
  if (cfg.support) buttons.push(btn('Support Server', cfg.support));

  const payload = { component: { type: 17, accent_color: 0xe3112b, components: [
    { type: 9,
      components: [{ type: 10, content: '# ' + p.title }, { type: 10, content: p.desc }],
      accessory: { type: 11, media: { url: base + '/assets/logo-512.png' } } },
    { type: 10, content: cfg.stats },
    { type: 14, divider: true, spacing: 1 },
    { type: 1, components: buttons },
  ] } };

  const json = JSON.stringify(payload).replace(/</g, '\\u003c');
  const bytes = Buffer.byteLength(json);
  if (bytes > 3000) { console.error(`${p.file}: payload ${bytes} bytes > 3000 limit`); process.exit(1); }
  let count = 0; (function walk(c){ count++; (c.components||[]).forEach(walk); if (c.accessory) count++; })(payload.component);
  if (count > 40) { console.error(`${p.file}: ${count} components > 40`); process.exit(1); }

  const block = `${START}\n<script id="discord:component-embed" type="application/json">${json}</script>\n${END}`;
  let html = fs.readFileSync(p.file, 'utf8');
  const re = new RegExp(START + '[\\s\\S]*?' + END);
  html = re.test(html) ? html.replace(re, block) : html.replace('</head>', block + '\n</head>');
  fs.writeFileSync(p.file, html);
  console.log(`${p.file}: ok (${bytes} bytes, ${count} components, ${buttons.length} buttons)`);
}
