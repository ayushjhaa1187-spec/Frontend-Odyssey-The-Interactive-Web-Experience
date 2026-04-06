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
  } catch {
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
  } catch {
    memoryStorage[key] = value;
  }
};
