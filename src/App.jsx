import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Features from './pages/Features.jsx';
import Pricing from './pages/Pricing.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';
import Legal from './pages/Legal.jsx';
import Landing from './pages/Landing.jsx';
import { LANDING } from './landing.js';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="features" element={<Features />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="contact" element={<Contact />} />
        {['terms', 'privacy', 'refund-policy', 'delete-account'].map((p) => (
          <Route key={p} path={p} element={<Legal />} />
        ))}
        {Object.keys(LANDING).map((p) => (
          <Route key={p} path={p.slice(1)} element={<Landing />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
