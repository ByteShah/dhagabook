import { Link } from 'react-router-dom';
import { Check, Cross, Arrow, Box, Truck, People, Factory, Globe, Ledger } from '../components/Icons.jsx';
import { LogoMark } from '../components/Logo.jsx';
import { Eyebrow, Jaali, Mandala, Lotus, Thread } from '../components/Bits.jsx';
import Sutra from '../components/Sutra.jsx';
import LiveActivity from '../components/LiveActivity.jsx';
import Bhasha from '../components/Bhasha.jsx';
import Testimonials from '../components/Testimonials.jsx';
import { track } from '../analytics.js';

const INDUSTRIES = ['Textiles & garments', 'Retail stores', 'Wholesalers & distributors', 'Manufacturers', 'Service businesses'];

const INDIA_POINTS = [
  ['GST-ready from day one', 'Compliant invoices and GST reports, without extra software.'],
  ['Rupee-first accounting', 'Amounts in lakhs and crores, exactly the way you read them.'],
  ['Every shop and godown', 'Run multiple companies and locations from a single login.'],
  ['On your phone, anywhere', 'Check sales and dues from the shop floor or on the move.'],
];

const PLACES = [
  ['mandir', 'Mandir'],
  ['masjid', 'Masjid'],
  ['church', 'Church'],
  ['gurudwara', 'Gurudwara'],
  ['stupa', 'Stupa'],
  ['jain-derasar', 'Jain Derasar'],
  ['agiary', 'Agiary'],
];

const OLD_WAY = [
  'Bills written by hand or in separate software',
  'Dues tracked in registers and diaries',
  'Stock counted manually at each godown',
  'Attendance and salaries in spreadsheets',
  'No clear view of the business when you are away',
];

const NEW_WAY = [
  'GST-ready invoices created and shared in seconds',
  'Every receivable and payable tracked automatically',
  'Live stock across all locations, with low-stock alerts',
  'Attendance, leave and payroll in one place',
  'Your whole business on your phone, anywhere',
];

const STEPS = [
  ['Book a free demo', 'We walk you through DhagaBook using examples from your type of business.'],
  ['Choose your plan', 'Pick Web or Web + App — both include every feature and five users.'],
  ['Run your business', 'Manage sales, stock, accounts and staff from the office or on the move.'],
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero bg-cream">
        <Jaali id="jaaliHero" color="#E7DFCF" size={36} opacity={0.55} />
        <div className="hero-glow" aria-hidden="true" />
        <Mandala className="hero-mandala" />
        <div className="container hero-inner">
          <p className="pill-badge">
            <span className="pill-badge__hi deva" lang="hi">भारत के लिए</span>
            Business software built for India
          </p>
          <h1 className="hero-title">
            Run your entire business from{' '}
            <span className="accent accent-thread">one simple app<Thread /></span>
          </h1>
          <p className="lead hero-lead">
            Billing, receivables, inventory, purchasing, payroll and accounting — connected in one platform for Indian
            businesses, from neighbourhood stores to growing manufacturers.
          </p>
          <div className="btn-row">
            <Link to="/contact" className="btn btn-primary btn-lg" onClick={() => track('cta_click', { cta: 'hero_demo' })}>
              Book a free demo <Arrow size={18} />
            </Link>
            <Link to="/pricing" className="btn btn-ghost btn-lg" onClick={() => track('cta_click', { cta: 'hero_pricing' })}>
              View pricing
            </Link>
          </div>
          <ul className="ticks" aria-label="Highlights">
            {[['GST-ready', ' invoicing'], ['Mobile', ' and web'], ['5 users', ' included']].map(([t, more]) => (
              <li key={t}><Check size={18} color="#0B6B52" />{t}<span className="hide-sm">{more}</span></li>
            ))}
          </ul>

          <div className="product-visual">
            <div className="product-arch" aria-hidden="true" />
            <div className="browser">
              <div className="browser-bar" aria-hidden="true">
                <span className="dot dot-r" /><span className="dot dot-y" /><span className="dot dot-g" />
                <span className="browser-url" />
              </div>
              <img
                src="/images/dhagabook-web-app.webp"
                width="1600"
                height="839"
                fetchPriority="high"
                alt="DhagaBook web application home screen with app groups for supply chain, finance, sales, websites and productivity"
              />
            </div>
            <div className="phone-frame">
              <img
                src="/images/dhagabook-mobile-app.webp"
                width="540"
                height="1105"
                alt="DhagaBook mobile dashboard showing sales, purchases, amounts to receive and to pay"
              />
            </div>
            <LiveActivity />
            <div className="float-card float-card--b" aria-hidden="true">
              <span className="float-icon bg-sand"><Box size={20} color="#A35A00" width={2} /></span>
              <span className="float-text"><b>Low stock alert</b><span>Cotton kurta · 12 left</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* Built for */}
      <section className="built-for" aria-labelledby="built-for-label">
        <div className="container built-for-inner">
          <h2 id="built-for-label" className="built-for-label">Built for</h2>
          <div className="marquee">
            <div className="marquee-track">
              <ul className="chip-list">
                {INDUSTRIES.map((i) => <li key={i} className="chip"><span className="chip-dot" aria-hidden="true" />{i}</li>)}
              </ul>
              <ul className="chip-list" aria-hidden="true">
                {INDUSTRIES.map((i) => <li key={i} className="chip"><span className="chip-dot" />{i}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Try it yourself: interactive GST invoice */}
      <Bhasha />

      {/* Features bento */}
      <section className="section section-lg bg-cream section-orn">
        <div className="container stack-56">
          <div className="section-head" data-reveal="">
            <Eyebrow>Features</Eyebrow>
            <h2 className="h2">Everything your business needs, working together</h2>
            <p className="lead">Every sale updates your stock, and every bill updates your accounts. No more juggling registers, spreadsheets and separate apps.</p>
          </div>
          <div className="bento">
            <article data-reveal="" className="card bento-wide bento-billing">
              <div className="bento-copy">
                <span className="kicker">Sales and billing</span>
                <h3 className="h3-lg">GST-ready invoices in seconds</h3>
                <p className="muted">Turn a quotation into a sales order and an invoice without entering anything twice, then share it instantly.</p>
              </div>
              <div className="invoice-wrap" aria-hidden="true">
                <div className="invoice">
                  <div className="invoice-head"><span>TAX INVOICE</span><span>#INV-2048</span></div>
                  <div className="invoice-body">
                    <div className="row"><span>Cotton fabric · 40 m</span><b>₹12,000</b></div>
                    <div className="row"><span>Silk dupatta · 10 pcs</span><b>₹5,600</b></div>
                    <div className="row"><span>GST (5%)</span><b>₹880</b></div>
                    <div className="row row-total"><span className="tag-paid">Paid</span><b>₹18,480</b></div>
                  </div>
                </div>
              </div>
            </article>

            <article data-reveal="" className="card bento-third">
              <span className="kicker">Receivables</span>
              <h3 className="h3">Know who owes you, and when</h3>
              <p className="muted">Aged receivables, payables and timely payment follow-ups.</p>
              <div className="aging" aria-hidden="true">
                {[['0–30 days', '₹4,20,000', 78, '#0B6B52'], ['31–60 days', '₹1,85,000', 42, '#E8891C'], ['60+ days', '₹62,000', 16, '#C2453A']].map(([l, v, w, c]) => (
                  <div key={l} className="aging-row">
                    <div className="row"><span>{l}</span><b>{v}</b></div>
                    <div className="bar"><div style={{ width: `${w}%`, background: c }} /></div>
                  </div>
                ))}
              </div>
            </article>

            <article data-reveal="" className="card bento-third">
              <span className="kicker">Inventory</span>
              <h3 className="h3">Real-time stock in every warehouse</h3>
              <p className="muted">Multi-location stock, barcode scanning and low-stock alerts.</p>
              <div className="stock-list" aria-hidden="true">
                <div className="stock-row"><span>Surat warehouse</span><b>1,240 pcs</b></div>
                <div className="stock-row"><span>Delhi showroom</span><b>386 pcs</b></div>
                <div className="stock-row stock-row--low"><span>Chennai branch</span><b>12 pcs · Low</b></div>
              </div>
            </article>

            <article data-reveal="" className="card bento-third">
              <span className="icon-tile"><Truck size={24} color="#0B6B52" width={1.9} /></span>
              <h3 className="h3-sm">Purchase and vendors</h3>
              <p className="muted">Purchase orders, vendor bills and supplier records in one place.</p>
            </article>

            <article data-reveal="" className="card bento-third">
              <span className="icon-tile"><People size={24} color="#0B6B52" width={1.9} /></span>
              <h3 className="h3-sm">Attendance and payroll</h3>
              <p className="muted">Attendance, leave and salaries for your whole team — no paper registers.</p>
            </article>

            <article data-reveal="" className="card bento-third">
              <span className="icon-tile"><Factory size={24} color="#0B6B52" width={1.9} /></span>
              <h3 className="h3-sm">Manufacturing</h3>
              <p className="muted">Plan production and manage bills of materials with stock updated automatically.</p>
            </article>

            <article data-reveal="" className="card card-green bento-wide bento-more">
              <Mandala className="card-mandala" />
              <span className="icon-tile icon-tile--green"><Globe size={24} color="#FFFFFF" width={1.9} /></span>
              <h3 className="h3-sm">And 30+ more features</h3>
              <p>CRM, website and ecommerce, projects, calendar, multi-company accounting and more.</p>
              <Link to="/features" className="text-link-light">
                Explore all features <Arrow size={16} />
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* Every module, one thread */}
      <Sutra />

      {/* Made for India */}
      <section className="section section-lg">
        <div className="container india">
          <div className="india-copy" data-reveal="">
            <span className="deva-eyebrow" lang="hi">अनेकता में एकता</span>
            <h2 className="h2">Made for the way India does business</h2>
            <Lotus className="lotus-left" />
            <p className="lead">From a family-run textile shop in Surat to a growing distributor in Guwahati, DhagaBook adapts to how you trade — in every region and every community.</p>
          </div>
          <div className="india-grid">
            {INDIA_POINTS.map(([t, d], i) => (
              <div key={t} className="outline-card india-card" data-reveal="" style={{ '--d': i }}>
                <span className="india-num" aria-hidden="true">0{i + 1}</span>
                <h3 className="h3-xs">{t}</h3>
                <p className="muted">{d}</p>
              </div>
            ))}
          </div>
          <div className="faiths" data-reveal="">
            <p className="faiths-title">Respecting every faith. Serving every business.</p>
            <ul className="faiths-grid">
              {PLACES.map(([f, n]) => (
                <li key={f} className="faith">
                  <img src={`/images/places/${f}.svg`} alt="" width="72" height="72" loading="lazy" decoding="async" />
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Before / after */}
      <section className="section section-lg bg-cream">
        <div className="container stack-48">
          <div className="section-head center" data-reveal="">
            <span className="deva-eyebrow" lang="hi">बही-खाते से आगे</span>
            <h2 className="h2">From registers to real-time</h2>
            <Lotus />
            <p className="lead">See what changes when your entire business runs on one connected system.</p>
          </div>
          <div className="compare">
            <div className="card compare-card compare-card--old" data-reveal="">
              <div className="compare-head">
                <span className="icon-tile icon-tile--sm bg-rose"><Ledger size={22} color="#B5473C" width={1.9} /></span>
                <h3 className="h3">The old way</h3>
              </div>
              <ul className="compare-list">
                {OLD_WAY.map((t) => <li key={t}><Cross size={20} color="#B5473C" />{t}</li>)}
              </ul>
            </div>
            <div className="card card-green compare-card compare-card--new" data-reveal="" style={{ '--d': 1 }}>
              <Mandala className="card-mandala" />
              <div className="compare-head">
                <span className="icon-tile icon-tile--sm icon-tile--green"><LogoMark width={22} height={20} solid="#FFFFFF" /></span>
                <h3 className="h3">With DhagaBook</h3>
              </div>
              <ul className="compare-list">
                {NEW_WAY.map((t) => <li key={t}><Check size={20} color="#7FD3AE" />{t}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section section-lg">
        <div className="container stack-48">
          <div className="section-head center" data-reveal="">
            <Eyebrow both>How it works</Eyebrow>
            <h2 className="h2">Get started in three simple steps</h2>
          </div>
          <ol className="steps">
            {STEPS.map(([t, d], i) => (
              <li key={t} className="outline-card step" data-reveal="" style={{ '--d': i }}>
                <span className="step-medal" aria-hidden="true">
                  <span className="step-num">0{i + 1}</span>
                </span>
                <h3 className="h3-sm">{t}</h3>
                <p className="muted">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Customer reviews */}
      <Testimonials className="bg-cream" />

      {/* Pricing teaser */}
      <section className="pricing-teaser-wrap">
        <div className="container">
          <div className="pricing-teaser" data-reveal="">
            <Mandala className="teaser-mandala" />
            <div className="pricing-teaser-copy">
              <span className="kicker">Pricing</span>
              <h2 className="h2-sm">Simple, transparent yearly pricing</h2>
              <p className="muted lead-sm">Plans start at ₹39,999 per year + GST — less than ₹110 a day for your entire business.</p>
            </div>
            <div className="teaser-plans">
              <Link to="/pricing" className="teaser-plan" onClick={() => track('cta_click', { cta: 'teaser_web' })}>
                <span className="teaser-plan-name">Web</span>
                <span className="teaser-plan-price"><s className="teaser-plan-was" aria-label="Was ₹49,999">₹49,999</s>₹39,999</span>
                <span className="teaser-plan-per">per year + GST</span>
              </Link>
              <Link to="/pricing" className="teaser-plan teaser-plan--green" onClick={() => track('cta_click', { cta: 'teaser_web_app' })}>
                <span className="teaser-plan-name">Web + App</span>
                <span className="teaser-plan-price"><s className="teaser-plan-was" aria-label="Was ₹59,999">₹59,999</s>₹49,999</span>
                <span className="teaser-plan-per">per year + GST</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <Jaali id="jaaliCta" color="#2C7562" size={40} opacity={0.35} />
        <Mandala className="cta-mandala" />
        <div className="final-cta-inner" data-reveal="">
          <span className="diya" aria-hidden="true"><span className="diya-flame" /></span>
          <span className="deva-eyebrow deva-eyebrow--gold" lang="hi">आपका व्यापार, आपके हाथ में</span>
          <h2 className="h2-xl">Take control of your business today</h2>
          <p className="lead lead-light">Book a free, personalised demo and see how DhagaBook fits the way you work.</p>
          <Link to="/contact" className="btn btn-gold btn-lg" onClick={() => track('cta_click', { cta: 'final_demo' })}>
            Book a free demo
          </Link>
        </div>
        <img className="skyline" src="/images/skyline.svg" alt="" width="1440" height="300" loading="lazy" decoding="async" />
      </section>
    </>
  );
}
