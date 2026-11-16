import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { navItems, profile } from '../data.js';
import { Flower } from './ui.jsx';

function ThemeIcon({ theme }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {theme === 'light'
        ? <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        : <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>}
    </svg>
  );
}

export default function Header({ active, theme, isMac, onToggleTheme, onOpenPalette }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const [ind, setInd] = useState({ left: 0, width: 0 });

  // Slide the pill behind the active link.
  useLayoutEffect(() => {
    const place = () => {
      const el = navRef.current?.querySelector('.active');
      setInd((prev) => (el ? { left: el.offsetLeft, width: el.offsetWidth } : { ...prev, width: 0 }));
    };
    place();
    window.addEventListener('resize', place);
    document.fonts?.ready.then(place);
    return () => window.removeEventListener('resize', place);
  }, [active]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <header className="top">
      <a href="#home" className="brand" onClick={close}>
        <Flower className="brand-flower" />{profile.first.toLowerCase()}
      </a>
      <nav className={`nav ${menuOpen ? 'open' : ''}`} ref={navRef} aria-label="Primary">
        <span className="nav-ind" style={{ left: ind.left, width: ind.width, opacity: ind.width ? 1 : 0 }} aria-hidden="true" />
        {navItems.map((n) => (
          <a key={n.id} href={`#${n.id}`} className={active === n.id ? 'active' : ''} aria-current={active === n.id ? 'true' : undefined} onClick={close}>
            {n.label}
          </a>
        ))}
      </nav>
      <div className="tools">
        <button className="kbd-btn" onClick={onOpenPalette} aria-label="Open command palette">
          <kbd>{isMac ? '⌘' : 'Ctrl'}</kbd><kbd>K</kbd>
        </button>
        <button className="round-btn" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>
          <ThemeIcon theme={theme} />
        </button>
        <button className="round-btn menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
          <span className={`burger ${menuOpen ? 'open' : ''}`} />
        </button>
      </div>
    </header>
  );
}
