import { Fragment, useCallback, useEffect, useState } from 'react';
import { navItems, profileLinks } from './data.js';
import { reducedMotion, useActiveSection, useClock, useMagnetic, useReveal, useTheme } from './hooks.js';
import { Flower } from './components/ui.jsx';
import Cursor from './components/Cursor.jsx';
import Loader from './components/Loader.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Experience from './components/Experience.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import Palette from './components/Palette.jsx';
import { Contact, Footer } from './components/Contact.jsx';

const SECTION_IDS = navItems.map((n) => n.id);
const TICKER = ['Go', 'Java', 'Spring Boot', 'Redis', 'PostgreSQL', 'Docker', 'React', 'Node.js', 'MongoDB', 'Linux'];
const isMac = /Mac|iPhone|iPad/.test(navigator.platform);

function App() {
  const [theme, toggleTheme] = useTheme();
  const clock = useClock();
  const active = useActiveSection(SECTION_IDS);
  // loading: curtain counting · lifting: curtain leaving, page animates in · done
  const [phase, setPhase] = useState(() => (reducedMotion() ? 'done' : 'loading'));
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [toast, setToast] = useState('');

  useReveal();
  useMagnetic();

  const onCounted = useCallback(() => setPhase('lifting'), []);
  useEffect(() => {
    if (phase !== 'lifting') return undefined;
    const id = setTimeout(() => setPhase('done'), 900);
    return () => clearTimeout(id);
  }, [phase]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const id = setTimeout(() => setToast(''), 2000);
    return () => clearTimeout(id);
  }, [toast]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profileLinks.email);
      setToast('Email copied to clipboard');
    } catch {
      window.location.href = `mailto:${profileLinks.email}`;
    }
  };

  const commands = [
    ...navItems.map((n) => ({ label: `Go to ${n.label}`, hint: `${n.method} /${n.id}`, run: () => document.getElementById(n.id)?.scrollIntoView() })),
    { label: `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`, hint: 'theme', run: toggleTheme },
    { label: 'Copy email address', hint: 'contact', run: copyEmail },
    ...['github', 'linkedin', 'leetcode', 'codolio'].map((k) => ({
      label: `Open ${k === 'github' ? 'GitHub' : k === 'linkedin' ? 'LinkedIn' : k === 'leetcode' ? 'LeetCode' : 'Codolio'}`,
      hint: 'link',
      run: () => window.open(profileLinks[k], '_blank', 'noopener'),
    })),
  ];

  return (
    <div className={`page ${phase === 'loading' ? '' : 'is-ready'}`}>
      <a href="#about" className="skip-link">Skip to content</a>
      <div className="grain" aria-hidden="true" />
      {phase !== 'done' && <Loader leaving={phase === 'lifting'} onCounted={onCounted} />}
      <Cursor />

      <Header
        active={active}
        theme={theme}
        isMac={isMac}
        onToggleTheme={toggleTheme}
        onOpenPalette={() => setPaletteOpen(true)}
      />

      <main>
        <Hero onCopyEmail={copyEmail} />

        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {[0, 1].map((k) => (
              <span key={k}>
                {TICKER.map((t) => <Fragment key={t}>{t}<Flower /></Fragment>)}
              </span>
            ))}
          </div>
        </div>

        <About clock={clock} />
        <Experience />
        <Projects />
        <Skills theme={theme} />
        <Contact onCopyEmail={copyEmail} />
      </main>

      <Footer isMac={isMac} />

      {paletteOpen && <Palette commands={commands} onClose={() => setPaletteOpen(false)} />}
      <div className={`toast ${toast ? 'show' : ''}`} role="status">{toast}</div>
    </div>
  );
}

export default App;
