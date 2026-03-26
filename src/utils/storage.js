/**
 * Safe Storage Utilities
 * Prevents application from crashing if localStorage is blocked or disabled.
 */

// Memory-based fallback in case localStorage is unavailable
const memoryStorage = {};

/**
 * Safely retrieve an item from localStorage
 * @param {string} key 
 * @param {any} defaultValue 
 * @returns {any}
 */
export const safeGetItem = (key, defaultValue) => {
  try {
    const val = localStorage.getItem(key);
    return val !== null ? val : defaultValue;
  } catch (e) {
    if (debugMode()) console.warn(`Storage access blocked for key: ${key}. Using memory fallback.`);
    return memoryStorage[key] !== undefined ? memoryStorage[key] : defaultValue;
  }
};

/**
 * Safely set an item in localStorage
 * @param {string} key 
 * @param {any} value 
 */
export const safeSetItem = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    memoryStorage[key] = value;
  }
};

/** Internal check for debug mode in URL */
const debugMode = () => {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).get('debug') === 'true';
};
