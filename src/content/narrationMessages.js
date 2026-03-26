/**
 * Centralized narration messages for screen reader aria-live announcements.
 * Keeps all copy in one place for consistency and cohesive audio storytelling.
 */
const narrationMessages = {

  // Section change narration
  sectionEnter: {
    hero:       "Dream phase. The journey begins.",
    learning:   "Grind phase. Time to level up.",
    bugs:       "Chaos phase. Bugs detected in production.",
    eureka:     "Hope phase. Eureka moment incoming.",
    deadline:   "Panic phase. The deadline approaches.",
    caffeine:   "Drive phase. Fuel the commit streak.",
    shipping:   "Deploy phase. Preparing for launch.",
    production: "Life phase. The app is live.",
    loop:       "Repeat phase. The cycle never ends.",
  },

  // Bug mini-game
  bugSquashed:      (remaining) => `Bug squashed. ${remaining} remaining.`,
  allBugsCleared:   "All bugs squashed. Build successful.",
  autoCleaned:      "Auto-clean engaged. All anomalies eliminated.",

  // Caffeine
  caffeineChanged:  (label, boost) => `Caffeine: ${label}. Boost ${boost * 20}%.`,
  caffeineLegendary:"Caffeine at legendary. System jitter increased.",
  caffeineOverheat: "Warning: system overheating detected.",

  // Shipping
  shipInitiated:    "Deploying to production. Countdown started.",
  shipComplete:     "Build shipped. Rocket in orbit.",

  // Production
  productionLive:   (users) => `Production live. ${users} users online.`,

  // Loop
  loopRestart:      (count) =>
    count <= 1
      ? "Loop restarted. Back to the beginning."
      : `Again?! Loop ${count}. The cycle continues.`,

  // Eureka / Rubber Duck
  duckCollision:    "Eureka! Rubber duck explains the bug.",
  duckConsulted:    "Consulting rubber duck… explanation revealed.",

  // Debug / Mentor
  debugToggled:     (on) => `Debugger ${on ? "activated" : "deactivated"}.`,
  mentorOpened:     "Mentor terminal opened. Sage advice incoming.",
  mentorClosed:     "Mentor terminal closed.",

  // Experience toggles
  voiceToggled:     (on) => `Voice Narration ${on ? "enabled" : "disabled"}.`,
  zenToggled:       (on) => `Zen Mode ${on ? "enabled" : "disabled"}.`,
  motionToggled:    (on) => `Motion effects ${on ? "enabled" : "disabled"}.`,
  helpOpened:       "Help and Accessibility panel opened.",
};

export default narrationMessages;
