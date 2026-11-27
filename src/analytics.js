// Sends conversion events to Google Analytics 4 (gtag.js, when VITE_GA_ID is set)
// or to window.dataLayer for Google Tag Manager. Safe to call when no analytics is installed.
export function track(event, params = {}) {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag === 'function') {
    window.gtag('event', event, params);
    return;
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
