/**
 * Global Keyboard Shortcut Handler
 * Handles Konami Code and Special Toggles (Debug, Insane, Judge)
 */

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 
  'ArrowDown', 'ArrowDown', 
  'ArrowLeft', 'ArrowRight', 
  'ArrowLeft', 'ArrowRight', 
  'b', 'a'
];

let konamiIdx = 0;

export const initGlobalShortcuts = ({ onKonami, onEsc }) => {
  const handleKeyDown = (e) => {
    // Esc: Cleanup all special modes
    if (e.key === 'Escape') {
      onEsc();
      return;
    }

    // Konami sequence tracking
    if (e.key === KONAMI_CODE[konamiIdx]) {
      konamiIdx++;
      if (konamiIdx === KONAMI_CODE.length) {
        onKonami();
        konamiIdx = 0;
      }
    } else {
      konamiIdx = 0;
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
};

export const checkUrlParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    judge: urlParams.get('judge') === 'true',
    debug: urlParams.get('debug') === 'true'
  };
};
