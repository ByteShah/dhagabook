import { Link } from 'react-router-dom';
import { track } from '../analytics.js';

// Small four-petal motif that replaces the plain eyebrow line.
function Bindu() {
  return (
    <svg className="eyebrow-mark" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
      <path d="M7 0.8 C8.6 4 10 5.4 13.2 7 C10 8.6 8.6 10 7 13.2 C5.4 10 4 8.6 0.8 7 C4 5.4 5.4 4 7 0.8Z" fill="currentColor" />
    </svg>
  );
}

export function Eyebrow({ children, both }) {
  return (
    <span className="eyebrow">
      <span className="eyebrow-line" aria-hidden="true" />
      <Bindu />
      {children}
      {both && <Bindu />}
      {both && <span className="eyebrow-line" aria-hidden="true" />}
    </span>
  );
}

// Decorative diamond lattice background used in the hero and final CTA.
export function Jaali({ id, color, size, opacity }) {
  const h = size / 2;
  const i = size / 9;
  return (
    <svg className="jaali" aria-hidden="true" focusable="false" style={{ opacity }}>
      <defs>
        <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse">
          <path d={`M${h} ${i} L${size - i} ${h} L${h} ${size - i} L${i} ${h} Z`} fill="none" stroke={color} strokeWidth="1.2" />
          <circle cx={h} cy={h} r="2" fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

// Rangoli / mandala, drawn from rings of petals. Purely decorative.
const C = 200;
const petal = (r, len, w) =>
  `M${C} ${C - r} C${C + w} ${C - r - len * 0.35} ${C + w * 0.6} ${C - r - len * 0.8} ${C} ${C - r - len} ` +
  `C${C - w * 0.6} ${C - r - len * 0.8} ${C - w} ${C - r - len * 0.35} ${C} ${C - r}Z`;

function Ring({ n, r, len, w, offset = 0 }) {
  const d = petal(r, len, w);
  return Array.from({ length: n }, (_, i) => (
    <path key={i} d={d} transform={`rotate(${(360 / n) * i + offset} ${C} ${C})`} />
  ));
}

function Dots({ n, r, size, offset = 0 }) {
  return Array.from({ length: n }, (_, i) => {
    const a = (((360 / n) * i + offset) * Math.PI) / 180;
    return <circle key={i} cx={(C + r * Math.sin(a)).toFixed(2)} cy={(C - r * Math.cos(a)).toFixed(2)} r={size} stroke="none" fill="currentColor" />;
  });
}

export function Mandala({ className = '' }) {
  return (
    <svg className={`mandala ${className}`} viewBox="0 0 400 400" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx={C} cy={C} r="14" />
      <Dots n={8} r={22} size={1.8} />
      <Ring n={8} r={28} len={46} w={17} />
      <Ring n={8} r={34} len={30} w={9} offset={22.5} />
      <circle cx={C} cy={C} r="80" />
      <circle cx={C} cy={C} r="86" strokeDasharray="2 5" />
      <Ring n={16} r={88} len={40} w={11} />
      <Dots n={16} r={124} size={2.2} offset={11.25} />
      <circle cx={C} cy={C} r="134" />
      <Ring n={24} r={136} len={42} w={9} />
      <Ring n={24} r={140} len={22} w={5} offset={7.5} />
      <Dots n={48} r={186} size={1.6} />
      <circle cx={C} cy={C} r="194" strokeDasharray="1 6" />
    </svg>
  );
}

// Lotus with flanking lines, used as a section divider.
export function Lotus({ className = '' }) {
  return (
    <svg className={`lotus ${className}`} width="132" height="28" viewBox="0 0 132 28" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M2 20H44M88 20H130" />
      <circle cx="40" cy="20" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="92" cy="20" r="1.6" fill="currentColor" stroke="none" />
      <path d="M66 4C70 9 70 15 66 21C62 15 62 9 66 4Z" fill="currentColor" fillOpacity=".18" />
      <path d="M66 21C61 18 56 13 55 8C60 9 64 13 66 21Z" />
      <path d="M66 21C71 18 76 13 77 8C72 9 68 13 66 21Z" />
      <path d="M66 21C59 21 52 18 48 13C55 12 62 15 66 21Z" />
      <path d="M66 21C73 21 80 18 84 13C77 12 70 15 66 21Z" />
      <path d="M52 24H80" />
    </svg>
  );
}

// The "dhaga": a hand-drawn thread that draws itself under a word.
export function Thread({ className = '' }) {
  return (
    <svg className={`thread ${className}`} viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d="M3 15C40 6 70 6 98 12S160 22 196 13 262 4 297 11" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" pathLength="1" />
    </svg>
  );
}

export function DemoBand({ title, text }) {
  return (
    <section className="container demo-band-wrap">
      <div className="demo-band" data-reveal="">
        <Mandala className="demo-band-mandala" />
        <div className="demo-band-copy">
          <h2 className="h2-sm">{title}</h2>
          <p>{text}</p>
        </div>
        <div className="btn-row">
          <Link to="/contact" className="btn btn-gold btn-md" onClick={() => track('cta_click', { cta: 'band_demo' })}>
            Book a free demo
          </Link>
          <Link to="/pricing" className="btn btn-outline-light btn-md" onClick={() => track('cta_click', { cta: 'band_pricing' })}>
            View pricing
          </Link>
        </div>
      </div>
    </section>
  );
}

