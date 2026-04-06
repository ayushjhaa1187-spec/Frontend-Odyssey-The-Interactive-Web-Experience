import React, { useState, useEffect, useCallback } from 'react';

const Navbar = ({ sections, activeSection, onNavigate, onToggleTheme, theme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      const close = (e) => {
        if (e.key === 'Escape') setMenuOpen(false);
      };
      window.addEventListener('keydown', close);
      return () => window.removeEventListener('keydown', close);
    }
  }, [menuOpen]);

  const handleNav = useCallback((id) => {
    onNavigate(`#${id}`);
    setMenuOpen(false);
  }, [onNavigate]);

  return (
    <header
      className={`site-navbar ${scrolled ? 'navbar-scrolled' : ''}`}
      role="banner"
    >
      <div className="navbar-inner">
        <a
          href="#hero"
          className="navbar-brand mono"
          onClick={(e) => { e.preventDefault(); handleNav('hero'); }}
          aria-label="Frontend Odyssey - return to top"
        >
          ODYSSEY
        </a>

        <nav className="navbar-links" aria-label="Main navigation">
          {sections.slice(0, 6).map((s) => (
            <button
              key={s.id}
              className={`navbar-link ${activeSection === s.id ? 'active' : ''}`}
              onClick={() => handleNav(s.id)}
              aria-current={activeSection === s.id ? 'section' : undefined}
            >
              {s.label}
            </button>
          ))}
        </nav>

        <div className="navbar-actions">
          <button
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>

          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={`hamburger ${menuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {sections.map((s) => (
            <button
              key={s.id}
              className={`mobile-nav-link ${activeSection === s.id ? 'active' : ''}`}
              onClick={() => handleNav(s.id)}
              aria-current={activeSection === s.id ? 'section' : undefined}
            >
              {s.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
};

export default React.memo(Navbar);
