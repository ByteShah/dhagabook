# DhagaBook website

React (Vite + React Router) site built from the DhagaBook design canvas. Every page is prerendered to static HTML at build time for SEO, then hydrated into a fast single-page app.

## Commands

```bash
npm install
npm run dev       # local development at http://localhost:5173
npm run build     # production build into dist/ (prerendered HTML + sitemap.xml + robots.txt)
npm run preview   # serve dist/ at http://localhost:4173
```

## Before going live

1. Copy `.env.example` to `.env` and set:
   - `VITE_SITE_URL`: your real domain (used for canonical URLs, Open Graph tags and the sitemap).
   - `RESEND_API_KEY` (server only): the form posts to `/api/lead` (`server/lead.js`), which emails each demo / purchase request to `LEAD_TO` (default maitrik@codecrafters.in) from `LEAD_FROM` through Resend. On Vercel, `api/lead.js` deploys it automatically — add the same three variables in the project's Environment Variables. If sending fails, the visitor gets a one-tap "Send on WhatsApp" button with their details, so no lead is lost.
   - `VITE_GA_ID` (optional): your Google Analytics 4 measurement ID (G-…). Use this or GTM, not both.
   - `VITE_GOOGLE_SITE_VERIFICATION` (optional): Search Console HTML-tag value. Not needed if you verify through Google Analytics or DNS.
   - `VITE_GTM_ID` (optional): your Google Tag Manager container ID.
2. Replace the placeholders in `src/site.js`: `[YOUR EMAIL]`, `[YOUR ADDRESS]`, `[BUSINESS HOURS]`, `[TAX NOTE]`.
3. Run `npm run build` and upload `dist/` to any static host (Netlify, Vercel, Cloudflare Pages, Nginx). Configure the host to serve `404.html` for unknown paths.

## Where things live

- `src/site.js`: business details, plans, page titles and descriptions, structured data, pricing FAQ
- `src/pages/`: Home, Features, Pricing, Contact, NotFound
- `src/components/`: header and footer layout, icons, logo, shared bits
- `src/styles.css`: design tokens and all styles
- `scripts/prerender.js`: static HTML generation, sitemap and robots.txt

## Analytics events (pushed to `window.dataLayer`)

`cta_click` (with `cta` name), `call_click`, `form_start`, `generate_lead` (with intent, plan and value in INR).
# dhagabook
