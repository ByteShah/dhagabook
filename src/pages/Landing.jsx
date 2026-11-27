import { Link, useLocation } from 'react-router-dom';
import { Check, Plus, Pin, Phone, Chat } from '../components/Icons.jsx';
import { DemoBand, Mandala, Lotus } from '../components/Bits.jsx';
import { LANDING, LANDING_NAMES } from '../landing.js';
import { SITE } from '../site.js';
import { track } from '../analytics.js';

// Button and heading text for Hindi / Gujarati pages (page copy itself lives in landing.js).
const UI = {
  en: { demo: 'Book a free demo', wa: 'WhatsApp us', free: 'Free demo', users: '5 users included', from: 'From ₹39,999 / year', all: 'See all 30+ features', pricing: 'View pricing', faq: 'Questions', also: 'Also see', band: 'See DhagaBook in action for your business', bandText: 'A free walkthrough tailored to your industry — at our office or online.' },
  hi: { demo: 'फ्री डेमो बुक करें', wa: 'WhatsApp करें', free: 'फ्री डेमो', users: '5 यूज़र शामिल', from: '₹39,999 / वर्ष से', all: 'सभी 30+ फ़ीचर देखें', pricing: 'कीमत देखें', faq: 'सवाल-जवाब', also: 'यह भी देखें', band: 'अपने व्यापार के लिए DhagaBook का डेमो देखें', bandText: 'आपके व्यापार के हिसाब से फ्री डेमो — हमारे ऑफ़िस में या ऑनलाइन।' },
  gu: { demo: 'ફ્રી ડેમો બુક કરો', wa: 'WhatsApp કરો', free: 'ફ્રી ડેમો', users: '5 યુઝર સામેલ', from: '₹39,999 / વર્ષથી', all: 'બધા 30+ ફીચર જુઓ', pricing: 'કિંમત જુઓ', faq: 'પ્રશ્નો અને જવાબ', also: 'આ પણ જુઓ', band: 'તમારા વેપાર માટે DhagaBook નો ડેમો જુઓ', bandText: 'તમારા વેપાર મુજબ ફ્રી ડેમો — અમારી ઓફિસમાં કે ઓનલાઇન.' },
};

export default function Landing() {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/$/, '');
  const p = LANDING[path];
  if (!p) return null;
  const where = p.city || p.pill;
  const t = UI[p.lang] || UI.en;

  return (
    <div lang={p.lang || undefined}>
      <section className="bg-cream page-hero-wrap">
        <Mandala className="page-mandala" />
        <div className="page-hero">
          <span className="pill">{p.kind === 'location' && <Pin size={14} />} {p.pill}</span>
          <h1 className="h1">{p.h1} <span className="accent">{p.accent}</span></h1>
          <Lotus />
          <p className="lead">{p.lead}</p>
          <div className="btn-row">
            <Link to="/contact" className="btn btn-primary btn-lg" onClick={() => track('cta_click', { cta: 'landing_demo', page: path })}>{t.demo}</Link>
            <a href={SITE.whatsapp} className="btn btn-ghost btn-lg" target="_blank" rel="noopener" onClick={() => track('whatsapp_click', { location: `landing${path}` })}>
              <Chat size={18} /> {t.wa}
            </a>
          </div>
          <p className="lp-ticks"><span><Check size={16} color="#0B6B52" /> {t.free}</span><span><Check size={16} color="#0B6B52" /> {t.users}</span><span><Check size={16} color="#0B6B52" /> {t.from}</span></p>
        </div>
      </section>

      <section className="section">
        <div className="container lp-points">
          {p.points.map(([t, d], i) => (
            <article key={t} className="outline-card lp-point" data-reveal="" style={{ '--d': i }}>
              <span className="india-num" aria-hidden="true">0{i + 1}</span>
              <h2 className="h3-xs">{t}</h2>
              <p className="muted">{d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container stack-48">
          <div className="section-head center">
            <h2 className="h2">{p.featuresTitle}</h2>
          </div>
          <ul className="lp-features">
            {p.features.map((f) => <li key={f}><Check size={18} color="#0B6B52" />{f}</li>)}
          </ul>
          <p className="fine-print"><Link to="/features">{t.all}</Link> · <Link to="/pricing">{t.pricing}</Link></p>
        </div>
      </section>

      {p.local && (
        <section className="section">
          <div className="container stack-48">
            <div className="section-head center">
              <h2 className="h2">{p.local.title}</h2>
              <p className="lead">{p.local.text}</p>
            </div>
            <div className="lp-local">
              {p.local.groups.map(([label, items]) => (
                <div key={label} className="lp-local-group">
                  <h3 className="lp-local-title">{label}</h3>
                  <ul className="chip-list lp-chips">{items.map((x) => <li key={x} className="chip">{x}</li>)}</ul>
                </div>
              ))}
            </div>
            <div className="lp-office">
              <Pin size={22} color="#0B6B52" />
              <div>
                <b>DhagaBook office</b>
                <address>{SITE.address}</address>
                <span className="lp-office-links">
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`DhagaBook, ${SITE.address}`)}`} target="_blank" rel="noopener">Open in Google Maps</a>
                  <a href={`tel:${SITE.phoneIntl}`} onClick={() => track('call_click', { location: `landing${path}` })}><Phone size={14} /> {SITE.phone}</a>
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section faq-section bg-cream" aria-labelledby="lp-faq">
        <div className="container faq-inner">
          <h2 id="lp-faq" className="h2">{t.faq}{p.kind === 'location' ? ` from ${where}` : ''}</h2>
          <div className="faq">
            {p.faq.map((f) => (
              <details key={f.q} className="faq-item">
                <summary>{f.q}<Plus size={20} /></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section lp-related-wrap">
        <div className="container">
          <h2 className="lp-related-title">{t.also}</h2>
          <ul className="lp-related">
            {p.related.map((r) => <li key={r}><Link to={r}>{LANDING_NAMES[r]}</Link></li>)}
          </ul>
        </div>
      </section>

      <DemoBand title={p.kind === 'location' ? `Book a free DhagaBook demo in ${where}` : t.band} text={t.bandText} />
    </div>
  );
}
