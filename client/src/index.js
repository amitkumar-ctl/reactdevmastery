import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// ── Cookieless analytics (Cloudflare Web Analytics) — only when a token is set ──
const cfToken = process.env.REACT_APP_CF_ANALYTICS_TOKEN;
if (cfToken && process.env.NODE_ENV === 'production') {
  const s = document.createElement('script');
  s.defer = true;
  s.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  s.setAttribute('data-cf-beacon', JSON.stringify({ token: cfToken, spa: true }));
  document.head.appendChild(s);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode><App /></React.StrictMode>);
