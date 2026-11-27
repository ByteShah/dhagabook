import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cart, Box, Truck, Invoice, People, Factory, Chart, Monitor, Arrow, Chat } from './Icons.jsx';
import { LogoMark } from './Logo.jsx';
import { Mandala } from './Bits.jsx';
import { track } from '../analytics.js';

// "Ek sutra mein" — every module tied to DhagaBook by one thread.
const MODULES = [
  { id: 'sales', name: 'Sales & Billing', Icon: Cart, text: 'GST invoices, quotations and customer payments, shared in seconds.', links: ['stock', 'accounts', 'crm'] },
  { id: 'stock', name: 'Stock & Warehouse', Icon: Box, text: 'Live stock across every godown, with barcode scanning and low-stock alerts.', links: ['sales', 'purchase', 'mfg'] },
  { id: 'purchase', name: 'Purchase & Vendors', Icon: Truck, text: 'Purchase orders, vendor bills and supplier records in one place.', links: ['stock', 'accounts'] },
  { id: 'accounts', name: 'Accounting & GST', Icon: Invoice, text: 'Every invoice and bill posts to your accounts, with GST reports ready.', links: ['sales', 'purchase', 'hr'] },
  { id: 'hr', name: 'Employees & Payroll', Icon: People, text: 'Attendance, leave and salaries for your whole team.', links: ['accounts'] },
  { id: 'mfg', name: 'Manufacturing', Icon: Factory, text: 'Production and bills of materials that update stock automatically.', links: ['stock', 'purchase'] },
  { id: 'crm', name: 'CRM', Icon: Chart, text: 'Leads, follow-up reminders and complete customer history.', links: ['sales', 'web'] },
  { id: 'wa', name: 'WhatsApp', Icon: Chat, text: 'Invoices, payment reminders, catalog and orders on WhatsApp.', links: ['sales', 'accounts', 'crm'] },
  { id: 'web', name: 'Website & Ecommerce', Icon: Monitor, text: 'Your online store, with orders flowing straight into sales.', links: ['sales', 'stock'] },
];

const R = 39; // node ring radius, % of the wheel
const POS = Object.fromEntries(
  MODULES.map((m, i) => {
    const a = ((360 / MODULES.length) * i - 90) * (Math.PI / 180);
    return [m.id, { x: +(50 + R * Math.cos(a)).toFixed(3), y: +(50 + R * Math.sin(a)).toFixed(3) }];
  })
);
const byId = Object.fromEntries(MODULES.map((m) => [m.id, m]));

export default function Sutra() {
  const [active, setActive] = useState('sales');
  const [auto, setAuto] = useState(true);

  // Gently tour the modules until the visitor picks one (never with reduced motion).
  useEffect(() => {
    if (!auto || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = setInterval(() => {
      setActive((cur) => MODULES[(MODULES.findIndex((m) => m.id === cur) + 1) % MODULES.length].id);
    }, 2800);
    return () => clearInterval(t);
  }, [auto]);

  const pick = (id) => {
    setAuto(false);
    setActive(id);
  };
  const cur = byId[active];
  const linked = new Set(cur.links);

  return (
    <section className="section section-lg sutra" aria-labelledby="sutra-title">
      <div className="container sutra-inner">
        <div className="sutra-copy" data-reveal="">
          <span className="deva-eyebrow" lang="hi">एक सूत्र में</span>
          <h2 id="sutra-title" className="h2">Every part of your business, <span className="accent">tied by one thread</span></h2>
          <p className="lead">
            “Dhaga” means thread. Every sale, bill and salary in DhagaBook travels along it — so one entry updates
            everything it touches. Pick a module to see what it connects to.
          </p>

          <div className="sutra-detail" aria-live="polite">
            <span className="sutra-detail-icon"><cur.Icon size={24} color="#0B6B52" width={1.9} /></span>
            <div>
              <h3 className="h3-sm">{cur.name}</h3>
              <p className="muted">{cur.text}</p>
              <p className="sutra-flows">
                <span>Connected to</span>
                {cur.links.map((l) => (
                  <button key={l} type="button" className="sutra-chip" onClick={() => pick(l)}>{byId[l].name}</button>
                ))}
              </p>
            </div>
          </div>

          <Link to="/features" className="btn btn-primary btn-md sutra-cta" onClick={() => track('cta_click', { cta: 'sutra_features' })}>
            Explore all 30+ features <Arrow size={16} />
          </Link>
        </div>

        {/* Phones: a simple tap grid instead of the wheel */}
        <ul className="sutra-grid" aria-label="DhagaBook modules">
          {MODULES.map((m) => (
            <li key={m.id}>
              <button
                type="button"
                className={`sutra-tile${m.id === active ? ' is-on' : ''}${linked.has(m.id) ? ' is-linked' : ''}`}
                aria-pressed={m.id === active}
                onClick={() => pick(m.id)}
              >
                <m.Icon size={18} width={1.9} />
                <span>{m.name}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="sutra-wheel-wrap" data-reveal="" style={{ '--d': 1 }}>
          <div className="sutra-wheel">
            <Mandala className="sutra-mandala" />
            <svg className="sutra-threads" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
              {MODULES.map((m) => {
                const p = POS[m.id];
                const on = m.id === active;
                return (
                  <g key={m.id} className={`sutra-line${on ? ' is-on' : ''}${linked.has(m.id) ? ' is-linked' : ''}`}>
                    <line x1="50" y1="50" x2={p.x} y2={p.y} className="sutra-base" />
                    <line x1="50" y1="50" x2={p.x} y2={p.y} className="sutra-flow" />
                  </g>
                );
              })}
              {cur.links.map((l) => {
                const a = POS[active];
                const b = POS[l];
                // curve the chord through a point pulled toward the centre
                const cx = (a.x + b.x) / 2 + (50 - (a.x + b.x) / 2) * 0.55;
                const cy = (a.y + b.y) / 2 + (50 - (a.y + b.y) / 2) * 0.55;
                return <path key={`${active}-${l}`} className="sutra-chord" d={`M${a.x} ${a.y} Q${cx.toFixed(2)} ${cy.toFixed(2)} ${b.x} ${b.y}`} pathLength="1" />;
              })}
            </svg>

            <div className="sutra-core" aria-hidden="true">
              <LogoMark width={44} height={40} />
              <span>DhagaBook</span>
            </div>

            <ul className="sutra-nodes" aria-label="DhagaBook modules">
              {MODULES.map((m) => {
                const p = POS[m.id];
                const on = m.id === active;
                return (
                  <li key={m.id} style={{ left: `${p.x}%`, top: `${p.y}%` }}>
                    <button
                      type="button"
                      className={`sutra-node${on ? ' is-on' : ''}${linked.has(m.id) ? ' is-linked' : ''}`}
                      aria-pressed={on}
                      onClick={() => pick(m.id)}
                      onMouseEnter={() => pick(m.id)}
                      onFocus={() => pick(m.id)}
                    >
                      <span className="sutra-node-icon"><m.Icon size={22} width={1.9} /></span>
                      <span className="sutra-node-name">{m.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
