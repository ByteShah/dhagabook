import { useEffect } from 'react';
import { SITE, ROUTES, NOT_FOUND } from './site.js';

export function getMeta(path) {
  const meta = ROUTES[path] || NOT_FOUND;
  const canonical = `${SITE.url}${path === '/' ? '/' : path}`;
  const schema = meta.schema ? { '@context': 'https://schema.org', '@graph': meta.schema() } : null;
  return { ...meta, canonical, schema };
}

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Static <head> tags, injected into each prerendered HTML file at build time.
export function renderHead(path) {
  const m = getMeta(path);
  const img = `${SITE.url}${SITE.ogImage}`;
  const tags = [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}">`,
    `<meta name="robots" content="${m.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}">`,
    m.noindex ? '' : `<link rel="canonical" href="${esc(m.canonical)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${SITE.name}">`,
    `<meta property="og:locale" content="${SITE.locale}">`,
    `<meta property="og:title" content="${esc(m.title)}">`,
    `<meta property="og:description" content="${esc(m.description)}">`,
    `<meta property="og:url" content="${esc(m.canonical)}">`,
    `<meta property="og:image" content="${esc(img)}">`,
    `<meta property="og:image:width" content="1600">`,
    `<meta property="og:image:height" content="839">`,
    `<meta property="og:image:alt" content="DhagaBook web application home screen">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(m.title)}">`,
    `<meta name="twitter:description" content="${esc(m.description)}">`,
    `<meta name="twitter:image" content="${esc(img)}">`,
    m.schema
      ? `<script type="application/ld+json">${JSON.stringify(m.schema).replace(/</g, '\\u003c')}</script>`
      : '',
  ];
  if (path === '/') {
    tags.push('<link rel="preload" as="image" href="/images/dhagabook-web-app.webp" fetchpriority="high">');
  }
  return tags.filter(Boolean).join('\n');
}

function setTag(selector, attr, value, create) {
  let el = document.head.querySelector(selector);
  if (!el && create) {
    el = create();
    document.head.appendChild(el);
  }
  if (el) el.setAttribute(attr, value);
}

// Keeps <head> in sync during client-side navigation.
export function useSeo(path) {
  useEffect(() => {
    const m = getMeta(path);
    document.title = m.title;
    setTag('meta[name="description"]', 'content', m.description);
    setTag('meta[property="og:title"]', 'content', m.title);
    setTag('meta[property="og:description"]', 'content', m.description);
    setTag('meta[property="og:url"]', 'content', m.canonical);
    setTag('meta[name="twitter:title"]', 'content', m.title);
    setTag('meta[name="twitter:description"]', 'content', m.description);
    setTag('meta[name="robots"]', 'content', m.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
    if (!m.noindex) {
      setTag('link[rel="canonical"]', 'href', m.canonical, () => {
        const l = document.createElement('link');
        l.rel = 'canonical';
        return l;
      });
    }
    let ld = document.head.querySelector('script[type="application/ld+json"]');
    if (m.schema) {
      if (!ld) {
        ld = document.createElement('script');
        ld.type = 'application/ld+json';
        document.head.appendChild(ld);
      }
      ld.textContent = JSON.stringify(m.schema);
    } else if (ld) {
      ld.remove();
    }
  }, [path]);
}
