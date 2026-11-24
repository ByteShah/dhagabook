import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { handleLead } from './server/lead.js';

// Serve the contact form endpoint (/api/lead) locally in `npm run dev` and `vite preview`,
// using RESEND_API_KEY etc. from .env — the same code the host runs in api/lead.js.
function leadApi(env) {
  const middleware = async (req, res, next) => {
    if (req.url?.split('?')[0] !== '/api/lead') return next();
    try {
      const chunks = [];
      for await (const c of req) chunks.push(c);
      const request = new Request(`http://localhost${req.url}`, {
        method: req.method,
        headers: { 'Content-Type': 'application/json' },
        body: req.method === 'POST' ? Buffer.concat(chunks) : undefined,
      });
      const response = await handleLead(request, env);
      res.statusCode = response.status;
      res.setHeader('Content-Type', 'application/json');
      res.end(await response.text());
    } catch (err) {
      next(err);
    }
  };
  return {
    name: 'lead-api',
    configureServer(server) { server.middlewares.use(middleware); },
    configurePreviewServer(server) { server.middlewares.use(middleware); },
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), leadApi(loadEnv(mode, process.cwd(), ''))],
  build: { cssCodeSplit: false },
}));
