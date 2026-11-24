import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Check, Mail, Pin, Clock, Chat, Phone } from '../components/Icons.jsx';
import { SITE, PLANS } from '../site.js';
import { track } from '../analytics.js';
import { Mandala, Lotus } from '../components/Bits.jsx';

const PLAN_OPTIONS = [...PLANS.map((p) => [p.id, p.label]), ['not-sure', 'Not sure yet']];
const BUSINESS_TYPES = ['Trading / Distribution', 'Manufacturing', 'Retail & Ecommerce', 'Services', 'Other'];
const TEAM_SIZES = ['1–5 users', '6–10 users', '11–25 users', '26–50 users', '50+ users'];
const MODULES = [
  ['sales', 'Sales & Billing'],
  ['stock', 'Stock & Warehouse'],
  ['accounts', 'Accounting & GST'],
  ['mfg', 'Manufacturing'],
  ['hr', 'Employees & Payroll'],
  ['web', 'Website & Ecommerce'],
];
const NEXT_STEPS = [
  ['We call you', 'Our team contacts you to understand your business.'],
  ['Personalised demo', 'We show DhagaBook using examples from your trade.'],
  ['Start when you’re ready', 'Choose Web or Web + App and we help you set up.'],
];

const PHONE_RE = /^(\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data) {
  const errors = {};
  if (!data.name.trim()) errors.name = 'Please enter your name.';
  if (!data.phone.trim()) errors.phone = 'Please enter your phone number so we can call you.';
  else if (!PHONE_RE.test(data.phone.trim())) errors.phone = 'Please enter a valid 10-digit Indian mobile number.';
  if (data.email.trim() && !EMAIL_RE.test(data.email.trim())) errors.email = 'Please check your email address.';
  return errors;
}

// The same details as a ready-to-send WhatsApp message (fallback when email sending fails).
function whatsappLead(p) {
  const lines = [
    `Hi DhagaBook, I would like to ${p.intent === 'Purchase' ? 'buy a plan' : 'book a free demo'}.`,
    `Name: ${p.name}`,
    p.company && `Company: ${p.company}`,
    `Phone: ${p.phone}`,
    p.email && `Email: ${p.email}`,
    p.plan && `Plan: ${p.plan}`,
    `Business: ${p.businessType} · ${p.teamSize}`,
    p.modules.length && `Interested in: ${p.modules.join(', ')}`,
    p.message && `Message: ${p.message}`,
  ].filter(Boolean);
  return `${SITE.whatsapp.split('?')[0]}?text=${encodeURIComponent(lines.join('\n'))}`;
}

async function sendLead(payload) {
  // Never leave the visitor waiting: give up after 12 seconds.
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 12000);
  try {
    const res = await fetch(SITE.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: ctrl.signal,
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || json.success === false || json.success === 'false') {
      throw new Error(json.message || `Request failed: ${res.status}`);
    }
  } finally {
    clearTimeout(timer);
  }
}

function Field({ label, error, id, wide, children }) {
  return (
    <div className={`field${wide ? ' field--wide' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && <span className="field-error" id={`${id}-error`} role="alert">{error}</span>}
    </div>
  );
}

export default function Contact() {
  const [params] = useSearchParams();
  const [intent, setIntent] = useState('demo');
  const [plan, setPlan] = useState('web-app');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errors, setErrors] = useState({});
  const [lastLead, setLastLead] = useState(null);
  const formRef = useRef(null);
  const resultRef = useRef(null);
  const started = useRef(false);

  // Pre-fill from pricing links (?intent=buy&plan=web-app). Runs after hydration to match the prerendered HTML.
  useEffect(() => {
    const i = params.get('intent');
    const p = params.get('plan');
    if (i === 'buy' || i === 'demo') setIntent(i);
    if (p && PLAN_OPTIONS.some(([id]) => id === p)) setPlan(p);
  }, [params]);

  useEffect(() => {
    if (status === 'sent') resultRef.current?.focus();
  }, [status]);

  const onFirstInput = () => {
    if (!started.current) {
      started.current = true;
      track('form_start', { form: 'demo' });
    }
  };

  async function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get('website')) return; // honeypot: bots fill hidden fields
    const data = {
      intent: intent === 'buy' ? 'Purchase' : 'Book a free demo',
      ...(intent === 'buy' ? { plan: PLAN_OPTIONS.find(([id]) => id === plan)?.[1] } : {}),
      name: String(fd.get('name') || ''),
      company: String(fd.get('company') || ''),
      phone: String(fd.get('phone') || ''),
      email: String(fd.get('email') || ''),
      businessType: String(fd.get('type') || ''),
      teamSize: String(fd.get('size') || ''),
      modules: fd.getAll('modules').map(String),
      message: String(fd.get('message') || ''),
      page: typeof window !== 'undefined' ? window.location.href : '',
      submittedAt: new Date().toISOString(),
    };
    const errs = validate(data);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus('sending');
    setLastLead(data);
    try {
      await sendLead(data);
      setStatus('sent');
      track('generate_lead', { form: intent, intent, ...(intent === 'buy' ? { plan, currency: 'INR', value: PLANS.find((p) => p.id === plan)?.price || 0 } : {}) });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  const describe = (name) => (errors[name] ? `${name}-error` : undefined);

  return (
    <section className="bg-cream page-hero-wrap">
      <Mandala className="page-mandala page-mandala--left" />
      <div className="container contact">
        <div className="contact-copy">
          <p className="pill-badge">
            <span className="pill-badge__hi deva" lang="hi">स्वागत है</span>
            Free demo · No obligation
          </p>
          <h1 className="h1 contact-title">Let’s set up DhagaBook for <span className="accent">your business</span></h1>
          <Lotus className="lotus-left" />
          <p className="lead contact-lead">Tell us a little about how you work. We’ll show you the modules that matter to you and answer every question.</p>

          <div className="next-steps">
            <h2 className="next-steps-title">What happens next</h2>
            <ol>
              {NEXT_STEPS.map(([t, d], i) => (
                <li key={t}>
                  <span className="step-dot" aria-hidden="true">{i + 1}</span>
                  <span><b>{t}</b><span className="muted">{d}</span></span>
                </li>
              ))}
            </ol>
          </div>

          <div className="contact-quick">
            <a href={`tel:${SITE.phoneIntl}`} className="btn btn-outline btn-md" onClick={() => track('call_click', { location: 'contact_quick' })}>
              <Phone size={18} /> Call {SITE.phone}
            </a>
            <a href={SITE.whatsapp} className="btn btn-whatsapp btn-md" target="_blank" rel="noopener" onClick={() => track('whatsapp_click', { location: 'contact_quick' })}>
              <Chat size={18} /> Chat on WhatsApp
            </a>
          </div>

          <ul className="contact-info">
            <li><span className="icon-tile icon-tile--md bg-mint"><Mail size={20} color="#0B6B52" width={1.9} /></span><span><span className="muted-sm">Email</span><a href={`mailto:${SITE.email}`} className="contact-mail" onClick={() => track('email_click', { location: 'contact' })}><b>{SITE.email}</b></a></span></li>
            <li><span className="icon-tile icon-tile--md bg-mint"><Pin size={20} color="#0B6B52" width={1.9} /></span><span><span className="muted-sm">Office</span><b>{SITE.address}</b></span></li>
            <li><span className="icon-tile icon-tile--md bg-mint"><Clock size={20} color="#0B6B52" width={1.9} /></span><span><span className="muted-sm">Working hours</span><b>{SITE.hours}</b></span></li>
          </ul>

          <ul className="ticks ticks--left">
            {['Free and no obligation', 'Personalised to your business', 'Your details stay private'].map((t) => (
              <li key={t}><Check size={18} color="#0B6B52" />{t}</li>
            ))}
          </ul>
        </div>

        <div className="form-card">
          <div className="form-card-toran" aria-hidden="true" />
          {status === 'sent' ? (
            <div className="form-success" ref={resultRef} tabIndex={-1} aria-live="polite">
              <span className="success-icon"><Check size={36} color="#0B6B52" width={2.4} /></span>
              <h2 className="h2-form">Thanks — we’ve got your request</h2>
              <p className="muted">
                Our team will contact you shortly to confirm the next steps. Need help sooner? Call{' '}
                <a href={`tel:${SITE.phoneIntl}`}>{SITE.phone}</a> or{' '}
                <a href={SITE.whatsapp} target="_blank" rel="noopener" onClick={() => track('whatsapp_click', { location: 'form_success' })}>message us on WhatsApp</a>.
              </p>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setStatus('idle')}>Send another request</button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={onSubmit} onInput={onFirstInput} noValidate className="lead-form">
              <h2 className="h2-form">Book a free demo or buy a plan</h2>
              <p className="form-sub">It takes less than a minute.</p>

              <div className="form-grid">
                <Field label="I want to" id="f-intent" wide={intent !== 'buy'}>
                  <select id="f-intent" name="intent" className="input input--accent" value={intent} onChange={(e) => setIntent(e.target.value)}>
                    <option value="demo">Book a free demo</option>
                    <option value="buy">Purchase</option>
                  </select>
                </Field>
                {intent === 'buy' && (
                  <Field label="Plan" id="f-plan">
                    <select id="f-plan" name="plan" className="input input--accent" value={plan} onChange={(e) => setPlan(e.target.value)}>
                      {PLAN_OPTIONS.map(([id, label]) => <option key={id} value={id}>{label}</option>)}
                    </select>
                  </Field>
                )}
                <Field label="Full name" id="f-name" error={errors.name}>
                  <input id="f-name" name="name" type="text" className="input" placeholder="Your full name" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={describe('name')} />
                </Field>
                <Field label="Company name" id="f-company">
                  <input id="f-company" name="company" type="text" className="input" placeholder="Business name" autoComplete="organization" />
                </Field>
                <Field label="Phone" id="f-phone" error={errors.phone}>
                  <input id="f-phone" name="phone" type="tel" inputMode="tel" className="input" placeholder="+91 98765 43210" autoComplete="tel" required aria-invalid={!!errors.phone} aria-describedby={describe('phone')} />
                </Field>
                <Field label="Email" id="f-email" error={errors.email}>
                  <input id="f-email" name="email" type="email" className="input" placeholder="you@business.com" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={describe('email')} />
                </Field>
                <Field label="Business type" id="f-type">
                  <select id="f-type" name="type" className="input">{BUSINESS_TYPES.map((t) => <option key={t}>{t}</option>)}</select>
                </Field>
                <Field label="Team size" id="f-size">
                  <select id="f-size" name="size" className="input">{TEAM_SIZES.map((t) => <option key={t}>{t}</option>)}</select>
                </Field>
              </div>

              <fieldset className="modules">
                <legend>Interested in</legend>
                <div className="module-chips">
                  {MODULES.map(([v, l]) => (
                    <label key={v} className="module-chip">
                      <input type="checkbox" name="modules" value={l} />
                      {l}
                    </label>
                  ))}
                </div>
              </fieldset>

              <Field label="Message (optional)" id="f-message">
                <textarea id="f-message" name="message" className="input textarea" rows="4" placeholder="Tell us what you would like to see in the demo" />
              </Field>

              <div className="hp" aria-hidden="true">
                <label htmlFor="f-website">Website</label>
                <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              {status === 'error' && (
                <div className="form-alert" role="alert">
                  <p>
                    Sorry, we couldn’t send your request just now. Send the same details on WhatsApp in one tap, or call us on{' '}
                    <a href={`tel:${SITE.phoneIntl}`}>{SITE.phone}</a>.
                  </p>
                  {lastLead && (
                    <a
                      href={whatsappLead(lastLead)}
                      className="btn btn-whatsapp btn-md"
                      target="_blank"
                      rel="noopener"
                      onClick={() => track('whatsapp_click', { location: 'form_error' })}
                    >
                      <Chat size={18} /> Send on WhatsApp
                    </a>
                  )}
                </div>
              )}

              <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : intent === 'buy' ? 'Submit purchase request' : 'Book my free demo'}
              </button>
              <p className="form-foot">We’ll call you back at a time that suits you.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
