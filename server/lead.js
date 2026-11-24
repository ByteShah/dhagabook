// Receives the demo / purchase form and emails it to the DhagaBook inbox through Resend.
// Web-standard handler (Request -> Response), used by api/lead.js on the host and by the
// Vite dev/preview server. Needs RESEND_API_KEY; LEAD_TO and LEAD_FROM are optional.

const MAX = { name: 120, company: 160, phone: 30, email: 160, businessType: 80, teamSize: 40, plan: 120, message: 2000, page: 300 };
const PHONE_RE = /^(\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const clean = (v, n) => String(v ?? '').trim().slice(0, n);

export async function handleLead(request, env = {}) {
  if (request.method !== 'POST') return json({ success: false, message: 'Method not allowed' }, 405);

  let data;
  try {
    data = await request.json();
  } catch {
    return json({ success: false, message: 'Invalid request' }, 400);
  }

  // Honeypot: real visitors never fill this hidden field. Pretend success for bots.
  if (data.website) return json({ success: true });

  const lead = Object.fromEntries(Object.entries(MAX).map(([k, n]) => [k, clean(data[k], n)]));
  lead.intent = data.intent === 'Purchase' ? 'Purchase' : 'Book a free demo';
  lead.modules = (Array.isArray(data.modules) ? data.modules : []).slice(0, 12).map((m) => clean(m, 60)).filter(Boolean);

  if (!lead.name || !PHONE_RE.test(lead.phone)) return json({ success: false, message: 'Please check your name and phone number.' }, 422);

  const key = env.RESEND_API_KEY;
  if (!key) return json({ success: false, message: 'Email sending is not configured' }, 500);

  const to = (env.LEAD_TO || 'maitrik@codecrafters.in').split(',').map((s) => s.trim()).filter(Boolean);
  const from = env.LEAD_FROM || 'DhagaBook Website <maitrik@codecrafters.in>';
  const kind = lead.intent === 'Purchase' ? 'Purchase request' : 'Demo request';
  const subject = `New ${kind.toLowerCase()} — ${lead.name}${lead.company ? ` (${lead.company})` : ''}`;

  const rows = [
    ['Request', kind],
    ['Plan', lead.plan],
    ['Name', lead.name],
    ['Company', lead.company],
    ['Phone', lead.phone && `<a href="tel:${esc(lead.phone.replace(/[\s-]/g, ''))}">${esc(lead.phone)}</a>`, true],
    ['Email', lead.email && `<a href="mailto:${esc(lead.email)}">${esc(lead.email)}</a>`, true],
    ['Business type', lead.businessType],
    ['Team size', lead.teamSize],
    ['Interested in', lead.modules.join(', ')],
    ['Message', lead.message],
    ['Page', lead.page],
  ].filter(([, v]) => v);

  const html = `<div style="font-family:Arial,sans-serif;font-size:14px;color:#10221C">
<h2 style="margin:0 0 12px;color:#0B6B52">${esc(subject)}</h2>
<table cellpadding="8" style="border-collapse:collapse">${rows
    .map(([k, v, raw]) => `<tr><td style="border-bottom:1px solid #eee;color:#5b6b66;white-space:nowrap"><b>${k}</b></td><td style="border-bottom:1px solid #eee">${raw ? v : esc(v).replace(/\n/g, '<br>')}</td></tr>`)
    .join('')}</table>
<p style="color:#8a9893;font-size:12px">Sent from the DhagaBook website contact form.</p></div>`;
  const text = rows.map(([k, v, raw]) => `${k}: ${raw ? v.replace(/<[^>]+>/g, '') : v}`).join('\n');

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 10000);
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to, subject, html, text, ...(lead.email ? { reply_to: lead.email } : {}) }),
      signal: ctrl.signal,
    });
    if (!res.ok) {
      console.error('[lead] Resend error', res.status, await res.text().catch(() => ''));
      return json({ success: false, message: 'Could not send email' }, 502);
    }
    return json({ success: true });
  } catch (err) {
    console.error('[lead] Resend request failed', err);
    return json({ success: false, message: 'Could not send email' }, 502);
  } finally {
    clearTimeout(timer);
  }
}
