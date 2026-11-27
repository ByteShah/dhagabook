import { Link, useLocation } from 'react-router-dom';
import { Check, Plus, Pin, Phone, Chat } from '../components/Icons.jsx';
import { DemoBand, Mandala, Lotus } from '../components/Bits.jsx';
import { LANDING, LANDING_NAMES } from '../landing.js';
import { SITE } from '../site.js';
import { track } from '../analytics.js';

export default function Landing() {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/$/, '');
  const p = LANDING[path];
  if (!p) return null;
  const where = p.city || p.pill;

  return (
    <>
      <section className="bg-cream page-hero-wrap">
        <Mandala className="page-mandala" />
        <div className="page-hero">
          <span className="pill">{p.kind === 'location' && <Pin size={14} />} {p.pill}</span>
          <h1 className="h1">{p.h1} <span className="accent">{p.accent}</span></h1>
          <Lotus />
          <p className="lead">{p.lead}</p>
          <div className="btn-row">
            <Link to="/contact" className="btn btn-primary btn-lg" onClick={() => track('cta_click', { cta: 'landing_demo', page: path })}>Book a free demo</Link>
            <a href={SITE.whatsapp} className="btn btn-ghost btn-lg" target="_blank" rel="noopener" onClick={() => track('whatsapp_click', { location: `landing${path}` })}>
              <Chat size={18} /> WhatsApp us
            </a>
          </div>
          <p className="lp-ticks"><span><Check size={16} color="#0B6B52" /> Free demo</span><span><Check size={16} color="#0B6B52" /> 5 users included</span><span><Check size={16} color="#0B6B52" /> From ₹39,999 / year</span></p>
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
          <p className="fine-print"><Link to="/features">See all 30+ features</Link> · <Link to="/pricing">View pricing</Link></p>
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
          <h2 id="lp-faq" className="h2">Questions{p.kind === 'location' ? ` from ${where}` : ''}</h2>
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
          <h2 className="lp-related-title">Also see</h2>
          <ul className="lp-related">
            {p.related.map((r) => <li key={r}><Link to={r}>{LANDING_NAMES[r]}</Link></li>)}
          </ul>
        </div>
      </section>

      <DemoBand title={p.kind === 'location' ? `Book a free DhagaBook demo in ${where}` : 'See DhagaBook in action for your business'} text="A free walkthrough tailored to your industry — at our office or online." />
    </>
  );
}
