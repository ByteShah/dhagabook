// Legal pages: Terms, Privacy, Refunds and Account deletion.
// Each section body is a list of blocks: a string is a paragraph, an array is a bullet list.
// Review with your CA / lawyer before going live, and update UPDATED when anything changes.
import { SITE, formatINR } from './site.js';

export const UPDATED = '27 November 2026';

const contactBlock = [
  `Email: ${SITE.email}`,
  `Phone / WhatsApp: ${SITE.phone} (${SITE.hours}, Monday to Saturday)`,
  `Address: ${SITE.address}`,
];

export const LEGAL = {
  '/terms': {
    title: 'Terms & Conditions',
    pill: 'Legal',
    intro: `These terms apply when you use the DhagaBook website, web application or mobile app, or buy a DhagaBook plan. By booking a demo, buying a plan or using DhagaBook, you agree to them.`,
    sections: [
      {
        h: 'About DhagaBook',
        body: [
          `DhagaBook is business management software for Indian businesses: billing and GST invoicing, inventory, purchasing, sales, accounting, payroll and reports. It is offered by ${SITE.name}, ${SITE.address} (“DhagaBook”, “we”, “us”).`,
          'In these terms, “you” or “the customer” means the business that buys a plan, and “users” means the people that business allows to sign in.',
        ],
      },
      {
        h: 'Plans and what they include',
        body: [
          [
            'Web: the DhagaBook web application, used from any browser.',
            'Web + App: the web application plus the DhagaBook mobile app for Android and iOS.',
            'Each plan includes 5 users. Extra users, companies or custom work are quoted separately under a Custom plan.',
            'Each user can stay signed in on up to 2 computers and 1 phone at a time. Signing in on a new phone signs the older phone out.',
          ],
          'Features and screens may improve over time. We will not remove a core function you are paying for during your paid period without telling you in advance.',
        ],
      },
      {
        h: 'Prices, GST and payment',
        body: [
          [
            'Plans are billed yearly, in advance, at the price shown on our pricing page or in your written quote.',
            `A one-time setup fee of ${formatINR(SITE.setupFee)} applies in the first year. It covers your company setup, data import help and team training.`,
            `All prices are exclusive of GST. ${SITE.gstRate}% GST is added to every invoice.`,
            'Renewal is at the price in force at the time of renewal. We will tell you about any price change at least 30 days before your renewal date.',
          ],
          'Your account starts once the payment is received. Unpaid invoices may lead to suspension after a reminder.',
        ],
      },
      {
        h: 'Free demo and trial',
        body: [
          'The demo is free and does not oblige you to buy. If we give you a trial account, it runs for the period we tell you (usually 30 days). When a trial ends without a purchase, the account is locked.',
        ],
      },
      {
        h: 'Your account and users',
        body: [
          [
            'You are responsible for the users you create and for keeping passwords private. Do not share one login between several people.',
            'Tell us at once if you think someone has used your account without permission.',
            'You must give correct business details, including GSTIN, for invoices and tax documents.',
          ],
        ],
      },
      {
        h: 'Your data',
        body: [
          'The business data you enter in DhagaBook (customers, vendors, items, invoices, stock, accounts, employees and so on) belongs to you. We use it only to run the service for you, to give support you ask for, and as described in our Privacy Policy.',
          'You are responsible for the accuracy of what you enter, and for having the right to store the personal details of your customers, vendors and employees.',
          'You can ask for an export of your data at any time while your account is active, and for 90 days after it ends.',
        ],
      },
      {
        h: 'GST, tax and accounting results',
        body: [
          'DhagaBook calculates taxes and prepares reports from the data and settings you enter. It does not replace professional advice. Please check returns and filings with your CA or tax advisor before you submit them. We are not responsible for penalties caused by wrong data, wrong settings or late filing.',
        ],
      },
      {
        h: 'Acceptable use',
        body: [
          'You must not:',
          [
            'use DhagaBook for anything unlawful, including fake invoices or tax evasion;',
            'try to break, overload, copy, resell or reverse-engineer the software;',
            'access another customer’s data, or share your access with people outside your business;',
            'upload viruses or harmful files.',
          ],
          'We may suspend an account that breaks these rules, after notice where the law allows.',
        ],
      },
      {
        h: 'Availability, backups and support',
        body: [
          [
            'We host and maintain your database, take regular backups and work to keep DhagaBook available at all times. Short breaks may happen for maintenance, which we try to schedule outside business hours.',
            `Support is available by phone, WhatsApp and email, ${SITE.hours}, Monday to Saturday.`,
            'Features that depend on outside services (for example e-invoice or e-way bill portals, WhatsApp, payment gateways, app stores or internet providers) may be affected when those services are down.',
          ],
        ],
      },
      {
        h: 'Renewal, expiry and ending the service',
        body: [
          [
            'We send renewal reminders before your plan ends, in the app, by email and by notification.',
            'If a plan is not renewed, the account is locked on the expiry date. Your data is kept safely for 90 days, during which you can renew or ask for an export.',
            'After 90 days, the data may be deleted permanently.',
            'You can stop using DhagaBook at any time. Refunds are covered by our Refund & Cancellation Policy.',
          ],
        ],
      },
      {
        h: 'Intellectual property',
        body: [
          'The DhagaBook software, name, logo, designs and documentation belong to DhagaBook or its licensors. Your plan gives you a non-transferable right to use the software for your own business during the paid period. Some parts are built on open-source software that remains under its own licence.',
        ],
      },
      {
        h: 'Limitation of liability',
        body: [
          'DhagaBook is provided with reasonable care and skill. To the extent the law allows, we are not liable for indirect losses such as lost profit, lost business or lost goodwill. Our total liability for any claim is limited to the fees you paid us in the 12 months before the claim.',
        ],
      },
      {
        h: 'Changes to these terms',
        body: [
          'We may update these terms from time to time. The date at the top shows the latest version. For important changes, we will tell active customers by email or in the app before they take effect.',
        ],
      },
      {
        h: 'Governing law',
        body: [
          'These terms are governed by the laws of India. Any dispute will first be discussed in good faith. If it cannot be settled, the courts at Ahmedabad, Gujarat will have exclusive jurisdiction.',
        ],
      },
      { h: 'Contact', body: [contactBlock] },
    ],
  },

  '/privacy': {
    title: 'Privacy Policy',
    pill: 'Legal',
    intro: 'This policy explains what information DhagaBook collects through its website, web application and mobile app, why we collect it, and the choices you have. It is written in line with the Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000.',
    sections: [
      {
        h: 'Information we collect',
        body: [
          'From the website:',
          [
            'Details you type into the demo or purchase form: name, phone number, email, business name, city, the plan you choose and your message.',
            'Basic usage information through Google Analytics, such as pages visited, buttons clicked, device type and approximate city. This uses cookies. We do not send your name, phone or email to Google Analytics.',
          ],
          'When you use DhagaBook:',
          [
            'Account details: your company name, GSTIN, address, and each user’s name, login email or phone, and role.',
            'Business data you enter: customers, vendors, items, invoices, payments, stock, accounts and employee or payroll records.',
            'Sign-in and device details: device name and type, app version, sign-in time and IP address. We use these to keep accounts secure and apply the device limits of your plan.',
            'Licence details: your account code, plan, expiry date and number of users.',
          ],
          'From the mobile app, only when you allow it:',
          [
            'Camera: to scan barcodes and take photos of bills, documents and goods.',
            'Photos: to attach pictures you choose to a record, such as a bill or delivery proof.',
            'Notifications: for renewal reminders and important business alerts.',
            'Fingerprint or face unlock: handled entirely by your phone. DhagaBook never receives your fingerprint or face data.',
            'Local network: to connect to receipt and label printers in your shop.',
          ],
          'We do not collect your contacts, SMS, call logs or location.',
        ],
      },
      {
        h: 'How we use it',
        body: [
          [
            'To run DhagaBook for you: storing your records, generating invoices and reports, and showing them on the web and on the app.',
            'To call you back, give a demo, set up your account and train your team.',
            'To give support when you ask for it. Our support team may view your data only to solve the problem you raised.',
            'To send service messages: invoices, renewal reminders, security alerts and updates.',
            'To keep DhagaBook secure and prevent misuse.',
            'To improve the product, using summary usage information, not the contents of your business records.',
          ],
          'We do not sell your data, and we do not use your business data for advertising.',
        ],
      },
      {
        h: 'Your customers’ and employees’ data',
        body: [
          'When you store details of your customers, vendors or employees in DhagaBook, you decide what is stored and why. For that data, you are the Data Fiduciary and DhagaBook processes it on your behalf, only to provide the service.',
        ],
      },
      {
        h: 'Who we share it with',
        body: [
          'We share information only with service providers that help us run DhagaBook, under confidentiality obligations, and only as much as they need:',
          [
            'Cloud hosting and backup providers that store the databases.',
            'Licence and notification services that check plan validity and deliver reminders to the app.',
            'An email delivery service that sends us your website form enquiry and sends you service emails.',
            'Google Analytics, for website visit statistics.',
            'Government portals (GST, e-invoice, e-way bill) when you choose to file or generate documents from DhagaBook.',
          ],
          'We may also share information when the law requires it, for example on a valid order from a court or government authority.',
        ],
      },
      {
        h: 'Where and how long we keep it',
        body: [
          [
            'Business data is kept while your account is active, and for 90 days after it ends, so you can renew or take an export. After that it may be permanently deleted, except where the law requires us to keep records (for example tax invoices we issued to you).',
            'Website enquiries are kept for up to 2 years so we can follow up, unless you ask us to delete them sooner.',
            'Backups are overwritten on a rolling basis.',
          ],
        ],
      },
      {
        h: 'How we protect it',
        body: [
          [
            'All traffic is encrypted with HTTPS.',
            'Each customer’s data is kept in its own database, separate from other customers.',
            'Passwords are stored only in encrypted (hashed) form. On the phone, your sign-in is kept in the device’s secure storage.',
            'Access by our team is limited to people who need it to support you.',
          ],
          'No system is completely secure, but if a breach affects your data we will inform you and the authorities as the law requires.',
        ],
      },
      {
        h: 'Your rights',
        body: [
          'You can ask us to:',
          [
            'show you the personal data we hold about you;',
            'correct or update it;',
            'delete it, or delete your account (see our Delete Account page);',
            'stop sending you promotional messages;',
            'withdraw consent you gave earlier.',
          ],
          'App permissions can be turned off at any time in your phone’s settings. Some features, such as barcode scanning, will not work without them.',
        ],
      },
      {
        h: 'Cookies',
        body: [
          'The website uses only the cookies needed for it to work and Google Analytics cookies that count visits. You can block or delete cookies in your browser settings, or opt out of Google Analytics at tools.google.com/dlpage/gaoptout.',
        ],
      },
      {
        h: 'Children',
        body: ['DhagaBook is a business tool and is not meant for anyone under 18. We do not knowingly collect children’s data.'],
      },
      {
        h: 'Grievance Officer',
        body: [
          'For any question or complaint about privacy, contact our Grievance Officer. We reply within 7 days and aim to resolve complaints within 30 days.',
          contactBlock,
        ],
      },
      {
        h: 'Changes to this policy',
        body: ['We will update the date at the top whenever this policy changes, and tell active customers about important changes.'],
      },
    ],
  },

  '/refund-policy': {
    title: 'Refund & Cancellation Policy',
    pill: 'Legal',
    intro: 'We want you to be sure before you buy, which is why the demo is free. This policy explains how cancellations and refunds work for DhagaBook plans.',
    sections: [
      {
        h: 'Try before you buy',
        body: ['Book a free demo and ask every question you have. We will show DhagaBook with examples from your type of business before you pay anything.'],
      },
      {
        h: 'Cancelling a plan',
        body: [
          [
            `You can cancel at any time by emailing ${SITE.email} or calling ${SITE.phone}.`,
            'Your plan stays active until the end of the year you have already paid for, and will not renew.',
            'You can ask for a full export of your data before or within 90 days after the plan ends.',
          ],
        ],
      },
      {
        h: 'Refunds',
        body: [
          [
            'Within 7 days of payment, if your account setup has not started, you get a full refund.',
            `Once setup and training have started, the setup fee of ${formatINR(SITE.setupFee)} is not refundable, because the work has been done for you.`,
            'Yearly plan fees are not refunded for a year that has already started, whether fully or partly used.',
            'If you were charged twice, or charged by mistake, the extra amount is refunded in full.',
          ],
        ],
      },
      {
        h: 'How refunds are paid',
        body: [
          'Approved refunds are paid to the original payment method or bank account within 7–10 working days. GST is refunded or adjusted with a credit note as per GST rules.',
        ],
      },
      {
        h: 'Delivery',
        body: [
          'DhagaBook is software delivered online. Nothing is shipped. Your login details are shared by email or WhatsApp, usually within 2 working days of payment, and the mobile app is downloaded from Google Play or the App Store.',
        ],
      },
      { h: 'Contact', body: ['For cancellations or refunds, contact us:', contactBlock] },
    ],
  },

  '/delete-account': {
    title: 'Delete Your Account',
    pill: 'Your data',
    intro: 'You can ask us to delete your DhagaBook account, a user login, or the data we hold about you at any time. This page explains how.',
    sections: [
      {
        h: 'How to ask',
        body: [
          [
            `Email ${SITE.email} with the subject “Delete my account”, or send a WhatsApp message to ${SITE.phone}.`,
            'Send it from the email or phone number registered with your account, and mention your company name and account code.',
            'To remove one user only, the company owner or admin can deactivate that user from Settings → Users, or ask us to do it.',
          ],
          'We confirm the request by call or email before deleting, so that nobody can delete your business data by pretending to be you.',
        ],
      },
      {
        h: 'What gets deleted',
        body: [
          [
            'Your company database, including all records, attachments and users.',
            'Your sign-in and device records, and your licence details.',
            'Website enquiries linked to you.',
          ],
          'Deletion is permanent and cannot be undone. Ask for a data export first if you may need your records later.',
        ],
      },
      {
        h: 'What we may keep',
        body: [
          'Tax invoices and payment records of what you paid us are kept for as long as Indian tax law requires (usually 8 years). Backups are cleared as they are overwritten, within 30 days.',
        ],
      },
      {
        h: 'How long it takes',
        body: ['We complete deletion within 30 days of confirming your request, and tell you when it is done.'],
      },
    ],
  },
};
