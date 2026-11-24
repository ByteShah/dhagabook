import { Link } from 'react-router-dom';
import { Check, Cross, Monitor, Devices, Sliders, Mobile, Building, Pin, Plus } from '../components/Icons.jsx';
import { SITE, PRICING_FAQ } from '../site.js';
import { track } from '../analytics.js';
import Testimonials from '../components/Testimonials.jsx';
import { Mandala, Lotus } from '../components/Bits.jsx';

function Feature({ children, strong, color = '#0B6B52' }) {
  return (
    <li className={strong ? 'is-strong' : undefined}>
      <Check size={20} color={color} />
      {children}
    </li>
  );
}

const PLATFORMS = [
  [Mobile, 'Mobile App', 'On the go'],
  [Monitor, 'Web Application', 'Full control'],
  [Building, 'Multiple', 'Companies'],
  [Pin, 'Multiple', 'Locations'],
];

const cta = (plan, intent) => () => track('cta_click', { cta: `pricing_${intent}`, plan });

export default function Pricing() {
  return (
    <>
      <section className="bg-cream page-hero-wrap">
        <Mandala className="page-mandala" />
        <div className="container pricing-wrap">
          <div className="section-head center">
            <span className="pill">Simple yearly pricing</span>
            <h1 className="h1">Pick the plan that <span className="accent">fits your business</span></h1>
            <Lotus />
            <p className="lead">Every plan is billed yearly and includes all 30+ features with 5 users.</p>
          </div>

          <div className="plans">
            <article className="plan" data-reveal="">
              <div className="plan-head">
                <span className="icon-tile icon-tile--lg" style={{ background: '#E3F0FF' }}><Monitor size={26} color="#1F5FBF" /></span>
                <h2 className="plan-name">Web</h2>
                <p className="plan-sub">Full control from any browser.</p>
              </div>
              <p className="plan-was"><s aria-label="Was ₹49,999">₹49,999</s><b>Save ₹10,000</b></p>
              <p className="plan-price"><span>₹39,999</span><small>/ year</small></p>
              <p className="plan-month">That’s about ₹3,330 a month</p>
              <ul className="plan-list">
                <Feature>Web application</Feature>
                <Feature>All 30+ features</Feature>
                <Feature>5 users included</Feature>
                <Feature>Multiple companies &amp; locations</Feature>
                <li className="is-off"><Cross size={20} color="#8A9893" />Mobile app not included</li>
              </ul>
              <div className="plan-ctas">
                <Link to="/contact?intent=buy&plan=web" className="btn btn-primary btn-md" onClick={cta('web', 'buy')}>Buy Web</Link>
                <Link to="/contact?intent=demo&plan=web" className="btn btn-outline btn-md" onClick={cta('web', 'demo')}>Free demo of Web</Link>
              </div>
            </article>

            <article className="plan plan--featured" data-reveal="" style={{ '--d': 1 }}>
              <span className="plan-flag">Web + Mobile</span>
              <div className="plan-head">
                <span className="icon-tile icon-tile--lg" style={{ background: '#E3F6EC' }}><Devices size={26} color="#0B6B52" /></span>
                <h2 className="plan-name">Web + App</h2>
                <p className="plan-sub">Run your business from the office and on the go.</p>
              </div>
              <p className="plan-was"><s aria-label="Was ₹59,999">₹59,999</s><b>Save ₹10,000</b></p>
              <p className="plan-price"><span>₹49,999</span><small>/ year</small></p>
              <p className="plan-month">That’s about ₹4,170 a month</p>
              <ul className="plan-list">
                <Feature>Web application</Feature>
                <Feature strong>Mobile app (Android &amp; iOS)</Feature>
                <Feature>All 30+ features</Feature>
                <Feature>5 users included</Feature>
                <Feature>Multiple companies &amp; locations</Feature>
              </ul>
              <div className="plan-ctas">
                <Link to="/contact?intent=buy&plan=web-app" className="btn btn-primary btn-md" onClick={cta('web-app', 'buy')}>Buy Web + App</Link>
                <Link to="/contact?intent=demo&plan=web-app" className="btn btn-outline btn-md" onClick={cta('web-app', 'demo')}>Free demo of Web + App</Link>
              </div>
            </article>

            <article className="plan plan--dark" data-reveal="" style={{ '--d': 2 }}>
              <Mandala className="card-mandala" />
              <div className="plan-head">
                <span className="icon-tile icon-tile--lg" style={{ background: '#14605A' }}><Sliders size={26} color="#F2B25C" /></span>
                <h2 className="plan-name">Custom</h2>
                <p className="plan-sub">Built around the way your business works.</p>
              </div>
              <p className="plan-price"><span>Let’s talk</span></p>
              <ul className="plan-list">
                <Feature color="#F2B25C">Everything in Web + App</Feature>
                <Feature color="#F2B25C">More than 5 users</Feature>
                <Feature color="#F2B25C">Custom modules &amp; reports</Feature>
                <Feature color="#F2B25C">Setup &amp; onboarding for your team</Feature>
              </ul>
              <div className="plan-ctas">
                <Link to="/contact?intent=buy&plan=custom" className="btn btn-gold btn-md" onClick={cta('custom', 'quote')}>Get a custom quote</Link>
              </div>
            </article>
          </div>
          <ul className="ticks pricing-trust">
            {['Free, no-obligation demo before you buy', 'All 30+ features in every plan', 'Talk to a real person — call or WhatsApp'].map((t) => (
              <li key={t}><Check size={18} color="#0B6B52" />{t}</li>
            ))}
          </ul>
          <p className="fine-print">All prices are billed annually. A one-time setup fee of ₹20,000 applies in the first year. {SITE.taxNote}</p>
        </div>
      </section>

      <section className="container-wide platform-strip" aria-label="What every plan supports">
        <ul className="platforms">
          {PLATFORMS.map(([Icon, a, b], i) => (
            <li key={a + b} className="platform" data-reveal="" style={{ '--d': i }}>
              <Icon size={32} color="#0B6B52" />
              <div><div className="platform-name">{a}</div><div className="platform-sub">{b}</div></div>
            </li>
          ))}
        </ul>
      </section>

      <Testimonials title="Businesses like yours run on DhagaBook" cta={false} />

      <section className="section faq-section" aria-labelledby="faq-title">
        <div className="container faq-inner">
          <div className="section-head center" data-reveal="">
            <h2 id="faq-title" className="h2">Questions about pricing</h2>
            <p className="lead">
              Still unsure? Call us on{' '}
              <a href={`tel:${SITE.phoneIntl}`} onClick={() => track('call_click', { location: 'faq' })}>{SITE.phone}</a>.
            </p>
          </div>
          <div className="faq">
            {PRICING_FAQ.map((f) => (
              <details key={f.q} className="faq-item">
                <summary>{f.q}<Plus size={20} color="#0B6B52" /></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
