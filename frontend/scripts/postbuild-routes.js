/* Runs after `craco build`.

   The app is a single-page app, so the host only has one real file
   (index.html). Any other address — /live, /apply — used to be answered by the
   "not found" fallback: the page rendered, but the server replied HTTP 404.
   Instagram's link checker, link previews and ad review all read that status.

   This writes a real HTML file for every known route (build/live/index.html
   and so on), so each address answers 200 and carries its own title and
   description for link previews. The React app boots from it exactly as before.

   Add a route here when a new page is added in src/App.js. */

const fs = require('fs');
const path = require('path');

const BUILD = path.join(__dirname, '..', 'build');
const SITE = 'https://www.orderflowschool.com';

const ROUTES = [
  // Public landing pages — indexable, with their own preview text.
  {
    path: 'live',
    title: 'OFS Live Room | Trade live with Edgar',
    description: 'Watch Edgar read order flow and trade futures live, several times a week. Start a free trial of the OFS Live Room, or join the free Discord.',
  },
  {
    path: 'apply',
    title: 'Apply | Order Flow School',
    description: 'Apply to work 1:1 with Edgar. Four short steps, about three minutes, and no payment at any point in the application.',
  },
  {
    path: 'masterclass',
    title: 'Order Flow Masterclass | Order Flow School',
  },
  { path: 'legal/privacy', title: 'Privacy | Order Flow School' },
  { path: 'legal/terms', title: 'Terms | Order Flow School' },
  { path: 'legal/refunds', title: 'Refunds | Order Flow School' },
  { path: 'legal/cookies', title: 'Cookies | Order Flow School' },
  { path: 'legal/risk', title: 'Trading risk | Order Flow School' },
  { path: 'legal/contact', title: 'Contact | Order Flow School' },

  // Steps inside the funnel — real pages, but not for search results.
  { path: 'not-ready-yet', title: 'OFS Live | Order Flow School', noindex: true },
  { path: 'success', title: 'Your application | Order Flow School', noindex: true },
  { path: 'booking', title: 'Order Flow School', noindex: true },
  { path: 'booking-confirmed', title: 'Confirmed | Order Flow School', noindex: true },
  { path: 'masterclass-confirmed', title: 'Your spot is reserved | Order Flow Masterclass', noindex: true },
];

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* Replace the content of an existing <meta> tag, or add the tag if absent.
   Function replacers are used throughout so a "$" in the text is never read
   as a regex group reference. */
const setMeta = (html, attr, key, value) => {
  const re = new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`);
  if (re.test(html)) return html.replace(re, (_m, open, close) => `${open}${esc(value)}${close}`);
  return html.replace('</head>', () => `<meta ${attr}="${key}" content="${esc(value)}"/></head>`);
};

const render = (base, route) => {
  let html = base;
  const url = `${SITE}/${route.path}`;

  if (route.title) {
    html = html.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${esc(route.title)}</title>`);
    html = setMeta(html, 'property', 'og:title', route.title);
    html = setMeta(html, 'name', 'twitter:title', route.title);
  }
  if (route.description) {
    html = setMeta(html, 'name', 'description', route.description);
    html = setMeta(html, 'property', 'og:description', route.description);
    html = setMeta(html, 'name', 'twitter:description', route.description);
  }

  const extra = [
    `<link rel="canonical" href="${url}"/>`,
    `<meta property="og:url" content="${url}"/>`,
  ];
  if (route.noindex) extra.push('<meta name="robots" content="noindex"/>');
  return html.replace('</head>', () => `${extra.join('')}</head>`);
};

const indexPath = path.join(BUILD, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('[postbuild-routes] build/index.html not found — did the build run?');
  process.exit(1);
}

const base = fs.readFileSync(indexPath, 'utf8');
if (!/<title>[\s\S]*?<\/title>/.test(base) || !base.includes('</head>')) {
  console.error('[postbuild-routes] build/index.html has an unexpected shape — not writing route files.');
  process.exit(1);
}

ROUTES.forEach((route) => {
  const dir = path.join(BUILD, ...route.path.split('/'));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), render(base, route), 'utf8');
});

console.log(`[postbuild-routes] wrote ${ROUTES.length} route files: ${ROUTES.map((r) => `/${r.path}`).join(', ')}`);
