import { useEffect, useRef, useState } from 'react';
import { profile, rotatingWords } from '../data.js';
import { reducedMotion } from '../hooks.js';
import { Chars } from './ui.jsx';
import Orbit from './Orbit.jsx';

export default function Hero({ clock, onCopyEmail }) {
  const heroRef = useRef(null);
  const [wordIndex, setWordIndex] = useState(0);

  // Parallax: the orbit system drifts down slower than the page scrolls.
  useEffect(() => {
    if (reducedMotion()) return undefined;
    const hero = heroRef.current;
    const onScroll = () => {
      if (window.scrollY < window.innerHeight * 1.2) hero.style.setProperty('--sy', window.scrollY.toFixed(0));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % rotatingWords.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="hero" ref={heroRef}>
      <Orbit />

      <div className="hero-top wrap fade-in" style={{ '--d': '700ms' }}>
        <span>Pune &middot; 18.52&deg;N 73.86&deg;E</span>
        <span className="hero-top-mid">{profile.role}</span>
        <span>IST {clock}</span>
      </div>

      <div className="hero-main wrap">
        <h1 className="hero-name" aria-label={`${profile.first} ${profile.last}`}>
          <Chars text={profile.first} />
          <Chars text={profile.last} delay={220} />
        </h1>

        <div className="hero-side fade-in" style={{ '--d': '900ms' }}>
          <p className="hero-role">
            Software engineer who builds{' '}
            <span className="rotator"><span key={wordIndex} className="rot-word">{rotatingWords[wordIndex]}</span></span>{' '}
            that hold up in production.
          </p>
          <p className="status"><i className="live-dot" />{profile.status}</p>
          <div className="hero-cta">
            <a href="#projects" className="btn" data-magnetic="0.25" data-cursor="Launch"><span>View missions</span></a>
            <button className="btn ghost" data-magnetic="0.25" onClick={onCopyEmail}><span>Copy email</span></button>
          </div>
        </div>
      </div>

      <a href="#about" className="scroll-cue fade-in" style={{ '--d': '1200ms' }} aria-label="Scroll to about"><span /></a>
    </section>
  );
}
