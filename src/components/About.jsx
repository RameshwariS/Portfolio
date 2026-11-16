import { useEffect, useRef } from 'react';
import { aboutText, education, numbers, profile } from '../data.js';
import { CountUp, SectionHead } from './ui.jsx';

const STAT_COLORS = ['pink', 'butter', 'mint', 'lav'];

export default function About({ clock }) {
  const textRef = useRef(null);

  // Words of the bio light up as the paragraph moves through the viewport.
  useEffect(() => {
    const el = textRef.current;
    const words = [...el.querySelectorAll('span')];
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(Math.max((vh * 0.85 - r.top) / (r.height + vh * 0.3), 0), 1);
      const lit = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle('lit', i < lit));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const hour = Number(clock.slice(0, 2));
  const isDay = hour >= 6 && hour < 18;

  return (
    <section id="about" className="section wrap">
      <SectionHead index={1} kicker="about me">I like the <em>unglamorous</em> parts of software.</SectionHead>
      <div className="bento">
        <div className="card bio reveal">
          <span className="tape" aria-hidden="true" />
          <p className="about-text" ref={textRef}>
            {aboutText.split(' ').map((w, i) => <span key={i}>{w} </span>)}
          </p>
        </div>

        <dl className="stats">
          {numbers.map((n, i) => (
            <div className={`stat c-${STAT_COLORS[i % 4]} reveal`} style={{ transitionDelay: `${i * 80}ms`, '--tilt': `${i % 2 ? 1.5 : -1.5}deg` }} key={n.label}>
              <dd><CountUp value={n.value} decimals={n.decimals} suffix={n.suffix} /></dd>
              <dt>{n.label}</dt>
            </div>
          ))}
        </dl>

        <div className="card edu reveal">
          <h3 className="hand-title">school stuff</h3>
          <div className="edu-row main">
            <span>{education.period}</span>
            <span><b>{education.degree}</b>{education.college}</span>
            <span className="pill c-butter">CGPA {education.cgpa}</span>
          </div>
          {education.secondary.map((s) => (
            <div className="edu-row" key={s.name}>
              <span>{s.year}</span>
              <span><b>{s.name}</b></span>
              <span>{s.details}</span>
            </div>
          ))}
        </div>

        <div className={`card now reveal ${isDay ? 'day' : 'night'}`}>
          <h3 className="hand-title">right now in Pune</h3>
          <span className="orb" aria-hidden="true" />
          <p className="now-clock">{clock}<small>IST</small></p>
          <p className="now-place">{profile.based}</p>
          <p className="now-status"><i className="live-dot" />Open to SDE roles for 2027</p>
        </div>
      </div>
    </section>
  );
}
