import { Link } from 'react-router-dom';
import { Mandala, Lotus } from '../components/Bits.jsx';

export default function NotFound() {
  return (
    <section className="bg-cream page-hero-wrap">
      <Mandala className="page-mandala" />
      <div className="page-hero page-hero--tall">
        <span className="pill">404</span>
        <h1 className="h1">We couldn’t find that page</h1>
        <Lotus />
        <p className="lead">The link may be old or mistyped. These will get you back on track.</p>
        <div className="btn-row">
          <Link to="/" className="btn btn-primary btn-lg">Go to home</Link>
          <Link to="/contact" className="btn btn-ghost btn-lg">Book a free demo</Link>
        </div>
      </div>
    </section>
  );
}
