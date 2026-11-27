// Business details and per-page SEO in one place.
// Fill in the [PLACEHOLDER] values before going live.

import { LANDING } from './landing.js';

const EMAIL = 'hello@dhagabook.com';

export const SITE = {
  name: 'DhagaBook',
  url: (import.meta.env.VITE_SITE_URL || 'https://www.your-domain.com').replace(/\/$/, ''),
  phone: '+91 9316869720',
  phoneIntl: '+919316869720',
  // WhatsApp chat link with a ready-to-send first message.
  whatsapp: `https://wa.me/919316869720?text=${encodeURIComponent('Hi DhagaBook, I would like a free demo for my business.')}`,
  email: EMAIL,
  address: 'Laxmi Sky City, Dastan Circle, Opp. Sardar Party Plot, Kathwada Rd, Nava Naroda, Ahmedabad, Gujarat 382330',
  // Same address split for display (footer, contact page).
  addressLines: ['Laxmi Sky City, Dastan Circle,', 'Opp. Sardar Party Plot, Kathwada Rd,', 'Nava Naroda, Ahmedabad,', 'Gujarat 382330'],
  hours: '8:00 AM to 8:00 PM',
  taxNote: 'Prices are exclusive of GST. 18% GST is added to every invoice.',
  gstRate: 18,
  // Demo and purchase requests go to /api/lead (server/lead.js), which emails them via Resend.
  formEndpoint: import.meta.env.VITE_FORM_ENDPOINT || '/api/lead',
  setupFee: 20000,
  ogImage: '/images/dhagabook-web-app.webp',
  locale: 'en_IN',
};

export const PLANS = [
  { id: 'web', name: 'Web', price: 39999, was: 49999, label: 'Web — ₹39,999 / year + GST' },
  { id: 'web-app', name: 'Web + App', price: 49999, was: 59999, label: 'Web + App — ₹49,999 / year + GST' },
  { id: 'custom', name: 'Custom', price: null, label: 'Custom' },
];

// Customer reviews shown on the Home and Pricing pages.
// Only add real reviews, with the customer's permission, in their own words.
// Entries marked `placeholder: true` show in `npm run dev` (with a "Sample" badge)
// but are left out of the production build, so they can never go live by mistake.
// Fields: quote, name, role, business, city, rating (1–5, optional),
//         result (short outcome, optional), photo (/images/reviews/x.webp, optional).
export const TESTIMONIALS = [
  {
    placeholder: true,
    quote: 'Replace this with your customer’s own words — for example, how GST billing got faster or how they now check stock from their phone.',
    name: '[Customer name]',
    role: '[Owner]',
    business: '[Business name]',
    city: '[City]',
    rating: 5,
    result: '[Short result, e.g. “Billing in half the time”]',
  },
  {
    placeholder: true,
    quote: 'A second real review works best from a different kind of business — a wholesaler, retailer or manufacturer — so every visitor sees someone like them.',
    name: '[Customer name]',
    role: '[Accountant]',
    business: '[Business name]',
    city: '[City]',
    rating: 5,
  },
  {
    placeholder: true,
    quote: 'Specific details build trust: what they used before, what changed, and a number if they have one. Keep it short — two or three sentences.',
    name: '[Customer name]',
    role: '[Director]',
    business: '[Business name]',
    city: '[City]',
    rating: 5,
    result: '[Short result]',
  },
];

export const LIVE_TESTIMONIALS = TESTIMONIALS.filter((t) => !t.placeholder || import.meta.env.DEV);

// Real (non-placeholder) reviews, for structured data.
const reviewSchema = () =>
  TESTIMONIALS.filter((t) => !t.placeholder).map((t) => ({
    '@type': 'Review',
    reviewBody: t.quote,
    author: { '@type': 'Person', name: t.name },
    ...(t.rating ? { reviewRating: { '@type': 'Rating', ratingValue: t.rating, bestRating: 5, worstRating: 1 } } : {}),
  }));

export const formatINR = (n) => '₹' + n.toLocaleString('en-IN');

const organization = () => ({
  '@type': 'Organization',
  '@id': `${SITE.url}/#organization`,
  name: SITE.name,
  url: `${SITE.url}/`,
  logo: `${SITE.url}/icon-512.png`,
  description: 'Business management software built for India.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Laxmi Sky City, Dastan Circle, Opp. Sardar Party Plot, Kathwada Rd, Nava Naroda',
    addressLocality: 'Ahmedabad',
    addressRegion: 'Gujarat',
    postalCode: '382330',
    addressCountry: 'IN',
  },
  // Not shown on the page: tells search engines where we work and what we offer.
  areaServed: [
    ...['Ahmedabad', 'Gandhinagar', 'Surat', 'Vadodara', 'Rajkot'].map((name) => ({ '@type': 'City', name })),
    { '@type': 'State', name: 'Gujarat' },
    { '@type': 'Country', name: 'India' },
  ],
  knowsAbout: [
    'GST billing software', 'Accounting software', 'Inventory management software', 'Textile ERP software',
    'Garment billing software', 'WhatsApp Business API', 'WhatsApp automation', 'Barcode billing', 'Agent commission software',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: SITE.phoneIntl,
    email: SITE.email,
    contactType: 'sales',
    areaServed: 'IN',
    availableLanguage: ['en', 'hi'],
  },
});

const software = () => ({
  '@type': 'SoftwareApplication',
  '@id': `${SITE.url}/#software`,
  name: SITE.name,
  applicationCategory: 'BusinessApplication',
  featureList: 'GST billing, Accounting, Inventory, Purchase, Manufacturing, Textile bundles and labels, Agent commission, WhatsApp automation, Point of sale, Payroll, CRM, Mobile app',
  operatingSystem: 'Web, Android, iOS',
  description:
    'Billing, receivables, inventory, purchasing, payroll and accounting — connected in one platform for Indian businesses.',
  publisher: { '@id': `${SITE.url}/#organization` },
  ...(reviewSchema().length ? { review: reviewSchema() } : {}),
  offers: PLANS.filter((p) => p.price).map((p) => ({
    '@type': 'Offer',
    name: p.name,
    price: p.price,
    priceCurrency: 'INR',
    url: `${SITE.url}/pricing`,
    description: `₹${p.price.toLocaleString('en-IN')} per year, plus a one-time setup fee of ₹${SITE.setupFee.toLocaleString('en-IN')}. Prices exclude ${SITE.gstRate}% GST.`,
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: p.price,
      priceCurrency: 'INR',
      unitCode: 'ANN',
      valueAddedTaxIncluded: false,
      referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'ANN' },
    },
  })),
});

const breadcrumb = (name, path) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE.url}/` },
    { '@type': 'ListItem', position: 2, name, item: `${SITE.url}${path}` },
  ],
});

export const PRICING_FAQ = [
  {
    q: 'How is DhagaBook billed?',
    a: 'Every plan is billed yearly. Web is ₹39,999 per year and Web + App is ₹49,999 per year. A one-time setup fee of ₹20,000 is added in the first year. All prices are exclusive of GST: 18% GST is added to the invoice.',
  },
  {
    q: 'How many users are included?',
    a: 'Both the Web and Web + App plans include 5 users. Need more than 5 users? Choose Custom and we will prepare a quote for you.',
  },
  {
    q: 'Do all plans include every feature?',
    a: 'Yes. Every plan includes all 30+ features, including billing, inventory, purchasing, manufacturing, accounting, payroll, CRM, website, WhatsApp and the textile tools (bundles, bags, labels and agent commission).',
  },
  {
    q: 'What is the difference between Web and Web + App?',
    a: 'Web gives you full control from any browser. Web + App adds the DhagaBook mobile app for Android and iOS, so you can check sales, stock and dues on the go.',
  },
  {
    q: 'Can I manage more than one company or location?',
    a: 'Yes. Every plan supports multiple companies and locations from a single login.',
  },
  {
    q: 'Is DhagaBook made for textile and garment businesses?',
    a: 'Yes. DhagaBook handles designs, sets and bundles, bags on racks, piece and bag labels with coded prices, customer price lists, agent commission and dispatch details such as LR number and transport — the way textile wholesalers and manufacturers work.',
  },
  {
    q: 'Can I send invoices and reminders on WhatsApp?',
    a: 'Yes. DhagaBook connects to the official WhatsApp Business API to send quotations, invoices, receipts, payment reminders, payment links and dispatch alerts, and to share your product catalog. WhatsApp message charges are set and billed by Meta.',
  },
  {
    q: 'Can I see DhagaBook before buying?',
    a: 'Yes. Book a free, no-obligation demo and we will walk you through DhagaBook using examples from your type of business.',
  },
];

const faqPage = () => ({
  '@type': 'FAQPage',
  mainEntity: PRICING_FAQ.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

// Per-route metadata. Titles ≤ 60 chars, descriptions ≤ 160 chars.
export const ROUTES = {
  '/': {
    title: 'DhagaBook — GST Billing & Accounting Software, India',
    description:
      'GST billing, accounting, inventory, textile and WhatsApp automation software for Indian businesses. Made in Ahmedabad. Web + mobile app. Book a free demo.',
    schema: () => [
      organization(),
      software(),
      { '@type': 'WebSite', '@id': `${SITE.url}/#website`, url: `${SITE.url}/`, name: SITE.name, inLanguage: 'en-IN', publisher: { '@id': `${SITE.url}/#organization` } },
    ],
  },
  '/features': {
    title: 'Features — GST Billing, Inventory, Accounting | DhagaBook',
    description:
      '30+ connected features: GST invoices, textile bundles & labels, WhatsApp, agent commission, POS, inventory, barcode, manufacturing, accounting, payroll and projects.',
    schema: () => [organization(), software(), breadcrumb('Features', '/features')],
  },
  '/pricing': {
    title: 'Pricing — Plans from ₹39,999/year | DhagaBook',
    description:
      'Web ₹39,999/year + GST. Web + App ₹49,999/year + GST. All 30+ features and 5 users included. Custom plans for bigger teams. Book a free demo today.',
    schema: () => [organization(), software(), breadcrumb('Pricing', '/pricing'), faqPage()],
  },
  '/contact': {
    title: 'Book a Free Demo — Ahmedabad Office or Online | DhagaBook',
    description:
      'Book a free, personalised DhagaBook demo or buy a plan. We call you, show the modules that matter to your business and help you get set up.',
    schema: () => [organization(), breadcrumb('Book a demo', '/contact')],
  },
  '/terms': {
    title: 'Terms & Conditions | DhagaBook',
    description: 'The terms for using DhagaBook: plans, yearly billing, GST, user and device limits, your data, renewals and support.',
    schema: () => [organization(), breadcrumb('Terms & Conditions', '/terms')],
  },
  '/privacy': {
    title: 'Privacy Policy | DhagaBook',
    description: 'What data DhagaBook collects on the website, web app and mobile app, how it is used and protected, and your rights under the DPDP Act.',
    schema: () => [organization(), breadcrumb('Privacy Policy', '/privacy')],
  },
  '/refund-policy': {
    title: 'Refund & Cancellation Policy | DhagaBook',
    description: 'How to cancel a DhagaBook plan, when refunds apply, how they are paid and how the software is delivered.',
    schema: () => [organization(), breadcrumb('Refund & Cancellation Policy', '/refund-policy')],
  },
  '/delete-account': {
    title: 'Delete Your Account | DhagaBook',
    description: 'How to ask DhagaBook to delete your account, a user or your personal data, what is removed and how long it takes.',
    schema: () => [organization(), breadcrumb('Delete account', '/delete-account')],
  },
};

// SEO landing pages (src/landing.js): solutions and locations.
const landingSchema = (path, p) => {
  const url = `${SITE.url}${path}`;
  const faq = {
    '@type': 'FAQPage',
    mainEntity: p.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  const area = p.kind === 'location'
    ? (p.region ? { '@type': 'State', name: p.city } : { '@type': 'City', name: p.city, containedInPlace: { '@type': 'State', name: 'Gujarat' } })
    : { '@type': 'Country', name: 'India' };
  const local = {
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': `${url}#business`,
    name: p.kind === 'location' ? `DhagaBook — ${p.city}` : SITE.name,
    url,
    image: `${SITE.url}${SITE.ogImage}`,
    logo: `${SITE.url}/icon-512.png`,
    telephone: SITE.phoneIntl,
    email: SITE.email,
    priceRange: '₹₹',
    address: organization().address,
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '20:00',
    },
    areaServed: area,
    parentOrganization: { '@id': `${SITE.url}/#organization` },
  };
  return [organization(), software(), local, breadcrumb(p.kind === 'location' ? p.city : p.pill, path), faq];
};
for (const [path, p] of Object.entries(LANDING)) {
  ROUTES[path] = { title: p.meta.title, description: p.meta.description, schema: () => landingSchema(path, p) };
}

export const NOT_FOUND = {
  title: 'Page not found | DhagaBook',
  description: 'The page you are looking for does not exist.',
  noindex: true,
};
