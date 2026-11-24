// Serverless function for the contact form (Vercel: deployed automatically at /api/lead).
// Set RESEND_API_KEY (and optionally LEAD_TO, LEAD_FROM) in the host's environment variables.
import { handleLead } from '../server/lead.js';

export function POST(request) {
  return handleLead(request, process.env);
}
