import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

window.addEventListener('error', (event) => {
    const root = document.getElementById('root');
    if (root && root.innerHTML === "") {
        root.innerHTML = `<div style="padding:40px; color:#FF6B6B; font-family:monospace; background:#0f0f0f; height:100vh;">
            <h2>Something went wrong</h2>
            <p>${event.error?.message || 'Unknown error'}</p>
            <p style="opacity:0.5; font-size:12px;">Reload the page to try again.</p>
        </div>`;
    }
});

const rootEl = document.getElementById('root');
if (rootEl) {
    createRoot(rootEl).render(
      <StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StrictMode>
    );
}
