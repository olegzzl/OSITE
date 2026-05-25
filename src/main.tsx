import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root')!;

const showError = (msg: string, stack?: string) => {
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = 'color:red; background: black; padding: 20px; font-family: monospace; z-index: 99999; position: fixed; top: 0; left: 0; right: 0; bottom: 0; overflow: auto;';
  errorDiv.innerHTML = `
    <h2>Runtime Error!</h2>
    <p>${msg}</p>
    <pre style="white-space: pre-wrap; font-size: 12px; color: #ff8888;">${stack || ''}</pre>
  `;
  document.body.appendChild(errorDiv);
};

window.addEventListener('error', (event) => {
  showError(event.message, event.error?.stack);
});

window.addEventListener('unhandledrejection', (event) => {
  showError('Promise Rejection: ' + (event.reason?.message || event.reason), event.reason?.stack);
});

try {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} catch (error: any) {
  showError(error.message, error.stack);
}
