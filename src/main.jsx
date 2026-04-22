import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import ScrollAlwaysTop from './components/ScrollAlwaysTop/ScrollAlwaysTop';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollAlwaysTop />
      <App />
    </BrowserRouter>
  </StrictMode>,
);
