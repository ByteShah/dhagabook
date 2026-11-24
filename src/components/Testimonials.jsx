import { Link } from 'react-router-dom';
import { Star, Arrow } from './Icons.jsx';
import { Eyebrow } from './Bits.jsx';
import { LIVE_TESTIMONIALS } from '../site.js';
import { track } from '../analytics.js';

const initials = (name) =>
  name.replace(/[[\]]/g, '').split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('') || '?';

function Rating({ value }) {
  return (
    <div className="review-stars" role="img" aria-label={`Rated ${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => <Star key={n} filled={n <= value} />)}
    </div>
  );
}

// Customer reviews. Renders nothing when there are no reviews to show,
// so the section simply disappears from production until real reviews are added.
export default function Testimonials({ limit = 3, title = 'Trusted by businesses across India', className = '', cta = true }) {
  const items = LIVE_TESTIMONIALS.slice(0, limit);
  if (!items.length) return null;

  return (
    <section className={`section reviews ${className}`} aria-labelledby="reviews-title">
      <div className="container stack-48">
        <div className="section-head center" data-reveal="">
          <Eyebrow both>What our customers say</Eyebrow>
          <h2 id="reviews-title" className="h2">{title}</h2>
        </div>

        <ul className={`review-grid review-grid--${items.length}`}>
          {items.map((t, i) => (
            <li key={i} className="review-card" data-reveal="" style={{ '--d': i }}>
              {t.placeholder && <span className="review-sample">Sample — replace in src/site.js</span>}
              <svg className="review-quote-mark" width="40" height="32" viewBox="0 0 40 32" aria-hidden="true" focusable="false">
                <path d="M0 32V19.2C0 8.6 5.4 2.2 16.2 0l1.6 4.4C12 6.2 9.2 9.6 8.8 14.4H16V32zm22 0V19.2C22 8.6 27.4 2.2 38.2 0l1.6 4.4C34 6.2 31.2 9.6 30.8 14.4H38V32z" fill="currentColor" />
              </svg>
              {t.rating ? <Rating value={t.rating} /> : null}
              <figure className="review-body">
                <blockquote><p>{t.quote}</p></blockquote>
                {t.result && <p className="review-result">{t.result}</p>}
                <figcaption className="review-author">
                  {t.photo ? (
                    <img className="review-avatar" src={t.photo} alt="" width="48" height="48" loading="lazy" decoding="async" />
                  ) : (
                    <span className="review-avatar" aria-hidden="true">{initials(t.name)}</span>
                  )}
                  <span>
                    <b>{t.name}</b>
                    <span className="muted-sm">{[t.role, t.business].filter(Boolean).join(', ')}{t.city ? ` · ${t.city}` : ''}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        {cta && (
          <div className="reviews-cta">
            <Link to="/contact" className="btn btn-primary btn-md" onClick={() => track('cta_click', { cta: 'reviews_demo' })}>
              See it for your business <Arrow size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
