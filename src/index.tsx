
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import './index.css';

console.log('[INIT] index.tsx: Starting application initialization...');

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('[INIT] index.tsx: Could not find root element!');
  throw new Error("Could not find root element to mount to");
}

console.log('[INIT] index.tsx: Root element found, mounting React app...');

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

console.log('[INIT] index.tsx: Render call complete.');
