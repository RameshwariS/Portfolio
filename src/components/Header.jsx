import { useEffect, useState } from 'react';
import { navItems, profile, profileLinks } from '../data.js';
import { Roll, pad } from './ui.jsx';

export default function Header({ active, theme, isMac, onToggleTheme, onOpenPalette }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Tuck the bar away while scrolling down, bring it back on the way up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 300 && y > last);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', menuOpen);
    if (!menuOpen) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <header className={`top ${hidden && !menuOpen ? 'hidden' : ''} ${scrolled ? 'scrolled' : ''}`}>
        <a href="#home" className="brand" onClick={close}>{profile.first} {profile.last}</a>
        <nav className="nav" aria-label="Primary">
          {navItems.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={active === n.id ? 'active' : ''} aria-current={active === n.id ? 'true' : undefined}>
              <Roll>{n.label}</Roll>
            </a>
          ))}
        </nav>
        <div className="tools">
          <button className="tool tool-kbd" onClick={onOpenPalette} aria-label="Open command palette">
            <kbd>{isMac ? '⌘' : 'Ctrl'}</kbd><kbd>K</kbd>
          </button>
          <button className="tool tool-theme" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>
            <i className="theme-dot" /><Roll>{theme === 'light' ? 'Dark' : 'Light'}</Roll>
          </button>
          <button className="tool tool-menu" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="menu">
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      <div className={`menu ${menuOpen ? 'open' : ''}`} id="menu" inert={!menuOpen}>
        <ol>
          {navItems.map((n, i) => (
            <li key={n.id} style={{ '--i': i }}>
              <a href={`#${n.id}`} onClick={close}><span>{pad(i + 1)}</span>{n.label}</a>
            </li>
          ))}
        </ol>
        <div className="menu-foot">
          <a href={`mailto:${profileLinks.email}`}>{profileLinks.email}</a>
          <span>{profile.based}</span>
        </div>
      </div>
    </>
  );
}
