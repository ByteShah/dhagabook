import { useEffect, useRef, useState } from 'react';
import { Cart, Chart, Monitor, Truck, Box, Barcode, Bell, Gear, Layers, Invoice, Building, People, Clipboard, Calendar } from '../components/Icons.jsx';
import { DemoBand, Mandala, Lotus } from '../components/Bits.jsx';

const TONES = {
  sand: ['#FFF1DC', '#B25E00'],
  mint: ['#E3F6EC', '#0B6B52'],
  sky: ['#E3F0FF', '#1F5FBF'],
};

const GROUPS = [
  {
    id: 'sales', nav: 'Sales', label: '01 · Sales', color: '#B25E00', Icon: Cart,
    title: 'Win customers and get paid faster',
    text: 'Leads, quotes, invoices and online orders flow into one pipeline.',
    items: [
      ['Sales & Billing', Cart, 'sand', ['Quotations and sales orders', 'GST invoices', 'Customer payments']],
      ['CRM', Chart, 'mint', ['Lead capture and pipeline', 'Follow-up reminders', 'Customer history']],
      ['Website & Ecommerce', Monitor, 'sky', ['Business website', 'Online store', 'Online orders into sales']],
    ],
  },
  {
    id: 'inventory', nav: 'Purchase & inventory', label: '02 · Purchase & inventory', color: '#0B6B52', Icon: Box,
    title: 'Know exactly what you have, and where',
    text: 'Purchasing, warehouses and barcodes stay in sync with every sale.',
    items: [
      ['Purchase & Vendors', Truck, 'sand', ['Purchase orders', 'Vendor bills', 'Supplier records']],
      ['Stock & Warehouse', Box, 'mint', ['Multi-location inventory', 'Stock transfers', 'Live stock levels']],
      ['Barcode & Packaging', Barcode, 'sky', ['Barcode scanning', 'Picking and packing', 'Faster dispatch']],
      ['Low-Stock Alerts', Bell, 'sand', ['Reorder alerts', 'Product availability check']],
    ],
  },
  {
    id: 'manufacturing', nav: 'Manufacturing', label: '03 · Manufacturing', color: '#0B6B52', Icon: Gear,
    title: 'Plan production with confidence',
    text: 'Raw materials and finished goods update stock automatically.',
    items: [
      ['Production', Gear, 'mint', ['Manufacturing orders', 'Material consumption']],
      ['Bill of Materials', Layers, 'mint', ['Multi-level BOM', 'Component costing']],
    ],
  },
  {
    id: 'accounting', nav: 'Accounting', label: '04 · Accounting', color: '#0B6B52', Icon: Invoice,
    title: 'Books that keep themselves up to date',
    text: 'Every invoice and bill posts to accounts, with GST handled.',
    items: [
      ['Accounting & GST', Invoice, 'mint', ['Aged receivables', 'Aged payables', 'Payment follow-ups', 'GST reports']],
      ['Multi-Company & Intercompany', Building, 'sky', ['Multiple companies, one login', 'Intercompany transactions']],
    ],
  },
  {
    id: 'people', nav: 'People & projects', label: '05 · People & projects', color: '#1F5FBF', Icon: People,
    title: 'Keep your team organised',
    text: 'HR, projects and schedules live next to the work they support.',
    items: [
      ['Employees', People, 'mint', ['Attendance', 'Leave management', 'Payroll']],
      ['Projects & Tasks', Clipboard, 'sky', ['Task assignment', 'Deadlines and stages']],
      ['Calendar', Calendar, 'sand', ['Meetings', 'Tasks', 'Events']],
    ],
  },
];

// Small illustrative previews, one per chapter. Decorative only.
function Preview({ id }) {
  if (id === 'sales') {
    return (
      <div className="pv pv-flow">
        {['Lead', 'Quote', 'Order', 'Invoice'].map((s, i) => (
          <span key={s} className="pv-stage" style={{ '--i': i }}>{s}</span>
        ))}
        <div className="pv-total"><span>INV-2048 · GST 5%</span><b>₹18,480</b><em>Paid</em></div>
      </div>
    );
  }
  if (id === 'inventory') {
    return (
      <div className="pv pv-stock">
        {[['Surat warehouse', 82, '1,240 pcs'], ['Delhi showroom', 46, '386 pcs'], ['Chennai branch', 8, '12 pcs · Low']].map(([n, w, v], i) => (
          <div key={n} className={`pv-bar${w < 10 ? ' is-low' : ''}`}>
            <div className="pv-bar-top"><span>{n}</span><b>{v}</b></div>
            <div className="pv-track"><i style={{ '--w': `${w}%`, '--i': i }} /></div>
          </div>
        ))}
      </div>
    );
  }
  if (id === 'manufacturing') {
    return (
      <div className="pv pv-bom">
        <div className="pv-bom-root">Cotton kurta · BOM</div>
        <ul>
          {[['Cotton fabric', '2.5 m'], ['Thread', '1 spool'], ['Buttons', '6 pcs'], ['Label & pack', '1 set']].map(([n, q], i) => (
            <li key={n} style={{ '--i': i }}><span>{n}</span><b>{q}</b></li>
          ))}
        </ul>
      </div>
    );
  }
  if (id === 'accounting') {
    return (
      <div className="pv pv-ledger">
        {[['To receive', '₹4,20,000', 'in'], ['To pay', '₹1,85,000', 'out'], ['GST this month', '₹38,400', 'tax']].map(([n, v, t], i) => (
          <div key={n} className={`pv-ledger-row is-${t}`} style={{ '--i': i }}><span>{n}</span><b>{v}</b></div>
        ))}
      </div>
    );
  }
  const week = ['M', 'T', 'W', 'T', 'F', 'S'];
  const rows = [['Asha', 'PPPPPP'], ['Ravi', 'PPLPPP'], ['Imran', 'PPPAPP'], ['Neha', 'PPPPLP']];
  return (
    <div className="pv pv-attend">
      <div className="pv-attend-row pv-attend-head"><span />{week.map((d, i) => <span key={i}>{d}</span>)}</div>
      {rows.map(([n, days], r) => (
        <div key={n} className="pv-attend-row">
          <span>{n}</span>
          {[...days].map((d, i) => <i key={i} className={`is-${d}`} style={{ '--i': r * 6 + i }} />)}
        </div>
      ))}
    </div>
  );
}

export default function Features() {
  const [active, setActive] = useState(GROUPS[0].id);
  const barRef = useRef(null);

  // Highlight the chapter currently in view.
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    GROUPS.forEach((g) => { const el = document.getElementById(g.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  // Keep the active tab visible in the scrollable bar on phones.
  useEffect(() => {
    const bar = barRef.current;
    const el = bar?.querySelector(`[data-id="${active}"]`);
    if (bar && el && bar.scrollWidth > bar.clientWidth) {
      bar.scrollTo({ left: el.offsetLeft - (bar.clientWidth - el.offsetWidth) / 2, behavior: 'smooth' });
    }
  }, [active]);

  const idx = GROUPS.findIndex((g) => g.id === active);

  return (
    <>
      <section className="bg-cream page-hero-wrap fx-hero">
        <Mandala className="page-mandala" />
        <div className="page-hero">
          <span className="pill">30+ features, one platform</span>
          <h1 className="h1">Everything your business runs on, <span className="accent">connected</span></h1>
          <Lotus />
          <p className="lead">From the first enquiry to the final payment — sales, purchasing, inventory, manufacturing, accounting and your team, all in DhagaBook.</p>
        </div>
        <nav aria-label="Feature groups" className="container gateways">
          {GROUPS.map((g, i) => (
            <a key={g.id} href={`#${g.id}`} className="gateway" style={{ '--d': i }}>
              <span className="gateway-num" aria-hidden="true">0{i + 1}</span>
              <span className="gateway-icon"><g.Icon size={26} width={1.8} /></span>
              <span className="gateway-name">{g.nav}</span>
              <span className="gateway-count">{g.items.length} modules</span>
            </a>
          ))}
        </nav>
      </section>

      <div className="chapter-bar">
        <div className="container chapter-bar-inner">
          <div className="chapter-tabs" ref={barRef}>
            {GROUPS.map((g, i) => (
              <a key={g.id} href={`#${g.id}`} data-id={g.id} className={`chapter-tab${g.id === active ? ' is-active' : ''}`} aria-current={g.id === active ? 'true' : undefined}>
                <span aria-hidden="true">0{i + 1}</span>{g.nav}
              </a>
            ))}
          </div>
          <span className="chapter-progress" aria-hidden="true"><i style={{ width: `${((idx + 1) / GROUPS.length) * 100}%` }} /></span>
        </div>
      </div>

      <div className="container-wide journey">
        {GROUPS.map((g, gi) => (
          <section key={g.id} id={g.id} className={`chapter${gi % 2 ? ' chapter--alt' : ''}${g.id === active ? ' is-active' : ''}`} aria-labelledby={`${g.id}-title`}>
            <span className="chapter-knot" aria-hidden="true">0{gi + 1}</span>

            <div className="chapter-panel" data-reveal="">
              <span className="group-label" style={{ color: gi % 2 ? undefined : g.color }}>{g.label}</span>
              <h2 id={`${g.id}-title`} className="h2-md">{g.title}</h2>
              <p className="lead-sm chapter-text">{g.text}</p>
              <div className="chapter-preview" aria-hidden="true"><Preview id={g.id} /></div>
            </div>

            <ol className="chapter-features beads">
              {g.items.map(([name, Icon, tone, bullets], i) => (
                <li key={name} className="bead" data-reveal="" style={{ '--d': i }}>
                  <span className="bead-medal" style={{ '--tone-bg': TONES[tone][0], '--tone-fg': TONES[tone][1] }}>
                    <Icon size={24} />
                  </span>
                  <div className="bead-body">
                    <span className="bead-num" aria-hidden="true">{String(gi + 1).padStart(2, '0')}.{i + 1}</span>
                    <h3 className="bead-name">{name}</h3>
                    <ul className="bead-points">{bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      <DemoBand title="See DhagaBook in action for your business" text="A free walkthrough tailored to your industry." />
    </>
  );
}
