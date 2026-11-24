import { useEffect, useState } from 'react';
import { Invoice, Check, Truck, Ledger } from './Icons.jsx';

// Hero "live" card: cycles through moments a DhagaBook owner sees through the day.
const EVENTS = [
  { Icon: Invoice, title: 'Invoice shared', text: 'GST bill · ₹18,450', tone: 'bg-mint', color: '#0B6B52' },
  { Icon: Check, title: 'Payment received', text: '₹42,000 · UPI', tone: 'bg-mint', color: '#0B6B52' },
  { Icon: Truck, title: 'Stock transferred', text: 'Surat → Delhi · 120 pcs', tone: 'bg-sand', color: '#A35A00' },
  { Icon: Ledger, title: 'GST report ready', text: 'This month · 1 click', tone: 'bg-sand', color: '#A35A00' },
];

export default function LiveActivity() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = setInterval(() => setI((n) => (n + 1) % EVENTS.length), 3200);
    return () => clearInterval(t);
  }, []);
  const e = EVENTS[i];
  return (
    <div className="float-card float-card--a live-card" aria-hidden="true">
      <span className="live-dot" />
      <span key={i} className="live-swap">
        <span className={`float-icon ${e.tone}`}><e.Icon size={20} color={e.color} width={2} /></span>
        <span className="float-text"><b>{e.title}</b><span>{e.text}</span></span>
      </span>
    </div>
  );
}
