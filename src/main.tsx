import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { applySecurityRestrictions } from './utils/securityRestrictions';

// 应用安全限制
applySecurityRestrictions();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
