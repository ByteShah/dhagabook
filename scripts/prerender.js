// Renders every route to static HTML so search engines and social previews see full content.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const env = loadEnv();
const SITE_URL = (env.VITE_SITE_URL || 'https://www.your-domain.com').replace(/\/$/, '');
const GTM = env.VITE_GTM_ID;
const GA = env.VITE_GA_ID;
// Google Search Console HTML-tag verification (content value only).
const GSC = env.VITE_GOOGLE_SITE_VERIFICATION;
const gscHead = GSC ? `<meta name="google-site-verification" content="${GSC}">` : '';

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const { render, routes } = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href);

const gtmHead = GTM
  ? `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM}');</script>`
  : '';
// Google Analytics 4 (gtag.js). Page views on in-app navigation are picked up by
// GA4 enhanced measurement ("page changes based on browser history events").
const gaHead = GA
  ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${GA}"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA}');</script>`
  : '';

function page(url) {
  const { html, head } = render(url);
  return template.replace('<!--head-->', head + gscHead + gaHead + gtmHead).replace('<!--app-->', html);
}

for (const url of routes) {
  const file = url === '/' ? path.join(dist, 'index.html') : path.join(dist, url.slice(1), 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const out = page(url);
  fs.writeFileSync(file, out);
  // Also /features.html so clean URLs work on hosts that don't map /features → /features/index.html.
  if (url !== '/') fs.writeFileSync(path.join(dist, `${url.slice(1)}.html`), out);
  console.log('prerendered', url);
}
fs.writeFileSync(path.join(dist, '404.html'), page('/404'));
console.log('prerendered /404.html');

const LEGAL = ['/terms', '/privacy', '/refund-policy', '/delete-account'];
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url><loc>${SITE_URL}${r}</loc><lastmod>${today}</lastmod><changefreq>${LEGAL.includes(r) ? 'yearly' : 'monthly'}</changefreq><priority>${r === '/' ? '1.0' : LEGAL.includes(r) ? '0.3' : '0.8'}</priority></url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
console.log(GA ? `Google Analytics on: ${GA}` : 'Google Analytics off (VITE_GA_ID not set)');
console.log('wrote sitemap.xml and robots.txt for', SITE_URL);
if (SITE_URL.includes('your-domain')) console.warn('\n⚠  VITE_SITE_URL is not set — canonical URLs and sitemap use a placeholder domain. Set it in .env before deploying.\n');

function loadEnv() {
  const out = { ...process.env };
  for (const name of ['.env', '.env.production', '.env.local', '.env.production.local']) {
    const p = path.join(root, name);
    if (!fs.existsSync(p)) continue;
    for (const line of fs.readFileSync(p, 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !(m[1] in process.env)) out[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
    }
  }
  return out;
}
