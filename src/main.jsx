import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Robust Error Handling for Production Diagnostics
window.addEventListener('error', (event) => {
    console.error('GLOBAL_ERROR:', event.error);
    const root = document.getElementById('root');
    if (root && root.innerHTML === "") {
        root.innerHTML = `<div style="padding:40px; color:#FF6B6B; font-family:monospace; background:#000; height:100vh;">
            <h2>[RUNTIME_CRASH]</h2>
            <p>${event.error?.message || 'Unknown fatal error'}</p>
            <p style="opacity:0.5; font-size:12px;">Check console for stack trace. Odyssey failed to launch.</p>
        </div>`;
    }
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('UNHANDLED_PROMISE:', event.reason);
});

try {
    const rootEl = document.getElementById('root');
    if (!rootEl) throw new Error("Root element not found in HTML.");
    
    createRoot(rootEl).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
} catch (err) {
    console.error('MOUNT_ERROR:', err);
}

