// SEO landing pages: solutions (what people search for) and locations (where they search from).
// Every page has its own copy, points, areas and FAQ, so none of them is a thin duplicate.
// Fields: kind ('solution' | 'location'), meta {title ≤ 60, description ≤ 160}, pill, h1, accent,
// lead, points [[title, text]], featuresTitle, features [..], local {title, text, groups [[label, [..]]]},
// faq [{q, a}], related [paths], city (location pages: schema areaServed).

export const LANDING = {
  // ---------------- Solutions ----------------
  '/accounting-software': {
    kind: 'solution',
    meta: {
      title: 'GST Accounting Software for Small Business | DhagaBook',
      description: 'GST accounting software for Indian businesses: invoices, ledgers, receivables, bank reconciliation, P&L and GST reports. Web + mobile. Free demo.',
    },
    pill: 'Accounting & GST software',
    h1: 'GST accounting software that',
    accent: 'keeps your books up to date',
    lead: 'Every invoice, bill and payment posts to your accounts automatically. See who owes you, what you owe and how much GST is due — on the computer or on your phone.',
    points: [
      ['GST invoices in seconds', 'HSN codes, CGST / SGST / IGST worked out for you, and invoices shared as PDF or on WhatsApp.'],
      ['Know who owes you', 'Aged receivables and payables, party ledgers and automatic payment reminders.'],
      ['Payments the Indian way', 'Receive one amount against the oldest bills first, with kasar, vatav and advances handled properly.'],
      ['Bank reconciliation', 'Match bank statement lines with invoices and bills instead of ticking them in a register.'],
      ['Reports your CA wants', 'Trial balance, P&L, balance sheet, general ledger, cash book and GST reports, exportable to Excel.'],
      ['Many companies, one login', 'Run several firms from one account, each with its own numbering and books.'],
    ],
    featuresTitle: 'Everything in DhagaBook accounting',
    features: [
      'Sales and purchase invoices with GST', 'Credit and debit notes', 'Customer and vendor ledgers', 'Aged receivables and payables',
      'Payment follow-ups on email and WhatsApp', 'Cash book and bank book', 'Bank reconciliation', 'Expenses and journal entries',
      'Trial balance, P&L and balance sheet', 'GST reports for filing', 'Multi-company and inter-company entries', 'Mobile app for owners',
    ],
    faq: [
      { q: 'Is DhagaBook a Tally alternative?', a: 'Yes. DhagaBook covers GST billing, accounting and reports like Tally, and adds inventory, purchasing, CRM, payroll, WhatsApp and a mobile app in the same system. It runs online, so you and your accountant can work from anywhere.' },
      { q: 'Can my CA use DhagaBook?', a: 'Yes. You can give your CA a user login, and every report — trial balance, ledgers, GST reports — can be exported to Excel or PDF.' },
      { q: 'Can I move my old data from Tally or Excel?', a: 'Yes. Opening balances, parties and items can be imported from Excel, and our team helps you during setup.' },
      { q: 'How much does the accounting software cost?', a: 'Plans start at ₹39,999 per year + GST with 5 users and all features, including accounting, inventory and billing.' },
    ],
    related: ['/textile-software', '/whatsapp-automation', '/ahmedabad', '/gujarat'],
  },

  '/whatsapp-automation': {
    kind: 'solution',
    meta: {
      title: 'WhatsApp Automation for Business — Invoices, Reminders | DhagaBook',
      description: 'Send invoices, payment reminders, payment links, order updates and your catalog on WhatsApp automatically, from your billing software. Official API.',
    },
    pill: 'WhatsApp Business API',
    h1: 'WhatsApp automation,',
    accent: 'built into your billing',
    lead: 'Your customers already live on WhatsApp. DhagaBook sends them quotations, invoices, reminders and dispatch updates automatically — through the official WhatsApp Business API, not a risky unofficial tool.',
    points: [
      ['Invoices on WhatsApp', 'Quotations, sales orders, invoices and receipts go out as a PDF the moment they are confirmed.'],
      ['Payment reminders that work', 'Automatic reminders for overdue bills, with a payment link so customers can pay right away.'],
      ['Dispatch updates', 'Customers get a message with the transport and tracking details when their goods leave.'],
      ['Catalog and orders', 'Your products synced to the WhatsApp catalog, product showcases with offers, and WhatsApp orders straight into sales.'],
      ['Two-way chat', 'Replies land in DhagaBook, linked to the customer, so the whole team sees the conversation.'],
      ['Campaigns', 'Approved message templates for offers and new arrivals, with the Meta cost shown before you send.'],
    ],
    featuresTitle: 'What you can automate on WhatsApp',
    features: [
      'Quotations and sales orders', 'GST invoices and receipts', 'Overdue payment reminders', 'UPI / online payment links',
      'Delivery and dispatch alerts', 'Product catalog sync', 'Product carousels and offers', 'Orders from WhatsApp',
      'Reply buttons and lists', 'Meeting reminders', 'Broadcast campaigns', 'Account health and cost estimates',
    ],
    faq: [
      { q: 'Is this the official WhatsApp Business API?', a: 'Yes. DhagaBook connects to Meta’s official WhatsApp Cloud API with your own business number, so there is no risk of your number being banned for using unofficial tools.' },
      { q: 'Do I need a new phone number?', a: 'You need a number that is not already active on the normal WhatsApp app. Many businesses use a new number for the API, or move their existing one. We help you set it up.' },
      { q: 'What does WhatsApp messaging cost?', a: 'Meta charges per message conversation according to its own price list, billed by Meta directly. DhagaBook shows the estimated cost before you send a campaign.' },
      { q: 'Can customers reply?', a: 'Yes. Replies arrive in DhagaBook against the customer, and your team can answer from the computer within WhatsApp’s 24-hour window.' },
    ],
    related: ['/accounting-software', '/textile-software', '/surat', '/ahmedabad'],
  },

  '/textile-software': {
    kind: 'solution',
    meta: {
      title: 'Textile ERP & Billing Software for Wholesalers | DhagaBook',
      description: 'Textile billing and ERP software for garment and saree wholesalers and manufacturers: designs, sets, bundles, bags, barcode labels, agent commission and GST.',
    },
    pill: 'Textile & garment software',
    h1: 'Textile billing software for',
    accent: 'wholesalers and manufacturers',
    lead: 'Made with textile traders, for the way the trade really works: designs and sets, bundles packed in bags, piece labels with coded prices, agents on every party and LR numbers on every bill.',
    points: [
      ['Bundle Builder', 'Enter a design once — pieces, colours and sizes — and DhagaBook creates every piece with its own barcode, plus the sets and bundles.'],
      ['Bags and racks', 'One bag is one packed bundle. See bags in stock, free and to pack, rack by rack, and scan bags on dispatch.'],
      ['Labels with coded prices', 'Print 38×38 piece labels and bag labels with design, size, barcode and your price code.'],
      ['Party-wise price lists', 'Different rates for each customer or market, picked up automatically on every order.'],
      ['Agent commission', 'Agent on every party and order, commission by customer, category or product, earned only when the party pays.'],
      ['Dispatch details', 'LR number, transport, parcels and sets on the delivery and the bill.'],
    ],
    featuresTitle: 'Made for every kind of textile business',
    features: [
      'Saree and dress material wholesalers', 'Kurti and readymade garment makers', 'Fabric traders and agents', 'Job work and processing units',
      'Design-wise stock', 'Size / colour matrix', 'Barcode billing', 'Bundle and bag-wise stock',
      'Agent statements', 'Kasar and vatav in payments', 'GST invoices with HSN', 'Online store and WhatsApp catalog',
    ],
    faq: [
      { q: 'Can DhagaBook handle sets and bundles?', a: 'Yes. A set (for example a 3-piece kurta set) and a bundle of sizes are created together with the Bundle Builder, and you can sell by set, bundle or single piece while stock stays correct for each piece.' },
      { q: 'Does it work with barcodes?', a: 'Yes. Every piece gets its own EAN-13 barcode, and you can scan pieces or whole bags while packing, dispatching or counting stock — including with the phone camera.' },
      { q: 'Can I manage agent (dalal) commission?', a: 'Yes. Set a default commission % per agent, add rules by customer, category or product, and DhagaBook works out commission as payments come in, with agent statements and payouts.' },
      { q: 'Is it suitable for Surat and Ahmedabad textile markets?', a: 'Yes. DhagaBook was built with textile wholesalers in Gujarat and follows how the cloth markets of Surat and Ahmedabad work.' },
    ],
    related: ['/surat', '/ahmedabad', '/accounting-software', '/whatsapp-automation'],
  },

  // ---------------- Locations ----------------
  '/ahmedabad': {
    kind: 'location',
    city: 'Ahmedabad',
    meta: {
      title: 'Billing & Accounting Software in Ahmedabad | DhagaBook',
      description: 'GST billing, accounting, inventory and WhatsApp software for Ahmedabad businesses, from Naroda to SG Highway. Office in Nava Naroda. Book a free demo.',
    },
    pill: 'Ahmedabad, Gujarat',
    h1: 'Billing and accounting software',
    accent: 'for Ahmedabad businesses',
    lead: 'DhagaBook is made in Ahmedabad. From the cloth markets of Kalupur and Raipur to the GIDCs of Naroda, Odhav and Vatva, local traders and manufacturers use one app for billing, stock, accounts and WhatsApp.',
    points: [
      ['Local team, local office', 'Visit us in Nava Naroda for a demo, or book an online demo — whichever suits you.'],
      ['Made for textile markets', 'Designs, sets, bundles and agent commission for wholesalers in New Cloth Market, Maskati and Panchkuva.'],
      ['Ready for factories', 'Manufacturing, bills of materials and multi-godown stock for units in Naroda, Odhav, Vatva and Changodar GIDC.'],
      ['Training in Gujarati and Hindi', 'Your team is trained in the language they are comfortable with.'],
    ],
    featuresTitle: 'What Ahmedabad businesses use DhagaBook for',
    features: [
      'GST billing and e-invoices', 'Accounting and GST reports', 'Inventory across godowns', 'Barcode billing',
      'Textile bundles and labels', 'Agent commission', 'WhatsApp invoices and reminders', 'Mobile app for owners',
    ],
    local: {
      title: 'Serving businesses across Ahmedabad',
      text: 'Our office is in Nava Naroda, so we are close to the east-side industrial belt — and we support businesses in every part of the city online.',
      groups: [
        ['Markets', ['New Cloth Market', 'Maskati Market', 'Panchkuva', 'Kalupur', 'Revdi Bazaar', 'Relief Road', 'Ratanpole', 'Raipur']],
        ['Industrial areas', ['Naroda GIDC', 'Odhav GIDC', 'Vatva GIDC', 'Narol', 'Kathwada GIDC', 'Changodar', 'Sanand', 'Aslali']],
        ['Areas', ['Nava Naroda', 'Naroda', 'Nikol', 'Bapunagar', 'Vastral', 'Kathwada', 'Odhav', 'Maninagar', 'Isanpur', 'Narol', 'Chandkheda', 'Sabarmati', 'Gota', 'Navrangpura', 'CG Road', 'Ashram Road', 'Satellite', 'Vastrapur', 'Prahlad Nagar', 'SG Highway', 'Bopal', 'Shela']],
      ],
    },
    faq: [
      { q: 'Where is the DhagaBook office in Ahmedabad?', a: 'Laxmi Sky City, Dastan Circle, Opp. Sardar Party Plot, Kathwada Road, Nava Naroda, Ahmedabad 382330. Call before visiting so the right person is free.' },
      { q: 'Can I see a demo in Ahmedabad?', a: 'Yes. Book a free demo at our Nava Naroda office or online, and we will show DhagaBook with examples from your type of business.' },
      { q: 'Do you support textile traders in Ahmedabad’s cloth markets?', a: 'Yes. DhagaBook handles designs, sets, bundles, bags, coded price labels and agent commission — the way wholesalers in New Cloth Market, Maskati Market and Panchkuva work.' },
      { q: 'How much does it cost?', a: 'Plans start at ₹39,999 per year + GST, with 5 users and every feature included.' },
    ],
    related: ['/gandhinagar', '/surat', '/gujarat', '/textile-software'],
  },

  '/gandhinagar': {
    kind: 'location',
    city: 'Gandhinagar',
    meta: {
      title: 'Billing & Accounting Software in Gandhinagar | DhagaBook',
      description: 'GST billing, accounting, inventory and WhatsApp automation for Gandhinagar businesses — Kalol, Sargasan, Kudasan, GIDC and GIFT City. Free demo.',
    },
    pill: 'Gandhinagar, Gujarat',
    h1: 'Business software for',
    accent: 'Gandhinagar businesses',
    lead: 'From shops in Sector 21 to manufacturers in Kalol and Chhatral GIDC, and growing firms in Kudasan and GIFT City, DhagaBook gives Gandhinagar businesses billing, stock, accounts and WhatsApp in one place.',
    points: [
      ['Close by', 'Our Ahmedabad office is a short drive away, and every demo is also available online.'],
      ['For shops and distributors', 'Fast GST billing, barcode scanning and stock across shop and godown.'],
      ['For manufacturers', 'Production, bills of materials and purchase planning for GIDC units.'],
      ['For service firms', 'Projects, tasks, CRM and accounting for offices in Infocity and GIFT City.'],
    ],
    featuresTitle: 'What Gandhinagar businesses use DhagaBook for',
    features: [
      'GST billing and invoices', 'Accounting and reports', 'Stock and godowns', 'Manufacturing and BOM',
      'CRM and follow-ups', 'Projects and tasks', 'WhatsApp invoices and reminders', 'Mobile app for owners',
    ],
    local: {
      title: 'Serving businesses across Gandhinagar district',
      text: 'We support businesses in every sector of Gandhinagar and the towns and industrial estates around it.',
      groups: [
        ['Business hubs', ['GIFT City', 'Infocity', 'Sector 11', 'Sector 16', 'Sector 21', 'Sector 24']],
        ['Industrial areas', ['Gandhinagar GIDC (Sector 25, 26, 28)', 'Kalol GIDC', 'Chhatral GIDC', 'Santej', 'Rakanpur', 'Dahegam']],
        ['Areas', ['Kudasan', 'Sargasan', 'Raysan', 'Randesan', 'Koba', 'Adalaj', 'Pethapur', 'Kalol', 'Mansa', 'Dahegam']],
      ],
    },
    faq: [
      { q: 'Do you have customers in Gandhinagar?', a: 'Yes. DhagaBook supports businesses across Gandhinagar district, with demos at our Ahmedabad office or online.' },
      { q: 'Is DhagaBook good for GIDC manufacturers in Kalol and Chhatral?', a: 'Yes. It includes manufacturing orders, multi-level bills of materials, purchase and stock across godowns, all connected to accounting and GST.' },
      { q: 'Can I use it from my phone?', a: 'Yes. The Web + App plan includes the DhagaBook mobile app for Android and iOS, with sales, dues and stock at a glance.' },
      { q: 'How much does it cost?', a: 'Plans start at ₹39,999 per year + GST, with 5 users and every feature included.' },
    ],
    related: ['/ahmedabad', '/gujarat', '/accounting-software', '/whatsapp-automation'],
  },

  '/surat': {
    kind: 'location',
    city: 'Surat',
    meta: {
      title: 'Textile Billing Software in Surat | DhagaBook',
      description: 'Textile billing and accounting software for Surat saree, dress material and fabric wholesalers on Ring Road — bundles, barcode labels, agents and GST.',
    },
    pill: 'Surat, Gujarat',
    h1: 'Textile billing software',
    accent: 'for Surat wholesalers',
    lead: 'Surat’s textile trade moves fast: designs, sets, bundles, agents and transport every day. DhagaBook keeps it all in one place — from the Ring Road markets to the weaving and processing units of Sachin and Pandesara.',
    points: [
      ['Design-wise stock', 'Every design with its colours and sizes, and every piece with its own barcode.'],
      ['Bundles and bags', 'Pack bundles into bags, track them rack by rack and scan them on dispatch.'],
      ['Agents and commission', 'Agent on every party, commission rules and statements, earned when the party pays.'],
      ['Transport and LR', 'LR number, transport and parcels on every delivery and bill.'],
    ],
    featuresTitle: 'What Surat textile businesses use DhagaBook for',
    features: [
      'Saree and dress material billing', 'Fabric and grey cloth stock', 'Barcode labels with coded prices', 'Party-wise price lists',
      'Agent commission', 'Kasar and vatav', 'WhatsApp catalog and invoices', 'GST invoices and reports',
    ],
    local: {
      title: 'Serving Surat’s textile markets and industrial areas',
      text: 'We support Surat businesses online, with setup and training in Gujarati and Hindi.',
      groups: [
        ['Textile markets', ['Ring Road', 'Surat Textile Market', 'Millennium Market', 'Raghukul Market', 'Salasar Gate', 'Global Textile Market', 'Kohinoor Market']],
        ['Industrial areas', ['Sachin GIDC', 'Pandesara GIDC', 'Udhna', 'Kadodara', 'Palsana', 'Kamrej', 'Hojiwala']],
        ['Areas', ['Salabatpura', 'Begampura', 'Varachha', 'Katargam', 'Adajan', 'Vesu', 'Piplod', 'Athwa', 'Sarthana', 'Puna', 'Limbayat']],
      ],
    },
    faq: [
      { q: 'Is DhagaBook made for the Surat textile trade?', a: 'Yes. Designs, sets, bundles, bags, coded price labels, agent commission and LR details were built with Gujarat textile wholesalers.' },
      { q: 'Can I get support in Surat?', a: 'Yes. Demos, setup and training are done online, in Gujarati or Hindi, with phone and WhatsApp support from 8 AM to 8 PM.' },
      { q: 'Can I send my catalog to buyers on WhatsApp?', a: 'Yes. Your products can be synced to the WhatsApp catalog, and you can send product showcases with offers to buyers from DhagaBook.' },
      { q: 'How much does it cost?', a: 'Plans start at ₹39,999 per year + GST, with 5 users and every feature included.' },
    ],
    related: ['/textile-software', '/ahmedabad', '/gujarat', '/whatsapp-automation'],
  },

  '/gujarat': {
    kind: 'location',
    city: 'Gujarat',
    region: true,
    meta: {
      title: 'Business & Accounting Software in Gujarat | DhagaBook',
      description: 'GST billing, accounting, inventory, textile and WhatsApp software for businesses across Gujarat — Ahmedabad, Surat, Gandhinagar, Vadodara, Rajkot and more.',
    },
    pill: 'Made in Gujarat',
    h1: 'Business software made in Gujarat,',
    accent: 'for Gujarat',
    lead: 'DhagaBook is built in Ahmedabad for the way Gujarat trades — textile markets, GIDC factories, distributors and family shops. Billing, stock, accounts, WhatsApp and a mobile app, in one system.',
    points: [
      ['Gujarati and Hindi support', 'Demos, training and support in the language your team speaks.'],
      ['Built for local trade', 'Kasar, vatav, agents, bundles and transport — not just a foreign template.'],
      ['Online across the state', 'Every city is supported online, with our office in Ahmedabad.'],
      ['One price, everything included', 'All features and 5 users from ₹39,999 per year + GST.'],
    ],
    featuresTitle: 'Popular with Gujarat businesses',
    features: [
      'GST billing and accounting', 'Textile bundles and labels', 'Manufacturing and BOM', 'Distributors and stockists',
      'Barcode billing', 'Agent commission', 'WhatsApp automation', 'Mobile app for owners',
    ],
    local: {
      title: 'Serving businesses across Gujarat',
      text: 'Our office is in Ahmedabad, and we set up and support businesses in every district online.',
      groups: [
        ['Cities', ['Ahmedabad', 'Surat', 'Gandhinagar', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Junagadh', 'Anand', 'Nadiad', 'Mehsana', 'Morbi', 'Bharuch', 'Navsari', 'Vapi', 'Himmatnagar', 'Palanpur', 'Gandhidham']],
        ['Industry hubs', ['Surat textiles', 'Ahmedabad cloth markets', 'Jetpur printing', 'Morbi ceramics', 'Rajkot engineering', 'Jamnagar brass', 'Ankleshwar and Vapi GIDC', 'Sanand and Changodar']],
      ],
    },
    faq: [
      { q: 'Do you support businesses outside Ahmedabad?', a: 'Yes. DhagaBook runs online, so demos, setup, training and support are available anywhere in Gujarat.' },
      { q: 'Is support available in Gujarati?', a: 'Yes. Our team supports you in Gujarati, Hindi and English, from 8 AM to 8 PM.' },
      { q: 'Which businesses use DhagaBook?', a: 'Textile wholesalers and manufacturers, distributors, traders, retailers and factories — any business that needs GST billing, stock and accounts together.' },
      { q: 'How much does it cost?', a: 'Plans start at ₹39,999 per year + GST, with 5 users and every feature included.' },
    ],
    related: ['/ahmedabad', '/surat', '/gandhinagar', '/textile-software'],
  },
};

export const LANDING_NAMES = {
  '/accounting-software': 'Accounting software',
  '/whatsapp-automation': 'WhatsApp automation',
  '/textile-software': 'Textile software',
  '/ahmedabad': 'Ahmedabad',
  '/gandhinagar': 'Gandhinagar',
  '/surat': 'Surat',
  '/gujarat': 'Gujarat',
};
