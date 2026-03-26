import { useEffect, useRef } from 'react';

/**
 * Saves the currently focused element when `isOpen` becomes true,
 * and restores focus to that element when `isOpen` becomes false.
 *
 * @param {boolean} isOpen - Whether the overlay/dialog is currently open.
 * @param {React.RefObject} [primaryRef] - Optional ref to focus when overlay opens.
 */
export function useFocusRestore(isOpen, primaryRef) {
  const triggerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Save the element that opened the overlay
      triggerRef.current = document.activeElement;

      // Move focus to the primary action inside the overlay
      if (primaryRef?.current) {
        const timer = setTimeout(() => primaryRef.current?.focus(), 80);
        return () => clearTimeout(timer);
      }
    } else if (triggerRef.current) {
      // Restore focus to the trigger element
      const el = triggerRef.current;
      const timer = setTimeout(() => el?.focus(), 50);
      triggerRef.current = null;
      return () => clearTimeout(timer);
    }
  }, [isOpen, primaryRef]);
}
