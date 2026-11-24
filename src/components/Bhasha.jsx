import { Eyebrow } from './Bits.jsx';

// The languages of India's states, each with its word for "thank you".
const LANGS = [
  { id: 'gu', name: 'Gujarati', state: 'Gujarat', thanks: 'આભાર' },
  { id: 'hi', name: 'Hindi', state: 'Uttar Pradesh, Delhi & more', thanks: 'धन्यवाद' },
  { id: 'mr', name: 'Marathi', state: 'Maharashtra', thanks: 'धन्यवाद' },
  { id: 'pa', name: 'Punjabi', state: 'Punjab', thanks: 'ਧੰਨਵਾਦ' },
  { id: 'bn', name: 'Bengali', state: 'West Bengal', thanks: 'ধন্যবাদ' },
  { id: 'or', name: 'Odia', state: 'Odisha', thanks: 'ଧନ୍ୟବାଦ' },
  { id: 'te', name: 'Telugu', state: 'Andhra Pradesh & Telangana', thanks: 'ధన్యవాదాలు' },
  { id: 'kn', name: 'Kannada', state: 'Karnataka', thanks: 'ಧನ್ಯವಾದಗಳು' },
  { id: 'ta', name: 'Tamil', state: 'Tamil Nadu', thanks: 'நன்றி' },
  { id: 'ml', name: 'Malayalam', state: 'Kerala', thanks: 'നന്ദി' },
];

export default function Bhasha() {
  return (
    <section className="section bhasha-section" aria-labelledby="bhasha-title">
      <div className="container stack-48">
        <div className="section-head center" data-reveal="">
          <Eyebrow both>Made for every state</Eyebrow>
          <h2 id="bhasha-title" className="h2">One DhagaBook, <span className="accent">many Indian languages</span></h2>
          <p className="lead">From Gujarat to Kerala, your customers speak different languages. DhagaBook is built for businesses across every state of India.</p>
        </div>

        <ul className="bhasha-grid">
          {LANGS.map((l, i) => (
            <li key={l.id} className="bhasha-card" data-reveal="" style={{ '--d': i % 5 }}>
              <span className="bhasha-word" lang={l.id}>{l.thanks}</span>
              <b className="bhasha-name">{l.name}</b>
              <span className="bhasha-state">{l.state}</span>
            </li>
          ))}
        </ul>
        <p className="bhasha-note">Each word above means “thank you”.</p>
      </div>
    </section>
  );
}
