import { useEffect, useRef, useState } from 'react';
import { Cart, Chart, Monitor, Truck, Box, Barcode, Bell, Gear, Layers, Invoice, Building, People, Clipboard, Calendar, Chat, Tag, Bag, Percent, Bank, Lock, Send, Mobile, Ledger } from '../components/Icons.jsx';
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
      ['Point of Sale', Monitor, 'mint', ['Fast counter billing', 'Barcode scanning at the counter', 'Receipts on WhatsApp']],
      ['Agent Commission', Percent, 'sand', ['Agent on every customer and order', 'Commission % by customer, category or product', 'Earned only when the customer pays', 'Agent statements and payouts']],
    ],
  },
  {
    id: 'textile', nav: 'Textile & garments', label: '02 · Textile & garments', color: '#B25E00', Icon: Tag,
    title: 'Built for how textile is really sold',
    text: 'Designs, sets, bundles and bags — the way wholesalers and manufacturers actually trade.',
    items: [
      ['Bundle Builder', Layers, 'sand', ['Enter a design once: pieces, colours, sizes', 'Every piece gets its own barcode', 'Sets and bundles created for you']],
      ['Bags & Racks', Bag, 'mint', ['One bag = one packed bundle', 'Bags in stock, free and to pack', 'Scan bags on dispatch', 'Rack-wise storage and counts']],
      ['Piece & Bag Labels', Tag, 'sky', ['Design, colour / size and barcode', 'Coded prices on the label', 'Bag labels with bundle and rack']],
      ['Customer Price Lists', Ledger, 'sand', ['Separate rates per customer or party', 'Prices pick up on every order', 'HSN and GST set per category']],
      ['Dispatch Details', Truck, 'mint', ['LR number and transport', 'Parcels and sets', 'Printed on the bill']],
    ],
  },
  {
    id: 'inventory', nav: 'Purchase & inventory', label: '03 · Purchase & inventory', color: '#0B6B52', Icon: Box,
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
    id: 'manufacturing', nav: 'Manufacturing', label: '04 · Manufacturing', color: '#0B6B52', Icon: Gear,
    title: 'Plan production with confidence',
    text: 'Raw materials and finished goods update stock automatically.',
    items: [
      ['Production', Gear, 'mint', ['Manufacturing orders', 'Material consumption']],
      ['Bill of Materials', Layers, 'mint', ['Multi-level BOM', 'Component costing']],
    ],
  },
  {
    id: 'accounting', nav: 'Accounting', label: '05 · Accounting', color: '#0B6B52', Icon: Invoice,
    title: 'Books that keep themselves up to date',
    text: 'Every invoice and bill posts to accounts, with GST handled.',
    items: [
      ['Accounting & GST', Invoice, 'mint', ['Aged receivables', 'Aged payables', 'Payment follow-ups', 'GST reports']],
      ['Payments & Bank', Bank, 'sand', ['Receive payment against oldest bills first', 'Kasar / vatav deductions and advances', 'Bank reconciliation']],
      ['Reports & Ledgers', Ledger, 'mint', ['Party ledger and statements', 'Cash book and day book', 'P&L, balance sheet, trial balance']],
      ['Multi-Company & Intercompany', Building, 'sky', ['Multiple companies, one login', 'Intercompany transactions', 'Own document numbers per company']],
    ],
  },
  {
    id: 'whatsapp', nav: 'WhatsApp', label: '06 · WhatsApp', color: '#0B6B52', Icon: Chat,
    title: 'Your business, on WhatsApp',
    text: 'Official WhatsApp Business API, connected to every sale, bill and delivery. Message charges are set and billed by Meta.',
    items: [
      ['Documents on WhatsApp', Send, 'mint', ['Quotations, orders and invoices', 'Payment receipts', 'Dispatch alert with tracking link']],
      ['Reminders & Payment Links', Bell, 'sand', ['Automatic payment reminders', 'UPI / online payment links', 'Meeting reminders']],
      ['Catalog & Orders', Bag, 'sky', ['Product catalog synced to WhatsApp', 'Product showcases and offers', 'Orders from WhatsApp into sales']],
      ['Chats & Campaigns', Chat, 'mint', ['Two-way chat with customers', 'Reply buttons and lists', 'Approved broadcast templates']],
    ],
  },
  {
    id: 'mobile', nav: 'Mobile app', label: '07 · Mobile app', color: '#1F5FBF', Icon: Mobile,
    title: 'Run the business from your phone',
    text: 'The DhagaBook app for Android and iOS, included in the Web + App plan.',
    items: [
      ['Owner Dashboard', Chart, 'sky', ['Today’s sales and collections', 'Dues and overdue parties', 'Stock at a glance']],
      ['Scan & Count', Barcode, 'mint', ['Scan barcodes with the camera', 'Stock counts in the godown', 'Pick and dispatch orders']],
      ['Works on Weak Internet', Send, 'sand', ['Entries saved on the phone', 'Sent automatically once online']],
      ['Safe Sign-in', Lock, 'sky', ['Fingerprint / face unlock', 'Each phone approved separately', 'Lost phone? Sign it out remotely']],
    ],
  },
  {
    id: 'people', nav: 'People & projects', label: '08 · People & projects', color: '#1F5FBF', Icon: People,
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
  if (id === 'textile') {
    return (
      <div className="pv pv-bundle">
        <div className="pv-bundle-head"><span>Design 4521 · Kurta set</span><b>3 pcs / set</b></div>
        <div className="pv-chips">
          {['M', 'L', 'XL', 'XXL'].map((z, i) => <span key={z} style={{ '--i': i }}>{z}</span>)}
          {['#B03A48', '#1F5FBF', '#0B6B52'].map((c, i) => <i key={c} style={{ background: c, '--i': i + 4 }} />)}
        </div>
        <div className="pv-bags">
          {[['Bag 12', 'Rack A2'], ['Bag 13', 'Rack A2'], ['Bag 14', 'To pack']].map(([b, r], i) => (
            <div key={b} className={`pv-bag${r === 'To pack' ? ' is-todo' : ''}`} style={{ '--i': i }}><b>{b}</b><span>{r}</span></div>
          ))}
        </div>
      </div>
    );
  }
  if (id === 'whatsapp') {
    return (
      <div className="pv pv-wa">
        <div className="pv-wa-msg" style={{ '--i': 0 }}>Invoice INV-2048 · ₹18,480<small>PDF attached</small></div>
        <div className="pv-wa-msg" style={{ '--i': 1 }}>Payment due on 30 Nov<span className="pv-wa-btn">Pay now</span></div>
        <div className="pv-wa-msg is-in" style={{ '--i': 2 }}>Thank you, paid ✅</div>
      </div>
    );
  }
  if (id === 'mobile') {
    return (
      <div className="pv pv-mob">
        {[['Today’s sale', '₹1,24,500'], ['Collected', '₹86,200'], ['Overdue', '₹62,000']].map(([n, v], i) => (
          <div key={n} className={`pv-mob-tile${i === 2 ? ' is-due' : ''}`} style={{ '--i': i }}><span>{n}</span><b>{v}</b></div>
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
          <p className="lead">From the first enquiry to the final payment — sales, textile bundles, inventory, manufacturing, accounting, WhatsApp and your team, all in DhagaBook.</p>
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
