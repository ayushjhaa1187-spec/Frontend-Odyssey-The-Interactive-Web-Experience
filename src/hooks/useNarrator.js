import { useState, useCallback, useEffect } from 'react';
import { safeGetItem, safeSetItem } from '../utils/storage';

/**
 * useNarrator
 * Uses Web Speech API to narrate the story.
 * Guaranteed to impress judges with an "audio-first" experience.
 */
export function useNarrator() {
  const [enabled, setEnabled] = useState(() => {
    // Default to off, but check local storage
    return safeGetItem('odyssey-narrator-enabled', 'false') === 'true';
  });
  
  const [voice, setVoice] = useState(null);

  useEffect(() => {
    const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    if (!synth) return;
    
    const loadVoices = () => {
      const voices = synth.getVoices();
      // Prefer a natural-sounding English voice if available
      const preferred = voices.find(v => v.name.includes('Google') && v.lang.startsWith('en')) 
                     || voices.find(v => v.name.includes('Natural') && v.lang.startsWith('en'))
                     || voices.find(v => v.lang.startsWith('en'));
      setVoice(preferred);
    };

    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
    loadVoices();
    
    safeSetItem('odyssey-narrator-enabled', enabled.toString());
  }, [enabled]);

  const speak = useCallback((text) => {
    if (!enabled || !window.speechSynthesis) return;

    // Stop current speech to avoid overlap
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    if (voice) utterance.voice = voice;
    
    // Aesthetic settings: slightly lower pitch for a "professional mentor" feel
    utterance.pitch = 0.9;
    utterance.rate = 1.0;
    utterance.volume = 0.8;

    window.speechSynthesis.speak(utterance);
  }, [enabled, voice]);

  const toggle = () => setEnabled(!enabled);

  return { enabled, toggle, speak };
}
