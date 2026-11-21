import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { profile } from './data.js';
import { reducedMotion, useKeySequence } from './hooks.js';
import { confetti, initMotion } from './motion.js';
import Loader from './components/Loader.jsx';
import Cursor from './components/Cursor.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Mascot from './components/Mascot.jsx';
import { AboutTile, ClockTile, ResumeTile, StatusTile } from './components/About.jsx';
import Experience from './components/Experience.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import { Contact, Footer } from './components/Contact.jsx';

// CONCEPT — "the portfolio as an API": every tile is an endpoint
// (GET /about, POST /contact …) glowing under a slow aurora.

export default function App() {
  const rootRef = useRef(null);
  const [loading, setLoading] = useState(() => !reducedMotion());
  const [introDone, setIntroDone] = useState(false);
  const [party, setParty] = useState(false);
  const [toast, setToast] = useState(null);
  const lastToast = useRef(null); // keeps text visible while the toast slides out
  if (toast) lastToast.current = toast.body;

  // All GSAP / ScrollTrigger / Lenis motion; runs before first paint.
  useLayoutEffect(
    () => initMotion(rootRef.current, { onLoaded: () => setLoading(false), onIntroDone: () => setIntroDone(true) }),
    [],
  );

  // Toast auto-hide
  useEffect(() => {
    if (!toast) return undefined;
    const id = setTimeout(() => setToast(null), toast.ms);
    return () => clearTimeout(id);
  }, [toast]);

  // Easter egg: type "hire" anywhere
  useKeySequence('hire', () => {
    setToast({
      ms: 5200,
      body: <><code>POST /hire</code> → <b>201 Created</b>&nbsp; Great taste. Let&apos;s talk: <a href={`mailto:${profile.email}`}>{profile.email}</a></>,
    });
    if (reducedMotion()) return;
    setParty(true);
    confetti();
    setTimeout(() => setParty(false), 4200);
  });
  useEffect(() => { document.documentElement.classList.toggle('is-party', party); }, [party]);

  const copyEmail = useCallback(async () => {
    try { await navigator.clipboard.writeText(profile.email); } catch { /* blocked: mailto link still works */ }
    setToast({ ms: 3200, body: <><code>PUT /clipboard</code> → <b>200 OK</b>&nbsp; {profile.email}</> });
  }, []);

  return (
    <div ref={rootRef}>
      <a className="skip" href="#main">Skip to content</a>
      {loading && <Loader />}
      <div className="aurora" aria-hidden="true"><i className="a1" /><i className="a2" /><i className="a3" /></div>
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <Header />

      <main id="main" tabIndex={-1}>
        <section id="top" className="section section--first wrap" aria-label="Introduction">
          <div className="bento bento--index">
            <Hero introDone={introDone} />
            <Mascot party={party} />
            <StatusTile />
            <AboutTile />
            <ClockTile />
            <ResumeTile />
          </div>
        </section>
        <Experience />
        <Projects />
        <Skills />
        <Contact onCopy={copyEmail} />
      </main>

      <Footer />
      <div className={`toast ${toast ? 'is-show' : ''}`} role="status" aria-live="polite">{lastToast.current}</div>
    </div>
  );
}
