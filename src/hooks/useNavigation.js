import { useEffect, useRef } from 'react';

/**
 * useKeyboardNavigation
 * Adds global keyboard shortcuts for section navigation:
 *   PageDown / ] → Next section
 *   PageUp / [ → Previous section
 *   Home → First section
 *   End → Last section
 *   1-9 → Jump to specific section
 */
export function useKeyboardNavigation(sections, scrollTo, announce) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if user is typing in an input/textarea
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      // Find current section by checking which one is nearest viewport top
      const currentIndex = sections.findIndex(s => {
        const el = document.getElementById(s.id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top > -window.innerHeight * 0.3;
      });
      const idx = currentIndex === -1 ? sections.length - 1 : currentIndex;

      switch (e.key) {
        case 'PageDown':
        case ']': {
          e.preventDefault();
          const next = Math.min(idx + 1, sections.length - 1);
          scrollTo(`#${sections[next].id}`);
          if (announce) announce(`Jumped to ${sections[next].label}.`);
          break;
        }
        case 'PageUp':
        case '[': {
          e.preventDefault();
          const prev = Math.max(idx - 1, 0);
          scrollTo(`#${sections[prev].id}`);
          if (announce) announce(`Jumped to ${sections[prev].label}.`);
          break;
        }
        case 'Home':
          e.preventDefault();
          scrollTo(`#${sections[0].id}`);
          if (announce) announce(`Jumped to ${sections[0].label}.`);
          break;
        case 'End':
          e.preventDefault();
          scrollTo(`#${sections[sections.length - 1].id}`);
          if (announce) announce(`Jumped to ${sections[sections.length - 1].label}.`);
          break;
        default: {
          // Number keys 1-9 jump to specific section
          const num = parseInt(e.key);
          if (!isNaN(num) && num >= 1 && num <= sections.length) {
            e.preventDefault();
            const target = sections[num - 1];
            scrollTo(`#${target.id}`);
            if (announce) announce(`Jumped to section ${num}: ${target.label}.`);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sections, scrollTo, announce]);
}

/**
 * useGestureNavigation
 * Swipe left/right on mobile to navigate between sections.
 */
export function useGestureNavigation({ onSwipeLeft, onSwipeRight, threshold = 60 }) {
  const startRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onTouchStart = (e) => {
      startRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = (e) => {
      const dx = startRef.current.x - e.changedTouches[0].clientX;
      const dy = startRef.current.y - e.changedTouches[0].clientY;

      // Only horizontal swipes that exceed threshold
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > threshold) {
        if (dx > 0) onSwipeLeft?.();
        else onSwipeRight?.();
      }
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [onSwipeLeft, onSwipeRight, threshold]);
}
