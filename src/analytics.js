// Pushes conversion events to window.dataLayer (Google Tag Manager / GA4).
// Safe to call even when no analytics is installed.
export function track(event, params = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
