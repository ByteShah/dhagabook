import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { LogoMark } from './Logo.jsx';
import { Mandala, Lotus } from './Bits.jsx';
import { Menu, Close, Phone, Chat } from './Icons.jsx';
import { SITE } from '../site.js';
import { LANDING, LANDING_NAMES } from '../landing.js';
import { track } from '../analytics.js';
import { useSeo } from '../seo.js';

// Footer link groups for the SEO landing pages in landing.js.
const FOOTER_GROUPS = [
  ['Software', (p) => p.group === 'software'],
  ['Textile', (p) => p.group === 'textile'],
  ['Compare', (p) => p.group === 'compare'],
  ['Locations', (p) => p.kind === 'location'],
];

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/features', label: 'Features' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/contact', label: 'Contact' },
];

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // While the phone menu is open: lock page scroll, close on Escape, close if the screen grows to desktop.
  useEffect(() => {
    if (!open) return undefined;
    document.body.classList.add('menu-open');
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const mq = window.matchMedia('(min-width: 861px)');
    const onMq = (e) => e.matches && setOpen(false);
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      document.body.classList.remove('menu-open');
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
    };
  }, [open]);

  return (
    <header className={`site-header${open ? ' is-menu-open' : ''}${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label="DhagaBook home">
          <LogoMark />
          <span className="brand-name">DhagaBook</span>
        </Link>
        <nav aria-label="Main" className={`main-nav${open ? ' is-open' : ''}`} id="main-nav">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'} className="nav-link">
              {n.label}
            </NavLink>
          ))}
          <a href={`tel:${SITE.phoneIntl}`} className="nav-link nav-phone" onClick={() => track('call_click', { location: 'menu' })}>
            <Phone size={18} /> {SITE.phone}
          </a>
          <a href={SITE.whatsapp} className="nav-link nav-phone" target="_blank" rel="noopener" onClick={() => track('whatsapp_click', { location: 'menu' })}>
            <Chat size={18} /> Chat on WhatsApp
          </a>
          <Link to="/contact" className="btn btn-primary nav-cta" onClick={() => track('cta_click', { cta: 'menu_demo' })}>
            Book a free demo
          </Link>
        </nav>
        {open && <div className="nav-backdrop" aria-hidden="true" onClick={() => setOpen(false)} />}
        <div className="header-actions">
          <Link to="/contact" className="btn btn-primary btn-sm" onClick={() => track('cta_click', { cta: 'header_demo' })}>
            Book a free demo
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="main-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <>
      <div className="border-strip border-strip--footer" aria-hidden="true" />
      <footer className="site-footer">
        <Mandala className="footer-mandala" />
        <div className="container footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="brand">
                <LogoMark variant="dark" width={36} height={32} />
                <span className="brand-name brand-name--footer">DhagaBook</span>
              </div>
              <p>GST billing, accounting &amp; ERP software built for India.</p>
              <Lotus className="footer-lotus" />
            </div>
            <div className="footer-cols">
              <div className="footer-col">
                <h2 className="footer-title">Product</h2>
                <Link to="/features">Features</Link>
                <Link to="/pricing">Pricing</Link>
                <Link to="/contact">Book a demo</Link>
              </div>
              <div className="footer-col footer-col--contact">
                <h2 className="footer-title">Contact</h2>
                <a href={`tel:${SITE.phoneIntl}`} onClick={() => track('call_click', { location: 'footer' })}>
                  {SITE.phone}
                </a>
                <a href={`mailto:${SITE.email}`} onClick={() => track('email_click', { location: 'footer' })}>{SITE.email}</a>
                <address className="footer-address">{SITE.addressLines.map((l) => <span key={l}>{l}</span>)}</address>
              </div>
              <div className="footer-col">
                <h2 className="footer-title">Legal</h2>
                <Link to="/terms">Terms &amp; Conditions</Link>
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/refund-policy">Refund &amp; Cancellation</Link>
                <Link to="/delete-account">Delete account</Link>
              </div>
            </div>
          </div>
          <nav className="footer-seo" aria-label="Solutions and locations">
            {FOOTER_GROUPS.map(([title, filter]) => (
              <div key={title} className="footer-col">
                <h2 className="footer-title">{title}</h2>
                {Object.keys(LANDING).filter((p) => filter(LANDING[p])).map((p) => <Link key={p} to={p}>{LANDING_NAMES[p]}</Link>)}
              </div>
            ))}
          </nav>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} DhagaBook. All rights reserved.</span>
            <span>Made in India</span>
          </div>
        </div>
      </footer>
    </>
  );
}

// Thumb-reach call + demo bar on phones (hidden on the contact page, where the form is the CTA).
function MobileCtaBar() {
  const { pathname } = useLocation();
  if (pathname === '/contact') return null;
  return (
    <div className="mobile-cta" role="region" aria-label="Quick contact">
      <a href={`tel:${SITE.phoneIntl}`} className="btn btn-outline" onClick={() => track('call_click', { location: 'sticky_bar' })}>
        <Phone size={18} /> Call
      </a>
      <a href={SITE.whatsapp} className="btn btn-outline mobile-cta-wa" target="_blank" rel="noopener" aria-label="Chat on WhatsApp" onClick={() => track('whatsapp_click', { location: 'sticky_bar' })}>
        <Chat size={20} />
      </a>
      <Link to="/contact" className="btn btn-primary" onClick={() => track('cta_click', { cta: 'sticky_bar_demo' })}>
        Book a free demo
      </Link>
    </div>
  );
}

// Fades sections in as they scroll into view. Prerendered HTML stays fully visible
// without JavaScript; anything already on screen is shown at once, with no flash.
function useReveal(pathname) {
  useEffect(() => {
    const els = [...document.querySelectorAll('[data-reveal]:not(.is-in):not(.is-seen)')];
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-seen'));
      return undefined;
    }
    const vh = window.innerHeight;
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < vh * 0.92) el.classList.add('is-seen');
    });
    document.documentElement.classList.add('reveal-on');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          io.unobserve(en.target);
        }
      }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    els.filter((el) => !el.classList.contains('is-seen')).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
}

// The "dhaga": a twisted golden thread with a pearl that fills as you read.
function ScrollThread() {
  const ref = useRef(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      ref.current?.style.setProperty('--p', p.toFixed(4));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return (
    <div ref={ref} className="scroll-thread" aria-hidden="true">
      <span className="scroll-thread-rail"><span className="scroll-thread-fill" /></span>
      <span className="scroll-thread-bead" />
    </div>
  );
}

// Mouse-only polish: a gold spotlight that follows the cursor over cards,
// and a gentle 3D tilt on the hero product shot.
const SPOT = '.bento .card, .feature-card, .gateway, .india-card, .step, .plan, .platform, .review-card, .sutra-detail';
function usePointerPolish() {
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches) return undefined;
    let raf = 0;
    let last = null;
    const apply = () => {
      raf = 0;
      const e = last;
      const card = e.target.closest?.(SPOT);
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      }
      if (reduce.matches) return;
      const hero = e.target.closest?.('.hero');
      const pv = document.querySelector('.product-visual');
      if (!pv) return;
      if (hero) {
        const r = hero.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        pv.style.setProperty('--ry', (x * 5).toFixed(2));
        pv.style.setProperty('--rx', (-y * 3).toFixed(2));
      } else {
        pv.style.setProperty('--ry', '0');
        pv.style.setProperty('--rx', '0');
      }
    };
    const onMove = (e) => { last = e; if (!raf) raf = requestAnimationFrame(apply); };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('pointermove', onMove);
    };
  }, []);
}

export default function Layout() {
  const { pathname, hash } = useLocation();
  useSeo(pathname);

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  useReveal(pathname);
  usePointerPolish();

  return (
    <div className="site">
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />
      <ScrollThread />
      <div className="border-strip border-strip--top" aria-hidden="true" />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <MobileCtaBar />
    </div>
  );
}
