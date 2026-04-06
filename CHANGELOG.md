# Changelog

All notable changes to Frontend Odyssey are documented here.

## [2.0.0] - 2026-04-06

### Added
- Light/dark theme system with CSS custom properties and persistent toggle
- Sticky navigation bar with section links, mobile hamburger menu, and theme switch
- AI storytelling assistant chat widget (Odyssey Guide) with domain-specific responses
- Error boundary component with graceful fallback UI
- Skeleton loading component for progressive content display
- Redesigned footer with project info, tech stack, and navigation
- `.env.example` for environment variable documentation
- `.prettierrc` for consistent code formatting
- `CHANGELOG.md` for version tracking

### Changed
- Typography upgraded from Outfit to Space Grotesk for a more distinctive feel
- Color scheme updated: dark mode uses `#0f0f0f`/`#4f98a3`, light mode uses `#f7f6f2`/`#01696f`
- Progress bar repositioned below navbar (top: 56px)
- Main content area adjusted for fixed navbar offset

### Removed
- Console.log/console.error statements from production code
- Unused `debugMode` utility function from storage module
- Redundant duplicate `loadingJokes` array in App component

### Fixed
- Clean separation of concerns with ErrorBoundary wrapping at root level

## [1.0.0] - 2026-03-01

### Added
- Initial release: 10-chapter scroll-driven interactive storytelling experience
- GSAP ScrollTrigger animations with pinned scenes and parallax
- Canvas bug-squash mini-game with physics
- Rubber duck debugger drag interaction
- Caffeine meter with global visual feedback
- Ship-it deploy button with confetti particles
- Web Speech API narrator integration
- Full keyboard navigation and WCAG AA accessibility
- Konami code easter egg, debug mode, judge mode
- localStorage persistence for preferences
