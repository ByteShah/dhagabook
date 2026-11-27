import { Link, useLocation } from 'react-router-dom';
import { Mandala, Lotus } from '../components/Bits.jsx';
import { LEGAL, UPDATED } from '../legal.js';

export const LEGAL_LINKS = [
  ['/terms', 'Terms & Conditions'],
  ['/privacy', 'Privacy Policy'],
  ['/refund-policy', 'Refund & Cancellation'],
  ['/delete-account', 'Delete account'],
];

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function Block({ b }) {
  if (Array.isArray(b)) {
    return <ul>{b.map((li) => <li key={li}>{li}</li>)}</ul>;
  }
  return <p>{b}</p>;
}

export default function Legal() {
  const { pathname } = useLocation();
  const doc = LEGAL[pathname.replace(/\/$/, '')];
  if (!doc) return null;
  return (
    <>
      <section className="bg-cream page-hero-wrap">
        <Mandala className="page-mandala" />
        <div className="page-hero">
          <span className="pill">{doc.pill}</span>
          <h1 className="h1">{doc.title}</h1>
          <Lotus />
          <p className="lead">{doc.intro}</p>
          <p className="legal-updated">Last updated: {UPDATED}</p>
        </div>
      </section>

      <section className="legal-wrap">
        <div className="container legal-grid">
          <aside className="legal-side">
            <nav aria-label="Legal pages" className="legal-nav">
              {LEGAL_LINKS.map(([to, label]) => (
                <Link key={to} to={to} aria-current={to === pathname ? 'page' : undefined}>{label}</Link>
              ))}
            </nav>
          </aside>
          <article className="legal-doc">
            <ol className="legal-toc" aria-label="On this page">
              {doc.sections.map((s) => (
                <li key={s.h}><a href={`#${slug(s.h)}`}>{s.h}</a></li>
              ))}
            </ol>
            {doc.sections.map((s, i) => (
              <section key={s.h} id={slug(s.h)} className="legal-section">
                <h2><span>{i + 1}.</span> {s.h}</h2>
                {s.body.map((b, j) => <Block key={j} b={b} />)}
              </section>
            ))}
            <p className="legal-help">
              Questions about this page? <Link to="/contact">Contact us</Link> — we’re happy to explain.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
